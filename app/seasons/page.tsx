"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Types ───
interface Season {
  year: number;
  champion: string;
  team: string;
  teamColor: string;
  races: number;
  poles: number;
  status: "finished" | "in-progress";
}

// ─── Data ───
const seasons: Season[] = [
  { year: 2025, champion: "L. Hamilton", team: "Ferrari", teamColor: "var(--t-ferrari)", races: 24, poles: 8, status: "finished" },
  { year: 2024, champion: "M. Verstappen", team: "Red Bull", teamColor: "var(--t-redbull)", races: 24, poles: 8, status: "finished" },
  { year: 2023, champion: "M. Verstappen", team: "Red Bull", teamColor: "var(--t-redbull)", races: 22, poles: 12, status: "finished" },
  { year: 2022, champion: "M. Verstappen", team: "Red Bull", teamColor: "var(--t-redbull)", races: 22, poles: 7, status: "finished" },
  { year: 2021, champion: "M. Verstappen", team: "Red Bull", teamColor: "var(--t-redbull)", races: 22, poles: 10, status: "finished" },
  { year: 2020, champion: "L. Hamilton", team: "Mercedes", teamColor: "var(--t-mercedes)", races: 17, poles: 10, status: "finished" },
  { year: 2019, champion: "L. Hamilton", team: "Mercedes", teamColor: "var(--t-mercedes)", races: 21, poles: 5, status: "finished" },
  { year: 2018, champion: "L. Hamilton", team: "Mercedes", teamColor: "var(--t-mercedes)", races: 21, poles: 11, status: "finished" },
  { year: 2017, champion: "L. Hamilton", team: "Mercedes", teamColor: "var(--t-mercedes)", races: 20, poles: 11, status: "finished" },
  { year: 2016, champion: "N. Rosberg", team: "Mercedes", teamColor: "var(--t-mercedes)", races: 21, poles: 8, status: "finished" },
  { year: 2008, champion: "L. Hamilton", team: "McLaren", teamColor: "var(--t-mclaren)", races: 18, poles: 7, status: "finished" },
  { year: 2004, champion: "M. Schumacher", team: "Ferrari", teamColor: "var(--t-ferrari)", races: 18, poles: 8, status: "finished" },
];

