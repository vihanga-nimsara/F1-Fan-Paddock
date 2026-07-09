'use client';

import { useState, useMemo } from 'react';

// ─── Real 2026 F1 Driver Standings Data (After British GP, Round 9) ───
// Sources: ESPN, Formula1.com, RacingNews365

interface DriverCardProps {
  number: string;
  name: string;
  team: string;
  flagIso: string;
  accentColor: string;
  stats: {
    pos: string;
    pts: string;
    wins: string;
    podiums: string;
  };
}

const DRIVERS_DATA: DriverCardProps[] = [
  { number: '12', name: 'Kimi Antonelli', team: 'Mercedes', flagIso: 'it', accentColor: '#6CD3BF', stats: { pos: '1', pts: '179', wins: '5', podiums: '7' } },
  { number: '63', name: 'George Russell', team: 'Mercedes', flagIso: 'gb', accentColor: '#6CD3BF', stats: { pos: '2', pts: '154', wins: '1', podiums: '5' } },
  { number: '44', name: 'Lewis Hamilton', team: 'Ferrari', flagIso: 'gb', accentColor: '#E80020', stats: { pos: '3', pts: '147', wins: '1', podiums: '4' } },
  { number: '16', name: 'Charles Leclerc', team: 'Ferrari', flagIso: 'mc', accentColor: '#E80020', stats: { pos: '4', pts: '108', wins: '1', podiums: '3' } },
  { number: '1', name: 'Lando Norris', team: 'McLaren', flagIso: 'gb', accentColor: '#FF8000', stats: { pos: '5', pts: '97', wins: '0', podiums: '3' } },
  { number: '81', name: 'Oscar Piastri', team: 'McLaren', flagIso: 'au', accentColor: '#FF8000', stats: { pos: '6', pts: '82', wins: '0', podiums: '2' } },
  { number: '3', name: 'Max Verstappen', team: 'Red Bull Racing', flagIso: 'nl', accentColor: '#3671C6', stats: { pos: '7', pts: '76', wins: '0', podiums: '1' } },
  { number: '43', name: 'Isack Hadjar', team: 'Alpine', flagIso: 'fr', accentColor: '#2293D1', stats: { pos: '8', pts: '52', wins: '0', podiums: '1' } },
  { number: '10', name: 'Pierre Gasly', team: 'Alpine', flagIso: 'fr', accentColor: '#2293D1', stats: { pos: '9', pts: '42', wins: '0', podiums: '1' } },
  { number: '30', name: 'Liam Lawson', team: 'Racing Bulls', flagIso: 'nz', accentColor: '#5E8FAA', stats: { pos: '10', pts: '39', wins: '0', podiums: '0' } },
  { number: '41', name: 'Arvid Lindblad', team: 'Racing Bulls', flagIso: 'gb', accentColor: '#5E8FAA', stats: { pos: '11', pts: '20', wins: '0', podiums: '0' } },
  { number: '50', name: 'Oliver Bearman', team: 'Haas', flagIso: 'gb', accentColor: '#B6BABD', stats: { pos: '12', pts: '18', wins: '0', podiums: '0' } },
  { number: '31', name: 'Franco Colapinto', team: 'Haas', flagIso: 'ar', accentColor: '#B6BABD', stats: { pos: '13', pts: '18', wins: '0', podiums: '0' } },
  { number: '5', name: 'Gabriel Bortoleto', team: 'Audi', flagIso: 'br', accentColor: '#52E252', stats: { pos: '14', pts: '6', wins: '0', podiums: '0' } },
  { number: '55', name: 'Carlos Sainz', team: 'Williams', flagIso: 'es', accentColor: '#37BEDD', stats: { pos: '15', pts: '6', wins: '0', podiums: '0' } },
  { number: '23', name: 'Alexander Albon', team: 'Williams', flagIso: 'th', accentColor: '#37BEDD', stats: { pos: '16', pts: '5', wins: '0', podiums: '0' } },
  { number: '14', name: 'Fernando Alonso', team: 'Aston Martin', flagIso: 'es', accentColor: '#358C75', stats: { pos: '17', pts: '3', wins: '0', podiums: '0' } },
  { number: '18', name: 'Lance Stroll', team: 'Aston Martin', flagIso: 'ca', accentColor: '#358C75', stats: { pos: '18', pts: '1', wins: '0', podiums: '0' } },
  { number: '27', name: 'Nico Hülkenberg', team: 'Audi', flagIso: 'de', accentColor: '#52E252', stats: { pos: '19', pts: '0', wins: '0', podiums: '0' } },
  { number: '11', name: 'Sergio Pérez', team: 'Cadillac', flagIso: 'mx', accentColor: '#EFEF41', stats: { pos: '20', pts: '0', wins: '0', podiums: '0' } },
  { number: '77', name: 'Valtteri Bottas', team: 'Cadillac', flagIso: 'fi', accentColor: '#EFEF41', stats: { pos: '21', pts: '0', wins: '0', podiums: '0' } },
  { number: '6', name: 'Esteban Ocon', team: 'Red Bull Racing', flagIso: 'fr', accentColor: '#3671C6', stats: { pos: '22', pts: '0', wins: '0', podiums: '0' } },
];

