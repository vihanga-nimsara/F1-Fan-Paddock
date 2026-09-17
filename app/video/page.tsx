import { Container, SectionHeading } from "@/components/f1kit";
import YouTubePlayer from "@/components/YouTubePlayer";
import { getPlaylistVideos } from "@/lib/youtube";

export const metadata = {
  title: "Video — F1 Paddock SL",
};

const YT_PLAYLIST = "PLo5BbNWSTIgjjZUH3GlSU5Qo029JfgUTh";

export default async function VideoPage() {
  const videos = await getPlaylistVideos(YT_PLAYLIST, 6);

  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-10 py-8">
        <SectionHeading kicker="Watch" title="Race Video" linkLabel="" />
        {videos.length === 0 ? (
          <div className="flex w-full flex-col items-center gap-2 rounded-xl bg-pebble-5 p-10 text-center">
            <span className="text-3xl">🎬</span>
            <p className="m-0 font-body text-sm text-pebble-80">
              No videos available yet. Check back after race day.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {videos.map((v) => (
              <article
                key={v.id}
                className="flex flex-col overflow-hidden rounded-xl bg-pebble-5"
              >
                <YouTubePlayer videoId={v.id} className="bg-carbon-deep" />
                <div className="flex flex-col gap-1 px-4 pb-4 pt-3">
                  <h2 className="m-0 font-display text-base font-semibold tracking-[0.02em] text-pebble">
                    {v.title}
                  </h2>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
