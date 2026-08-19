import { mockArticles, GS_LABELS, GS_SUBTOPICS } from "@/data/articles";
import { Article, DayArchive, GSPaper, Lens } from "@/types";
import {
  emptyCache,
  FeedCache,
  isCacheStale,
  readCache,
} from "./cache";
import { refreshLiveFeeds } from "./ingest";

export { GS_LABELS, GS_SUBTOPICS };

let refreshPromise: Promise<FeedCache> | null = null;

const isVercel = Boolean(process.env.VERCEL);

/** Ensure RSS cache is fresh; returns cached or freshly fetched data */
export async function ensureLiveArticles(): Promise<FeedCache> {
  try {
    const existing = await readCache();
    if (existing && !isCacheStale(existing)) return existing;

    // Vercel: never block page render with a 32-source fetch (10s timeout).
    // Serve stale cache or fall back to mock; refresh via /api/feeds/refresh or cron.
    if (isVercel) {
      if (existing?.articles.length) return existing;
      return emptyCache();
    }

    if (!refreshPromise) {
      refreshPromise = refreshLiveFeeds().finally(() => {
        refreshPromise = null;
      });
    }
    return await refreshPromise;
  } catch {
    const fallback = await readCache();
    return fallback ?? emptyCache();
  }
}

/** Force refresh (for API / manual trigger) */
export async function forceRefreshLiveArticles(): Promise<FeedCache> {
  return refreshLiveFeeds();
}

async function getMergedArticles(): Promise<{
  articles: Article[];
  meta: { live: boolean; lastRefreshedAt?: string; liveCount: number };
}> {
  const cache = await ensureLiveArticles();
  if (cache.articles.length > 0) {
    return {
      articles: cache.articles,
      meta: {
        live: true,
        lastRefreshedAt: cache.lastRefreshedAt,
        liveCount: cache.articles.length,
      },
    };
  }
  return {
    articles: mockArticles,
    meta: { live: false, liveCount: 0 },
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const { articles } = await getMergedArticles();
  return articles;
}

export async function getArticlesMeta() {
  return (await getMergedArticles()).meta;
}

export async function getArticlesBySource(sourceId: string): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((a) => a.sourceId === sourceId);
}

export async function getArticlesByGS(gsPaper: GSPaper): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((a) => a.gsPaper === gsPaper);
}

export async function getArticlesByLens(lens: Lens): Promise<Article[]> {
  const articles = await getAllArticles();
  if (lens === "both") return articles;
  return articles.filter((a) => a.lens === lens || a.lens === "both");
}

export async function getArticlesByDate(dateStr: string): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((a) => a.publishedAt.startsWith(dateStr));
}

export async function getTodayArticles(): Promise<Article[]> {
  const today = new Date().toISOString().slice(0, 10);
  return getArticlesByDate(today);
}

export async function getNewCountBySource(
  sourceId: string,
  articles?: Article[]
): Promise<number> {
  const list = articles ?? (await getTodayArticles());
  return list.filter((a) => a.sourceId === sourceId).length;
}

export async function getTodayCountsBySource(): Promise<Record<string, number>> {
  const today = await getTodayArticles();
  const counts: Record<string, number> = {};
  for (const a of today) {
    counts[a.sourceId] = (counts[a.sourceId] ?? 0) + 1;
  }
  return counts;
}

export async function getDayArchives(): Promise<DayArchive[]> {
  const articles = await getAllArticles();
  const byDate = new Map<string, Article[]>();
  for (const a of articles) {
    const date = a.publishedAt.slice(0, 10);
    if (!byDate.has(date)) byDate.set(date, []);
    byDate.get(date)!.push(a);
  }

  return Array.from(byDate.entries())
    .map(([date, items]) => {
      const sourceIds = new Set(items.map((i) => i.sourceId));
      const gsBreakdown: Partial<Record<GSPaper, number>> = {};
      for (const item of items) {
        gsBreakdown[item.gsPaper] = (gsBreakdown[item.gsPaper] ?? 0) + 1;
      }
      return {
        date,
        articleCount: items.length,
        sourceCount: sourceIds.size,
        gsBreakdown,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  const articles = await getAllArticles();
  return articles.find((a) => a.id === id);
}
