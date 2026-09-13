import type { DriverStanding } from "./f1";

export type DriverLink = {
  label: string;
  href: string;
  kind: "wiki" | "official" | "social" | "f1" | "team";
};

export type DriverProfile = {
  driverId: string;
  code: string;
  givenName: string;
  familyName: string;
  number: string;
  team: string;
  position: number;
  points: number;
  wins: number;
  headshot?: string;
  nationality: string;
  flag: string;
  iso2?: string;
  birthplace: string;
  birthDate?: string;
  links: DriverLink[];
};

const FLAGS: Record<string, { flag: string; iso2?: string }> = {
  Italian: { flag: "🇮🇹", iso2: "it" },
  British: { flag: "🇬🇧", iso2: "gb" },
  Monegasque: { flag: "🇲🇨", iso2: "mc" },
  Dutch: { flag: "🇳🇱", iso2: "nl" },
  Australian: { flag: "🇦🇺", iso2: "au" },
  French: { flag: "🇫🇷", iso2: "fr" },
  "New Zealander": { flag: "🇳🇿", iso2: "nz" },
  Argentine: { flag: "🇦🇷", iso2: "ar" },
  Brazilian: { flag: "🇧🇷", iso2: "br" },
  German: { flag: "🇩🇪", iso2: "de" },
  Spanish: { flag: "🇪🇸", iso2: "es" },
  Thai: { flag: "🇹🇭", iso2: "th" },
  Japanese: { flag: "🇯🇵", iso2: "jp" },
  Canadian: { flag: "🇨🇦", iso2: "ca" },
  Finnish: { flag: "🇫🇮", iso2: "fi" },
  Mexican: { flag: "🇲🇽", iso2: "mx" },
};

const TEAM_SITES: Record<string, string> = {
  mercedes: "https://www.mercedesamgf1.com",
  ferrari: "https://www.ferrari.com/en-EN/formula1",
  mclaren: "https://www.mclaren.com/racing/",
  red_bull: "https://www.redbullracing.com",
  rb: "https://www.visarb.com",
  alpine: "https://www.alpinecars.com/formula-1/",
  haas: "https://www.haasf1team.com",
  audi: "https://www.audi-motorsport.com/en/",
  williams: "https://www.williamsf1.com",
  aston_martin: "https://www.astonmartinf1.com",
  cadillac: "https://www.cadillacnews.com",
};

type Curated = {
  wiki: string;
  f1?: string;
  site?: string;
  ig?: { handle: string; url: string };
  x?: { handle: string; url: string };
  birthplace: string;
  birthDate?: string;
};

