# UPSC Desk

Personal UPSC CSE dashboard — aggregates current affairs from gov.in, RBI, UN, environment, judiciary and more.

**Standalone repository** — not part of `dronacharya-fe` or any other project.

Location: `/Users/harshpratap/sites/upsc-desk`

## Run locally

```bash
cd /Users/harshpratap/sites/upsc-desk
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Today's merged feed + source strips |
| `/prelims` | Prelims lens |
| `/mains` | Mains lens |
| `/gs-1` … `/gs-4` | GS paper feeds |
| `/sources` | All source panels |
| `/sources/[slug]` | Single source feed |
| `/daily` | Date archive |
| `/daily/2026/08/19` | Day brief |
| `/saved` | Bookmarked articles (localStorage) |

## Build phases

- [x] Phase 1–8: UI shell, mock data, all pages, save/bookmark
- [ ] Phase 9: RSS fetcher (real feeds)
- [ ] Phase 10: Auth + PWA

## Responsive

- **Mobile**: bottom tab bar (Today, Sources, GS, Saved)
- **iPad/Desktop**: top nav + left sidebar
