/**
 * Ad unit configuration. The publisher ID is public (it ships in the
 * adsbygoogle loader URL), but the individual ad unit IDs are account specific,
 * so they come from the environment. Create the units in AdSense and set these
 * in .env.local:
 *
 *   NEXT_PUBLIC_ADSENSE_SLOT_HOMEPAGE=ca-pub-.../1234567890
 *   NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE=ca-pub-.../0987654321
 *   NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=ca-pub-.../1122334455
 *
 * A slot left undefined renders nothing at all, so the site stays clean while
 * the units are being created.
 */

import { ADSENSE_CLIENT } from "@/lib/site";

export const ADSENSE_ENABLED = Boolean(ADSENSE_CLIENT);

export const AD_SLOTS = {
  homepage: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOMEPAGE,
  article: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE,
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
} as const;
