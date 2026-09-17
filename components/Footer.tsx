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

const SOCIAL = [
  {
    label: "Facebook",
    href: "https://web.facebook.com/profile.php?id=61574396222083",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 1.9h-2.3V22A10 10 0 0 0 22 12Z" />
      </svg>
    ),
  },
  {
    label: "X (formerly Twitter)",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V9.96H5.67v8.38h2.67zM7 8.74a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zM18.34 18.34v-4.6c0-2.45-1.31-3.59-3.06-3.59-1.41 0-2.04.78-2.39 1.33V9.96h-2.67c.04.75 0 8.38 0 8.38h2.67v-4.67c0-.24.02-.48.09-.65.19-.48.63-.97 1.36-.97.97 0 1.36.74 1.36 1.82v4.47h2.64z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <F1Logo className="h-6 w-auto" />
              <span className="font-heading text-base font-bold tracking-tight">
                F1 Paddock SL
              </span>
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
              An independent Sri Lankan Formula 1 fan hub — race analysis,
              paddock stories and live data for every session, every lap.
            </p>
            <div className="mt-2 flex items-center gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted/50 text-muted-foreground transition-colors hover:border-f1red/50 hover:bg-f1red/10 hover:text-f1red"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav className="flex flex-col gap-3" aria-label="Explore">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Explore
            </span>
            {EXPLORE.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="w-fit text-sm text-foreground/80 transition-colors hover:text-f1red"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Resources */}
          <nav className="flex flex-col gap-3" aria-label="Resources">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Resources
            </span>
            {RESOURCES.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="w-fit text-sm text-foreground/80 transition-colors hover:text-f1red"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-border py-5 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} F1 Paddock SL. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Independent fan project — not affiliated with Formula 1 or the FIA.
          </p>
        </div>
      </div>
    </footer>
  );
}