"use client";

import { useState } from "react";
import { getTeamColor } from "@/lib/teamColors";

interface DriverRow {
  position: string;
  name: string;
  team: string;
  points: string;
  countryCode?: string;
}

interface ConstructorRow {
  position: string;
  name: string;
  subtitle: string;
  points: string;
  countryCode?: string;
}

// ─── Flag Helper ───
function getFlagCode(name: string, countryCode?: string): string {
  if (countryCode && countryCode.length === 2) return countryCode.toLowerCase();

  const mapping: Record<string, string> = {
    "kimi antonelli": "it", "andrea kimi antonelli": "it", "george russell": "gb",
    "lewis hamilton": "gb", "charles leclerc": "mc", "lando norris": "gb",
    "oscar piastri": "au", "max verstappen": "nl", "isack hadjar": "fr",
    "pierre gasly": "fr", "liam lawson": "nz", "arvid lindblad": "gb",
    "oliver bearman": "gb", "franco colapinto": "ar", "gabriel bortoleto": "br",
    "carlos sainz": "es", "alexander albon": "th", "esteban ocon": "fr",
    "fernando alonso": "es", "nico hülkenberg": "de", "valtteri bottas": "fi",
    "sergio pérez": "mx", "lance stroll": "ca",
  };

  return mapping[name.toLowerCase().trim()] || "un";
}

// ─── Driver Standings Panel ───
export function DriverStandingsPanel({
  rows = [],
  visibleCount = 10,
  countLabel,
}: {
  rows: DriverRow[];
  visibleCount?: number;
  countLabel?: string;
}) {
  const [expanded, setExpanded] = useState(visibleCount >= rows.length);
  const shown = expanded ? rows : rows.slice(0, visibleCount);
  const hasMore = rows.length > visibleCount;

  return (
    <div className="standings-panel">
      {/* Panel Header */}
      <div className="panel-title">
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "0.5px", margin: 0, textTransform: "uppercase" as const, color: "var(--text-primary)" }}>
            DRIVERS&rsquo; STANDINGS
          </h3>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--muted-dim)", letterSpacing: "0.5px" }}>
            {countLabel ?? `${rows.length} DRIVERS`}
          </span>
        </div>
        <div style={{ width: "40px", height: "3px", backgroundColor: "var(--f1-red)", borderRadius: "2px" }} />
      </div>

      {/* Table */}
      <table className="standings-table">
        <thead>
          <tr>
            <th style={{ width: "56px", textAlign: "center" }}>POS</th>
            <th style={{ paddingLeft: "12px" }}>DRIVER</th>
            <th>TEAM</th>
            <th style={{ width: "70px", textAlign: "right", paddingRight: "8px" }}>PTS</th>
          </tr>
        </thead>
        <tbody>
          {shown.map((r, idx) => {
            const flagIso = getFlagCode(r.name, r.countryCode);
            const isTopThree = ["1", "2", "3"].includes(r.position);

            let posBg = "transparent";
            let posColor = "var(--muted)";
            if (r.position === "1") { posBg = "var(--f1-red)"; posColor = "var(--text-primary)"; }
            if (r.position === "2") { posBg = "#3A3B40"; posColor = "var(--text-primary)"; }
            if (r.position === "3") { posBg = "#CD7F32"; posColor = "var(--tarmac)"; }

            const teamColor = getTeamColor(r.team) || "#4B5563";

            return (
              <tr
                key={r.position}
                className={r.position === "1" ? "p1" : r.position === "2" ? "p2" : r.position === "3" ? "p3" : ""}
                style={{ backgroundColor: idx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}
              >
                {/* POS */}
                <td style={{ textAlign: "center", padding: "0" }}>
                  <span
                    className="pos-badge"
                    style={{
                      backgroundColor: posBg,
                      color: posColor,
                      border: isTopThree ? "none" : "1px solid var(--line)",
                    }}
                  >
                    {r.position}
                  </span>
                </td>

                {/* DRIVER */}
                <td style={{ padding: "0 0 0 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img
                      src={`https://flagcdn.com/w40/${flagIso}.png`}
                      alt=""
                      style={{
                        width: "22px",
                        height: "15px",
                        objectFit: "cover",
                        borderRadius: "2px",
                        flexShrink: 0,
                        display: "block",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                      }}
                    />
                    <span className="driver-name">{r.name}</span>
                  </div>
                </td>

                {/* TEAM */}
                <td style={{ padding: "0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      className="team-tick"
                      style={{
                        backgroundColor: teamColor,
                        boxShadow: `0 0 6px ${teamColor}40`,
                      }}
                    />
                    <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {r.team}
                    </span>
                  </div>
                </td>

                {/* POINTS */}
                <td className="pts-cell" style={{ textAlign: "right", padding: "0 8px 0 0" }}>
                  {r.points}
                </td>
              </tr>
            );
          })}

          {/* Expand Button */}
          {hasMore && (
            <tr>
              <td colSpan={4} style={{ paddingTop: "16px" }}>
                <button
                  className="expand-btn"
                  onClick={() => setExpanded((v) => !v)}
                >
                  {expanded ? "SHOW LESS ↑" : "SHOW FULL STANDINGS ↓"}
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// ─── Constructor Standings Panel ───
export function ConstructorStandingsPanel({
  rows = [],
  countLabel,
}: {
  rows: ConstructorRow[];
  countLabel?: string;
}) {
  if (rows.length === 0) return null;

  return (
    <div className="standings-panel">
      {/* Panel Header */}
      <div className="panel-title">
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "0.5px", margin: 0, textTransform: "uppercase" as const, color: "var(--text-primary)" }}>
            CONSTRUCTORS&rsquo; STANDINGS
          </h3>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--muted-dim)", letterSpacing: "0.5px" }}>
            {countLabel ?? `${rows.length} TEAMS`}
          </span>
        </div>
        <div style={{ width: "40px", height: "3px", backgroundColor: "var(--f1-red)", borderRadius: "2px" }} />
      </div>

      <table className="standings-table">
        <thead>
          <tr>
            <th style={{ width: "56px", textAlign: "center" }}>POS</th>
            <th style={{ paddingLeft: "12px" }}>TEAM</th>
            <th style={{ width: "70px", textAlign: "right", paddingRight: "8px" }}>PTS</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => {
            const teamColor = getTeamColor(r.name) || "#4B5563";

            return (
              <tr
                key={r.position}
                className={r.position === "1" ? "p1" : ""}
                style={{ backgroundColor: idx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}
              >
                {/* POS */}
                <td style={{ textAlign: "center", padding: "0" }}>
                  <span
                    className="pos-badge"
                    style={{
                      backgroundColor: r.position === "1" ? "var(--f1-red)" : "transparent",
                      color: r.position === "1" ? "var(--text-primary)" : "var(--muted)",
                      border: r.position === "1" ? "none" : "1px solid var(--line)",
                    }}
                  >
                    {r.position}
                  </span>
                </td>

                {/* TEAM */}
                <td style={{ padding: "0 0 0 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      className="team-tick"
                      style={{
                        backgroundColor: teamColor,
                        boxShadow: `0 0 6px ${teamColor}40`,
                      }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                      <span className="driver-name">{r.name}</span>
                      {r.subtitle && (
                        <span className="team-label">{r.subtitle}</span>
                      )}
                    </div>
                  </div>
                </td>

                {/* POINTS */}
                <td className="pts-cell" style={{ textAlign: "right", padding: "0 8px 0 0" }}>
                  {r.points}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}