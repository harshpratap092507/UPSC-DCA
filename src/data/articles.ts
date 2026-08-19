import { Article, DayArchive, GSPaper, Lens } from "@/types";

const now = new Date();

function hoursAgo(h: number): string {
  return new Date(now.getTime() - h * 3600000).toISOString();
}

function daysAgo(d: number): string {
  return new Date(now.getTime() - d * 86400000).toISOString();
}

function todayISO(): string {
  return now.toISOString().slice(0, 10);
}

export const mockArticles: Article[] = [
  {
    id: "1",
    title:
      "Cabinet approves National Mission on Critical Minerals — self-reliance in rare earth elements",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2097308",
    sourceId: "pib",
    publishedAt: hoursAgo(1),
    summary:
      "Mission targets exploration, processing and recycling of lithium, cobalt, nickel for EV and defence sectors.",
    content: [
      "The Union Cabinet has approved the National Mission on Critical Minerals to secure India's supply chain for rare earth elements and strategic minerals essential for electric vehicles, renewable energy infrastructure and defence manufacturing.",
      "The mission will focus on exploration of lithium, cobalt, nickel and rare earth deposits within India and through strategic overseas partnerships, reducing import dependence that currently exceeds 80% for several critical inputs.",
      "A dedicated processing and recycling framework will be established to recover minerals from electronic waste and end-of-life batteries, aligned with circular economy principles under the Extended Producer Responsibility regime.",
      "The Ministry of Mines will coordinate with state governments for auction of critical mineral blocks, while PSUs and private entities will receive viability gap funding for setting up processing facilities.",
      "The mission complements the National Green Hydrogen Mission and PLI schemes for advanced chemistry cell batteries, forming an integrated industrial policy for India's clean energy transition.",
      "Officials noted that global supply concentration — particularly processing capacity in a handful of countries — creates geopolitical vulnerability that the mission seeks to mitigate through domestic capacity building.",
      "Environmental clearances will follow standard EIA norms; tribal and forest rights consultations are mandated before mining in scheduled areas under FRA and PESA frameworks.",
      "For UPSC Prelims: note the ministries involved, mission objectives, and linkages with EV policy. For Mains: analyse resource nationalism vs WTO trade obligations.",
    ],
    gsPaper: "GS-3",
    subTopic: "Economy & Industry",
    lens: "both",
    tags: ["scheme", "minerals", "EV"],
  },
  {
    id: "2",
    title:
      "Supreme Court delivers judgment on constitutional validity of Section 6A of Citizenship Act in Assam",
    url: "https://www.sci.gov.in/press-release/",
    sourceId: "supreme-court",
    publishedAt: hoursAgo(2),
    summary:
      "Five-judge Constitution Bench ruling on cut-off date for citizenship under Assam Accord implementation.",
    content: [
      "A five-judge Constitution Bench of the Supreme Court of India pronounced judgment on petitions challenging the constitutional validity of Section 6A of the Citizenship Act, 1955, as applicable to Assam.",
      "Section 6A was inserted following the Assam Accord of 1985 and provides a special citizenship regime for Assam with a cut-off date of 24 March 1971 for detection and deportation of foreigners.",
      "Petitioners argued that the provision violates Article 14 (equality) and Article 21 (life and personal liberty), while the Union government defended it as a political settlement reflecting Assam's unique demographic history.",
      "The Bench examined the interplay between the NRC (National Register of Citizens) process, Foreigners Tribunals, and the constitutional limits on differential citizenship regimes within a federal polity.",
      "The judgment has implications for lakhs of persons whose citizenship status remains contested, and for centre-state relations on immigration policy in border states.",
      "For GS-2 Mains: discuss judicial review, Article 14 reasonable classification, and federal tensions in citizenship policy. For Ethics: procedural fairness in NRC hearings.",
    ],
    gsPaper: "GS-2",
    subTopic: "Judiciary",
    lens: "mains",
    tags: ["constitutional", "citizenship", "Assam"],
  },
  {
    id: "3",
    title: "RBI Monetary Policy Committee keeps repo rate unchanged at 6.5%",
    url: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx",
    sourceId: "rbi",
    publishedAt: hoursAgo(3),
    summary:
      "MPC cites moderating inflation and need to support growth; GDP forecast revised upward.",
    content: [
      "The Reserve Bank of India's Monetary Policy Committee voted to keep the policy repo rate unchanged at 6.5%, maintaining a 'withdrawal of accommodation' stance.",
      "Headline CPI inflation has moderated towards the RBI's 4% medium-term target, though food price volatility remains a risk factor monitored through the summer monsoon outlook.",
      "The MPC noted resilient domestic growth driven by services and improving manufacturing capacity utilisation, while flagging global uncertainties from trade policy and geopolitical tensions.",
      "Liquidity conditions remain broadly balanced; the RBI continues to use variable rate repo and reverse repo operations for fine-tuning.",
      "For Prelims: know MPC composition (6 members, 3 RBI + 3 external), repo/reverse repo definitions, and inflation targeting framework (2016 amendment).",
    ],
    gsPaper: "GS-3",
    subTopic: "Indian Economy",
    lens: "both",
    tags: ["monetary policy", "repo rate", "inflation"],
  },
  {
    id: "4",
    title:
      "India hosts BRICS Environment Ministers' meeting — joint statement on climate finance",
    url: "https://www.mea.gov.in/press-releases.htm?51/BRICS",
    sourceId: "brics",
    publishedAt: hoursAgo(4),
    summary:
      "Ministers agree on technology transfer framework and loss-and-damage fund contributions.",
    content: [
      "India hosted the BRICS Environment Ministers' Meeting, where member nations adopted a joint statement emphasising common but differentiated responsibilities (CBDR) under the UNFCCC.",
      "The statement called for enhanced climate finance from developed countries, technology transfer without intellectual property barriers, and support for loss-and-damage mechanisms established at COP27.",
      "BRICS nations reiterated commitment to multilateralism in environmental governance and opposed unilateral carbon border adjustment measures as discriminatory trade barriers.",
      "India highlighted its LiFE (Lifestyle for Environment) initiative and National Action Plan on Climate Change as models for sustainable development in the Global South.",
    ],
    gsPaper: "GS-2",
    subTopic: "International Relations",
    lens: "mains",
    tags: ["BRICS", "climate", "multilateral"],
  },
  {
    id: "5",
    title:
      "MoEFCC notifies Wetlands (Conservation and Management) Amendment Rules",
    url: "https://moef.gov.in/en/",
    sourceId: "moefcc",
    publishedAt: hoursAgo(5),
    summary:
      "Amendment expands Ramsar site protection buffer zones and decentralises clearance for minor works.",
    content: [
      "The Ministry of Environment, Forest and Climate Change has notified amendments to the Wetlands (Conservation and Management) Rules under the Environment (Protection) Act, 1986.",
      "The rules expand buffer zone requirements for Ramsar sites and wetlands of national importance, restricting certain activities within designated eco-sensitive zones.",
      "Decentralised approval for minor repair works is introduced to reduce bureaucratic delays while maintaining oversight through state wetland authorities.",
      "India has 85+ Ramsar sites — the world's largest network — making wetland governance critical for biodiversity, groundwater recharge and flood moderation.",
      "For Prelims: Ramsar Convention (1971, Iran), Montreux Record, and difference between wetlands rules vs Forest Conservation Act.",
    ],
    gsPaper: "GS-3",
    subTopic: "Environment",
    lens: "prelims",
    tags: ["wetlands", "Ramsar", "environment"],
  },
  {
    id: "6",
    title:
      "Why urban heat islands are worsening in Tier-2 Indian cities",
    url: "https://www.downtoearth.org.in/climate-change/urban-heat-in-india-set-to-intensify-as-some-cities-warm-faster-new-research-finds",
    sourceId: "downtoearth",
    publishedAt: hoursAgo(6),
    summary:
      "Analysis of land use change, concrete cover and lack of green corridors in Indore, Coimbatore, Visakhapatnam.",
    content: [
      "Urban heat island (UHI) effect — where cities run significantly hotter than surrounding rural areas — is intensifying in India's Tier-2 cities as rapid expansion replaces vegetation with heat-absorbing concrete and asphalt.",
      "Studies in Indore, Coimbatore and Visakhapatnam show surface temperature differentials of 3–6°C during heatwave events, disproportionately affecting low-income neighbourhoods with limited tree cover.",
      "Factors include loss of water bodies, narrow street canyons trapping heat, air-conditioning waste heat, and construction material choices with high thermal mass.",
      "Mitigation strategies include cool roofs, urban forestry, permeable pavements, and integrating blue-green infrastructure in AMRUT and Smart Cities Mission projects.",
      "For GS-1 Geography Mains: link UHI to urbanisation patterns, climate change feedback loops, and equitable urban planning.",
    ],
    gsPaper: "GS-1",
    subTopic: "Geography",
    lens: "mains",
    tags: ["urbanisation", "climate", "geography"],
  },
  {
    id: "7",
    title:
      "PRS Bill Track: The Digital Personal Data Protection Bill, 2023",
    url: "https://prsindia.org/billtrack/digital-personal-data-protection-bill-2023",
    sourceId: "prs",
    publishedAt: hoursAgo(7),
    summary:
      "Bill Track analysis of consent, cross-border transfer, and Data Protection Board provisions.",
    content: [
      "PRS Legislative Research has published its Bill Track analysis of the Digital Personal Data Protection Bill, 2023, introduced in Parliament and subsequently enacted as the Digital Personal Data Protection Act, 2023.",
      "Key provisions include rules on consent-based processing, legitimate uses, cross-border data transfer, and establishment of the Data Protection Board of India.",
      "The Act applies to digital personal data processed in India and to processing outside India when offering goods or services to individuals in India.",
      "For GS-2: compare with EU GDPR, analyse balance between digital innovation and privacy rights, and role of the Data Protection Board.",
    ],
    gsPaper: "GS-2",
    subTopic: "Polity & Governance",
    lens: "both",
    tags: ["legislation", "data protection", "Lok Sabha"],
  },
  {
    id: "8",
    title:
      "UN Security Council discusses reform of veto power — India reiterates call for permanent seat",
    url: "https://news.un.org/en/story/2023/11/1143677",
    sourceId: "un",
    publishedAt: hoursAgo(8),
    summary:
      "G4 nations push for text-based negotiations; African Union demands two permanent seats.",
    content: [
      "The UN Security Council held discussions on reforming the veto power held by five permanent members (P5), amid growing calls for representation reflecting 21st century geopolitical realities.",
      "India, as part of the G4 (Brazil, Germany, India, Japan), reiterated its bid for a permanent seat with veto power, arguing that the Council's legitimacy is undermined without reform.",
      "The African Union demands two permanent seats for African nations, citing that 70%+ of UNSC agenda items relate to Africa while the continent has no permanent voice.",
      "Any reform requires amendment of the UN Charter under Article 108, needing two-thirds of General Assembly and ratification by all P5 — making substantive change extremely difficult.",
    ],
    gsPaper: "GS-2",
    subTopic: "International Relations",
    lens: "mains",
    tags: ["UNSC", "reform", "G4"],
  },
  {
    id: "9",
    title:
      "IMD issues red alert for Konkan & Goa — extremely heavy rainfall expected",
    url: "https://mausam.imd.gov.in/",
    sourceId: "imd",
    publishedAt: hoursAgo(9),
    summary:
      "Monsoon trough active; NDMA advises state disaster response forces to remain on standby.",
    content: [
      "The India Meteorological Department issued a red alert for Konkan and Goa, forecasting extremely heavy rainfall exceeding 20 cm in 24 hours in isolated locations.",
      "The active monsoon trough and an offshore trough along the Maharashtra-Goa coast are driving intense convection and orographic rainfall over the Western Ghats.",
      "NDMA has advised state disaster response forces to pre-position rescue teams and monitor landslide-prone slopes in Raigad, Ratnagiri and Sindhudurg districts.",
      "For Prelims: IMD colour-coded alerts (Green/Yellow/Orange/Red), monsoon mechanisms, and NDMA's role under DM Act 2005.",
    ],
    gsPaper: "GS-1",
    subTopic: "Geography",
    lens: "prelims",
    tags: ["monsoon", "disaster", "IMD"],
  },
  {
    id: "10",
    title:
      "ISRO successfully launches earth observation satellite for agriculture monitoring",
    url: "https://www.isro.gov.in/PSLV_Update.html",
    sourceId: "isro",
    publishedAt: hoursAgo(10),
    summary:
      "PSLV places satellite in sun-synchronous orbit; data for crop yield and water stress mapping.",
    content: [
      "ISRO's PSLV launch vehicle successfully placed an earth observation satellite into sun-synchronous orbit from Sriharikota.",
      "The satellite carries multispectral and hyperspectral imaging payloads for crop yield estimation, water stress mapping, and forest cover monitoring.",
      "Data will feed into the National Remote Sensing Centre and support PM-KISAN crop assessment, FCI procurement planning, and disaster damage assessment.",
      "For Prelims: PSLV vs GSLV, sun-synchronous orbit characteristics, and ISRO's commercial arm NewSpace India Limited (NSIL).",
    ],
    gsPaper: "GS-3",
    subTopic: "Science & Technology",
    lens: "prelims",
    tags: ["ISRO", "satellite", "agriculture"],
  },
  {
    id: "11",
    title:
      "WTO Ministerial: India opposes fisheries subsidies pact without S&DT for developing nations",
    url: "https://www.wto.org/english/tratop_e/rulesneg_e/fish_e/fish_e.htm",
    sourceId: "wto",
    publishedAt: hoursAgo(11),
    summary:
      "Commerce ministry cites livelihood of 9 million fisherfolk; demands longer transition period.",
    content: [
      "At the WTO Ministerial Conference, India opposed the fisheries subsidies agreement without adequate Special and Differential Treatment (S&DT) for developing nations.",
      "India argued that 9 million fisherfolk depend on traditional fishing and cannot be equated with industrial distant-water fleets of developed countries.",
      "The agreement aims to curb harmful subsidies contributing to overfishing, but developing nations seek longer transition periods and exemptions for small-scale artisanal fishing.",
      "For IR Mains: WTO decision-making (consensus), S&DT principle, and India's position as voice of Global South.",
    ],
    gsPaper: "GS-2",
    subTopic: "International Relations",
    lens: "mains",
    tags: ["WTO", "fisheries", "trade"],
  },
  {
    id: "12",
    title:
      "CAG report flags delays in PM-KISAN disbursements across multiple states",
    url: "https://cag.gov.in/en/audit-report",
    sourceId: "cag",
    publishedAt: hoursAgo(12),
    summary:
      "Performance audit finds Aadhaar seeding gaps and duplicate beneficiary entries.",
    content: [
      "The Comptroller and Auditor General's performance audit report identifies systemic delays in PM-KISAN instalment disbursements across several states.",
      "Key findings include incomplete Aadhaar seeding, duplicate beneficiary entries, and failure to reconcile state land records with central beneficiary databases.",
      "CAG recommends strengthening DBT infrastructure, periodic social audits, and mandatory grievance redressal timelines under the Citizen's Charter.",
      "For GS-2 Governance: role of CAG under Article 148, performance audit vs compliance audit, and DBT governance challenges.",
    ],
    gsPaper: "GS-2",
    subTopic: "Governance",
    lens: "both",
    tags: ["CAG", "PM-KISAN", "audit"],
  },
  {
    id: "13",
    title:
      "India and ASEAN elevate ties to Comprehensive Strategic Partnership",
    url: "https://www.mea.gov.in/press-releases.htm",
    sourceId: "mea",
    publishedAt: hoursAgo(14),
    summary:
      "Joint declaration covers connectivity, digital economy and Indo-Pacific security dialogue.",
    content: [
      "India and ASEAN elevated their relationship to a Comprehensive Strategic Partnership at the summit, signing agreements on digital economy, maritime security and connectivity.",
      "The joint declaration emphasises ASEAN centrality in the Indo-Pacific and India's Act East Policy alignment with the ASEAN Outlook on the Indo-Pacific.",
      "Trade under the ASEAN-India FTA will be reviewed to reduce non-tariff barriers; connectivity projects include the India-Myanmar-Thailand trilateral highway.",
    ],
    gsPaper: "GS-2",
    subTopic: "International Relations",
    lens: "mains",
    tags: ["ASEAN", "diplomacy", "Indo-Pacific"],
  },
  {
    id: "14",
    title: "MOSPI releases quarterly GDP data — services sector drives growth",
    url: "https://mospi.gov.in/web/mospi/press-release",
    sourceId: "mospi",
    publishedAt: hoursAgo(16),
    summary:
      "Manufacturing picks up; private consumption remains strong in urban centres.",
    content: [
      "The Ministry of Statistics and Programme Implementation released quarterly GDP estimates showing continued growth momentum led by the services sector.",
      "Manufacturing GVA showed improvement linked to PLI scheme investments; private final consumption expenditure remained the largest demand component.",
      "For Prelims: difference between GDP at market prices vs GVA at basic prices, base year revision (2011-12), and NSO vs CSO functions.",
    ],
    gsPaper: "GS-3",
    subTopic: "Indian Economy",
    lens: "prelims",
    tags: ["GDP", "growth", "statistics"],
  },
  {
    id: "15",
    title:
      "NDMA publishes national landslide risk atlas — Himalayan and Western Ghats regions",
    url: "https://ndma.gov.in/",
    sourceId: "ndma",
    publishedAt: hoursAgo(18),
    summary:
      "17 states in high-hazard zone; early warning systems to be deployed.",
    content: [
      "The National Disaster Management Authority released an updated landslide risk atlas identifying high-hazard zones across 17 states, particularly in the Himalayas and Western Ghats.",
      "The atlas integrates geological, rainfall and land-use data to support state-level landslide zonation and early warning system deployment.",
      "NDMA recommends community-based landslide monitoring in vulnerable villages and integration with IMD rainfall alerts for cascade hazard management.",
    ],
    gsPaper: "GS-3",
    subTopic: "Disaster Management",
    lens: "prelims",
    tags: ["landslide", "NDMA", "disaster"],
  },
  {
    id: "19",
    title:
      "Case study: Whistleblower protection and bureaucratic accountability in public procurement",
    url: "https://cag.gov.in/en/audit-report",
    sourceId: "cag",
    publishedAt: hoursAgo(20),
    summary:
      "Ethics case framing integrity, courage and public interest for GS-4 answer writing.",
    content: [
      "A district-level engineer discovers inflated bills in a road construction project funded under PMGSY. The contractor is politically connected.",
      "The engineer faces pressure to approve payments. Internal complaint channels are slow; the whistleblower fears transfer and harassment.",
      "Questions for GS-4: What values are in conflict (loyalty vs integrity, efficiency vs procedural justice)?",
      "Apply Nolan Committee principles, RTI Act 2005, Whistleblowers Protection Act provisions, and Kantian vs utilitarian reasoning.",
      "Discuss the role of CAG audit, Lokpal, and ethical leadership in creating speak-up culture in bureaucracy.",
    ],
    gsPaper: "GS-4",
    subTopic: "Case Studies",
    lens: "mains",
    tags: ["ethics", "whistleblower", "governance"],
  },
  {
    id: "16",
    title: "PM launches Viksit Bharat @2047 roadmap consultations",
    url: "https://pib.gov.in/Pressreleaseshare.aspx?PRID=2051773",
    sourceId: "pib",
    publishedAt: daysAgo(1),
    summary: "Nationwide stakeholder consultations for 2047 development vision.",
    content: [
      "The Prime Minister launched nationwide consultations for the Viksit Bharat @2047 roadmap, seeking inputs from states, industry, academia and civil society.",
      "The initiative aims to define measurable milestones across infrastructure, manufacturing, social sector and governance reforms leading to developed nation status by 2047.",
    ],
    gsPaper: "GS-2",
    subTopic: "Governance",
    lens: "mains",
    tags: ["policy", "Viksit Bharat"],
  },
  {
    id: "17",
    title: "RBI Financial Stability Report highlights NBFC sector resilience",
    url: "https://www.rbi.org.in/Scripts/AnnualPublications.aspx?head=Financial%20Stability%20Report",
    sourceId: "rbi",
    publishedAt: daysAgo(1),
    summary: "Macro stress tests show banking system capital adequacy remains robust.",
    content: [
      "The RBI's Financial Stability Report notes improved asset quality in the banking sector and resilient NBFC balance sheets despite global financial market volatility.",
      "Macro stress tests indicate banks would maintain capital adequacy above regulatory minima under adverse scenarios.",
    ],
    gsPaper: "GS-3",
    subTopic: "Indian Economy",
    lens: "mains",
    tags: ["NBFC", "financial stability"],
  },
  {
    id: "18",
    title:
      "Half of India's women farmers recorded as unpaid helpers, report says",
    url: "https://www.downtoearth.org.in/agriculture/half-of-indias-women-farmers-recorded-as-unpaid-helpers-report-says",
    sourceId: "downtoearth",
    publishedAt: daysAgo(2),
    summary:
      "Arya.ag report estimates Rs 1.2–2 lakh crore annual output loss from recognition gap.",
    content: [
      "A new report by Arya.ag finds that 50.5% of women working in agriculture are classified as unpaid helpers rather than farmers, limiting access to credit, procurement and extension services.",
      "Women operate only 11.72% of India's farmed area despite comprising 48% of the agricultural workforce.",
      "The report estimates annual output losses of Rs 1.2–2 lakh crore from unequal access to productive resources.",
      "For GS-1 Society Mains: gender gap in agriculture, land ownership patterns, and policy recommendations for recognising women as farmers.",
    ],
    gsPaper: "GS-1",
    subTopic: "Society",
    lens: "mains",
    tags: ["agriculture", "women", "gender"],
  },
];

