"use client";

import { useEffect, useState } from "react";
import { Pill } from "@/components/f1kit";
import { flagImage, type Race } from "@/lib/f1";

function parts(r: Race) {
  const d = new Date(r.dateISO);
  return {
    day: d.getUTCDate(),
    weekday: d.toLocaleDateString("en-GB", {
      weekday: "short",
      timeZone: "UTC",
    }),
    mon: d.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" }),
    monthLong: d.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }),
  };
}

function FlagIcon({ race }: { race: Race }) {
  const src = flagImage(race.country);
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={race.country}
        loading="lazy"
        className="h-6 w-9 shrink-0 rounded-none object-cover"
      />
    );
  }
  return (
    <span className="w-9 shrink-0 text-center text-lg leading-none">
      {race.flag}
    </span>
  );
}

// Single shared ticker so every card counts down without spawning 20+ intervals.
function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function MiniCountdown({
  dateISO,
  finished,
  now,
}: {
  dateISO: string;
  finished: boolean;
  now: number;
}) {
  if (finished) return <span className="opacity-80">Finished</span>;
  const diff = new Date(dateISO).getTime() - now;
  if (diff <= 0) return <span className="opacity-80">Finished</span>;
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return (
    <span className="tabular-nums">
      {d > 0 ? `${d}d ` : ""}
      {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:
      {String(s).padStart(2, "0")}
    </span>
  );
}

function GridCard({
  race,
  isNext,
  now,
}: {
  race: Race;
  isNext: boolean;
  now: number;
}) {
  const p = parts(race);
  const past = race.status === "past";

  const cardClass = isNext
    ? "bg-f1red border-f1red text-white"
    : past
      ? "border-pebble-15 bg-carbon-deep"
      : "border-pebble-15 bg-pebble-5";

  const nameText = isNext ? "text-white" : "text-pebble";
  const accentText = isNext ? "text-white/70" : "text-pebble-50";
  const subText = isNext ? "text-white/85" : "text-pebble-80";

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-xl border transition-shadow ${cardClass}`}
    >
      <div
        className={`flex items-center gap-3 border-b p-3 ${
          isNext ? "border-white/20" : "border-pebble-15"
        }`}
      >
        <FlagIcon race={race} />
        <div className="flex min-w-0 flex-col">
          <span
            className={`truncate font-display text-sm font-semibold tracking-[0.02em] ${nameText}`}
          >
            {race.raceName}
          </span>
          <span
            className={`font-display text-[10px] font-semibold tracking-[0.12em] ${accentText}`}
          >
            ROUND {race.round}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-baseline gap-2">
          <span
            className={`font-headline text-3xl font-semibold leading-none ${
              isNext ? "text-white" : "text-pebble"
            }`}
          >
            {p.day}
          </span>
          <span
            className={`font-display text-[11px] font-semibold uppercase tracking-[0.12em] ${subText}`}
          >
            {p.mon} · {p.weekday}
          </span>
        </div>
        <span className={`truncate text-[11px] ${subText}`}>
          {race.circuitName}
        </span>

        <div className="mt-auto pt-1">
          {past ? (
            <Pill tone="muted">Finished</Pill>
          ) : (
            <div
              className={`flex items-center gap-2 ${isNext ? "text-white" : "text-pebble-80"}`}
            >
              <span
                className={`font-display text-[10px] font-semibold tracking-[0.12em] ${
                  isNext ? "text-white/80" : "text-pebble-50"
                }`}
              >
                {isNext ? "NEXT RACE" : "COUNTDOWN"}
              </span>
              <span
                className={`font-display tabular-nums ${
                  isNext ? "text-sm" : "text-[11px]"
                }`}
              >
                <MiniCountdown dateISO={race.dateISO} finished={false} now={now} />
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function CalendarView({ races }: { races: Race[] }) {
  const now = useNow();
  const nextRound = races.find((r) => r.status === "upcoming")?.round;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="font-display text-[10px] font-semibold tracking-[0.14em] text-pebble-50">
          {races.length} RACES · 2026 SEASON
        </span>
        <span className="flex items-center gap-3 font-display text-[10px] font-semibold tracking-[0.12em] text-pebble-50">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-f1red" /> Next
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-pebble-5 ring-1 ring-pebble-15" />{" "}
            Upcoming
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-carbon-deep ring-1 ring-pebble-15" />{" "}
            Finished
          </span>
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {races.map((r) => (
          <GridCard
            key={r.round}
            race={r}
            isNext={nextRound === r.round}
            now={now}
          />
        ))}
      </div>
    </div>
  );
}
