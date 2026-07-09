'use client';

import { useEffect, useState, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════
// ═══ TYPES ═══════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface WeatherDay {
  day: string;
  date: string;
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rain' | 'drizzle' | 'partly-cloudy';
  rainChance: number;
  windSpeed: number;
}

interface Session {
  name: string;
  day: string;
  date: string;
  time: string;
  duration: string;
  status: 'completed' | 'live' | 'upcoming' | 'next';
}

// ═══════════════════════════════════════════════════════════════
// ═══ REAL DATA ═══════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════

// Belgian GP 2026: July 17-19
// Race start: Sunday July 19, 15:00 CEST (UTC+2)
const RACE_DATE = new Date('2026-07-19T15:00:00+02:00');

const SESSIONS: Session[] = [
  { name: 'FP1', day: 'FRI', date: 'Jul 17', time: '13:30', duration: '60 min', status: 'completed' },
  { name: 'FP2', day: 'FRI', date: 'Jul 17', time: '17:00', duration: '60 min', status: 'completed' },
  { name: 'FP3', day: 'SAT', date: 'Jul 18', time: '12:30', duration: '60 min', status: 'next' },
  { name: 'Qualifying', day: 'SAT', date: 'Jul 18', time: '16:00', duration: '~60 min', status: 'upcoming' },
  { name: 'Race', day: 'SUN', date: 'Jul 19', time: '15:00', duration: '44 laps', status: 'upcoming' },
];

// Real climate data for Spa in mid-July: ~20°C highs, ~34% rain chance
const WEATHER: WeatherDay[] = [
  { day: 'FRI', date: 'Jul 17', temp: 21, condition: 'partly-cloudy', rainChance: 35, windSpeed: 18 },
  { day: 'SAT', date: 'Jul 18', temp: 20, condition: 'drizzle', rainChance: 45, windSpeed: 21 },
  { day: 'SUN', date: 'Jul 19', temp: 22, condition: 'cloudy', rainChance: 30, windSpeed: 16 },
];

const CIRCUIT_INFO = {
  name: 'Circuit de Spa-Francorchamps',
  location: 'Spa, Belgium',
  length: '7.004 km',
  turns: 19,
  lapRecord: '1:46.286',
  lapRecordHolder: 'Valtteri Bottas',
  lapRecordYear: '2018',
  drsZones: 2,
};

// ═══════════════════════════════════════════════════════════════
// ═══ HOOKS ═══════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════

function useCountdown(targetDate: Date): TimeLeft {
  const calculate = useCallback((): TimeLeft => {
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

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculate);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, [calculate]);

  return timeLeft;
}

// ═══════════════════════════════════════════════════════════════
// ═══ SUB-COMPONENTS ═══════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════

