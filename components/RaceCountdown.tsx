"use client";

import { memo, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { flagImage } from "@/lib/f1";
import { DottedMap } from "@/components/ui/dotted-map";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type UpcomingRace = {
  round?: number;
  lat?: number;
  lng?: number;
  circuitName?: string;
  country?: string;
  raceName?: string;
  dateISO?: string;
};

type Props = {
  targetISO: string;
  raceName: string;
  circuitName: string;
  country: string;
  round: number;
  lat?: number;
  lng?: number;
  upcomingRaces?: UpcomingRace[];
};

type Remaining = { d: number; h: number; m: number; s: number; done: boolean };

function getRemaining(target: number): Remaining {
  const delta = Math.max(0, target - Date.now());
  return {
    d: Math.floor(delta / 86_400_000),
    h: Math.floor((delta % 86_400_000) / 3_600_000),
    m: Math.floor((delta % 3_600_000) / 60_000),
    s: Math.floor((delta % 60_000) / 1000),
    done: delta <= 0,
  };
}

const UNITS: { key: keyof Remaining; label: string }[] = [
  { key: "d", label: "Days" },
  { key: "h", label: "Hours" },
  { key: "m", label: "Minutes" },
  { key: "s", label: "Seconds" },
];

// Memoized so the countdown's 1s tick never re-renders the dot map.
const RaceLocationMap = memo(function RaceLocationMap({
  lat,
  lng,
  raceName,
  circuitName,
  country,
  targetISO,
  upcomingRaces,
}: {
  lat?: number;
  lng?: number;
  raceName?: string;
  circuitName: string;
  country: string;
  targetISO: string;
  upcomingRaces?: UpcomingRace[];
}) {
  const hasCoords = lat != null && lng != null;
  const d = new Date(targetISO);
  const day = d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const time = d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
  const rows = [
    { label: "Venue", value: `${circuitName || "TBC"}${country ? `, ${country}` : ""}` },
    { label: "Race Day", value: day },
    { label: "Lights Out", value: `${time} UTC` },
  ];

  const mainTitle = [raceName, circuitName && country ? `${circuitName}, ${country}` : circuitName]
    .filter(Boolean)
    .join("\n");

  const markers = [
    ...(hasCoords
      ? [{ lat: lat!, lng: lng!, size: 1, pulse: true, title: mainTitle }]
      : []),
    ...(upcomingRaces ?? [])
      .filter((r) => r.lat != null && r.lng != null)
      .map((r) => {
        const d = r.dateISO ? new Date(r.dateISO) : null;
        const dateLabel = d
          ? d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
          : "";
        const lines = [
          r.raceName || r.circuitName || "Upcoming race",
          [r.circuitName, r.country].filter(Boolean).join(", "),
          dateLabel,
        ].filter(Boolean);
        return {
          lat: r.lat!,
          lng: r.lng!,
          size: 0.6,
          pulse: false,
          color: "#22c55e",
          title: lines.join("\n"),
        };
      }),
  ];

  return (
    <div className="border-t border-pebble-15 px-4 pb-5 pt-4 md:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        {hasCoords && (
          <div className="md:w-1/2">
            <DottedMap
              width={320}
              height={160}
              mapSamples={1800}
              markers={markers}
              markerColor="#E10600"
              dotRadius={0.32}
              dotColor="#9aa0ad"
              className="text-pebble-80"
            />
          </div>
        )}
        <div className="flex flex-col gap-4 md:w-1/2">
          {rows.map((r) => (
            <div key={r.label} className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-pebble-50">
                {r.label}
              </span>
              <span className="font-display text-[18px] font-semibold leading-tight text-pebble">
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default function RaceCountdown({
  targetISO,
  raceName,
  circuitName,
  country,
  round,
  lat,
  lng,
  upcomingRaces,
}: Props) {
  const items = useMemo(
    () => [
      { round, lat, lng, circuitName, country, raceName, dateISO: targetISO },
      ...(upcomingRaces ?? []).map((r, i) => ({
        round: r.round ?? round + i + 1,
        lat: r.lat,
        lng: r.lng,
        circuitName: r.circuitName ?? "TBC",
        country: r.country ?? "",
        raceName: r.raceName ?? "Upcoming race",
        dateISO: r.dateISO ?? targetISO,
      })),
    ],
    [targetISO, raceName, circuitName, country, round, lat, lng, upcomingRaces],
  );

  const [activeIdx, setActiveIdx] = useState(0);
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  // If the set of races changes upstream, keep selection within bounds.
  useEffect(() => {
    setActiveIdx((idx) => Math.min(idx, items.length - 1));
  }, [items.length]);

  const active = items[Math.min(activeIdx, items.length - 1)] ?? items[0];
  const activeTarget = new Date(active.dateISO).getTime();
  const flagSrc = flagImage(active.country);

  useEffect(() => {
    const tick = () => setRemaining(getRemaining(activeTarget));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [activeTarget]);

  return (
    <section className="overflow-hidden rounded-xl border border-pebble-15 bg-carbon-deep">
      <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="flex flex-col gap-3">
          <h2 className="m-0 flex items-center gap-3 font-headline text-[clamp(22px,3vw,34px)] font-semibold leading-[0.98] tracking-[0.02em] text-pebble">
            {flagSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={flagSrc}
                alt={active.country}
                className="h-7 w-10 shrink-0 rounded-none object-cover"
              />
            ) : null}
            {active.raceName}
          </h2>
          <p className="m-0 text-sm text-pebble-80">
            Round {active.round} · {active.circuitName}
          </p>
          {items.length > 1 && (
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-pebble-50">
                Countdown to
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-pebble-40 bg-card py-1.5 pl-2.5 pr-2.5 text-[13px] font-medium text-pebble shadow-sm outline-none transition-colors hover:border-f1red/60 focus-visible:border-f1red/60"
                  >
                    <span>
                      Rd {active.round} · {active.raceName}
                    </span>
                    <ChevronDown className="size-3.5 text-pebble-50" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[180px]">
                  {items.map((it, i) => (
                    <DropdownMenuItem
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={
                        i === activeIdx ? "font-semibold text-f1red" : undefined
                      }
                    >
                      Rd {it.round} · {it.raceName}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-3" role="timer" aria-label="Race countdown">
          {UNITS.map((u) => (
            <div
              key={u.key}
              className="flex min-w-[64px] flex-col items-center gap-1 rounded-xl bg-pebble-5 px-3 py-3 md:min-w-[78px] md:px-4 md:py-4"
            >
              <span className="font-geist text-[clamp(26px,4vw,42px)] leading-none tabular-nums tracking-[-0.02em] text-pebble">
                {remaining
                  ? String(remaining[u.key]).padStart(2, "0")
                  : "--"}
              </span>
              <span className="font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-pebble-50">
                {u.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <RaceLocationMap
        lat={active.lat}
        lng={active.lng}
        raceName={active.raceName}
        circuitName={active.circuitName}
        country={active.country}
        targetISO={active.dateISO}
        upcomingRaces={upcomingRaces}
      />

      <div className="flex items-center justify-between border-t border-pebble-15 px-6 py-3 md:px-8">
        <span className="text-[11px] text-pebble-50">
          {remaining?.done ? "Race weekend is live" : "Until lights out"}
        </span>
        <Link
          href="/calendar"
          className="group inline-flex items-center gap-1.5 font-display text-[11px] font-semibold tracking-[0.12em] text-f1red transition-all hover:gap-2.5"
        >
          View Schedule
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}