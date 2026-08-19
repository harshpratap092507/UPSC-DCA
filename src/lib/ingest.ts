import { sources } from "@/data/sources";
import { Article } from "@/types";
import { classifyArticle } from "./classify";
import { articleIdFromUrl, FeedCache, writeCache } from "./cache";
import { fetchSourceItems } from "./scrapers";

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    u.hash = "";
    return u.toString().replace(/\/$/, "");
  } catch {
    return url.trim();
  }
}

function feedItemToArticle(
  item: {
    title: string;
    url: string;
    publishedAt: string;
    summary: string;
    content: string[];
  },
  sourceId: string
): Article {
  const { gsPaper, subTopic, lens, tags } = classifyArticle(
    item.title,
    item.summary,
    sourceId
  );

  return {
    id: articleIdFromUrl(item.url),
    title: item.title,
    url: item.url,
    sourceId,
    publishedAt: item.publishedAt,
    summary: item.summary,
    content: item.content,
    gsPaper,
    subTopic,
    lens,
    tags,
  };
}

/** Fetch all configured sources and persist to cache */
export async function refreshLiveFeeds(): Promise<FeedCache> {
  const liveSources = sources.filter((s) => s.fetchMethod);
  const articles: Article[] = [];
  const sourceErrors: Record<string, string> = {};
  const seen = new Set<string>();

  const batchSize = 6;
  for (let i = 0; i < liveSources.length; i += batchSize) {
    const batch = liveSources.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (source) => {
        const result = await fetchSourceItems(source.id);
        if (result.error && result.items.length === 0) {
          sourceErrors[source.id] = result.error;
          return;
        }
        for (const item of result.items) {
          const key = normalizeUrl(item.url);
          if (seen.has(key)) continue;
          seen.add(key);
          articles.push(feedItemToArticle(item, source.id));
        }
      })
    );
  }

  articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const cache: FeedCache = {
    lastRefreshedAt: new Date().toISOString(),
    articles,
    sourceErrors,
    liveSourceIds: liveSources.map((s) => s.id),
  };

  await writeCache(cache);
  return cache;
}
