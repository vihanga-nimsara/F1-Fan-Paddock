'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// ─── Types ───
interface DriverStanding {
  position: string;
  points: string;
  wins: string;
  Driver: { driverId: string; givenName: string; familyName: string; code: string; nationality: string };
  Constructors: { constructorId: string; name: string }[];
}

interface ConstructorStanding {
  position: string;
  points: string;
  wins: string;
  Constructor: { constructorId: string; name: string; nationality: string };
}

interface RaceResult {
  season: string;
  round: string;
  raceName: string;
  Results: {
    position: string;
    points: string;
    grid: string;
    laps: string;
    status: string;
    Driver: { driverId: string; givenName: string; familyName: string; code: string };
    Constructor: { constructorId: string; name: string };
    Time?: { millis: string; time: string };
    FastestLap?: { rank: string; lap: string; Time: { time: string } };
  }[];
}

interface StatTab {
  id: string;
  label: string;
}

interface TickerSession {
  label: string;
  day: string;
  time: string;
  status: 'live' | 'next' | 'done' | 'upcoming';
}

// ─── Team Colors (CSS vars) ───
const teamColors: Record<string, string> = {
  mercedes: "var(--t-mercedes)",
  ferrari: "var(--t-ferrari)",
  mclaren: "var(--t-mclaren)",
  red_bull: "var(--t-redbull)",
  alpine: "var(--t-alpine)",
  rb: "var(--t-racingbulls)",
  haas: "var(--t-haas)",
  williams: "var(--t-williams)",
  aston_martin: "var(--t-astonmartin)",
  audi: "var(--t-audi)",
  cadillac: "var(--t-cadillac)",
};

const teamShortNames: Record<string, string> = {
  mercedes: "Mercedes", ferrari: "Ferrari", mclaren: "McLaren",
  red_bull: "Red Bull", alpine: "Alpine", rb: "Racing Bulls",
  haas: "Haas", williams: "Williams", aston_martin: "Aston Martin",
  audi: "Audi", cadillac: "Cadillac",
};

// ─── API Fetch ───
async function fetchStats() {
  const [ds, cs, rs] = await Promise.all([
    fetch("https://api.jolpi.ca/ergast/f1/2026/driverStandings.json").then((r) => r.json()),
    fetch("https://api.jolpi.ca/ergast/f1/2026/constructorStandings.json").then((r) => r.json()),
    fetch("https://api.jolpi.ca/ergast/f1/2026/results.json?limit=400").then((r) => r.json()),
  ]);
  return {
    drivers: ds.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [],
    constructors: cs.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [],
    races: rs.MRData.RaceTable.Races || [],
  };
}

// ═══════════════════════════════════════════════════════════════
// ═══ COUNTDOWN / TICKER COMPONENTS ════════════════════════════
// ═══════════════════════════════════════════════════════════════

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function useCountdown(targetDate: Date): CountdownTime {
  const calculateTimeLeft = useCallback((): CountdownTime => {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;
    if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft);
  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, [calculateTimeLeft]);
  return timeLeft;
}

// ─── Wheel / Slot Machine Digit ─────────────────────────────────
function WheelDigit({ value, label }: { value: number; label: string }) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setIsRolling(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsRolling(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [value, displayValue]);

  const currentStr = String(value).padStart(2, '0');
  const prevStr = String(displayValue).padStart(2, '0');

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '6px',
      flexShrink: 0,
    }}>
      <div
        style={{
          width: '46px',
          height: '50px',
          background: 'linear-gradient(180deg, #13131c 0%, #0c0c12 100%)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.02)',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '15%',
            right: '15%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
            zIndex: 3,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 10%, rgba(0,0,0,0.5) 50%, transparent 90%)',
            zIndex: 2,
          }}
        />
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
          <span
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 900,
              color: '#FFFFFF',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.02em',
              fontFamily: "var(--font-display)",
              textShadow: '0 0 12px rgba(255,255,255,0.12)',
              transform: isRolling ? 'translateY(-100%)' : 'translateY(0)',
              opacity: isRolling ? 0 : 1,
              transition: 'transform 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53), opacity 0.15s ease',
              zIndex: 1,
            }}
          >
            {currentStr}
          </span>
          <span
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 900,
              color: '#FFFFFF',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.02em',
              fontFamily: "var(--font-display)",
              textShadow: '0 0 12px rgba(255,255,255,0.12)',
              transform: isRolling ? 'translateY(0)' : 'translateY(100%)',
              opacity: isRolling ? 1 : 0,
              transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.15s ease',
              zIndex: 2,
            }}
          >
            {prevStr}
          </span>
        </div>
      </div>
      <span
        style={{
          fontSize: '0.5625rem',
          fontWeight: 700,
          color: '#4a4a55',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          fontFamily: "var(--font-mono)",
          flexShrink: 0,
          lineHeight: 1,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function CountdownSeparator() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        paddingTop: '10px',
        alignSelf: 'flex-start',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          backgroundColor: 'var(--f1-red)',
          boxShadow: '0 0 6px rgba(225, 6, 0, 0.5)',
          animation: 'sepBlink 1.2s ease-in-out infinite',
          flexShrink: 0,
        }}
      />
      <span
        style={{
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          backgroundColor: 'var(--f1-red)',
          boxShadow: '0 0 6px rgba(225, 6, 0, 0.5)',
          animation: 'sepBlink 1.2s ease-in-out infinite 0.6s',
          flexShrink: 0,
        }}
      />
    </div>
  );
}

