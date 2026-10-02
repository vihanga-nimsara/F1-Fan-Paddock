import Link from "next/link";
import MuiAvatar from "@mui/material/Avatar";
import { ArrowRight } from "lucide-react";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { SourceBadge } from "@/components/source-badge";

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-4 md:px-6 ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Brand                                                               */
/* ------------------------------------------------------------------ */

export function F1Logo({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/Logo.png"
      alt="F1 Paddock SL"
      className={`h-7 w-auto ${className}`}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Typography helpers                                                  */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={`flex w-full items-end pb-3 ${className}`}>
      <h2 className="m-0 font-headline text-[clamp(20px,2.4vw,30px)] font-semibold leading-[0.95] tracking-[0.02em] text-pebble">
        {title}
      </h2>
    </div>
  );
}

export function Pill({
  children,
  tone = "default",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "default" | "accent" | "muted";
  className?: string;
}) {
  const tones: Record<string, string> = {
    default: "bg-pebble-10 text-pebble",
    accent: "bg-f1red text-white",
    muted: "border border-pebble-20 text-pebble-80",
  };
  return (
    <span
        className={`inline-flex items-center gap-1 rounded-sm px-2.5 py-1 font-display text-[10px] font-semibold tracking-[0.08em] leading-none ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Media placeholder (used when no image URL is available)             */
/* ------------------------------------------------------------------ */

// Local F1 photos used to fill placeholder slots.
const FALLBACK_POOL = Array.from(
  { length: 20 },
  (_, i) => `/images/f1-${i + 1}.jpg`,
);

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function MediaFallback({
  label,
  sublabel,
  color = "#e10600",
  className = "",
}: {
  label?: React.ReactNode;
  sublabel?: React.ReactNode;
  color?: string;
  className?: string;
}) {
  const seed = String(sublabel ?? label ?? "f1-fan-paddock");
  const img = FALLBACK_POOL[hashString(seed) % FALLBACK_POOL.length];
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-carbon-deep ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-carbon-deep/80 via-carbon-deep/10 to-transparent"
        aria-hidden="true"
      />
      {label && (
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0"
          aria-hidden="true"
        >
          <span className="font-display text-[2.6rem] font-semibold leading-none text-pebble">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cards                                                               */
/* ------------------------------------------------------------------ */

export function NewsCard({
  href,
  image,
  tag,
  title,
  description,
  meta,
  color,
  contain,
}: {
  href: string;
  image?: string;
  tag?: string;
  title: string;
  description?: string;
  meta?: React.ReactNode;
  color?: string;
  contain?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-sm bg-pebble-5 transition-colors duration-200 hover:bg-pebble-8"
    >
      <div className={`relative w-full overflow-hidden ${contain ? "" : "aspect-[16/9]"}`}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            loading="lazy"
            className={
              contain
                ? "w-full h-auto max-h-[460px] object-contain"
                : "h-full w-full object-cover"
            }
          />
        ) : (
          <MediaFallback label={tag?.[0]} sublabel={tag} color={color} />
        )}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon-deep/80 via-transparent to-transparent" />
        {tag && <SourceBadge tag={tag} className="absolute left-3 top-3 z-10" />}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className={`m-0 font-display text-[15px] font-semibold leading-[1.15] tracking-[0.01em] text-pebble ${description ? "line-clamp-2" : "line-clamp-3"}`}>
          {title}
        </h3>
        {description && (
          <p className="m-0 line-clamp-2 text-[12px] leading-[1.3] text-pebble-70">
            {description}
          </p>
        )}
        {meta && (
          <div className="mt-auto flex items-center gap-2 text-[11px] text-pebble-80">
            {meta}
          </div>
        )}
      </div>
    </Link>
  );
}

export function VideoCard({
  href,
  image,
  title,
  duration,
  tag,
}: {
  href: string;
  image?: string;
  title: string;
  duration?: string;
  tag?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-sm bg-pebble-5 transition-colors duration-200 hover:bg-pebble-8"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <MediaFallback sublabel="F1 Video" />
        )}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-f1red/90 text-white shadow-lg transition-colors duration-200 group-hover:bg-f1red">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
        {duration && (
          <span className="absolute bottom-2 right-2 rounded bg-carbon-deep/90 px-1.5 py-0.5 font-display text-[10px] font-semibold text-pebble">
            {duration}
          </span>
        )}
        {tag && (
          <span className="absolute left-3 top-3 rounded-sm bg-f1red px-2 py-1 font-display text-[10px] font-semibold tracking-[0.1em] text-white">
            {tag}
          </span>
        )}
      </div>
      <div className="p-3">
          <h3 className="m-0 line-clamp-2 font-display text-[13px] font-semibold leading-[1.2] text-pebble">
          {title}
        </h3>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Standings                                                           */
/* ------------------------------------------------------------------ */

export type StandingRow = {
  position: number;
  name: string;
  sub: string;
  points: number;
  wins?: number;
  color?: string;
  logo?: string;
  avatar?: string;
  car?: string;
  href?: string;
};

export function StandingsTable({
  rows,
  pointsLabel = "PTS",
}: {
  rows: StandingRow[];
  pointsLabel?: string;
}) {
  return (
    <div className="flex w-full flex-col">
      {rows.map((r) => (
        <Link
          key={r.position}
          href={r.href ?? "#"}
          className="group flex items-center gap-3 border-b border-pebble-10 py-2.5 transition-colors last:border-b-0 hover:bg-pebble-5"
        >
          <span className="w-6 shrink-0 text-center font-display text-base font-semibold text-pebble-50">
            {r.position}
          </span>
          <span
            className="h-9 w-[3px] shrink-0 rounded-xl"
            style={{ background: r.color ?? "transparent" }}
            aria-hidden="true"
          />
          <span
            className={
              r.car
                ? "flex h-9 w-[132px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-pebble-5 p-1"
                : "relative h-9 w-9 shrink-0 overflow-hidden rounded-xl bg-pebble-10"
            }
          >
            {r.car ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={r.car}
                alt=""
                className="h-full w-full object-contain"
              />
            ) : r.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={r.avatar}
                alt={r.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center font-display text-[11px] font-semibold text-pebble-80">
                {r.name
                  .split(" ")
                  .map((w) => w.charAt(0))
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            )}
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate font-display text-sm font-semibold leading-tight text-pebble">
              {r.name}
            </span>
            <span className="flex items-center gap-2 truncate text-[11px] tracking-[0.04em] text-pebble-80">
              {r.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.logo} alt="" className="h-3 w-auto opacity-80" />
              ) : null}
              {r.sub}
            </span>
          </span>
          <span className="flex shrink-0 flex-col items-end">
            <span className="font-display text-base font-semibold leading-none text-pebble">
              {r.points}
            </span>
            <span className="font-display text-[9px] font-semibold tracking-[0.1em] text-pebble-50">
              {pointsLabel}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function Hero({
  image,
  title,
  excerpt,
  primaryCta,
  primaryHref,
  secondaryCta,
  secondaryHref,
  color = "#e10600",
}: {
  image?: string;
  title: string;
  excerpt?: string;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  color?: string;
}) {
  return (
    <div className="group relative flex min-h-[420px] w-full flex-col justify-end md:min-h-[540px]">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(130% 110% at 80% 10%, ${color}cc 0%, #15151e 55%)`,
          }}
          aria-hidden="true"
        />
      )}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon/70 via-carbon/20 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-[1640px] flex flex-col items-center gap-4 px-4 pb-10 pt-16 text-center md:px-6 md:pb-14">
        <LineShadowText
          as="h1"
          shadowColor="rgba(255,255,255,0.45)"
          className="m-0 font-f1-display text-[clamp(56px,11vw,126px)] font-bold uppercase leading-[0.9] tracking-tight text-white"
        >
          {title}
        </LineShadowText>
        {excerpt && (
          <p className="m-0 max-w-[55ch] text-[17px] leading-[1.4] text-white/85">
            {excerpt}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            {primaryCta && (
              <Link
                href={primaryHref ?? "#"}
                className="group inline-flex items-center gap-2 rounded-[10px] bg-white px-5 py-2.5 font-display text-[12px] font-semibold tracking-[0.08em] text-[#15151e] transition-all hover:bg-f1red hover:text-white"
              >
                {primaryCta}
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryHref ?? "#"}
                className="inline-flex items-center gap-2 rounded-[10px] border border-white/40 bg-white/10 px-5 py-2.5 font-display text-[12px] font-semibold tracking-[0.08em] text-white backdrop-blur transition-colors hover:border-white hover:bg-white/20"
              >
                {secondaryCta}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Avatar                                                              */
/* ------------------------------------------------------------------ */

export function Avatar({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const initial = name.trim().charAt(0).toUpperCase();
  return (
    <MuiAvatar
      className={className}
      sx={{
        width: 20,
        height: 20,
        bgcolor: "#e10600",
        color: "#fff",
        fontFamily: "var(--font-display)",
        fontSize: 10,
        fontWeight: 600,
      }}
    >
      {initial}
    </MuiAvatar>
  );
}