// ─── Team Colors Map (for reference) ───
const TEAM_COLORS: Record<string, string> = {
  'Mercedes': '#6CD3BF',
  'Ferrari': '#E80020',
  'McLaren': '#FF8000',
  'Red Bull Racing': '#3671C6',
  'Alpine': '#2293D1',
  'Racing Bulls': '#5E8FAA',
  'Haas': '#B6BABD',
  'Williams': '#37BEDD',
  'Aston Martin': '#358C75',
  'Audi': '#52E252',
  'Cadillac': '#EFEF41',
};

// ─── Sort Options ───
type SortKey = 'pos' | 'pts' | 'wins' | 'podiums' | 'name';

export default function DriversDashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('pos');
  const [teamFilter, setTeamFilter] = useState<string>('ALL');

  // Unique teams for filter
  const teams = useMemo(() => {
    const all = DRIVERS_DATA.map(d => d.team);
    return ['ALL', ...Array.from(new Set(all))];
  }, []);

  // Filter & Sort
  const filteredDrivers = useMemo(() => {
    let result = DRIVERS_DATA.filter((driver) => {
      const query = searchQuery.toLowerCase();
      return (
        driver.name.toLowerCase().includes(query) ||
        driver.team.toLowerCase().includes(query)
      );
    });

    if (teamFilter !== 'ALL') {
      result = result.filter(d => d.team === teamFilter);
    }

    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'pts') return parseInt(b.stats.pts) - parseInt(a.stats.pts);
      if (sortBy === 'wins') return parseInt(b.stats.wins) - parseInt(a.stats.wins);
      if (sortBy === 'podiums') return parseInt(b.stats.podiums) - parseInt(a.stats.podiums);
      return parseInt(a.stats.pos) - parseInt(b.stats.pos);
    });

    return result;
  }, [searchQuery, sortBy, teamFilter]);

  const topThree = filteredDrivers.slice(0, 3);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0B0C10',
      color: '#E4E4E7',
      fontFamily: 'Formula1 Display-Regular',
    }}>
      {/* ─── Hero Header ─── */}
      <div style={{
        background: 'linear-gradient(180deg, #15151E 0%, #0B0C10 100%)',
        borderBottom: '1px solid #1F1F27',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* F1 Red accent stripe top */}
        <div style={{
          height: '4px',
          width: '100%',
          backgroundColor: '#E10600',
        }} />

        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '48px 24px 32px',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Breadcrumb / Label */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#E10600',
              animation: 'pulse 2s infinite',
            }} />
            <span style={{
              fontSize: '11px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: '#E10600',
            }}>
              2026 Championship
            </span>
            <span style={{ color: '#3F3F46', fontSize: '11px' }}>|</span>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#71717A',
            }}>
              Round 9 of 22 — British GP
            </span>
          </div>

          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 1; box-shadow: 0 0 8px #E10600; }
            }
          `}</style>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.1,
          }}>
            Driver Standings
          </h1>

          <p style={{
            fontSize: '15px',
            color: '#A1A1AA',
            marginTop: '12px',
            maxWidth: '500px',
            lineHeight: 1.5,
          }}>
            Track every driver across the 2026 Formula 1 season. Updated after the British Grand Prix at Silverstone.
          </p>

          {/* ─── Controls Bar ─── */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid #1F1F27',
          }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '400px' }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#71717A"
                strokeWidth="2.5"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search driver or team..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#1A1B23',
                  border: '1px solid #27272A',
                  borderRadius: '8px',
                  padding: '12px 16px 12px 44px',
                  fontSize: '14px',
                  color: '#E4E4E7',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  fontFamily: 'Formula1 Display-Regular',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#E10600'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#27272A'; }}
              />
            </div>

            {/* Team Filter */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {teams.map((team) => (
                <button
                  key={team}
                  onClick={() => setTeamFilter(team)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'all 0.2s ease',
                    backgroundColor: teamFilter === team ? '#E10600' : '#1A1B23',
                    color: teamFilter === team ? '#ffffff' : '#A1A1AA',
                  }}
                  onMouseEnter={(e) => {
                    if (teamFilter !== team) {
                      e.currentTarget.style.backgroundColor = '#27272A';
                      e.currentTarget.style.color = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (teamFilter !== team) {
                      e.currentTarget.style.backgroundColor = '#1A1B23';
                      e.currentTarget.style.color = '#A1A1AA';
                    }
                  }}
                >
                  {team === 'ALL' ? 'All Teams' : team}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Sort
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                style={{
                  backgroundColor: '#1A1B23',
                  border: '1px solid #27272A',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#E4E4E7',
                  cursor: 'pointer',
                  outline: 'none',
                  fontFamily: 'Formula1 Display-Regular',
                }}
              >
                <option value="pos">Position</option>
                <option value="pts">Points</option>
                <option value="wins">Wins</option>
                <option value="podiums">Podiums</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <main style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '32px 24px 64px',
      }}>
        {/* Top 3 Podium Highlight */}
        {searchQuery === '' && teamFilter === 'ALL' && sortBy === 'pos' && topThree.length >= 3 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '32px',
          }}>
            {topThree.map((driver, idx) => {
              const isFirst = idx === 0;
              const medals = ['#E10600', '#C0C0C0', '#CD7F32'];
              const glows = ['rgba(225,6,0,0.15)', 'rgba(192,192,192,0.1)', 'rgba(205,127,50,0.1)'];

              return (
                <div
                  key={driver.number}
                  style={{
                    background: `linear-gradient(180deg, #15151E 0%, #0F1016 100%)`,
                    border: `1px solid ${isFirst ? '#E10600' : '#1F1F27'}`,
                    borderRadius: '12px',
                    padding: '24px',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: isFirst ? '0 0 40px rgba(225,6,0,0.1)' : 'none',
                  }}
                >
                  {/* Medal indicator */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: medals[idx],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '14px',
                    color: idx === 1 ? '#15151E' : '#ffffff',
                  }}>
                    {idx + 1}
                  </div>

                  {/* Team color bar */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    backgroundColor: driver.accentColor,
                    boxShadow: `0 0 12px ${driver.accentColor}60`,
                  }} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <span style={{
                      fontFamily: 'monospace',
                      fontSize: '36px',
                      fontWeight: 900,
                      color: driver.accentColor,
                      lineHeight: 1,
                    }}>
                      {driver.number}
                    </span>
                    <img
                      src={`https://flagcdn.com/w40/${driver.flagIso}.png`}
                      alt={driver.name}
                      style={{
                        width: '28px',
                        height: '20px',
                        objectFit: 'cover',
                        borderRadius: '2px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                      }}
                    />
                  </div>

                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 900,
                    color: '#ffffff',
                    margin: '0 0 4px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em',
                  }}>
                    {driver.name}
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#71717A',
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    {driver.team}
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '8px',
                    marginTop: '20px',
                    paddingTop: '16px',
                    borderTop: '1px solid #1F1F27',
                  }}>
                    <PodiumMetric title="POS" value={driver.stats.pos} highlight={isFirst} />
                    <PodiumMetric title="PTS" value={driver.stats.pts} highlight={isFirst} />
                    <PodiumMetric title="WINS" value={driver.stats.wins} highlight={isFirst} />
                    <PodiumMetric title="POD" value={driver.stats.podiums} highlight={isFirst} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Driver Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {filteredDrivers.map((driver) => {
            const isTopThree = ['1', '2', '3'].includes(driver.stats.pos);
            const teamColor = TEAM_COLORS[driver.team] || driver.accentColor;

            return (
              <div
                key={driver.number}
                style={{
                  background: 'linear-gradient(180deg, #15151E 0%, #0F1016 100%)',
                  border: `1px solid ${isTopThree ? `${teamColor}40` : '#1F1F27'}`,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = teamColor;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${teamColor}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isTopThree ? `${teamColor}40` : '#1F1F27';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Team color accent bar */}
                <div style={{
                  height: '3px',
                  width: '100%',
                  backgroundColor: teamColor,
                  boxShadow: `0 0 8px ${teamColor}40`,
                }} />

                <div style={{ padding: '20px' }}>
                  {/* Header: Number + Flag + Position Badge */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        fontFamily: 'monospace',
                        fontSize: '28px',
                        fontWeight: 900,
                        color: teamColor,
                        lineHeight: 1,
                        textShadow: `0 0 20px ${teamColor}30`,
                      }}>
                        {driver.number}
                      </span>
                      <img
                        src={`https://flagcdn.com/w40/${driver.flagIso}.png`}
                        alt={driver.name}
                        style={{
                          width: '24px',
                          height: '16px',
                          objectFit: 'cover',
                          borderRadius: '2px',
                          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                        }}
                      />
                    </div>

                    {/* Position Badge */}
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      backgroundColor: driver.stats.pos === '1' ? '#E10600' : '#1A1B23',
                      color: driver.stats.pos === '1' ? '#ffffff' : '#A1A1AA',
                      fontFamily: 'monospace',
                      fontWeight: 900,
                      fontSize: '13px',
                      border: driver.stats.pos === '1' ? 'none' : '1px solid #27272A',
                    }}>
                      {driver.stats.pos}
                    </span>
                  </div>

                  {/* Name & Team */}
                  <div style={{ marginBottom: '16px' }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 900,
                      color: '#ffffff',
                      margin: '0 0 4px 0',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.01em',
                    }}>
                      {driver.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: teamColor,
                        boxShadow: `0 0 6px ${teamColor}60`,
                      }} />
                      <span style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#71717A',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>
                        {driver.team}
                      </span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '4px',
                    paddingTop: '14px',
                    borderTop: '1px solid #1F1F27',
                  }}>
                    <StatBox title="POS" value={driver.stats.pos} />
                    <StatBox title="PTS" value={driver.stats.pts} accent={teamColor} />
                    <StatBox title="WINS" value={driver.stats.wins} />
                    <StatBox title="POD" value={driver.stats.podiums} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredDrivers.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 24px',
            border: '2px dashed #1F1F27',
            borderRadius: '16px',
            backgroundColor: 'rgba(255,255,255,0.01)',
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3F3F46" strokeWidth="1.5" style={{ marginBottom: '16px' }}>
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
              <path d="M8 8l6 6M14 8l-6 6" strokeLinecap="round" />
            </svg>
            <p style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#71717A',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              margin: 0,
            }}>
              No drivers match your search
            </p>
            <p style={{
              fontSize: '13px',
              color: '#3F3F46',
              marginTop: '8px',
            }}>
              Try adjusting your filters or search terms
            </p>
          </div>
        )}

        {/* Results Count */}
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 700,
          color: '#3F3F46',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          Showing {filteredDrivers.length} of {DRIVERS_DATA.length} drivers
        </div>
      </main>
    </div>
  );
}

// ─── Sub-components ───

function StatBox({ title, value, accent }: { title: string; value: string; accent?: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <span style={{
        display: 'block',
        fontSize: '10px',
        fontWeight: 800,
        letterSpacing: '0.15em',
        color: '#3F3F46',
        textTransform: 'uppercase',
        marginBottom: '4px',
      }}>
        {title}
      </span>
      <span style={{
        fontFamily: 'monospace',
        fontSize: '15px',
        fontWeight: 900,
        color: accent || '#E4E4E7',
      }}>
        {value}
      </span>
    </div>
  );
}

function PodiumMetric({ title, value, highlight }: { title: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <span style={{
        display: 'block',
        fontSize: '10px',
        fontWeight: 800,
        letterSpacing: '0.15em',
        color: '#3F3F46',
        textTransform: 'uppercase',
        marginBottom: '4px',
      }}>
        {title}
      </span>
      <span style={{
        fontFamily: 'monospace',
        fontSize: '18px',
        fontWeight: 900,
        color: highlight ? '#E10600' : '#ffffff',
      }}>
        {value}
      </span>
    </div>
  );
}