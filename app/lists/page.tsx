import Link from "next/link";
import {
  Container,
  SectionHeading,
  StandingsTable,
  Pill,
  type StandingRow,
} from "@/components/f1kit";
import { getDriverStandings, TEAM_COLORS } from "@/lib/f1";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "My Lists", path: "/lists" });

export const dynamic = "force-dynamic";

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

          <div className="flex flex-col gap-3 rounded-xl bg-pebble-5 p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="m-0 font-display text-base font-semibold tracking-[0.02em] text-pebble">
                Followed Drivers
              </h3>
              <Pill tone="muted">Top 4</Pill>
            </div>
            <p className="m-0 text-xs text-pebble-80">
              The current championship leaders you can track here. Bookmarking
              and custom lists are on the way.
            </p>
            <StandingsTable rows={rows} />
            <p className="mt-1 text-xs text-pebble-80">
              Want to follow other drivers?{" "}
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
          <div className="flex flex-col gap-3 rounded-xl bg-pebble-5 p-5">
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
              once bookmarking ships.
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}
