import Parser from "rss-parser";
import { sources } from "@/data/sources";
import { FETCH_HEADERS } from "./scrape";

const parser = new Parser({
  timeout: 30000,
  headers: {
    ...FETCH_HEADERS,
    Accept: "application/rss+xml, application/xml, text/xml,*/*;q=0.8",
  },
});

export interface FeedItem {
  title: string;
  url: string;
  publishedAt: string;
  summary: string;
  content: string[];
}

/** Strip HTML tags from RSS content */
function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function htmlToParagraphs(html: string): string[] {
  const text = html
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "");
  return stripHtml(text)
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 40);
}

export async function fetchSourceFeed(
  sourceId: string
): Promise<{ items: FeedItem[]; error?: string }> {
  const source = sources.find((s) => s.id === sourceId);
  if (!source) return { items: [], error: "Unknown source" };
  if (!source.rssFeedUrl)
    return {
      items: [],
      error: "No public RSS feed — this source uses website-only publishing (not an open REST API).",
    };

  try {
    let feed;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        feed = await parser.parseURL(source.rssFeedUrl);
        break;
      } catch (err) {
        if (attempt === 1) throw err;
        await new Promise((r) => setTimeout(r, 800));
      }
    }
    const items: FeedItem[] = (feed!.items ?? []).slice(0, 20).map((item) => {
      const rawContent =
        item["content:encoded"] || item.content || item.contentSnippet || "";
      const paragraphs = htmlToParagraphs(String(rawContent));
      const summary =
        item.contentSnippet?.trim() ||
        paragraphs[0]?.slice(0, 200) ||
        item.title ||
        "";

      return {
        title: item.title ?? "Untitled",
        url: item.link ?? source.url,
        publishedAt: item.isoDate ?? item.pubDate ?? new Date().toISOString(),
        summary,
        content: paragraphs.length > 0 ? paragraphs : [summary],
      };
    });

    return { items };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Feed fetch failed";
    return { items: [], error: message };
  }
}
