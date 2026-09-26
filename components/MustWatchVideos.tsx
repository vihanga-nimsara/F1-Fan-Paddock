"use client";

import { useEffect, useState } from "react";
import YouTubePlayer from "@/components/YouTubePlayer";
import { SourceBadge } from "@/components/source-badge";

type VideoItem = { id: string; title: string };

type VideoGroup = {
  label: string;
  href?: string;
  videos: VideoItem[];
};

export default function MustWatchVideos({ groups }: { groups: VideoGroup[] }) {
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

  const visible = groups.filter((g) => g.videos.length > 0);

  return (
    <>
      <div className="flex flex-col gap-8">
        {visible.map((g) => (
          <section key={g.label} className="flex flex-col gap-3">
            {g.label && (
              <div className="flex items-center justify-between gap-3">
                <h3 className="m-0 flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.12em] text-foreground/80">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-f1red" />
                  {g.label}
                </h3>
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.videos.map((v) => (
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
                      className="h-full w-full object-cover"
                    />
                    <SourceBadge tag="Watch" className="absolute left-3 top-3 z-10" />
                  </div>
                  <div className="p-3">
                    <h4 className="m-0 line-clamp-2 font-display text-[13px] font-semibold leading-[1.2] text-pebble">
                      {v.title}
                    </h4>
                  </div>
                </button>
              ))}
            </div>
          </section>
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
              className="absolute -top-11 right-0 flex items-center gap-1.5 rounded-xl bg-carbon-deep/90 px-3 py-1.5 font-display text-[11px] font-semibold tracking-[0.1em] text-pebble transition-opacity hover:opacity-80"
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