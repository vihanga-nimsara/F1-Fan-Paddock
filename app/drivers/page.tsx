import Link from "next/link";
import {
  getDriverStandings,
  getDriverHeadshots,
  TEAM_COLORS,
  TEAM_FLAGS,
  type DriverStanding,
} from "@/lib/f1";
import { Container, SectionHeading } from "@/components/f1kit";

export const metadata = {
  title: "Drivers — F1 Fan Paddock",
};

export default async function DriversPage() {
  const [drivers, headshots] = await Promise.all([
    getDriverStandings(),
    getDriverHeadshots(),
  ]);

  const driversWithHead = drivers.map((d) => ({
    ...d,
    headshot: headshots[d.number] ?? headshots[d.code] ?? undefined,
  }));

  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-10 py-8">
        <SectionHeading
          kicker="2026"
          title="Drivers"
          linkLabel="Standings"
          href="/standings"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {driversWithHead.map((d) => (
            <DriverCard key={d.driverId} d={d} />
          ))}
        </div>
      </Container>
    </main>
  );
}

function DriverCard({ d }: { d: DriverStanding }) {
  const color = TEAM_COLORS[d.team] ?? "#888888";
  const name = `${d.givenName} ${d.familyName}`;
  return (
    <Link
      href="/drivers"
      className="group flex flex-col overflow-hidden rounded-xl bg-pebble-5 transition-colors duration-150 hover:bg-pebble-8"
    >
      <div className="relative aspect-[84/120] w-full overflow-hidden bg-gradient-to-br from-pebble-10 to-carbon-deep">
        {d.headshot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={d.headshot}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-pebble">
            <span className="h-1 w-3.5 rounded-xl" style={{ background: color }} />
            <span className="font-display text-[2.6rem] font-semibold leading-none">
              {d.number}
            </span>
          </div>
        )}
        <span className="absolute right-2 top-2 rounded-xl bg-f1red px-2 py-0.5 font-display text-[10px] font-semibold text-white">
          P{d.position}
        </span>
      </div>
      <div className="flex flex-col gap-1 p-3">
        <span className="font-body text-sm font-semibold leading-tight text-pebble">
          {name}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[10px] text-pebble-80">
          <span className="h-2 w-2 rounded-xl" style={{ background: color }} />
          {TEAM_FLAGS[d.team] ?? ""} {d.team.replace(/_/g, " ")}
        </span>
        <span className="font-display text-lg font-semibold text-f1red">
          {d.points} <span className="text-xs font-medium text-pebble-50">pts</span>
        </span>
      </div>
    </Link>
  );
}
