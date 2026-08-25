"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ToggleButtonGroup,
  ToggleButton,
  Avatar,
} from "@mui/material";
import { NewsCard } from "@/components/f1kit";
import { BlogPost, timeAgo } from "@/lib/blog";

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [view, setView] = useState<"grid" | "list">("grid");

  const groupSx = {
    border: "1px solid rgba(20,20,28,0.2)",
    borderRadius: "12px",
    bgcolor: "rgba(20,20,28,0.06)",
    p: 0.5,
    "& .MuiToggleButtonGroup-grouped": {
      border: 0,
      borderRadius: "10px !important",
      textTransform: "none",
    },
  };

  const btnSx = {
    fontFamily: "var(--font-display)",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    color: "var(--color-pebble-80)",
    px: 1.5,
    py: 0.5,
    "&.Mui-selected": {
      bgcolor: "#e10600",
      color: "#fff",
      "&:hover": { bgcolor: "#b30500" },
    },
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-end">
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, val) => {
            if (val) setView(val);
          }}
          size="small"
          sx={groupSx}
          aria-label="View mode"
        >
          <ToggleButton value="grid" sx={btnSx} aria-label="Grid view">
            Grid
          </ToggleButton>
          <ToggleButton value="list" sx={btnSx} aria-label="List view">
            List
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {posts.length === 0 ? (
        <div className="flex w-full flex-col items-center gap-2 rounded-xl bg-pebble-5 p-10 text-center">
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
                className="group flex items-center gap-3 rounded-xl bg-pebble-5 p-2.5 transition-colors hover:bg-pebble-8"
              >
                <Avatar
                  src={p.image ?? undefined}
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    border: "1px solid rgba(20,20,28,0.15)",
                    bgcolor: "rgba(20,20,28,0.1)",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--color-pebble)",
                  }}
                >
                  {(p.author?.[0] ?? p.source?.[0] ?? "·")}
                </Avatar>
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
