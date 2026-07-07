# TFB — The F1 Bulletin

A Formula 1 stats and live-timing site built with Next.js 14 (App Router) + TypeScript.

## Data sources

- **[OpenF1](https://openf1.org/)** — live and recent session data (positions, intervals, weather,
  race control). Free, no key required, but only covers 2023-onward and has tight rate limits, so
  every call is cached via Next's `fetch` `revalidate`.
- **[Jolpica](https://github.com/jolpica/jolpica-f1)** — Ergast-compatible historical data (drivers'
  and constructors' standings, race results, schedules) back to 1950.

## Structure

```
app/
  page.tsx           Homepage — hero, session ticker, standings snippet, latest result, articles
  dashboard/page.tsx  Live dashboard — live timing when a session is running, else last classification
  standings/page.tsx  Full drivers' & constructors' standings
  articles/page.tsx   Editorial grid (static placeholder copy)
  layout.tsx          Root layout, fonts, header/footer
  globals.css         Design tokens & all page styles
lib/
  openf1.ts     OpenF1 client
  jolpica.ts    Jolpica client
  ticker.ts     Builds the session ticker from the season schedule
  teamColors.ts Constructor → brand color mapping
components/
  Header.tsx, Footer.tsx, SessionTicker.tsx, StandingsPanels.tsx
```

## Fonts

- **Titillium Web** — display face (closest freely-licensable match to F1's proprietary
  "Formula1 Display" typeface, which cannot be used outside official F1 properties)
- **Inter** — body copy
- **JetBrains Mono** — data, timestamps, labels

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Notes

- No API keys needed for either data source.
- OpenF1 has no data before 2023 — the dashboard will show "no session" outside that range until a
  live weekend begins.
- Team colors for brand-new 2026 entrants (Cadillac, Audi) are mapped by name-matching since Jolpica
  may not yet have stable `constructorId`s for them.
