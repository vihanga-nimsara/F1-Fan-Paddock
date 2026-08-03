'use client';

import { useEffect, useState } from 'react';
import { useNextRace } from '@/lib/useNextRace';
import { getRaceWeekendForecast, type WeatherDay } from '@/lib/weather';
import WeatherCard from '@/components/WeatherCard';

interface Race {
  round: string;
  raceName: string;
  Circuit: {
    circuitName: string;
    Location: {
      locality: string;
      country: string;
      lat: string;
      long: string;
    };
  };
  date: string;
  time?: string;
}


function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// ═══ SUB-COMPONENTS ═══════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════

function CountdownDigit({ value, label }: { value: number; label: string }) {
  const displayValue = String(value).padStart(2, '0');

  return (
    <div style={{ textAlign: 'center', flex: 1, minWidth: '60px' }}>
      <div style={{
        background: 'linear-gradient(180deg, #0B0C10 0%, #15151E 100%)',
        border: '1px solid #27272A',
        borderRadius: '12px',
        padding: '18px 8px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.02)',
      }}>
        {/* Top highlight */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '15%',
          right: '15%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
        }} />
        {/* Inner glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '40%',
          background: 'radial-gradient(ellipse, rgba(225, 6, 0, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          fontWeight: 900,
          color: '#FFFFFF',
          display: 'block',
          lineHeight: 1,
          position: 'relative',
          zIndex: 1,
          fontVariantNumeric: 'tabular-nums',
          textShadow: '0 0 16px rgba(255,255,255,0.08)',
        }}>
          {displayValue}
        </span>
      </div>
      <span style={{
        fontSize: '10px',
        fontWeight: 800,
        fontFamily: 'var(--font-display)',
        letterSpacing: '0.15em',
        color: '#E10600',
        textTransform: 'uppercase',
        marginTop: '10px',
        display: 'block',
      }}>
        {label}
      </span>
    </div>
  );
}

function CountdownSeparator() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: '16px',
    }}>
      <span style={{
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        background: '#E10600',
        boxShadow: '0 0 6px rgba(225, 6, 0, 0.5)',
        animation: 'sepBlink 1.2s ease-in-out infinite',
      }} />
      <span style={{
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        background: '#E10600',
        boxShadow: '0 0 6px rgba(225, 6, 0, 0.5)',
        animation: 'sepBlink 1.2s ease-in-out infinite 0.6s',
      }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ═══ MAIN COMPONENT ═══════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════

export default function NextRacePanel({
  nextRace
}:{
  nextRace: Race | null
}) {
  const [countdown, setCountdown] = useState({
  days: 0,
  hrs: 0,
  min: 0,
  sec: 0,
});
  const [weatherForecast, setWeatherForecast] = useState<WeatherDay[]>([]);

 useEffect(() => {
  async function loadWeather() {
    if (!nextRace) return;

    const data = await getRaceWeekendForecast(
      parseFloat(nextRace.Circuit.Location.lat),
      parseFloat(nextRace.Circuit.Location.long),
      nextRace.date
    );

    setWeatherForecast(data);
  }

  loadWeather();
}, [nextRace]);


useEffect(() => {
  if (!nextRace?.date) return;

  const raceDate = new Date(
    `${nextRace.date}T${nextRace.time ?? "00:00:00"}`
  );

  if (isNaN(raceDate.getTime())) {
    console.error("Invalid race date:", nextRace.date, nextRace.time);
    return;
  }

  const updateCountdown = () => {
    const diff = raceDate.getTime() - Date.now();

    if (diff <= 0) {
      setCountdown({
        days: 0,
        hrs: 0,
        min: 0,
        sec: 0,
      });
      return;
    }

    setCountdown({
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hrs: Math.floor((diff / (1000 * 60 * 60)) % 24),
      min: Math.floor((diff / (1000 * 60)) % 60),
      sec: Math.floor((diff / 1000) % 60),
    });
  };

  updateCountdown();

  const interval = setInterval(updateCountdown, 1000);

  return () => clearInterval(interval);

}, [nextRace]);

  return (
    <section style={{ width: '100%', padding: '0 clamp(20px, 4vw, 48px)', boxSizing: 'border-box', marginBottom: '48px' }}>
      {/* Global animations */}
      <style>{`
        @keyframes sepBlink {
          0%, 100% { opacity: 0.15; transform: scale(0.6); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes livePulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes glowSweep {
          0% { left: -30%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 130%; opacity: 0; }
        }
      `}</style>

      <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', alignItems: 'stretch' }}>

        {/* ═══ COUNTDOWN CARD ═══ */}
        <div style={{
          background: 'linear-gradient(135deg, #15151E 0%, #0F1016 100%)',
          border: '1px solid #1F1F27',
          borderRadius: '16px',
          padding: '32px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '300px',
        }}>
          {/* Top accent line */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #E10600 0%, rgba(225, 6, 0, 0.5) 40%, transparent 80%)',
            boxShadow: '0 0 12px rgba(225, 6, 0, 0.3)',
          }} />

          {/* Ambient glow */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '240px',
            height: '240px',
            background: 'radial-gradient(circle, rgba(225, 6, 0, 0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Grid pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.015,
            pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                fontWeight: 900,
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#E10600',
              }}>
                <span style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#E10600',
                  boxShadow: '0 0 8px rgba(225, 6, 0, 0.6)',
                  animation: 'livePulse 2s ease-in-out infinite',
                }} />
                Next Race
              </span>
              <span style={{ fontSize: '11px', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#3F3F46' }}>·</span>
              <span style={{ fontSize: '11px', fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F59E0B' }}>
                ROUND {nextRace?.round}
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
              fontWeight: 900,
              fontFamily: 'var(--font-display)',
              color: '#FFFFFF',
              margin: '0 0 10px 0',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
            }}>
              {nextRace?.raceName}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <LocationIcon />
              <p style={{ fontSize: '14px', color: '#71717A', margin: 0, fontFamily: 'var(--font-display)' }}>
                {nextRace?.Circuit.circuitName}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ClockIcon />
              <p style={{ fontSize: '13px', color: '#52525B', margin: 0, fontFamily: 'var(--font-display)' }}>
                {nextRace?.Circuit.Location.locality}, {nextRace?.Circuit.Location.country} · {nextRace?.date} · {nextRace?.time}
              </p>
            </div>
          </div>

          {/* Countdown */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '32px', position: 'relative', zIndex: 1 }}>
            <CountdownDigit value={countdown.days} label="Days" />
            <CountdownSeparator />
            <CountdownDigit value={countdown.hrs} label="Hrs" />
            <CountdownSeparator />
            <CountdownDigit value={countdown.min} label="Min" />
            <CountdownSeparator />
            <CountdownDigit value={countdown.sec} label="Sec" />
          </div>
        </div>

        {/* ═══ WEATHER CARD ═══ */}
        <WeatherCard
          forecast={weatherForecast}
          title="Weekend Forecast"
          subtitle={`${nextRace?.Circuit.Location.locality}, ${nextRace?.Circuit.Location.country}`}
          footer="Live weather data · Updates hourly"
          loading={weatherForecast.length === 0}
        />

      </div>
    </section>
  );
}