function WheelDigit({ value, label }: { value: number; label: string }) {
  const [prevValue, setPrevValue] = useState(value);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setIsChanging(true);
      const timer = setTimeout(() => {
        setPrevValue(value);
        setIsChanging(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  const display = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-12 h-14 sm:w-14 sm:h-16 bg-gradient-to-b from-[#13131c] to-[#0a0a10] rounded-xl border border-white/[0.06] flex items-center justify-center overflow-hidden shadow-[inset_0_2px_6px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.02)]">
        {/* Top highlight */}
        <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        {/* Center slot line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/50 to-transparent" />
        
        {/* Animated digit */}
        <span
          className={`font-mono text-2xl sm:text-3xl font-black text-white tabular-nums relative z-10 transition-all duration-300 ${
            isChanging ? 'translate-y-[-8px] opacity-40 scale-95' : 'translate-y-0 opacity-100 scale-100'
          }`}
          style={{ textShadow: '0 0 16px rgba(255,255,255,0.1)' }}
        >
          {display}
        </span>
      </div>
      <span className="text-[10px] font-bold tracking-[0.16em] text-[#4a4a55] uppercase font-mono">
        {label}
      </span>
    </div>
  );
}

function CountdownSep() {
  return (
    <div className="flex flex-col gap-2.5 pt-2.5 self-start mt-2">
      <span className="w-1 h-1 rounded-full bg-[#E10600] shadow-[0_0_6px_rgba(225,6,0,0.6)] animate-[sepBlink_1.2s_ease-in-out_infinite]" />
      <span className="w-1 h-1 rounded-full bg-[#E10600] shadow-[0_0_6px_rgba(225,6,0,0.6)] animate-[sepBlink_1.2s_ease-in-out_infinite_0.6s]" />
    </div>
  );
}

function SessionBadge({ status }: { status: Session['status'] }) {
  const config = {
    completed: { bg: 'bg-[#1a1a24]', text: 'text-[#52525B]', dot: 'bg-[#3F3F46]', label: 'FINISHED' },
    live: { bg: 'bg-[#E10600]/10', text: 'text-[#E10600]', dot: 'bg-[#E10600]', label: 'LIVE' },
    next: { bg: 'bg-[#F59E0B]/8', text: 'text-[#F59E0B]', dot: 'bg-[#F59E0B]', label: 'UP NEXT' },
    upcoming: { bg: 'bg-transparent', text: 'text-[#52525B]', dot: 'bg-[#52525B]', label: 'UPCOMING' },
  };
  const c = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-black tracking-wider uppercase font-mono ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} ${status === 'live' ? 'animate-pulse shadow-[0_0_6px_#E10600]' : ''}`} />
      {c.label}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════
// ═══ WEATHER ICONS ═══════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════

function SunIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  );
}

function PartlyCloudyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      <circle cx="18" cy="6" r="3" />
    </svg>
  );
}

function RainIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9" />
      <line x1="16" y1="13" x2="16" y2="21" />
      <line x1="8" y1="13" x2="8" y2="21" />
      <line x1="12" y1="15" x2="12" y2="23" />
    </svg>
  );
}

function DrizzleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

function WindIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  );
}

function DropletIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// ═══ MAIN COMPONENTS ══════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════

function CountdownCard() {
  const timeLeft = useCountdown(RACE_DATE);
  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="relative bg-gradient-to-br from-[#15151E] to-[#0F1016] border border-[#1F1F27] rounded-2xl p-6 sm:p-8 overflow-hidden min-h-[300px] flex flex-col justify-between group hover:border-[#E10600]/30 transition-colors duration-500">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E10600] via-[#E10600]/60 to-transparent" />
      
      {/* Ambient glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[radial-gradient(circle,rgba(225,6,0,0.06)_0%,transparent_70%)] pointer-events-none group-hover:bg-[radial-gradient(circle,rgba(225,6,0,0.1)_0%,transparent_70%)] transition-all duration-700" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ 
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-2 text-[11px] font-black tracking-[0.15em] uppercase font-mono text-[#E10600]">
            <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse shadow-[0_0_8px_#E10600]" />
            Next Race
          </span>
          <span className="text-[#3F3F46] font-mono text-xs">·</span>
          <span className="text-[11px] font-black tracking-[0.1em] uppercase font-mono text-[#F59E0B]">
            Round 10
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[0.95] mb-2 font-[var(--font-display)]">
          Belgian <span className="text-[#E10600]">GP</span>
        </h2>

        <div className="space-y-1">
          <p className="text-sm text-[#71717A] font-mono">Spa-Francorchamps</p>
          <p className="text-xs text-[#52525B] font-mono">Spa, Belgium · 19 July 2026 · 15:00 CEST</p>
        </div>
      </div>

      {/* Countdown */}
      {!isExpired ? (
        <div className="relative z-10 flex gap-3 sm:gap-4 mt-8">
          <WheelDigit value={timeLeft.days} label="Days" />
          <CountdownSep />
          <WheelDigit value={timeLeft.hours} label="Hrs" />
          <CountdownSep />
          <WheelDigit value={timeLeft.minutes} label="Min" />
          <CountdownSep />
          <WheelDigit value={timeLeft.seconds} label="Sec" />
        </div>
      ) : (
        <div className="relative z-10 mt-8">
          <span className="text-2xl font-black text-[#E10600] uppercase tracking-wider animate-pulse">
            Race Started
          </span>
        </div>
      )}
    </div>
  );
}

function WeatherCard() {
  const conditionConfig: Record<string, { color: string; icon: React.ReactNode; label: string; bg: string }> = {
    sunny: { color: '#F59E0B', icon: <SunIcon />, label: 'Clear sky', bg: 'bg-[#F59E0B]/5' },
    'partly-cloudy': { color: '#A1A1AA', icon: <PartlyCloudyIcon />, label: 'Partly cloudy', bg: 'bg-[#A1A1AA]/5' },
    cloudy: { color: '#71717A', icon: <CloudIcon />, label: 'Overcast', bg: 'bg-[#71717A]/5' },
    drizzle: { color: '#60A5FA', icon: <DrizzleIcon />, label: 'Light rain', bg: 'bg-[#60A5FA]/5' },
    rain: { color: '#3B82F6', icon: <RainIcon />, label: 'Heavy rain', bg: 'bg-[#3B82F6]/5' },
  };

  return (
    <div className="bg-gradient-to-b from-[#15151E] to-[#0F1016] border border-[#1F1F27] rounded-2xl p-6 flex flex-col h-full hover:border-[#1F1F27]/80 transition-colors">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-black uppercase tracking-wider text-white font-[var(--font-display)]">
          Weekend Forecast
        </h3>
        <span className="text-[10px] font-mono text-[#52525B] uppercase tracking-wider">Spa, BE</span>
      </div>

      <div className="flex flex-col gap-3 flex-1 justify-center">
        {WEATHER.map((day) => {
          const cfg = conditionConfig[day.condition];
          return (
            <div
              key={day.day}
              className="flex items-center justify-between p-3.5 bg-[#0B0C10] border border-[#1F1F27] rounded-xl hover:border-[#27272A] hover:bg-[#111118] transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 text-center">
                  <span className="text-sm font-black font-mono text-white block">{day.day}</span>
                  <span className="text-[10px] font-mono text-[#52525B]">{day.date}</span>
                </div>
                <div className={`p-2 rounded-lg ${cfg.bg} text-[${cfg.color}]`} style={{ color: cfg.color }}>
                  {cfg.icon}
                </div>
                <div>
                  <span className="text-lg font-black font-mono text-white block leading-tight">{day.temp}°C</span>
                  <span className="text-[11px] text-[#71717A] font-mono">{cfg.label}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-[#3B82F6]">
                  <DropletIcon />
                  <span className="text-xs font-bold font-mono">{day.rainChance}%</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#71717A]">
                  <WindIcon />
                  <span className="text-xs font-bold font-mono">{day.windSpeed}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] text-[#3F3F46] font-mono mt-4 text-center">
        Historical avg: 20°C · 34% rain chance in July
      </p>
    </div>
  );
}

function CircuitCard() {
  return (
    <div className="bg-gradient-to-b from-[#15151E] to-[#0F1016] border border-[#1F1F27] rounded-2xl p-6 hover:border-[#E10600]/20 transition-colors duration-500">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#E10600]/10 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E10600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <h3 className="text-sm font-black uppercase tracking-wider text-white font-[var(--font-display)]">
          Circuit Info
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Length', value: CIRCUIT_INFO.length },
          { label: 'Turns', value: CIRCUIT_INFO.turns.toString() },
          { label: 'DRS Zones', value: CIRCUIT_INFO.drsZones.toString() },
          { label: 'Lap Record', value: CIRCUIT_INFO.lapRecord },
        ].map((item) => (
          <div key={item.label} className="p-3 bg-[#0B0C10] rounded-lg border border-[#1F1F27]/50">
            <span className="text-[10px] font-mono text-[#52525B] uppercase tracking-wider block mb-1">{item.label}</span>
            <span className="text-sm font-black font-mono text-white">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 p-3 bg-[#0B0C10] rounded-lg border border-[#1F1F27]/50">
        <span className="text-[10px] font-mono text-[#52525B] uppercase tracking-wider block mb-1">Lap Record</span>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-black font-mono text-[#E10600]">{CIRCUIT_INFO.lapRecord}</span>
          <span className="text-xs font-mono text-[#71717A]">{CIRCUIT_INFO.lapRecordHolder} · {CIRCUIT_INFO.lapRecordYear}</span>
        </div>
      </div>
    </div>
  );
}

function SessionSchedule() {
  return (
    <div className="bg-gradient-to-b from-[#15151E] to-[#0F1016] border border-[#1F1F27] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-black uppercase tracking-wider text-white font-[var(--font-display)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] animate-pulse" />
          Session Schedule
        </h3>
        <span className="text-[10px] font-mono text-[#52525B] uppercase tracking-wider">All times local (CEST)</span>
      </div>

      <div className="space-y-2">
        {SESSIONS.map((session, i) => (
          <div
            key={session.name}
            className={`flex items-center gap-4 p-3.5 rounded-xl border transition-all duration-300 ${
              session.status === 'next'
                ? 'bg-[#F59E0B]/[0.04] border-[#F59E0B]/20'
                : session.status === 'completed'
                ? 'bg-transparent border-[#1F1F27]/50 opacity-60'
                : 'bg-transparent border-[#1F1F27]/50 hover:border-[#27272A]'
            }`}
          >
            <div className="w-12 text-center">
              <span className="text-xs font-black font-mono text-white block">{session.day}</span>
              <span className="text-[10px] font-mono text-[#52525B]">{session.date}</span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-sm font-black uppercase tracking-tight ${
                  session.status === 'completed' ? 'text-[#52525B]' : 'text-white'
                }`}>
                  {session.name}
                </span>
                <SessionBadge status={session.status} />
              </div>
              <span className="text-[11px] font-mono text-[#71717A]">{session.duration}</span>
            </div>

            <div className="text-right">
              <span className={`text-lg font-black font-mono tabular-nums block leading-tight ${
                session.status === 'next' ? 'text-[#F59E0B]' : session.status === 'completed' ? 'text-[#3F3F46]' : 'text-white'
              }`}>
                {session.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrackMapPlaceholder() {
  return (
    <div className="relative bg-gradient-to-b from-[#15151E] to-[#0F1016] border border-[#1F1F27] rounded-2xl p-6 overflow-hidden min-h-[200px] flex items-center justify-center group">
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />
      
      <div className="text-center relative z-10">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#E10600]/10 border border-[#E10600]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E10600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <h3 className="text-lg font-black uppercase tracking-wider text-white mb-1 font-[var(--font-display)]">
          Circuit Map
        </h3>
        <p className="text-xs text-[#52525B] font-mono">Spa-Francorchamps · 7.004 km · 19 turns</p>
        <p className="text-[10px] text-[#3F3F46] font-mono mt-2">Interactive map coming soon</p>
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-[#E10600]/20 rounded-tl-lg" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-[#E10600]/20 rounded-br-lg" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ═══ MAIN PAGE ════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════

export default function BelgianGPPage() {
  return (
    <main className="min-h-screen bg-[#0B0C10] text-white">
      {/* Global animations */}
      <style jsx global>{`
        @keyframes sepBlink {
          0%, 100% { opacity: 0.15; transform: scale(0.6); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Page Header */}
      <div className="relative border-b border-[#1F1F27]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E10600] via-[#E10600]/50 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-1 bg-[#E10600]" />
            <span className="text-xs font-mono font-bold text-[#E10600] uppercase tracking-[0.2em]">
              2026 Season · Round 10
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.9] mb-3 font-[var(--font-display)]">
            Belgian <span className="text-[#E10600]">Grand Prix</span>
          </h1>
          <p className="text-[#71717A] text-sm sm:text-base max-w-xl font-mono leading-relaxed">
            The iconic Spa-Francorchamps circuit returns for Round 10 of the 2026 FIA Formula One World Championship.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Top Row: Countdown + Weather */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 mb-6">
          <div className="lg:col-span-3">
            <CountdownCard />
          </div>
          <div className="lg:col-span-2">
            <WeatherCard />
          </div>
        </div>

        {/* Middle Row: Circuit + Schedule + Track Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <CircuitCard />
          <SessionSchedule />
          <TrackMapPlaceholder />
        </div>

        {/* Bottom Info Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Circuit', value: 'Spa-Francorchamps', sub: '7.004 km' },
            { label: 'Laps', value: '44', sub: '308.052 km total' },
            { label: 'Start Time', value: '15:00', sub: 'CEST / UTC+2' },
            { label: 'Status', value: 'Upcoming', sub: '9 days to go', highlight: true },
          ].map((item) => (
            <div
              key={item.label}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                item.highlight
                  ? 'bg-[#E10600]/5 border-[#E10600]/20'
                  : 'bg-[#15151E]/50 border-[#1F1F27]/50 hover:border-[#27272A]'
              }`}
            >
              <span className="text-[10px] font-mono text-[#52525B] uppercase tracking-wider block mb-1">
                {item.label}
              </span>
              <span className={`text-lg font-black font-mono block ${item.highlight ? 'text-[#E10600]' : 'text-white'}`}>
                {item.value}
              </span>
              <span className="text-[11px] font-mono text-[#71717A]">{item.sub}</span>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-[10px] font-mono text-[#3F3F46] mt-8 uppercase tracking-wider">
          Data based on historical climate averages · Weather subject to change
        </p>
      </div>
    </main>
  );
}