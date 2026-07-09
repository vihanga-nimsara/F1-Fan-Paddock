'use client';

import { useState, useMemo } from 'react';

// ─── Real 2026 F1 Constructor Standings Data (After British GP, Round 9) ───
interface ConstructorCardProps {
  position: string;
  name: string;
  shortName: string;
  color: string;
  drivers: { name: string; number: string; flagIso: string }[];
  stats: {
    pts: string;
    wins: string;
    podiums: string;
    poles: string;
  };
  logo?: string;
}

const CONSTRUCTORS_DATA: ConstructorCardProps[] = [
  {
    position: '1',
    name: 'Mercedes',
    shortName: 'MER',
    color: '#6CD3BF',
    drivers: [
      { name: 'Kimi Antonelli', number: '12', flagIso: 'it' },
      { name: 'George Russell', number: '63', flagIso: 'gb' },
    ],
    stats: { pts: '333', wins: '6', podiums: '12', poles: '4' },
  },
  {
    position: '2',
    name: 'Ferrari',
    shortName: 'FER',
    color: '#E80020',
    drivers: [
      { name: 'Lewis Hamilton', number: '44', flagIso: 'gb' },
      { name: 'Charles Leclerc', number: '16', flagIso: 'mc' },
    ],
    stats: { pts: '255', wins: '2', podiums: '7', poles: '3' },
  },
  {
    position: '3',
    name: 'McLaren',
    shortName: 'MCL',
    color: '#FF8000',
    drivers: [
      { name: 'Lando Norris', number: '1', flagIso: 'gb' },
      { name: 'Oscar Piastri', number: '81', flagIso: 'au' },
    ],
    stats: { pts: '179', wins: '0', podiums: '5', poles: '1' },
  },
  {
    position: '4',
    name: 'Red Bull Racing',
    shortName: 'RBR',
    color: '#3671C6',
    drivers: [
      { name: 'Max Verstappen', number: '3', flagIso: 'nl' },
      { name: 'Esteban Ocon', number: '6', flagIso: 'fr' },
    ],
    stats: { pts: '76', wins: '0', podiums: '1', poles: '0' },
  },
  {
    position: '5',
    name: 'Alpine',
    shortName: 'ALP',
    color: '#2293D1',
    drivers: [
      { name: 'Isack Hadjar', number: '43', flagIso: 'fr' },
      { name: 'Pierre Gasly', number: '10', flagIso: 'fr' },
    ],
    stats: { pts: '94', wins: '0', podiums: '2', poles: '0' },
  },
  {
    position: '6',
    name: 'Racing Bulls',
    shortName: 'RBT',
    color: '#5E8FAA',
    drivers: [
      { name: 'Liam Lawson', number: '30', flagIso: 'nz' },
      { name: 'Arvid Lindblad', number: '41', flagIso: 'gb' },
    ],
    stats: { pts: '59', wins: '0', podiums: '0', poles: '0' },
  },
  {
    position: '7',
    name: 'Haas',
    shortName: 'HAA',
    color: '#B6BABD',
    drivers: [
      { name: 'Oliver Bearman', number: '50', flagIso: 'gb' },
      { name: 'Franco Colapinto', number: '31', flagIso: 'ar' },
    ],
    stats: { pts: '36', wins: '0', podiums: '0', poles: '0' },
  },
  {
    position: '8',
    name: 'Williams',
    shortName: 'WIL',
    color: '#37BEDD',
    drivers: [
      { name: 'Carlos Sainz', number: '55', flagIso: 'es' },
      { name: 'Alexander Albon', number: '23', flagIso: 'th' },
    ],
    stats: { pts: '11', wins: '0', podiums: '0', poles: '0' },
  },
  {
    position: '9',
    name: 'Aston Martin',
    shortName: 'AMR',
    color: '#358C75',
    drivers: [
      { name: 'Fernando Alonso', number: '14', flagIso: 'es' },
      { name: 'Lance Stroll', number: '18', flagIso: 'ca' },
    ],
    stats: { pts: '4', wins: '0', podiums: '0', poles: '0' },
  },
  {
    position: '10',
    name: 'Audi',
    shortName: 'AUD',
    color: '#52E252',
    drivers: [
      { name: 'Gabriel Bortoleto', number: '5', flagIso: 'br' },
      { name: 'Nico Hülkenberg', number: '27', flagIso: 'de' },
    ],
    stats: { pts: '6', wins: '0', podiums: '0', poles: '0' },
  },
  {
    position: '11',
    name: 'Cadillac',
    shortName: 'CAD',
    color: '#EFEF41',
    drivers: [
      { name: 'Sergio Pérez', number: '11', flagIso: 'mx' },
      { name: 'Valtteri Bottas', number: '77', flagIso: 'fi' },
    ],
    stats: { pts: '0', wins: '0', podiums: '0', poles: '0' },
  },
];

