import { DRIVER_HEADSHOTS } from "./headshots";

export type DriverStanding = {
  position: number;
  points: number;
  wins: number;
  driverId: string;
  code: string;
  givenName: string;
  familyName: string;
  number: string;
  nationality: string;
  team: string;
  headshot?: string;
};

export type ConstructorStanding = {
  position: number;
  points: number;
  wins: number;
  constructorId: string;
  name: string;
};

export type Race = {
  round: number;
  raceName: string;
  circuitId?: string;
  circuitName: string;
  country: string;
  date: string;
  dateISO: string;
  time?: string | null;
  circuitImage?: string | null;
  flag: string;
  status: "upcoming" | "past";
  daysUntil?: number;
  lat?: number;
  lng?: number;
};

const JOLPICA_BASE = "https://api.jolpi.ca/ergast/f1";
export const OPENF1_BASE = "https://api.openf1.org/v1";

export const TEAM_COLORS: Record<string, string> = {
  mercedes: "#27F4D2",
  ferrari: "#E8002D",
  red_bull: "#3671C6",
  mclaren: "#FF8000",
  aston_martin: "#229971",
  alpine: "#2293D1",
  williams: "#64C4FF",
  rb: "#6692FF",
  haas: "#B6BABD",
  sauber: "#52E252",
  audi: "#52E252",
  cadillac: "#8B8B8B",
  rb_racing: "#6692FF",
  racing_bulls: "#6692FF",
};

export const TEAM_FLAGS: Record<string, string> = {
  mercedes: "🇩🇪",
  ferrari: "🇮🇹",
  red_bull: "🇦🇹",
  mclaren: "🇬🇧",
  aston_martin: "🇬🇧",
  alpine: "🇫🇷",
  williams: "🇬🇧",
  rb: "🇮🇹",
  haas: "🇺🇸",
  sauber: "🇨🇭",
  audi: "🇩🇪",
  cadillac: "🇺🇸",
};

const TEAM_LOGO_SLUG: Record<string, string> = {
  mercedes: "mercedes",
  ferrari: "ferrari",
  red_bull: "redbullracing",
  mclaren: "mclaren",
  aston_martin: "astonmartin",
  alpine: "alpine",
  williams: "williams",
  rb: "racingbulls",
  haas: "haasf1team",
  sauber: "audi",
  audi: "audi",
  cadillac: "cadillac",
};

export function getTeamLogo(team: string, width = 200): string {
  const slug = TEAM_LOGO_SLUG[team] ?? team.replace(/_/g, "");
  return `https://media.formula1.com/image/upload/c_lfill,w_${width}/q_auto/v1740000001/common/f1/2026/${slug}/2026${slug}logowhite.webp`;
}

const COUNTRY_FLAGS: Record<string, string> = {
  Australia: "🇦🇺",
  Bahrain: "🇧🇭",
  China: "🇨🇳",
  Japan: "🇯🇵",
  Monaco: "🇲🇨",
  Canada: "🇨🇦",
  Spain: "🇪🇸",
  Austria: "🇦🇹",
  "Great Britain": "🇬🇧",
  Hungary: "🇭🇺",
  Belgium: "🇧🇪",
  Netherlands: "🇳🇱",
  Italy: "🇮🇹",
  Azerbaijan: "🇦🇿",
  Singapore: "🇸🇬",
  USA: "🇺🇸",
  Brazil: "🇧🇷",
  Mexico: "🇲🇽",
  Qatar: "🇶🇦",
  "Saudi Arabia": "🇸🇦",
  "Abu Dhabi": "🇦🇪",
  "United Arab Emirates": "🇦🇪",
};

