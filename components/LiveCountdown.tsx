'use client';

import { useEffect, useState } from 'react';

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ZERO: CountdownState = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function calc(target: number): CountdownState {
  const distance = target - Date.now();
  if (distance <= 0) return ZERO;
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance % 86_400_000) / 3_600_000),
    minutes: Math.floor((distance % 3_600_000) / 60_000),
    seconds: Math.floor((distance % 60_000) / 1_000),
  };
}

export default function LiveCountdown({ targetDate }: { targetDate: string }) {
  const target = new Date(targetDate).getTime();
  // Start at ZERO on both server and first client render to avoid a hydration
  // mismatch, then flip to the real value once mounted.
  const [time, setTime] = useState<CountdownState>(ZERO);

  useEffect(() => {
    setTime(calc(target));
    const id = setInterval(() => setTime(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div style={{ display: 'flex', gap: '16px', marginTop: '28px' }}>
      <BigCountdownUnit value={time.days} label="DAYS" />
      <BigCountdownSeparator />
      <BigCountdownUnit value={time.hours} label="HRS" />
      <BigCountdownSeparator />
      <BigCountdownUnit value={time.minutes} label="MIN" />
      <BigCountdownSeparator />
      <BigCountdownUnit value={time.seconds} label="SEC" />
    </div>
  );
}

function BigCountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ textAlign: 'center', flex: 1 }}>
      <div
        style={{
          background: 'linear-gradient(180deg, #0B0C10 0%, #15151E 100%)',
          border: '1px solid #27272A',
          borderRadius: '10px',
          padding: '16px 8px',
          position: 'relative',
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
            height: '40%',
            background: 'radial-gradient(ellipse, rgba(225, 6, 0, 0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            display: 'block',
            lineHeight: 1,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span
        style={{
          fontSize: '10px',
          fontWeight: 800,
          fontFamily: '"JetBrains Mono", monospace',
          letterSpacing: '0.15em',
          color: '#E10600',
          textTransform: 'uppercase',
          marginTop: '8px',
          display: 'block',
        }}
      >
        {label}
      </span>
    </div>
  );
}

function BigCountdownSeparator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '20px' }}>
      <span style={{ fontSize: '24px', fontWeight: 900, color: '#3F3F46', fontFamily: '"JetBrains Mono", monospace' }}>
        :
      </span>
    </div>
  );
}