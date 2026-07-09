// components/TopStatsBar.tsx
'use client';

import { useMemo } from 'react';

interface DriverLeader {
  name: string;
  points: number;
  wins: number;
  team: string;
  teamColor: string;
}

interface ConstructorLeader {
  name: string;
  points: number;
  wins: number;
  teamColor: string;
}

interface TopStatsBarProps {
  driverLeader?: DriverLeader;
  constructorLeader?: ConstructorLeader;
  racesCompleted?: number;
  totalRaces?: number;
}

// Default 2026 data (after British GP, Round 9)
const DEFAULT_DRIVER: DriverLeader = {
  name: 'Kimi Antonelli',
  points: 179,
  wins: 5,
  team: 'Mercedes',
  teamColor: '#6CD3BF',
};

const DEFAULT_CONSTRUCTOR: ConstructorLeader = {
  name: 'Mercedes',
  points: 333,
  wins: 7,
  teamColor: '#6CD3BF',
};

export default function TopStatsBar({
  driverLeader = DEFAULT_DRIVER,
  constructorLeader = DEFAULT_CONSTRUCTOR,
  racesCompleted = 9,
  totalRaces = 22,
}: TopStatsBarProps) {
  const seasonProgress = useMemo(() => 
    Math.round((racesCompleted / totalRaces) * 100),
    [racesCompleted, totalRaces]
  );

  const stats = [
    {
      id: 'driver',
      label: 'Championship Leader',
      title: driverLeader.name,
      subtitle: `${driverLeader.points} pts · ${driverLeader.wins} wins`,
      accent: driverLeader.teamColor,
      icon: TrophyIcon,
      barColor: driverLeader.teamColor,
    },
    {
      id: 'constructor',
      label: 'Constructor Leader',
      title: constructorLeader.name,
      subtitle: `${constructorLeader.points} pts · ${constructorLeader.wins} wins`,
      accent: constructorLeader.teamColor,
      icon: ConstructorsIcon,
      barColor: constructorLeader.teamColor,
    },
    {
      id: 'progress',
      label: 'Races Completed',
      title: `${racesCompleted} / ${totalRaces}`,
      subtitle: `${seasonProgress}% of the season`,
      accent: '#E10600',
      icon: FlagIcon,
      barColor: '#E10600',
      showProgress: true,
      progressValue: seasonProgress,
    },
    {
      id: 'next',
      label: 'Next Race',
      title: 'Belgian GP',
      subtitle: 'Spa-Francorchamps · 19 July',
      accent: '#F59E0B',
      icon: ClockIcon,
      barColor: '#F59E0B',
      countdown: true,
    },
  ];

  return (
    <section style={{
      width: '100%',
      padding: '0 clamp(20px, 4vw, 48px)',
      boxSizing: 'border-box',
      marginBottom: '32px',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        maxWidth: '1360px',
        margin: '0 auto',
      }}>
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  );
}

// ─── Stat Card ───

function StatCard({ stat }: { stat: any }) {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #15151E 0%, #0F1016 100%)',
      border: '1px solid #1F1F27',
      borderRadius: '10px',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.25s ease',
      cursor: 'default',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = `${stat.accent}40`;
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${stat.accent}10`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = '#1F1F27';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: stat.barColor,
        boxShadow: `0 0 12px ${stat.accent}40`,
      }} />

      {/* Corner glow */}
      <div style={{
        position: 'absolute',
        top: '-30px',
        right: '-30px',
        width: '80px',
        height: '80px',
        background: `radial-gradient(circle, ${stat.accent}08 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Label */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '14px',
      }}>
        <span style={{
          color: stat.accent,
          display: 'flex',
          alignItems: 'center',
        }}>
          <stat.icon />
        </span>
        <span style={{
          fontSize: '10px',
          fontWeight: 800,
          fontFamily: '"JetBrains Mono", monospace',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: stat.accent,
        }}>
          {stat.label}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '18px',
        fontWeight: 900,
        fontFamily: '"Formula1 Display-Regular", "Titillium Web", sans-serif',
        color: '#FFFFFF',
        margin: '0 0 6px 0',
        textTransform: 'uppercase',
        letterSpacing: '-0.01em',
        lineHeight: 1.2,
      }}>
        {stat.title}
      </h3>

      {/* Subtitle */}
      <p style={{
        fontSize: '12px',
        color: '#71717A',
        margin: 0,
        fontFamily: '"JetBrains Mono", monospace',
        fontWeight: 500,
      }}>
        {stat.subtitle}
      </p>

      {/* Progress bar for season */}
      {stat.showProgress && (
        <div style={{
          marginTop: '14px',
          height: '4px',
          backgroundColor: '#1F1F27',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${stat.progressValue}%`,
            background: `linear-gradient(90deg, ${stat.accent} 0%, ${stat.accent}cc 100%)`,
            borderRadius: '2px',
            transition: 'width 1s ease',
            boxShadow: `0 0 8px ${stat.accent}40`,
          }} />
        </div>
      )}

      {/* Countdown for next race */}
      {stat.countdown && (
        <div style={{
          marginTop: '14px',
          display: 'flex',
          gap: '12px',
        }}>
          <CountdownUnit value={11} label="DAYS" accent={stat.accent} />
          <CountdownUnit value={19} label="HRS" accent={stat.accent} />
          <CountdownUnit value={42} label="MIN" accent={stat.accent} />
        </div>
      )}
    </div>
  );
}

// ─── Countdown Unit ───

function CountdownUnit({ value, label, accent }: { value: number; label: string; accent: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        background: '#0B0C10',
        border: '1px solid #1F1F27',
        borderRadius: '6px',
        padding: '8px 12px',
        minWidth: '44px',
        marginBottom: '4px',
      }}>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '20px',
          fontWeight: 900,
          color: '#FFFFFF',
          display: 'block',
          lineHeight: 1,
        }}>
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span style={{
        fontSize: '9px',
        fontWeight: 800,
        fontFamily: '"JetBrains Mono", monospace',
        letterSpacing: '0.1em',
        color: accent,
        textTransform: 'uppercase',
      }}>
        {label}
      </span>
    </div>
  );
}

// ─── Icons ───

function TrophyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function ConstructorsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 17h11" />
      <path d="M6 20v-2a6 6 0 1 1 12 0v2" />
      <path d="m9 9 6 6" />
      <path d="m15 9-6 6" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}