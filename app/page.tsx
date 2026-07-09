import Link from 'next/link';
import Image from 'next/image';
import SessionTicker from '@/components/SessionTicker';
import ClassificationLink from '@/components/ClassificationLink';
import { DriverStandingsPanel, ConstructorStandingsPanel } from '@/components/StandingsPanels';
import { getDriverStandings, getConstructorStandings, getSeasonSchedule, getLastRaceResult } from '@/lib/jolpica';
import { buildTicker } from '@/lib/ticker';
import LiveCountdown from '@/components/LiveCountdown';
import { getRaceWeekendForecast, type WeatherDay } from '@/lib/weather';

export const revalidate = 120;

// ─── Shared spacing scale ───
const SECTION_GAP = '48px';

// ─── Types for future sections ───


interface ExploreCard {
  title: string;
  description: string;
  href: string;
  accent: string;
  icon: React.ReactNode;
}

interface GridLeader {
  category: string;
  driver: string;
  value: number;
  accent: string;
}

interface PodiumDriver {
  position: number;
  name: string;
  team: string;
  teamColor: string;
}

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

  const raceLat = nextRace?.Circuit?.Location?.lat ? Number(nextRace.Circuit.Location.lat) : 50.4372;
  const raceLon = nextRace?.Circuit?.Location?.long ? Number(nextRace.Circuit.Location.long) : 5.9714;
  const raceDateISO = nextRace
    ? `${nextRace.date}T${nextRace.time ?? '13:00:00Z'}`
    : '2026-07-19T13:00:00Z';

  const weatherForecast: WeatherDay[] = await getRaceWeekendForecast(raceLat, raceLon, raceDateISO);

  

  const exploreCards: ExploreCard[] = [
    { title: 'Drivers', description: 'Full driver profiles, career stats, championship points, wins and podiums for every F1 driver.', href: '/drivers', accent: '#E10600', icon: <DriversIcon /> },
    { title: 'Constructors', description: 'Team standings, constructor history, win tallies and cumulative points across seasons.', href: '/constructors', accent: '#6CD3BF', icon: <ConstructorsIcon /> },
    { title: 'Circuits', description: 'Track profiles, layout maps, lap records and race-by-race history.', href: '/circuits', accent: '#F59E0B', icon: <CircuitsIcon /> },
    { title: 'Races', description: 'Detailed race results, qualifying times, lap leaders, fastest laps and sprint data.', href: '/results', accent: '#10B981', icon: <RacesIcon /> },
    { title: 'Seasons', description: 'Season-by-season standings, qualifying stats, race records and championship battles.', href: '/seasons', accent: '#8B5CF6', icon: <SeasonsIcon /> },
    { title: 'Calendar', description: 'Full race calendar with dates, times, circuits and upcoming event schedules.', href: '/calendar', accent: '#3B82F6', icon: <CalendarIcon /> },
    { title: 'Statistics', description: 'All-time leaderboards across wins, podiums, poles, streaks and head-to-heads.', href: '/stats', accent: '#EC4899', icon: <StatsIcon /> },
    { title: 'Trends', description: 'Live streaks, current championship pace and recent-form snapshots.', href: '/trends', accent: '#14B8A6', icon: <TrendsIcon /> },
  ];

  const gridLeaders: GridLeader[] = [
    { category: 'Wins', driver: 'Lewis Hamilton', value: 106, accent: '#F59E0B' },
    { category: 'Podiums', driver: 'Lewis Hamilton', value: 207, accent: '#A1A1AA' },
    { category: 'Poles', driver: 'Lewis Hamilton', value: 104, accent: '#3B82F6' },
    { category: 'GPs', driver: 'Fernando Alonso', value: 434, accent: '#10B981' },
  ];

  const lastPodium: PodiumDriver[] = [
    { position: 1, name: 'Charles Leclerc', team: 'Ferrari', teamColor: '#E80020' },
    { position: 2, name: 'George Russell', team: 'Mercedes', teamColor: '#6CD3BF' },
    { position: 3, name: 'Lewis Hamilton', team: 'Ferrari', teamColor: '#E80020' },
  ];

  return (
    <div style={{
      backgroundColor: '#0B0C10',
      color: '#FAFAFA',
      minHeight: '100vh',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      width: '100%',
      overflowX: 'hidden',
      boxSizing: 'border-box'
    }}>

      {/* ─── ANIMATIONS ─── */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes trackCircuitLoop {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes endlessRacePulse {
          0% { transform: translate3d(-100%, 0, 0); }
          100% { transform: translate3d(100vw, 0, 0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseLive {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(225, 6, 0, 0.4); }
          50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(225, 6, 0, 0); }
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
        .animate-fade-in {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }
      `}} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO
          Status: ✅ COMPLETE
          ═══════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(8rem, 15vw, 14rem) 0 clamp(3rem, 6vw, 4.5rem)',
        backgroundColor: '#0B0C10',
        borderBottom: '1px solid #1F1F27',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Background Image */}
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <Image
            src="/Hero-BG.png"
            alt="Hero Background"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'right 35%' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #0B0C10 10%, rgba(11, 12, 16, 0.85) 30%, rgba(11, 12, 16, 0.2) 60%, rgba(11, 12, 16, 0.5) 100%), linear-gradient(to bottom, rgba(11, 12, 16, 0) 50%, #0B0C10 100%)'
          }} />
        </div>

        {/* SVG Circuit Lines */}
        <svg style={{ position: 'absolute', right: 0, top: 0, width: '45%', height: '100%', pointerEvents: 'none', opacity: 0.12, zIndex: 1 }} viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path fill="none" stroke="#1F1F27" strokeWidth="4" d="M -50 410 C 220 390, 300 210, 560 230 S 800 400, 1010 260 S 1160 110, 1320 130" />
          <path fill="none" stroke="#1F1F27" strokeWidth="2" strokeDasharray="6 4" d="M -50 470 C 260 450, 360 300, 610 310 S 860 450, 1060 330 S 1190 190, 1320 210" />
          <path className="animated-track-circuit" fill="none" stroke="#E10600" strokeWidth="3" d="M -50 410 C 220 390, 300 210, 560 230 S 800 400, 1010 260 S 1160 110, 1320 130" />
          <path className="animated-track-secondary" fill="none" stroke="#E10600" strokeWidth="1" opacity="0.5" d="M -50 470 C 260 450, 360 300, 610 310 S 860 450, 1060 330 S 1190 190, 1320 210" />
        </svg>

        {/* Bottom Velocity Line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '3px', overflow: 'hidden', zIndex: 3, backgroundColor: 'rgba(31, 31, 39, 0.4)' }}>
          <div className="race-pulse-ultra-smooth" style={{ width: '400px', height: '100%', background: 'linear-gradient(90deg, transparent 0%, #E10600 50%, #FF3333 70%, transparent 100%)' }} />
        </div>

        {/* Content */}
        <div className="animate-fade-in" style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 clamp(1rem, 4vw, 3rem)',
          boxSizing: 'border-box',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '3rem',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{ flex: '1 1 600px', boxSizing: 'border-box' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono, monospace)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#E10600',
              marginBottom: '1rem'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#E10600',
                borderRadius: '50%',
                animation: 'pulseLive 2s infinite',
              }} />
              {nextRace ? `LIVE TELEMETRY // RD ${nextRace.round} · ${nextRace.raceName}` : 'CHAMPIONSHIP DATA PLATFORM'}
            </span>

            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontFamily: 'var(--font-display, sans-serif)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              margin: 0,
              textShadow: '0 2px 20px rgba(0,0,0,0.8)',
              color: '#FFFFFF',
            }}>
              {leader ? (
                <>
                  {leader.Driver.familyName} <span style={{ color: '#A1A1AA' }}>LEADS BY</span> <span style={{ color: '#E10600', display: 'inline-block', transform: 'skewX(-6deg)' }}>{gap}</span> <span style={{ color: '#A1A1AA', fontSize: '0.6em' }}>{gap === 1 ? 'POINT' : 'POINTS'}</span>
                </>
              ) : (
                <>CHAMPIONSHIP TELEMETRY HUB</>
              )}
            </h1>

            <p style={{
              fontSize: '0.9375rem',
              color: '#A1A1AA',
              lineHeight: '1.6',
              maxWidth: '540px',
              margin: '1rem 0 0 0',
              textShadow: '0 1px 8px rgba(0,0,0,0.8)'
            }}>
              {leader && second
                ? `Championship classification verification active. ${leader.Driver.givenName} ${leader.Driver.familyName} tops the driver matrix with ${leader.points} points, running a tactical buffer clear of ${second.Driver.givenName} ${second.Driver.familyName}.`
                : 'Real-time classification monitors, historical timing sheets, and live weekend telemetry matrix profiles.'}
            </p>


          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: TOP STATS BAR
          Status: ✅ COMPLETE
          Overlaps the hero edge slightly for a "floating card" transition
          ═══════════════════════════════════════════════════════════ */}
      <section style={{
        width: '100%',
        padding: '0 clamp(20px, 4vw, 48px)',
        boxSizing: 'border-box',
        marginBottom: SECTION_GAP,
        marginTop: '-40px',
        position: 'relative',
        zIndex: 5
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', maxWidth: '1360px', margin: '0 auto' }}>
          <TopStatCard
            label="Championship Leader"
            title={leader ? `${leader.Driver.givenName} ${leader.Driver.familyName}` : 'Kimi Antonelli'}
            subtitle={leader ? `${leader.points} pts · ${leader.wins || 5} wins` : '179 pts · 5 wins'}
            accent="#6CD3BF"
            icon={<TrophyIcon />}
          />
          <TopStatCard
            label="Constructor Leader"
            title="Mercedes"
            subtitle="333 pts · 7 wins"
            accent="#6CD3BF"
            icon={<ConstructorsIcon />}
          />
          <TopStatCard
            label="Races Completed"
            title="9 / 22"
            subtitle="41% of the season"
            accent="#E10600"
            icon={<FlagIcon />}
            showProgress
            progressValue={41}
          />
          <TopStatCard 
  label="Next Race" 
  title="Belgian GP" 
  subtitle="Spa-Francorchamps · Round 10" 
  accent="#F59E0B" 
  icon={<ClockIcon />} 
/>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: SESSION TICKER
          Status: ✅ COMPLETE
          ═══════════════════════════════════════════════════════════ */}
      {ticker && (
        <div style={{ borderBottom: '1px solid #1F1F27', backgroundColor: '#15151E', width: '100%', boxSizing: 'border-box', marginBottom: SECTION_GAP }}>
          <div style={{ maxWidth: '1360px', margin: '0 auto', boxSizing: 'border-box' }}>
            <SessionTicker raceName={ticker.raceName} sessions={ticker.sessions} />
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: NEXT RACE COUNTDOWN + WEATHER
          Status: 🚧 PLACEHOLDER (needs real countdown logic)
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ width: '100%', padding: '0 clamp(20px, 4vw, 48px)', boxSizing: 'border-box', marginBottom: SECTION_GAP }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', alignItems: 'stretch' }}>
          {/* Countdown */}
          <div style={{ background: 'linear-gradient(135deg, #15151E 0%, #0F1016 100%)', border: '1px solid #1F1F27', borderRadius: '12px', padding: '32px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '280px' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #E10600 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(225, 6, 0, 0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E10600' }}>Next Race</span>
                <span style={{ fontSize: '11px', fontWeight: 800, fontFamily: '"JetBrains Mono", monospace', color: '#3F3F46' }}>·</span>
                <span style={{ fontSize: '11px', fontWeight: 800, fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F59E0B' }}>Round 10</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, fontFamily: '"Formula1 Display-Regular", "Titillium Web", sans-serif', color: '#FFFFFF', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Belgian GP
              </h2>
              <p style={{ fontSize: '14px', color: '#71717A', margin: '0 0 4px 0', fontFamily: '"JetBrains Mono", monospace' }}>Spa-Francorchamps</p>
              <p style={{ fontSize: '13px', color: '#52525B', margin: 0, fontFamily: '"JetBrains Mono", monospace' }}>Spa, Belgium · 19 July 2026 · 06:30 PM</p>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '28px' }}>
              <BigCountdownUnit value={11} label="DAYS" />
              <BigCountdownSeparator />
              <BigCountdownUnit value={19} label="HRS" />
              <BigCountdownSeparator />
              <BigCountdownUnit value={42} label="MIN" />
              <BigCountdownSeparator />
              <BigCountdownUnit value={8} label="SEC" />
            </div>
          </div>

          {/* Weather */}
          <div style={{ background: 'linear-gradient(180deg, #15151E 0%, #0F1016 100%)', border: '1px solid #1F1F27', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 800, fontFamily: '"Formula1 Display-Regular", "Titillium Web", sans-serif', color: '#FFFFFF', margin: '0 0 20px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Race Weekend Forecast
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'center' }}>
              {weatherForecast.map((day) => (
                <WeatherRow key={day.day} day={day} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: EXPLORE GRID
          Status: 🚧 PLACEHOLDER (static data, needs links)
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ width: '100%', padding: '0 clamp(20px, 4vw, 48px)', boxSizing: 'border-box', marginBottom: SECTION_GAP }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 900, fontFamily: '"Formula1 Display-Regular", "Titillium Web", sans-serif', color: '#FFFFFF', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
              Explore
            </h2>
            <p style={{ fontSize: '13px', color: '#71717A', margin: 0, fontFamily: '"JetBrains Mono", monospace' }}>
              Everything the app has to offer
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {exploreCards.map((card, idx) => (
              <ExploreCard key={idx} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6: MAIN CONTENT (STANDINGS + SIDEBAR)
          Status: ✅ COMPLETE
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ paddingTop: SECTION_GAP, paddingBottom: SECTION_GAP, width: '100%', boxSizing: 'border-box', background: 'linear-gradient(180deg, #0B0C10 0%, #15151E 100%)' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)', boxSizing: 'border-box' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(320px, 400px)', gap: '3rem', alignItems: 'start' }}>

            {/* LEFT: STANDINGS */}
            <div className="animate-fade-in delay-2" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', boxSizing: 'border-box', minWidth: 0 }}>
              {/* Driver Standings */}
              <div>
                <SectionHeader title="Driver Standings" subtitle="TOP 10 CLASSIFICATION" />
                <DriverStandingsPanel rows={driverRows} visibleCount={10} />
              </div>
              {/* Constructor Standings */}
              <div>
                <SectionHeader title="Constructor Standings" subtitle="MANUFACTURERS" />
                <ConstructorStandingsPanel rows={constructorRows} />
              </div>
            </div>

            {/* RIGHT: LAST RACE SIDEBAR */}
            {lastRace && (
              <aside className="animate-fade-in delay-3" style={{ position: 'sticky', top: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', boxSizing: 'border-box' }}>
                <SectionHeader
                  title="Last Race Result"
                  subtitle=""
                  meta={`ROUND ${lastRace.round} · ${lastRace.Circuit.circuitName}`}
                />
                <LastRaceCard lastRace={lastRace} />
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7: GRID LEADERS + LAST RACE PODIUM
          Status: 🚧 PLACEHOLDER (static data)
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ width: '100%', padding: '0 clamp(20px, 4vw, 48px)', boxSizing: 'border-box', marginBottom: SECTION_GAP, marginTop: SECTION_GAP }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', alignItems: 'start' }}>

          {/* Grid Leaders */}
          <div style={{ background: 'linear-gradient(180deg, #15151E 0%, #0F1016 100%)', border: '1px solid #1F1F27', borderRadius: '12px', padding: '24px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 900, fontFamily: '"Formula1 Display-Regular", "Titillium Web", sans-serif', color: '#FFFFFF', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                Grid Leaders
              </h3>
              <p style={{ fontSize: '12px', color: '#71717A', margin: 0, fontFamily: '"JetBrains Mono", monospace' }}>
                All-time · active drivers
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {gridLeaders.map((leader, idx) => (
                <GridLeaderRow key={idx} leader={leader} />
              ))}
            </div>
          </div>

          {/* Last Race Podium */}
          <div style={{ background: 'linear-gradient(180deg, #15151E 0%, #0F1016 100%)', border: '1px solid #1F1F27', borderRadius: '12px', padding: '24px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 900, fontFamily: '"Formula1 Display-Regular", "Titillium Web", sans-serif', color: '#FFFFFF', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                Last Race Podium
              </h3>
              <p style={{ fontSize: '12px', color: '#71717A', margin: 0, fontFamily: '"JetBrains Mono", monospace' }}>
                British GP · Round 9
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {lastPodium.map((driver) => (
                <PodiumRow key={driver.position} driver={driver} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8: FOOTER
          Status: ✅ COMPLETE (from your existing Footer component)
          ═══════════════════════════════════════════════════════════ */}
      {/* Footer is rendered by layout.tsx */}

    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═════════════════════════════════════════════════════════════════

function StatPill({ label, value, type }: { label: string; value: string; type: 'leader' | 'standard' | 'accent' }) {
  const styles = {
    leader: { bg: 'rgba(225, 6, 0, 0.1)', border: '1px solid rgba(225, 6, 0, 0.3)', labelColor: '#E10600', valueColor: '#FFFFFF' },
    standard: { bg: 'rgba(255, 255, 255, 0.03)', border: '1px solid #27272A', labelColor: '#71717A', valueColor: '#A1A1AA' },
    accent: { bg: 'rgba(255, 255, 255, 0.03)', border: '1px solid #27272A', labelColor: '#71717A', valueColor: '#E10600' },
  };
  const s = styles[type];
  return (
    <div style={{ background: s.bg, border: s.border, borderRadius: '6px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '0.6875rem', color: s.labelColor, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: s.valueColor, fontFamily: '"JetBrains Mono", monospace' }}>{value}</span>
    </div>
  );
}

function TopStatCard({ label, title, subtitle, accent, icon, showProgress, progressValue, countdown }: any) {
  return (
    <div style={{ background: 'linear-gradient(180deg, #15151E 0%, #0F1016 100%)', border: '1px solid #1F1F27', borderRadius: '10px', padding: '20px', position: 'relative', overflow: 'hidden', transition: 'all 0.25s ease', cursor: 'default', boxShadow: '0 12px 32px rgba(0,0,0,0.35)' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: accent, boxShadow: `0 0 12px ${accent}40` }} />
      <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '80px', height: '80px', background: `radial-gradient(circle, ${accent}08 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <span style={{ color: accent }}>{icon}</span>
        <span style={{ fontSize: '10px', fontWeight: 800, fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.15em', textTransform: 'uppercase', color: accent }}>{label}</span>
      </div>
      <h3 style={{ fontSize: '18px', fontWeight: 900, fontFamily: '"Formula1 Display-Regular", "Titillium Web", sans-serif', color: '#FFFFFF', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{title}</h3>
      <p style={{ fontSize: '12px', color: '#71717A', margin: 0, fontFamily: '"JetBrains Mono", monospace', fontWeight: 500 }}>{subtitle}</p>
      {showProgress && (
        <div style={{ marginTop: '14px', height: '4px', backgroundColor: '#1F1F27', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progressValue}%`, background: `linear-gradient(90deg, ${accent} 0%, ${accent}cc 100%)`, borderRadius: '2px', transition: 'width 1s ease', boxShadow: `0 0 8px ${accent}40` }} />
        </div>
      )}
      {countdown && (
        <div style={{ marginTop: '14px', display: 'flex', gap: '12px' }}>
          <SmallCountdownUnit value={11} label="DAYS" accent={accent} />
          <SmallCountdownUnit value={19} label="HRS" accent={accent} />
          <SmallCountdownUnit value={42} label="MIN" accent={accent} />
        </div>
      )}
    </div>
  );
}

function SmallCountdownUnit({ value, label, accent }: { value: number; label: string; accent: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ background: '#0B0C10', border: '1px solid #1F1F27', borderRadius: '6px', padding: '8px 12px', minWidth: '44px', marginBottom: '4px' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '20px', fontWeight: 900, color: '#FFFFFF', display: 'block', lineHeight: 1 }}>{String(value).padStart(2, '0')}</span>
      </div>
      <span style={{ fontSize: '9px', fontWeight: 800, fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.1em', color: accent, textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}

function BigCountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ textAlign: 'center', flex: 1 }}>
      <div style={{ background: 'linear-gradient(180deg, #0B0C10 0%, #15151E 100%)', border: '1px solid #27272A', borderRadius: '10px', padding: '16px 8px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60%', height: '40%', background: 'radial-gradient(ellipse, rgba(225, 6, 0, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, color: '#FFFFFF', display: 'block', lineHeight: 1, position: 'relative', zIndex: 1 }}>{String(value).padStart(2, '0')}</span>
      </div>
      <span style={{ fontSize: '10px', fontWeight: 800, fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.15em', color: '#E10600', textTransform: 'uppercase', marginTop: '8px', display: 'block' }}>{label}</span>
    </div>
  );
}

function BigCountdownSeparator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '20px' }}>
      <span style={{ fontSize: '24px', fontWeight: 900, color: '#3F3F46', fontFamily: '"JetBrains Mono", monospace' }}>:</span>
    </div>
  );
}

function WeatherRow({ day }: { day: WeatherDay }) {
  const conditionConfig: Record<string, { color: string; label: string }> = {
    sunny: { color: '#F59E0B', label: 'Clear sky' },
    cloudy: { color: '#A1A1AA', label: 'Cloudy' },
    rain: { color: '#3B82F6', label: 'Rain' },
    drizzle: { color: '#60A5FA', label: 'Drizzle' },
  };
  const config = conditionConfig[day.condition];
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#0B0C10', border: '1px solid #1F1F27', borderRadius: '8px', transition: 'all 0.2s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '14px', fontWeight: 900, fontFamily: '"JetBrains Mono", monospace', color: '#FFFFFF', width: '36px' }}>{day.day}</span>
        <span style={{ color: config.color }}><SunIcon /></span>
      </div>
      <div style={{ textAlign: 'right' }}>
        <span style={{ fontSize: '18px', fontWeight: 900, fontFamily: '"JetBrains Mono", monospace', color: '#FFFFFF', display: 'block', lineHeight: 1.2 }}>{day.temp}°C</span>
        <span style={{ fontSize: '11px', color: '#71717A', fontFamily: '"JetBrains Mono", monospace' }}>{config.label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '16px' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#3B82F6' }}><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>
        <span style={{ fontSize: '12px', fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', color: '#3B82F6' }}>{day.rainChance}%</span>
      </div>
    </div>
  );
}

function ExploreCard({ card }: { card: ExploreCard }) {
  return (
    <Link href={card.href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ background: 'linear-gradient(180deg, #15151E 0%, #0F1016 100%)', border: '1px solid #1F1F27', borderRadius: '10px', padding: '20px', position: 'relative', overflow: 'hidden', transition: 'all 0.25s ease', cursor: 'pointer', height: '100%', boxSizing: 'border-box' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: card.accent, boxShadow: `0 0 12px ${card.accent}40` }} />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: `${card.accent}15`, border: `1px solid ${card.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.accent }}>
            {card.icon}
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3F3F46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </div>
        <h4 style={{ fontSize: '15px', fontWeight: 900, fontFamily: '"Formula1 Display-Regular", "Titillium Web", sans-serif', color: '#FFFFFF', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{card.title}</h4>
        <p style={{ fontSize: '12px', color: '#71717A', margin: 0, lineHeight: 1.5 }}>{card.description}</p>
      </div>
    </Link>
  );
}

function SectionHeader({ title, subtitle, meta }: { title: string; subtitle: string; meta?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', borderBottom: '2px solid #E10600', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '4px', height: '24px', backgroundColor: '#E10600', borderRadius: '2px' }} />
          <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display, sans-serif)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em', margin: 0, color: '#FFFFFF' }}>{title}</h2>
        </div>
        {subtitle && <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#71717A', fontWeight: 700, letterSpacing: '0.05em' }}>{subtitle}</span>}
      </div>
      {meta && (
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#E10600', fontWeight: 800, letterSpacing: '0.1em', marginLeft: '16px' }}>{meta}</span>
      )}
    </div>
  );
}

function LastRaceCard({ lastRace }: { lastRace: any }) {
  return (
    <div style={{ backgroundColor: '#15151E', border: '1px solid #1F1F27', borderTop: '3px solid #E10600', padding: '1.5rem', borderRadius: '8px', boxSizing: 'border-box', boxShadow: '0 4px 24px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-50%', right: '-50%', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(225, 6, 0, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <h3 style={{ fontSize: '1.375rem', fontFamily: 'var(--font-display, sans-serif)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 0.25rem 0', color: '#FFFFFF', letterSpacing: '-0.01em' }}>{lastRace.raceName}</h3>
      <p style={{ color: '#71717A', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', margin: '0 0 1.25rem 0', fontWeight: 700, letterSpacing: '0.05em' }}>{lastRace.Circuit.circuitName}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {lastRace.Results.slice(0, 5).map((r: any) => (
          <div key={r.position} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: r.position === '1' ? 'rgba(225, 6, 0, 0.08)' : '#1A1B23', padding: '0.75rem 1rem', borderRadius: '6px', borderLeft: r.position === '1' ? '3px solid #E10600' : '3px solid transparent', border: r.position === '1' ? '1px solid rgba(225, 6, 0, 0.2)' : '1px solid #27272A', transition: 'background-color 0.15s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontWeight: 900, color: r.position === '1' ? '#E10600' : '#52525B', width: '20px', fontSize: '0.875rem', fontStyle: 'italic' }}>{r.position}</span>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#FFFFFF' }}>{r.Driver.familyName}</div>
                <div style={{ fontSize: '0.6875rem', color: '#71717A', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>{r.Constructor.name}</div>
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: r.position === '1' ? '#E10600' : '#A1A1AA', fontWeight: 700 }}>{r.Time?.time ?? r.status}</span>
          </div>
        ))}
      </div>
      <ClassificationLink />
    </div>
  );
}

function GridLeaderRow({ leader }: { leader: GridLeader }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#0B0C10', border: '1px solid #1F1F27', borderRadius: '8px', borderLeft: `3px solid ${leader.accent}`, transition: 'all 0.2s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '10px', fontWeight: 900, fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.15em', textTransform: 'uppercase', color: leader.accent }}>{leader.category}</span>
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>{leader.driver}</span>
      </div>
      <span style={{ fontSize: '20px', fontWeight: 900, fontFamily: '"JetBrains Mono", monospace', color: leader.accent }}>{leader.value}</span>
    </div>
  );
}

function PodiumRow({ driver }: { driver: PodiumDriver }) {
  const posColors: Record<number, string> = { 1: '#F59E0B', 2: '#A1A1AA', 3: '#CD7F32' };
  const posBg: Record<number, string> = { 1: 'rgba(245, 158, 11, 0.08)', 2: 'rgba(161, 161, 170, 0.05)', 3: 'rgba(205, 127, 50, 0.08)' };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: posBg[driver.position], border: '1px solid #1F1F27', borderRadius: '8px', borderLeft: `3px solid ${posColors[driver.position]}` }}>
      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: posColors[driver.position], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, fontFamily: '"JetBrains Mono", monospace', color: driver.position === 1 ? '#000' : '#FFF' }}>
        {driver.position}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>{driver.name}</div>
        <div style={{ fontSize: '11px', color: '#71717A', fontFamily: '"JetBrains Mono", monospace', textTransform: 'uppercase' }}>{driver.team}</div>
      </div>
      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: driver.teamColor, boxShadow: `0 0 6px ${driver.teamColor}60` }} />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// ICONS
// ═════════════════════════════════════════════════════════════════

function TrophyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function DriversIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ConstructorsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function CircuitsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function RacesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

function SeasonsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function StatsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function TrendsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  );
}