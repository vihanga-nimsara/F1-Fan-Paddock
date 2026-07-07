'use client';

import { useState } from 'react';
import { getTeamColor } from '@/lib/teamColors';
import { DRIVER_SLUGS } from '@/lib/drivers'; // <-- Import here



interface DriverRow {
  position: string;
  name: string;
  team: string;
  points: string;
  countryCode?: string; 
  headshotUrl?: string; 
}

interface ConstructorRow {
  position: string;
  name: string;
  subtitle: string;
  points: string;
  countryCode?: string; 
}

const FALLBACK_AVATAR = 'https://www.formula1.com/content/dam/fom-website/drivers/default-driver.png';

function getDriverImageUrl(name: string) {
  // Replace spaces with hyphens for the slug, e.g., "Lewis Hamilton" -> "lewis-hamilton"
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  
  // This is a dedicated, open-source F1 developer image repository
  return `https://raw.githubusercontent.com/f1-draft/f1-api/master/images/drivers/${slug}.png`;
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
        <span>Drivers&rsquo; Standings</span>
        <span className="count">{countLabel ?? `${rows.length} DRIVERS`}</span>
      </h3>
      <table className="standings-table">
        <tbody>
          {shown.map((r) => (
            <tr key={r.position} className={r.position === '1' ? 'p1' : ''}>
              <td className="pos-cell">{r.position}</td>
              <td>
                <div className="driver-cell" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span 
                    className="team-tick" 
                    style={{ 
                      background: getTeamColor(r.team) || 'var(--muted-dim)',
                      width: '3px',
                      height: '32px',
                      display: 'block',
                      borderRadius: '1px'
                    }} 
                  />
                  
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', position: 'relative', backgroundColor: '#1C1C24' }}>
                    <img
                      src={r.headshotUrl || getDriverImageUrl(r.name)}
                      alt={r.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.currentTarget.src = FALLBACK_AVATAR; }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="driver-name" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>{r.name}</span>
                      {r.countryCode && (
                        <img 
                          src={`https://flagcdn.com/w40/${r.countryCode.toLowerCase()}.png`} 
                          alt="" 
                          style={{ width: '16px', height: 'auto', borderRadius: '1px', opacity: 0.8 }} 
                        />
                      )}
                    </div>
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
        <span>Constructors&rsquo; Standings</span>
        <span className="count">{countLabel ?? `${rows.length} TEAMS`}</span>
      </h3>
      <table className="standings-table">
        <tbody>
          {rows.map((r) => (
            <tr key={r.position} className={r.position === '1' ? 'p1' : ''}>
              <td className="pos-cell">{r.position}</td>
              <td>
                <div className="driver-cell" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span 
                    className="team-tick" 
                    style={{ 
                      background: getTeamColor(r.name) || 'var(--muted-dim)',
                      width: '3px',
                      height: '32px',
                      display: 'block',
                      borderRadius: '1px'
                    }} 
                  />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="driver-name" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>{r.name}</span>
                      {r.countryCode && (
                        <img 
                          src={`https://flagcdn.com/w40/${r.countryCode.toLowerCase()}.png`} 
                          alt="" 
                          style={{ width: '16px', height: 'auto', borderRadius: '1px', opacity: 0.8 }} 
                        />
                      )}
                    </div>
                    {r.subtitle && <div className="team-label">{r.subtitle}</div>}
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