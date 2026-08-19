import { NextResponse } from "next/server";
import { forceRefreshLiveArticles } from "@/lib/article-store";
import { emptyCache } from "@/lib/cache";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET() {
  try {
    const cache = await forceRefreshLiveArticles();
    return NextResponse.json({
      ok: true,
      lastRefreshedAt: cache.lastRefreshedAt,
      articleCount: cache.articles.length,
      liveSourceIds: cache.liveSourceIds,
      sourceErrors: cache.sourceErrors,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Refresh failed";
    return NextResponse.json(
      { ok: false, error: message, ...emptyCache() },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}
