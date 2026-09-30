"use client";

import { useState } from "react";
import { Flag, Lightbulb, Medal, Trophy, Zap } from "lucide-react";
import { nationalityFlagImage } from "@/lib/f1";
import { cn } from "@/lib/utils";

type Lang = "en" | "si";

const T = {
  en: {
    eyebrow: "Career profile",
    title: "The Journey",
    statsTitle: "Career stats",
    quickTitle: "Quick facts",
    champ: "World Championships",
    wins: "Race Wins",
    podiums: "Podiums",
    poles: "Pole Positions",
    fullName: "Full name",
    number: "Driver number",
    ageDob: "Age & date of birth",
    nationality: "Nationality",
    team: "Current team",
    dyk: "Did you know?",
  },
  si: {
    eyebrow: "වෘත්තීය පැතිකඩ",
    title: "ගමන",
    statsTitle: "තරඟ වාර්තා",
    quickTitle: "කෙටි කරුණු",
    champ: "ලෝක ශූරතා",
    wins: "තරඟ ජයග්රහණ",
    podiums: "පොඩියම්",
    poles: "පෝල් ස්ථාන",
    fullName: "පූර්ණ නම",
    number: "ධාවන අංකය",
    ageDob: "වයස සහ උපන් දිනය",
    nationality: "ජාතිය",
    team: "වර්තමාන කණ්ඩායම",
    dyk: "ඔබ මෙය දන්නවද?",
  },
} as const;

export default function DriverJourney({
  journey,
  didYouKnow,
  journeySi,
  didYouKnowSi,
  stats,
  facts,
}: {
  journey: string[];
  didYouKnow: string;
  journeySi?: string[];
  didYouKnowSi?: string;
  stats: {
    championships: string;
    wins: string;
    podiums: string;
    poles: string;
  };
  facts: {
    fullName: string;
    number: string;
    ageDob: string;
    nationality: string;
    team: string;
  };
}) {
  const hasSi = Boolean(journeySi?.length || didYouKnowSi);
  const [lang, setLang] = useState<Lang>("en");
  const active: Lang = lang === "si" && hasSi ? "si" : "en";
  const t = T[active];

  const paras = active === "si" && journeySi?.length ? journeySi : journey;
  const fact =
    active === "si" && didYouKnowSi ? didYouKnowSi : didYouKnow;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-3">
        <div>
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-f1red">
            {t.eyebrow}
          </span>
          <h2 className="m-0 font-heading-big text-2xl font-bold tracking-tight">
            {t.title}
          </h2>
        </div>

        {hasSi && (
          <div className="flex w-fit items-center rounded-full border border-border bg-muted/40 p-1">
            {(
              [
                { key: "en", label: "English" },
                { key: "si", label: "සිංහල" },
              ] as { key: Lang; label: string }[]
            ).map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setLang(opt.key)}
                aria-pressed={active === opt.key}
                className={cn(
                  "rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors",
                  active === opt.key
                    ? "bg-f1red text-white"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex flex-col gap-4">
          {paras.map((p, i) => (
            <p
              key={i}
              className={cn(
                "m-0 text-[15px] leading-relaxed text-foreground/90",
                active === "si" && "text-[16px] leading-loose",
              )}
            >
              {p}
            </p>
          ))}

          {fact && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <span className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-f1red">
                <Lightbulb className="size-3.5" aria-hidden="true" />
                {t.dyk}
              </span>
              <p className="m-0 text-sm leading-relaxed text-muted-foreground">
                {fact}
              </p>
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="m-0 font-heading text-sm font-bold uppercase tracking-[0.12em]">
              {t.statsTitle}
            </h3>
            <dl className="mt-4 space-y-0">
              {[
                { Icon: Trophy, label: t.champ, value: stats.championships },
                { Icon: Flag, label: t.wins, value: stats.wins },
                { Icon: Medal, label: t.podiums, value: stats.podiums },
                { Icon: Zap, label: t.poles, value: stats.poles },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between gap-3 border-b border-border/60 py-3 last:border-0 last:pb-0"
                >
                  <dt className="flex items-center gap-2 text-[13px] text-muted-foreground">
                    <s.Icon className="size-4" aria-hidden="true" />
                    {s.label}
                  </dt>
                  <dd className="m-0 font-heading text-base font-bold tracking-tight">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="m-0 font-heading text-sm font-bold uppercase tracking-[0.12em]">
              {t.quickTitle}
            </h3>
            <dl className="mt-4 space-y-0">
              {[
                { label: t.fullName, value: facts.fullName },
                { label: t.number, value: facts.number },
                { label: t.ageDob, value: facts.ageDob },
                {
                  label: t.nationality,
                  value:
                    facts.nationality.replace(
                      new RegExp("\\s*[\\u{1F1E6}-\\u{1F1FF}]+\\s*$", "gu"),
                      "",
                    ) || facts.nationality,
                  flag: nationalityFlagImage(facts.nationality) ?? "",
                },
                { label: t.team, value: facts.team },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col gap-0.5 border-b border-border/60 py-2.5 last:border-0 last:pb-0"
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {s.label}
                  </dt>
                  <dd className="m-0 flex items-center gap-1.5 text-sm font-medium">
                    {"flag" in s && s.flag && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={s.flag}
                        alt={String(s.value)}
                        className="h-3.5 w-5 rounded-[2px] object-cover"
                      />
                    )}
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}