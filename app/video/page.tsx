import { Container, SectionHeading } from "@/components/f1kit";
import YouTubePlayer from "@/components/YouTubePlayer";

export const metadata = {
  title: "Video — F1 Fan Paddock",
};

const VIDEOS = [
  {
    id: "bUMK8rYp5yA",
    title: "2026 F1 Season Highlights",
    description:
      "Relive the biggest moments, overtakes, and drama from the 2026 Formula 1 season so far.",
  },
  {
    id: "tt9n2LhJ9Z0",
    title: "Inside The Paddock: Race Week",
    description:
      "Go behind the scenes of a race weekend — the garage, the grid, and the drivers at work.",
  },
];

export default function VideoPage() {
  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-10 py-8">
        <SectionHeading kicker="Watch" title="Race Video" linkLabel="" />
        <div className="grid gap-4 md:grid-cols-2">
          {VIDEOS.map((v) => (
            <article
              key={v.id}
              className="flex flex-col overflow-hidden rounded-xl bg-pebble-5"
            >
              <YouTubePlayer videoId={v.id} className="bg-carbon-deep" />
              <div className="flex flex-col gap-1 px-4 pb-4 pt-3">
                <h2 className="m-0 font-display text-base font-semibold tracking-[0.02em] text-pebble">
                  {v.title}
                </h2>
                <p className="m-0 text-xs leading-relaxed text-pebble-80">
                  {v.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
