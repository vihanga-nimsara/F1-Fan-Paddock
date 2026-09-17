import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  getConstructorStandings,
  getTeamLogo,
  TEAM_COLORS,
  TEAM_FLAGS,
} from "@/lib/f1";
import { Container, SectionHeading } from "@/components/f1kit";

export const metadata = {
  title: "Constructors — F1 Paddock SL",
};

export const dynamic = "force-dynamic";

export default async function ConstructorsPage() {
  const constructors = await getConstructorStandings();
  const leader = constructors[0]?.points ?? 1;

  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-10 py-8">
        <SectionHeading
          kicker="2026"
          title="Constructors"
          linkLabel="Standings"
          href="/standings"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {constructors.map((c, i) => {
            const color = TEAM_COLORS[c.constructorId] ?? "#888888";
            const pct = Math.round((c.points / leader) * 100);
            return (
              <Reveal key={c.constructorId} delay={i * 0.04}>
                <Link
                  href="/constructors"
                  className="flex flex-col gap-3 rounded-xl bg-pebble-5 p-4 transition-colors duration-150 hover:bg-pebble-8"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: color }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getTeamLogo(c.constructorId, 120)}
                        alt={c.name}
                        loading="lazy"
                        className="max-h-7 w-auto"
                      />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate font-body text-base font-semibold text-pebble">
                        {c.name}
                      </span>
                      <span className="text-[10px] text-pebble-80">
                        {TEAM_FLAGS[c.constructorId] ?? ""} P{c.position} · {c.wins}{" "}
                        {c.wins === 1 ? "win" : "wins"}
                      </span>
                    </div>
                    <span className="font-display text-2xl font-semibold text-f1red">
                      {c.points}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-pebble-10">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
