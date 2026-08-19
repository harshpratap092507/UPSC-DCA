import { getSourceById } from "@/data/sources";
import { FeedItem } from "../feeds";
import {
  dedupeItems,
  fetchText,
  item,
  parseListingDate,
  resolveUrl,
  stripTags,
} from "../scrape";

export type ScrapeResult = { items: FeedItem[]; error?: string };

const BLOCKED_MSG =
  "Source blocked bot access (403/503) — needs server-side whitelist or manual fetch.";
const JS_ONLY_MSG =
  "Listing is JavaScript-rendered — no static HTML/API available yet.";

async function scrapeRbi(): Promise<FeedItem[]> {
  const base = "https://www.rbi.org.in";
  const { text, ok } = await fetchText(`${base}/Scripts/BS_PressReleaseDisplay.aspx`);
  if (!ok) throw new Error(`RBI listing HTTP error`);

  const items: FeedItem[] = [];
  const re =
    /BS_PressReleaseDisplay\.aspx\?prid=(\d+)[^>]*>([^<]+)</gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) && items.length < 20) {
    const url = `${base}/Scripts/BS_PressReleaseDisplay.aspx?prid=${m[1]}`;
    items.push(item(m[2], url));
  }
  return items;
}

async function scrapeMeaListing(
  publicationId: number,
  keyword?: string
): Promise<FeedItem[]> {
  const base = "https://www.mea.gov.in";
  const params = new URLSearchParams({
    publicationId: String(publicationId),
    page: "1",
    PageSize: "20",
    PLngId: "1",
    SortBy: "1",
    KeywordName: keyword ?? "",
  });
  const { text, ok } = await fetchText(
    `${base}/FrontEnd/FetchPublicationListingData?${params}`
  );
  if (!ok) throw new Error("MEA listing API failed");

  const items: FeedItem[] = [];
  const blocks = text.split('<div class="pressRelesastBox">').slice(1);

  for (const block of blocks.slice(0, 20)) {
    const dateMatch = block.match(/<span class="date">([^<]+)</);
    const linkMatch = block.match(
      /<a href="(\/press-releases\?dtl\/[^"]+)">\s*([\s\S]*?)\s*<\/a>/
    );
    if (!linkMatch) continue;
    const url = resolveUrl(linkMatch[1], base);
    const title = stripTags(linkMatch[2]);
    const publishedAt = parseListingDate(dateMatch?.[1]);
    items.push(item(title, url, "", publishedAt));
  }
  return items;
}

async function scrapePibListing(): Promise<FeedItem[]> {
  const base = "https://pib.gov.in";
  const { text, ok } = await fetchText(`${base}/indexd.aspx`);
  if (!ok) throw new Error("PIB listing failed");

  const items: FeedItem[] = [];
  const re = /PressReleaseDetail\.aspx\?PRID=(\d+)'[^>]*>([^<]+)</gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) && items.length < 20) {
    items.push(
      item(m[2], `${base}/PressReleasePage.aspx?PRID=${m[1]}`)
    );
  }
  return items;
}

async function scrapeSupremeCourt(): Promise<FeedItem[]> {
  const base = "https://www.sci.gov.in";
  const { text, ok } = await fetchText(`${base}/press-release/`);
  if (!ok) throw new Error("SC press listing failed");

  const items: FeedItem[] = [];
  const re = /href="(https:\/\/www\.sci\.gov\.in\/press-release[^"]+)"/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) && items.length < 20) {
    const url = m[1];
    if (url.endsWith("/press-release/")) continue;
    const slug = url.split("/").pop()?.replace(/-/g, " ") ?? "Press release";
    items.push(item(slug, url));
  }
  return dedupeItems(items);
}

async function scrapePrs(): Promise<FeedItem[]> {
  const base = "https://prsindia.org";
  const { text, ok } = await fetchText(`${base}/billtrack`);
  if (!ok) throw new Error("PRS billtrack failed");

  const items: FeedItem[] = [];
  const re = /href="(\/billtrack\/[a-z0-9-]+)"/gi;
  const skip = new Set(["category", "field_bill_category"]);
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) && items.length < 20) {
    const slug = m[1].split("/").pop() ?? "";
    if (skip.has(slug) || slug === "all") continue;
    const url = `${base}${m[1]}`;
    const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    items.push(item(title, url));
  }
  return dedupeItems(items);
}

async function scrapeIsro(): Promise<FeedItem[]> {
  const base = "https://www.isro.gov.in";
  const { text, ok } = await fetchText(`${base}/Updates.html`);
  if (!ok) throw new Error("ISRO updates failed");

  const items: FeedItem[] = [];
  const re = /href="(updates_[^"]+\.html)"[^>]*>([^<]*)</gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) && items.length < 20) {
    const title = stripTags(m[2]) || m[1].replace(/updates_|\.html/g, " ").replace(/_/g, " ");
    items.push(item(title, `${base}/${m[1]}`));
  }
  return items;
}

