import Link from "next/link";
import { Container, SectionHeading } from "@/components/f1kit";

export const metadata = {
  title: "About — F1 Fan Paddock",
};

const SECTIONS = [
  {
    title: "The website",
    body: "F1 Fan Paddock is an independent Formula 1 fan site. It brings race analysis, paddock stories, live standings, and video together in one place — a single home for fans who want to follow the season without jumping between a dozen tabs. Everything is built to feel fast, clean, and unmistakably F1.",
  },
  {
    title: "The team",
    body: "F1 Fan Paddock is designed, built, and maintained by an independent team of Formula 1 fans. Zagan is the developer behind the site — from the data pipelines that pull standings and timing to the frontend you're browsing. Hansaka Nethmina runs our Facebook page and brings the F1 knowledge, with the race-weekend context and paddock reads fans want to talk about. It's a passion-driven, fan-run effort with no corporate backing.",
  },
  {
    title: "Data & sources",
    body: "Standings, results, and live timing come from open public APIs (Jolpica-F1 and OpenF1). News is aggregated from a range of publishers via NewsAPI, community posts are pulled from our Facebook page, and the Must Watch videos are drawn from our YouTube playlist. Driver headshots and team logos are served from media.formula1.com.",
  },
  {
    title: "Unofficial & independent",
    body: "This is an unofficial fan project. It is not affiliated with, endorsed by, or connected to Formula 1, the FIA, or any team. All trademarks, logos, and race imagery belong to their respective owners. If you'd like to get in touch, reach out through our Facebook page.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-10 py-8 md:py-12">
        <div className="flex flex-col gap-3">
          <SectionHeading
            kicker="About"
            title="F1 Fan Paddock"
            href="/stories"
            linkLabel="Read the blog"
          />
          <p className="m-0 max-w-[820px] font-body text-sm text-pebble-80">
            Who builds F1 Fan Paddock, what it is, and where the data comes from.
          </p>
        </div>

        <div className="flex w-full max-w-[820px] flex-col gap-8 text-left">
          {SECTIONS.map((s) => (
            <section key={s.title} className="flex flex-col gap-2 text-left">
              <h2 className="m-0 font-display text-lg font-semibold tracking-[0.04em] text-pebble">
                {s.title}
              </h2>
              <p className="m-0 font-body text-base leading-relaxed text-pebble-80">
                {s.body}
              </p>
            </section>
          ))}

          <p className="m-0 border-t border-pebble-15 pt-6 text-left font-body text-base leading-relaxed text-pebble-80">
            Curious who keeps the site running? Meet the{" "}
            <Link
              href="/team"
              className="font-medium text-f1red underline-offset-2 hover:underline"
            >
              team behind F1 Fan Paddock
            </Link>
            . Follow along on{" "}
            <Link
              href="https://web.facebook.com/profile.php?id=61574396222083"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-f1red underline-offset-2 hover:underline"
            >
              Facebook
            </Link>{" "}
            or browse the latest{" "}
            <Link
              href="/stories"
              className="font-medium text-f1red underline-offset-2 hover:underline"
            >
              paddock stories
            </Link>
            .
          </p>
        </div>
      </Container>
    </main>
  );
}
