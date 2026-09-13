import Link from "next/link";

const LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/stories" },
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
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 py-8 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-1">
            <span className="font-heading text-base font-bold tracking-tight">
              The Paddock
            </span>
            <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
              An independent F1 fan blog — race analysis, paddock stories and
              live data for every session, every lap, every overtake.
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2" aria-label="Footer">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-border pt-4 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {year} The Paddock · F1 Fan Paddock. An independent fan project.
          </p>
          <div className="flex items-center gap-2">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}