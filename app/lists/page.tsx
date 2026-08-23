import Link from "next/link";
import {
  Container,
  SectionHeading,
  StandingsTable,
  Pill,
  type StandingRow,
} from "@/components/f1kit";
import { getDriverStandings, TEAM_COLORS } from "@/lib/f1";

export const metadata = {
  title: "My Lists — F1 Fan Paddock",
};

export const revalidate = 3600;

export default async function ListsPage() {
  const drivers = await getDriverStandings();
  const savedDrivers = drivers.slice(0, 4);

  const rows: StandingRow[] = savedDrivers.map((d) => ({
    position: d.position,
    name: `${d.givenName} ${d.familyName}`,
    sub: d.team.replace(/_/g, " "),
    points: d.points,
    color: TEAM_COLORS[d.team],
    href: "/drivers",
  }));

  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-10 py-8">
        <section className="flex flex-col gap-5">
          <SectionHeading kicker="Your Paddock" title="My Lists" />

          <div className="flex flex-col gap-3 rounded-[2px] bg-pebble-5 p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="m-0 font-display text-base font-semibold tracking-[0.02em] text-pebble">
                Followed Drivers
              </h3>
              <Pill tone="muted">Sample list</Pill>
            </div>
            <p className="m-0 text-xs text-pebble-80">
              A sample list from the current standings. Sign in to customize.
            </p>
            <StandingsTable rows={rows} />
            <p className="mt-1 text-xs text-pebble-80">
              Want to build your own lists?{" "}
              <Link
                href="/drivers"
                className="font-medium text-f1red underline-offset-2 hover:underline"
              >
                Browse all drivers
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 rounded-[2px] bg-pebble-5 p-5">
            <h3 className="m-0 font-display text-base font-semibold tracking-[0.02em] text-pebble">
              Saved Stories
            </h3>
            <p className="m-0 text-xs text-pebble-80">
              No saved stories yet. Open any article in{" "}
              <Link
                href="/stories"
                className="font-medium text-f1red underline-offset-2 hover:underline"
              >
                Paddock Stories
              </Link>{" "}
              to bookmark it here.
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}
