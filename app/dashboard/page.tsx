import Link from 'next/link';
import Image from 'next/image';
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
    <div style={{ backgroundColor: '#09090B', color: '#FAFAFA', minHeight: '100vh', fontFamily: 'var(--font-body, system-ui, sans-serif)' }}>
      
      {/* ---------- CUSTOM HARDWARE ACCELERATED ANIMATION MATRIX ---------- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes telemetryFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes vectorSlide {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 0.08; }
        }
        .animate-fade {
          animation: telemetryFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .paddock-card {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease !important;
        }
        .paddock-card:hover {
          transform: translateY(-4px) scale(1.01) !important;
          border-color: #3F3F46 !important;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4) !important;
        }
        .btn-interactive {
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.1s ease !important;
        }
        .btn-interactive:hover {
          background-color: #FFFFFF !important;
          color: #09090B !important;
          border-color: #FFFFFF !important;
        }
        .btn-interactive:active {
          transform: scale(0.98);
        }
      `}} />

      {/* ---------- HERO / MAIN TELEMETRY CONTROL MATRIX ---------- */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '5rem 0 4rem 0', background: 'radial-gradient(circle at 85% 30%, #18181B 0%, #09090B 70%)', borderBottom: '1px solid #27272A' }}>
        <svg style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', pointerEvents: 'none', animation: 'vectorSlide 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards' }} viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path fill="none" stroke="#E10600" strokeWidth="2" d="M -50 410 C 220 390, 300 210, 560 230 S 800 400, 1010 260 S 1160 110, 1320 130" />
          <path fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="6 4" d="M -50 470 C 260 450, 360 300, 610 310 S 860 450, 1060 330 S 1190 190, 1320 210" />
        </svg>

        <div className="animate-fade" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 2rem', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '1fr minmax(340px, 420px)', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#E10600', marginBottom: '1rem' }}>
              <span style={{ width: '6px', height: '6px', backgroundColor: '#E10600', transform: 'rotate(45deg)' }} />
              {nextRace ? `LIVE DATASTREAM // RD ${nextRace.round} · ${nextRace.raceName}` : 'CHAMPIONSHIP DATA PLATFORM'}
            </span>
            
            <h1 style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', fontFamily: 'var(--font-display, sans-serif)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0 }}>
              {leader ? (
                <>
                  {leader.Driver.familyName} LEADS BY <span style={{ color: '#E10600', display: 'inline-block', transform: 'skewX(-6deg)' }}>{gap}</span> {gap === 1 ? 'POINT' : 'POINTS'}
                </>
              ) : (
                <>LIVE PERFORMANCE &amp; GRID MONITOR</>
              )}
            </h1>

            <p style={{ fontSize: '0.9375rem', color: '#A1A1AA', lineHeight: '1.6', maxWidth: '600px', margin: '1.25rem 0 0 0' }}>
              {leader && second
                ? `${leader.Driver.givenName} ${leader.Driver.familyName} dominates the global sequence ranking arrays. Structural tracking computations running active telemetry frames.`
                : 'Active live engine diagnostics feed framing structural track data arrays instantly.'}
            </p>
          </div>

          {/* Pit Wall Diagnostic Widget */}
          <div style={{ background: '#141416', border: '1px solid #27272A', padding: '1.25rem', borderRadius: '4px', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#71717A', borderBottom: '1px solid #27272A', paddingBottom: '0.5rem', marginBottom: '0.75rem', fontWeight: 700 }}>
              <span>CORE SYSTEM FEED</span>
              <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', backgroundColor: '#10B981', borderRadius: '50%' }} /> CONNECTED
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.375rem 0' }}>
              <span style={{ color: '#A1A1AA' }}>API ENDPOINT</span>
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>JOLPICA_ENGINE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.375rem 0' }}>
              <span style={{ color: '#A1A1AA' }}>REVALIDATION CYCLE</span>
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{revalidate}s INTERVAL</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.375rem 0' }}>
              <span style={{ color: '#A1A1AA' }}>TRACK TIMING DATA</span>
              <span style={{ color: '#E10600', fontWeight: 700 }}>LIVE SYNCHRONIZED</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- LIVE TICKER SYSTEM ---------- */}
      {ticker && (
        <div style={{ borderBottom: '1px solid #27272A', backgroundColor: '#141416' }}>
          <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 2rem', boxSizing: 'border-box' }}>
            <SessionTicker raceName={ticker.raceName} sessions={ticker.sessions} />
          </div>
        </div>
      )}

      {/* ---------- LIVE GRID ACTION MATRIX ---------- */}
      <section style={{ padding: '4rem 0', background: 'linear-gradient(180deg, #09090B 0%, #141416 100%)' }}>
        <div className="animate-fade" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 2rem', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '1fr minmax(340px, 420px)', gap: '4rem', alignItems: 'start', animationDelay: '0.15s', opacity: 0 }}>
          
          {/* LEFT PANELS: LEADERBOARDS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #27272A', paddingBottom: '0.75rem', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display, sans-serif)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', margin: 0 }}>Championship Framework</h2>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#71717A', fontWeight: 600 }}>{nextRace ? `Ahead of Rd ${nextRace.round}` : 'Current Standings'}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {driverRows.length > 0 ? (
                  <DriverStandingsPanel rows={driverRows} visibleCount={10} countLabel="PROVISIONAL CLASSIFICATION" />
                ) : (
                  <div style={{ backgroundColor: '#141416', padding: '2rem', textAlign: 'center', color: '#52525B', border: '1px dashed #27272A', borderRadius: '4px', fontSize: '0.875rem' }}>Awaiting structural driver classification data streams...</div>
                )}

                {constructorRows.length > 0 ? (
                  <ConstructorStandingsPanel rows={constructorRows} countLabel="CONSTRUCTOR STANDINGS" />
                ) : (
                  <div style={{ backgroundColor: '#141416', padding: '2rem', textAlign: 'center', color: '#52525B', border: '1px dashed #27272A', borderRadius: '4px', fontSize: '0.875rem' }}>Awaiting technical constructor matrix data...</div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: LATEST CLASSIFICATION */}
          {lastRace && (
            <aside style={{ position: 'sticky', top: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ borderBottom: '1px solid #27272A', paddingBottom: '0.75rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display, sans-serif)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', margin: 0 }}>Track Timing Result</h2>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#E10600', fontWeight: 700 }}>ROUND {lastRace.round} TOP 5</span>
              </div>

              <div style={{ backgroundColor: '#141416', border: '1px solid #27272A', borderTop: '3px solid #E10600', padding: '1.5rem', borderRadius: '4px', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
                
                <div style={{ position: 'relative', width: '100%', height: '140px', marginBottom: '1.25rem', borderRadius: '2px', overflow: 'hidden' }}>
                  <Image 
                    src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600" 
                    alt="Formula Race Car Circuit Finish"
                    fill
                    sizes="(max-width: 420px) 100vw, 420px"
                    style={{ objectFit: 'cover', filter: 'brightness(0.7) contrast(1.1)' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, #141416 100%)' }} />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.375rem', fontFamily: 'var(--font-display, sans-serif)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 0.25rem 0', letterSpacing: '-0.01em' }}>{lastRace.raceName}</h3>
                  <div style={{ color: '#71717A', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{lastRace.Circuit.circuitName}</div>
                </div>
                
                <p style={{ fontSize: '0.8125rem', color: '#A1A1AA', margin: '0 0 1.25rem 0', lineHeight: '1.5' }}>
                  Official verified race classification. Positions locked by race control.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {lastRace.Results.slice(0, 5).map((r) => (
                    <div key={r.position} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1C1C1E', padding: '0.75rem 1rem', borderRadius: '4px', borderLeft: r.position === '1' ? '2px solid #E10600' : 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ color: r.position === '1' ? '#E10600' : '#52525B', fontStyle: 'italic', fontFamily: 'var(--font-mono, monospace)', fontWeight: 800, width: '16px' }}>
                          {r.position}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FFFFFF' }}>{r.Driver.familyName}</div>
                          <div style={{ fontSize: '0.6875rem', color: '#71717A', textTransform: 'uppercase', fontWeight: 600 }}>{r.Constructor.name}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#A1A1AA' }}>{r.Time?.time ?? r.status}</div>
                    </div>
                  ))}
                </div>

                <Link className="btn-interactive" href="/standings" style={{ display: 'block', textAlign: 'center', backgroundColor: 'transparent', border: '1px solid #27272A', color: '#FFFFFF', padding: '0.75rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', borderRadius: '4px' }}>
                  Full Classifications →
                </Link>
              </div>
            </aside>
          )}

        </div>
      </section>

      {/* ---------- PADDOCK STREAM ANALYSIS ---------- */}
      <section style={{ borderTop: '1px solid #27272A', backgroundColor: '#09090B', padding: '4rem 0' }}>
        <div className="animate-fade" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 2rem', boxSizing: 'border-box', animationDelay: '0.3s', opacity: 0 }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display, sans-serif)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', margin: 0 }}>From The Paddock</h2>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#71717A', fontWeight: 600 }}>Data &amp; Technical Analysis</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {[
              { tag: 'Technical', title: 'Reading The Floor: How Teams Chase Ground Effect', desc: 'What separates the fastest configurations through performance sectors this season.', accent: '#E10600', img: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600' },
              { tag: 'Race Reports', title: 'Strategy Calls That Decided The Last Five Races', desc: 'Undercuts, safety car phases, and tyre compound windows.', accent: '#F59E0B', img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=600' },
              { tag: 'History', title: 'Every Champion Since 1950, Ranked By Era', desc: 'Normalized mechanical and structural cross-era data metrics.', accent: '#10B981', img: 'https://images.unsplash.com/photo-1552664688-cf412ec27db2?auto=format&fit=crop&q=80&w=600' }
            ].map((art, index) => (
              <Link 
                key={index} 
                href="/articles" 
                className="paddock-card"
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', backgroundColor: '#141416', border: '1px solid #27272A', borderRadius: '4px', overflow: 'hidden' }}
              >
                <div style={{ height: '160px', position: 'relative', width: '100%' }}>
                  <Image 
                    src={art.img} 
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '4px', backgroundColor: art.accent }} />
                  <div style={{ position: 'absolute', top: '8px', right: '12px', color: 'rgba(255,255,255,0.15)', fontSize: '2.5rem', fontWeight: 900, fontStyle: 'italic', fontFamily: 'var(--font-display, sans-serif)' }}>0{index+1}</div>
                </div>
                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', color: art.accent, fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.06em', marginBottom: '0.5rem', display: 'block' }}>{art.tag}</span>
                  <h3 style={{ fontSize: '1.125rem', fontFamily: 'var(--font-display, sans-serif)', fontWeight: 800, margin: '0 0 0.75rem 0', lineHeight: 1.3, textTransform: 'uppercase', color: '#FFFFFF' }}>{art.title}</h3>
                  <p style={{ color: '#A1A1AA', fontSize: '0.8125rem', lineHeight: 1.5, margin: 0, marginTop: 'auto' }}>{art.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}