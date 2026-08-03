# F1 Fan Paddock

F1 Fan Paddock is a modern Formula 1 information experience built with Next.js and TypeScript. It combines public motorsport data from OpenF1 and Jolpica-F1 into a polished, dark-theme dashboard styled like an editorial paddock bulletin. The app presents live or recently completed session data, championship standings, race results, season and circuit history, and a premium F1-inspired interface with custom typography, motion cues, and strong visual branding.

This project is a front-end web application with no backend or database. All content is fetched directly from public APIs at runtime and cached using Next.js revalidation settings.

---

## 1. Project Overview

The goal of the project is to create an immersive Formula 1 experience that feels like a digital race-weekend paddock with:

- live and historical session context
- championship standings and results
- season-by-season and circuit history
- all-time statistics and iconic moments
- a premium editorial presentation
- a dark, technical, racing-inspired UI
- fast server-rendered pages built on the Next.js App Router

The project is designed to feel more like a motorsport media product than a plain data dashboard.

---

## 2. What the App Includes

### Main pages
- **Home** (`/`): hero section, championship summary, next-race countdown and weather, standings snippet, recent race result, and explore cards
- **Dashboard** (`/dashboard`): race-weekend framing with countdown, weather, and standings panels
- **Driver Standings** (`/driver-standings`): championship table with driver numbers, teams, points, wins, podiums, and pole positions
- **Constructors** (`/constructors`): team championship cards with driver lineups and season stats
- **Race Results** (`/results`): race-by-race results and podium breakdowns
- **Seasons** (`/seasons`): season history, champions, and standings overview
- **Circuits** (`/circuits`): circuit list with track layouts and stats
- **Statistics** (`/statistics`): all-time leaderboards across wins, podiums, poles, and head-to-heads
- **Moments** (`/moments`): editorial highlight and iconic-moment content
- **Articles** (`/articles`): editorial-style content landing view

### Functional areas
- live session badge logic
- dynamic countdown logic for upcoming race weekends
- standings panels with driver and constructor information
- session ticker that highlights weekend sessions
- live weather forecast for the next race weekend
- custom F1-themed layout and motion details

---

## 3. Core Tech Stack

### Frontend runtime
- Next.js 16.x (App Router, Turbopack)
- React 19.x
- TypeScript 6.x

### Styling and presentation
- design tokens in a global stylesheet (`app/globals.css`) for shared colors, fonts, and base styles
- custom CSS and inline styles for immersive UI composition
- no component library dependency
- dark surfaces, red accent color, and typography-driven layouts
- fonts self-hosted via `@fontsource` (Inter, JetBrains Mono, Titillium Web) plus a Formula 1-style display font

### Data layer
- server-side data fetching with Next.js
- public API calls from the server environment
- caching via Next.js fetch revalidation settings

### Package manager
- npm

---

## 4. APIs and External Data Sources

### OpenF1
The project uses the OpenF1 API for session and race-event data.

It provides:
- latest or most recent session lookup
- meeting metadata
- sessions for a given meeting
- driver lists for a session
- position and interval data
- weather information
- race-control messages

The integration is handled in [lib/openf1.ts](lib/openf1.ts).

### Jolpica-F1
The project uses the Jolpica-F1 API for historical and current championship data.

It provides:
- driver standings
- constructor standings
- season schedule and race list
- last race results
- current season metadata

The integration is handled in [lib/jolpica.ts](lib/jolpica.ts).

### Open-Meteo
The next-race weather forecast is fetched from Open-Meteo. The integration is handled in [lib/weather.ts](lib/weather.ts).

### Additional external assets
- Flag icons are loaded from Flagpedia CDN using country codes
- Driver images and editorial visuals come from public and remote image sources

---

## 5. Fonts and Visual Identity

The app uses a premium, racing-inspired visual language.

### Font stack
- Titillium Web
- Inter
- JetBrains Mono
- a Formula 1-style display font loaded from OnlineWebFonts

This gives the project a strong F1 media identity and helps differentiate it from generic dashboards.

### Color system
The UI is centered around a dark race-weekend palette with a bold red accent:

- primary accent: `#E10600`
- dark background: `#0B0C10`
- surface colors: `#15151E` / `#1A1B23`
- borders/dividers: `#1F1F27`
- text: `#FAFAFA` / `#E4E4E7` / `#A1A1AA` / `#71717A`

### Team colors
Official 2026 team colors are exposed as tokens (`--t-mercedes`, `--t-ferrari`, `--t-mclaren`, `--t-redbull`, and more) in `app/globals.css`.

---

## 6. Folder Structure

