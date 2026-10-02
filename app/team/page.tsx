import Link from "next/link";
import { Container, SectionHeading } from "@/components/f1kit";
import TeamAvatar from "@/components/TeamAvatar";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Team", path: "/team" });

const ZAGAN_IMG =
  "https://github.com/vihanga-nimsara.png?size=200";

// Stored locally rather than hotlinked from Facebook's CDN — those URLs are
// time-limited and would expire, dropping the avatar back to initials.
const HANSAKA_IMG = "/images/hansaka-nethmina.jpg";

const HIRUNA_IMG = "/images/hiruna-paththuwage.jpg";

type TeamMember = {
  name: string;
  role: string;
  image?: string;
  href: string;
  linkLabel: string;
  icon: "globe" | "facebook";
};

const TEAM: TeamMember[] = [
  {
    name: "Zagan",
    role: "Developer",
    image: ZAGAN_IMG,
    href: "https://zagan.space",
    linkLabel: "Zagan's website",
    icon: "globe",
  },
  {
    name: "Hansaka Nethmina",
    role: "Blogger & Facebook Admin",
    image: HANSAKA_IMG,
    href: "https://hansaka-sigma.vercel.app/",
    linkLabel: "Hansaka's website",
    icon: "globe",
  },
  {
    name: "Hiruna M. Paththuwage",
    role: "Admin",
    image: HIRUNA_IMG,
    href: "https://web.facebook.com/profile.php?id=61550067544824",
    linkLabel: "Hiruna on Facebook",
    icon: "facebook",
  },
];

function LinkIcon({ kind }: { kind: TeamMember["icon"] }) {
  if (kind === "facebook") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 1.9h-2.3V22A10 10 0 0 0 22 12Z" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

export default function TeamPage() {
  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-10 py-8 md:py-12">
        <div className="flex flex-col gap-3">
          <SectionHeading kicker="Team" title="Who keeps it running" />
          <p className="m-0 max-w-[820px] font-body text-sm text-pebble-80">
            F1 Paddock SL is an independent, fan-run project. It&apos;s designed,
            built, and maintained by people who care a lot about clean stats and
            good race writing.
          </p>
        </div>

        <div className="grid w-full max-w-[820px] gap-5 sm:grid-cols-2">
          {TEAM.map((m) => (
            <article
              key={m.name}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-f1red/30 hover:shadow-lg hover:shadow-foreground/5"
            >
              <span className="inline-flex w-fit rounded-full bg-gradient-to-br from-f1red to-f1red-dark p-[3px]">
                <TeamAvatar src={m.image} name={m.name} className="ring-2 ring-card" />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="m-0 font-display text-lg font-semibold tracking-[0.03em] text-pebble">
                  {m.name}
                </h3>
                <span className="font-display text-[11px] font-semibold tracking-[0.12em] text-f1red uppercase">
                  {m.role}
                </span>
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-pebble-10 pt-4">
                <Link
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={m.linkLabel}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted/60 text-pebble transition-all hover:border-f1red/40 hover:text-f1red"
                >
                  <LinkIcon kind={m.icon} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="max-w-[820px] border-t border-pebble-15 pt-6 font-body text-base leading-relaxed text-pebble-80">
          Want to get involved? Reach out on{" "}
          <Link
            href="https://zagan.space"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-f1red underline-offset-2 hover:underline"
          >
            zagan.space
          </Link>
          .
        </p>
      </Container>
    </main>
  );
}
