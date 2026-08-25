"use client";

import { useState } from "react";
import { Tabs, Tab, Select, MenuItem, Tooltip, Divider } from "@mui/material";
import { StandingsTable, type StandingRow } from "@/components/f1kit";

const SEASONS = [
  { label: "2026", value: "2026" },
  { label: "2025", value: "2025" },
  { label: "2024", value: "2024" },
];

function InfoIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM7.25 5a.75.75 0 0 1 1.5 0v.5a.75.75 0 0 1-1.5 0V5Zm.25 3a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5A.75.75 0 0 1 7.5 8Z" />
    </svg>
  );
}

export default function StandingsTabs({
  driverRows,
  conRows,
}: {
  driverRows: StandingRow[];
  conRows: StandingRow[];
}) {
  const [tab, setTab] = useState("drivers");
  const [season, setSeason] = useState("2026");

  const tabSx = {
    fontFamily: "var(--font-display)",
    textTransform: "none",
    fontWeight: 600,
    letterSpacing: "0.06em",
    color: "var(--color-pebble-80)",
    "&.Mui-selected": { color: "var(--color-pebble)" },
  };

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-pebble-10 bg-carbon-deep p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h2 className="m-0 font-headline text-[clamp(20px,2.4vw,30px)] font-semibold uppercase leading-[0.95] tracking-[0.02em] text-pebble">
            Season Standings
          </h2>
          <Tooltip title="Championship points update after every session.">
            <span className="flex size-6 cursor-help items-center justify-center rounded-full text-pebble-80 transition-colors hover:bg-f1red-15 hover:text-f1red">
              <InfoIcon aria-hidden="true" />
            </span>
          </Tooltip>
        </div>

        <Select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          size="small"
          sx={{
            minWidth: 96,
            fontFamily: "var(--font-body)",
            "& .MuiSelect-select": { py: 1 },
          }}
        >
          {SEASONS.map((s) => (
            <MenuItem key={s.value} value={s.value}>
              {s.label}
            </MenuItem>
          ))}
        </Select>
      </div>

      <Divider sx={{ borderColor: "rgba(20,20,28,0.1)" }} />

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v as string)}
        sx={{
          borderBottom: "1px solid rgba(20,20,28,0.15)",
          minHeight: "auto",
          "& .MuiTab-root": { minHeight: "auto", py: 1, ...tabSx },
          "& .MuiTabs-indicator": { bgcolor: "#e10600", height: 2 },
        }}
      >
        <Tab label="Drivers" value="drivers" disableRipple />
        <Tab label="Constructors" value="constructors" disableRipple />
      </Tabs>

      <div className="mt-4">
        <div className="h-[420px] w-full overflow-y-auto rounded-xl border border-pebble-10 bg-carbon">
          <div className="py-2 pl-2 pr-3">
            <StandingsTable rows={tab === "drivers" ? driverRows : conRows} />
          </div>
        </div>
      </div>
    </div>
  );
}
