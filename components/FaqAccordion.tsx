"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Tooltip } from "@base-ui/react/tooltip";

const FAQS = [
  {
    q: "Is this an official Formula 1 site?",
    a: "No. F1 Fan Paddock is an independent fan project. We aggregate public race data and publish original analysis, opinions and community stories. We are not affiliated with Formula 1, the FIA or any team.",
  },
  {
    q: "How do live timings work?",
    a: "During a session we stream sector and lap deltas as they happen, so you can follow gaps between drivers in real time. Timings are derived from the official feed and may lag a few seconds behind the broadcast.",
  },
  {
    q: "Can I submit a story?",
    a: "Yes. Any verified fan can pitch a race report, technical deep dive or opinion piece. Our editors review submissions for the blog, and the best ones land on the homepage.",
  },
  {
    q: "Where does the standings data come from?",
    a: "Driver and constructor points are pulled from the public timing API after each round and cached until the next session, so the tables always reflect the latest official results.",
  },
];

export default function FaqAccordion() {
  return (
    <Tooltip.Provider>
      <section className="flex flex-col gap-5">
        <div className="flex w-full items-end justify-between gap-4 border-b border-pebble-15 pb-3">
          <div className="flex flex-col gap-1.5">
            <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold tracking-[0.16em] text-f1red">
              <span className="h-3 w-[3px] bg-f1red" aria-hidden="true" />
              HELP
            </span>
            <h2 className="m-0 flex items-center gap-2 font-headline text-[clamp(20px,2.4vw,30px)] font-semibold uppercase leading-[0.95] tracking-[0.02em] text-pebble">
              Frequently Asked Questions
              <Tooltip.Root>
                <Tooltip.Trigger
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-pebble-30 font-display text-[10px] font-semibold text-pebble-80 transition-colors hover:border-f1red hover:text-f1red"
                  aria-label="About these FAQs"
                >
                  ?
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Positioner sideOffset={8}>
                    <Tooltip.Popup className="max-w-[240px] rounded-[2px] border border-pebble-15 bg-carbon-deep px-3 py-2 text-[11px] leading-snug text-pebble-80 shadow-lg">
                      <Tooltip.Arrow className="text-carbon-deep" />
                      Quick answers for new fans. Can&apos;t find yours? Reach the
                      paddock on socials.
                    </Tooltip.Popup>
                  </Tooltip.Positioner>
                </Tooltip.Portal>
              </Tooltip.Root>
            </h2>
          </div>
        </div>

        <Accordion.Root className="flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <Accordion.Item
              key={f.q}
              value={i}
              className="overflow-hidden rounded-[2px] border border-pebble-15 bg-carbon-deep"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-sm font-semibold text-pebble transition-colors hover:text-f1red data-[panel-open]:text-f1red">
                  {f.q}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 shrink-0 text-f1red transition-transform duration-300 group-data-[panel-open]:rotate-180"
                    aria-hidden="true"
                  >
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="px-5 pb-5 text-sm leading-relaxed text-pebble-80">
                {f.a}
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </section>
    </Tooltip.Provider>
  );
}
