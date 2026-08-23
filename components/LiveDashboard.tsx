"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getDrivers,
  getLatestSession,
  getLivePositions,
  type DriverInfo,
  type LivePosition,
  type LiveSession,
} from "@/lib/f1";
import { Switch } from "@base-ui/react/switch";
import { Progress } from "@base-ui/react/progress";
import { ScrollArea } from "@base-ui/react/scroll-area";
import { Tooltip } from "@base-ui/react/tooltip";

type LiveRow = {
  position: number;
  code: string;
  team: string;
  teamColor: string;
};

export default function LiveDashboard() {
  const [rows, setRows] = useState<LiveRow[]>([]);
  const [session, setSession] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [progress, setProgress] = useState(0);

  const load = useCallback(async () => {
    try {
      const s = await getLatestSession();
      if (!s) {
        setError("No live session right now");
        return;
      }

      const [drivers, livePositions] = await Promise.all([
        getDrivers(s.session_key),
        getLivePositions(s.session_key),
      ]);

      const lastByDriver = new Map<number, LivePosition>();
      for (const p of livePositions) {
        lastByDriver.set(p.driver_number, p);
      }

      const byNum = new Map<number, DriverInfo>();
      for (const d of drivers) byNum.set(d.driver_number, d);

      const merged = Array.from(lastByDriver.entries())
        .map(([num, p]) => {
          const d = byNum.get(num);
          return {
            position: p.position,
            code: d?.driver_code ?? `#${num}`,
            team: d?.team_name ?? "Unknown",
            teamColor: teamColor(d?.team_name ?? ""),
          };
        })
        .sort((a, b) => a.position - b.position)
        .slice(0, 12);

      setRows(merged);
      setSession(sessionLabel(s));
      setProgress(sessionProgress(s));
      setError(null);
    } catch {
      setError("Live data unavailable");
    }
  }, []);

  useEffect(() => {
    load();
    if (!autoRefresh) return;
    const id = setInterval(load, 120_000);
    return () => clearInterval(id);
  }, [autoRefresh, load]);

  return (
    <Tooltip.Provider>
      <div className="flex w-full flex-col gap-2 rounded-[2px] bg-pebble-5 p-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="m-0 font-display text-base font-medium tracking-[0.06em] text-pebble leading-none">
            Live Timing
          </h2>
          <div className="flex items-center gap-2">
            <Tooltip.Root>
              <Tooltip.Trigger
                className="flex h-4 w-4 items-center justify-center rounded-full border border-pebble-40 text-[9px] font-semibold leading-none text-pebble-80 hover:bg-pebble-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-f1red"
                aria-label="What is session progress"
              >
                ?
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner sideOffset={8}>
                  <Tooltip.Popup className="relative flex flex-col border border-pebble-40 bg-carbon-deep px-2 py-1 text-[10px] text-pebble shadow-md">
                    <Tooltip.Arrow className="relative block w-3 h-1.5 overflow-clip [data-side=bottom]:top-[-6px] before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:w-[calc(6px*sqrt(2))] before:h-[calc(6px*sqrt(2))] before:bg-carbon-deep before:border before:border-pebble-40 before:[transform:translate(-50%,50%)_rotate(45deg)]" />
                    Session progress is derived from the scheduled start and end
                    times.
                  </Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.06em] text-pebble-80">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-f1red" />
              LIVE
            </span>
          </div>
        </div>

        <label className="flex items-center gap-2 text-[10px] font-medium tracking-[0.06em] text-pebble-80">
          <Switch.Root
            checked={autoRefresh}
            onCheckedChange={setAutoRefresh}
            className="flex h-5 w-9 shrink-0 border border-pebble-40 bg-pebble-10 p-0.5 transition-colors duration-150 ease-[ease] data-checked:bg-f1red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-f1red"
          >
            <Switch.Thumb className="size-3.5 bg-pebble-80 transition-[translate,background-color] duration-150 ease-[ease] data-checked:translate-x-4 data-checked:bg-white" />
          </Switch.Root>
          Auto-refresh
        </label>

        <Progress.Root
          value={progress}
          className="grid w-full grid-cols-2 gap-y-1"
        >
          <Progress.Label className="text-[10px] font-medium tracking-[0.06em] text-pebble-80">
            Session progress
          </Progress.Label>
          <Progress.Value className="text-right text-[10px] font-medium tracking-[0.06em] text-pebble-80" />
          <Progress.Track className="col-span-2 h-1 overflow-hidden rounded-full bg-pebble-10">
            <Progress.Indicator className="h-full bg-f1red transition-[width] duration-500" />
          </Progress.Track>
        </Progress.Root>

        {session && (
          <p className="m-0 text-[10px] leading-tight text-pebble-80">
            {session}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-[10px] text-pebble-80">
            {autoRefresh ? "Auto-refreshing every 2 min" : "Auto-refresh off"}
          </span>
          <button
            type="button"
            onClick={() => load()}
            className="rounded-[2px] border border-pebble-40 bg-pebble-10 px-2 py-1 text-[10px] font-medium tracking-[0.06em] text-pebble transition-colors hover:bg-f1red-15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-f1red"
          >
            Refresh
          </button>
        </div>

        {error ? (
          <p className="m-0 text-xs text-pebble-80">{error}</p>
        ) : (
          <ScrollArea.Root className="h-[320px] w-full">
            <ScrollArea.Viewport className="h-full w-full">
              <ScrollArea.Content>
                {rows.length === 0 ? (
                  <p className="m-0 text-xs text-pebble-80">
                    Waiting for live data…
                  </p>
                ) : (
                  <ol className="flex w-full list-none flex-col">
                    {rows.map((r) => (
                      <li
                        key={r.code}
                        className="flex items-center gap-2 border-b border-pebble-8 py-1 last:border-b-0"
                      >
                        <span className="w-[18px] shrink-0 text-right font-display text-xs font-medium text-pebble-50">
                          {r.position}
                        </span>
                        <span
                          className="h-3.5 w-0.5 shrink-0 rounded-full"
                          style={{ background: r.teamColor }}
                        />
                        <span className="min-w-0 flex-1 truncate font-display text-xs font-semibold text-pebble">
                          {r.code}
                        </span>
                        <span className="truncate text-[10px] text-pebble-80">
                          {r.team}
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className="m-px flex w-2 justify-center bg-pebble-10 opacity-0 transition-opacity data-hovering:pointer-events-auto data-hovering:opacity-100 data-scrolling:pointer-events-auto data-scrolling:opacity-100">
              <ScrollArea.Thumb className="w-full bg-pebble-40" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        )}
      </div>
    </Tooltip.Provider>
  );
}

function sessionLabel(s: LiveSession): string {
  return `${s.circuit_short_name} · ${s.session_name}`;
}

function sessionProgress(s: LiveSession): number {
  const start = new Date(s.date_start).getTime();
  const end = new Date(s.date_end).getTime();
  if (!isFinite(start) || !isFinite(end) || end <= start) return 0;
  const pct = ((Date.now() - start) / (end - start)) * 100;
  return Math.min(100, Math.max(0, Math.round(pct)));
}

function teamColor(teamName: string): string {
  const map: Record<string, string> = {
    Mercedes: "#27F4D2",
    Ferrari: "#E8002D",
    "Red Bull Racing": "#3671C6",
    McLaren: "#FF8000",
    "Aston Martin": "#229971",
    Alpine: "#2293D1",
    Williams: "#64C4FF",
    "RB F1 Team": "#6692FF",
    "Haas F1 Team": "#B6BABD",
    "Kick Sauber": "#52E252",
    Audi: "#52E252",
    Cadillac: "#8B8B8B",
  };
  return map[teamName] ?? "#888888";
}
