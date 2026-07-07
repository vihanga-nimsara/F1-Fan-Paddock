// ---------------------------------------------------------------------------
// OpenF1 API client — historical session data (2023 onwards), free & unauthenticated.
// Docs: https://openf1.org/
//
// IMPORTANT: as of the free/Community tier, OpenF1 only serves *historical*
// data (a session becomes "historical" ~30 min after it ends). Live,
// in-progress session data now requires a paid Sponsor plan (currently
// €9.90/mo) via REST/MQTT/WebSocket. On the free tier, calls made during a
// live session may return empty results — every function below already
// fails soft (returns [] / null) so the UI degrades to an empty state
// instead of crashing. See getLatestPositions/getLatestIntervals callers
// for the user-facing messaging around this.
//
// Free tier limits: 3 req/s, 30 req/min — we cache aggressively via Next's
// fetch `next.revalidate` to stay well inside that.
// ---------------------------------------------------------------------------

const OPENF1_BASE = 'https://api.openf1.org/v1';

async function of1<T>(path: string, revalidateSeconds: number): Promise<T[]> {
  try {
    const res = await fetch(`${OPENF1_BASE}${path}`, {
      next: { revalidate: revalidateSeconds },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return [];
    return (await res.json()) as T[];
  } catch {
    return [];
  }
}

export interface OpenF1Meeting {
  meeting_key: number;
  meeting_name: string;
  meeting_official_name: string;
  location: string;
  country_name: string;
  circuit_short_name: string;
  date_start: string;
  year: number;
}

export interface OpenF1Session {
  session_key: number;
  meeting_key: number;
  session_name: string; // "Practice 1", "Qualifying", "Race", "Sprint", etc.
  session_type: string; // "Practice" | "Qualifying" | "Race"
  date_start: string;
  date_end: string;
  location: string;
  country_name: string;
  circuit_short_name: string;
  year: number;
}

export interface OpenF1Driver {
  driver_number: number;
  broadcast_name: string;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
  headshot_url: string | null;
}

export interface OpenF1Position {
  driver_number: number;
  position: number;
  date: string;
}

export interface OpenF1Interval {
  driver_number: number;
  gap_to_leader: number | string | null;
  interval: number | string | null;
  date: string;
}

export interface OpenF1Weather {
  air_temperature: number;
  track_temperature: number;
  humidity: number;
  rainfall: number;
  wind_speed: number;
  wind_direction: number;
  date: string;
}

export interface OpenF1RaceControl {
  date: string;
  category: string;
  message: string;
  flag: string | null;
  scope: string | null;
  driver_number: number | null;
}

export interface OpenF1LapTime {
  driver_number: number;
  lap_number: number;
  lap_duration: number | null;
  date_start: string;
}

/** Most recent (or currently live) session, regardless of type. */
export async function getLatestSession(): Promise<OpenF1Session | null> {
  const sessions = await of1<OpenF1Session>('/sessions?session_key=latest', 30);
  return sessions[0] ?? null;
}

export async function getMeeting(meetingKey: number): Promise<OpenF1Meeting | null> {
  const meetings = await of1<OpenF1Meeting>(`/meetings?meeting_key=${meetingKey}`, 300);
  return meetings[0] ?? null;
}

export async function getSessionsForMeeting(meetingKey: number): Promise<OpenF1Session[]> {
  return of1<OpenF1Session>(`/sessions?meeting_key=${meetingKey}`, 60);
}

export async function getDrivers(sessionKey: number): Promise<OpenF1Driver[]> {
  return of1<OpenF1Driver>(`/drivers?session_key=${sessionKey}`, 120);
}

/** Latest known running order for a session (dedupes to one row per driver). */
export async function getLatestPositions(sessionKey: number): Promise<OpenF1Position[]> {
  const rows = await of1<OpenF1Position>(`/position?session_key=${sessionKey}`, 20);
  const latestByDriver = new Map<number, OpenF1Position>();
  for (const row of rows) {
    const existing = latestByDriver.get(row.driver_number);
    if (!existing || new Date(row.date) > new Date(existing.date)) {
      latestByDriver.set(row.driver_number, row);
    }
  }
  return [...latestByDriver.values()].sort((a, b) => a.position - b.position);
}

export async function getLatestIntervals(sessionKey: number): Promise<OpenF1Interval[]> {
  const rows = await of1<OpenF1Interval>(`/intervals?session_key=${sessionKey}`, 20);
  const latestByDriver = new Map<number, OpenF1Interval>();
  for (const row of rows) {
    const existing = latestByDriver.get(row.driver_number);
    if (!existing || new Date(row.date) > new Date(existing.date)) {
      latestByDriver.set(row.driver_number, row);
    }
  }
  return [...latestByDriver.values()];
}

export async function getLatestWeather(sessionKey: number): Promise<OpenF1Weather | null> {
  const rows = await of1<OpenF1Weather>(`/weather?session_key=${sessionKey}`, 60);
  return rows.length ? rows[rows.length - 1] : null;
}

export async function getRaceControlMessages(sessionKey: number): Promise<OpenF1RaceControl[]> {
  const rows = await of1<OpenF1RaceControl>(`/race_control?session_key=${sessionKey}`, 30);
  return rows.slice(-12).reverse();
}

export async function getFastestLaps(sessionKey: number): Promise<OpenF1LapTime[]> {
  const rows = await of1<OpenF1LapTime>(`/laps?session_key=${sessionKey}`, 60);
  return rows.filter((l) => l.lap_duration != null);
}

export function isSessionLive(session: OpenF1Session | null): boolean {
  if (!session) return false;
  const now = Date.now();
  const start = new Date(session.date_start).getTime();
  const end = new Date(session.date_end).getTime();
  return now >= start && now <= end;
}