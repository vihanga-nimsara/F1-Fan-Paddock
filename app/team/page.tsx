import Link from "next/link";
import { Container, SectionHeading, Kicker } from "@/components/f1kit";
import TeamAvatar from "@/components/TeamAvatar";

export const metadata = {
  title: "Team — F1 Paddock SL",
};

const ZAGAN_IMG =
  "https://github.com/vihanga-nimsara.png?size=200";

const FB_AVATAR =
  "https://z-p3-scontent.fcmb9-1.fna.fbcdn.net/v/t39.30808-6/760620612_1447878237399436_7335193726209077918_n.jpg?stp=dst-jpg_tt6&cstp=mx640x640&ctp=s640x640&_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGt6Buc3gZx9rW-zYHgSKD0fC8vIZ3dLjl8Ly8hnd0uObJ2u27uItGFJGqgmaDQq9WeCRtd5qsIMn_CGuCatf59&_nc_ohc=L4Lp85w9GtYQ7kNvwFZtIyQ&_nc_oc=AdqNjJb_NLYXfhC_UqYA-DX1KCHBeWT2QLI672jPUOkw6zFPUnnL0RrD7wPFlQRpsqE&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb9-1.fna&_nc_gid=oEbf30Xj1BCpr8KNqOvwmg&_nc_ss=7b2a8&oh=00_AQE8WwpouHYBctAV7RvhvelkJ6TkFmIyhhhuag9zaTWcjA&oe=6A913641";

// Facebook CDN image URLs are time-limited — route through our proxy so the
// avatar keeps loading even after the original URL expires.
const HANSAKA_IMG = `/api/fbimg?u=${encodeURIComponent(FB_AVATAR)}`;

const TEAM = [
  {
    name: "Zagan",
    role: "Developer",
    bio: "Designs, builds, and maintains F1 Paddock SL — from the data pipelines that pull standings and timing to the frontend you're browsing. A lifelong Formula 1 fan who'd rather ship clean stats and good race writing than sit still on a Sunday.",
    image: ZAGAN_IMG,
    href: "https://github.com/vihanga-nimsara",
  },
  {
    name: "Hansaka Nethmina",
    role: "Blogger & Facebook Admin",
    bio: "Runs our Facebook page and brings the F1 knowledge — race-weekend context, paddock reads, and the stories fans actually want to talk about.",
    image: HANSAKA_IMG,
    href: "https://web.facebook.com/profile.php?id=61574396222083",
  },
];

export default function TeamPage() {
  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-10 py-8 md:py-12">
        <div className="flex flex-col gap-3">
          <Kicker>Team</Kicker>
          <SectionHeading
            kicker="Team"
            title="Who keeps it running"
            href="/about"
            linkLabel="About the site"
          />
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
              className="flex flex-col gap-4 rounded-xl border border-pebble-15 bg-pebble-5 p-6"
            >
              <TeamAvatar src={m.image} name={m.name} />
              <div className="flex flex-col gap-1">
                <h3 className="m-0 font-display text-lg font-semibold tracking-[0.03em] text-pebble">
                  {m.href ? (
                    <Link
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-f1red"
                    >
                      {m.name}
                    </Link>
                  ) : (
                    m.name
                  )}
                </h3>
                <span className="font-display text-[11px] font-semibold tracking-[0.12em] text-f1red uppercase">
                  {m.role}
                </span>
              </div>
              <p className="m-0 font-body text-sm leading-relaxed text-pebble-80">
                {m.bio}
              </p>
            </article>
          ))}
        </div>

        <p className="max-w-[820px] border-t border-pebble-15 pt-6 font-body text-base leading-relaxed text-pebble-80">
          Want to get involved? Reach out on{" "}
          <Link
            href="https://web.facebook.com/profile.php?id=61574396222083"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-f1red underline-offset-2 hover:underline"
          >
            Facebook
          </Link>
          .
        </p>
      </Container>
    </main>
  );
}
