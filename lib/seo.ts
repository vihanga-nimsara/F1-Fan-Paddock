import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_LOCALE, SITE_NAME, SITE_URL } from "@/lib/site";

type PageMetadataInput = {
  /** Page title; the root layout template appends " | F1 Paddock SL". */
  title?: string;
  /** Absolute path, used for the canonical URL and og:url. */
  path: string;
  description?: string;
  /** Set for pages that should stay out of the index (e.g. 404). */
  noIndex?: boolean;
};

/**
 * Builds per-page metadata so every route carries its own canonical URL and
 * social title. Without this, the root layout's og:url/canonical would be
 * inherited by every page and point them all at the homepage.
 *
 * og:site_name / og:type / og:locale still come from the root layout, which is
 * what gives search engines the consistent "F1 Paddock SL" site-name signal.
 */
export function pageMetadata({
  title,
  path,
  description = SITE_DESCRIPTION,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const socialTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return {
    ...(title ? { title } : {}),
    description,
    ...(noIndex ? {} : { alternates: { canonical: path } }),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      title: socialTitle,
      description,
      url: `${SITE_URL}${path === "/" ? "" : path}`,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}
