export interface WeatherDay {
  day: string;
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rain' | 'drizzle';
  rainChance: number;
}

const DAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function mapWeatherCode(code: number): WeatherDay['condition'] {
  if (code === 0 || code === 1) return 'sunny';
  if ([2, 3, 45, 48].includes(code)) return 'cloudy';
  if ([51, 53, 55, 56, 57].includes(code)) return 'drizzle';
  return 'rain'; // covers showers, thunderstorms, snow — close enough for a race-day glance
}

const FALLBACK: WeatherDay[] = [
  { day: 'FRI', temp: 22, condition: 'cloudy', rainChance: 30 },
  { day: 'SAT', temp: 21, condition: 'drizzle', rainChance: 45 },
  { day: 'SUN', temp: 23, condition: 'sunny', rainChance: 20 },
];

/**
 * Fetches a 3-day (Fri-Sun) forecast for a race weekend from Open-Meteo.
 * raceDateISO should be the race day itself; we fetch from 2 days before it.
 */
export async function getRaceWeekendForecast(
  lat: number,
  lon: number,
  raceDateISO: string
): Promise<WeatherDay[]> {
  try {
    const raceDate = new Date(raceDateISO);
    if (isNaN(raceDate.getTime())) return FALLBACK;

    const startDate = new Date(raceDate);
    startDate.setUTCDate(startDate.getUTCDate() - 2);

    const fmt = (d: Date) => d.toISOString().slice(0, 10);

    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&daily=weathercode,temperature_2m_max,precipitation_probability_max` +
      `&timezone=auto&start_date=${fmt(startDate)}&end_date=${fmt(raceDate)}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return FALLBACK;

    const data = await res.json();
    const daily = data?.daily;
    if (!daily?.time?.length) return FALLBACK;

    return daily.time.map((iso: string, i: number) => ({
      day: DAY_LABELS[new Date(iso).getUTCDay()],
      temp: Math.round(daily.temperature_2m_max[i]),
      condition: mapWeatherCode(daily.weathercode[i]),
      rainChance: daily.precipitation_probability_max?.[i] ?? 0,
    }));
  } catch {
    return FALLBACK;
  }
}