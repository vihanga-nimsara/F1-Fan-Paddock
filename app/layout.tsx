import type { Metadata } from "next";
import {
  Geist,
  JetBrains_Mono,
  Abhaya_Libre,
  Gemunu_Libre,
  Russo_One,
  Bricolage_Grotesque,
} from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Toaster from "@/components/Toaster";
import ScrollReveal from "@/components/ScrollReveal";
import { ThemeProvider } from "@/components/theme-provider";
import MuiProvider from "@/components/mui/MuiProvider";
import { GridPattern } from "@/components/ui/grid-pattern";
import { SITE_DESCRIPTION, SITE_LOCALE, SITE_NAME, SITE_URL } from "@/lib/site";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb",
  display: "swap",
});

const sinhala = Abhaya_Libre({
  subsets: ["latin", "sinhala"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-sinhala",
  display: "swap",
});

// Bold Sinhala display face for headings. Latin glyphs still come from Geist
// (first in the heading stack); Sinhala glyphs fall through to Gemunu Libre.
const sinhalaHeading = Gemunu_Libre({
  subsets: ["latin", "sinhala"],
  weight: ["400", "700"],
  variable: "--font-gemunu",
  display: "swap",
});

// F1-style race font (wide, bold — closest freely-licensed stand-in for the
// official "Formula1" brand font). Used for live/ticking numeral readouts
// like the race countdown.
const f1Font = Russo_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-f1",
  display: "swap",
});

// Big English display face for large headlines (h1s, hero + section titles).
// Latin-only, so Sinhala glyphs fall through to Gemunu/Abhaya further down
// the heading stack. The optical-size axis is requested so the browser can
// pick the display cut for the larger sizes (see `font-optical-sizing`).
const bigHeading = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  description: SITE_DESCRIPTION,
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  icons: {
    // app/favicon.ico is picked up automatically; these add the modern sizes.
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    url: SITE_URL,
    locale: SITE_LOCALE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// Tells search engines the preferred site name for the domain. Kept in one
// place so the root layout and the JSON-LD below cannot drift apart.
const siteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL,
};

const themeInit = `
(function () {
  try {
    var stored = localStorage.getItem('paddock-theme');
    var theme = stored === 'light' || stored === 'dark' || stored === 'system'
      ? stored
      : 'system';
    var resolved = theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
    root.style.colorScheme = resolved;
    root.dataset.theme = resolved;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${jetbrains.variable} ${sinhala.variable} ${sinhalaHeading.variable} ${f1Font.variable} ${bigHeading.variable}`}
    >
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInit }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        <GridPattern
          className="fixed inset-0 -z-10 h-full w-full fill-foreground/5 stroke-foreground/5"
          width={48}
          height={48}
          strokeDasharray="0"
        />
        <ThemeProvider>
          <MuiProvider>
            <AppShell>
              {children}
              <Footer />
            </AppShell>
            <CookieConsent />
            <Toaster />
            <ScrollReveal />
          </MuiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}