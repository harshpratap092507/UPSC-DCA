import { getSourceById } from "@/data/sources";
import { GSPaper, Lens } from "@/types";

const GS_KEYWORDS: Record<GSPaper, string[]> = {
  "GS-1": [
    "geography",
    "society",
    "culture",
    "history",
    "urban",
    "agriculture",
    "farmer",
    "women",
    "tribal",
    "monsoon",
    "earthquake",
    "population",
  ],
  "GS-2": [
    "polity",
    "parliament",
    "election",
    "judiciary",
    "court",
    "diplomacy",
    "foreign",
    "un security",
    "governance",
    "bill",
    "lok sabha",
    "constitutional",
    "citizenship",
  ],
  "GS-3": [
    "economy",
    "gdp",
    "inflation",
    "rbi",
    "bank",
    "environment",
    "climate",
    "biodiversity",
    "wetland",
    "security",
    "defence",
    "isro",
    "satellite",
    "technology",
    "disaster",
    "trade",
    "fiscal",
  ],
  "GS-4": [
    "ethics",
    "integrity",
    "whistleblower",
    "corruption",
    "accountability",
    "moral",
    "values",
  ],
};

const PRELIMS_KEYWORDS = [
  "launched",
  "appointed",
  "index",
  "rank",
  "report",
  "scheme",
  "portal",
  "survey",
  "declared",
  "notified",
  "signed",
  "mou",
  "percent",
  "crore",
  "billion",
];

const MAINS_KEYWORDS = [
  "analysis",
  "implication",
  "challenge",
  "reform",
  "committee",
  "framework",
  "strategy",
  "impact",
  "debate",
  "critical",
  "perspective",
];

const SUBTOPIC_MAP: Record<GSPaper, Record<string, string[]>> = {
  "GS-1": {
    Geography: ["geography", "monsoon", "climate", "urban", "disaster", "landslide"],
    Society: ["society", "women", "farmer", "gender", "tribal", "health"],
    "History & Culture": ["history", "culture", "heritage"],
  },
  "GS-2": {
    "Polity & Governance": ["polity", "parliament", "bill", "governance", "election"],
    Judiciary: ["court", "judiciary", "supreme", "judgment"],
    "International Relations": ["diplomacy", "foreign", "un ", "wto", "brics", "asean"],
  },
  "GS-3": {
    "Indian Economy": ["economy", "gdp", "inflation", "rbi", "fiscal", "trade"],
    Environment: ["environment", "climate", "biodiversity", "wetland", "forest"],
    "Science & Technology": ["isro", "satellite", "technology", "digital", "ai"],
    "Disaster Management": ["disaster", "ndma", "landslide", "flood", "cyclone"],
    Security: ["security", "defence", "terror", "cyber"],
  },
  "GS-4": {
    "Case Studies": ["case", "whistleblower", "corruption"],
    "Ethics & Integrity": ["ethics", "integrity", "values", "moral"],
    Aptitude: ["aptitude"],
  },
};

function scoreKeywords(text: string, keywords: string[]): number {
  const lower = text.toLowerCase();
  return keywords.reduce((n, kw) => (lower.includes(kw) ? n + 1 : n), 0);
}

export function classifyArticle(
  title: string,
  summary: string,
  sourceId: string
): { gsPaper: GSPaper; subTopic: string; lens: Lens; tags: string[] } {
  const source = getSourceById(sourceId);
  const text = `${title} ${summary}`;
  const lower = text.toLowerCase();

  let bestGs: GSPaper = source?.gsPapers[0] ?? "GS-2";
  let bestScore = 0;
  for (const [gs, keywords] of Object.entries(GS_KEYWORDS) as [GSPaper, string[]][]) {
    let score = scoreKeywords(text, keywords);
    if (source?.gsPapers.includes(gs)) score += 1;
    if (score > bestScore) {
      bestScore = score;
      bestGs = gs;
    }
  }

  let subTopic = "General";
  const topics = SUBTOPIC_MAP[bestGs];
  for (const [label, keywords] of Object.entries(topics)) {
    if (scoreKeywords(text, keywords) > 0) {
      subTopic = label;
      break;
    }
  }

  const prelimsScore = scoreKeywords(text, PRELIMS_KEYWORDS);
  const mainsScore = scoreKeywords(text, MAINS_KEYWORDS);
  let lens: Lens = "both";
  if (prelimsScore > mainsScore + 1) lens = "prelims";
  else if (mainsScore > prelimsScore + 1) lens = "mains";

  const tags: string[] = [];
  for (const [, keywords] of Object.entries(GS_KEYWORDS) as [GSPaper, string[]][]) {
    for (const kw of keywords) {
      if (lower.includes(kw) && !tags.includes(kw.replace(/\s+/g, "-"))) {
        tags.push(kw.replace(/\s+/g, "-"));
      }
    }
  }

  return { gsPaper: bestGs, subTopic, lens, tags: tags.slice(0, 5) };
}