export const articles = mockArticles;

export function getArticlesBySource(sourceId: string): Article[] {
  return mockArticles.filter((a) => a.sourceId === sourceId);
}

export function getArticlesByGS(gsPaper: GSPaper): Article[] {
  return mockArticles.filter((a) => a.gsPaper === gsPaper);
}

export function getArticlesByLens(lens: Lens): Article[] {
  if (lens === "both") return mockArticles;
  return mockArticles.filter((a) => a.lens === lens || a.lens === "both");
}

export function getArticlesByDate(dateStr: string): Article[] {
  return mockArticles.filter((a) => a.publishedAt.startsWith(dateStr));
}

export function getTodayArticles(): Article[] {
  return getArticlesByDate(todayISO());
}

export function getNewCountBySource(sourceId: string): number {
  const today = getTodayArticles();
  return today.filter((a) => a.sourceId === sourceId).length;
}

export function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

export function getDayArchives(): DayArchive[] {
  const byDate = new Map<string, Article[]>();
  for (const a of mockArticles) {
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

export const GS_SUBTOPICS: Record<GSPaper, string[]> = {
  "GS-1": ["History & Culture", "Society", "Geography"],
  "GS-2": ["Polity & Governance", "Judiciary", "International Relations"],
  "GS-3": [
    "Indian Economy",
    "Environment",
    "Science & Technology",
    "Disaster Management",
    "Security",
  ],
  "GS-4": ["Ethics & Integrity", "Case Studies", "Aptitude"],
};

export const GS_LABELS: Record<GSPaper, string> = {
  "GS-1": "History · Society · Geography",
  "GS-2": "Polity · Governance · IR",
  "GS-3": "Economy · Environment · Security · S&T",
  "GS-4": "Ethics · Integrity · Case Studies",
};