```text
.
├── app/
│   ├── articles/
│   │   └── page.tsx
│   ├── circuits/
│   │   └── page.tsx
│   ├── constructors/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── driver-standings/
│   │   └── page.tsx
│   ├── moments/
│   │   └── page.tsx
│   ├── results/
│   │   └── page.tsx
│   ├── seasons/
│   │   └── page.tsx
│   ├── statistics/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ClassificationLink.tsx
│   ├── CountdownCard.tsx
│   ├── Footer.tsx
│   ├── NextRacePanel.tsx
│   ├── SessionTicker.tsx
│   ├── Sidebar.tsx
│   ├── StandingsPanels.tsx
│   └── WeatherCard.tsx
├── lib/
│   ├── drivers.ts
│   ├── flags.ts
│   ├── jolpica.ts
│   ├── openf1.ts
│   ├── teamColors.ts
│   ├── ticker.ts
│   ├── useNextRace.ts
│   └── weather.ts
├── public/
│   ├── F1-Fan-Paddock.png
│   └── Hero-BG.png
├── next.config.mjs
├── package.json
├── tsconfig.json
├── next-env.d.ts
└── README.md
```

### App router structure
- [app/layout.tsx](app/layout.tsx): root layout, metadata, sidebar/footer shell, and top-level data fetching
- [app/page.tsx](app/page.tsx): home page with hero, next race, standings, and last-race result
- [app/dashboard/page.tsx](app/dashboard/page.tsx): dashboard-style page for weekend and session context
- [app/driver-standings/page.tsx](app/driver-standings/page.tsx): driver championship table
- [app/constructors/page.tsx](app/constructors/page.tsx): constructor championship cards
- [app/results/page.tsx](app/results/page.tsx): race results
- [app/seasons/page.tsx](app/seasons/page.tsx): season history
- [app/circuits/page.tsx](app/circuits/page.tsx): circuit overview
- [app/statistics/page.tsx](app/statistics/page.tsx): all-time statistics
- [app/moments/page.tsx](app/moments/page.tsx): iconic moments
- [app/articles/page.tsx](app/articles/page.tsx): editorial content landing page

### Components
- [components/Sidebar.tsx](components/Sidebar.tsx): navigation sidebar, live badge, and countdown logic
- [components/Footer.tsx](components/Footer.tsx): footer shell and branding details
- [components/SessionTicker.tsx](components/SessionTicker.tsx): weekend session timeline UI
- [components/StandingsPanels.tsx](components/StandingsPanels.tsx): driver/constructor standing display panels
- [components/NextRacePanel.tsx](components/NextRacePanel.tsx): next-race countdown and live weather card
- [components/WeatherCard.tsx](components/WeatherCard.tsx): shared race-weekend weather forecast card
- [components/CountdownCard.tsx](components/CountdownCard.tsx): countdown presentation used on the dashboard
- [components/ClassificationLink.tsx](components/ClassificationLink.tsx): link to the full driver classification

### Library helpers
- [lib/openf1.ts](lib/openf1.ts): OpenF1 API client and type definitions
- [lib/jolpica.ts](lib/jolpica.ts): Jolpica-F1 API client and type definitions
- [lib/weather.ts](lib/weather.ts): Open-Meteo weather client and type definitions
- [lib/ticker.ts](lib/ticker.ts): session ticker data transformation logic
- [lib/teamColors.ts](lib/teamColors.ts): team color utilities
- [lib/drivers.ts](lib/drivers.ts): driver data helpers
- [lib/flags.ts](lib/flags.ts): country/flag helpers
- [lib/useNextRace.ts](lib/useNextRace.ts): next-race hook used by live panels

---

## 7. Layout and UI Architecture

The application is intentionally custom-built rather than using a conventional UI framework.

### Layout principles
- persistent sidebar navigation
- large hero and cinematic background treatment
- information panels for standings and results
- editorial cards for article-like content presentation
- responsive spacing and a structured, premium dark theme

### UI style approach
Most UI presentation is implemented with inline styles and carefully structured design tokens in [app/globals.css](app/globals.css). This keeps the project visually distinctive and avoids unnecessary abstraction.

---

## 8. Runtime and Development Notes

### Install dependencies
```bash
npm install
```

### Run locally
```bash
npm run dev
```

Then open http://localhost:3000.

### Build for production
```bash
npm run build
```

### Start production build
```bash
npm run start
```

### Lint
```bash
npm run lint
```

---

## 9. Important Implementation Notes

### API behavior
The app is designed to handle missing or incomplete API responses gracefully. Because the free tier of OpenF1 is historical-data-focused, some live session values may be absent or delayed. Some championship pages use built-in example data for the current 2026 season.

### Caching
The project uses Next.js fetch revalidation to reduce repeated API requests and keep the experience responsive.

### Extensibility
The current structure makes it straightforward to extend the app with:
- driver or constructor profile pages
- historical season browsing (e.g. `app/seasons/[year]`)
- richer live timing panels
- more article and analysis content
- more advanced telemetry visuals

---

## 10. Known Limitations

- live in-session timing may not be fully available from OpenF1’s free tier
- some standings/constructor/results pages use example data rather than live API data
- articles are currently static placeholder content rather than a CMS-backed experience
- there is no full historical season browsing flow yet
- no dedicated driver or constructor profile pages yet
- no automated test suite yet

---

## 11. Disclaimer

This project is independent and unofficial. It is not affiliated with, endorsed by, or connected to Formula 1, FOM, the FIA, or any team. Data is provided by OpenF1, Jolpica-F1, and Open-Meteo under their respective terms of use.

---

## 12. License

[MIT](./LICENSE)