// Team logo URLs (using F1 official team logos via Wikipedia/CDN)
const TEAM_LOGOS: Record<string, string> = {
  'Mercedes': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Mercedes-Benz_in_Formula_One_logo.svg/512px-Mercedes-Benz_in_Formula_One_logo.svg.png',
  'Ferrari': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Scuderia_Ferrari_logo.svg/512px-Scuderia_Ferrari_logo.svg.png',
  'McLaren': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/McLaren_Racing_logo.svg/512px-McLaren_Racing_logo.svg.png',
  'Red Bull Racing': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Oracle_Red_Bull_Racing_logo.svg/512px-Oracle_Red_Bull_Racing_logo.svg.png',
  'Alpine': 'https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Alpine_F1_Team_logo.svg/512px-Alpine_F1_Team_logo.svg.png',
  'Racing Bulls': 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Racing_Bulls_logo.svg/512px-Racing_Bulls_logo.svg.png',
  'Haas': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Haas_F1_Team_logo.svg/512px-Haas_F1_Team_logo.svg.png',
  'Williams': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Williams_Racing_logo_2023.svg/512px-Williams_Racing_logo_2023.svg.png',
  'Aston Martin': 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Aston_Martin_Aramco_Cognizant_F1.svg/512px-Aston_Martin_Aramco_Cognizant_F1.svg.png',
  'Audi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi_logo.svg/512px-Audi_logo.svg.png',
  'Cadillac': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Cadillac_logo.svg/512px-Cadillac_logo.svg.png',
};

// Team car images (using F1 fan art / renders)
const TEAM_CARS: Record<string, string> = {
  'Mercedes': 'https://www.formula1.com/content/dam/fom-website/teams/2026/mercedes.png',
  'Ferrari': 'https://www.formula1.com/content/dam/fom-website/teams/2026/ferrari.png',
  'McLaren': 'https://www.formula1.com/content/dam/fom-website/teams/2026/mclaren.png',
  'Red Bull Racing': 'https://www.formula1.com/content/dam/fom-website/teams/2026/red-bull-racing.png',
  'Alpine': 'https://www.formula1.com/content/dam/fom-website/teams/2026/alpine.png',
  'Racing Bulls': 'https://www.formula1.com/content/dam/fom-website/teams/2026/racing-bulls.png',
  'Haas': 'https://www.formula1.com/content/dam/fom-website/teams/2026/haas.png',
  'Williams': 'https://www.formula1.com/content/dam/fom-website/teams/2026/williams.png',
  'Aston Martin': 'https://www.formula1.com/content/dam/fom-website/teams/2026/aston-martin.png',
  'Audi': 'https://www.formula1.com/content/dam/fom-website/teams/2026/audi.png',
  'Cadillac': 'https://www.formula1.com/content/dam/fom-website/teams/2026/cadillac.png',
};

type SortKey = 'pos' | 'pts' | 'wins' | 'podiums' | 'name';