// ─── Glow Card Base ─────────────────────────────────────────────
const CARD_HEIGHT = 90;

function GlowCard({
  children,
  accentColor = 'var(--f1-red)',
  glowIntensity = 'low',
  style = {},
}: {
  children: React.ReactNode;
  accentColor?: string;
  glowIntensity?: 'low' | 'medium' | 'high';
  style?: React.CSSProperties;
}) {
  const glowMap = {
    low: '0 0 20px rgba(0,0,0,0.3)',
    medium: '0 0 30px rgba(0,0,0,0.4)',
    high: '0 0 40px rgba(225, 6, 0, 0.1), 0 0 80px rgba(225, 6, 0, 0.04)',
  };

  return (
    <div
      style={{
        position: 'relative',
        height: `${CARD_HEIGHT}px`,
        background: 'linear-gradient(180deg, #171720 0%, #12121a 100%)',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        boxShadow: glowMap[glowIntensity],
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '12%',
          right: '12%',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${accentColor}50, ${accentColor}, ${accentColor}50, transparent)`,
          boxShadow: `0 0 8px ${accentColor}30, 0 0 16px ${accentColor}15`,
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: `linear-gradient(180deg, ${accentColor}05 0%, transparent 100%)`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}

// ─── Next Race Countdown ─────────────────────────────────────────
function NextRaceCountdown({ targetDate, raceName }: { targetDate: Date; raceName: string }) {
  const timeLeft = useCountdown(targetDate);
  const hasExpired =
    timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (hasExpired) return null;

  return (
    <GlowCard accentColor="var(--f1-red)" glowIntensity="high" style={{ minWidth: '310px', maxWidth: '310px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '0 16px',
          height: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '20%',
            bottom: '20%',
            width: '3px',
            backgroundColor: 'var(--f1-red)',
            borderRadius: '0 3px 3px 0',
            boxShadow: '0 0 12px rgba(225, 6, 0, 0.5), 0 0 24px rgba(225, 6, 0, 0.15)',
            animation: 'accentPulse 2s ease-in-out infinite',
          }}
        />

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '4px', 
          minWidth: '78px', 
          flexShrink: 0,
        }}>
          <span
            style={{
              fontSize: '0.5625rem',
              fontWeight: 900,
              color: 'var(--f1-red)',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontFamily: "var(--font-mono)",
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: 'var(--f1-red)',
                boxShadow: '0 0 6px rgba(225, 6, 0, 0.7)',
                animation: 'livePulse 1.5s ease-in-out infinite',
                flexShrink: 0,
              }}
            />
            NEXT RACE
          </span>
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 900,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
              fontFamily: "var(--font-display)",
              whiteSpace: 'nowrap',
            }}
          >
            {raceName}
          </span>
          <span
            style={{
              fontSize: '0.5625rem',
              fontWeight: 700,
              color: 'var(--muted-dim)',
              letterSpacing: '0.06em',
              fontFamily: "var(--font-mono)",
              whiteSpace: 'nowrap',
            }}
          >
            {targetDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        <div
          style={{
            width: '1px',
            height: '52px',
            background: 'linear-gradient(180deg, transparent, #2a2a35, transparent)',
            flexShrink: 0,
          }}
        />

        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: '6px', 
          flexShrink: 0,
          paddingTop: '2px',
        }}>
          <WheelDigit value={timeLeft.days} label="DAYS" />
          <CountdownSeparator />
          <WheelDigit value={timeLeft.hours} label="HRS" />
          <CountdownSeparator />
          <WheelDigit value={timeLeft.minutes} label="MIN" />
          <CountdownSeparator />
          <WheelDigit value={timeLeft.seconds} label="SEC" />
        </div>
      </div>
    </GlowCard>
  );
}

// ─── Session Card ───────────────────────────────────────────────
function SessionCard({
  session,
  index,
  getStatusBg,
  getStatusColor,
  getStatusLabel,
}: {
  session: TickerSession;
  index: number;
  getStatusBg: (status: string) => string;
  getStatusColor: (status: string) => string;
  getStatusLabel: (status: string) => string;
}) {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const statusColor = getStatusColor(session.status);
  const isLive = session.status === 'live';
  const isNext = session.status === 'next';

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), index * 80 + 200);
    return () => clearTimeout(timer);
  }, [index]);

  const accentColor = isLive ? 'var(--f1-red)' : isNext ? '#F59E0B' : '#52525B';

  return (
    <div
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.96)',
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        flexShrink: 0,
      }}
    >
      <GlowCard accentColor={accentColor} glowIntensity={isLive ? 'high' : isNext ? 'medium' : 'low'} style={{ minWidth: '128px', maxWidth: '128px' }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 14px',
            height: '100%',
            backgroundColor: hovered && !isLive ? 'rgba(255, 255, 255, 0.015)' : getStatusBg(session.status),
            position: 'relative',
            transition: 'background-color 0.25s ease',
            cursor: 'default',
            borderRadius: '10px',
          }}
        >
          {isLive && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: '18%',
                bottom: '18%',
                width: '3px',
                backgroundColor: 'var(--f1-red)',
                borderRadius: '0 3px 3px 0',
                boxShadow: '0 0 12px rgba(225, 6, 0, 0.6), 0 0 24px rgba(225, 6, 0, 0.2)',
                animation: 'liveBarPulse 2s ease-in-out infinite',
              }}
            />
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: statusColor,
                boxShadow: isLive
                  ? `0 0 8px ${statusColor}, 0 0 16px ${statusColor}40`
                  : isNext
                  ? `0 0 5px ${statusColor}50`
                  : 'none',
                animation: isLive ? 'statusPulse 1.5s ease-in-out infinite' : 'none',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                color: statusColor,
                fontSize: '0.5625rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontFamily: "var(--font-mono)",
                textShadow: isLive ? `0 0 6px ${statusColor}40` : 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {getStatusLabel(session.status)}
            </span>
          </div>

          <div
            style={{
              color: isLive ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: '0.8125rem',
              letterSpacing: '-0.01em',
              marginBottom: '5px',
              lineHeight: 1.2,
              fontFamily: "var(--font-display)",
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {session.label}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                color: isLive ? 'var(--f1-red)' : isNext ? '#F59E0B' : 'var(--muted)',
                fontSize: '0.6875rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                fontVariantNumeric: 'tabular-nums',
                fontFamily: "var(--font-mono)",
                textShadow: isLive ? '0 0 8px rgba(225, 6, 0, 0.3)' : 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {session.time}
            </span>
            <span
              style={{
                color: 'var(--muted-dim)',
                fontSize: '0.5625rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                fontFamily: "var(--font-mono)",
                whiteSpace: 'nowrap',
              }}
            >
              {session.day}
            </span>
            {isLive && (
              <span
                style={{
                  fontSize: '0.5rem',
                  fontWeight: 900,
                  color: 'var(--f1-red)',
                  backgroundColor: 'rgba(225, 6, 0, 0.1)',
                  padding: '1px 5px',
                  borderRadius: '3px',
                  letterSpacing: '0.1em',
                  border: '1px solid rgba(225, 6, 0, 0.15)',
                  animation: 'onAirPulse 2s ease-in-out infinite',
                  fontFamily: "var(--font-mono)",
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                ON AIR
              </span>
            )}
          </div>
        </div>
      </GlowCard>
    </div>
  );
}

// ─── Timeline Label ─────────────────────────────────────────────
function TimelineLabel({ raceName }: { raceName: string }) {
  return (
    <GlowCard accentColor="var(--f1-red)" glowIntensity="medium" style={{ minWidth: '200px', maxWidth: '200px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '0 16px',
          height: '100%',
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: 'var(--f1-red)',
            boxShadow: '0 0 10px rgba(225, 6, 0, 0.5), 0 0 20px rgba(225, 6, 0, 0.2)',
            animation: 'tickerPulse 2s ease-in-out infinite',
            flexShrink: 0,
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
          <span
            style={{
              fontSize: '0.5625rem',
              fontWeight: 900,
              color: '#4a4a55',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              fontFamily: "var(--font-mono)",
              whiteSpace: 'nowrap',
            }}
          >
            WEEKEND TIMELINE
          </span>
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 900,
              color: 'var(--text-primary)',
              letterSpacing: '0.02em',
              fontFamily: "var(--font-display)",
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ color: 'var(--f1-red)', textShadow: '0 0 10px rgba(225, 6, 0, 0.2)' }}>
              {raceName.replace(' Grand Prix', '').toUpperCase()}
            </span>
          </span>
        </div>

        <span
          style={{
            color: 'var(--muted-dim)',
            fontSize: '0.5625rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            fontFamily: "var(--font-mono)",
            marginLeft: 'auto',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          (LOCAL)
        </span>
      </div>
    </GlowCard>
  );
}

// ─── Session Ticker (Main Export) ─────────────────────────────────
function SessionTicker({ raceName, sessions }: { raceName: string; sessions: TickerSession[] }) {
  if (!sessions.length) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'var(--f1-red)';
      case 'next': return '#F59E0B';
      case 'done': return '#3F3F46';
      default: return '#52525B';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'live': return 'rgba(225, 6, 0, 0.05)';
      case 'next': return 'rgba(245, 158, 11, 0.03)';
      case 'done': return 'transparent';
      default: return 'transparent';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'live': return 'LIVE NOW';
      case 'next': return 'UP NEXT';
      case 'done': return 'FINISHED';
      default: return status.toUpperCase();
    }
  };

  // Belgian GP 2026: Race starts Sunday July 19 at 15:00 CEST
  const nextRaceDate = new Date('2026-07-19T15:00:00+02:00');

  return (
    <section
      style={{
        backgroundColor: 'var(--tarmac)',
        borderBottom: '1px solid var(--line)',
        fontFamily: "var(--font-mono)",
        fontSize: '0.75rem',
        width: '100%',
        position: 'relative',
        padding: '12px 16px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '100%',
          background: 'radial-gradient(ellipse at center, rgba(225, 6, 0, 0.02) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, var(--f1-red) 0%, var(--f1-red) 18%, transparent 50%)',
          boxShadow: '0 0 16px rgba(225, 6, 0, 0.2)',
          zIndex: 10,
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          position: 'relative',
          zIndex: 1,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingRight: '50px',
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `div::-webkit-scrollbar { display: none; }` }} />

        <TimelineLabel raceName={raceName} />
        <NextRaceCountdown targetDate={nextRaceDate} raceName="Belgian GP" />

        {sessions.map((s, index) => (
          <SessionCard
            key={s.label}
            session={s}
            index={index}
            getStatusBg={getStatusBg}
            getStatusColor={getStatusColor}
            getStatusLabel={getStatusLabel}
          />
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '50px',
          background: 'linear-gradient(90deg, transparent, var(--tarmac))',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      <style>{`
        @keyframes tickerPulse {
          0%, 100% { opacity: 0.5; box-shadow: 0 0 6px rgba(225, 6, 0, 0.3), 0 0 12px rgba(225, 6, 0, 0.1); transform: scale(1); }
          50% { opacity: 1; box-shadow: 0 0 14px rgba(225, 6, 0, 0.6), 0 0 28px rgba(225, 6, 0, 0.2); transform: scale(1.15); }
        }
        @keyframes livePulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes liveBarPulse {
          0%, 100% { box-shadow: 0 0 6px rgba(225, 6, 0, 0.4), 0 0 12px rgba(225, 6, 0, 0.15); }
          50% { box-shadow: 0 0 16px rgba(225, 6, 0, 0.7), 0 0 32px rgba(225, 6, 0, 0.25); }
        }
        @keyframes statusPulse {
          0%, 100% { box-shadow: 0 0 5px currentColor, 0 0 10px currentColor30; }
          50% { box-shadow: 0 0 12px currentColor, 0 0 24px currentColor50; }
        }
        @keyframes onAirPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes sepBlink {
          0%, 100% { opacity: 0.15; transform: scale(0.6); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes accentPulse {
          0%, 100% { box-shadow: 0 0 6px rgba(225, 6, 0, 0.3), 0 0 12px rgba(225, 6, 0, 0.1); }
          50% { box-shadow: 0 0 16px rgba(225, 6, 0, 0.6), 0 0 32px rgba(225, 6, 0, 0.2); }
        }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// ═══ EXISTING STATISTICS COMPONENTS ═════════════════════════════
// ═══════════════════════════════════════════════════════════════

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
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
          fontSize: "clamp(20px,3vw,28px)",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          color: "var(--text-primary)",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ width: 4, height: 24, background: "var(--f1-red)", borderRadius: 2 }} />
        {children}
      </h2>
    </div>
  );
}

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: 8,
        padding: "20px 22px",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = color || "var(--f1-red)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--muted-dim)",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          fontWeight: 800,
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: 32,
          color: color || "var(--text-primary)",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 6, fontWeight: 500 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function BarChart({ data, maxValue, color }: { data: { label: string; value: number; color: string }[]; maxValue: number; color?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {data.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 120, fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", textAlign: "right", flexShrink: 0 }}>
            {item.label}
          </div>
          <div style={{ flex: 1, height: 28, background: "var(--tarmac)", borderRadius: 4, overflow: "hidden", position: "relative" }}>
            <div
              style={{
                height: "100%",
                width: `${(item.value / maxValue) * 100}%`,
                background: item.color,
                borderRadius: 4,
                transition: "width 0.6s ease",
                minWidth: item.value > 0 ? 4 : 0,
              }}
            />
          </div>
          <div style={{ width: 50, fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "var(--text-primary)", textAlign: "right" }}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function PodiumTable({ data }: { data: { pos: number; name: string; team: string; teamId: string; value: number; label: string }[] }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--line)" }}>
            {["Pos", "Driver", "Team", "Value"].map((h) => (
              <th
                key={h}
                style={{
                  padding: "12px 16px",
                  fontSize: 10,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "var(--muted-dim)",
                  textAlign: h === "Value" ? "right" : "left",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              style={{
                borderBottom: "1px solid var(--line-subtle)",
                transition: "background 0.15s ease",
                background: row.pos === 1 ? "linear-gradient(90deg, rgba(225,6,0,0.08), transparent 65%)" : i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (row.pos !== 1) e.currentTarget.style.background = "rgba(225,6,0,0.04)";
              }}
              onMouseLeave={(e) => {
                if (row.pos !== 1) e.currentTarget.style.background = i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent";
              }}
            >
              <td style={{ padding: "10px 16px" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 28,
                    height: 28,
                    borderRadius: 4,
                    fontFamily: "var(--font-mono)",
                    fontWeight: 900,
                    fontSize: 13,
                    background: row.pos === 1 ? "var(--f1-red)" : row.pos === 2 ? "#3A3B40" : row.pos === 3 ? "#CD7F32" : "transparent",
                    color: row.pos <= 3 ? "var(--text-primary)" : "var(--muted)",
                  }}
                >
                  {row.pos}
                </span>
              </td>
              <td style={{ padding: "10px 16px", fontWeight: 700, fontSize: 14, color: "var(--text-secondary)" }}>
                {row.name}
              </td>
              <td style={{ padding: "10px 16px" }}>
                <span style={{ fontSize: 12, color: teamColors[row.teamId] || "var(--muted)", fontWeight: 600 }}>
                  {teamShortNames[row.teamId] || row.team}
                </span>
              </td>
              <td style={{ padding: "10px 16px", fontFamily: "var(--font-mono)", fontWeight: 900, fontSize: 15, textAlign: "right", color: "var(--text-primary)" }}>
                {row.value}
                <span style={{ fontSize: 10, color: "var(--muted)", marginLeft: 4 }}>{row.label}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ConstructorBars({ data }: { data: ConstructorStanding[] }) {
  const maxPts = Math.max(...data.map((c) => parseInt(c.points)), 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {data.map((c, i) => {
        const pts = parseInt(c.points);
        const color = teamColors[c.Constructor.constructorId] || "var(--f1-red)";
        return (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 900,
                    fontSize: 14,
                    color: i === 0 ? "var(--f1-red)" : "var(--muted)",
                    width: 24,
                  }}
                >
                  {c.position}
                </span>
                <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text-secondary)" }}>
                  {teamShortNames[c.Constructor.constructorId] || c.Constructor.name}
                </span>
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 900, fontSize: 14, color: "var(--text-primary)" }}>
                {pts}
                <span style={{ fontSize: 10, color: "var(--muted)", marginLeft: 4 }}>PTS</span>
              </span>
            </div>
            <div style={{ height: 8, background: "var(--tarmac)", borderRadius: 4, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${(pts / maxPts) * 100}%`,
                  background: color,
                  borderRadius: 4,
                  transition: "width 0.6s ease",
                  boxShadow: i === 0 ? `0 0 12px ${color}` : "none",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ═══ MAIN PAGE ════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════

export default function StatisticsPage() {
  const [drivers, setDrivers] = useState<DriverStanding[]>([]);
  const [constructors, setConstructors] = useState<ConstructorStanding[]>([]);
  const [races, setRaces] = useState<RaceResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchStats()
      .then((data) => {
        setDrivers(data.drivers);
        setConstructors(data.constructors);
        setRaces(data.races);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // ─── Belgian GP Session Data ───
  const belgianSessions: TickerSession[] = [
    { label: 'FP1', day: 'Fri 17', time: '13:30', status: 'done' },
    { label: 'FP2', day: 'Fri 17', time: '17:00', status: 'done' },
    { label: 'FP3', day: 'Sat 18', time: '12:30', status: 'next' },
    { label: 'Qualifying', day: 'Sat 18', time: '16:00', status: 'upcoming' },
    { label: 'Race', day: 'Sun 19', time: '15:00', status: 'upcoming' },
  ];

  // ─── Computed Stats ───
  const stats = useMemo(() => {
    if (!drivers.length || !races.length) return null;

    const totalRaces = races.length;
    const totalDrivers = drivers.length;
    const totalConstructors = constructors.length;

    const winsByDriver: Record<string, { name: string; teamId: string; wins: number }> = {};
    const podiumsByDriver: Record<string, { name: string; teamId: string; podiums: number }> = {};
    const pointsByDriver: Record<string, { name: string; teamId: string; points: number }> = {};
    const polesByDriver: Record<string, { name: string; teamId: string; poles: number }> = {};
    const fastestLaps: Record<string, { name: string; teamId: string; count: number }> = {};
    const dnfs: Record<string, { name: string; teamId: string; count: number }> = {};
    const gridPositions: Record<string, { name: string; teamId: string; total: number; count: number }> = {};

    const teamPoints: Record<string, number> = {};
    const teamWins: Record<string, number> = {};

    races.forEach((race) => {
      race.Results.forEach((res) => {
        const did = res.Driver.driverId;
        const tid = res.Constructor.constructorId;
        const name = `${res.Driver.givenName} ${res.Driver.familyName}`;
        const pos = parseInt(res.position);
        const grid = parseInt(res.grid) || 0;

        if (!winsByDriver[did]) winsByDriver[did] = { name, teamId: tid, wins: 0 };
        if (!podiumsByDriver[did]) podiumsByDriver[did] = { name, teamId: tid, podiums: 0 };
        if (!pointsByDriver[did]) pointsByDriver[did] = { name, teamId: tid, points: 0 };
        if (!polesByDriver[did]) polesByDriver[did] = { name, teamId: tid, poles: 0 };
        if (!fastestLaps[did]) fastestLaps[did] = { name, teamId: tid, count: 0 };
        if (!dnfs[did]) dnfs[did] = { name, teamId: tid, count: 0 };
        if (!gridPositions[did]) gridPositions[did] = { name, teamId: tid, total: 0, count: 0 };

        if (pos === 1) winsByDriver[did].wins++;
        if (pos <= 3) podiumsByDriver[did].podiums++;
        pointsByDriver[did].points += parseInt(res.points) || 0;
        if (grid === 1) polesByDriver[did].poles++;
        if (res.FastestLap?.rank === "1") fastestLaps[did].count++;
        if (res.status !== "Finished" && !res.status.startsWith("+") && !res.status.startsWith("Lapped")) {
          dnfs[did].count++;
        }
        if (grid > 0) {
          gridPositions[did].total += grid;
          gridPositions[did].count++;
        }

        if (!teamPoints[tid]) teamPoints[tid] = 0;
        if (!teamWins[tid]) teamWins[tid] = 0;
        teamPoints[tid] += parseInt(res.points) || 0;
        if (pos === 1) teamWins[tid]++;
      });
    });

    const avgGrid = Object.entries(gridPositions)
      .filter(([_, v]) => v.count > 0)
      .map(([_, v]) => ({ ...v, avg: +(v.total / v.count).toFixed(1) }))
      .sort((a, b) => a.avg - b.avg);

    return {
      totalRaces,
      totalDrivers,
      totalConstructors,
      winsByDriver: Object.values(winsByDriver).sort((a, b) => b.wins - a.wins),
      podiumsByDriver: Object.values(podiumsByDriver).sort((a, b) => b.podiums - a.podiums),
      fastestLaps: Object.values(fastestLaps).sort((a, b) => b.count - a.count),
      dnfs: Object.values(dnfs).sort((a, b) => b.count - a.count),
      avgGrid,
      teamPoints,
      teamWins,
    };
  }, [races, drivers, constructors]);

  const tabs: StatTab[] = [
    { id: "overview", label: "Overview" },
    { id: "drivers", label: "Driver Stats" },
    { id: "constructors", label: "Constructor Stats" },
    { id: "races", label: "Race Analysis" },
  ];

  if (loading) {
    return (
      <main>
        <div className="page-header" style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "var(--f1-red)" }} />
          <div className="wrap" style={{ maxWidth: 1360, margin: "0 auto" }}>
            <div className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ width: 24, height: 2, background: "var(--f1-red)" }} />
              2026 Championship
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(32px,5vw,56px)", textTransform: "uppercase", letterSpacing: "-0.3px", lineHeight: 1, marginBottom: 12, color: "var(--text-primary)" }}>
              Statistics
            </h1>
            <p style={{ color: "var(--muted)", fontSize: 15 }}>Loading season data...</p>
          </div>
        </div>
        <div style={{ padding: "40px clamp(20px,4vw,48px)", maxWidth: 1360, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ height: 120, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, animation: "pulse 1.5s ease-in-out infinite" }} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="page-header" style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "var(--f1-red)" }} />
          <div className="wrap" style={{ maxWidth: 1360, margin: "0 auto" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(32px,5vw,56px)", textTransform: "uppercase", color: "var(--text-primary)" }}>
              Statistics
            </h1>
          </div>
        </div>
        <div style={{ padding: 40, textAlign: "center", color: "var(--f1-red)", background: "var(--f1-red-dim)", border: "1px solid var(--f1-red-glow)", borderRadius: 8, margin: "40px auto", maxWidth: 600 }}>
          Error: {error}
        </div>
      </main>
    );
  }

  const driverPtsData = drivers.slice(0, 10).map((d) => ({
    label: `${d.Driver.givenName[0]}. ${d.Driver.familyName}`,
    value: parseInt(d.points),
    color: teamColors[d.Constructors[0]?.constructorId] || "var(--f1-red)",
  }));
  const maxDriverPts = Math.max(...driverPtsData.map((d) => d.value), 1);

  return (
    <main>
      {/* ═══ SESSION TICKER — Added at top ═══ */}
      <SessionTicker raceName="Belgian Grand Prix" sessions={belgianSessions} />

      {/* Header */}
      <div className="page-header" style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "var(--f1-red)" }} />
        <div className="wrap" style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ width: 24, height: 2, background: "var(--f1-red)" }} />
            2026 Championship &bull; Round {stats?.totalRaces || 9} of 22
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(32px,5vw,56px)", textTransform: "uppercase", letterSpacing: "-0.3px", lineHeight: 1, marginBottom: 12, color: "var(--text-primary)" }}>
            Statistics
          </h1>
          <p style={{ color: "var(--muted)", maxWidth: 620, fontSize: 15, lineHeight: 1.6 }}>
            Deep-dive into the 2026 season numbers. Driver performance, constructor battles, race analytics, and historical comparisons.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding: "20px clamp(20px,4vw,48px)", borderBottom: "1px solid var(--line)", background: "var(--surface)" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "10px 20px",
                borderRadius: 6,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "1px",
                textTransform: "uppercase",
                border: activeTab === tab.id ? "1px solid var(--f1-red)" : "1px solid var(--line)",
                background: activeTab === tab.id ? "var(--f1-red-dim)" : "var(--tarmac)",
                color: activeTab === tab.id ? "var(--f1-red)" : "var(--muted)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "32px clamp(20px,4vw,48px) clamp(64px,8vw,96px)" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>

          {/* ─── OVERVIEW TAB ─── */}
          {activeTab === "overview" && stats && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
                <StatCard label="Races Completed" value={stats.totalRaces} sub="of 22 scheduled" color="var(--f1-red)" />
                <StatCard label="Total Drivers" value={stats.totalDrivers} sub="competing in 2026" />
                <StatCard label="Constructors" value={stats.totalConstructors} sub="teams on the grid" />
                <StatCard label="Championship Leader" value={`${drivers[0]?.Driver.givenName[0]}. ${drivers[0]?.Driver.familyName}`} sub={`${drivers[0]?.points} PTS`} color={teamColors[drivers[0]?.Constructors[0]?.constructorId]} />
              </div>

              <div>
                <SectionTitle>Points Distribution — Top 10 Drivers</SectionTitle>
                <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "24px 28px" }}>
                  <BarChart data={driverPtsData} maxValue={maxDriverPts} />
                </div>
              </div>

              <div>
                <SectionTitle>Constructor Points</SectionTitle>
                <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "24px 28px" }}>
                  <ConstructorBars data={constructors} />
                </div>
              </div>

              <div>
                <SectionTitle>Wins Leaderboard</SectionTitle>
                <PodiumTable
                  data={stats.winsByDriver
                    .filter((d) => d.wins > 0)
                    .map((d, i) => ({
                      pos: i + 1,
                      name: d.name,
                      team: teamShortNames[d.teamId] || d.teamId,
                      teamId: d.teamId,
                      value: d.wins,
                      label: d.wins === 1 ? "WIN" : "WINS",
                    }))}
                />
              </div>
            </div>
          )}

          {/* ─── DRIVER STATS TAB ─── */}
          {activeTab === "drivers" && stats && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 24 }}>
                <div>
                  <SectionTitle>Podiums</SectionTitle>
                  <PodiumTable
                    data={stats.podiumsByDriver
                      .filter((d) => d.podiums > 0)
                      .slice(0, 10)
                      .map((d, i) => ({
                        pos: i + 1,
                        name: d.name,
                        team: teamShortNames[d.teamId] || d.teamId,
                        teamId: d.teamId,
                        value: d.podiums,
                        label: "POD",
                      }))}
                  />
                </div>

                <div>
                  <SectionTitle>Fastest Laps</SectionTitle>
                  <PodiumTable
                    data={stats.fastestLaps
                      .filter((d) => d.count > 0)
                      .slice(0, 10)
                      .map((d, i) => ({
                        pos: i + 1,
                        name: d.name,
                        team: teamShortNames[d.teamId] || d.teamId,
                        teamId: d.teamId,
                        value: d.count,
                        label: d.count === 1 ? "FL" : "FLs",
                      }))}
                  />
                </div>
              </div>

              <div>
                <SectionTitle>Retirements & DNFs</SectionTitle>
                <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "24px 28px" }}>
                  <BarChart
                    data={stats.dnfs
                      .filter((d) => d.count > 0)
                      .slice(0, 10)
                      .map((d) => ({
                        label: d.name.split(" ").pop() || d.name,
                        value: d.count,
                        color: teamColors[d.teamId] || "var(--muted-dim)",
                      }))}
                    maxValue={Math.max(...stats.dnfs.filter((d) => d.count > 0).map((d) => d.count), 1)}
                  />
                </div>
              </div>

              <div>
                <SectionTitle>Average Grid Position (Lower is Better)</SectionTitle>
                <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "24px 28px" }}>
                  <BarChart
                    data={stats.avgGrid.slice(0, 10).map((d) => ({
                      label: d.name.split(" ").pop() || d.name,
                      value: d.avg,
                      color: teamColors[d.teamId] || "var(--muted-dim)",
                    }))}
                    maxValue={Math.max(...stats.avgGrid.slice(0, 10).map((d) => d.avg), 1)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ─── CONSTRUCTOR STATS TAB ─── */}
          {activeTab === "constructors" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                {constructors.map((c, i) => {
                  const tid = c.Constructor.constructorId;
                  const color = teamColors[tid] || "var(--f1-red)";
                  const wins = parseInt(c.wins);
                  const pts = parseInt(c.points);
                  return (
                    <div
                      key={tid}
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--line)",
                        borderRadius: 8,
                        padding: 24,
                        position: "relative",
                        overflow: "hidden",
                        transition: "border-color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = color)}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
                    >
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: color, boxShadow: i === 0 ? `0 0 12px ${color}` : "none" }} />
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                        <div>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted-dim)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 800, marginBottom: 4 }}>
                            Position {c.position}
                          </div>
                          <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 20, textTransform: "uppercase", color: "var(--text-primary)" }}>
                            {teamShortNames[tid] || c.Constructor.name}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontFamily: "var(--font-mono)", fontWeight: 900, fontSize: 24, color: color }}>
                            {pts}
                          </div>
                          <div style={{ fontSize: 10, color: "var(--muted-dim)", textTransform: "uppercase", fontWeight: 800 }}>PTS</div>
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--line)", borderRadius: 6, overflow: "hidden" }}>
                        <div style={{ background: "var(--surface-raised)", padding: "10px", textAlign: "center" }}>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted-dim)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 800, marginBottom: 4 }}>Wins</div>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{wins}</div>
                        </div>
                        <div style={{ background: "var(--surface-raised)", padding: "10px", textAlign: "center" }}>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted-dim)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 800, marginBottom: 4 }}>Pts/Race</div>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
                            {(pts / (stats?.totalRaces || 1)).toFixed(1)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── RACE ANALYSIS TAB ─── */}
          {activeTab === "races" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <div>
                <SectionTitle>Race-by-Race Winner</SectionTitle>
                <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--line)" }}>
                        {["Round", "Grand Prix", "Winner", "Team", "Fastest Lap", "Pole"].map((h) => (
                          <th
                            key={h}
                            style={{
                              padding: "12px 16px",
                              fontSize: 10,
                              fontWeight: 800,
                              textTransform: "uppercase",
                              letterSpacing: "1.5px",
                              color: "var(--muted-dim)",
                              textAlign: "left",
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {races.map((race, i) => {
                        const winner = race.Results.find((r) => r.position === "1");
                        const pole = race.Results.find((r) => r.grid === "1");
                        const fl = race.Results.find((r) => r.FastestLap?.rank === "1");
                        return (
                          <tr
                            key={i}
                            style={{
                              borderBottom: "1px solid var(--line-subtle)",
                              transition: "background 0.15s ease",
                              background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(225,6,0,0.04)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent")}
                          >
                            <td style={{ padding: "10px 16px", fontFamily: "var(--font-mono)", fontWeight: 900, color: "var(--muted)" }}>
                              {race.round}
                            </td>
                            <td style={{ padding: "10px 16px", fontWeight: 700, fontSize: 14, color: "var(--text-secondary)" }}>
                              {race.raceName}
                            </td>
                            <td style={{ padding: "10px 16px", fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>
                              {winner ? `${winner.Driver.givenName[0]}. ${winner.Driver.familyName}` : "—"}
                            </td>
                            <td style={{ padding: "10px 16px" }}>
                              {winner && (
                                <span style={{ fontSize: 12, color: teamColors[winner.Constructor.constructorId] || "var(--muted)", fontWeight: 600 }}>
                                  {teamShortNames[winner.Constructor.constructorId] || winner.Constructor.name}
                                </span>
                              )}
                            </td>
                            <td style={{ padding: "10px 16px", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)", fontWeight: 700 }}>
                              {fl ? `${fl.Driver.givenName[0]}. ${fl.Driver.familyName}` : "—"}
                            </td>
                            <td style={{ padding: "10px 16px", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)", fontWeight: 700 }}>
                              {pole ? `${pole.Driver.givenName[0]}. ${pole.Driver.familyName}` : "—"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}