import { NextResponse } from "next/server";
import { fetchSourceItems } from "@/lib/scrapers";
import { getSourceById } from "@/data/sources";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: { sourceId: string };
}

export async function GET(_request: Request, { params }: RouteParams) {
  const source = getSourceById(params.sourceId);
  if (!source) {
    return NextResponse.json({ error: "Source not found" }, { status: 404 });
  }

  const result = await fetchSourceItems(params.sourceId);

  return NextResponse.json({
    source: {
      id: source.id,
      name: source.name,
      url: source.url,
      fetchMethod: source.fetchMethod,
      rssFeedUrl: source.rssFeedUrl,
      feedNote: source.feedNote,
    },
    ...result,
    isOpenApi: false,
    accessType:
      source.fetchMethod === "rss"
        ? "public-rss"
        : source.fetchMethod ?? "website-only",
  });
}