// ISO 3166-1 alpha-2 codes, used to build real flag images (emoji flags
// don't render on Windows, so we use flagcdn.com images instead).
const COUNTRY_ISO: Record<string, string> = {
  Australia: "au",
  Bahrain: "bh",
  China: "cn",
  Japan: "jp",
  Monaco: "mc",
  Canada: "ca",
  Spain: "es",
  Austria: "at",
  "Great Britain": "gb",
  Hungary: "hu",
  Belgium: "be",
  Netherlands: "nl",
  Italy: "it",
  Azerbaijan: "az",
  Singapore: "sg",
  USA: "us",
  Brazil: "br",
  Mexico: "mx",
  Qatar: "qa",
  "Saudi Arabia": "sa",
  "Abu Dhabi": "ae",
  "United Arab Emirates": "ae",
};

export function flagImage(country: string, size = 80): string | null {
  const iso = COUNTRY_ISO[country];
  if (!iso) return null;
  return `https://flagcdn.com/w${size}/${iso}.png`;
}

export function isoFlagImage(iso: string | undefined, size = 80): string | null {
  if (!iso) return null;
  return `https://flagcdn.com/w${size}/${iso}.png`;
}

// Country of licence per team, used to render real flag images instead of
// emoji flags (which don't render on Windows).
const TEAM_ISO: Record<string, string> = {
  mercedes: "de",
  ferrari: "it",
  red_bull: "at",
  mclaren: "gb",
  aston_martin: "gb",
  alpine: "fr",
  williams: "gb",
  rb: "it",
  haas: "us",
  sauber: "ch",
  audi: "de",
  cadillac: "us",
};

export function teamFlagImage(team: string, size = 80): string | null {
  const iso = TEAM_ISO[team];
  if (!iso) return null;
  return `https://flagcdn.com/w${size}/${iso}.png`;
}

// Nationality (adjective form) -> ISO 3166-1 alpha-2, used by driver pages.
const NATIONALITY_ISO: Record<string, string> = {
  Italian: "it",
  British: "gb",
  Monegasque: "mc",
  Monégasque: "mc",
  Dutch: "nl",
  Australian: "au",
  French: "fr",
  "New Zealander": "nz",
  Argentine: "ar",
  Brazilian: "br",
  German: "de",
  Spanish: "es",
  Thai: "th",
  Japanese: "jp",
  Canadian: "ca",
  Finnish: "fi",
  Mexican: "mx",
};

export function nationalityFlagImage(
  nationality: string,
  size = 80,
): string | null {
  const iso = NATIONALITY_ISO[nationality];
  if (!iso) return null;
  return `https://flagcdn.com/w${size}/${iso}.png`;
}

// Free, openly-licensed F1 circuit track-map SVGs (julesr0y/f1-circuits-svg).
// Keyed by Jolpica/Ergast circuitId -> repo slug (repo uses "<slug>-N.svg").
const CIRCUIT_SLUGS: Record<string, string> = {
  monaco: "monaco",
  bahrain: "bahrain",
  jeddah: "jeddah",
  miami: "miami",
  imola: "imola",
  catalunya: "catalunya",
  zandvoort: "zandvoort",
  spa: "spa-francorchamps",
  hungaroring: "hungaroring",
  villeneuve: "montreal",
  marina_bay: "marina-bay",
  albert_park: "melbourne",
  rodriguez: "mexico-city",
  vegas: "las-vegas",
  losail: "lusail",
  americas: "austin",
  interlagos: "interlagos",
  yas_marina: "yas-marina",
  silverstone: "silverstone",
  suzuka: "suzuka",
  monza: "monza",
  red_bull_ring: "spielberg",
  shanghai: "shanghai",
  baku: "baku",
  madring: "madring",
  sepang: "sepang",
};

export function getCircuitImage(
  _country: string,
  circuitId?: string | null,
): string | null {
  if (!circuitId) return null;
  const slug = CIRCUIT_SLUGS[circuitId];
  if (!slug) return null;
  return `https://raw.githubusercontent.com/julesr0y/f1-circuits-svg/main/circuits/minimal/black/${slug}-1.svg`;
}

const isServer = typeof window === "undefined";

