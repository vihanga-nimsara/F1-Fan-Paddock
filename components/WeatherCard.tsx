// components/WeatherCard.tsx
'use client';

interface WeatherDay {
  day: string;
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rain' | 'drizzle';
  rainChance: number;
}

interface WeatherCardProps {
  forecast?: WeatherDay[];
  title?: string;
}

const DEFAULT_FORECAST: WeatherDay[] = [
  { day: 'FRI', temp: 30, condition: 'sunny', rainChance: 41 },
  { day: 'SAT', temp: 29, condition: 'drizzle', rainChance: 51 },
  { day: 'SUN', temp: 28, condition: 'cloudy', rainChance: 35 },
];

export default function WeatherCard({ 
  forecast = DEFAULT_FORECAST,
  title = 'Race Weekend Forecast'
}: WeatherCardProps) {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #15151E 0%, #0F1016 100%)',
      border: '1px solid #1F1F27',
      borderRadius: '12px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxSizing: 'border-box',
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
        {title}
      </h3>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        flex: 1,
        justifyContent: 'center',
      }}>
        {forecast.map((day) => (
          <WeatherRow key={day.day} day={day} />
        ))}
      </div>
    </div>
  );
}

function WeatherRow({ day }: { day: WeatherDay }) {
  const conditionConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
    sunny: { color: '#F59E0B', icon: <SunIcon />, label: 'Clear sky' },
    cloudy: { color: '#A1A1AA', icon: <CloudIcon />, label: 'Cloudy' },
    rain: { color: '#3B82F6', icon: <RainIcon />, label: 'Rain' },
    drizzle: { color: '#60A5FA', icon: <DrizzleIcon />, label: 'Drizzle' },
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
      cursor: 'default',
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
        <span style={{ color: config.color, display: 'flex', alignItems: 'center' }}>
          {config.icon}
        </span>
      </div>

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

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginLeft: '16px',
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#3B82F6' }}>
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
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