async function scrapeCse(): Promise<FeedItem[]> {
  const base = "https://www.cseindia.org";
  const { text, ok } = await fetchText(`${base}/news`);
  if (!ok) throw new Error("CSE news failed");

  const items: FeedItem[] = [];
  const re = /href="(\/[a-z0-9-]+-\d+)"/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) && items.length < 20) {
    const slug = m[1].slice(1);
    const title = slug.replace(/-\d+$/, "").replace(/-/g, " ");
    items.push(item(title, `${base}${m[1]}`));
  }
  return dedupeItems(items);
}

async function scrapeCag(): Promise<FeedItem[]> {
  const base = "https://cag.gov.in";
  const { text, ok } = await fetchText(`${base}/en/audit-report?page=0`);
  if (!ok) throw new Error("CAG audit listing failed");

  const items: FeedItem[] = [];
  const re =
    /<a href="(\/en\/audit-report\/details\/\d+)">([^<]+)</gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) && items.length < 20) {
    items.push(item(m[2], `${base}${m[1]}`));
  }
  return items;
}

async function scrapeImd(): Promise<FeedItem[]> {
  const base = "https://metnet.imd.gov.in/phps";
  const { text, ok } = await fetchText(`${base}/imdweb_imdnews.php`);
  if (!ok) throw new Error("IMD news bulletin listing failed");

  const items: FeedItem[] = [];
  const re = /href="\.\.\/docs\/imdnews\/([^"]+\.pdf)"/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) && items.length < 20) {
    if (m[1].includes("Hindi")) continue;
    const title = `IMD Mausam Newsletter — ${m[1].replace(".pdf", "")}`;
    items.push(
      item(title, `https://metnet.imd.gov.in/docs/imdnews/${m[1]}`)
    );
  }
  return items;
}

async function scrapeNdma(): Promise<FeedItem[]> {
  const base = "https://ndma.gov.in";
  const { text, ok } = await fetchText(`${base}/media-gallery`);
  if (!ok) throw new Error("NDMA media gallery failed");

  const items: FeedItem[] = [];
  const re = /href="(?:https:\/\/ndma\.gov\.in)?(\/node\/\d+)"/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) && items.length < 20) {
    items.push(item("NDMA update", `${base}${m[1]}`));
  }
  return dedupeItems(items);
}

async function scrapeLawCommission(): Promise<FeedItem[]> {
  const base = "https://lawcommissionofindia.nic.in";
  const { text, ok } = await fetchText(`${base}/`);
  if (!ok) throw new Error("Law Commission homepage failed");

  const items: FeedItem[] = [];
  const re =
    /href="(https:\/\/lawcommissionofindia\.nic\.in\/(?:document|notice|event)\/[^"]+)"/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) && items.length < 20) {
    const slug = m[1].split("/").pop()?.replace(/-/g, " ") ?? "Report";
    items.push(item(slug, m[1]));
  }
  return dedupeItems(items);
}

async function scrapeIndiabudget(): Promise<FeedItem[]> {
  const base = "https://www.indiabudget.gov.in/budget2025-26";
  const { text, ok } = await fetchText(`${base}/`);
  if (!ok) throw new Error("India Budget index failed");

  const items: FeedItem[] = [];
  const re = /href="(doc\/[^"]+\.(?:pdf|html))"/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) && items.length < 20) {
    const name = m[1].split("/").pop()?.replace(/_/g, " ").replace(/\.\w+$/, "") ?? m[1];
    items.push(item(name, `${base}/${m[1]}`));
  }
  return dedupeItems(items);
}

async function scrapeDoe(): Promise<FeedItem[]> {
  const base = "https://doe.gov.in";
  const { text, ok } = await fetchText(`${base}/press-releases`);
  if (!ok) throw new Error("DoE press releases failed");

  const items: FeedItem[] = [];
  const pdfRe = /href="(\/files\/press_release_documents\/[^"]+\.pdf)"/gi;
  let m: RegExpExecArray | null;
  while ((m = pdfRe.exec(text)) && items.length < 20) {
    const name = m[1].split("/").pop()?.replace(/\.pdf/i, "") ?? "Press release";
    items.push(item(name, `${base}${m[1]}`));
  }
  return items;
}

