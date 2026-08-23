import { Container, SectionHeading, Pill } from "@/components/f1kit";

export const metadata = {
  title: "Seasons — F1 Fan Paddock",
};

const SEASONS = [
  { year: "2026", label: "Current", champion: "In progress", accent: true },
  { year: "2025", label: "Final", champion: "Antonelli" },
  { year: "2024", label: "Final", champion: "Verstappen" },
  { year: "2023", label: "Final", champion: "Verstappen" },
  { year: "2022", label: "Final", champion: "Verstappen" },
  { year: "2021", label: "Final", champion: "Verstappen" },
  { year: "2020", label: "Final", champion: "Hamilton" },
];

export default function SeasonsPage() {
  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-10 py-8">
        <SectionHeading kicker="Archive" title="Seasons" linkLabel="" />
        <div className="flex w-full flex-col overflow-hidden rounded-[2px] bg-pebble-5">
          {SEASONS.map((s) => (
            <div
              key={s.year}
              className={`flex items-center justify-between gap-3 border-b border-pebble-8 p-4 last:border-b-0 ${
                s.accent ? "bg-f1red-10" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-display text-xl font-semibold text-pebble">
                  {s.year}
                </span>
                <Pill tone={s.accent ? "accent" : "muted"}>{s.label}</Pill>
              </div>
              <span className="font-body text-sm font-medium text-pebble-80">
                Champion: <span className="text-pebble">{s.champion}</span>
              </span>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
