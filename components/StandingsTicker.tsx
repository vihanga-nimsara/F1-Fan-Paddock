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
        "ticker-enter border-y border-border bg-muted/50 sm:pl-48",
        className,
      )}
    >
      <span
        className="absolute top-1/2 left-4 z-20 hidden h-fit -translate-y-1/2 items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-1.5 backdrop-blur-sm sm:flex"
        aria-hidden="true"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-f1red opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-f1red" />
        </span>
        <span className="font-heading text-[11px] font-bold uppercase tracking-[0.14em]">
          Driver standings
        </span>
      </span>
      <MarqueeFade side="left" />
      <MarqueeContent speed={45} autoFill pauseOnHover>
        {row &&
          items.map((item) => (
            <MarqueeItem key={`${item.position}-${item.code}`}>
              {href ? (
                <Link
                  href={href}
                  className="group mx-4 flex items-center gap-3 py-1"
                >
                  <TickerRow item={item} />
                </Link>
              ) : (
                <span className="group mx-4 flex items-center gap-3 py-1">
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
  return (
    <>
      <span className="relative shrink-0">
        <span
          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 bg-muted transition-transform duration-300 group-hover:scale-110"
          style={{
            borderColor: item.color ?? "var(--f1red)",
            boxShadow: `0 0 14px ${item.color ?? "var(--f1red)"}40`,
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
            <span className="font-heading text-xs font-bold text-foreground/70">
              {item.code[0]}
            </span>
          )}
        </span>
        <span className="absolute -bottom-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full border border-border bg-background px-0.5 font-mono text-[9px] font-bold tabular-nums text-foreground">
          {item.position}
        </span>
      </span>
      <span
        className="flex flex-col items-start leading-tight transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <span className="font-heading text-sm font-bold tracking-tight transition-colors group-hover:text-f1red">
          {item.code}
        </span>
        <span className="flex items-center gap-1 text-[11px] font-medium tabular-nums text-muted-foreground">
          <span className="inline-block h-1 w-1 rounded-full bg-f1red" />
          {item.points}
          <span className="text-[9px] font-semibold uppercase tracking-wider">
            pts
          </span>
        </span>
      </span>
      <span
        className="mx-1 hidden h-8 w-px bg-border sm:block"
        aria-hidden="true"
      />
    </>
  );
}