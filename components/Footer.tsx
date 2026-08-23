import Link from "next/link";
import { F1Logo } from "@/components/f1kit";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Racing",
    links: [
      { label: "Schedule", href: "/calendar" },
      { label: "Standings", href: "/standings" },
      { label: "Drivers", href: "/drivers" },
      { label: "Teams", href: "/constructors" },
      { label: "Seasons", href: "/seasons" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Blog", href: "/stories" },
      { label: "Video", href: "/video" },
      { label: "Live Timing", href: "/dashboard" },
      { label: "Spotlight", href: "/reviews" },
      { label: "Showcase", href: "/showcase" },
    ],
  },
  {
    title: "Fan Paddock",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Release Schedule", href: "/schedule" },
      { label: "My Lists", href: "/lists" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const SOCIALS = [
  { label: "Facebook", href: "https://web.facebook.com/profile.php?id=61574396222083", icon: <FacebookGlyph /> },
];

function FacebookGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 1.9h-2.3V22A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-16 w-full border-t-[3px] border-t-f1red bg-carbon-deep">
      <div className="mx-auto grid max-w-[1640px] gap-10 px-4 py-12 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-6">
        <div className="flex flex-col gap-5">
          <Link href="/" aria-label="Go to homepage">
            <F1Logo className="text-[1.6rem]" />
          </Link>
          <p className="max-w-[36ch] text-sm leading-[1.4] text-pebble-80">
            Race analysis, paddock stories, and live Formula 1 stats — an
            independent fan project by Zagan, built for fans.
          </p>
          <div className="flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-pebble-5 text-base text-pebble transition-colors hover:bg-f1red hover:text-white"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <h4 className="m-0 font-display text-[11px] font-semibold tracking-[0.14em] text-f1red">
              {col.title}
            </h4>
            <ul className="m-0 flex flex-col gap-2 p-0">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-pebble-80 transition-colors hover:text-pebble"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-pebble-15">
        <div className="mx-auto flex max-w-[1640px] flex-col items-start justify-between gap-2 px-4 py-5 text-[11px] text-pebble-50 md:flex-row md:items-center md:px-6">
          <span>© 2026 F1 Fan Paddock. All rights reserved.</span>
          <span>
            This is an unofficial fan project. Not affiliated with Formula 1.
          </span>
        </div>
      </div>
    </footer>
  );
}
