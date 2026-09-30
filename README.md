# F1 Paddock SL

A Sri Lankan Formula 1 fan site: race analysis, paddock stories, and live F1 data with
standings, streaks, and head-to-heads.

**Live site:** https://www.f1paddocksl.com

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, React 19) |
| Language | TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui, Base UI |
| Motion | Framer Motion, OGL, Three.js |
| Icons | Tabler Icons, MUI Icons |
| Data | OpenF1 (live F1), Facebook Graph API, RSS/news feed, Supabase (comments) |
| Hosting | Vercel |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

The site runs at http://localhost:3000.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server (webpack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npx tsc --noEmit` | Type check |

> `npm run lint` is currently broken: `next lint` was removed in Next.js 16, so the script
> falls through to Next's directory argument parser. Use `npx tsc --noEmit` until an ESLint
> flat config is added.

## Environment variables

All variables live in `.env.local`, which is gitignored and must never be committed.

| Variable | Public | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL (comments) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon key (comments) |
| `OPENF1_ACCESS_TOKEN` | No | OpenF1 API token for live standings |
| `NEWS_API_URL` | No | News/RSS feed endpoint |
| `FB_RSS_URL` | No | Facebook page RSS feed |
| `FB_PAGE_ID` | No | Facebook page ID |
| `FB_PAGE_NAME` | No | Facebook page name |
| `FB_PAGE_ACCESS_TOKEN` | No | Facebook page access token |
| `FB_API_VERSION` | No | Graph API version, e.g. `v23.0` |

Variables prefixed `NEXT_PUBLIC_` are bundled into client JavaScript and are therefore
public. Never place a secret in one.

## Project layout

```
app/            Routes, layouts, metadata, API route handlers
  api/          openf1, news, comments, fbimg, fb-chat endpoints
components/     Shared UI (AppShell, PostCard, StandingsTabs, …)
lib/            Data access and helpers
  site.ts       Canonical brand name, site URL, description
  f1.ts         OpenF1 standings and results
  facebook.ts   Facebook page posts
  own-posts.ts  Hand-written stories
  supabase.ts   Comments client
scripts/        Maintenance scripts (fb token refresh)
public/         Static assets
data/           Runtime caches (gitignored)
```

### Adding a route

Routes live in `app/<name>/page.tsx`. Anything added there is picked up automatically
by the sitemap — see the route table in `app/sitemap.ts`.

### Changing the canonical domain

`lib/site.ts` is the single source of truth. `app/sitemap.ts`, `app/robots.ts`, and the
root `metadataBase` all derive from `SITE_URL`, so changing it there updates canonical
URLs site-wide. Use the `www` form if the apex redirects.

## Content

- **Stories** — `lib/own-posts.ts` holds hand-written posts. `lib/authored-blogs.ts`
  covers externally authored ones.
- **Drivers** — sourced live from OpenF1; profile pages are generated under
  `app/drivers/[driverId]`.
- **Comments** — stored in Supabase and rendered by `components/CommentSection.tsx`.

## Deployment

Pushes to `main` deploy automatically to Vercel. Configure these as Vercel project
environment variables (do not rely on `.env.local` in production).

A GitHub Actions workflow (`.github/workflows/fb-token-refresh.yml`) runs monthly to
renew the Facebook page token, since page tokens expire after ~60 days. It needs the
secrets `FB_PAGE_ID`, `FB_LONG_LIVED_USER_TOKEN`, `FB_APP_ID`, `FB_APP_SECRET`,
`FB_PAGE_NAME`, `VERCEL_TOKEN`, and `VERCEL_PROJECT_ID`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
