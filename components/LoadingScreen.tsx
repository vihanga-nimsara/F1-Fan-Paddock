"use client";

import { useEffect, useState } from "react";
import Hyperspeed from "@/components/Hyperspeed";
import ErrorBoundary from "@/components/ErrorBoundary";

const F1_HYPERSPEED_OPTIONS = {
  distortion: "deepDistortion",
  length: 400,
  roadWidth: 18,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 50,
  lightPairsPerRoadWay: 50,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5] as [number, number],
  lightStickHeight: [1.3, 1.7] as [number, number],
  movingAwaySpeed: [60, 80] as [number, number],
  movingCloserSpeed: [-120, -160] as [number, number],
  carLightsLength: [20, 60] as [number, number],
  carLightsRadius: [0.05, 0.14] as [number, number],
  carWidthPercentage: [0.3, 0.5] as [number, number],
  carShiftX: [-0.2, 0.2] as [number, number],
  carFloorSeparation: [0.05, 1] as [number, number],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0xff1e00,
    brokenLines: 0xff1e00,
    leftCars: [0xff1e00, 0xe10600, 0xc01800],
    rightCars: [0xff453a, 0xff1e00, 0x920400],
    sticks: 0xff1e00,
  },
};

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let shown = false;
    try {
      shown = sessionStorage.getItem("f1-welcome-shown") === "1";
    } catch {}
    if (shown) return;

    try {
      sessionStorage.setItem("f1-welcome-shown", "1");
    } catch {}

    setMounted(true);
    const t1 = setTimeout(() => setFading(true), 3000);
    const t2 = setTimeout(() => {
      setMounted(false);
      try {
        const el = document.getElementById("f1-loading-screen");
        if (el && el.parentNode) el.parentNode.removeChild(el);
      } catch {}
    }, 3750);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black transition-opacity duration-700 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      <div className="absolute inset-0">
        <ErrorBoundary fallback={null}>
          <Hyperspeed effectOptions={F1_HYPERSPEED_OPTIONS} />
        </ErrorBoundary>
      </div>
      <div className="relative z-10 flex flex-col items-center gap-3">
        <span
          className="font-display text-5xl font-semibold tracking-[0.02em] text-white"
          style={{ fontFamily: "Formula1 Display Bold Bold, var(--font-geist), sans-serif" }}
        >
          F1 <span className="text-[#ff1e00]">paddock SL</span>
        </span>
        <span className="flex items-center gap-1.5 font-body text-xs font-medium tracking-[0.2em] text-white/70">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff1e00]" />
          Loading the grid…
        </span>
      </div>
    </div>
  );
}