// Curated metadata for the 2026 grid. `wiki` is the English Wikipedia
// article title; `f1` is the formula1.com driver-page slug.
const CURATED: Record<string, Curated> = {
  antonelli: {
    wiki: "Andrea Kimi Antonelli",
    f1: "andrea-kimi-antonelli",
    birthplace: "Bologna, Italy",
    birthDate: "2006-08-25",
    x: { handle: "@Antonelli_12", url: "https://x.com/Antonelli_12" },
  },
  russell: {
    wiki: "George Russell (racing driver)",
    f1: "george-russell",
    birthplace: "King's Lynn, England",
    birthDate: "1998-02-15",
    ig: { handle: "@georgerussell63", url: "https://www.instagram.com/georgerussell63" },
    x: { handle: "@GeorgeRussell63", url: "https://x.com/GeorgeRussell63" },
  },
  hamilton: {
    wiki: "Lewis Hamilton",
    f1: "lewis-hamilton",
    site: "https://www.lewishamilton.com",
    birthplace: "Stevenage, England",
    birthDate: "1985-01-07",
    ig: { handle: "@lewishamilton", url: "https://www.instagram.com/lewishamilton" },
    x: { handle: "@LewisHamilton", url: "https://x.com/LewisHamilton" },
  },
  norris: {
    wiki: "Lando Norris",
    f1: "lando-norris",
    birthplace: "Bristol, England",
    birthDate: "1999-11-13",
    ig: { handle: "@landonorris", url: "https://www.instagram.com/landonorris" },
    x: { handle: "@LandoNorris", url: "https://x.com/LandoNorris" },
  },
  leclerc: {
    wiki: "Charles Leclerc",
    f1: "charles-leclerc",
    birthplace: "Monte Carlo, Monaco",
    birthDate: "1997-10-16",
    ig: { handle: "@charles_leclerc", url: "https://www.instagram.com/charles_leclerc" },
    x: { handle: "@Charles_Leclerc", url: "https://x.com/Charles_Leclerc" },
  },
  max_verstappen: {
    wiki: "Max Verstappen",
    f1: "max-verstappen",
    site: "https://www.verstappen.com",
    birthplace: "Hasselt, Belgium",
    birthDate: "1997-09-30",
    ig: { handle: "@maxverstappen1", url: "https://www.instagram.com/maxverstappen1" },
    x: { handle: "@Max33Verstappen", url: "https://x.com/Max33Verstappen" },
  },
  piastri: {
    wiki: "Oscar Piastri",
    f1: "oscar-piastri",
    birthplace: "Melbourne, Australia",
    birthDate: "2001-04-06",
    ig: { handle: "@oscarpiastri", url: "https://www.instagram.com/oscarpiastri" },
  },
  hadjar: {
    wiki: "Isack Hadjar",
    f1: "isack-hadjar",
    birthplace: "Paris, France",
    birthDate: "2004-09-28",
    ig: { handle: "@isackhadjar", url: "https://www.instagram.com/isackhadjar" },
  },
  lawson: {
    wiki: "Liam Lawson",
    f1: "liam-lawson",
    birthplace: "Hastings, New Zealand",
    birthDate: "2002-02-11",
    ig: { handle: "@liamlawson30", url: "https://www.instagram.com/liamlawson30" },
    x: { handle: "@LiamLawson30", url: "https://x.com/LiamLawson30" },
  },
  gasly: {
    wiki: "Pierre Gasly",
    f1: "pierre-gasly",
    birthplace: "Rouen, France",
    birthDate: "1996-02-07",
    ig: { handle: "@pierregasly", url: "https://www.instagram.com/pierregasly" },
    x: { handle: "@PierreGASLY", url: "https://x.com/PierreGASLY" },
  },
  arvid_lindblad: {
    wiki: "Arvid Lindblad",
    f1: "arvid-lindblad",
    birthplace: "London, England",
    birthDate: "2007-08-08",
    ig: { handle: "@arvidlindblad", url: "https://www.instagram.com/arvidlindblad" },
  },
  colapinto: {
    wiki: "Franco Colapinto",
    f1: "franco-colapinto",
    birthplace: "Buenos Aires, Argentina",
    birthDate: "2003-05-27",
    ig: { handle: "@francocolapinto", url: "https://www.instagram.com/francocolapinto" },
    x: { handle: "@FrancoColapinto", url: "https://x.com/FrancoColapinto" },
  },
  bearman: {
    wiki: "Oliver Bearman",
    f1: "oliver-bearman",
    birthplace: "Chelmsford, England",
    birthDate: "2005-05-08",
    ig: { handle: "@oliverbearman", url: "https://www.instagram.com/oliverbearman" },
  },
  bortoleto: {
    wiki: "Gabriel Bortoleto",
    f1: "gabriel-bortoleto",
    birthplace: "São Paulo, Brazil",
    birthDate: "2004-10-14",
    ig: { handle: "@gabrielbortoleto", url: "https://www.instagram.com/gabrielbortoleto" },
  },
  hulkenberg: {
    wiki: "Nico Hülkenberg",
    f1: "nico-hulkenberg",
    birthplace: "Emmerich am Rhein, Germany",
    birthDate: "1987-08-19",
    x: { handle: "@HulkHulkenberg", url: "https://x.com/HulkHulkenberg" },
  },
  sainz: {
    wiki: "Carlos Sainz Jr.",
    f1: "carlos-sainz",
    birthplace: "Madrid, Spain",
    birthDate: "1994-09-01",
    ig: { handle: "@carlossainz55", url: "https://www.instagram.com/carlossainz55" },
    x: { handle: "@CarlosSainz55", url: "https://x.com/CarlosSainz55" },
  },
  albon: {
    wiki: "Alexander Albon",
    f1: "alexander-albon",
    birthplace: "London, England",
    birthDate: "1996-03-23",
    ig: { handle: "@alex_albon", url: "https://www.instagram.com/alex_albon" },
    x: { handle: "@Albon_F1", url: "https://x.com/Albon_F1" },
  },
  ocon: {
    wiki: "Esteban Ocon",
    f1: "esteban-ocon",
    birthplace: "Évreux, France",
    birthDate: "1996-09-17",
    ig: { handle: "@estebanocon", url: "https://www.instagram.com/estebanocon" },
    x: { handle: "@EstebanOcon", url: "https://x.com/EstebanOcon" },
  },
  alonso: {
    wiki: "Fernando Alonso",
    f1: "fernando-alonso",
    birthplace: "Oviedo, Spain",
    birthDate: "1981-07-29",
    ig: { handle: "@fernandoalo_oficial", url: "https://www.instagram.com/fernandoalo_oficial" },
    x: { handle: "@alo_oficial", url: "https://x.com/alo_oficial" },
  },
  tsunoda: {
    wiki: "Yuki Tsunoda",
    f1: "yuki-tsunoda",
    birthplace: "Sagamihara, Japan",
    birthDate: "2000-05-11",
    ig: { handle: "@yukitsunoda22", url: "https://www.instagram.com/yukitsunoda22" },
  },
  stroll: {
    wiki: "Lance Stroll",
    f1: "lance-stroll",
    birthplace: "Montreal, Canada",
    birthDate: "1998-10-29",
    x: { handle: "@lance_stroll", url: "https://x.com/lance_stroll" },
  },
  bottas: {
    wiki: "Valtteri Bottas",
    f1: "valtteri-bottas",
    birthplace: "Nastola, Finland",
    birthDate: "1989-08-28",
    ig: { handle: "@valtteribottas", url: "https://www.instagram.com/valtteribottas" },
  },
  perez: {
    wiki: "Sergio Pérez",
    f1: "sergio-perez",
    birthplace: "Guadalajara, Mexico",
    birthDate: "1990-01-26",
    ig: { handle: "@checoperez", url: "https://www.instagram.com/checoperez" },
    x: { handle: "@SChecoPerez", url: "https://x.com/SChecoPerez" },
  },
};

