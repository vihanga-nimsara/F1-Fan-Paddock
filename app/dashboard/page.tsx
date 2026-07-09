// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import SessionTicker from '@/components/SessionTicker';
import { DriverStandingsPanel, ConstructorStandingsPanel } from '@/components/StandingsPanels';
import { getDriverStandings, getConstructorStandings, getSeasonSchedule, getLastRaceResult } from '@/lib/jolpica';
import { buildTicker } from '@/lib/ticker';
import { CountdownCard } from '@/components/CountdownCard';
import WeatherCard from '@/components/WeatherCard';

export const revalidate = 120;

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

  const racesCompleted = lastRace ? Number(lastRace.round) : 9;
  const totalRaces = 22;

  const exploreCards: ExploreCard[] = [
    { title: 'Drivers', description: 'Full driver profiles, career stats, and championship points.', href: '/drivers', accent: '#E10600', icon: <TrophyIcon /> },
    { title: 'Constructors', description: 'Team standings, constructor history, and win tallies.', href: '/constructors', accent: '#6CD3BF', icon: <ConstructorsIcon /> },
    { title: 'Circuits', description: 'Track layouts, lap records, and racing history.', href: '/circuits', accent: '#F59E0B', icon: <FlagIcon /> },
    { title: 'Results', description: 'Detailed race results, timings, and sprint data.', href: '/results', accent: '#10B981', icon: <ClockIcon /> },
  ];

  const gridLeaders: GridLeader[] = [
    { category: 'Wins', driver: 'Lewis Hamilton', value: 106, accent: '#F59E0B' },
    { category: 'Podiums', driver: 'Lewis Hamilton', value: 207, accent: '#A1A1AA' },
    { category: 'Poles', driver: 'Lewis Hamilton', value: 104, accent: '#3B82F6' },
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
      fontFamily: 'var(--font-body, system-ui, sans-serif)' 
    }}>
      
      {/* ─── ANIMATIONS ─── */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseLive {
          0%, 100% { opacity: 0.5; box-shadow: 0 0 0 0 rgba(225, 6, 0, 0.4); }
          50% { opacity: 1; box-shadow: 0 0 8px 2px rgba(225, 6, 0, 0.6); }
        }
        .animate-fade-in {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
      `}} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        padding: 'clamp(6rem, 12vw, 10rem) 0 clamp(3rem, 6vw, 5rem)',
        backgroundColor: '#0B0C10',
        borderBottom: '1px solid #1F1F27', 
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
            background: 'linear-gradient(to right, #0B0C10 10%, rgba(11, 12, 16, 0.9) 40%, rgba(11, 12, 16, 0.3) 70%, rgba(11, 12, 16, 0.6) 100%)'
          }} />
        </div>

        <div className="animate-fade-in" style={{ 
          maxWidth: '1360px', 
          margin: '0 auto', 
          padding: '0 clamp(1rem, 4vw, 3rem)', 
          position: 'relative', 
          zIndex: 2 
        }}>
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
            {nextRace ? `2026 SEASON · LIVE` : 'CHAMPIONSHIP DATA PLATFORM'}
          </span>
          
          <h1 style={{ 
            fontSize: 'clamp(2rem, 4vw, 3rem)', 
            fontFamily: 'var(--font-display, sans-serif)', 
            fontWeight: 900, 
            textTransform: 'uppercase', 
            letterSpacing: '-0.03em', 
            lineHeight: 1.05, 
            margin: 0,
            color: '#FFFFFF',
          }}>
            Formula 1 Statistics &amp; History
          </h1>

          <p style={{ 
            fontSize: '0.9375rem', 
            color: '#A1A1AA', 
            margin: '0.75rem 0 0 0' 
          }}>
            Round {racesCompleted} of {totalRaces} · Last race: {lastRace?.raceName || 'British GP'}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: TOP STATS BAR
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ width: '100%', padding: '0 clamp(20px, 4vw, 48px)', boxSizing: 'border-box', margin: '32px 0' }}>
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
            subtitle="Spa · 19 July 2026" 
            accent="#F59E0B" 
            icon={<ClockIcon />} 
            countdown 
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: SESSION TICKER
          ═══════════════════════════════════════════════════════════ */}
      {ticker && (
        <div style={{ borderBottom: '1px solid #1F1F27', backgroundColor: '#15151E' }}>
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <SessionTicker raceName={ticker.raceName} sessions={ticker.sessions} />
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: NEXT RACE COUNTDOWN + WEATHER
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ width: '100%', padding: '0 clamp(20px, 4vw, 48px)', boxSizing: 'border-box', margin: '32px 0' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', alignItems: 'stretch' }}>
          <CountdownCard />
          <WeatherCard />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: EXPLORE GRID
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ width: '100%', padding: '0 clamp(20px, 4vw, 48px)', boxSizing: 'border-box', marginBottom: '32px' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 900, fontFamily: 'var(--font-display, sans-serif)', color: '#FFFFFF', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
              Explore
            </h2>
            <p style={{ fontSize: '13px', color: '#71717A', margin: 0, fontFamily: 'var(--font-mono, monospace)' }}>
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
          SECTION 6: STANDINGS (DRIVERS + CONSTRUCTORS)
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '4rem 0', background: 'linear-gradient(180deg, #0B0C10 0%, #15151E 100%)' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 3rem)', boxSizing: 'border-box' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(320px, 380px)', gap: '3rem', alignItems: 'start' }}>
            
            {/* LEFT: DRIVER STANDINGS */}
            <div className="animate-fade-in delay-2">
              <SectionHeader title="Drivers Championship" subtitle="" />
              <div style={{ marginBottom: '2rem' }}>
                <Link href="/standings" style={{ 
                  fontSize: '12px', 
                  fontWeight: 800, 
                  fontFamily: 'var(--font-mono, monospace)', 
                  color: '#E10600', 
                  textDecoration: 'none',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  float: 'right',
                  marginTop: '-40px',
                }}>
                  View all →
                </Link>
              </div>
              {driverRows.length > 0 ? (
                <DriverStandingsPanel rows={driverRows} visibleCount={22} />
              ) : (
                <EmptyState message="No driver standings available" />
              )}
            </div>

            {/* RIGHT: CONSTRUCTOR STANDINGS */}
            <div className="animate-fade-in delay-3">
              <SectionHeader title="Constructors" subtitle="" />
              {constructorRows.length > 0 ? (
                <ConstructorStandingsPanel rows={constructorRows} />
              ) : (
                <EmptyState message="No constructor standings available" />
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7: GRID LEADERS + LAST RACE PODIUM
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ width: '100%', padding: '0 clamp(20px, 4vw, 48px)', boxSizing: 'border-box', marginBottom: '48px' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', alignItems: 'start' }}>
          
          {/* Grid Leaders */}
          <div style={{ background: 'linear-gradient(180deg, #15151E 0%, #0F1016 100%)', border: '1px solid #1F1F27', borderRadius: '12px', padding: '24px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 900, fontFamily: 'var(--font-display, sans-serif)', color: '#FFFFFF', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                Grid Leaders
              </h3>
              <p style={{ fontSize: '12px', color: '#71717A', margin: 0, fontFamily: 'var(--font-mono, monospace)' }}>
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
              <h3 style={{ fontSize: '16px', fontWeight: 900, fontFamily: 'var(--font-display, sans-serif)', color: '#FFFFFF', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                Last Race Podium
              </h3>
              <p style={{ fontSize: '12px', color: '#71717A', margin: 0, fontFamily: 'var(--font-mono, monospace)' }}>
                {lastRace?.raceName || 'British GP'} · Round {lastRace?.round || 9}
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

    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═════════════════════════════════════════════════════════════════

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'baseline', 
      borderBottom: '2px solid #E10600', 
      paddingBottom: '0.75rem', 
      marginBottom: '1.5rem' 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '4px', height: '24px', backgroundColor: '#E10600', borderRadius: '2px' }} />
        <h2 style={{ 
          fontSize: '1.1rem', 
          fontFamily: 'var(--font-display, sans-serif)', 
          fontWeight: 900, 
          textTransform: 'uppercase', 
          letterSpacing: '0.02em', 
          margin: 0,
          color: '#FFFFFF',
        }}>{title}</h2>
      </div>
      {subtitle && <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#71717A', fontWeight: 700, letterSpacing: '0.05em' }}>{subtitle}</span>}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div style={{ 
      backgroundColor: '#15151E', 
      padding: '2.5rem', 
      textAlign: 'center', 
      color: '#52525B', 
      border: '1px dashed #1F1F27', 
      borderRadius: '8px', 
      fontSize: '0.875rem',
      fontWeight: 600,
    }}>
      {message}
    </div>
  );
}

function ExploreCard({ card }: { card: ExploreCard }) {
  return (
    <Link href={card.href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        background: 'linear-gradient(180deg, #15151E 0%, #0F1016 100%)',
        border: '1px solid #1F1F27',
        borderRadius: '12px',
        padding: '20px',
        height: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.accent, background: `${card.accent}16`, border: `1px solid ${card.accent}30` }}>
            {card.icon}
          </div>
          <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#FFFFFF', margin: 0, textTransform: 'uppercase' }}>{card.title}</h3>
        </div>
        <p style={{ fontSize: '12px', color: '#71717A', margin: 0, lineHeight: 1.5 }}>{card.description}</p>
      </div>
    </Link>
  );
}

function GridLeaderRow({ leader }: { leader: GridLeader }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#0B0C10', border: '1px solid #1F1F27', borderRadius: '8px', borderLeft: `3px solid ${leader.accent}` }}>
      <div>
        <div style={{ fontSize: '10px', fontWeight: 900, color: leader.accent, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{leader.category}</div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>{leader.driver}</div>
      </div>
      <span style={{ fontSize: '20px', fontWeight: 900, color: leader.accent }}>{leader.value}</span>
    </div>
  );
}

function PodiumRow({ driver }: { driver: PodiumDriver }) {
  const posColors: Record<number, string> = { 1: '#F59E0B', 2: '#A1A1AA', 3: '#CD7F32' };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: '#0B0C10', border: '1px solid #1F1F27', borderRadius: '8px', borderLeft: `3px solid ${posColors[driver.position]}` }}>
      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: posColors[driver.position], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, color: '#000' }}>
        {driver.position}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>{driver.name}</div>
        <div style={{ fontSize: '11px', color: '#71717A', textTransform: 'uppercase' }}>{driver.team}</div>
      </div>
      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: driver.teamColor }} />
    </div>
  );
}

// Minimal placeholder implementations for missing sub-components/icons used in this file
function TopStatCard(props: any) {
  const { label, title, subtitle, accent, icon, showProgress, progressValue, countdown } = props;
  return (
    <div style={{ background: '#15151E', border: '1px solid #1F1F27', borderRadius: 12, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 12, color: '#A1A1AA', fontWeight: 800 }}>{label}</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#FFF' }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: '#71717A' }}>{subtitle}</div>}
        </div>
        <div>{icon}</div>
      </div>
      {showProgress && (
        <div style={{ marginTop: 12, height: 8, background: '#0B0C10', borderRadius: 8 }}>
          <div style={{ width: `${progressValue || 0}%`, height: '100%', background: accent || '#E10600', borderRadius: 8 }} />
        </div>
      )}
      {countdown && <div style={{ marginTop: 8, fontSize: 12, color: '#A1A1AA' }}>Starts in: —</div>}
    </div>
  );
}

function TrophyIcon() { return <div style={{ width: 36, height: 36, background: '#6CD3BF', borderRadius: 8 }} /> }
function ConstructorsIcon() { return <div style={{ width: 36, height: 36, background: '#6CD3BF', borderRadius: 8 }} /> }
function FlagIcon() { return <div style={{ width: 36, height: 36, background: '#E10600', borderRadius: 8 }} /> }
function ClockIcon() { return <div style={{ width: 36, height: 36, background: '#F59E0B', borderRadius: 8 }} /> }
