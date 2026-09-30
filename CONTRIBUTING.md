# Contributing to F1 Paddock SL

Thanks for helping out. This site is a passion project, so the bar is "clearly better
than what is on `main`" rather than perfect.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Fill in `.env.local` before the dev server will render data-backed pages. The site
degrades gracefully without most keys, but standings, news, and comments need theirs.

## Workflow

1. Branch off `main` with a descriptive name (`fix/sitemap-host`, `add/drivers-page`).
2. Make your change.
3. Type check: `npx tsc --noEmit`. This must pass clean.
4. Commit with a message that explains *why*, not just *what*.
5. Open a pull request.

Commits to `main` deploy straight to production, so please use a PR even for small fixes.

## Code style

Match the surrounding code rather than imposing a new style. In practice:

- TypeScript everywhere; no `any` in new code.
- `npm run dev` uses webpack, so keep new dependencies minimal.
- Tailwind utility classes in components. No new CSS files without a reason.
- Reuse the shadcn/ui primitives in `components/ui` before adding a new component.
- Import site-wide constants from `lib/site.ts` (`SITE_NAME`, `SITE_URL`,
  `SITE_DESCRIPTION`) instead of hardcoding the brand name or domain.
- Comments explain intent, not mechanics. Skip comments that restate the code.

## Adding a page

Create `app/<name>/page.tsx`, then add the route to `STATIC_ROUTES` in
`app/sitemap.ts` with a priority and change frequency. The sitemap is a manual
registry, so a new page is invisible to search until you add it there.

## Secrets

Never commit `.env.local` or any credential. It is gitignored — keep it that way.
`NEXT_PUBLIC_` variables are compiled into client JavaScript and are public, so treat
anything with that prefix as safe to leak and everything else as sensitive.

## Reporting bugs

Open an issue with the page URL, what you expected, and what happened. A screenshot
helps.

## Content corrections

Factual corrections are welcome and will be merged. If you spot an error in a story,
note the post ID and the correction in the issue rather than editing the published
text directly, so the fix can be reviewed.
