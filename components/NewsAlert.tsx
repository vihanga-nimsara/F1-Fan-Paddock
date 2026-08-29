"use client";

import { useEffect, useState } from "react";
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
    <div className="fixed bottom-4 right-4 z-[60] w-[min(92vw,340px)] overflow-hidden rounded-xl border border-pebble-15 bg-carbon-deep shadow-2xl">
      <div className="relative w-full aspect-[2/1] overflow-hidden bg-pebble-10">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <MediaFallback label={item.source?.[0]} sublabel={item.source} />
        )}
        <button
          type="button"
          aria-label="Dismiss news"
          onClick={() => setOpen(false)}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-carbon-deep/80 text-pebble-80 backdrop-blur transition-colors hover:bg-f1red hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <span className="text-[11px] text-pebble-80">
          {item.source} · {item.ago}
        </span>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-[15px] font-semibold leading-[1.2] text-pebble transition-colors hover:text-f1red"
        >
          {item.title}
        </a>
        {item.description ? (
          <p className="m-0 line-clamp-2 text-[12px] leading-[1.4] text-pebble-80">
            {item.description}
          </p>
        ) : null}

        <div className="mt-1 flex items-center justify-between">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-[11px] font-semibold tracking-[0.08em] text-f1red hover:underline"
          >
            Read at source ↗
          </a>
          {posts.length > 1 ? (
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous news"
                onClick={() => setIndex((i) => (i - 1 + posts.length) % posts.length)}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-pebble-15 text-pebble-80 transition-colors hover:bg-pebble-10 hover:text-pebble"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next news"
                onClick={() => setIndex((i) => (i + 1) % posts.length)}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-pebble-15 text-pebble-80 transition-colors hover:bg-pebble-10 hover:text-pebble"
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
