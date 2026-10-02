import { Container, SectionHeading, Pill } from "@/components/f1kit";
import { pageMetadata } from "@/lib/seo";
import {
  BrickWall,
  CarFront,
  Gauge,
  Snowflake,
  Trophy,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const metadata = pageMetadata({ title: "Showcase", path: "/showcase" });

const SHOWCASES: {
  icon: LucideIcon;
  title: string;
  tag: string;
  desc: string;
}[] = [
  {
    icon: CarFront,
    title: "Overtake of the Season",
    tag: "Editors' Choice",
    desc: "The boldest late-braking move of 2026, replayed frame by frame.",
  },
  {
    icon: Gauge,
    title: "Pit Stop Masters",
    tag: "Numbers",
    desc: "The fastest pit crews and sub-2-second stops ranked by timing data.",
  },
  {
    icon: Trophy,
    title: "Rookie Class of 2026",
    tag: "People",
    desc: "Meet the newest drivers on the grid and their standout moments.",
  },
  {
    icon: Snowflake,
    title: "Cooling Strategies",
    tag: "Tech",
    desc: "How teams manage temperatures at the hottest circuits of the year.",
  },
  {
    icon: BrickWall,
    title: "The Red Wall",
    tag: "Tifosi",
    desc: "A fan gallery from the paddock, captured by the community.",
  },
  {
    icon: Wrench,
    title: "Garage Diaries",
    tag: "Behind the Scenes",
    desc: "A week inside the garage leading up to the Dutch Grand Prix.",
  },
];

export default function ShowcasePage() {
  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-10 py-8">
        <section className="flex flex-col gap-5">
          <SectionHeading title="Showcases" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SHOWCASES.map((s) => (
              <article
                key={s.title}
                className="group flex flex-col gap-3 rounded-xl bg-pebble-5 p-5 transition-colors duration-200 hover:bg-pebble-8"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-f1red-15 to-pebble-8">
                  <s.icon className="h-7 w-7 text-f1red" aria-hidden="true" />
                </span>
                <Pill tone="muted">{s.tag}</Pill>
                <h3 className="m-0 font-display text-[17px] font-semibold leading-[1.05] tracking-[0.01em] text-pebble">
                  {s.title}
                </h3>
                <p className="m-0 text-sm leading-[1.4] text-pebble-80">
                  {s.desc}
                </p>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
