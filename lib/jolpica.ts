// ---------------------------------------------------------------------------
// Jolpica-F1 API client — historical results & standings, 1950–present.
// Ergast-compatible successor API. Docs: https://github.com/jolpica/jolpica-f1
// Unauthenticated limit ~200 req/hr, so we cache with generous revalidate.
// ---------------------------------------------------------------------------

const JOLPICA_BASE = 'https://api.jolpi.ca/ergast/f1';

async function jolpica<T>(path: string, revalidateSeconds: number): Promise<T | null> {
  try {
    const res = await fetch(`${JOLPICA_BASE}${path}.json`, {
      next: { revalidate: revalidateSeconds },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export interface JolpicaDriver {
  driverId: string;
  permanentNumber?: string;
  code?: string;
  givenName: string;
  familyName: string;
  nationality: string;
  url: string;
}

export interface JolpicaConstructor {
  constructorId: string;
  name: string;
  nationality: string;
  url: string;
}

export interface JolpicaDriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: JolpicaDriver;
  Constructors: JolpicaConstructor[];
}

export interface JolpicaConstructorStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: JolpicaConstructor;
}

export interface JolpicaCircuit {
  circuitId: string;
  circuitName: string;
  Location: { lat: string; long: string; locality: string; country: string };
  url: string;
}

export interface JolpicaRaceSchedule {
  season: string;
  round: string;
  raceName: string;
  Circuit: JolpicaCircuit;
  date: string;
  time?: string;
  FirstPractice?: { date: string; time: string };
  SecondPractice?: { date: string; time: string };
  ThirdPractice?: { date: string; time: string };
  Qualifying?: { date: string; time: string };
  Sprint?: { date: string; time: string };
  SprintQualifying?: { date: string; time: string };
}

export interface JolpicaRaceResult {
  season: string;
  round: string;
  raceName: string;
  Circuit: JolpicaCircuit;
  date: string;
  Results: {
    position: string;
    positionText: string;
    points: string;
    Driver: JolpicaDriver;
    Constructor: JolpicaConstructor;
    grid: string;
    laps: string;
    status: string;
    Time?: { millis: string; time: string };
  }[];
}

export async function getDriverStandings(season: string = 'current'): Promise<JolpicaDriverStanding[]> {
  const data = await jolpica<any>(`/${season}/driverStandings`, 300);
  return data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [];
}

export async function getConstructorStandings(season: string = 'current'): Promise<JolpicaConstructorStanding[]> {
  const data = await jolpica<any>(`/${season}/constructorStandings`, 300);
  return data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings ?? [];
}

export async function getSeasonSchedule(season: string = 'current'): Promise<JolpicaRaceSchedule[]> {
  const data = await jolpica<any>(`/${season}`, 3600);
  return data?.MRData?.RaceTable?.Races ?? [];
}

export async function getLastRaceResult(): Promise<JolpicaRaceResult | null> {
  const data = await jolpica<any>('/current/last/results', 120);
  return data?.MRData?.RaceTable?.Races?.[0] ?? null;
}

export async function getCurrentSeasonYear(): Promise<string> {
  const data = await jolpica<any>('/current', 3600);
  return data?.MRData?.RaceTable?.season ?? new Date().getFullYear().toString();
}