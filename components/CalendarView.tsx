"use client";

import { useEffect, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { Pill } from "@/components/f1kit";
import { flagImage, type Race } from "@/lib/f1";

type View = "list" | "grid";

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
        className="h-6 w-9 shrink-0 rounded-[2px] object-cover"
      />
    );
  }
  return (
    <span className="w-9 shrink-0 text-center text-lg leading-none">
      {race.flag}
    </span>
  );
}

function ListRow({ race, isNext }: { race: Race; isNext: boolean }) {
  const p = parts(race);
  return (
    <div
      className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-pebble-8 p-3 last:border-b-0 md:gap-4 md:p-4 ${
        isNext ? "bg-f1red-10" : race.status === "past" ? "opacity-75" : ""
      }`}
    >
      <div className="flex w-11 flex-col items-center rounded-[2px] border border-pebble-15 bg-carbon-deep px-1 py-2 md:w-14">
        <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-pebble-50">
          {p.weekday}
        </span>
        <span className="font-display text-xl font-semibold leading-none text-pebble md:text-2xl">
          {p.day}
        </span>
        <span className="mt-0.5 text-[9px] uppercase tracking-[0.08em] text-pebble-50">
          {p.mon}
        </span>
      </div>

      <div className="flex min-w-0 items-center gap-3">
        <FlagIcon race={race} />
        <div className="flex min-w-0 flex-col">
          <span className="flex items-center gap-2">
            <span className="truncate font-display text-sm font-semibold tracking-[0.02em] text-pebble">
              {race.raceName}
            </span>
            {isNext && <Pill tone="accent">Next</Pill>}
          </span>
          <span className="truncate text-[11px] text-pebble-80">
            {race.circuitName} · {race.country}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1">
        <span className="font-display text-[10px] font-semibold tracking-[0.12em] text-pebble-50">
          RND {race.round}
        </span>
        {race.status === "upcoming" && race.daysUntil !== undefined ? (
          <Pill tone={isNext ? "accent" : "default"}>
            {race.daysUntil <= 1 ? "This week" : `In ${race.daysUntil}d`}
          </Pill>
        ) : (
          <Pill>Finished</Pill>
        )}
      </div>
    </div>
  );
}

function GridCard({ race, isNext }: { race: Race; isNext: boolean }) {
  const p = parts(race);
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-[2px] border border-pebble-15 bg-pebble-5 transition-shadow ${
        isNext ? "border-t-[3px] border-t-f1red bg-f1red-10" : ""
      } ${race.status === "past" && !isNext ? "opacity-75" : ""}`}
    >
      <div className="flex items-center gap-3 border-b border-pebble-15 p-3">
        <FlagIcon race={race} />
        <div className="flex min-w-0 flex-col">
          <span className="truncate font-display text-sm font-semibold tracking-[0.02em] text-pebble">
            {race.raceName}
          </span>
          <span className="font-display text-[10px] font-semibold tracking-[0.12em] text-pebble-50">
            ROUND {race.round}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-baseline gap-2">
          <span className="font-headline text-3xl font-semibold leading-none text-pebble">
            {p.day}
          </span>
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-pebble-80">
            {p.mon} · {p.weekday}
          </span>
        </div>
        <span className="truncate text-[11px] text-pebble-80">
          {race.circuitName}
        </span>
        <div className="mt-auto pt-1">
          {race.status === "upcoming" && race.daysUntil !== undefined ? (
            <Pill tone={isNext ? "accent" : "default"}>
              {isNext
                ? "NEXT RACE"
                : race.daysUntil <= 1
                  ? "This week"
                  : `In ${race.daysUntil}d`}
            </Pill>
          ) : (
            <Pill>Finished</Pill>
          )}
        </div>
      </div>
    </article>
  );
}

function groupByMonth(races: Race[]) {
  const groups: { label: string; races: Race[] }[] = [];
  for (const r of races) {
    const label = parts(r).monthLong;
    let g = groups.find((x) => x.label === label);
    if (!g) {
      g = { label, races: [] };
      groups.push(g);
    }
    g.races.push(r);
  }
  return groups;
}

export default function CalendarView({ races }: { races: Race[] }) {
  const [view, setView] = useState<View>("list");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("calendar-view");
      if (saved === "grid" || saved === "list") setView(saved);
    } catch {
      /* noop */
    }
  }, []);

  const choose = (v: View) => {
    setView(v);
    try {
      window.localStorage.setItem("calendar-view", v);
    } catch {
      /* noop */
    }
  };

  const nextRound = races.find((r) => r.status === "upcoming")?.round;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="font-display text-[10px] font-semibold tracking-[0.14em] text-pebble-50">
          {races.length} RACES · 2026 SEASON
        </span>
        <div className="inline-flex overflow-hidden rounded-[2px] border border-pebble-15 bg-carbon-deep">
          {(["list", "grid"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => choose(v)}
              className={`inline-flex cursor-pointer items-center gap-1.5 px-3 py-2 font-display text-[11px] font-semibold tracking-[0.12em] transition-colors ${
                view === v
                  ? "bg-f1red text-white"
                  : "text-pebble-80 hover:text-pebble"
              }`}
            >
              {v === "list" ? <List size={13} /> : <LayoutGrid size={13} />}
              {v.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {view === "list" ? (
        <div className="flex flex-col gap-8">
          {groupByMonth(races).map((g) => (
            <section key={g.label} className="flex flex-col gap-3">
              <div className="flex items-end justify-between border-b border-pebble-15 pb-2">
                <h2 className="m-0 font-headline text-xl font-semibold uppercase tracking-[0.04em] text-pebble">
                  {g.label}
                </h2>
                <span className="font-display text-[10px] font-semibold tracking-[0.14em] text-pebble-50">
                  {g.races.length} {g.races.length === 1 ? "RACE" : "RACES"}
                </span>
              </div>
              <div className="flex w-full flex-col overflow-hidden rounded-[2px] bg-pebble-5">
                {g.races.map((r) => (
                  <ListRow key={r.round} race={r} isNext={nextRound === r.round} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {races.map((r) => (
            <GridCard key={r.round} race={r} isNext={nextRound === r.round} />
          ))}
        </div>
      )}
    </div>
  );
}
