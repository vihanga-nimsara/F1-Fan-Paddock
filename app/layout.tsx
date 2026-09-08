import type { Metadata } from "next";
import { Chakra_Petch, Geist, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Toaster from "@/components/Toaster";
import NewsAlert from "@/components/NewsAlert";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollReveal from "@/components/ScrollReveal";
import MuiProvider from "@/components/mui/MuiProvider";
import Scanner from "@/components/Scanner";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-chakra",
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
      className={`${geist.variable} ${chakra.variable} ${jetbrains.variable}`}
    >
      <head />
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "window.__THEME__='dark';try{document.documentElement.classList.remove('light','dark');document.documentElement.classList.add('dark');}catch(e){}document.documentElement.style.colorScheme='dark';",
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
          <script
            id="f1-splash"
            dangerouslySetInnerHTML={{
              __html: `(function(){try{if(sessionStorage.getItem('f1-splash-instant')==='1')return;sessionStorage.setItem('f1-splash-instant','1');}catch(e){}var st=document.createElement('style');st.textContent='@keyframes f1pulse{0%,100%{opacity:1}50%{opacity:.25}}';document.head.appendChild(st);var el=document.createElement('div');el.id='f1-loading-screen';el.setAttribute('style','position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0f0f0f;');el.innerHTML='<div style=\\'display:flex;flex-direction:column;align-items:center;gap:12px;\\'><span style=\\'font-family:var(--font-inter),sans-serif;font-size:24px;font-weight:600;color:#fff;\\'>F1 <span style=\\'color:#ff1e00;\\'>Fan Paddock</span></span><span style=\\'display:flex;align-items:center;gap:6px;font-size:12px;font-weight:500;letter-spacing:.2em;color:rgba(255,255,255,.7);\\'><span style=\\'width:6px;height:6px;border-radius:9999px;background:#ff1e00;animation:f1pulse 1s infinite;\\'></span>Loading the grid…</span></div>';document.body.appendChild(el);setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);},5000);})();`,
            }}
          />
          <AppShell>
            {children}
            <Footer />
          </AppShell>
          <CookieConsent />
          <Toaster />
          <NewsAlert />
          <LoadingScreen />
          <ScrollReveal />
        </MuiProvider>
      </body>
    </html>
  );
}