export default function ConstructorsDashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('pos');
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);

  const filteredConstructors = useMemo(() => {
    let result = CONSTRUCTORS_DATA.filter((c) => {
      const query = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(query) ||
        c.drivers.some(d => d.name.toLowerCase().includes(query))
      );
    });

    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'pts') return parseInt(b.stats.pts) - parseInt(a.stats.pts);
      if (sortBy === 'wins') return parseInt(b.stats.wins) - parseInt(a.stats.wins);
      if (sortBy === 'podiums') return parseInt(b.stats.podiums) - parseInt(a.stats.podiums);
      return parseInt(a.position) - parseInt(b.position);
    });

    return result;
  }, [searchQuery, sortBy]);

  const topThree = filteredConstructors.slice(0, 3);

  return (
    <div className="constructors-page">
      {/* ─── Hero Header ─── */}
      <div className="constructors-hero">
        <div className="constructors-hero-accent" />

        <div className="constructors-hero-inner">
          {/* Breadcrumb */}
          <div className="constructors-breadcrumb">
            <div className="constructors-live-dot" />
            <span className="constructors-breadcrumb-label">2026 Championship</span>
            <span className="constructors-breadcrumb-sep">|</span>
            <span className="constructors-breadcrumb-sub">Round 9 of 22 — British GP</span>
          </div>

          <h1 className="constructors-title">Constructor Standings</h1>
          <p className="constructors-dek">
            Track every team across the 2026 Formula 1 season. Updated after the British Grand Prix at Silverstone.
          </p>

          {/* Controls */}
          <div className="constructors-controls">
            <div className="constructors-search">
              <svg className="constructors-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search team or driver..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="constructors-search-input"
              />
            </div>

            <div className="constructors-sort">
              <span className="constructors-sort-label">Sort</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="constructors-sort-select"
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
      <main className="constructors-main">
        {/* Top 3 Podium */}
        {searchQuery === '' && sortBy === 'pos' && topThree.length >= 3 && (
          <div className="constructors-podium">
            {topThree.map((team, idx) => {
              const isFirst = idx === 0;
              const medals = ['#E10600', '#C0C0C0', '#CD7F32'];
              const positions = ['1st', '2nd', '3rd'];

              return (
                <div
                  key={team.name}
                  className={`constructors-podium-card ${isFirst ? 'first' : ''}`}
                  onMouseEnter={() => setHoveredTeam(team.name)}
                  onMouseLeave={() => setHoveredTeam(null)}
                >
                  {/* Team color bar */}
                  <div className="constructors-podium-bar" style={{ backgroundColor: team.color }} />

                  {/* Medal */}
                  <div className="constructors-podium-medal" style={{ backgroundColor: medals[idx] }}>
                    {idx + 1}
                  </div>

                  {/* Car Image */}
                  <div className="constructors-podium-car-wrap">
                    <img
                      src={TEAM_CARS[team.name] || ''}
                      alt={`${team.name} F1 Car`}
                      className="constructors-podium-car"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="constructors-podium-car-fallback" style={{ background: `linear-gradient(135deg, ${team.color}20, ${team.color}05)` }}>
                      <span style={{ color: team.color, fontSize: '48px', fontWeight: 900, opacity: 0.3 }}>{team.shortName}</span>
                    </div>
                  </div>

                  {/* Logo */}
                  <div className="constructors-podium-logo-wrap">
                    <img
                      src={TEAM_LOGOS[team.name] || ''}
                      alt={team.name}
                      className="constructors-podium-logo"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Team Name */}
                  <h3 className="constructors-podium-name">{team.name}</h3>

                  {/* Drivers */}
                  <div className="constructors-podium-drivers">
                    {team.drivers.map((driver) => (
                      <div key={driver.number} className="constructors-podium-driver">
                        <img
                          src={`https://flagcdn.com/w40/${driver.flagIso}.png`}
                          alt={driver.name}
                          className="constructors-podium-flag"
                        />
                        <span className="constructors-podium-driver-name">{driver.name}</span>
                        <span className="constructors-podium-driver-num" style={{ color: team.color }}>#{driver.number}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="constructors-podium-stats">
                    <PodiumStat title="PTS" value={team.stats.pts} highlight={isFirst} accent={team.color} />
                    <PodiumStat title="WINS" value={team.stats.wins} />
                    <PodiumStat title="POD" value={team.stats.podiums} />
                    <PodiumStat title="POLES" value={team.stats.poles} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Constructor Grid */}
        <div className="constructors-grid">
          {filteredConstructors.map((team) => {
            const isTopThree = ['1', '2', '3'].includes(team.position);
            const isHovered = hoveredTeam === team.name;

            return (
              <div
                key={team.name}
                className={`constructors-card ${isTopThree ? 'top-three' : ''} ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredTeam(team.name)}
                onMouseLeave={() => setHoveredTeam(null)}
              >
                {/* Color bar */}
                <div className="constructors-card-bar" style={{ backgroundColor: team.color }} />

                <div className="constructors-card-inner">
                  {/* Header row */}
                  <div className="constructors-card-header">
                    <div className="constructors-card-position" style={{
                      backgroundColor: team.position === '1' ? '#E10600' : '#1A1B23',
                      color: team.position === '1' ? '#fff' : '#A1A1AA',
                      border: team.position === '1' ? 'none' : '1px solid #27272A',
                    }}>
                      {team.position}
                    </div>

                    <div className="constructors-card-logo-wrap">
                      <img
                        src={TEAM_LOGOS[team.name] || ''}
                        alt={team.name}
                        className="constructors-card-logo"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).nextElementSibling?.classList.add('show');
                        }}
                      />
                      <div className="constructors-card-logo-fallback" style={{ color: team.color }}>
                        {team.shortName}
                      </div>
                    </div>

                    <div className="constructors-card-points" style={{ color: team.color }}>
                      <span className="constructors-card-points-value">{team.stats.pts}</span>
                      <span className="constructors-card-points-label">PTS</span>
                    </div>
                  </div>

                  {/* Team name */}
                  <h3 className="constructors-card-name">{team.name}</h3>

                  {/* Drivers */}
                  <div className="constructors-card-drivers">
                    {team.drivers.map((driver) => (
                      <div key={driver.number} className="constructors-card-driver">
                        <img
                          src={`https://flagcdn.com/w40/${driver.flagIso}.png`}
                          alt={driver.name}
                          className="constructors-card-flag"
                        />
                        <span className="constructors-card-driver-name">{driver.name}</span>
                        <span className="constructors-card-driver-num" style={{ color: team.color }}>#{driver.number}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="constructors-card-stats">
                    <StatBox title="WINS" value={team.stats.wins} />
                    <StatBox title="POD" value={team.stats.podiums} accent={team.color} />
                    <StatBox title="POLES" value={team.stats.poles} />
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="constructors-card-glow" style={{
                  background: `radial-gradient(circle at 50% 0%, ${team.color}15, transparent 70%)`,
                  opacity: isHovered ? 1 : 0,
                }} />
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredConstructors.length === 0 && (
          <div className="constructors-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3F3F46" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
              <path d="M8 8l6 6M14 8l-6 6" strokeLinecap="round" />
            </svg>
            <p className="constructors-empty-title">No teams match your search</p>
            <p className="constructors-empty-sub">Try adjusting your search terms</p>
          </div>
        )}

        {/* Results Count */}
        <div className="constructors-count">
          Showing {filteredConstructors.length} of {CONSTRUCTORS_DATA.length} constructors
        </div>
      </main>

      {/* ─── Scoped Styles ─── */}
      <style jsx>{`
        .constructors-page {
          min-height: 100vh;
          background-color: #0B0C10;
          color: #E4E4E7;
          font-family: var(--font-display);
        }

        /* ===== HERO ===== */
        .constructors-hero {
          background: linear-gradient(180deg, #15151E 0%, #0B0C10 100%);
          border-bottom: 1px solid #1F1F27;
          position: relative;
          overflow: hidden;
        }

        .constructors-hero-accent {
          height: 4px;
          width: 100%;
          background-color: #E10600;
        }

        .constructors-hero-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 48px 24px 32px;
          position: relative;
          z-index: 2;
        }

        .constructors-breadcrumb {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .constructors-live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #E10600;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; box-shadow: 0 0 8px #E10600; }
        }

        .constructors-breadcrumb-label {
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: #E10600;
        }

        .constructors-breadcrumb-sep {
          color: #3F3F46;
          font-size: 11px;
        }

        .constructors-breadcrumb-sub {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #71717A;
        }

        .constructors-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0;
          line-height: 1.1;
        }

        .constructors-dek {
          font-size: 15px;
          color: #A1A1AA;
          margin-top: 12px;
          max-width: 500px;
          line-height: 1.5;
        }

        .constructors-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #1F1F27;
        }

        .constructors-search {
          position: relative;
          flex: 1 1 280px;
          max-width: 400px;
        }

        .constructors-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #71717A;
          pointer-events: none;
        }

        .constructors-search-input {
          width: 100%;
          background-color: #1A1B23;
          border: 1px solid #27272A;
          border-radius: 8px;
          padding: 12px 16px 12px 44px;
          font-size: 14px;
          color: #E4E4E7;
          outline: none;
          transition: border-color 0.2s ease;
          font-family: var(--font-display);
        }

        .constructors-search-input:focus {
          border-color: #E10600;
        }

        .constructors-search-input::placeholder {
          color: #52525B;
        }

        .constructors-sort {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: auto;
        }

        .constructors-sort-label {
          font-size: 11px;
          font-weight: 700;
          color: #71717A;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .constructors-sort-select {
          background-color: #1A1B23;
          border: 1px solid #27272A;
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 700;
          color: #E4E4E7;
          cursor: pointer;
          outline: none;
          font-family: var(--font-display);
        }

        /* ===== MAIN ===== */
        .constructors-main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 32px 24px 64px;
        }

        /* ===== PODIUM ===== */
        .constructors-podium {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        @media (max-width: 900px) {
          .constructors-podium {
            grid-template-columns: 1fr;
          }
        }

        .constructors-podium-card {
          background: linear-gradient(180deg, #15151E 0%, #0F1016 100%);
          border: 1px solid #1F1F27;
          border-radius: 12px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .constructors-podium-card.first {
          border-color: #E10600;
          box-shadow: 0 0 40px rgba(225, 6, 0, 0.1);
        }

        .constructors-podium-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
        }

        .constructors-podium-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          box-shadow: 0 0 12px currentColor;
        }

        .constructors-podium-medal {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 14px;
          color: #ffffff;
        }

        .constructors-podium-car-wrap {
          height: 100px;
          margin-bottom: 16px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .constructors-podium-car {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
          transition: transform 0.4s ease;
        }

        .constructors-podium-card:hover .constructors-podium-car {
          transform: scale(1.05) translateY(-4px);
        }

        .constructors-podium-car-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }

        .constructors-podium-logo-wrap {
          height: 36px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
        }

        .constructors-podium-logo {
          height: 100%;
          width: auto;
          object-fit: contain;
          filter: brightness(1.2);
        }

        .constructors-podium-name {
          font-size: 20px;
          font-weight: 900;
          color: #ffffff;
          margin: 0 0 12px 0;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .constructors-podium-drivers {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .constructors-podium-driver {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
        }

        .constructors-podium-flag {
          width: 20px;
          height: 14px;
          object-fit: cover;
          border-radius: 2px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        }

        .constructors-podium-driver-name {
          color: #E4E4E7;
          font-weight: 600;
        }

        .constructors-podium-driver-num {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 900;
          margin-left: auto;
        }

        .constructors-podium-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          padding-top: 16px;
          border-top: 1px solid #1F1F27;
        }

        /* ===== GRID ===== */
        .constructors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }

        @media (max-width: 700px) {
          .constructors-grid {
            grid-template-columns: 1fr;
          }
        }

        .constructors-card {
          background: linear-gradient(180deg, #15151E 0%, #0F1016 100%);
          border: 1px solid #1F1F27;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .constructors-card:hover {
          transform: translateY(-3px);
          border-color: #27272A;
        }

        .constructors-card.top-three {
          border-color: #27272A;
        }

        .constructors-card-bar {
          height: 3px;
          width: 100%;
          box-shadow: 0 0 8px currentColor;
        }

        .constructors-card-inner {
          padding: 20px;
          position: relative;
          z-index: 2;
        }

        .constructors-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .constructors-card-position {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-weight: 900;
          font-size: 13px;
          flex-shrink: 0;
        }

        .constructors-card-logo-wrap {
          height: 28px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 12px;
        }

        .constructors-card-logo {
          height: 100%;
          width: auto;
          object-fit: contain;
          filter: brightness(1.2);
          transition: transform 0.3s ease;
        }

        .constructors-card:hover .constructors-card-logo {
          transform: scale(1.1);
        }

        .constructors-card-logo-fallback {
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 0.1em;
          display: none;
        }

        .constructors-card-logo-fallback.show {
          display: block;
        }

        .constructors-card-points {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          flex-shrink: 0;
        }

        .constructors-card-points-value {
          font-family: var(--font-mono);
          font-size: 20px;
          font-weight: 900;
          line-height: 1;
        }

        .constructors-card-points-label {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #3F3F46;
          text-transform: uppercase;
        }

        .constructors-card-name {
          font-size: 16px;
          font-weight: 900;
          color: #ffffff;
          margin: 0 0 12px 0;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .constructors-card-drivers {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }

        .constructors-card-driver {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
        }

        .constructors-card-flag {
          width: 18px;
          height: 12px;
          object-fit: cover;
          border-radius: 2px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        }

        .constructors-card-driver-name {
          color: #A1A1AA;
          font-weight: 600;
        }

        .constructors-card-driver-num {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 900;
          margin-left: auto;
        }

        .constructors-card-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
          padding-top: 12px;
          border-top: 1px solid #1F1F27;
        }

        .constructors-card-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        /* ===== EMPTY ===== */
        .constructors-empty {
          text-align: center;
          padding: 80px 24px;
          border: 2px dashed #1F1F27;
          border-radius: 16px;
          background-color: rgba(255,255,255,0.01);
        }

        .constructors-empty-title {
          font-size: 14px;
          font-weight: 700;
          color: #71717A;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 16px 0 0 0;
        }

        .constructors-empty-sub {
          font-size: 13px;
          color: #3F3F46;
          margin-top: 8px;
        }

        /* ===== COUNT ===== */
        .constructors-count {
          margin-top: 24px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          color: #3F3F46;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
      `}</style>
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
        fontFamily: 'var(--font-mono)',
        fontSize: '15px',
        fontWeight: 900,
        color: accent || '#E4E4E7',
      }}>
        {value}
      </span>
    </div>
  );
}

function PodiumStat({ title, value, highlight, accent }: { title: string; value: string; highlight?: boolean; accent?: string }) {
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
        fontFamily: 'var(--font-mono)',
        fontSize: highlight ? '22px' : '18px',
        fontWeight: 900,
        color: highlight ? '#E10600' : (accent || '#ffffff'),
      }}>
        {value}
      </span>
    </div>
  );
}