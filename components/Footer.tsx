import Link from "next/link";
import { F1Logo } from "@/components/f1kit";

const EXPLORE = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/stories" },
  { label: "News", href: "/news" },
  { label: "Videos", href: "/video" },
  { label: "Standings", href: "/standings" },
  { label: "Calendar", href: "/calendar" },
];

const RESOURCES = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const PADDOCK = [
  { label: "Live Timing", href: "/dashboard", live: true },
  { label: "Drivers", href: "/drivers" },
  { label: "Constructors", href: "/constructors" },
  { label: "Seasons", href: "/seasons" },
  { label: "Race Reviews", href: "/reviews" },
];

const SOCIAL = [
  {
    label: "Facebook",
    href: "https://web.facebook.com/profile.php?id=61574396222083",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 1.9h-2.3V22A10 10 0 0 0 22 12Z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@f1.paddock.sl",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06v-3.1a5.65 5.65 0 0 0-.77-.05A5.66 5.66 0 1 0 15.54 15.4V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.24-1.48Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div
      className="bg-[#0A0A0A] px-4 pt-20"
      style={{ fontFamily: "var(--font-geist, Geist), sans-serif" }}
    >
      <footer className="mx-auto w-full max-w-[1350px] overflow-hidden rounded-tl-3xl rounded-tr-3xl bg-black px-4 pt-8 text-white sm:px-8 md:px-16 lg:px-28 lg:pt-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:gap-12 lg:grid-cols-6">
          {/* Brand */}
          <div className="space-y-6 lg:col-span-3">
            <Link href="/" className="flex items-center gap-2">
              <F1Logo className="h-8 w-auto" />
              <span className="font-heading text-lg font-bold tracking-tight">
                F1 Paddock SL
              </span>
            </Link>
            <p className="max-w-96 text-sm leading-6 text-neutral-300">
              An independent Sri Lankan Formula 1 fan hub — race analysis,
              paddock stories and live data for every session, every lap.
              Not affiliated with Formula 1 or the FIA.
            </p>
            <div className="flex flex-wrap gap-5 md:gap-6">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white transition-opacity hover:opacity-75"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 items-start gap-8 md:grid-cols-3 md:gap-12 lg:col-span-3 lg:gap-28">
            <div>
              <h3 className="mb-4 text-sm font-medium">Explore</h3>
              <ul className="space-y-3 text-sm text-neutral-300">
                {EXPLORE.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors hover:text-neutral-400">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-medium">Resources</h3>
              <ul className="space-y-3 text-sm text-neutral-300">
                {RESOURCES.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors hover:text-neutral-400">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h3 className="mb-4 text-sm font-medium">The Paddock</h3>
              <ul className="space-y-3 text-sm text-neutral-300">
                {PADDOCK.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="flex items-center gap-2 transition-colors hover:text-neutral-400"
                    >
                      {l.label}
                      {l.live && (
                        <span className="rounded-full border border-[#f1red] bg-f1red/15 px-2 py-0.5 text-[11px] text-f1red">
                          LIVE
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-7xl items-center justify-between border-t border-neutral-700 pt-4">
          <p className="text-sm text-neutral-400">© {year} F1 Paddock SL</p>
          <p className="text-sm text-neutral-400">All rights reserved.</p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-full max-h-64 w-full max-w-3xl rounded-full bg-f1red blur-[170px]" />
          <h3
            className="mt-6 text-center font-extrabold leading-[0.7] text-transparent"
            style={{ fontSize: "clamp(3rem,15vw,15rem)", WebkitTextStroke: "1px #e10600" }}
          >
            PADDOCK
          </h3>
        </div>
      </footer>
    </div>
  );
}