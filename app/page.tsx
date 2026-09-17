import Link from "next/link";
import Script from "next/script";
import {
  getConstructorStandings,
  getDriverStandings,
  getDriverHeadshots,
  getNextRaces,
  getRecentRaces,
  TEAM_COLORS,
  getTeamLogo,
  flagImage,
  type ConstructorStanding,
  type DriverStanding,
  type Race,
} from "@/lib/f1";
import {
  Container,
  SectionHeading,
  StandingsTable,
  MediaFallback,
  Avatar,
  Hero,
  type StandingRow,
} from "@/components/f1kit";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PostCard from "@/components/PostCard";
import NewsletterForm from "@/components/NewsletterForm";
import StandingsTicker from "@/components/StandingsTicker";
import RaceCountdown from "@/components/RaceCountdown";
import MustWatchVideos from "@/components/MustWatchVideos";
import { getBlogPosts, timeAgo } from "@/lib/blog";
import { getOwnPosts } from "@/lib/own-posts";
import { getPlaylistVideos } from "@/lib/youtube";

const YT_PLAYLIST = "PLo5BbNWSTIgjjZUH3GlSU5Qo029JfgUTh";

export const dynamic = "force-dynamic";

function SectionHeader({
  kicker,
  title,
  href,
  linkLabel = "View all",
}: {
  kicker: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4 border-b border-border pb-3">
      <div>
        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-f1red">
          {kicker}
        </span>
        <h2 className="m-0 font-heading text-2xl font-bold tracking-tight md:text-3xl">
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="group flex shrink-0 items-center gap-1 text-[13px] font-semibold text-muted-foreground transition-colors hover:text-f1red"
        >
          {linkLabel}
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      )}
    </div>
  );
}

