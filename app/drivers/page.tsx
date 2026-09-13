import Link from "next/link";
import {
  getDriverStandings,
  getDriverHeadshots,
  TEAM_COLORS,
} from "@/lib/f1";
import { Container, MediaFallback } from "@/components/f1kit";
import { Badge } from "@/components/ui/badge";
import { getDriverProfile } from "@/lib/drivers";

export const metadata = {
  title: "Drivers — F1 Fan Paddock",
};

export const dynamic = "force-dynamic";

export default async function DriversPage() {
  const drivers = await getDriverStandings();
  const headshots = await getDriverHeadshots(undefined, drivers);

  return (
    <main className="w-full">
      <section className="border-b border-border bg-muted/40">
        <Container className="flex flex-col gap-3 py-10 md:py-14">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-f1red">
            2026 Grid
          </span>
          <h1 className="m-0 max-w-[22ch] font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-tight">
            Meet the drivers
          </h1>
          <p className="m-0 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">
            Every driver on the 2026 grid — race history, season stats and the
            links to follow their story.
          </p>
        </Container>
      </section>

      <Container className="py-10 md:py-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {drivers.map((d) => {
            const profile = getDriverProfile({
              ...d,
              headshot:
                headshots[d.number] ?? headshots[d.code] ?? undefined,
            });
            const color = TEAM_COLORS[d.team] ?? "#888888";
            const name = `${d.givenName} ${d.familyName}`;
            return (
              <Link
                key={d.driverId}
                href={`/drivers/${d.driverId}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/5"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                  {profile.headshot ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profile.headshot}
                      alt={name}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                      <MediaFallback
                        label={profile.code ?? profile.familyName[0]}
                        sublabel={name}
                        color={color}
                      />
                    </div>
                  )}
                  <span
                    className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-background font-heading text-sm font-bold text-background"
                    style={{ background: color }}
                  >
                    {d.number}
                  </span>
                  <Badge className="absolute right-3 top-3 bg-black/60 text-white backdrop-blur hover:bg-black/70">
                    P{d.position}
                  </Badge>
                </div>
                <div className="flex flex-col gap-0.5 p-3">
                  <span className="font-heading text-sm font-bold leading-tight tracking-tight group-hover:text-f1red">
                    {name}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="h-2 w-2 shrink-0 rounded-xl" style={{ background: color }} />
                    {profile.flag} {d.team.replace(/_/g, " ")}
                  </span>
                  <span className="font-heading text-base font-bold text-f1red">
                    {d.points}
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {" "}pts
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </main>
  );
}