// ─── Components ───
function SeasonCard({ season }: { season: Season }) {
  return (
    <Link
      href={`/seasons/${season.year}`}
      className="season-card"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: 8,
        overflow: "hidden",
        transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
        cursor: "pointer",
        position: "relative",
        display: "block",
        textDecoration: "none",
        color: "inherit",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "var(--f1-red)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.4), 0 0 20px var(--f1-red-dim)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "var(--line)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Race count badge */}
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "var(--surface-raised)",
          border: "1px solid var(--line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 900,
          color: "var(--muted)",
        }}
      >
        {season.races}
      </div>

      <div style={{ padding: 24 }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--muted-dim)",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            fontWeight: 800,
            marginBottom: 6,
          }}
        >
          Season
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: 32,
            color: "var(--text-primary)",
            marginBottom: 16,
            lineHeight: 1,
          }}
        >
          {season.year}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Champion</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{season.champion}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Team</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: season.teamColor }}>{season.team}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Races</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "var(--text-secondary)" }}>{season.races}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Poles</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "var(--text-secondary)" }}>{season.poles}</span>
          </div>
        </div>

        <div
          style={{
            marginTop: 16,
            paddingTop: 14,
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--muted-dim)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: 800,
            }}
          >
            Completed
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: 4,
              color: "var(--success)",
              background: "var(--success-dim)",
              border: "1px solid rgba(16,185,129,0.2)",
            }}
          >
            Finished
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Main Page ───
export default function SeasonsPage() {
  const [search, setSearch] = useState("");
  const [era, setEra] = useState("All Eras");
  const [sort, setSort] = useState("Newest");

  const filtered = seasons
    .filter((s) => {
      const q = search.toLowerCase();
      const matchesSearch =
        s.year.toString().includes(q) ||
        s.champion.toLowerCase().includes(q) ||
        s.team.toLowerCase().includes(q);
      let matchesEra = true;
      if (era === "Turbo-Hybrid (2014-)") matchesEra = s.year >= 2014;
      else if (era === "V8 Era (2006-2013)") matchesEra = s.year >= 2006 && s.year <= 2013;
      else if (era === "V10 Era (1995-2005)") matchesEra = s.year >= 1995 && s.year <= 2005;
      else if (era === "Classic Era (1950-1994)") matchesEra = s.year <= 1994;
      return matchesSearch && matchesEra;
    })
    .sort((a, b) => {
      if (sort === "Oldest") return a.year - b.year;
      if (sort === "Most Races") return b.races - a.races;
      return b.year - a.year; // Newest default
    });

  return (
    <main>
      {/* Page Header */}
      <div className="page-header" style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "var(--f1-red)" }} />
        <div className="wrap" style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div
            className="eyebrow"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}
          >
            <span style={{ width: 24, height: 2, background: "var(--f1-red)" }} />
            Archive
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(32px,5vw,56px)",
              textTransform: "uppercase",
              letterSpacing: "-0.3px",
              lineHeight: 1,
              marginBottom: 12,
              color: "var(--text-primary)",
            }}
          >
            Seasons
          </h1>
          <p style={{ color: "var(--muted)", maxWidth: 620, fontSize: 15, lineHeight: 1.6 }}>
            Explore every Formula 1 season from 1950 to present. View champions, statistics, race calendars, and historical records.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div style={{ padding: "20px clamp(20px,4vw,48px)", borderBottom: "1px solid var(--line)", background: "var(--surface)" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 260, maxWidth: 480 }}>
            <svg
              style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "var(--muted-dim)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search season, champion, or circuit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                background: "var(--tarmac)",
                border: "1px solid var(--line)",
                borderRadius: 6,
                padding: "10px 14px 10px 40px",
                fontSize: 13,
                color: "var(--text-primary)",
                fontFamily: "var(--font-body)",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--f1-red)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
            />
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <select
              value={era}
              onChange={(e) => setEra(e.target.value)}
              style={{
                background: "var(--tarmac)",
                border: "1px solid var(--line)",
                borderRadius: 6,
                padding: "10px 16px",
                fontSize: 12,
                color: "var(--muted)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                fontWeight: 700,
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option>All Eras</option>
              <option>Turbo-Hybrid (2014-)</option>
              <option>V8 Era (2006-2013)</option>
              <option>V10 Era (1995-2005)</option>
              <option>Classic Era (1950-1994)</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                background: "var(--tarmac)",
                border: "1px solid var(--line)",
                borderRadius: 6,
                padding: "10px 16px",
                fontSize: 12,
                color: "var(--muted)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                fontWeight: 700,
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option>Newest</option>
              <option>Oldest</option>
              <option>Most Races</option>
            </select>
          </div>
        </div>
      </div>

      {/* Current Season Banner */}
      <div style={{ padding: "32px clamp(20px,4vw,48px) 0" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 8,
              background: "linear-gradient(135deg, rgba(225,6,0,0.08) 0%, var(--surface) 50%, var(--tarmac) 100%)",
              border: "1px solid var(--line)",
              padding: "clamp(28px,4vw,40px)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--f1-red)", boxShadow: "0 0 12px var(--f1-red-glow)" }} />
            <div
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 200,
                height: 200,
                background: "radial-gradient(circle, var(--f1-red-glow) 0%, transparent 70%)",
                opacity: 0.5,
              }}
            />
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: "var(--f1-red)",
                      background: "var(--f1-red-dim)",
                      border: "1px solid var(--f1-red-glow)",
                      padding: "4px 10px",
                      borderRadius: 4,
                    }}
                  >
                    <span className="live-dot" />
                    In Progress
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--muted-dim)",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    Round 9 of 22
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(22px,3vw,32px)",
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                    color: "var(--text-primary)",
                    marginBottom: 6,
                  }}
                >
                  2026 Formula 1 Season
                </h2>
                <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 20 }}>
                  British Grand Prix latest completed &bull; Next: Hungarian GP, 20 July
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--muted-dim)",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontWeight: 800,
                        marginBottom: 4,
                      }}
                    >
                      Leader
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>Kimi Antonelli</div>
                    <div style={{ fontSize: 12, color: "var(--t-mercedes)", fontWeight: 600 }}>Mercedes</div>
                  </div>
                  <div style={{ width: 1, background: "var(--line)" }} />
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--muted-dim)",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontWeight: 800,
                        marginBottom: 4,
                      }}
                    >
                      Constructors
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>Mercedes</div>
                    <div style={{ fontSize: 12, color: "var(--t-mercedes)", fontWeight: 600 }}>333 PTS</div>
                  </div>
                  <div style={{ width: 1, background: "var(--line)" }} />
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--muted-dim)",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontWeight: 800,
                        marginBottom: 4,
                      }}
                    >
                      Wins
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>6</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>Mercedes</div>
                  </div>
                </div>
              </div>
              <Link
                href="/seasons/2026"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 24px",
                  background: "var(--f1-red)",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 13,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#ff1a1a")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--f1-red)")}
              >
                View 2026 Calendar
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Seasons Grid */}
      <div style={{ padding: "32px clamp(20px,4vw,48px) clamp(64px,8vw,96px)" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 24,
              flexWrap: "wrap",
              gap: 12,
              borderBottom: "2px solid var(--f1-red)",
              paddingBottom: 12,
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(24px,4vw,32px)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ width: 4, height: 28, background: "var(--f1-red)", borderRadius: 2 }} />
              All Seasons
            </h2>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--muted-dim)",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontWeight: 700,
              }}
            >
              {filtered.length} shown
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {filtered.map((season) => (
              <SeasonCard key={season.year} season={season} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
                color: "var(--muted)",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              No seasons found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}