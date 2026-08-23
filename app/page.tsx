import Link from "next/link";
import {
  getConstructorStandings,
  getDriverStandings,
  getDriverHeadshots,
  getNextRaces,
  getRecentRaces,
  TEAM_COLORS,
  getTeamLogo,
  type ConstructorStanding,
  type DriverStanding,
  type Race,
} from "@/lib/f1";
import {
  Container,
  Hero,
  SectionHeading,
  NewsCard,
  StandingsTable,
  MediaFallback,
  Avatar,
  type StandingRow,
} from "@/components/f1kit";
import F1Button from "@/components/ui/F1Button";
import FaqAccordion from "@/components/FaqAccordion";
import RaceCountdown from "@/components/RaceCountdown";
import GradientWaves from "@/components/GradientWaves";
import MustWatchVideos from "@/components/MustWatchVideos";
import { getBlogPosts, timeAgo } from "@/lib/blog";
import { getPlaylistVideos } from "@/lib/youtube";

const YT_PLAYLIST = "PLo5BbNWSTIgjjZUH3GlSU5Qo029JfgUTh";

const STORIES = [
  { tag: "Race analysis", ts: "7h", title: "How Red Bull won the strategy battle at Zandvoort", author: "yaoyang" },
  { tag: "Sprint weekend", ts: "3d", title: "The sprint format is broken. Here's how we'd fix it.", author: "paddock" },
  { tag: "Rookie watch", ts: "7d", title: "Every rookie's first FP1, ranked and scored", author: "yaoyang" },
  { tag: "Head-to-head", ts: "9d", title: "Norris vs Piastri: the numbers nobody is talking about", author: "dataDesk" },
  { tag: "Feature", ts: "13d", title: "Inside the new 2026 regulations: a technical deep dive", author: "yaoyang" },
  { tag: "Track guide", ts: "17d", title: "Monza: why overtaking is so hard — and what changed", author: "paddock" },
];

