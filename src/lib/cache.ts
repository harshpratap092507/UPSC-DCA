import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { Article } from "@/types";

export interface FeedCache {
  lastRefreshedAt: string;
  articles: Article[];
  sourceErrors: Record<string, string>;
  liveSourceIds: string[];
}

const CACHE_DIR = path.join(process.cwd(), ".cache");
const CACHE_FILE = path.join(CACHE_DIR, "feed-cache.json");

/** Default TTL — refresh RSS feeds if cache is older than this */
export const CACHE_TTL_MS = 30 * 60 * 1000;

export function articleIdFromUrl(url: string): string {
  return createHash("sha256").update(url.trim()).digest("hex").slice(0, 16);
}

export async function readCache(): Promise<FeedCache | null> {
  try {
    const raw = await fs.readFile(CACHE_FILE, "utf-8");
    return JSON.parse(raw) as FeedCache;
  } catch {
    return null;
  }
}

export async function writeCache(cache: FeedCache): Promise<void> {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), "utf-8");
}

export function isCacheStale(cache: FeedCache | null): boolean {
  if (!cache?.lastRefreshedAt) return true;
  const age = Date.now() - new Date(cache.lastRefreshedAt).getTime();
  return age > CACHE_TTL_MS;
}
