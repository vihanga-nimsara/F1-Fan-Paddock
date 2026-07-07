'use client';

import { useState } from 'react';
import { getTeamColor } from '@/lib/teamColors';

interface DriverRow {
  position: string;
  name: string;
  team: string;
  points: string;
}
interface ConstructorRow {
  position: string;
  name: string;
  subtitle: string;
  points: string;
}

export function DriverStandingsPanel({
  rows,
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
      <h3 className="panel-title">
        Drivers&rsquo; <span className="count">{countLabel ?? `${rows.length} DRIVERS`}</span>
      </h3>
      <table className="standings-table">
        <tbody>
          {shown.map((r) => (
            <tr key={r.position} className={r.position === '1' ? 'p1' : ''}>
              <td className="pos-cell">{r.position}</td>
              <td>
                <div className="driver-cell">
                  <span className="team-tick" style={{ background: getTeamColor(r.team) }} />
                  <div>
                    <div className="driver-name">{r.name}</div>
                    <div className="team-label">{r.team}</div>
                  </div>
                </div>
              </td>
              <td className="pts-cell">{r.points}</td>
            </tr>
          ))}
          {hasMore && (
            <tr className="expand-row">
              <td colSpan={3}>
                <button className="expand-btn" onClick={() => setExpanded((v) => !v)}>
                  {expanded ? 'Show Less ↑' : 'Show Full Standings ↓'}
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function ConstructorStandingsPanel({ rows, countLabel }: { rows: ConstructorRow[]; countLabel?: string }) {
  return (
    <div className="standings-panel">
      <h3 className="panel-title">
        Constructors&rsquo; <span className="count">{countLabel ?? `${rows.length} TEAMS`}</span>
      </h3>
      <table className="standings-table">
        <tbody>
          {rows.map((r) => (
            <tr key={r.position} className={r.position === '1' ? 'p1' : ''}>
              <td className="pos-cell">{r.position}</td>
              <td>
                <div className="driver-cell">
                  <span className="team-tick" style={{ background: getTeamColor(r.name) }} />
                  <div>
                    <div className="driver-name">{r.name}</div>
                    <div className="team-label">{r.subtitle}</div>
                  </div>
                </div>
              </td>
              <td className="pts-cell">{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}