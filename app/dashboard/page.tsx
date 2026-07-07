import Link from 'next/link';
import SessionTicker from '@/components/SessionTicker';
import { DriverStandingsPanel, ConstructorStandingsPanel } from '@/components/StandingsPanels';
import { getDriverStandings, getConstructorStandings, getSeasonSchedule, getLastRaceResult } from '@/lib/jolpica';
import { buildTicker } from '@/lib/ticker';

export const revalidate = 120;

export default async function HomePage() {
  const [driverStandings, constructorStandings, schedule, lastRace] = await Promise.all([
    getDriverStandings(),
    getConstructorStandings(),
    getSeasonSchedule(),
    getLastRaceResult(),
  ]);

  const ticker = buildTicker(schedule);

  const driverRows = driverStandings.map((d) => ({
    position: d.position,
    name: `${d.Driver.givenName} ${d.Driver.familyName}`,
    team: d.Constructors[0]?.name ?? '—',
    points: d.points,
  }));

  const constructorRows = constructorStandings.map((c) => ({
    position: c.position,
    name: c.Constructor.name,
    subtitle: '',
    points: c.points,
  }));

  const leader = driverStandings[0];
  const second = driverStandings[1];
  const gap = leader && second ? Number(leader.points) - Number(second.points) : null;

  const nextRace = schedule.find((r) => new Date(`${r.date}T${r.time ?? '00:00:00Z'}`).getTime() > Date.now());

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <svg className="hero-lines" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path
            className="l1"
            d="M -50 410 C 220 390, 300 210, 560 230 S 800 400, 1010 260 S 1160 110, 1320 130"
          />
          <path
            className="l2"
            d="M -50 470 C 260 450, 360 300, 610 310 S 860 450, 1060 330 S 1190 190, 1320 210"
          />
        </svg>
        <div className="hero-inner">
          <span className="eyebrow">
            {nextRace ? `Round ${nextRace.round} · ${nextRace.raceName}` : 'Championship Update'}
          </span>
          <h1>
            {leader ? (
              <>
                {leader.Driver.familyName} Leads By <em>{gap}</em> {gap === 1 ? 'Point' : 'Points'}
              </>
            ) : (
              <>Follow The Championship, Session By Session</>
            )}
          </h1>
          <p className="dek">
            {leader && second
              ? `${leader.Driver.givenName} ${leader.Driver.familyName} holds the top of the standings on ${leader.points} points, ${gap} clear of ${second.Driver.givenName} ${second.Driver.familyName} in second. Live timing below tracks every session as it happens, backed by decades of historical form.`
              : 'Live timing, championship standings, and race analysis — built on real-time and historical F1 data.'}
          </p>
          <div className="hero-meta">
            <span>TFB Staff</span>
            <span>Championship Report</span>
            {nextRace && <span>{nextRace.Circuit.circuitName}</span>}
          </div>
          <Link href="/dashboard" className="text-link">
            Open the live dashboard →
          </Link>
        </div>
      </section>

      {/* ---------- SESSION TICKER ---------- */}
      {ticker && <SessionTicker raceName={ticker.raceName} sessions={ticker.sessions} />}

      {/* ---------- STANDINGS ---------- */}
      <section className="standings" id="standings">
        <div className="section-head">
          <h2>Championship Standings</h2>
          <span className="section-sub">
            {nextRace ? `Ahead of Round ${nextRace.round}` : 'Current Season'}
          </span>
        </div>
        <div className="standings-grid">
          {driverRows.length > 0 ? (
            <DriverStandingsPanel rows={driverRows} visibleCount={10} />
          ) : (
            <div className="standings-panel">
              <div className="empty-state">Standings unavailable right now.</div>
            </div>
          )}
          {constructorRows.length > 0 ? (
            <ConstructorStandingsPanel rows={constructorRows} />
          ) : (
            <div className="standings-panel">
              <div className="empty-state">Standings unavailable right now.</div>
            </div>
          )}
        </div>
      </section>

      {/* ---------- LATEST RESULT ---------- */}
      {lastRace && (
        <section className="result">
          <div className="section-head">
            <h2>Latest Result</h2>
            <span className="section-sub">Round {lastRace.round}</span>
          </div>
          <div className="result-card">
            <div className="result-head">
              <h3>{lastRace.raceName}</h3>
              <span className="result-circuit">{lastRace.Circuit.circuitName}</span>
            </div>
            <p className="result-note">
              Full classification from {lastRace.raceName}, {new Date(lastRace.date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              .
            </p>
            <div className="result-list">
              {lastRace.Results.slice(0, 5).map((r) => (
                <div className="result-row" key={r.position}>
                  <div className="result-pos">{r.position}</div>
                  <div className="result-name">
                    {r.Driver.givenName} {r.Driver.familyName}
                    <span className="result-team">{r.Constructor.name}</span>
                  </div>
                  <div className="result-gap">
                    {r.Time?.time ?? r.status}
                  </div>
                </div>
              ))}
            </div>
            <Link href="/standings" className="text-link">
              View full standings →
            </Link>
          </div>
        </section>
      )}

      {/* ---------- ARTICLES ---------- */}
      <section className="articles">
        <div className="section-head">
          <h2>From The Paddock</h2>
          <span className="section-sub">Analysis &amp; Opinion</span>
        </div>
        <div className="article-grid">
          <Link href="/articles" className="article-card" style={{ ['--card-accent' as string]: 'var(--purple)' }}>
            <div className="card-visual" />
            <div className="card-body">
              <span className="card-tag">Technical</span>
              <h3>Reading The Floor: How Teams Chase Ground Effect</h3>
              <p>What separates the fastest cars through fast corners this season, and why it keeps changing.</p>
            </div>
          </Link>
          <Link href="/articles" className="article-card" style={{ ['--card-accent' as string]: 'var(--amber)' }}>
            <div className="card-visual" />
            <div className="card-body">
              <span className="card-tag">Race Reports</span>
              <h3>Strategy Calls That Decided The Last Five Races</h3>
              <p>Undercuts, safety car timing, and tyre gambles — the calls that mattered most.</p>
            </div>
          </Link>
          <Link href="/articles" className="article-card" style={{ ['--card-accent' as string]: 'var(--green)' }}>
            <div className="card-visual" />
            <div className="card-body">
              <span className="card-tag">History</span>
              <h3>Every Champion Since 1950, Ranked By Era</h3>
              <p>Comparing eras is never fair, but here&rsquo;s our attempt anyway.</p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}