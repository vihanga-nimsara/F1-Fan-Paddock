"use client";

import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tooltip from "@mui/material/Tooltip";

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
  const [expanded, setExpanded] = useState<number[]>([]);

  const toggle = (i: number) =>
    setExpanded((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );

  return (
    <section className="flex flex-col gap-5">
      <div className="flex w-full items-end justify-between gap-4 border-b border-pebble-15 pb-3">
          <div className="flex flex-col gap-1.5">
            <h2 className="m-0 flex items-center gap-2 font-headline text-[clamp(20px,2.4vw,30px)] font-semibold uppercase leading-[0.95] tracking-[0.02em] text-pebble">
            Frequently Asked Questions
            <Tooltip title="Quick answers for new fans. Can't find yours? Reach the paddock on socials.">
                <span className="inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full border border-pebble-20 font-display text-[10px] font-semibold text-pebble-80 transition-colors hover:border-f1red hover:text-f1red">
                ?
              </span>
            </Tooltip>
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {FAQS.map((f, i) => (
          <Accordion
            key={f.q}
            expanded={expanded.includes(i)}
            onChange={() => toggle(i)}
            sx={{
              borderRadius: "12px !important",
              border: "1px solid var(--color-pebble-15)",
              bgcolor: "var(--color-carbon-deep)",
              "&:before": { display: "none" },
              boxShadow: "none",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#e10600" }} />}
              sx={{
                fontFamily: "var(--font-display)",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--color-pebble)",
              }}
            >
              {f.q}
            </AccordionSummary>
            <AccordionDetails
              sx={{
                fontSize: "0.875rem",
                lineHeight: 1.6,
                color: "var(--color-pebble-80)",
                fontFamily: "var(--font-body)",
              }}
            >
              {f.a}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </section>
  );
}
