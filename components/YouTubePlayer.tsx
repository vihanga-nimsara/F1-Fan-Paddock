"use client";

import { useEffect, useRef, useState } from "react";

let apiPromise: Promise<void> | null = null;
function loadYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const w = window as any;
  if (w.YT && w.YT.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<void>((resolve) => {
    const prev = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => {
      typeof prev === "function" && prev();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    tag.onerror = () => resolve();
    document.head.appendChild(tag);
  });
  return apiPromise;
}

export default function YouTubePlayer({
  videoId,
  autoplay = false,
  className = "",
}: {
  videoId: string;
  autoplay?: boolean;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [blocked, setBlocked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setBlocked(false);
    setReady(false);

    loadYouTubeApi().then(() => {
      const YT = (window as any).YT;
      if (cancelled || !hostRef.current || !YT?.Player) {
        setBlocked(true);
        return;
      }
      playerRef.current = new YT.Player(innerRef.current, {
        videoId,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => !cancelled && setReady(true),
          onError: (e: any) => {
            // 101 / 150 => embedding disabled / not allowed in this context
            if (e?.data === 101 || e?.data === 150) setBlocked(true);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy?.();
      } catch {
        /* noop */
      }
      playerRef.current = null;
    };
  }, [videoId, autoplay]);

  if (blocked) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-carbon-deep p-6 text-center ${className}`}
      >
        <p className="m-0 font-display text-sm font-semibold text-pebble">
          This video can&apos;t be played here.
        </p>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-[2px] bg-f1red px-4 py-2 font-display text-[12px] font-semibold tracking-[0.08em] text-white transition-opacity hover:opacity-90"
        >
          WATCH ON YOUTUBE
        </a>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${className} [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full`}
      style={{ aspectRatio: "16 / 9" }}
    >
      <div ref={hostRef} className="absolute inset-0">
        <div ref={innerRef} />
      </div>
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <span className="font-display text-sm text-pebble-80">Loading…</span>
        </div>
      )}
    </div>
  );
}
