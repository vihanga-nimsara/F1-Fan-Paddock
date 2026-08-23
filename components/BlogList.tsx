"use client";

import { useState } from "react";
import Link from "next/link";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toggle } from "@base-ui/react/toggle";
import { Avatar } from "@base-ui/react/avatar";
import { NewsCard } from "@/components/f1kit";
import { BlogPost, timeAgo } from "@/lib/blog";

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [view, setView] = useState<"grid" | "list">("grid");

  const toggleClass =
    "rounded-[2px] px-3 py-1.5 font-display text-[11px] font-semibold tracking-[0.08em] text-pebble-80 transition-colors hover:text-pebble data-[pressed]:bg-f1red data-[pressed]:text-white";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-end">
        <ToggleGroup
          aria-label="View mode"
          value={[view]}
          onValueChange={(val) =>
            setView(val.length ? (val.includes("list") ? "list" : "grid") : "grid")
          }
          className="inline-flex rounded-[2px] border border-pebble-20 bg-pebble-5 p-1"
        >
          <Toggle value="grid" aria-label="Grid view" className={toggleClass}>
            Grid
          </Toggle>
          <Toggle value="list" aria-label="List view" className={toggleClass}>
            List
          </Toggle>
        </ToggleGroup>
      </div>

      {posts.length === 0 ? (
        <div className="flex w-full flex-col items-center gap-2 rounded-[2px] bg-pebble-5 p-10 text-center">
          <span className="text-3xl">🏁</span>
          <p className="m-0 font-body text-sm text-pebble-80">
            Stories unavailable right now. Try again shortly.
          </p>
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <NewsCard
              key={p.link}
              href={p.link}
              image={p.image}
              tag={p.source}
              title={p.title}
              meta={
                <>
                  <span>{p.author}</span>
                  <span aria-hidden="true">·</span>
                  <span>{timeAgo(p.pubDate)}</span>
                </>
              }
            />
          ))}
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {posts.map((p) => (
            <li key={p.link}>
              <Link
                href={p.link}
                className="group flex items-center gap-3 rounded-[2px] bg-pebble-5 p-2.5 transition-colors hover:bg-pebble-8"
              >
                <Avatar.Root className="h-11 w-11 shrink-0 overflow-hidden rounded-[2px] border border-pebble-15 bg-pebble-10">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <Avatar.Image
                      src={p.image}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                  <Avatar.Fallback className="flex h-full w-full items-center justify-center font-display text-sm font-semibold text-pebble">
                    {(p.author?.[0] ?? p.source?.[0] ?? "·")}
                  </Avatar.Fallback>
                </Avatar.Root>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="line-clamp-2 font-display text-sm font-semibold leading-[1.2] text-pebble transition-colors group-hover:text-f1red">
                    {p.title}
                  </span>
                  <span className="flex items-center gap-2 text-[11px] text-pebble-80">
                    <span>{p.source}</span>
                    <span aria-hidden="true">·</span>
                    <span>{timeAgo(p.pubDate)}</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
