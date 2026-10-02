"use client";

import { useState } from "react";
import Link from "next/link";
import { Flag, LayoutGrid, List } from "lucide-react";
import { NewsCard } from "@/components/f1kit";
import { BlogPost, timeAgo } from "@/lib/blog";
import { cn } from "@/lib/utils";

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="flex flex-col gap-5">
      <div
        role="group"
        aria-label="Post layout"
        className="ml-auto flex w-fit items-center rounded-full border border-border bg-muted/40 p-1"
      >
        {(
          [
            { key: "grid", label: "Grid", icon: LayoutGrid },
            { key: "list", label: "List", icon: List },
          ] as const
        ).map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => setView(opt.key)}
            aria-pressed={view === opt.key}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold tracking-[0.12em] uppercase transition-colors",
              view === opt.key
                ? "bg-f1red text-white"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <opt.icon className="size-3.5" aria-hidden="true" />
            {opt.label}
          </button>
        ))}
      </div>

      {posts.length === 0 ? (
        <div className="flex w-full flex-col items-center gap-2 rounded-2xl border border-dashed p-10 text-center">
          <Flag className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
          <p className="m-0 text-sm text-muted-foreground">
            Stories unavailable right now. Try again shortly.
          </p>
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <NewsCard
              key={p.link}
              href={p.link}
              image={p.image}
              tag={p.source}
              title={p.title}
              description={p.description}
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
        <ul className="flex flex-col gap-3">
          {posts.map((p) => (
            <li key={p.link}>
              <Link
                href={p.link}
                target={p.link.startsWith("http") ? "_blank" : undefined}
                rel={p.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-3 transition-colors duration-200"
              >
                <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-heading text-lg font-bold text-muted-foreground">
                      {p.source?.[0] ?? "·"}
                    </div>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="line-clamp-2 font-heading text-[15px] font-bold leading-snug tracking-tight">
                    {p.title}
                  </span>
                  <span className="flex items-center gap-2 text-[12px] text-muted-foreground">
                    <span className="font-medium text-foreground/80">{p.author}</span>
                    <span aria-hidden="true">·</span>
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