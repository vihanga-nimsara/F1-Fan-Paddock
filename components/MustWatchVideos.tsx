"use client";

import { useEffect, useState } from "react";
import YouTubePlayer from "@/components/YouTubePlayer";

type VideoItem = { id: string; title: string };

export default function MustWatchVideos({ videos }: { videos: VideoItem[] }) {
  const [active, setActive] = useState<VideoItem | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setActive(v)}
            className="group flex flex-col overflow-hidden rounded-xl bg-pebble-5 text-left transition-colors duration-200 hover:bg-pebble-8"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              {/* eslint-disable-next-line @next/no-img-element, @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-f1red/90 text-white shadow-lg transition-transform duration-200 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
              <span className="absolute left-3 top-3 rounded-xl bg-f1red px-2 py-1 font-display text-[10px] font-semibold tracking-[0.1em] text-white">
                Watch
              </span>
            </div>
            <div className="p-3">
              <h3 className="m-0 line-clamp-2 font-display text-[13px] font-semibold leading-[1.2] text-pebble transition-colors group-hover:text-f1red">
                {v.title}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute -top-11 right-0 flex items-center gap-1.5 rounded-xl bg-carbon-deep/90 px-3 py-1.5 font-display text-[11px] font-semibold tracking-[0.1em] text-pebble transition-colors hover:text-f1red"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
              CLOSE
            </button>
            <YouTubePlayer
              videoId={active.id}
              autoplay
              className="overflow-hidden rounded-xl bg-black"
            />
            <p className="mt-3 font-display text-sm font-semibold text-pebble">{active.title}</p>
          </div>
        </div>
      )}
    </>
  );
}
