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
    <div style={{ backgroundColor: '#0C0C10', color: '#FFFFFF', minHeight: '100vh', fontFamily: 'var(--font-body, system-ui, sans-serif)', width: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
      
      {/* High-Performance Ultra-Smooth Endless Velocity Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes trackCircuitLoop {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes endlessRacePulse {
          0% { transform: translate3d(-100%, 0, 0); }
          100% { transform: translate3d(100vw, 0, 0); }
        }
        .animated-track-circuit {
          stroke-dasharray: 40 160;
          animation: trackCircuitLoop 8s linear infinite;
        }
        .animated-track-secondary {
          stroke-dasharray: 15 85;
          animation: trackCircuitLoop 12s linear infinite reverse;
        }
        .race-pulse-ultra-smooth {
          will-change: transform;
          animation: endlessRacePulse 4s linear infinite;
        }
      `}} />

      {/* ---------- HERO AREA CONTAINER ---------- */}
      <section style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        padding: '24rem 0 12rem 0', /* Maximized padding to push the image container size to an ultra-premium desktop scaling */
        backgroundColor: '#0C0C10',
        borderBottom: '1px solid #1F1F29', 
        width: '100%', 
        boxSizing: 'border-box' 
      }}>
        
        {/* Cinematic Expanded Background Image Asset */}
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <Image
            src="/Hero-BG.png"
            alt="Hero Background"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'right 35%' }}
          />
          {/* Custom Subtle Linear Mask Arrays */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #0C0C10 12%, rgba(12, 12, 16, 0.75) 35%, rgba(12, 12, 16, 0.15) 65%, rgba(12, 12, 16, 0.6) 100%), linear-gradient(to bottom, rgba(12, 12, 16, 0) 45%, #0C0C10 100%)'
          }} />
        </div>
        
        {/* Symmetrical SVG Circuit Array Layout */}
        <svg style={{ position: 'absolute', right: 0, top: 0, width: '45%', height: '100%', pointerEvents: 'none', opacity: 0.15, zIndex: 1 }} viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path fill="none" stroke="#1F1F29" strokeWidth="4" d="M -50 410 C 220 390, 300 210, 560 230 S 800 400, 1010 260 S 1160 110, 1320 130" />
          <path fill="none" stroke="#1F1F29" strokeWidth="2" strokeDasharray="6 4" d="M -50 470 C 260 450, 360 300, 610 310 S 860 450, 1060 330 S 1190 190, 1320 210" />
          <path className="animated-track-circuit" fill="none" stroke="#E10600" strokeWidth="4" d="M -50 410 C 220 390, 300 210, 560 230 S 800 400, 1010 260 S 1160 110, 1320 130" />
          <path className="animated-track-secondary" fill="none" stroke="#38BDF8" strokeWidth="2" d="M -50 470 C 260 450, 360 300, 610 310 S 860 450, 1060 330 S 1190 190, 1320 210" />
        </svg>

        {/* Live Ultra-Smooth Endless Velocity Telemetry Line at Bottom of Image */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '3px', overflow: 'hidden', zIndex: 3, backgroundColor: 'rgba(31, 31, 41, 0.4)' }}>
          <div className="race-pulse-ultra-smooth" style={{ width: '400px', height: '100%', background: 'linear-gradient(90deg, transparent 0%, #E10600 50%, #FF3B30 70%, transparent 100%)' }} />
        </div>

        {/* Master Alignment Grid Box */}
        <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 2rem', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 2 }}>
          <div style={{ flex: '1 1 600px', boxSizing: 'border-box' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', fontWeight: 800, fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#E10600', marginBottom: '0.75rem' }}>
              <span style={{ width: '5px', height: '5px', backgroundColor: '#E10600', transform: 'rotate(45deg)' }} />
              {nextRace ? `LIVE TELEMETRY // RD ${nextRace.round} · ${nextRace.raceName}` : 'CHAMPIONSHIP DATA PLATFORM'}
            </span>
            
            <h1 style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)', fontFamily: 'var(--font-display, sans-serif)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.0, margin: 0, textShadow: '0 2px 14px rgba(0,0,0,0.7)' }}>
              {leader ? (
                <>
                  {leader.Driver.familyName} LEADS BY <span style={{ color: '#E10600', fontStyle: 'italic', display: 'inline-block', transform: 'skewX(-6deg)' }}>{gap}</span> {gap === 1 ? 'POINT' : 'POINTS'}
                </>
              ) : (
                <>CHAMPIONSHIP TELEMETRY HUB</>
              )}
            </h1>

            <p style={{ fontSize: '0.85rem', color: '#CBD5E1', lineHeight: '1.5', maxWidth: '540px', margin: '0.75rem 0 0 0', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
              {leader && second
                ? `Championship classification verification active. ${leader.Driver.givenName} ${leader.Driver.familyName} tops the driver matrix with ${leader.points} points, running a tactical buffer clear of ${second.Driver.givenName} ${second.Driver.familyName}.`
                : 'Real-time classification monitors, historical timing sheets, and live weekend telemetry matrix profiles.'}
            </p>
          </div>

          {/* Diagnostic Stats Panel */}
          <div style={{ flex: '0 1 340px', width: '100%', background: 'rgba(21, 21, 30, 0.65)', backdropFilter: 'blur(10px)', webkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(39, 39, 58, 0.5)', padding: '1.15rem', borderRadius: '3px', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.65rem', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888893', borderBottom: '1px solid rgba(39, 39, 58, 0.5)', paddingBottom: '0.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>
              <span>WORKSTATION FEED</span>
              <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '4px', height: '4px', backgroundColor: '#10B981', borderRadius: '50%' }} /> ONLINE
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.3rem 0' }}>
              <span style={{ color: '#9CA3AF' }}>DATA RETRIEVAL</span>
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>JOLPICA_ENGINE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.3rem 0' }}>
              <span style={{ color: '#9CA3AF' }}>REFRESH LIMIT</span>
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{revalidate}s CYCLE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- INTEGRATED SCROLL CHASSIS TRACK ---------- */}
      {ticker && (
        <div style={{ borderBottom: '1px solid #1F1F29', backgroundColor: '#111118', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ maxWidth: '1360px', margin: '0 auto', boxSizing: 'border-box', padding: '0 2rem' }}>
            <SessionTicker raceName={ticker.raceName} sessions={ticker.sessions} />
          </div>
        </div>
      )}

      {/* ---------- MAIN GRID SYSTEM AREA ---------- */}
      <section style={{ padding: '3.5rem 0', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 2rem', boxSizing: 'border-box' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(320px, 380px)', gap: '3.5rem', alignItems: 'start' }}>
            
            {/* LEFT AREA: CLASSIFICATIONS MAPS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', boxSizing: 'border-box', minWidth: 0 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #1F1F29', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.125rem', fontFamily: 'var(--font-display, sans-serif)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', margin: 0 }}>Driver Standings</h2>
                  <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono, monospace)', color: '#6B7280', fontWeight: 600 }}>TOP 10 PILOTS CLASSIFICATION</span>
                </div>
                <DriverStandingsPanel rows={driverRows} visibleCount={10} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #1F1F29', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.125rem', fontFamily: 'var(--font-display, sans-serif)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', margin: 0 }}>Constructor Standings</h2>
                  <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono, monospace)', color: '#6B7280', fontWeight: 600 }}>MANUFACTURERS MATRIX</span>
                </div>
                <ConstructorStandingsPanel rows={constructorRows} />
              </div>
            </div>

            {/* RIGHT SIDEBAR: LAST RACE RESULTS */}
            {lastRace && (
              <aside style={{ position: 'sticky', top: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', boxSizing: 'border-box' }}>
                <div style={{ borderBottom: '1px solid #1F1F29', paddingBottom: '0.5rem' }}>
                  <h2 style={{ fontSize: '1.125rem', fontFamily: 'var(--font-display, sans-serif)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', margin: 0 }}>Telemetry Timing Result</h2>
                  <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono, monospace)', color: '#E10600', fontWeight: 700 }}>LAST COMPLETED ROUND</span>
                </div>

                <div style={{ backgroundColor: '#111118', border: '1px solid #1F1F29', borderTop: '3px solid #E10600', padding: '1.5rem', borderRadius: '2px', boxSizing: 'border-box' }}>
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display, sans-serif)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 0.25rem 0' }}>{lastRace.raceName}</h3>
                  <p style={{ color: '#6B7280', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', margin: '0 0 1.25rem 0' }}>{lastRace.Circuit.circuitName}</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginBottom: '1.5rem' }}>
                    {lastRace.Results.slice(0, 5).map((r) => (
                      <div key={r.position} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#161622', padding: '0.625rem 0.875rem', borderRadius: '2px', borderLeft: r.position === '1' ? '2px solid #E10600' : 'none', boxSizing: 'border-box' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontWeight: 800, color: r.position === '1' ? '#E10600' : '#4B5563', width: '16px', fontStyle: 'italic' }}>{r.position}</span>
                          <div>
                            <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>{r.Driver.familyName}</div>
                            <div style={{ fontSize: '0.6875rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: 600 }}>{r.Constructor.name}</div>
                          </div>
                        </div>
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#9CA3AF', fontWeight: 600 }}>{r.Time?.time ?? r.status}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/standings" style={{ display: 'block', textAlign: 'center', backgroundColor: 'transparent', border: '1px solid #27273A', color: '#FFFFFF', padding: '0.625rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px', transition: 'border-color 0.2s' }}>
                    View Full Classification Breakdown →
                  </Link>
                </div>
              </aside>
            )}

          </div>
        </div>
      </section>
      
    </div>
  );
}