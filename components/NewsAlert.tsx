"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { MediaFallback } from "@/components/f1kit";

type NewsItem = {
  id?: string;
  title: string;
  link: string;
  source: string;
  image?: string;
  description?: string;
  ago: string;
};

export default function NewsAlert() {
  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/news")
      .then((r) => r.json())
      .then((d) => {
        if (active && Array.isArray(d.posts) && d.posts.length) {
          setPosts(d.posts);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (posts.length < 2) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % posts.length),
      6000,
    );
    return () => clearInterval(t);
  }, [posts.length]);

  if (!open || posts.length === 0) return null;

  const item = posts[index];

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex w-[min(94vw,380px)] overflow-hidden rounded-sm border border-pebble-15 bg-carbon-deep shadow-2xl">
      {item.image ? (
        <div className="relative h-auto w-24 shrink-0 overflow-hidden bg-pebble-10 sm:w-28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="relative h-auto w-24 shrink-0 overflow-hidden bg-pebble-10 sm:w-28">
          <MediaFallback label={item.source?.[0]} sublabel={item.source} />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-3">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[10px] font-medium text-pebble-80">
            {item.source} · {item.ago}
          </span>
          <button
            type="button"
            aria-label="Dismiss news"
            onClick={() => setOpen(false)}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-pebble-50 transition-colors hover:bg-f1red hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="line-clamp-2 font-display text-[13px] font-semibold leading-[1.2] text-pebble transition-opacity hover:opacity-80"
        >
          {item.title}
        </a>

        <div className="mt-auto flex items-center justify-between pt-0.5">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-[10px] font-semibold tracking-[0.08em] text-f1red hover:underline"
          >
            Read more ↗
          </a>
          {posts.length > 1 ? (
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                aria-label="Previous news"
                onClick={() => setIndex((i) => (i - 1 + posts.length) % posts.length)}
                className="flex h-5 w-5 items-center justify-center rounded-sm border border-pebble-15 text-pebble-80 transition-colors hover:bg-pebble-10 hover:text-pebble"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next news"
                onClick={() => setIndex((i) => (i + 1) % posts.length)}
                className="flex h-5 w-5 items-center justify-center rounded-sm border border-pebble-15 text-pebble-80 transition-colors hover:bg-pebble-10 hover:text-pebble"
              >
                ›
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
