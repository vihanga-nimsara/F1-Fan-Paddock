'use client';

import { useState, useEffect, useCallback } from 'react';
import { TickerSession } from '@/lib/ticker';

// ─── Types ──────────────────────────────────────────────────────
interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// ─── Countdown Hook ─────────────────────────────────────────────
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

  // Update once a minute — we no longer render seconds, no need for 1s ticks
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft);
  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 60_000);
    return () => clearInterval(interval);
  }, [calculateTimeLeft]);
  return timeLeft;
}

// ─── Fixed Card Dimensions ──────────────────────────────────────
const CARD_HEIGHT = 90;

// ─── Glow Card ────────────────────────────────────────────────────
function GlowCard({
  children,
  accentColor = '#E10600',
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
      {/* Top glow line */}
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
      {/* Ambient top glow */}
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

  // Friendly countdown text, no boxes — e.g. "19d 4h" / "6h 20m" / "12m"
  const countdownLabel =
    timeLeft.days > 0
      ? `${timeLeft.days}d ${timeLeft.hours}h`
      : timeLeft.hours > 0
      ? `${timeLeft.hours}h ${timeLeft.minutes}m`
      : `${timeLeft.minutes}m`;

  return (
    <GlowCard accentColor="#E10600" glowIntensity="high" style={{ minWidth: '250px', maxWidth: '250px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '0 18px',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Left accent bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '20%',
            bottom: '20%',
            width: '3px',
            backgroundColor: '#E10600',
            borderRadius: '0 3px 3px 0',
            boxShadow: '0 0 12px rgba(225, 6, 0, 0.5), 0 0 24px rgba(225, 6, 0, 0.15)',
            animation: 'accentPulse 2s ease-in-out infinite',
          }}
        />

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1, minWidth: 0 }}>
          <span
            style={{
              fontSize: '0.5625rem',
              fontWeight: 900,
              color: '#E10600',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontFamily: "'Titillium Web', sans-serif",
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: '#E10600',
                boxShadow: '0 0 6px rgba(225, 6, 0, 0.7)',
                animation: 'livePulse 1.5s ease-in-out infinite',
                flexShrink: 0,
              }}
            />
            NEXT RACE
          </span>
          <span
            style={{
              fontSize: '0.9375rem',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
              fontFamily: "'Titillium Web', sans-serif",
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {raceName}
          </span>
          <span
            style={{
              fontSize: '0.5625rem',
              fontWeight: 700,
              color: '#3F3F46',
              letterSpacing: '0.06em',
              fontFamily: "'Titillium Web', sans-serif",
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

        {/* Divider */}
        <div
          style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(180deg, transparent, #2a2a35, transparent)',
            flexShrink: 0,
          }}
        />

        {/* Countdown, text-only */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '4px',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: '1.375rem',
              fontWeight: 900,
              color: '#FFFFFF',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.02em',
              fontFamily: "'Titillium Web', sans-serif",
              textShadow: '0 0 12px rgba(255,255,255,0.12)',
              whiteSpace: 'nowrap',
              lineHeight: 1,
            }}
          >
            {countdownLabel}
          </span>
          <span
            style={{
              fontSize: '0.5rem',
              fontWeight: 700,
              color: '#4a4a55',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              fontFamily: "'Titillium Web', sans-serif",
              whiteSpace: 'nowrap',
            }}
          >
            REMAINING
          </span>
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

  const accentColor = isLive ? '#E10600' : isNext ? '#F59E0B' : '#52525B';

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
          {/* Live bar */}
          {isLive && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: '18%',
                bottom: '18%',
                width: '3px',
                backgroundColor: '#E10600',
                borderRadius: '0 3px 3px 0',
                boxShadow: '0 0 12px rgba(225, 6, 0, 0.6), 0 0 24px rgba(225, 6, 0, 0.2)',
                animation: 'liveBarPulse 2s ease-in-out infinite',
              }}
            />
          )}

          {/* Status */}
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
                fontFamily: "'Titillium Web', sans-serif",
                textShadow: isLive ? `0 0 6px ${statusColor}40` : 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {getStatusLabel(session.status)}
            </span>
          </div>

          {/* Session name */}
          <div
            style={{
              color: isLive ? '#FFFFFF' : '#E4E4E7',
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: '0.8125rem',
              letterSpacing: '-0.01em',
              marginBottom: '5px',
              lineHeight: 1.2,
              fontFamily: "'Titillium Web', sans-serif",
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {session.label}
          </div>

          {/* Time row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                color: isLive ? '#E10600' : isNext ? '#F59E0B' : '#71717A',
                fontSize: '0.6875rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                fontVariantNumeric: 'tabular-nums',
                fontFamily: "'Titillium Web', sans-serif",
                textShadow: isLive ? '0 0 8px rgba(225, 6, 0, 0.3)' : 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {session.time}
            </span>
            <span
              style={{
                color: '#3F3F46',
                fontSize: '0.5625rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                fontFamily: "'Titillium Web', sans-serif",
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
                  color: '#E10600',
                  backgroundColor: 'rgba(225, 6, 0, 0.1)',
                  padding: '1px 5px',
                  borderRadius: '3px',
                  letterSpacing: '0.1em',
                  border: '1px solid rgba(225, 6, 0, 0.15)',
                  animation: 'onAirPulse 2s ease-in-out infinite',
                  fontFamily: "'Titillium Web', sans-serif",
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
    <GlowCard accentColor="#E10600" glowIntensity="medium" style={{ minWidth: '200px', maxWidth: '200px' }}>
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
            backgroundColor: '#E10600',
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
              fontFamily: "'Titillium Web', sans-serif",
              whiteSpace: 'nowrap',
            }}
          >
            WEEKEND TIMELINE
          </span>
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '0.02em',
              fontFamily: "'Titillium Web', sans-serif",
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ color: '#E10600', textShadow: '0 0 10px rgba(225, 6, 0, 0.2)' }}>
              {raceName.replace(' Grand Prix', '').toUpperCase()}
            </span>
          </span>
        </div>

        <span
          style={{
            color: '#3F3F46',
            fontSize: '0.5625rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            fontFamily: "'Titillium Web', sans-serif",
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

// ─── Main Component ───────────────────────────────────────────────
export default function SessionTicker({ raceName, sessions }: { raceName: string; sessions: TickerSession[] }) {
  if (!sessions.length) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return '#E10600';
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
        backgroundColor: '#0B0C10',
        borderBottom: '1px solid rgba(255, 255, 255, 0.02)',
        fontFamily: "'Titillium Web', sans-serif",
        fontSize: '0.75rem',
        width: '100%',
        position: 'relative',
        padding: '12px 16px',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
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

      {/* Top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #E10600 0%, #E10600 18%, transparent 50%)',
          boxShadow: '0 0 16px rgba(225, 6, 0, 0.2)',
          zIndex: 10,
        }}
      />

      {/* Scrollable content */}
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

      {/* Right fade */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '50px',
          background: 'linear-gradient(90deg, transparent, #0B0C10)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      {/* Animations */}
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
        @keyframes accentPulse {
          0%, 100% { box-shadow: 0 0 6px rgba(225, 6, 0, 0.3), 0 0 12px rgba(225, 6, 0, 0.1); }
          50% { box-shadow: 0 0 16px rgba(225, 6, 0, 0.6), 0 0 32px rgba(225, 6, 0, 0.2); }
        }
      `}</style>
    </section>
  );
}