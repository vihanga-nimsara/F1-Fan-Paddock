import type { Metadata } from "next";
import {
  Geist,
  JetBrains_Mono,
  Abhaya_Libre,
  Gemunu_Libre,
  Russo_One,
} from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Toaster from "@/components/Toaster";
import NewsAlert from "@/components/NewsAlert";
import ScrollReveal from "@/components/ScrollReveal";
import { ThemeProvider } from "@/components/theme-provider";
import MuiProvider from "@/components/mui/MuiProvider";
import { GridPattern } from "@/components/ui/grid-pattern";

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

export const metadata: Metadata = {
  title: "F1 Paddock SL — F1 Fan Blogs & Live Data",
  description:
    "Race analysis, paddock stories, and live Formula 1 stats: standings, streaks, and head-to-heads.",
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
      className={`${geist.variable} ${jetbrains.variable} ${sinhala.variable} ${sinhalaHeading.variable} ${f1Font.variable}`}
    >
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInit }}
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
            <NewsAlert />
            <ScrollReveal />
          </MuiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}