export default async function Home() {
  const [drivers, constructors, nextRaces, recentRaces, fbPosts, videos] =
    await Promise.all([
      getDriverStandings(),
      getConstructorStandings(),
      getNextRaces(7),
      getRecentRaces(4),
      getBlogPosts(10, "Facebook"),
      getPlaylistVideos(YT_PLAYLIST, 6),
    ]);

  const headshots = await getDriverHeadshots(undefined, drivers).catch(
    () => ({}) as Record<string, string>,
  );

  const ownPosts = getOwnPosts();
  const [featured, ...moreOwn] = ownPosts;

  const latestPosts = [
    ...moreOwn.map((p) => ({
      id: p.id,
      href: `/stories/${p.id}`,
      image: p.image,
      tag: "Paddock",
      title: p.title,
      excerpt: p.excerpt,
      author: p.author.name,
      pubDate: p.pubDate,
    })),
    ...fbPosts.slice(0, 3).map((p) => ({
      id: null as string | null,
      href: p.link,
      image: p.image,
      tag: p.source,
      title: p.title,
      excerpt: p.description,
      author: p.author,
      pubDate: p.pubDate,
    })),
  ].slice(0, 6);

  const driverRows: StandingRow[] = drivers.slice(0, 10).map((d: DriverStanding) => ({
    position: d.position,
    name: `${d.givenName} ${d.familyName}`,
    sub: d.team.replace(/_/g, " "),
    points: d.points,
    wins: d.wins,
    color: TEAM_COLORS[d.team],
    logo: getTeamLogo(d.team, 80),
    avatar: headshots[d.code] ?? headshots[String(d.number)] ?? undefined,
    href: `/drivers/${d.driverId}`,
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

  const tickerItems = drivers.slice(0, 10).map((d: DriverStanding) => ({
    position: d.position,
    code: d.code ?? d.familyName.slice(0, 3).toUpperCase(),
    points: d.points,
    color: TEAM_COLORS[d.team],
    avatar: headshots[d.code] ?? headshots[String(d.number)] ?? undefined,
  }));

  const next = nextRaces[0];
  const nextDay = next
    ? new Date(next.dateISO).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      })
    : null;
  const nextTime = next?.time ? `${next.time.slice(0, 5)} UTC` : null;

  return (
    <main className="w-full">
      {/* ------------------------------ Hero banner ------------------------------ */}
      <Hero
        image="/images/ChatGPT_Image_Aug_16_2026_08_13_40_PM.png"
        kicker="F1 Paddock SL"
        title="The Paddock Bulletin"
        excerpt="Race analysis, paddock stories and live Formula 1 stats — in Sinhala and English."
        primaryCta="Explore stories"
        primaryHref="/stories"
        secondaryCta="Live standings"
        secondaryHref="/standings"
      />

      {/* ------------------------------ Featured story ------------------------------ */}
      {featured && (
        <section className="border-b border-border">
          <Container className="py-8 md:py-14">
            <Link href={`/stories/${featured.id}`} className="group grid items-center gap-8 md:grid-cols-2 md:gap-12">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-foreground/10">
                {featured.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <MediaFallback label="The Paddock" />
                )}
                <Badge className="absolute left-4 top-4 gap-1 bg-f1red py-1 text-white hover:bg-f1red-dark">
                  Featured story
                </Badge>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-[12px] font-medium text-muted-foreground">
                  <span className="font-semibold uppercase tracking-[0.16em] text-f1red">
                    The Paddock
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{timeAgo(featured.pubDate)}</span>
                </div>
                <h1 className="m-0 font-heading text-[clamp(1.9rem,4.5vw,3.2rem)] font-bold leading-[1.05] tracking-tight group-hover:text-f1red">
                  {featured.title}
                </h1>
                <p className="m-0 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <Avatar name={featured.author.name} className="h-9 w-9 text-sm" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold">{featured.author.name}</span>
                    <span className="text-[12px] text-muted-foreground">
                      {featured.readTime} · {featured.content.length} sections
                    </span>
                  </div>
                </div>
                <span className="mt-1 inline-flex w-fit items-center">
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-f1red px-4 py-2.5 text-sm font-medium text-white transition-colors group-hover:bg-f1red-dark">
                    Read the story <span aria-hidden="true">→</span>
                  </span>
                </span>
              </div>
            </Link>
          </Container>
        </section>
      )}

      {/* ------------------------------ Championship ticker ------------------------------ */}
      <StandingsTicker items={tickerItems} href="/standings" />

      {/* ------------------------------ Main grid ------------------------------ */}
      <Container className="grid gap-10 py-8 md:py-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
        {/* Main column */}
        <div className="flex min-w-0 flex-col gap-14">
          {/* Latest posts */}
          <section>
            <SectionHeader kicker="Blog" title="Latest from the Paddock" href="/stories" linkLabel="All posts" />
            <div className="grid gap-5 sm:grid-cols-2">
              {latestPosts.map((p) => (
                  <PostCard
                    key={p.id ?? p.href}
                    href={p.href}
                    image={p.image}
                    tag={p.tag}
                    title={p.title}
                    excerpt={p.excerpt}
                    meta={
                      <>
                        <span className="font-medium text-foreground/80">
                          {p.author}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{timeAgo(p.pubDate)}</span>
                      </>
                    }
                  />
                ))}
            </div>
          </section>

          {/* Must watch */}
          <section>
            <SectionHeader
              kicker="Watch"
              title="Must Watch"
              href={`https://www.youtube.com/playlist?list=${YT_PLAYLIST}`}
              linkLabel="All videos"
            />
            <MustWatchVideos videos={videos.map((v) => ({ id: v.id, title: v.title }))} />
          </section>

          {/* From Facebook */}
          <section className="flex flex-col gap-5">
            <SectionHeader kicker="Community" title="From Our Facebook" />
            <div
              className="sk-ww-facebook-page-posts"
              data-embed-id="25713675"
            />
            <Script
              src="https://widgets.sociablekit.com/facebook-page-posts/widget.js"
              defer
            />
            {fbPosts.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-3">
                {fbPosts.slice(0, 3).map((p) => (
                  <PostCard
                    key={p.link}
                    href={p.link}
                    image={p.image}
                    tag="Facebook"
                    title={p.title}
                    excerpt={p.description}
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
              <p className="rounded-xl border border-dashed text-sm text-muted-foreground">
                No Facebook posts to show yet — check back soon.
              </p>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="flex min-w-0 flex-col gap-6 lg:sticky lg:top-20 lg:self-start">
          {next && (
            <section className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative flex h-32 items-center justify-center bg-muted p-4">
                {next.circuitImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={next.circuitImage}
                    alt={`${next.circuitName} circuit`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-3xl">{next.flag}</span>
                )}
                {(() => {
                  const flag = flagImage(next.country);
                  return flag ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={flag}
                      alt={next.country}
                      className="absolute right-2 bottom-2 h-5 w-8 rounded-sm object-cover shadow"
                    />
                  ) : null;
                })()}
              </div>
              <div className="flex flex-col gap-2 p-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-f1red">
                  Next race · Round {next.round}
                </span>
                <h3 className="m-0 font-heading text-lg font-bold tracking-tight">{next.raceName}</h3>
                <p className="m-0 text-[13px] text-muted-foreground">
                  {next.circuitName} · {next.country}
                </p>
                {nextDay && (
                  <p className="m-0 text-[13px] font-semibold">
                    {nextDay}
                    {nextTime ? ` · ${nextTime}` : ""}
                  </p>
                )}
                <Button asChild variant="outline" size="sm" className="mt-1 w-full">
                  <Link href="/calendar">Full schedule</Link>
                </Button>
              </div>
            </section>
          )}

          <section className="rounded-2xl border border-f1red/25 bg-f1red/5 p-5">
            <h3 className="m-0 font-heading text-lg font-bold tracking-tight">
              The Paddock newsletter
            </h3>
            <p className="mb-3 mt-1 text-[13px] leading-relaxed text-muted-foreground">
              Race-weekend verdicts, fresh stories and the fastest F1 data — in
              your inbox.
            </p>
            <NewsletterForm compact />
          </section>

          <section className="rounded-2xl border border-border bg-card p-5">
            <h3 className="mb-3 font-heading text-base font-bold tracking-tight">
              Championship <span className="text-muted-foreground">· Top 5</span>
            </h3>
            <StandingsTable rows={driverRows.slice(0, 5)} />
            <Button asChild variant="ghost" size="sm" className="mt-2 w-full">
              <Link href="/standings">Full standings →</Link>
            </Button>
          </section>

          <section className="rounded-2xl border border-border bg-muted/40 p-5">
            <h3 className="mb-3 font-heading text-base font-bold tracking-tight">
              Browse the paddock
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Stories", href: "/stories" },
                { label: "News", href: "/news" },
                { label: "Videos", href: "/video" },
                { label: "Standings", href: "/standings" },
                { label: "Drivers", href: "/drivers" },
                { label: "Race reviews", href: "/reviews" },
                { label: "Live timing", href: "/dashboard" },
              ].map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-foreground/80 transition-colors hover:border-f1red/50 hover:text-f1red"
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </Container>

      {/* ------------------------------ Next race countdown ------------------------------ */}
      {next && (
        <Container className="pb-8">
          <RaceCountdown
            targetISO={next.dateISO}
            raceName={next.raceName}
            circuitName={next.circuitName}
            country={next.country}
            round={next.round}
            lat={next.lat}
            lng={next.lng}
            upcomingRaces={nextRaces.slice(1).map((r) => ({
              round: r.round,
              lat: r.lat,
              lng: r.lng,
              circuitName: r.circuitName,
              country: r.country,
              raceName: r.raceName,
              dateISO: r.dateISO,
            }))}
          />
        </Container>
      )}

      {/* ------------------------------ Championship tables ------------------------------ */}
      <Container className="grid gap-8 pb-8 md:grid-cols-2">
        <section>
          <SectionHeading kicker="2026" title="Drivers' Championship" href="/standings" linkLabel="Full standings" />
          <div className="pt-3">
            <StandingsTable rows={driverRows} />
          </div>
        </section>
        <section>
          <SectionHeading kicker="2026" title="Constructors' Championship" href="/standings" linkLabel="Full standings" />
          <div className="pt-3">
            <StandingsTable rows={conRows} />
          </div>
        </section>
      </Container>

      {/* ------------------------------ Upcoming races ------------------------------ */}
      <Container className="flex flex-col gap-5 pb-8">
        <SectionHeader kicker="Calendar" title="Upcoming Races" href="/calendar" linkLabel="Full schedule" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {nextRaces.map((r: Race) => {
            const date = new Date(r.dateISO).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            return (
              <Link
                key={r.round}
                href="/calendar"
                className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Round {r.round}
                  </span>
                  <span className="text-xl leading-none">{r.flag}</span>
                </div>
                <h3 className="m-0 font-heading text-[15px] font-bold leading-snug tracking-tight group-hover:text-f1red">
                  {r.raceName}
                </h3>
                <p className="m-0 text-[12px] text-muted-foreground">{r.circuitName}</p>
                <p className="mt-auto text-[12px] font-semibold">{date}</p>
              </Link>
            );
          })}
        </div>
      </Container>

      {/* ------------------------------ Recent results ------------------------------ */}
      <Container className="flex flex-col gap-5 pb-8">
        <SectionHeader kicker="Results" title="Race Weekend" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recentRaces.map((r: Race) => {
            const photo = `/images/f1-${((r.round - 1) % 20) + 1}.jpg`;
            const flag = flagImage(r.country);
            return (
              <Link
                key={r.round}
                href="/reviews"
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/5"
              >
                <div className="relative h-32 overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt={r.raceName}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/5" />
                  {flag && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={flag}
                      alt={r.country}
                      className="absolute top-2 right-2 h-5 w-8 rounded-sm object-cover shadow"
                    />
                  )}
                  {r.circuitImage && (
                    <span className="absolute bottom-2 left-2 rounded-md bg-white/85 p-1 shadow transition-opacity duration-300 group-hover:opacity-90">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={r.circuitImage}
                        alt={`${r.circuitName} circuit`}
                        className="h-9 w-14 object-contain"
                      />
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Round {r.round}
                  </span>
                  <h3 className="m-0 font-heading text-[15px] font-bold leading-snug tracking-tight group-hover:text-f1red">
                    {r.raceName}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>

      {/* ------------------------------ CTA ------------------------------ */}
      <Container className="pb-8">
        <div className="flex flex-col items-start gap-4 rounded-2xl bg-carbon-deep px-6 py-8 md:px-10 md:py-10">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-f1red">
            The Paddock
          </span>
          <h2 className="m-0 max-w-[24ch] font-heading text-[clamp(24px,3.5vw,40px)] font-bold leading-[1.05] tracking-tight text-foreground">
            Find your people. Find your next race.
          </h2>
          <p className="m-0 max-w-[60ch] text-[14px] leading-relaxed text-muted-foreground">
            Lap-by-lap verdicts, paddock stories and live 2026 data — all in one
            fan-built paddock.
          </p>
          <div className="mt-1 flex flex-wrap gap-3">
            <Button asChild className="bg-f1red text-white hover:bg-f1red-dark">
              <Link href="/standings">Explore standings</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/stories">Read the blog</Link>
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}