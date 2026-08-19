import { createHash } from "crypto";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { Article } from "@/types";

export interface FeedCache {
  lastRefreshedAt: string;
  articles: Article[];
  sourceErrors: Record<string, string>;
  liveSourceIds: string[];
}

/** In-memory cache — survives within a warm serverless instance */
let memoryCache: FeedCache | null = null;

function cacheFilePath(): string {
  // Vercel/serverless: only /tmp is writable
  if (process.env.VERCEL) {
    return path.join(os.tmpdir(), "upsc-desk-feed-cache.json");
  }
  return path.join(process.cwd(), ".cache", "feed-cache.json");
}

/** Default TTL — refresh RSS feeds if cache is older than this */
export const CACHE_TTL_MS = 30 * 60 * 1000;

export function articleIdFromUrl(url: string): string {
  return createHash("sha256").update(url.trim()).digest("hex").slice(0, 16);
}

export async function readCache(): Promise<FeedCache | null> {
  if (memoryCache) return memoryCache;

  try {
    const raw = await fs.readFile(cacheFilePath(), "utf-8");
    memoryCache = JSON.parse(raw) as FeedCache;
    return memoryCache;
  } catch {
    return null;
  }
}

export async function writeCache(cache: FeedCache): Promise<void> {
  memoryCache = cache;

  try {
    const file = cacheFilePath();
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(cache, null, 2), "utf-8");
  } catch {
    // Expected on read-only filesystems — in-memory cache still works
  }
}

export function isCacheStale(cache: FeedCache | null): boolean {
  if (!cache?.lastRefreshedAt) return true;
  const age = Date.now() - new Date(cache.lastRefreshedAt).getTime();
  return age > CACHE_TTL_MS;
}

export const emptyCache = (): FeedCache => ({
  lastRefreshedAt: "",
  articles: [],
  sourceErrors: {},
  liveSourceIds: [],
});