async function scrapeWto(): Promise<FeedItem[]> {
  const year = new Date().getFullYear();
  const { text, ok } = await fetchText(
    `https://www.wto.org/library/news/news_${year}_e.js`
  );
  if (!ok) throw new Error("WTO news JS feed failed");

  const items: FeedItem[] = [];
  const blockRe = /news_item\[\d+\]\s*=\s*\{([\s\S]*?)\};/g;
  let block: RegExpExecArray | null;
  while ((block = blockRe.exec(text)) && items.length < 20) {
    const chunk = block[1];
    const head = chunk.match(/ni_head:"([^"]+)"/)?.[1];
    const date = chunk.match(/ni_date:"([^"]+)"/)?.[1];
    const urlPath = chunk.match(/nl_url:"([^"]+)"/)?.[1];
    if (!head || !urlPath) continue;
    items.push(
      item(
        head,
        `https://www.wto.org${urlPath}`,
        chunk.match(/ni_intro:"([^"]*)"/)?.[1] ?? "",
        parseListingDate(date)
      )
    );
  }
  return items;
}

async function scrapeFinancialServices(): Promise<FeedItem[]> {
  const base = "https://financialservices.gov.in";
  const { text, ok } = await fetchText(base);
  if (!ok) throw new Error("DFS homepage failed");

  const items: FeedItem[] = [];
  const re = /href="(https:\/\/www\.pib\.gov\.in\/PressReleasePage\.aspx\?PRID=\d+[^"]*)"/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) && items.length < 20) {
    items.push(item("DFS — PIB release", m[1].replace(/&amp;/g, "&")));
  }
  if (items.length === 0) {
    const local = /href="(\/press-release[^"]*)"/gi;
    while ((m = local.exec(text)) && items.length < 20) {
      items.push(item("DFS press release", `${base}${m[1]}`));
    }
  }
  return dedupeItems(items);
}

async function scrapeSurveyOfIndia(): Promise<FeedItem[]> {
  const base = "https://surveyofindia.gov.in";
  const { text, ok } = await fetchText(`${base}/pages/news-and-events`);
  if (!ok) throw new Error("Survey of India news page failed");

  const items: FeedItem[] = [];
  const re = /href="(\/pages\/[^"]+)"[^>]*>([^<]{10,})</gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) && items.length < 15) {
    if (m[1] === "/pages/news-and-events") continue;
    items.push(item(m[2], `${base}${m[1]}`));
  }
  return items;
}

/** Sources that need JS rendering or block bots — return empty with message */
const UNAVAILABLE: Record<string, string> = {
  moefcc: JS_ONLY_MSG,
  mospi: JS_ONLY_MSG,
  meity: JS_ONLY_MSG,
  mha: BLOCKED_MSG,
  commerce: BLOCKED_MSG,
  eci: BLOCKED_MSG,
  imf: BLOCKED_MSG,
  sebi: "SEBI site returned 530 — temporarily unavailable to bots.",
  dof: BLOCKED_MSG,
  mines: BLOCKED_MSG,
  "world-bank": JS_ONLY_MSG,
  darpg: JS_ONLY_MSG,
  agriwelfare: JS_ONLY_MSG,
};

const SCRAPERS: Record<string, () => Promise<FeedItem[]>> = {
  pib: scrapePibListing,
  rbi: scrapeRbi,
  mea: () => scrapeMeaListing(51),
  brics: () => scrapeMeaListing(51, "BRICS"),
  "supreme-court": scrapeSupremeCourt,
  prs: scrapePrs,
  isro: scrapeIsro,
  cse: scrapeCse,
  cag: scrapeCag,
  imd: scrapeImd,
  ndma: scrapeNdma,
  "law-commission": scrapeLawCommission,
  indiabudget: scrapeIndiabudget,
  doe: scrapeDoe,
  wto: scrapeWto,
  dfs: scrapeFinancialServices,
  "survey-of-india": scrapeSurveyOfIndia,
};

export async function fetchScrapedSource(sourceId: string): Promise<ScrapeResult> {
  const source = getSourceById(sourceId);
  if (!source) return { items: [], error: "Unknown source" };

  const unavailable = UNAVAILABLE[sourceId];
  if (unavailable) return { items: [], error: unavailable };

  const scraper = SCRAPERS[sourceId];
  if (!scraper) {
    return {
      items: [],
      error: `No scraper configured for ${sourceId} (${source.fetchMethod})`,
    };
  }

  try {
    const items = await scraper();
    if (items.length === 0) {
      return { items: [], error: "Listing parsed but no items found" };
    }
    return { items: dedupeItems(items).slice(0, 20) };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Scrape failed";
    return { items: [], error: message };
  }
}

export async function fetchSourceItems(
  sourceId: string
): Promise<ScrapeResult> {
  const source = getSourceById(sourceId);
  if (!source) return { items: [], error: "Unknown source" };

  if (source.fetchMethod === "rss" && source.rssFeedUrl) {
    const { fetchSourceFeed } = await import("../feeds");
    const rss = await fetchSourceFeed(sourceId);
    if (rss.items.length > 0) return rss;

    // PIB RSS is often empty — fall back to listing scrape
    if (sourceId === "pib") {
      const scraped = await fetchScrapedSource("pib");
      if (scraped.items.length > 0) return scraped;
    }
    return rss;
  }

  return fetchScrapedSource(sourceId);
}
