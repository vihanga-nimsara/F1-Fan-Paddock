import {
  getConstructorStandings,
  getDriverStandings,
  getDriverHeadshots,
  getTeamLogo,
  TEAM_COLORS,
  type ConstructorStanding,
  type DriverStanding,
} from "@/lib/f1";
import {
  Container,
  Pill,
  SectionHeading,
  type StandingRow,
} from "@/components/f1kit";
import StandingsTabs from "@/components/StandingsTabs";

export const metadata = {
  title: "Standings — F1 Fan Paddock",
};

export default async function StandingsPage() {
  const [drivers, constructors, headshots] = await Promise.all([
    getDriverStandings(),
    getConstructorStandings(),
    getDriverHeadshots().catch(() => ({}) as Record<string, string>),
  ]);

  const driverRows: StandingRow[] = drivers.map((d: DriverStanding) => ({
    position: d.position,
    name: `${d.givenName} ${d.familyName}`,
    sub: `${d.code} · ${d.team.replace(/_/g, " ")}`,
    points: d.points,
    wins: d.wins,
    color: TEAM_COLORS[d.team],
    logo: getTeamLogo(d.team, 80),
    avatar: headshots[d.code] ?? headshots[String(d.number)] ?? undefined,
    href: "/drivers",
  }));

  const conRows: StandingRow[] = constructors.map((c: ConstructorStanding) => ({
    position: c.position,
    name: c.name,
    sub: "Constructor",
    points: c.points,
    wins: c.wins,
    color: TEAM_COLORS[c.constructorId],
    logo: getTeamLogo(c.constructorId, 80),
    href: "/constructors",
  }));

  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-8 py-8">
        <SectionHeading
          kicker="2026"
          title="Season Standings"
          linkLabel=""
        />
        <div className="flex items-center gap-2">
          <Pill tone="accent">Live</Pill>
          <span className="text-xs text-pebble-80">
            Championship points update after every session.
          </span>
        </div>

        <StandingsTabs driverRows={driverRows} conRows={conRows} />
      </Container>
    </main>
  );
}
