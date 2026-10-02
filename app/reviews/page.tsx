import { Container, SectionHeading, Pill } from "@/components/f1kit";
import {
  getSeasonRaceReviews,
  TEAM_COLORS,
  flagImage,
  type RaceReview,
} from "@/lib/f1";
import { Flag } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Race Spotlight", path: "/reviews" });

export const dynamic = "force-dynamic";

function verdictLine(r: RaceReview): string {
  if (!r.winner || !r.winner.code) return "No result yet.";
  const w = r.winner;
  const team = w.constructorId.replace(/_/g, " ");
  const car = `${w.givenName} ${w.familyName} (${team})`;

  if (r.pole && r.pole.driverId === w.driverId) {
    return `${w.code} converted pole into the win — a lights-to-flag victory for ${car}.`;
  }

  const grid = w.grid;
  if (grid > 1) {
    return `${w.code} climbed from P${grid} to take the win for ${car}.`;
  }

  return `${w.code} took the flag for ${car}.`;
}

function marginText(r: RaceReview): string {
  if (!r.margin) return "—";
  const clean = r.margin.replace(/^\+/, "");
  return `${clean}s`;
}

export default async function ReviewsPage() {
  const reviews = await getSeasonRaceReviews("2026");

  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-10 py-8">
        <section className="flex flex-col gap-5">
          <SectionHeading title="Race Spotlight" />

          {reviews.length === 0 ? (
            <div className="flex w-full flex-col items-center gap-2 rounded-xl bg-pebble-5 p-10 text-center">
              <Flag className="h-10 w-10 text-pebble-80" aria-hidden="true" />
              <p className="m-0 font-body text-sm text-pebble-80">
                No completed races yet this season. Check back after race day.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {reviews.map((race) => {
                const w = race.winner!;
                const teamColor = TEAM_COLORS[w.constructorId] ?? "#e10600";
                return (
                  <article
                    key={race.round}
                    className="flex flex-col gap-3 rounded-xl bg-pebble-5 p-5 transition-colors duration-200 hover:bg-pebble-8"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-sm font-semibold text-white"
                          style={{ backgroundColor: teamColor }}
                        >
                          R{race.round}
                        </span>
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-1.5 font-display text-[11px] font-semibold tracking-[0.12em] text-pebble-80">
                            {(() => {
                              const f = flagImage(race.country);
                              return f ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={f}
                                  alt={race.country}
                                  className="h-3.5 w-5 rounded-[2px] object-cover"
                                />
                              ) : null;
                            })()}
                            {race.date}
                          </span>
                          <h3 className="m-0 font-display text-[17px] font-semibold leading-[1.05] tracking-[0.01em] text-pebble">
                            {race.raceName}
                          </h3>
                          <span className="text-xs text-pebble-80">
                            {race.circuitName}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="m-0 text-sm leading-[1.4] text-pebble-80">
                      {verdictLine(race)}
                    </p>

                    <div className="grid grid-cols-2 gap-2 border-t border-pebble-10 pt-3 text-xs sm:grid-cols-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-display text-[10px] font-semibold tracking-[0.12em] text-pebble-80">
                          WINNER
                        </span>
                        <span className="font-display font-semibold text-pebble">
                          {w.code}
                        </span>
                        <span className="text-pebble-80">
                          {w.givenName} {w.familyName}
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-display text-[10px] font-semibold tracking-[0.12em] text-pebble-80">
                          MARGIN
                        </span>
                        <span className="font-display font-semibold text-pebble">
                          {marginText(race)}
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-display text-[10px] font-semibold tracking-[0.12em] text-pebble-80">
                          POLE
                        </span>
                        <span className="font-display font-semibold text-pebble">
                          {race.pole?.code ?? "—"}
                        </span>
                        <span className="text-pebble-80">
                          {race.pole?.time ?? ""}
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-display text-[10px] font-semibold tracking-[0.12em] text-pebble-80">
                          FASTEST LAP
                        </span>
                        <span className="font-display font-semibold text-pebble">
                          {race.fastestLap?.code ?? "—"}
                        </span>
                        <span className="text-pebble-80">
                          {race.fastestLap?.fastestLapTime ?? ""}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Pill tone="muted">
                        {race.finishers}/{race.starters} finishers
                      </Pill>
                      <Pill tone="accent">
                        P{w.grid - w.position >= 0 ? `+${w.grid - w.position}` : w.grid - w.position}{" "}
                        positions gained
                      </Pill>
                    </div>
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