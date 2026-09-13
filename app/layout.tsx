import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  JetBrains_Mono,
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

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-pjs",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb",
  display: "swap",
});

// The uploaded isigemun_0.ttf is a Latin-only (no Sinhala glyphs) 2002 build.
// The proper Sinhala "IsiGemunu" design is open-sourced as Gemunu Libre
// (same Mooniak typeface), which ships the full Sinhala Unicode block.
const sinhala = Gemunu_Libre({
  subsets: ["latin", "sinhala"],
  variable: "--font-sinhala",
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
  title: "The Paddock — F1 Fan Blogs & Live Data",
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
      className={`${plusJakarta.variable} ${jetbrains.variable} ${sinhala.variable} ${f1Font.variable}`}
    >
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInit }}
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