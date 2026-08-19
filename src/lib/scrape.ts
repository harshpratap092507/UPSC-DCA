import { FeedItem } from "./feeds";

export const FETCH_HEADERS: Record<string, string> = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-IN,en;q=0.9",
};

export async function fetchText(
  url: string,
  init?: RequestInit
): Promise<{ text: string; ok: boolean; status: number }> {
  const headers = { ...FETCH_HEADERS, ...init?.headers };

  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(url, {
      ...init,
      headers,
      next: { revalidate: 0 },
    });
    const text = await res.text();
    if (res.ok || attempt === 1) {
      return { text, ok: res.ok, status: res.status };
    }
    await new Promise((r) => setTimeout(r, 500));
  }

  return { text: "", ok: false, status: 0 };
}

export function resolveUrl(href: string, base: string): string {
  try {
    return new URL(href, base).toString();
  } catch {
    return href;
  }
}

export function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&rsquo;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"');
}

/** Parse common date formats from listing pages */
export function parseListingDate(raw?: string): string {
  if (!raw) return new Date().toISOString();
  const cleaned = decodeHtmlEntities(raw).trim();

  // WTO: 2026.07.16_00:00:00
  const wto = cleaned.match(/^(\d{4})\.(\d{2})\.(\d{2})/);
  if (wto) return new Date(`${wto[1]}-${wto[2]}-${wto[3]}T12:00:00.000Z`).toISOString();

  // 19 August, 2026
  const dmy = cleaned.match(/(\d{1,2})\s+([A-Za-z]+),?\s+(\d{4})/);
  if (dmy) {
    const parsed = Date.parse(`${dmy[2]} ${dmy[1]}, ${dmy[3]}`);
    if (!Number.isNaN(parsed)) return new Date(parsed).toISOString();
  }

  const iso = Date.parse(cleaned);
  if (!Number.isNaN(iso)) return new Date(iso).toISOString();

  return new Date().toISOString();
}

export function item(
  title: string,
  url: string,
  summary = "",
  publishedAt?: string
): FeedItem {
  const cleanTitle = decodeHtmlEntities(stripTags(title));
  const cleanSummary = decodeHtmlEntities(stripTags(summary || cleanTitle));
  return {
    title: cleanTitle,
    url,
    publishedAt: publishedAt ?? new Date().toISOString(),
    summary: cleanSummary.slice(0, 300),
    content: cleanSummary ? [cleanSummary] : [cleanTitle],
  };
}

export function dedupeItems(items: FeedItem[]): FeedItem[] {
  const seen = new Set<string>();
  const out: FeedItem[] = [];
  for (const it of items) {
    const key = it.url.replace(/\/$/, "").toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(it);
  }
  return out;
}
