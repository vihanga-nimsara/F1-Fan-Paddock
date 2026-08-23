"use client";

import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { flagImage } from "@/lib/f1";
import { DottedMap } from "@/components/ui/dotted-map";

type Props = {
  targetISO: string;
  raceName: string;
  circuitName: string;
  country: string;
  round: number;
  lat?: number;
  lng?: number;
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
  circuitName,
  country,
}: {
  lat: number;
  lng: number;
  circuitName: string;
  country: string;
}) {
  return (
    <div className="border-t border-pebble-15 px-4 pb-5 pt-4 md:px-8">
      <DottedMap
        width={320}
        height={160}
        mapSamples={1800}
        markers={[{ lat, lng, size: 1, pulse: true }]}
        markerColor="#E10600"
        dotRadius={0.22}
        className="text-pebble-20"
      />
      <p className="m-0 mt-2 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-pebble-50">
        {circuitName} · {country}
      </p>
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
}: Props) {
  const target = new Date(targetISO).getTime();
  const flagSrc = flagImage(country);
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(getRemaining(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <section className="overflow-hidden rounded-[2px] border border-pebble-15 bg-carbon-deep">
      <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-2 font-display text-[11px] font-semibold tracking-[0.16em] text-f1red">
            <span className="h-3 w-[3px] bg-f1red" aria-hidden="true" />
            NEXT RACE
          </span>
          <h2 className="m-0 flex items-center gap-3 font-headline text-[clamp(22px,3vw,34px)] font-semibold uppercase leading-[0.98] tracking-[0.02em] text-pebble">
            {flagSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={flagSrc}
                alt={country}
                className="h-7 w-10 shrink-0 rounded-[2px] object-cover"
              />
            ) : null}
            {raceName}
          </h2>
          <p className="m-0 text-sm text-pebble-80">
            Round {round} · {circuitName}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {UNITS.map((u) => (
            <div
              key={u.key}
              className="flex min-w-[64px] flex-col items-center gap-1 rounded-[2px] bg-pebble-5 px-3 py-3 md:min-w-[78px] md:px-4 md:py-4"
            >
              <span className="font-display text-[clamp(26px,4vw,40px)] font-semibold leading-none tabular-nums tracking-[-0.02em] text-pebble">
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

      {lat != null && lng != null && (
        <RaceLocationMap
          lat={lat}
          lng={lng}
          circuitName={circuitName}
          country={country}
        />
      )}

      <div className="flex items-center justify-between border-t border-pebble-15 px-6 py-3 md:px-8">
        <span className="text-[11px] text-pebble-50">
          {remaining?.done ? "Race weekend is live" : "Until lights out"}
        </span>
        <Link
          href="/calendar"
          className="font-display text-[11px] font-semibold tracking-[0.12em] text-f1red transition-opacity hover:opacity-80"
        >
          VIEW SCHEDULE →
        </Link>
      </div>
    </section>
  );
}
