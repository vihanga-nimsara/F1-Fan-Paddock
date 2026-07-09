# TFB — The F1 Bulletin

TFB is a modern Formula 1 information experience built with Next.js and TypeScript. It combines public motorsport data from OpenF1 and Jolpica-F1 into a polished, dark-theme dashboard styled like an editorial paddock bulletin. The app presents live or recently completed session data, championship standings, race results, and a premium F1-inspired interface with custom typography, motion cues, and strong visual branding.

This project is a front-end web application with no backend or database. All content is fetched directly from public APIs at runtime and cached using Next.js revalidation settings.

---

## 1. Project Overview

TFB stands for “The F1 Bulletin.” The goal of the project is to create an immersive Formula 1 experience that feels like a digital race-weekend bulletin board with:

- live and historical session context
- championship standings and results
- a premium editorial presentation
- a dark, technical, racing-inspired UI
- fast server-rendered pages built on the Next.js App Router

The project is designed to feel more like a motorsport media product than a plain data dashboard.

---

## 2. What the App Includes

### Main pages
- Home page: hero section, championship summary, next race context, standings snippet, and recent race result
- Dashboard page: telemetry-style overview with race weekend framing and session context
- Standings page: standings and analysis-oriented presentation
- Articles page: editorial-style content landing view

### Functional areas
- live session badge logic
- dynamic countdown logic for upcoming race weekends
- standings panels with driver and constructor information
- session ticker that highlights weekend sessions
- custom F1-themed layout and motion details

---

## 3. Core Tech Stack

### Frontend runtime
- Next.js 16.x
- React 19.x
- TypeScript 6.x
- App Router architecture

### Styling and presentation
- custom CSS and inline styles for immersive UI composition
- global stylesheet in the app directory for shared visual tokens and base styles
- no component library dependency
- strong use of dark surfaces, red accent color, and typography-driven layouts

### Data layer
- server-side data fetching with Next.js
- public API calls from the browser/server environment
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

### Additional external assets
- Flag icons are loaded from Flagpedia CDN using country codes
- Driver images and editorial visuals come from public and remote image sources
- Custom typography is sourced from font files and webfont delivery

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

- primary accent: #E10600
- dark background: #0C0C10 / #09090B / #111118
- surface colors: #15151E / #141416 / #161622
- secondary text: #A1A1AA / #6B7280 / #9CA3AF
- borders/dividers: #1F1F29 / #27272A

This palette creates the look of a high-end motorsport dashboard.

---

## 6. Folder Structure

```text
.
├── app/
│   ├── articles/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── standings/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── SessionTicker.tsx
│   └── StandingsPanels.tsx
├── lib/
│   ├── jolpica.ts
│   ├── openf1.ts
│   ├── ticker.ts
│   └── teamColors.ts
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
- [app/layout.tsx](app/layout.tsx): root layout, metadata, shared header/footer, and top-level data fetching
- [app/page.tsx](app/page.tsx): home page with hero, standings preview, and last-race result panel
- [app/dashboard/page.tsx](app/dashboard/page.tsx): dashboard-style page for weekend and session context
- [app/standings/page.tsx](app/driver-standings/page.tsx): standings and article-style presentation
- [app/articles/page.tsx](app/articles/page.tsx): editorial content landing page

### Components
- [components/Header.tsx](components/Sidebar.tsx): fixed header, navigation, live badge, and countdown logic
- [components/Footer.tsx](components/Footer.tsx): footer shell and branding details
- [components/SessionTicker.tsx](components/SessionTicker.tsx): weekend session timeline UI
- [components/StandingsPanels.tsx](components/StandingsPanels.tsx): driver/constructor standing display panels

### Library helpers
- [lib/openf1.ts](lib/openf1.ts): OpenF1 API client and type definitions
- [lib/jolpica.ts](lib/jolpica.ts): Jolpica-F1 API client and type definitions
- [lib/ticker.ts](lib/ticker.ts): session ticker data transformation logic
- [lib/teamColors.ts](lib/teamColors.ts): team color utilities

---

## 7. Layout and UI Architecture

The application is intentionally custom-built rather than using a conventional UI framework.

### Layout principles
- fixed top navigation header
- large hero and cinematic background treatment
- information panels for standings and results
- editorial cards for article-like content presentation
- responsive spacing and a structured, premium dark theme

### UI style approach
Most UI presentation is implemented with inline styles and carefully structured design systems in [app/globals.css](app/globals.css). This keeps the project visually distinctive and avoids unnecessary abstraction.

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
The app is designed to handle missing or incomplete API responses gracefully. Because the free tier of OpenF1 is historical-data-focused, some live session values may be absent or delayed.

### Caching
The project uses Next.js fetch revalidation to reduce repeated API requests and keep the experience responsive.

### Extensibility
The current structure makes it straightforward to extend the app with:
- driver or constructor profile pages
- historical season browsing
- richer live timing panels
- more article and analysis content
- more advanced telemetry visuals

---

## 10. Known Limitations

- live in-session timing may not be fully available from OpenF1’s free tier
- articles are currently static placeholder content rather than a CMS-backed experience
- there is no full historical season browsing flow yet
- no dedicated driver or constructor profile pages yet
- no automated test suite yet

---

## 11. Disclaimer

This project is independent and unofficial. It is not affiliated with, endorsed by, or connected to Formula 1, FOM, the FIA, or any team. Data is provided by OpenF1 and Jolpica under their respective terms of use.

---

## 12. License

[MIT](./LICENSE)