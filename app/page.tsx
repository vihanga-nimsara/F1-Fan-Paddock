import Link from "next/link";
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
  Hero,
  SectionHeading,
  NewsCard,
  StandingsTable,
  MediaFallback,
  Avatar,
  type StandingRow,
} from "@/components/f1kit";
import F1Button from "@/components/ui/F1Button";
import RaceCountdown from "@/components/RaceCountdown";
import MustWatchVideos from "@/components/MustWatchVideos";
import F1Card from "@/components/youtube/F1Card";
import { getBlogPosts, timeAgo } from "@/lib/blog";
import { getCachedBlogPosts } from "@/lib/blog-cache";
import { getPlaylistVideos } from "@/lib/youtube";
import { TextAnimate } from "@/components/ui/text-animate";
import { Box, Typography, Divider, Paper } from "@mui/material";

const YT_PLAYLIST = "PLo5BbNWSTIgjjZUH3GlSU5Qo029JfgUTh";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [drivers, constructors, nextRaces, recentRaces, blogPosts, fbPosts, videos] =
    await Promise.all([
      getDriverStandings(),
      getConstructorStandings(),
      getNextRaces(7),
      getRecentRaces(4),
      getBlogPosts(10),
      getBlogPosts(10, "Facebook"),
      getPlaylistVideos(YT_PLAYLIST, 6),
    ]);

  const headshots = await getDriverHeadshots(undefined, drivers).catch(
    () => ({}) as Record<string, string>,
  );

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

  const homeBlogs = blogPosts.filter((p) => p.source !== "Facebook");
  const cached = homeBlogs.length ? [] : await getCachedBlogPosts(20);
  const fallback = cached.length
    ? cached.map((p) => ({
        tag: p.source,
        ts: timeAgo(p.pubDate),
        title: p.title,
        author: p.author,
        description: p.description,
        image: p.image,
        link: p.link,
      }))
    : [];
  const [blogFeatured, ...blogRest] = (
    homeBlogs.length
      ? homeBlogs.map((p) => ({
          tag: p.source,
          ts: timeAgo(p.pubDate),
          title: p.title,
          author: p.author,
          description: p.description,
          image: p.image,
          link: p.link,
        }))
      : fallback
  ) as {
    tag: string;
    ts: string;
    title: string;
    author: string;
    description?: string;
    image?: string;
    link: string;
  }[];

  const feed = [
    blogFeatured,
    ...blogRest.slice(0, 2),
    ...blogRest.slice(2, 8),
  ];

  return (
    <main className="relative w-full">
      {/* Featured "video" hero — YouTube watch-page style */}
      <Box component="section" sx={{ width: "100%" }}>
        <Box
          sx={{
            position: "relative",
            minHeight: { xs: 260, md: 360 },
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <Box
            component="img"
            src="/images/ChatGPT_Image_Aug_16_2026_08_13_40_PM.png"
            alt=""
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(15,15,15,0.95), rgba(15,15,15,0.4) 60%, transparent)",
            }}
          />
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "1640px",
              mx: "auto",
              px: { xs: 2, md: 3 },
              pb: 4,
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                bgcolor: "#e10600",
                color: "#fff",
                px: 1.5,
                py: 0.5,
                borderRadius: "4px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                mb: 1.5,
              }}
            >
              Welcome to
            </Box>
            <Typography
              variant="h1"
              sx={{
                color: "#fff",
                fontFamily: "var(--font-heading), sans-serif",
                fontSize: { xs: 30, md: 52 },
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                maxWidth: "24ch",
              }}
            >
              The F1 Fan Paddock
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.78)",
                fontSize: { xs: 14, md: 16 },
                maxWidth: "56ch",
                mt: 1.5,
                mb: 2,
              }}
            >
              Follow every session, every lap and every overtake with live timing,
              verdicts from verified fans and the full 2026 story — all in one paddock.
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              <F1Button href="/standings" variant="primary" className="!bg-white !text-[#15151e]">
                Explore the Grid →
              </F1Button>
              <F1Button href="/dashboard" variant="secondary" className="!bg-white/10 !text-white">
                Live Timing
              </F1Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        component="section"
        sx={{
          width: "100%",
          maxWidth: "1640px",
          mx: "auto",
          px: { xs: 1.5, md: 3 },
          py: 2,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
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

        {/* Latest stories — YouTube feed */}
        <section>
          <SectionHeading kicker="News" title="Latest from the Paddock" href="/news" linkLabel="All news" />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0,1fr))",
                lg: "repeat(4, minmax(0,1fr))",
              },
              gap: { xs: 3, md: 4 },
              pt: 2,
            }}
          >
            {feed.map((s) => (
              <F1Card
                key={s.title}
                href={s.link}
                image={s.image}
                title={s.title}
                channel={s.author}
                tag={s.tag}
                meta={[s.tag, `${s.ts} ago`]}
              />
            ))}
          </Box>
        </section>

        {/* Must watch */}
        <section>
          <SectionHeading
            kicker="Watch"
            title="Must Watch"
            href={`https://www.youtube.com/playlist?list=${YT_PLAYLIST}`}
            linkLabel="All videos"
          />
          <Box sx={{ pt: 2 }}>
            <MustWatchVideos videos={videos.map((v) => ({ id: v.id, title: v.title }))} />
          </Box>
        </section>

        {/* 2026 Season standings */}
        <section>
          <SectionHeading kicker="2026" title="Season Standings" href="/standings" linkLabel="Full standings" />
          <Box
            sx={{
              display: "grid",
              gap: { xs: 3, md: 4 },
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              pt: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "text.secondary",
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                Drivers
              </Typography>
              <StandingsTable rows={driverRows} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "text.secondary",
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                Constructors
              </Typography>
              <StandingsTable rows={conRows} />
            </Box>
          </Box>
        </section>

        {/* Upcoming races */}
        <section>
          <SectionHeading kicker="Calendar" title="Upcoming Races" href="/calendar" linkLabel="Full schedule" />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0,1fr))",
                lg: "repeat(4, minmax(0,1fr))",
              },
              gap: { xs: 3, md: 4 },
              pt: 2,
            }}
          >
            {nextRaces.map((r: Race) => {
              const date = new Date(r.dateISO).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });
              const time = r.time ? r.time.slice(0, 5) : "—";
              return (
                <Paper
                  key={r.round}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: "12px",
                    bgcolor: "background.paper",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "text.secondary", textTransform: "uppercase" }}>
                      Round {r.round}
                    </Typography>
                    <Typography sx={{ fontSize: "1.25rem", lineHeight: 1 }}>{r.flag}</Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: 16, fontWeight: 700, lineHeight: 1.2, color: "text.primary" }}
                  >
                    {r.raceName}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: "text.secondary" }}>{r.circuitName}</Typography>
                  <Typography sx={{ fontSize: 13, color: "text.secondary" }}>{r.country}</Typography>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: "text.primary" }}>{date}</Typography>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: "text.primary" }}>{time} UTC</Typography>
                </Paper>
              );
            })}
          </Box>
        </section>

        {/* Recent results */}
        <section>
          <SectionHeading kicker="Results" title="Race Weekend" href="/calendar" linkLabel="All results" />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0,1fr))",
                lg: "repeat(4, minmax(0,1fr))",
              },
              gap: { xs: 3, md: 4 },
              pt: 2,
            }}
          >
            {recentRaces.map((r: Race) => {
              const img = r.circuitImage ?? flagImage(r.country, 320);
              return (
                <Link
                  key={r.round}
                  href="/calendar"
                  style={{ textDecoration: "none" }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      overflow: "hidden",
                      borderRadius: "12px",
                      bgcolor: "background.paper",
                      transition: "background-color 0.2s",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 160,
                        bgcolor: "rgba(255,255,255,0.06)",
                      }}
                    >
                      {img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img}
                          alt={`${r.circuitName} circuit`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            padding: 12,
                          }}
                        />
                      ) : (
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 40 }}>
                          {r.flag}
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 0.25 }}>
                      <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "text.secondary", textTransform: "uppercase" }}>
                        Round {r.round}
                      </Typography>
                      <Typography variant="h6" sx={{ fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>
                        {r.raceName}
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                        {r.circuitName.replace("Grand Prix Circuit", "").trim()}
                      </Typography>
                    </Box>
                  </Paper>
                </Link>
              );
            })}
          </Box>
        </section>

        {/* Facebook posts */}
        <section>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "var(--font-heading), sans-serif",
                fontSize: { xs: 20, md: 28 },
                fontWeight: 700,
                letterSpacing: "0.02em",
                color: "text.primary",
              }}
            >
              From Our Facebook
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: 14, maxWidth: "60ch" }}>
              Latest posts, race-week reactions and paddock banter from the F1 Fan Paddock page.
            </Typography>
          </Box>
          {fbPosts.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0,1fr))",
                  lg: "repeat(3, minmax(0,1fr))",
                },
                gap: { xs: 3, md: 4 },
                pt: 2,
              }}
            >
              {fbPosts.map((p) => (
                <F1Card
                  key={p.link}
                  href={p.link}
                  image={p.image}
                  title={p.title}
                  channel={p.author}
                  tag={p.source}
                  meta={[p.author, timeAgo(p.pubDate)]}
                />
              ))}
            </Box>
          ) : (
            <Typography sx={{ p: 2.5, bgcolor: "rgba(255,255,255,0.05)", borderRadius: "12px", color: "text.secondary", fontSize: 14 }}>
              No Facebook posts to show yet — check back soon.
            </Typography>
          )}
        </section>

        {/* CTA band */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
            bgcolor: "#e10600",
            color: "#fff",
            borderRadius: "16px",
            px: { xs: 3, md: 5 },
            py: { xs: 4, md: 5 },
          }}
        >
          <TextAnimate
            as="h2"
            by="word"
            animation="blurInUp"
            duration={0.5}
            className="m-0 font-headline font-semibold leading-[0.95] tracking-[0.01em] text-white"
            style={{ fontSize: "clamp(24px,4vw,44px)" }}
          >
            Find Your People. Find Your Next Race.
          </TextAnimate>
          <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: 14, maxWidth: "60ch" }}>
            Lap-by-lap verdicts from verified fans, live timing and the full 2026 story — all in one paddock.
          </Typography>
          <F1Button href="/standings" variant="primary" className="!bg-white !text-[#15151e]">
            Explore Standings →
          </F1Button>
        </Box>
      </Box>
    </main>
  );
}