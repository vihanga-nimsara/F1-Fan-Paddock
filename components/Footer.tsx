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
    label: "X (Twitter)",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/vihanga-nimsara/F1-Fan-Paddock",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div
      className="bg-black px-4 pt-20"
      style={{ fontFamily: "var(--font-geist, Geist), sans-serif" }}
    >
      <footer className="mx-auto w-full max-w-[1350px] overflow-hidden rounded-tl-3xl rounded-tr-3xl bg-[#131314] px-4 pt-8 text-white sm:px-8 md:px-16 lg:px-28 lg:pt-12">
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
                  className="text-white transition-colors hover:text-f1red"
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