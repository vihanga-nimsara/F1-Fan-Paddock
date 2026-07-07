const ARTICLES = [
  {
    tag: 'Technical',
    accent: 'var(--purple)',
    title: 'Reading The Floor: How Teams Chase Ground Effect',
    dek: 'What separates the fastest cars through fast corners this season, and why it keeps changing.',
  },
  {
    tag: 'Race Reports',
    accent: 'var(--amber)',
    title: 'Strategy Calls That Decided The Last Five Races',
    dek: 'Undercuts, safety car timing, and tyre gambles — the calls that mattered most.',
  },
  {
    tag: 'History',
    accent: 'var(--green)',
    title: 'Every Champion Since 1950, Ranked By Era',
    dek: 'Comparing eras is never fair, but here\u2019s our attempt anyway.',
  },
  {
    tag: 'Driver Profiles',
    accent: 'var(--t-mercedes)',
    title: 'The Rookies Redefining What A First Season Looks Like',
    dek: 'Points hauls that would have been unthinkable for a debutant a decade ago.',
  },
  {
    tag: 'Technical',
    accent: 'var(--t-redbull)',
    title: 'Why Cooling Is The Next Battleground',
    dek: 'Tight bodywork saves drag but risks overheating — how teams are walking that line.',
  },
  {
    tag: 'Breaking',
    accent: 'var(--red)',
    title: 'What Changes Under Next Year\u2019s Regulations',
    dek: 'A plain-language look at the ruleset teams are already designing around.',
  },
];

export default function ArticlesPage() {
  return (
    <>
      <header className="page-header">
        <span className="eyebrow">Articles</span>
        <h1>From The Paddock</h1>
        <p>Analysis, race reports, and history — written by the TFB staff.</p>
      </header>

      <section className="articles" style={{ paddingTop: 'clamp(24px,4vw,40px)' }}>
        <div className="article-grid">
          {ARTICLES.map((a) => (
            <a href="#" className="article-card" key={a.title} style={{ ['--card-accent' as string]: a.accent }}>
              <div className="card-visual" />
              <div className="card-body">
                <span className="card-tag">{a.tag}</span>
                <h3>{a.title}</h3>
                <p>{a.dek}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}