// Fallback that still produces a sensible set of links for any future grid
// addition: Wikipedia article titled "<Given> <Family>", the F1 official page
// and everything else derived from the team.
function fallbackCurated(standing: DriverStanding): Curated {
  const name = `${standing.givenName} ${standing.familyName}`
    .replace(/\s+/g, "_");
  return {
    wiki: name,
    f1: name.toLowerCase().replace(/_/g, "-"),
    birthplace: standing.nationality ?? "",
    birthDate: undefined,
  };
}

export function getDriverProfile(standing: DriverStanding): DriverProfile {
  const curated = CURATED[standing.driverId] ?? fallbackCurated(standing);
  const nat =
    FLAGS[standing.nationality] ?? { flag: "🏁" };

  const links: DriverLink[] = [
    {
      label: "Wikipedia",
      href: `https://en.wikipedia.org/wiki/${curated.wiki}`,
      kind: "wiki",
    },
  ];
  if (curated.f1) {
    links.push({
      label: "Formula1.com profile",
      href: `https://www.formula1.com/en/drivers/${curated.f1}`,
      kind: "f1",
    });
  }
  if (curated.site) {
    links.push({ label: "Official website", href: curated.site, kind: "official" });
  }
  const teamSite = TEAM_SITES[standing.team];
  if (teamSite) {
    links.push({
      label: `${standing.team.replace(/_/g, " ")} team site`,
      href: teamSite,
      kind: "team",
    });
  }
  if (curated.ig) {
    links.push({ label: `Instagram ${curated.ig.handle}`, href: curated.ig.url, kind: "social" });
  }
  if (curated.x) {
    links.push({ label: `X / Twitter ${curated.x.handle}`, href: curated.x.url, kind: "social" });
  }

  return {
    driverId: standing.driverId,
    code: standing.code,
    givenName: standing.givenName,
    familyName: standing.familyName,
    number: standing.number,
    team: standing.team,
    position: standing.position,
    points: standing.points,
    wins: standing.wins,
    headshot: standing.headshot,
    nationality: standing.nationality,
    flag: nat.flag,
    iso2: nat.iso2,
    birthplace: curated.birthplace,
    birthDate: curated.birthDate,
    links,
  };
}

export type DriverRaceRow = {
  round: number;
  raceName: string;
  country: string;
  date: string;
  grid: number;
  position: number;
  points: number;
  status: string;
};

export function driverRaceRows(
  results: { round: number; raceName: string; country: string; date: string; rows: import("./f1").RaceResult[] }[],
  driverId: string,
): DriverRaceRow[] {
  return results.flatMap((race) => {
    const r = race.rows.find((x) => x.driverId === driverId);
    if (!r) return [];
    return [
      {
        round: race.round,
        raceName: race.raceName,
        country: race.country,
        date: race.date,
        grid: r.grid,
        position: r.position,
        points: r.points,
        status: r.status,
      },
    ];
  });
}