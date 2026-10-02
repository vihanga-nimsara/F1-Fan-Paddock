"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container, Avatar, MediaFallback } from "@/components/f1kit";
import { Badge } from "@/components/ui/badge";
import { timeAgo } from "@/lib/blog";
import { cn } from "@/lib/utils";

export type FeaturedStorySlide = {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  pubDate: string;
  author: { name: string };
  readTime: string;
  content: string[];
};

export default function FeaturedStorySlider({
  posts,
  auto = 6000,
}: {
  posts: FeaturedStorySlide[];
  auto?: number;
}) {
  const [index, setIndex] = useState(0);
  const count = posts.length;
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (count < 2 || paused) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % count),
      auto,
    );
    return () => clearInterval(t);
  }, [count, auto, paused]);

  if (count === 0) return null;

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  return (
    <section
      className="border-b border-border"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container className="py-8 md:py-14">
        <div className="mb-6 flex flex-wrap items-center justify-end gap-3">
          {count > 1 && (
            <div className="flex items-center gap-3">
              <span className="font-body text-[12px] font-semibold tracking-widest text-muted-foreground tabular-nums">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(count).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous featured story"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-background text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next featured story"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-background text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 [&>*]:col-start-1 [&>*]:row-start-1">
          {posts.map((p, i) => {
            const isActive = i === index;
            return (
              <Link
                key={p.id}
                href={`/stories/${p.id}`}
                aria-hidden={!isActive}
                tabIndex={isActive ? 0 : -1}
                className={cn(
                  "group grid items-center gap-8 transition-opacity duration-500 md:grid-cols-2 md:gap-12",
                  isActive
                    ? "opacity-100"
                    : "pointer-events-none opacity-0",
                )}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-foreground/10">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <MediaFallback label="The Paddock" />
                  )}
                  <Badge className="absolute left-4 top-4 gap-1 bg-f1red py-1 text-white hover:bg-f1red-dark">
                    Featured story
                  </Badge>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-[12px] font-medium text-muted-foreground">
                    <span>{timeAgo(p.pubDate)}</span>
                  </div>
                  <h1 className="m-0 font-heading-big text-[clamp(1.9rem,4.5vw,3.2rem)] font-bold leading-[1.05] tracking-tight">
                    {p.title}
                  </h1>
                  <p className="m-0 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">
                    {p.excerpt}
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar name={p.author.name} className="h-9 w-9 text-sm" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold">{p.author.name}</span>
                      <span className="text-[12px] text-muted-foreground">
                        {p.readTime} · {p.content.length} sections
                      </span>
                    </div>
                  </div>
                  <span className="mt-1 inline-flex w-fit items-center">
                    <span className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-f1red px-4 py-2.5 text-sm font-medium text-white transition-colors group-hover:bg-f1red-dark">
                      Read the story
                      <ArrowRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {count > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {posts.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show featured story ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index
                    ? "w-8 bg-f1red"
                    : "w-3 bg-foreground/20 hover:bg-foreground/40",
                )}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}