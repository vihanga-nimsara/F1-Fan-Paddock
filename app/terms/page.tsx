import Link from "next/link";
import { Container, SectionHeading, Kicker } from "@/components/f1kit";

export const metadata = {
  title: "Terms of Service — F1 Paddock SL",
};

const SECTIONS = [
  {
    title: "1. Acceptance of terms",
    body: "By using F1 Paddock SL you agree to these terms. This is a fan-made, non-commercial project and is not affiliated with Formula 1, the FIA, or any team.",
  },
  {
    title: "2. Content accuracy",
    body: "Standings, results, and live timing are sourced from third-party open APIs and may contain errors or be delayed. Nothing here is official.",
  },
  {
    title: "3. Intellectual property",
    body: "Team logos, driver imagery, and event names remain the property of their respective owners. Original site code and editorial text are provided for personal, non-commercial use.",
  },
  {
    title: "4. Limitation of liability",
    body: "We provide the site 'as is' without warranties. We are not liable for data inaccuracies, temporary outages, or anything derived from live timing feeds.",
  },
  {
    title: "5. External content",
    body: "Stories link to external publishers whose content is governed by their own terms. We do not endorse the accuracy of third-party articles.",
  },
  {
    title: "6. Changes",
    body: "These terms may be updated. Continued use after changes constitutes acceptance. Questions can be raised via the project repository.",
  },
];

export default function TermsPage() {
  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-10 py-8 md:py-12">
        <div className="flex flex-col gap-3">
          <Kicker>Legal</Kicker>
          <SectionHeading
            kicker="Legal"
            title="Terms of Service"
            href="/privacy"
            linkLabel="Privacy Policy"
          />
          <p className="m-0 max-w-[820px] font-body text-sm text-pebble-80">
            Last updated August 2026. The fine print for using F1 Paddock SL.
          </p>
        </div>

        <div className="flex w-full max-w-[820px] flex-col gap-8 text-left">
          {SECTIONS.map((s) => (
            <section key={s.title} className="flex flex-col gap-2 text-left">
              <h2 className="m-0 font-display text-lg font-semibold tracking-[0.04em] text-pebble">
                {s.title}
              </h2>
              <p className="m-0 font-body text-base leading-relaxed text-pebble-80">
                {s.body}
              </p>
            </section>
          ))}

          <p className="m-0 border-t border-pebble-15 pt-6 font-body text-base leading-relaxed text-pebble-80 text-left">
            See also our{" "}
            <Link
              href="/privacy"
              className="font-medium text-f1red underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </Container>
    </main>
  );
}
