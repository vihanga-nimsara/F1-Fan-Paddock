/**
 * Canonical site identity. Single source of truth for the brand name, the
 * production origin, and the default meta description — the root layout
 * metadata, the WebSite JSON-LD, the web app manifest, robots.txt and the
 * sitemap all derive from these so the preferred site name Google indexes is
 * always "F1 Paddock SL".
 */

export const SITE_NAME = "F1 Paddock SL";

export const SITE_URL = "https://www.f1paddocksl.com";

export const SITE_DESCRIPTION =
  "F1 Paddock SL is a Sri Lankan Formula 1 fan site: race analysis, paddock stories, and live F1 data with standings, streaks, and head-to-heads.";

export const SITE_LOCALE = "en_US";

export const SITE_THEME_COLOR = "#e10600";

/**
 * Google AdSense publisher ID. Public by design (it ships inside the adsbygoogle
 * loader URL on every page), so it lives here rather than in the environment.
 */
export const ADSENSE_CLIENT = "ca-pub-1374208293260558";
