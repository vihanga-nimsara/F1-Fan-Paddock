import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import CookieConsent from "@/components/CookieConsent";
import Toaster from "@/components/Toaster";
import MuiProvider from "@/components/mui/MuiProvider";
import Scanner from "@/components/Scanner";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const mona = localFont({
  src: "./fonts/mona-sans.woff2",
  variable: "--font-mona",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "F1 Fan Paddock — F1 Blogs & Live Data",
  description:
    "Race analysis, paddock stories, and live Formula 1 stats: standings, streaks, and head-to-heads.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${mona.variable} ${jetbrains.variable}`}
    >
      <head />
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme')||'light';var e=document.documentElement;e.classList.remove('light','dark');e.classList.add(t);e.style.colorScheme=t;}catch(e){e.classList.add('light');e.style.colorScheme='light';}})();",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10"
        >
          <Scanner
            color1="#5227FF"
            color2="#FF9FFC"
            color3="#FFFFFF"
            speed={0.8}
            sweepSpeed={0.25}
            sweepWidth={1.6}
            sweepFalloff={0.8}
            scale={1.5}
            frequency={4}
            ripple={0.22}
            bandDensity={11}
            lineSharpness={5.5}
            glow={0.22}
            scanDirection="vertical"
            colorSpread={0.7}
            brightness={1.15}
            contrast={1.15}
            softness={1.4}
            vignette={0.53}
            scanline
            grain
            grainIntensity={0.05}
            opacity={0.17}
            mouseInteraction
            mouseRadius={0.5}
            mouseStrength={0.5}
          />
        </div>
        <MuiProvider>
          <LoadingScreen />
          <Navbar />
          <div className="pt-[64px]">{children}</div>
          <Footer />
          <CookieConsent />
          <Toaster />
        </MuiProvider>
      </body>
    </html>
  );
}