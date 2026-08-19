import { NextResponse } from "next/server";
import { forceRefreshLiveArticles } from "@/lib/article-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const cache = await forceRefreshLiveArticles();
  return NextResponse.json({
    ok: true,
    lastRefreshedAt: cache.lastRefreshedAt,
    articleCount: cache.articles.length,
    liveSourceIds: cache.liveSourceIds,
    sourceErrors: cache.sourceErrors,
  });
}

export async function POST() {
  return GET();
}
