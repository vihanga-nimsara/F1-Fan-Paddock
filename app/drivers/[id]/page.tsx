import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, Flag } from "lucide-react";
import {
  getDriverStandings,
  getConstructorStandings,
  getDriverHeadshots,
  getSeasonRaces,
  getRaceResults,
  mapLimit,
  TEAM_COLORS,
  getTeamLogo,
} from "@/lib/f1";
import { getDriverProfile } from "@/lib/drivers";
import { Container, MediaFallback, Avatar } from "@/components/f1kit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SpinningText } from "@/components/ui/spinning-text";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const drivers = await getDriverStandings().catch(() => []);
  const d = drivers.find((x) => x.driverId === id);
  if (!d) return { title: "Driver — F1 Paddock SL" };
  return { title: `${d.givenName} ${d.familyName} — F1 Paddock SL` };
}

export default async function DriverPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [drivers, constructors] = await Promise.all([
    getDriverStandings().catch(() => []),
    getConstructorStandings().catch(() => []),
  ]);
  const driver = drivers.find((x) => x.driverId === id);
  if (!driver) notFound();

  const headshots = await getDriverHeadshots(undefined, [driver]).catch(
    () => ({}) as Record<string, string>,
  );
  const withHeadshot = {
    ...driver,
    headshot: headshots[driver.number] ?? headshots[driver.code] ?? undefined,
  };
  const profile = getDriverProfile(withHeadshot);

  const color = TEAM_COLORS[driver.team] ?? "#888888";
  const teamStanding = constructors.find((c) => c.constructorId === driver.team);
  const teamLogo = getTeamLogo(driver.team, 120);

  // Recent results — last 5 completed rounds, fetched with limited concurrency.
  const recentRaces = (await getSeasonRaces("current").catch(() => [])).filter(
    (r) => r.status === "past",
  );
  const last5 = recentRaces.slice(-5).reverse();
  const raced =
    last5.length > 0
      ? await mapLimit(last5, 3, async (race) => {
          const rows = await getRaceResults("current", race.round).catch(
            () => [],
          );
          const mine = rows.find((x) => x.driverId === driver.driverId);
          return {
            round: race.round,
            raceName: race.raceName,
            country: race.country,
            date: race.date,
            grid: mine?.grid ?? null,
            position: mine?.position ?? null,
            points: mine?.points ?? 0,
            status: mine?.status ?? "",
          };
        })
      : [];

  const name = `${driver.givenName} ${driver.familyName}`;

  return (
    <main className="w-full">
      <Container className="flex flex-col gap-8 py-8">
        <Link
          href="/drivers"
          className="flex w-fit items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-f1red"
        >
          <ArrowLeft className="h-4 w-4" />
          All drivers
        </Link>

        {/* Hero */}
        <section className="grid overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-[340px_minmax(0,1fr)]">
          <div
            className="relative flex aspect-[4/5] w-full items-end justify-center bg-muted"
            style={{ background: `linear-gradient(160deg, ${color}26 0%, transparent 55%)` }}
          >
            {profile.headshot ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.headshot}
                alt={name}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                <MediaFallback label={profile.code ?? profile.familyName[0]} sublabel={name} />
              </div>
            )}
            {/* Number medallion with spinning ring */}
            <div className="absolute bottom-4 left-4 flex h-32 w-32 items-center justify-center">
              <SpinningText
                duration={14}
                radius={7}
                reverse
                className="absolute inset-0 font-heading text-[12px] font-bold uppercase text-white"
                style={{
                  textShadow: "0 1px 6px rgba(0,0,0,0.7)",
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.45))",
                }}
              >
                {`${driver.code ?? driver.familyName.toUpperCase()} • F1 PADDOCK SL • `}
              </SpinningText>
              <div
                className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-background font-heading text-xl font-bold text-background"
                style={{ background: color, boxShadow: `0 4px 18px ${color}66` }}
              >
                {driver.number}
              </div>
            </div>
            <Badge
              className="absolute right-3 top-3 gap-1"
              style={{ background: color }}
            >
              P{driver.position}
            </Badge>
          </div>

          <div className="flex flex-col gap-5 p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 text-f1red">
                <Flag className="h-3.5 w-3.5" />
                {profile.nationality}
              </span>
              <span aria-hidden="true">·</span>
              <span>{driver.code}</span>
              <span aria-hidden="true">·</span>
              <span>{driver.team.replace(/_/g, " ")}</span>
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="m-0 font-heading text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.03] tracking-tight">
                {name}
              </h1>
              <p className="m-0 text-sm text-muted-foreground">
                Number {driver.number} · Born {profile.birthplace}
                {profile.birthDate ? (
                  <>
                    {" · "}
                    {new Date(profile.birthDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </>
                ) : null}
              </p>
            </div>

            {/* Season stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { k: "Position", v: `P${driver.position}` },
                { k: "Points", v: String(driver.points) },
                { k: "Wins", v: String(driver.wins) },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-xl border border-border bg-muted/40 p-3"
                >
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {s.k}
                  </span>
                  <span className="font-heading text-xl font-bold tracking-tight">
                    {s.v}
                  </span>
                </div>
              ))}
            </div>

            {teamStanding && (
              <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                {teamLogo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={teamLogo} alt="" className="h-8 w-24 object-contain" />
                ) : (
                  <span className="h-2 w-6 rounded-xl" style={{ background: color }} />
                )}
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold">
                    {teamStanding.name.replace(/_/g, " ")}
                  </span>
                  <span className="text-[12px] text-muted-foreground">
                    P{teamStanding.position} · {teamStanding.points} pts
                  </span>
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Find out more
              </span>
              <div className="flex flex-wrap gap-2">
                {profile.links.map((l) => (
                  <Button
                    asChild
                    key={`${l.kind}-${l.href}`}
                    size="sm"
                    variant={l.kind === "wiki" ? "default" : "outline"}
                    className={cn(
                      l.kind === "wiki" && "bg-f1red text-white hover:bg-f1red-dark",
                      "gap-1.5",
                    )}
                  >
                    <Link
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {l.label}
                      <ExternalLink className="size-3" />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recent results */}
        <section className="flex flex-col gap-4">
          <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
            <div>
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-f1red">
                2026 season
              </span>
              <h2 className="m-0 font-heading text-2xl font-bold tracking-tight">
                Recent results
              </h2>
            </div>
            <Link
              href="/reviews"
              className="text-[13px] font-semibold text-muted-foreground transition-colors hover:text-f1red"
            >
              Race reviews →
            </Link>
          </div>

          {raced.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-border">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-muted/50 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    <th className="px-4 py-3">Round</th>
                    <th className="px-4 py-3">Grand Prix</th>
                    <th className="px-4 py-3 text-center">Grid</th>
                    <th className="px-4 py-3 text-center">Fin</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-right">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {raced.map((r) => (
                    <tr
                      key={r.round}
                      className="border-t border-border transition-colors hover:bg-muted/40"
                    >
                      <td className="px-4 py-3 font-medium">{r.round}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-2 font-semibold">
                          {r.country === "Abu Dhabi"
                            ? "🇦🇪"
                            : r.country === "Great Britain"
                              ? "🇬🇧"
                              : "🏁"}
                          <span>{r.raceName}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {r.grid != null ? `P${r.grid}` : "—"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {r.position != null ? (
                          <span className="font-bold tracking-tight">
                            P{r.position}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3 text-center text-[12px] text-muted-foreground">
                        {r.status}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">
                        {r.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed p-10 text-center text-sm text-muted-foreground">
              No completed races yet this season.
            </p>
          )}
        </section>

        {/* Teammate / next up */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="m-0 font-heading text-lg font-bold tracking-tight">
                Keep up with {driver.familyName}
              </h2>
              <p className="m-0 mt-1 max-w-[52ch] text-[13px] leading-relaxed text-muted-foreground">
                Follow the latest results, race-weekend verdicts and paddock
                stories about {name} on the blog and standings pages.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/standings">Season standings</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={`/stories?driver=${driver.familyName.toLowerCase()}`}>
                  Related stories
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}