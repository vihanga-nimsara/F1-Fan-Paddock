"use client";

import { useCallback, useEffect, useState } from "react";
import { Switch, LinearProgress, Tooltip } from "@mui/material";
import {
  getDrivers,
  getLatestSession,
  getLivePositions,
  getNextRaces,
  type DriverInfo,
  type LivePosition,
  type LiveSession,
  type Race,
} from "@/lib/f1";

type LiveRow = {
  position: number;
  number: number;
  code: string;
  name: string;
  team: string;
  teamColor: string;
  headshot?: string;
};

export default function LiveDashboard() {
  const [rows, setRows] = useState<LiveRow[]>([]);
  const [session, setSession] = useState<string>("");
  const [status, setStatus] = useState<"live" | "offline" | "error">("offline");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [progress, setProgress] = useState(0);
  const [next, setNext] = useState<Race | null>(null);

  const load = useCallback(async () => {
    try {
      const s = await getLatestSession();
      if (!s) {
        const upcoming = await getNextRaces(1);
        setNext(upcoming[0] ?? null);
        setStatus("offline");
        setRows([]);
        return;
      }

      const [drivers, livePositions] = await Promise.all([
        getDrivers(s.session_key),
        getLivePositions(s.session_key),
      ]);

      const lastByDriver = new Map<number, LivePosition>();
      for (const p of livePositions) lastByDriver.set(p.driver_number, p);

      const byNum = new Map<number, DriverInfo>();
      for (const d of drivers) byNum.set(d.driver_number, d);

      const merged = Array.from(lastByDriver.entries())
        .map(([num, p]) => {
          const d = byNum.get(num);
          return {
            position: p.position,
            number: num,
            code: d?.driver_code ?? `#${num}`,
            name: d?.last_name ?? d?.full_name ?? `#${num}`,
            team: d?.team_name ?? "Unknown",
            teamColor: teamColor(d?.team_name ?? ""),
            headshot: d?.headshot_url,
          };
        })
        .sort((a, b) => a.position - b.position)
        .slice(0, 20);

      setRows(merged);
      setSession(sessionLabel(s));
      setProgress(sessionProgress(s));
      setNext(null);
      setStatus("live");
    } catch {
      setStatus("error");
      setRows([]);
    }
  }, []);

  useEffect(() => {
    load();
    if (!autoRefresh) return;
    const id = setInterval(load, 120_000);
    return () => clearInterval(id);
  }, [autoRefresh, load]);

  return (
    <div className="flex w-full flex-col gap-3 rounded-xl bg-pebble-5 p-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 className="m-0 font-display text-base font-medium tracking-[0.06em] text-pebble leading-none">
            Live Timing
          </h2>
          {status === "live" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-f1red px-2 py-0.5 text-[9px] font-semibold tracking-[0.1em] text-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              LIVE
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-pebble-10 px-2 py-0.5 text-[9px] font-semibold tracking-[0.1em] text-pebble-80">
              {status === "error" ? "UNAVAILABLE" : "OFFLINE"}
            </span>
          )}
        </div>

        <Tooltip title="Positions update from OpenF1 while a session is running.">
          <span className="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-pebble-40 text-[9px] font-semibold leading-none text-pebble-80 hover:bg-pebble-10">
            ?
          </span>
        </Tooltip>
      </div>

      {status === "live" && (
        <>
          <p className="m-0 -mt-1 text-[11px] font-medium tracking-[0.04em] text-pebble">
            {session}
          </p>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[10px] font-medium tracking-[0.06em] text-pebble-80">
              <span>Session progress</span>
              <span>{progress}%</span>
            </div>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 4,
                borderRadius: 999,
                bgcolor: "rgba(20,20,28,0.1)",
                "& .MuiLinearProgress-bar": { bgcolor: "#e10600" },
              }}
            />
          </div>

          <label className="flex items-center gap-2 text-[10px] font-medium tracking-[0.06em] text-pebble-80">
            <Switch
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              size="small"
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": { color: "#e10600" },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#e10600",
                },
              }}
            />
            Auto-refresh every 2 min
          </label>
        </>
      )}

      {/* Live board */}
      {status === "live" && (
        <div className="flex flex-col gap-1">
          <div className="grid grid-cols-[28px_1fr_auto] gap-2 px-1 pb-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-pebble-50">
            <span className="text-center">Pos</span>
            <span>Driver</span>
            <span>Team</span>
          </div>
          <ol className="flex max-h-[360px] flex-col overflow-y-auto">
            {rows.map((r) => (
              <li
                key={r.number}
                className="grid grid-cols-[28px_1fr_auto] items-center gap-2 border-b border-pebble-8 py-1.5 last:border-b-0"
              >
                <span className="text-center font-display text-sm font-semibold text-pebble">
                  {r.position}
                </span>
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-5 w-0.5 shrink-0 rounded-full"
                    style={{ background: r.teamColor }}
                  />
                  {r.headshot ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={r.headshot}
                      alt={r.name}
                      loading="lazy"
                      className="h-6 w-6 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white"
                      style={{ background: r.teamColor }}
                    >
                      {r.code.slice(0, 3)}
                    </span>
                  )}
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="truncate font-display text-xs font-semibold text-pebble">
                      {r.name}
                    </span>
                    <span className="truncate text-[9px] text-pebble-50">
                      {r.code}
                    </span>
                  </span>
                </span>
                <span className="truncate text-right text-[10px] text-pebble-80">
                  {r.team}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Offline / error fallback */}
      {status !== "live" && (
        <div className="flex flex-col gap-2 rounded-xl border border-pebble-15 bg-pebble-8 p-4">
          <p className="m-0 text-xs font-medium text-pebble">
            {status === "error"
              ? "Live timing is temporarily unavailable."
              : "No session is live right now."}
          </p>
          <p className="m-0 text-[11px] leading-snug text-pebble-80">
            Live timing only runs during a Grand Prix session (practice,
            qualifying or the race). It shows the running order of every driver,
            updated automatically.
          </p>
          {next && (
            <div className="mt-1 flex items-center gap-3 rounded-xl bg-pebble-5 p-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-f1red font-display text-sm font-bold text-white">
                {next.round}
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-display text-sm font-semibold text-pebble">
                  {next.raceName}
                </span>
                <span className="truncate text-[10px] text-pebble-80">
                  {next.circuitName} · {next.country} · in{" "}
                  {Math.max(1, Math.ceil(
                    (new Date(next.dateISO).getTime() - Date.now()) / 86_400_000,
                  ))}{" "}
                  days
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {status === "live" && (
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-pebble-80">
            {autoRefresh ? "Auto-refreshing" : "Auto-refresh off"}
          </span>
          <button
            type="button"
            onClick={() => load()}
            className="rounded-xl border border-pebble-40 bg-pebble-10 px-2 py-1 text-[10px] font-medium tracking-[0.06em] text-pebble transition-colors hover:bg-f1red-15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-f1red"
          >
            Refresh
          </button>
        </div>
      )}
    </div>
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
