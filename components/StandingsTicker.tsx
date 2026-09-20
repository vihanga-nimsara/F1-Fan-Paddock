"use client";

import Link from "next/link";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/kibo-ui/marquee";
import { cn } from "@/lib/utils";

export type TickerItem = {
  position: number;
  code: string;
  points: number;
  color?: string;
  avatar?: string;
};

export default function StandingsTicker({
  items,
  href,
  className,
}: {
  items: TickerItem[];
  href?: string;
  className?: string;
}) {
  const row = items.length > 0;

  return (
    <Marquee
      className={cn(
        "ticker-enter border-y border-border bg-background/60 backdrop-blur-sm sm:pl-52",
        className,
      )}
    >
      <span
        className="absolute top-1/2 left-3 z-20 hidden h-fit -translate-y-1/2 items-center gap-2.5 rounded-[5px] border border-border bg-card/90 px-3 py-1.5 shadow-sm backdrop-blur-sm sm:flex"
        aria-hidden="true"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-f1red opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-f1red" />
        </span>
        <span className="font-heading text-[12px] font-bold tracking-[0.05em]">
          Driver standings
        </span>
      </span>
      <MarqueeFade side="left" />
      <MarqueeContent speed={60} autoFill pauseOnHover>
        {row &&
          items.map((item) => (
            <MarqueeItem key={`${item.position}-${item.code}`}>
              {href ? (
                <Link href={href} className="group mx-3 flex items-center py-1.5">
                  <TickerRow item={item} />
                </Link>
              ) : (
                <span className="group mx-3 flex items-center py-1.5">
                  <TickerRow item={item} />
                </span>
              )}
            </MarqueeItem>
          ))}
      </MarqueeContent>
      <MarqueeFade side="right" />
      <span className="ticker-shine pointer-events-none absolute inset-0 z-[15]" aria-hidden="true" />
    </Marquee>
  );
}

function TickerRow({ item }: { item: TickerItem }) {
  const color = item.color ?? "var(--f1red)";
  return (
    <span className="flex items-center gap-2.5 rounded-[5px] border border-border bg-card py-1.5 pr-3.5 pl-2.5 shadow-sm transition-colors duration-200 group-hover:border-f1red/50">
      <span className="relative shrink-0">
        <span
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 bg-muted"
          style={{
            borderColor: color,
            boxShadow: `0 0 14px ${color}40`,
          }}
        >
          {item.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.avatar}
              alt={item.code}
              loading="lazy"
              className="h-full w-full rounded-full object-cover object-top"
            />
          ) : (
            <span className="font-heading text-[10px] font-bold text-foreground/70">
              {item.code[0]}
            </span>
          )}
        </span>
        <span
          className="absolute -bottom-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold tabular-nums text-white"
          style={{ backgroundColor: color }}
        >
          {item.position}
        </span>
      </span>
      <span className="flex flex-col items-start gap-0.5 leading-tight">
        <span className="flex items-center gap-1.5">
          <span className="font-heading text-sm font-bold tracking-tight">
            {item.code}
          </span>
          <span className="hidden rounded-sm bg-muted px-1 py-px font-mono text-[9px] font-semibold tabular-nums text-muted-foreground sm:inline">
            P{item.position}
          </span>
        </span>
        <span className="flex items-center gap-1 text-[11px] font-medium tabular-nums text-muted-foreground">
          <span
            className="inline-block h-1 w-1 rounded-full"
            style={{ backgroundColor: color }}
          />
          {item.points} pts
        </span>
      </span>
    </span>
  );
}