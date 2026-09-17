import Link from "next/link";
import { Container, SectionHeading, Kicker } from "@/components/f1kit";

export const metadata = {
  title: "Privacy Policy — F1 Paddock SL",
};

const SECTIONS = [
  {
    title: "1. Information we collect",
    body: "F1 Paddock SL is a fan-made project. We do not require an account to browse. If you sign in, we may store your display name and preferences locally. We do not sell personal data.",
  },
  {
    title: "2. Cookies",
    body: "We use a minimal set of cookies and local storage to remember your cookie choice and your welcome-screen preference. No advertising or cross-site tracking cookies are used.",
  },
  {
    title: "3. Third-party data",
    body: "Standings, race results, and live timing data are provided by Jolpica-F1 and OpenF1, which are open, free public APIs. Driver headshots and team logos are served from media.formula1.com.",
  },
  {
    title: "4. External links",
    body: "Paddock stories link out to external publishers (ESPN, BBC Sport, Sky Sports). Their sites have their own privacy policies. Embedded YouTube videos are governed by Google's privacy policy.",
  },
  {
    title: "5. Data retention",
    body: "Anything stored locally on your device (cookie preferences, welcome flags) can be cleared at any time through your browser settings. We do not operate our own analytics backend.",
  },
  {
    title: "6. Contact",
    body: "Questions about this policy can be raised by opening an issue on the project repository. This policy may be updated as the site evolves.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-10 py-8 md:py-12">
        <div className="flex flex-col gap-3">
          <Kicker>Legal</Kicker>
          <SectionHeading
            kicker="Legal"
            title="Privacy Policy"
            href="/terms"
            linkLabel="Terms of Service"
          />
          <p className="m-0 max-w-[820px] font-body text-sm text-pebble-80">
            Last updated August 2026. How F1 Paddock SL handles your data.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-[820px] flex-col gap-8">
          {SECTIONS.map((s) => (
            <section key={s.title} className="flex flex-col gap-2">
              <h2 className="m-0 font-display text-lg font-semibold tracking-[0.04em] text-pebble">
                {s.title}
              </h2>
              <p className="m-0 font-body text-base leading-relaxed text-pebble-80">
                {s.body}
              </p>
            </section>
          ))}

          <p className="m-0 border-t border-pebble-15 pt-6 font-body text-base leading-relaxed text-pebble-80">
            See also our{" "}
            <Link
              href="/terms"
              className="font-medium text-f1red underline-offset-2 hover:underline"
            >
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </Container>
    </main>
  );
}