// OpenF1 is free without auth outside live sessions, but during a live session
// (or for authenticated features) it requires a Bearer token. If you have an
// account, set OPENF1_ACCESS_TOKEN (a token from POST /token) or the credentials
// OPENF1_USERNAME + OPENF1_PASSWORD and we'll fetch an OAuth token automatically.
function openf1Headers(): Record<string, string> {
  const token = process.env.OPENF1_ACCESS_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function fetchJson(url: string, revalidate = 3600) {
  const res = await fetch(url, {
    headers: { Accept: "application/json", ...(isServer ? openf1Headers() : {}) },
    ...(isServer ? { next: { revalidate } } : {}),
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${url}`);
  return res.json();
}

function openf1(path: string): string {
  return isServer ? `${OPENF1_BASE}${path}` : `/api/openf1${path}`;
}

export async function getDriverStandings(
  season = "current",
): Promise<DriverStanding[]> {
  const data = await fetchJson(`${JOLPICA_BASE}/${season}/driverstandings`);
  const list =
    data.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [];
  return list.map((s: any) => ({
    position: Number(s.position),
    points: Number(s.points),
    wins: Number(s.wins),
    driverId: s.Driver.driverId,
    code: s.Driver.code ?? s.Driver.familyName.slice(0, 3).toUpperCase(),
    givenName: s.Driver.givenName,
    familyName: s.Driver.familyName,
    number: s.Driver.permanentNumber,
    nationality: s.Driver.nationality ?? "",
    team: s.Constructors[0]?.constructorId ?? "unknown",
  }));
}

export async function getConstructorStandings(
  season = "current",
): Promise<ConstructorStanding[]> {
  const data = await fetchJson(
    `${JOLPICA_BASE}/${season}/constructorstandings`,
  );
  const list =
    data.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings ??
    [];
  return list.map((s: any) => ({
    position: Number(s.position),
    points: Number(s.points),
    wins: Number(s.wins),
    constructorId: s.Constructor.constructorId,
    name: s.Constructor.name,
  }));
}

export async function getSeasonRaces(
  season = "current",
): Promise<Race[]> {
  const data = await fetchJson(`${JOLPICA_BASE}/${season}/races`);
  const races = data.MRData?.RaceTable?.Races ?? [];
  const now = Date.now();
  return races.map((r: any) => {
    const iso = new Date(`${r.date}T${r.time ?? "00:00:00Z"}`);
    const dateISO = iso.toISOString();
    const msUntil = iso.getTime() - now;
    const daysUntil = Math.max(0, Math.floor(msUntil / 86_400_000));
    return {
      round: Number(r.round),
      raceName: r.raceName,
      circuitId: r.Circuit.circuitId,
      circuitName: r.Circuit.circuitName,
      country: r.Circuit.Location.country,
      date: `${r.date}`,
      dateISO,
      time: r.time ?? null,
      circuitImage: getCircuitImage(
        r.Circuit.Location.country,
        r.Circuit.circuitId,
      ),
      flag: COUNTRY_FLAGS[r.Circuit.Location.country] ?? "🏁",
      lat:
        r.Circuit.Location.lat != null ? Number(r.Circuit.Location.lat) : undefined,
      lng:
        r.Circuit.Location.long != null
          ? Number(r.Circuit.Location.long)
          : undefined,
      status: msUntil <= 0 ? "past" : "upcoming",
      daysUntil,
    };
  });
}

export type LiveSession = {
  session_key: number;
  meeting_key: number;
  session_name: string;
  session_type: string;
  date_start: string;
  date_end: string;
  circuit_short_name: string;
  country_name: string;
  country_code: string;
  location: string;
  is_cancelled?: boolean;
};

export async function getLatestSession(): Promise<LiveSession | null> {
  const sessions: LiveSession[] = await fetchJson(
    openf1("/sessions?year=2026"),
    60,
  );
  const now = Date.now();
  const started = sessions
    .filter((s) => {
      const start = new Date(s.date_start).getTime();
      const end = new Date(s.date_end).getTime();
      return start <= now && !s.is_cancelled;
    })
    .sort((a, b) => b.date_start.localeCompare(a.date_start));
  if (started.length > 0) return started[0];

  // No session has started yet — fall back to the most recent available session
  // so we can still resolve driver headshots.
  const any = sessions
    .filter((s) => !s.is_cancelled)
    .sort((a, b) => b.date_start.localeCompare(a.date_start));
  return any[0] ?? null;
}

export type LiveCarData = {
  driver_number: number;
  session_key: number;
  speed: number;
  rpm: number;
  gear: number;
  drs: number;
  date: string;
};

export async function getLiveCarData(sessionKey: number): Promise<LiveCarData[]> {
  try {
    return await fetchJson(
      openf1(`/car_data?session_key=${sessionKey}&speed%5Bgte%5D=50`),
      15,
    );
  } catch {
    return [];
  }
}

export type LivePosition = {
  driver_number: number;
  position: number;
  date: string;
};

export async function getLivePositions(sessionKey: number): Promise<LivePosition[]> {
  try {
    return await fetchJson(openf1(`/position?session_key=${sessionKey}`), 15);
  } catch {
    return [];
  }
}

export type DriverInfo = {
  driver_number: number;
  driver_code: string;
  first_name: string;
  last_name: string;
  team_name: string;
  full_name: string;
  country_code: string;
  headshot_url?: string;
  name_acronym?: string;
};

export async function getDrivers(sessionKey?: number): Promise<DriverInfo[]> {
  try {
    const q = sessionKey ? `?session_key=${sessionKey}` : "";
    return await fetchJson(openf1(`/drivers${q}`), 3600);
  } catch {
    return [];
  }
}

export async function getDriverHeadshots(
  sessionKey?: number,
  roster?: { code?: string; number?: string }[],
): Promise<Record<string, string>> {
  const map: Record<string, string> = {};
  try {
    let key = sessionKey;
    if (!key) {
      const session = await getLatestSession();
      key = session?.session_key;
    }
    if (key) {
      const drivers = await getDrivers(key);
      for (const d of drivers) {
        if (d.headshot_url) {
          const hi = d.headshot_url.replace(
            ".transform/1col/",
            ".transform/5col/",
          );
          map[String(d.driver_number)] = hi;
          map[d.name_acronym?.toUpperCase() ?? ""] = hi;
        }
      }
    }
  } catch {
    // OpenF1 unavailable — fall through to the curated fallback below.
  }

  // Fill in any roster drivers still missing (or holding a broken/placeholder)
  // headshot using the curated, token-free Wikimedia fallback map.
  if (roster?.length) {
    for (const d of roster) {
      if (!d.code && !d.number) continue;
      const k = d.code?.toUpperCase() ?? String(d.number);
      const existing = map[String(d.number)] ?? map[k];
      const isPlaceholder = existing?.includes("d_driver_fallback_image") === true;
      if (existing && !isPlaceholder) continue;
      const url = DRIVER_HEADSHOTS[d.code?.toUpperCase() ?? ""];
      if (url) {
        if (d.number) map[String(d.number)] = url;
        map[d.code!.toUpperCase()] = url;
      }
    }
  }

  return map;
}

export async function getNextRace(): Promise<Race | null> {
  try {
    const races = await getSeasonRaces("current");
    const upcoming = races
      .filter((r) => r.status === "upcoming")
      .sort(
        (a, b) =>
          new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime(),
      );
    return upcoming[0] ?? null;
  } catch {
    return null;
  }
}

export async function getNextRaces(limit = 7): Promise<Race[]> {
  const races = await getSeasonRaces("current");
  const upcoming = races
    .filter((r) => r.status === "upcoming")
    .sort(
      (a, b) =>
        new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime(),
    )
    .slice(0, limit);
  return upcoming;
}

export async function getRecentRaces(limit = 4): Promise<Race[]> {
  const races = await getSeasonRaces("current");
  return races
    .filter((r) => r.status === "past")
    .slice(-limit)
    .reverse();
}

export type RaceResult = {
  position: number;
  driverId: string;
  code: string;
  givenName: string;
  familyName: string;
  constructorId: string;
  grid: number;
  points: number;
  status: string;
  time: string | null;
  fastestLapRank: number | null;
  fastestLapTime: string | null;
};

export type PoleWinner = {
  position: number;
  driverId: string;
  code: string;
  givenName: string;
  familyName: string;
  constructorId: string;
  time: string | null;
};

export type RaceReview = {
  round: number;
  raceName: string;
  circuitName: string;
  country: string;
  flag: string;
  date: string;
  winner: RaceResult | null;
  margin: string | null;
  pole: PoleWinner | null;
  fastestLap: RaceResult | null;
  finishers: number;
  starters: number;
  laps: string | null;
  lastLapStatuses: Record<string, string>;
};

export async function getRaceResults(
  season: string,
  round: number,
): Promise<RaceResult[]> {
  const data = await fetchJson(`${JOLPICA_BASE}/${season}/${round}/results`);
  const race = data.MRData?.RaceTable?.Races?.[0];
  if (!race) return [];
  return (race.Results ?? []).map((x: any) => ({
    position: Number(x.position),
    driverId: x.Driver.driverId,
    code: x.Driver.code,
    givenName: x.Driver.givenName,
    familyName: x.Driver.familyName,
    constructorId: x.Constructor.constructorId,
    grid: Number(x.grid),
    points: Number(x.points),
    status: x.status,
    time: x.Time?.time ?? null,
    fastestLapRank: x.FastestLap?.rank != null ? Number(x.FastestLap.rank) : null,
    fastestLapTime: x.FastestLap?.Time?.time ?? null,
  }));
}

export async function getQualifying(
  season: string,
  round: number,
): Promise<PoleWinner[]> {
  try {
    const data = await fetchJson(`${JOLPICA_BASE}/${season}/${round}/qualifying`);
    const race = data.MRData?.RaceTable?.Races?.[0];
    if (!race) return [];
    return (race.QualifyingResults ?? []).map((x: any) => ({
      position: Number(x.position),
      driverId: x.Driver.driverId,
      code: x.Driver.code,
      givenName: x.Driver.givenName,
      familyName: x.Driver.familyName,
      constructorId: x.Constructor.constructorId,
      time: x.Q3 ?? x.Q2 ?? x.Q1 ?? null,
    }));
  } catch {
    return [];
  }
}

// Real race verdicts for a season's completed rounds: winner, margin to P2,
// pole sitter, fastest lap and finishing stats — all pulled from race results.
// Results/qualifying calls are run with limited concurrency so we don't trip
// the public API's rate limit on the first (uncached) request.
export async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      try {
        out[idx] = await fn(items[idx]);
      } catch {
        out[idx] = undefined as unknown as R;
      }
    }
  }
  await Promise.all(Array.from({ length: limit }, worker));
  return out;
}

export async function getSeasonRaceReviews(
  season = "current",
): Promise<RaceReview[]> {
  const races = await getSeasonRaces(season);
  const finished = races
    .filter((r) => r.status === "past")
    .sort((a, b) => a.round - b.round)
    .slice(-10);

  const reviews = await mapLimit(finished, 3, async (race) => {
    const [results, poleList] = await Promise.all([
      getRaceResults(season, race.round).catch(() => []),
      getQualifying(season, race.round).catch(() => []),
    ]);

    const fastestLap =
      results.find((r) => r.fastestLapRank === 1) ?? null;

    const winner = [...results]
      .sort((a, b) => a.position - b.position)[0];
    const runnerUp = results.find((x) => x.position === 2);
    const pole = poleList[0] ?? null;

    return {
      round: race.round,
      raceName: race.raceName,
      circuitName: race.circuitName,
      country: race.country,
      flag: race.flag,
      date: race.date,
      winner: winner ?? null,
      margin: runnerUp?.time ?? null,
      pole,
      fastestLap,
      finishers: results.filter((r) =>
        ["Finished", "+1 Lap", "+2 Laps"].includes(r.status),
      ).length,
      starters: results.length,
      laps: null,
      lastLapStatuses: {},
    } satisfies RaceReview;
  });

  return reviews
    .filter((r) => r && r.winner)
    .sort((a, b) => b.round - a.round);
}
