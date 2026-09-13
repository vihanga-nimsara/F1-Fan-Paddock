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
        "border-y border-border bg-muted/50 py-3",
        className,
      )}
    >
      <MarqueeFade side="left" />
      <MarqueeContent speed={45} autoFill pauseOnHover>
        {row &&
          items.map((item) => (
            <MarqueeItem key={`${item.position}-${item.code}`}>
              {href ? (
                <Link
                  href={href}
                  className="mx-3 flex items-center gap-2.5 rounded-full border border-border bg-card py-1.5 pl-2 pr-4 shadow-sm transition-colors hover:border-f1red/50"
                >
                  <TickerRow item={item} />
                </Link>
              ) : (
                <span className="mx-3 flex items-center gap-2.5 rounded-full border border-border bg-card py-1.5 pl-2 pr-4 shadow-sm">
                  <TickerRow item={item} />
                </span>
              )}
            </MarqueeItem>
          ))}
      </MarqueeContent>
      <MarqueeFade side="right" />
    </Marquee>
  );
}

function TickerRow({ item }: { item: TickerItem }) {
  return (
    <>
      <span className="w-5 text-center font-mono text-[11px] font-medium tabular-nums text-muted-foreground">
        {item.position}
      </span>
      <span
        className="h-3.5 w-1 rounded-full"
        style={{ backgroundColor: item.color ?? "var(--f1red)" }}
        aria-hidden="true"
      />
      <span className="font-heading text-sm font-bold tracking-tight">
        {item.code}
      </span>
      <span className="text-xs text-muted-foreground">{item.points} pts</span>
    </>
  );
}