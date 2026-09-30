import { Container, SectionHeading, Pill } from "@/components/f1kit";
import { getSeasonRaces } from "@/lib/f1";
import { pageMetadata } from "@/lib/seo";
import {
  ChartColumn,
  Flag,
  Newspaper,
  Play,
  RadioTower,
  type LucideIcon,
} from "lucide-react";

export const metadata = pageMetadata({ title: "Release Schedule", path: "/schedule" });

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const races = await getSeasonRaces("2026");
  const nextRace = races.find((r) => r.status === "upcoming");

  const items: { type: string; cadence: string; icon: LucideIcon; desc: string }[] = [
    {
      type: "Weekly Verdict",
      cadence: "Every Monday",
      icon: Newspaper,
      desc: "Lap-by-lap verdicts and reaction after each race weekend.",
    },
    {
      type: "Standings Refresh",
      cadence: "After every session",
      icon: ChartColumn,
      desc: "Drivers' and constructors' standings updated from official timing.",
    },
    {
      type: "Live Dashboard",
      cadence: "During race weekends",
      icon: RadioTower,
      desc: "Real-time positions and gaps on the dashboard.",
    },
    {
      type: "Paddock Stories",
      cadence: "Daily",
      icon: Newspaper,
      desc: "Fresh F1 news from Formula1.com, ESPN F1, and BBC Sport.",
    },
    {
      type: "Race Video",
      cadence: "After the flag",
      icon: Play,
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
                className="flex items-start gap-4 rounded-xl bg-pebble-5 p-4 transition-colors duration-200 hover:bg-pebble-8"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-f1red-15 text-lg">
                  <item.icon className="h-5 w-5 text-f1red" aria-hidden="true" />
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

            <article className="flex items-start gap-4 rounded-xl bg-pebble-8 p-4 ring-1 ring-f1red/30">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-f1red-15 text-lg">
                <Flag className="h-5 w-5 text-f1red" aria-hidden="true" />
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
