// components/NextRaceCountdown.tsx
'use client';

import { useState, useEffect } from 'react';

interface WeatherDay {
  day: string;
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rain' | 'drizzle';
  rainChance: number;
}

interface NextRaceCountdownProps {
  raceName?: string;
  circuitName?: string;
  location?: string;
  date?: string;
  time?: string;
  weather?: WeatherDay[];
}

// Default: Belgian GP 2026
const DEFAULT_WEATHER: WeatherDay[] = [
  { day: 'FRI', temp: 30, condition: 'sunny', rainChance: 41 },
  { day: 'SAT', temp: 29, condition: 'drizzle', rainChance: 51 },
  { day: 'SUN', temp: 28, condition: 'cloudy', rainChance: 35 },
];

export default function NextRaceCountdown({
  raceName = 'Belgian GP',
  circuitName = 'Spa-Francorchamps',
  location = 'Spa, Belgium',
  date = '19 July 2026',
  time = '06:30 PM',
  weather = DEFAULT_WEATHER,
}: NextRaceCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 11, hours: 19, minutes: 42, seconds: 8 });

  // Calculate real countdown
  useEffect(() => {
    const targetDate = new Date(`${date} ${time}`);
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [date, time]);

  return (
    <section style={{
      width: '100%',
      padding: '0 clamp(20px, 4vw, 48px)',
      boxSizing: 'border-box',
      marginBottom: '32px',
    }}>
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '24px',
        alignItems: 'stretch',
      }}>
        {/* LEFT: Countdown */}
        <CountdownCard 
          raceName={raceName}
          circuitName={circuitName}
          location={location}
          date={date}
          time={time}
          timeLeft={timeLeft}
        />

        {/* RIGHT: Weather */}
        <WeatherCard weather={weather} />
      </div>
    </section>
  );
}

// ─── Countdown Card ───

function CountdownCard({ raceName, circuitName, location, date, time, timeLeft }: any) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #15151E 0%, #0F1016 100%)',
      border: '1px solid #1F1F27',
      borderRadius: '12px',
      padding: '32px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: '280px',
    }}>
      {/* Top red accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #E10600 0%, transparent 60%)',
      }} />

      {/* Subtle glow */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(225, 6, 0, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '16px',
        }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 900,
            fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#E10600',
          }}>
            Next Race
          </span>
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            fontFamily: '"JetBrains Mono", monospace',
            color: '#3F3F46',
          }}>
            ·
          </span>
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#F59E0B',
          }}>
            Round 10
          </span>
        </div>

        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 900,
          fontFamily: '"Formula1 Display-Regular", "Titillium Web", sans-serif',
          color: '#FFFFFF',
          margin: '0 0 8px 0',
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}>
          {raceName}
        </h2>

        <p style={{
          fontSize: '14px',
          color: '#71717A',
          margin: '0 0 4px 0',
          fontFamily: '"JetBrains Mono", monospace',
        }}>
          {circuitName}
        </p>
        <p style={{
          fontSize: '13px',
          color: '#52525B',
          margin: 0,
          fontFamily: '"JetBrains Mono", monospace',
        }}>
          {location} · {date} · {time}
        </p>
      </div>

      {/* Big Countdown */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginTop: '28px',
      }}>
        <BigCountdownUnit value={timeLeft.days} label="DAYS" />
        <Separator />
        <BigCountdownUnit value={timeLeft.hours} label="HRS" />
        <Separator />
        <BigCountdownUnit value={timeLeft.minutes} label="MIN" />
        <Separator />
        <BigCountdownUnit value={timeLeft.seconds} label="SEC" />
      </div>
    </div>
  );
}

// ─── Big Countdown Unit ───

function BigCountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ textAlign: 'center', flex: 1 }}>
      <div style={{
        background: 'linear-gradient(180deg, #0B0C10 0%, #15151E 100%)',
        border: '1px solid #27272A',
        borderRadius: '10px',
        padding: '16px 8px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle inner glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '40%',
          background: 'radial-gradient(ellipse, rgba(225, 6, 0, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: 900,
          color: '#FFFFFF',
          display: 'block',
          lineHeight: 1,
          position: 'relative',
          zIndex: 1,
        }}>
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span style={{
        fontSize: '10px',
        fontWeight: 800,
        fontFamily: '"JetBrains Mono", monospace',
        letterSpacing: '0.15em',
        color: '#E10600',
        textTransform: 'uppercase',
        marginTop: '8px',
        display: 'block',
      }}>
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      paddingBottom: '20px',
    }}>
      <span style={{
        fontSize: '24px',
        fontWeight: 900,
        color: '#3F3F46',
        fontFamily: '"JetBrains Mono", monospace',
      }}>
        :
      </span>
    </div>
  );
}

// ─── Weather Card ───

function WeatherCard({ weather }: { weather: WeatherDay[] }) {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #15151E 0%, #0F1016 100%)',
      border: '1px solid #1F1F27',
      borderRadius: '12px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h3 style={{
        fontSize: '13px',
        fontWeight: 800,
        fontFamily: '"Formula1 Display-Regular", "Titillium Web", sans-serif',
        color: '#FFFFFF',
        margin: '0 0 20px 0',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        Race Weekend Forecast
      </h3>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        flex: 1,
        justifyContent: 'center',
      }}>
        {weather.map((day) => (
          <WeatherDayRow key={day.day} day={day} />
        ))}
      </div>
    </div>
  );
}

function WeatherDayRow({ day }: { day: WeatherDay }) {
  const conditionConfig = {
    sunny: { icon: SunIcon, color: '#F59E0B', label: 'Clear sky' },
    cloudy: { icon: CloudIcon, color: '#A1A1AA', label: 'Cloudy' },
    rain: { icon: RainIcon, color: '#3B82F6', label: 'Rain' },
    drizzle: { icon: DrizzleIcon, color: '#60A5FA', label: 'Drizzle' },
  };

  const config = conditionConfig[day.condition];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 16px',
      background: '#0B0C10',
      border: '1px solid #1F1F27',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = '#27272A';
      e.currentTarget.style.background = '#111118';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = '#1F1F27';
      e.currentTarget.style.background = '#0B0C10';
    }}
    >
      {/* Day */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{
          fontSize: '14px',
          fontWeight: 900,
          fontFamily: '"JetBrains Mono", monospace',
          color: '#FFFFFF',
          width: '36px',
        }}>
          {day.day}
        </span>
        <span style={{ color: config.color }}>
          <config.icon />
        </span>
      </div>

      {/* Info */}
      <div style={{ textAlign: 'right' }}>
        <span style={{
          fontSize: '18px',
          fontWeight: 900,
          fontFamily: '"JetBrains Mono", monospace',
          color: '#FFFFFF',
          display: 'block',
          lineHeight: 1.2,
        }}>
          {day.temp}°C
        </span>
        <span style={{
          fontSize: '11px',
          color: '#71717A',
          fontFamily: '"JetBrains Mono", monospace',
        }}>
          {config.label}
        </span>
      </div>

      {/* Rain chance */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginLeft: '16px',
      }}>
        <DropIcon />
        <span style={{
          fontSize: '12px',
          fontWeight: 700,
          fontFamily: '"JetBrains Mono", monospace',
          color: '#3B82F6',
        }}>
          {day.rainChance}%
        </span>
      </div>
    </div>
  );
}

// ─── Weather Icons ───

function SunIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  );
}

function RainIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9" />
      <line x1="16" y1="13" x2="16" y2="21" />
      <line x1="8" y1="13" x2="8" y2="21" />
      <line x1="12" y1="15" x2="12" y2="23" />
    </svg>
  );
}

function DrizzleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9" />
      <line x1="8" y1="19" x2="8" y2="21" />
      <line x1="8" y1="13" x2="8" y2="15" />
      <line x1="16" y1="19" x2="16" y2="21" />
      <line x1="16" y1="13" x2="16" y2="15" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="12" y1="15" x2="12" y2="17" />
    </svg>
  );
}

function DropIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}