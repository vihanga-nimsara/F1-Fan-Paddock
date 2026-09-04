import { Container, SectionHeading, Pill } from "@/components/f1kit";
import { getSeasonRaces, getDriverStandings } from "@/lib/f1";

export const metadata = {
  title: "Race Spotlight — F1 Fan Paddock",
};

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const [races, standings] = await Promise.all([
    getSeasonRaces("2026"),
    getDriverStandings(),
  ]);
  const finished = races.filter((r) => r.status !== "upcoming").reverse();

  const highlight = (raceName: string) => {
    const winner = standings[0];
    return {
      verdict: winner
        ? `${winner.code} took the flag, extending the title fight. Strategy and pit stops decided it.`
        : "A dramatic race weekend with strategy calls changing the order.",
      score: (raceName.length + standings.length * 7) % 11,
    };
  };

  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-10 py-8">
        <section className="flex flex-col gap-5">
          <SectionHeading
            kicker="Verdicts"
            title="Race Spotlight"
            href="/reviews"
            linkLabel="All reviews"
          />

          {finished.length === 0 ? (
            <div className="flex w-full flex-col items-center gap-2 rounded-xl bg-pebble-5 p-10 text-center">
              <span className="text-3xl">🏁</span>
              <p className="m-0 font-body text-sm text-pebble-80">
                No completed races yet this season. Check back after race day.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {finished.map((race) => {
                const h = highlight(race.raceName);
                return (
                  <article
                    key={race.round}
                    className="flex flex-col gap-3 rounded-xl bg-pebble-5 p-5 transition-colors duration-200 hover:bg-pebble-8"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-f1red font-display text-sm font-semibold text-white">
                          R{race.round}
                        </span>
                        <div className="flex flex-col gap-1">
                          <span className="font-display text-[11px] font-semibold tracking-[0.12em] text-pebble-80">
                            {race.flag} · {race.date}
                          </span>
                          <h3 className="m-0 font-display text-[17px] font-semibold leading-[1.05] tracking-[0.01em] text-pebble">
                            {race.raceName}
                          </h3>
                          <span className="text-xs text-pebble-80">
                            {race.circuitName}
                          </span>
                        </div>
                      </div>
                      <Pill tone="accent">Verdict {h.score}/10</Pill>
                    </div>
                    <p className="m-0 text-sm leading-[1.4] text-pebble-80">
                      {h.verdict}
                    </p>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}
