# TFB — The F1 Bulletin

Formula 1 stats, standings, and session tracking, built with Next.js 14 and two free public F1 APIs — no backend, no database, no API keys.

> **🚧 Status: in active development.** Core pages are up and the API integrations work, but this isn't a finished product yet. Expect rough edges, incomplete states, and breaking changes while it's being built out. See [Known limitations](#known-limitations) and [Roadmap](#roadmap) below before relying on it for anything.

## What's here

- **Home** — hero, this weekend's session schedule, a championship standings snippet, and the latest race result
- **Live Dashboard** — session classification (live where available, otherwise the most recent completed session), race control messages, weather
- **Standings** — full drivers' and constructors' tables for the current season
- **Articles** — static editorial placeholder grid (no CMS yet)

## Data sources

| Source | Used for | Auth | Coverage |
|---|---|---|---|
| [OpenF1](https://openf1.org/) | Session classification, weather, race control | None (free tier) | 2023–present |
| [Jolpica](https://github.com/jolpica/jolpica-f1) (Ergast-compatible) | Standings, results, schedules | None | 1950–present |

**Important caveat on OpenF1:** its free tier is historical-only — a session's data becomes available roughly 30 minutes after it ends. True live, in-progress timing requires OpenF1's paid Sponsor plan. This app is built to handle that gracefully: during a live session, the dashboard shows an explicit notice instead of a blank table, and fills in automatically once the session goes historical. If you have (or add) sponsor-tier access, wiring in real live timing is straightforward — see [Roadmap](#roadmap).

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- Self-hosted fonts via [Fontsource](https://fontsource.org/) — Titillium Web, Inter, JetBrains Mono
- No CSS framework — hand-written design system in `app/globals.css`
- No database — all data is fetched server-side from the two APIs above, cached with Next's `fetch` revalidation

## Getting started

```bash
git clone <this-repo>
cd tfb-f1
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables or API keys are required.

## Project structure

```
.
├── .gitignore
├── README.md
├── LICENSE
├── next.config.mjs
├── package.json
├── package-lock.json
├── tsconfig.json
├── app/
│   ├── globals.css          Design tokens and all page styles
│   ├── layout.tsx           Root layout, fonts, header/footer
│   ├── page.tsx             Homepage
│   ├── articles/
│   │   └── page.tsx         Editorial grid (placeholder content)
│   ├── dashboard/
│   │   └── page.tsx         Live/last-session dashboard
│   └── standings/
│       └── page.tsx         Full championship standings
├── components/
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── SessionTicker.tsx
│   └── StandingsPanels.tsx
└── lib/
    ├── jolpica.ts           Jolpica API client
    ├── openf1.ts            OpenF1 API client
    ├── teamColors.ts        Constructor → brand color mapping
    └── ticker.ts            Builds the session ticker from the season schedule
```

## Known limitations

- Live in-session timing doesn't populate on OpenF1's free tier (see above)
- Articles are static placeholder content — there's no CMS or data source behind them yet
- No driver or team profile pages yet
- No historical season browsing (standings only shows the current season)
- Team colors for brand-new entrants are matched by name rather than a stable ID, since Jolpica may not have assigned one yet
- No test coverage yet

## Roadmap

- [ ] Driver and constructor profile pages
- [ ] Historical season browsing (pick any year, 1950–present)
- [ ] Real live-timing source (either OpenF1 sponsor tier or an alternative feed)
- [ ] Replace placeholder articles with real content or a lightweight CMS
- [ ] Basic test coverage

## Disclaimer

This is an independent, unofficial project. It is not affiliated with, endorsed by, or connected to Formula 1, FOM, the FIA, or any team. Data is provided by OpenF1 and Jolpica under their respective terms of use.

## License

[MIT](./LICENSE)