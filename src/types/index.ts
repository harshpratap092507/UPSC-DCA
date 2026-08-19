export type GSPaper = "GS-1" | "GS-2" | "GS-3" | "GS-4";

export type SourceGroup =
  | "government"
  | "economy"
  | "environment"
  | "judiciary"
  | "international"
  | "polity"
  | "geography";

export type Lens = "prelims" | "mains" | "both";

export interface Source {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  /** Verified homepage or section URL */
  url: string;
  group: SourceGroup;
  icon: string;
  gsPapers: GSPaper[];
  fetchIntervalMinutes: number;
  /** How Phase 9 fetcher reads this source: rss | press-listing | report-index */
  fetchMethod?: "rss" | "press-listing" | "report-index";
  /** RSS/Atom feed if publicly available (not a REST API) */
  rssFeedUrl?: string;
  /** Human-readable note on data access */
  feedNote?: string;
}

export interface Article {
  id: string;
  title: string;
  /** Verified permalink to the specific article or official listing */
  url: string;
  sourceId: string;
  publishedAt: string;
  summary?: string;
  /** Full text split into paragraphs for in-app reading */
  content?: string[];
  gsPaper: GSPaper;
  subTopic: string;
  lens: Lens;
  tags: string[];
}

export interface DayArchive {
  date: string;
  articleCount: number;
  sourceCount: number;
  gsBreakdown: Partial<Record<GSPaper, number>>;
}
