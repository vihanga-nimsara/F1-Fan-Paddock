import { Container, SectionHeading, Pill } from "@/components/f1kit";
import { getDriverStandings, TEAM_COLORS } from "@/lib/f1";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Seasons", path: "/seasons" });

export const dynamic = "force-dynamic";

export default async function SeasonsPage() {
  const years = ["2026", "2025", "2024", "2023", "2022", "2021", "2020"];
  const champions = await Promise.all(
    years.map(async (year) => {
      try {
        const standings = await getDriverStandings(year);
        const leader = standings[0];
        return {
          year,
          champion: leader?.familyName ?? "—",
          givenName: leader?.givenName,
          code: leader?.code,
          team: leader?.team,
          points: leader?.points,
          wins: leader?.wins,
        };
      } catch {
        return { year, champion: "—", givenName: "", code: "", team: "", points: 0, wins: 0 };
      }
    }),
  );

  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-10 py-8">
        <SectionHeading title="Seasons" />
        <div className="flex w-full flex-col overflow-hidden rounded-xl bg-pebble-5">
          {champions.map((s) => {
            const isCurrent = s.year === "2026";
            const color = s.team ? TEAM_COLORS[s.team] : undefined;
            return (
              <div
                key={s.year}
                className={`flex items-center justify-between gap-3 border-b border-pebble-8 p-4 last:border-b-0 ${
                  isCurrent ? "bg-f1red-10" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-xl font-semibold text-pebble">
                    {s.year}
                  </span>
                  <Pill tone={isCurrent ? "accent" : "muted"}>
                    {isCurrent ? "Current" : "Final"}
                  </Pill>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="font-body text-sm font-medium text-pebble-80"
                  >
                    {isCurrent ? "Leader: " : "Champion: "}
                    <span className="text-pebble">
                      {isCurrent && s.givenName
                        ? `${s.code ?? s.givenName} (${s.points} pts)`
                        : s.champion}
                    </span>
                  </span>
                  {color && (
                    <span
                      className="hidden h-2 w-2 rounded-full sm:block"
                      style={{ backgroundColor: color }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </main>
  );
}