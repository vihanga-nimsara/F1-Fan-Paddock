"use client";

import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQS = [
  {
    q: "Is this an official Formula 1 site?",
    a: "No. F1 Paddock SL is an independent fan project. We aggregate public race data and publish original analysis, opinions and community stories. We are not affiliated with Formula 1, the FIA or any team.",
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
      <div className="flex flex-col gap-3">
        {FAQS.map((f, i) => (
          <Accordion
            key={f.q}
            expanded={expanded.includes(i)}
            onChange={() => toggle(i)}
            sx={{
              borderRadius: "4px !important",
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
