import Link from "next/link";
import { Avatar as BaseAvatar } from "@base-ui/react/avatar";

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
    <div className={`mx-auto w-full max-w-[1640px] px-4 md:px-6 ${className}`}>
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
      alt="F1 Fan Paddock"
      className={`h-7 w-auto ${className}`}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Typography helpers                                                  */
/* ------------------------------------------------------------------ */

export function Kicker({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display text-[11px] font-semibold tracking-[0.16em] text-f1red ${className}`}
    >
      <span className="h-3 w-[3px] bg-f1red" aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionHeading({
  kicker,
  title,
  href,
  linkLabel = "View all",
  className = "",
}: {
  kicker?: string;
  title: string;
  href?: string;
  linkLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full items-end justify-between gap-4 border-b border-pebble-15 pb-3 ${className}`}
    >
      <div className="flex flex-col gap-1.5">
        {kicker && <Kicker>{kicker}</Kicker>}
        <h2 className="m-0 font-headline text-[clamp(20px,2.4vw,30px)] font-semibold uppercase leading-[0.95] tracking-[0.02em] text-pebble">
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="group flex shrink-0 items-center gap-1 font-display text-[11px] font-semibold tracking-[0.12em] text-pebble-80 transition-colors hover:text-f1red"
        >
          {linkLabel}
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      )}
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
        className={`inline-flex items-center gap-1 rounded-[2px] px-2.5 py-1 font-display text-[10px] font-semibold tracking-[0.08em] leading-none ${tones[tone]} ${className}`}
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
  meta,
  color,
}: {
  href: string;
  image?: string;
  tag?: string;
  title: string;
  meta?: React.ReactNode;
  color?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-[2px] bg-pebble-5 transition-colors duration-200 hover:bg-pebble-8"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <MediaFallback label={tag?.[0]} sublabel={tag} color={color} />
        )}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon-deep/80 via-transparent to-transparent" />
        {tag && (
          <span className="absolute left-3 top-3 rounded-[2px] bg-f1red px-2 py-1 font-display text-[10px] font-semibold tracking-[0.1em] text-white">
            {tag}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="m-0 line-clamp-3 font-display text-[15px] font-semibold leading-[1.15] tracking-[0.01em] text-pebble transition-colors group-hover:text-f1red">
          {title}
        </h3>
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
      className="group flex flex-col overflow-hidden rounded-[2px] bg-pebble-5 transition-colors duration-200 hover:bg-pebble-8"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <MediaFallback sublabel="F1 Video" />
        )}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-f1red/90 text-white shadow-lg transition-transform duration-200 group-hover:scale-110">
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
          <span className="absolute left-3 top-3 rounded-[2px] bg-f1red px-2 py-1 font-display text-[10px] font-semibold tracking-[0.1em] text-white">
            {tag}
          </span>
        )}
      </div>
      <div className="p-3">
          <h3 className="m-0 line-clamp-2 font-display text-[13px] font-semibold leading-[1.2] text-pebble transition-colors group-hover:text-f1red">
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
            className="h-9 w-[3px] shrink-0 rounded-[2px]"
            style={{ background: r.color ?? "transparent" }}
            aria-hidden="true"
          />
          <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-[2px] bg-pebble-10">
            {r.avatar ? (
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
            <span className="truncate font-display text-sm font-semibold leading-tight text-pebble group-hover:text-f1red">
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
  href,
  image,
  kicker,
  title,
  excerpt,
  cta = "Read more",
  color = "#e10600",
}: {
  href: string;
  image?: string;
  kicker: string;
  title: string;
  excerpt?: string;
  cta?: string;
  color?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[420px] w-full items-end overflow-hidden rounded-[2px] bg-carbon-deep md:min-h-[520px]"
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 100% at 85% 0%, ${color}cc 0%, #15151e 60%)`,
          }}
          aria-hidden="true"
        />
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-carbon-deep via-carbon-deep/40 to-transparent" />
      <div className="relative z-10 flex w-full flex-col gap-3 p-6 md:p-10">
        <span className="inline-flex w-fit items-center gap-2 rounded-[2px] bg-f1red px-2.5 py-1 font-display text-[11px] font-semibold tracking-[0.14em] text-white">
          {kicker}
        </span>
        <h1 className="m-0 max-w-[18ch] font-headline text-[clamp(28px,5vw,56px)] font-semibold uppercase leading-[0.92] tracking-[0.01em] text-white">
          {title}
        </h1>
        {excerpt && (
          <p className="m-0 max-w-[60ch] text-sm leading-[1.35] text-pebble-80">
            {excerpt}
          </p>
        )}
          <span className="mt-1 inline-flex w-fit items-center gap-2 rounded-[2px] bg-white px-4 py-2 font-display text-[12px] font-semibold tracking-[0.06em] text-[#15151e] transition-transform group-hover:translate-x-1">
          {cta} →
        </span>
      </div>
    </Link>
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
    <BaseAvatar.Root
      className={`inline-flex h-7 w-7 shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-f1red font-display text-sm font-semibold text-white ${className}`}
    >
      <BaseAvatar.Fallback className="flex h-full w-full items-center justify-center">
        {initial}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
