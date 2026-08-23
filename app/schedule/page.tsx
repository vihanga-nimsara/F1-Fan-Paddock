import { Container, SectionHeading, Pill } from "@/components/f1kit";
import { getSeasonRaces } from "@/lib/f1";

export const metadata = {
  title: "Release Schedule — F1 Fan Paddock",
};

export const revalidate = 3600;

export default async function SchedulePage() {
  const races = await getSeasonRaces("2026");
  const nextRace = races.find((r) => r.status === "upcoming");

  const items = [
    {
      type: "Weekly Verdict",
      cadence: "Every Monday",
      icon: "🗞️",
      desc: "Lap-by-lap verdicts and reaction after each race weekend.",
    },
    {
      type: "Standings Refresh",
      cadence: "After every session",
      icon: "📊",
      desc: "Drivers' and constructors' standings updated from official timing.",
    },
    {
      type: "Live Dashboard",
      cadence: "During race weekends",
      icon: "📡",
      desc: "Real-time positions and gaps on the dashboard.",
    },
    {
      type: "Paddock Stories",
      cadence: "Daily",
      icon: "📰",
      desc: "Fresh F1 news from ESPN, BBC Sport, and Sky Sports.",
    },
    {
      type: "Race Video",
      cadence: "After the flag",
      icon: "▶️",
      desc: "Highlights and features added to the video section.",
    },
  ];

  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-10 py-8">
        <section className="flex flex-col gap-5">
          <SectionHeading kicker="Updates" title="Release Schedule" />

          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <article
                key={item.type}
                className="flex items-start gap-4 rounded-[2px] bg-pebble-5 p-4 transition-colors duration-200 hover:bg-pebble-8"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] bg-f1red-15 text-lg">
                  {item.icon}
                </span>
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="m-0 font-display text-[15px] font-semibold tracking-[0.02em] text-pebble">
                      {item.type}
                    </h3>
                    <Pill tone="muted">{item.cadence}</Pill>
                  </div>
                  <p className="m-0 text-sm leading-[1.4] text-pebble-80">
                    {item.desc}
                  </p>
                </div>
              </article>
            ))}

            <article className="flex items-start gap-4 rounded-[2px] bg-pebble-8 p-4 ring-1 ring-f1red/30">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] bg-f1red-15 text-lg">
                🏁
              </span>
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0 font-display text-[15px] font-semibold tracking-[0.02em] text-pebble">
                    Up next: Race {nextRace?.round ?? "—"}
                  </h3>
                  <Pill tone="accent">Next race</Pill>
                </div>
                <p className="m-0 text-sm leading-[1.4] text-pebble-80">
                  {nextRace?.raceName ?? "All races complete — see you next season."}
                </p>
              </div>
            </article>
          </div>
        </section>
      </Container>
    </main>
  );
}