export default async function Home() {
  const [drivers, constructors, nextRaces, recentRaces, fbPosts, headshots, videos] =
    await Promise.all([
      getDriverStandings(),
      getConstructorStandings(),
      getNextRaces(7),
      getRecentRaces(4),
      getBlogPosts(6, "Facebook"),
      getDriverHeadshots().catch(() => ({}) as Record<string, string>),
      getPlaylistVideos(YT_PLAYLIST, 6),
    ]);

  const driverRows: StandingRow[] = drivers.slice(0, 10).map((d: DriverStanding) => ({
    position: d.position,
    name: `${d.givenName} ${d.familyName}`,
    sub: d.team.replace(/_/g, " "),
    points: d.points,
    wins: d.wins,
    color: TEAM_COLORS[d.team],
    logo: getTeamLogo(d.team, 80),
    avatar: headshots[d.code] ?? headshots[String(d.number)] ?? undefined,
    href: "/drivers",
  }));

  const conRows: StandingRow[] = constructors.map((c: ConstructorStanding) => ({
    position: c.position,
    name: c.name,
    sub: "Constructor",
    points: c.points,
    color: TEAM_COLORS[c.constructorId],
    logo: getTeamLogo(c.constructorId, 80),
    href: "/constructors",
  }));

  const featured = recentRaces[0];
  const heroTitle = featured
    ? `Race Report: ${featured.raceName}`
    : "The 2026 Season Is Live";
  const heroExcerpt = featured
    ? `Full breakdown, timing deltas and the key moments from ${featured.circuitName}.`
    : "Follow every session, every lap and every overtake with live timing and fan verdicts.";

  const [blogFeatured, ...blogRest] = STORIES;

  return (
    <main className="relative w-full">
      {/* Atmospheric animated background (behind all content).
          GradientWaves is transparent in the sky regions, so we give the
          layer a per-theme base color so the red waves stay visible in both
          light and dark mode. */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#ffe3e6] dark:bg-[#120407]">
        <GradientWaves
          horizonColor="#ff0000"
          waveColor="#EF4444"
          crestColor="#FFFFFF"
          speed={0.4}
          amplitude={2.5}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={1.11}
          zoom={1}
          height={5.5}
          fogDepth={15}
          detail="medium"
          brightness={1}
          opacity={1}
          mouseInteraction
          parallaxStrength={0.5}
          grain
          grainIntensity={0.05}
        />
      </div>

      <Container className="flex flex-col gap-14 py-8">
        {/* Hero */}
        <Hero
          href={featured ? "/calendar" : "/standings"}
          image="/images/ChatGPT_Image_Aug_16_2026_08_13_40_PM.png"
          kicker="Latest"
          title={heroTitle}
          excerpt={heroExcerpt}
          cta="Read the report"
        />

        {/* Next race countdown */}
        {nextRaces[0] && (
          <RaceCountdown
            targetISO={nextRaces[0].dateISO}
            raceName={nextRaces[0].raceName}
            circuitName={nextRaces[0].circuitName}
            country={nextRaces[0].country}
            round={nextRaces[0].round}
            lat={nextRaces[0].lat}
            lng={nextRaces[0].lng}
          />
        )}

        {/* Blog — the main feature */}
        <section className="flex flex-col gap-5">
          <SectionHeading kicker="Blog" title="Latest From The Paddock" href="/stories" linkLabel="Read the blog" />
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <Link
              href="/stories"
              className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[2px] bg-carbon-deep"
            >
              <div className="absolute inset-0">
                <MediaFallback label={blogFeatured.tag?.[0]} sublabel={blogFeatured.tag} />
              </div>
              <span className="absolute inset-0 bg-gradient-to-t from-carbon-deep via-carbon-deep/40 to-transparent" />
              <div className="relative z-10 flex flex-col gap-2 p-6">
                <span className="inline-flex w-fit items-center gap-2 rounded-[2px] bg-f1red px-2.5 py-1 font-display text-[10px] font-semibold tracking-[0.12em] text-white">
                  {blogFeatured.tag}
                </span>
                <h3 className="m-0 max-w-[24ch] font-headline text-[clamp(18px,2.4vw,28px)] font-semibold leading-[1.02] tracking-[-0.01em] text-pebble transition-colors group-hover:text-f1red">
                  {blogFeatured.title}
                </h3>
                <span className="flex items-center gap-2 text-[11px] text-pebble-80">
                  <Avatar name={blogFeatured.author} className="h-5 w-5 text-[10px]" />
                  <span>{blogFeatured.author}</span>
                  <span aria-hidden="true">·</span>
                  <span>{blogFeatured.ts} ago</span>
                </span>
              </div>
            </Link>
            <div className="grid gap-4">
              {blogRest.slice(0, 3).map((s) => (
                <NewsCard
                  key={s.title}
                  href="/stories"
                  tag={s.tag}
                  title={s.title}
                  meta={
                    <>
                      <Avatar name={s.author} className="h-5 w-5 text-[10px]" />
                      <span>{s.author}</span>
                      <span aria-hidden="true">·</span>
                      <span>{s.ts} ago</span>
                    </>
                  }
                />
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blogRest.slice(3).map((s) => (
              <NewsCard
                key={s.title}
                href="/stories"
                tag={s.tag}
                title={s.title}
                meta={
                  <>
                    <Avatar name={s.author} className="h-5 w-5 text-[10px]" />
                    <span>{s.author}</span>
                    <span aria-hidden="true">·</span>
                    <span>{s.ts} ago</span>
                  </>
                }
              />
            ))}
          </div>
        </section>

        {/* Must watch */}
        <section className="flex flex-col gap-5">
          <SectionHeading
            kicker="Watch"
            title="Must Watch"
            href={`https://www.youtube.com/playlist?list=${YT_PLAYLIST}`}
            linkLabel="All videos"
          />
          <MustWatchVideos
            videos={videos.map((v) => ({ id: v.id, title: v.title }))}
          />
        </section>

        {/* 2026 Season standings */}
        <section className="flex flex-col gap-5">
          <SectionHeading kicker="2026" title="Season Standings" href="/standings" linkLabel="Full standings" />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-sm font-semibold tracking-[0.1em] text-pebble-80">
                Drivers
              </h3>
              <StandingsTable rows={driverRows} />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-sm font-semibold tracking-[0.1em] text-pebble-80">
                Constructors
              </h3>
              <StandingsTable rows={conRows} />
            </div>
          </div>
        </section>

        {/* Upcoming races */}
        <section className="flex flex-col gap-5">
          <SectionHeading kicker="Calendar" title="Upcoming Races" href="/calendar" linkLabel="Full schedule" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {nextRaces.map((r: Race) => (
              <NewsCard
                key={r.round}
                href="/calendar"
                tag={`Round ${r.round}`}
                title={r.raceName}
                color="#e10600"
                meta={
                  <>
                    <span>{r.flag}</span>
                    <span>{new Date(r.dateISO).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                  </>
                }
              />
            ))}
          </div>
        </section>

        {/* Recent results */}
        <section className="flex flex-col gap-5">
          <SectionHeading kicker="Results" title="Race Weekend" href="/calendar" linkLabel="All results" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentRaces.map((r: Race) => (
              <NewsCard
                key={r.round}
                href="/calendar"
                tag="Report"
                title={r.raceName}
                color="#e10600"
                meta={
                  <>
                    <span>{r.flag}</span>
                    <span>{r.circuitName.replace("Grand Prix Circuit", "").trim()}</span>
                  </>
                }
              />
            ))}
          </div>
        </section>

        {/* Frequently asked questions */}
        <FaqAccordion />

        {/* Facebook posts as cards */}
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-2 font-display text-[11px] font-semibold tracking-[0.16em] text-f1red">
              <span className="h-3 w-[3px] bg-f1red" aria-hidden="true" />
              Social
            </span>
            <h2 className="m-0 font-headline text-[clamp(20px,2.4vw,30px)] font-semibold uppercase leading-[0.95] tracking-[0.02em] text-pebble">
              From Our Facebook
            </h2>
            <p className="m-0 max-w-[60ch] text-sm leading-[1.4] text-pebble-80">
              Latest posts, race-week reactions and paddock banter from the
              F1 Fan Paddock page.
            </p>
          </div>
          {fbPosts.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {fbPosts.map((p) => (
                <NewsCard
                  key={p.link}
                  href={p.link}
                  image={p.image}
                  tag={p.source}
                  title={p.title}
                  meta={
                    <>
                      <span>{p.author}</span>
                      <span aria-hidden="true">·</span>
                      <span>{timeAgo(p.pubDate)}</span>
                    </>
                  }
                />
              ))}
            </div>
          ) : (
            <p className="m-0 rounded-[2px] bg-pebble-5 p-6 text-sm text-pebble-80">
              No Facebook posts yet. Set{" "}
              <code className="font-mono text-pebble">FB_RSS_URL</code> in{" "}
              <code className="font-mono text-pebble">.env.local</code> to a
              Facebook-page RSS feed (from rss.app / fetchrss) and they&apos;ll
              appear here as cards.
            </p>
          )}
        </section>

        {/* CTA band */}
        <section className="flex flex-col items-start gap-4 rounded-[2px] bg-f1red px-6 py-10 md:px-12 md:py-14">
            <h2 className="m-0 max-w-[20ch] font-headline text-[clamp(24px,4vw,44px)] font-semibold uppercase leading-[0.95] tracking-[0.01em] text-white">
            Find Your People. Find Your Next Race.
          </h2>
          <p className="m-0 max-w-[60ch] text-sm text-white/85">
            Lap-by-lap verdicts from verified fans, live timing and the full 2026
            story — all in one paddock.
          </p>
          <F1Button href="/standings" variant="primary" className="!bg-white !text-[#15151e]">
            Explore Standings →
          </F1Button>
        </section>
      </Container>
    </main>
  );
}
