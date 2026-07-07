import { getDriverStandings, getConstructorStandings, getCurrentSeasonYear } from '@/lib/jolpica';
import { DriverStandingsPanel, ConstructorStandingsPanel } from '@/components/StandingsPanels';

export const revalidate = 300;

export default async function StandingsPage() {
  const [driverStandings, constructorStandings, year] = await Promise.all([
    getDriverStandings(),
    getConstructorStandings(),
    getCurrentSeasonYear(),
  ]);

  const driverRows = driverStandings.map((d) => ({
    position: d.position,
    name: `${d.Driver.givenName} ${d.Driver.familyName}`,
    team: d.Constructors[0]?.name ?? '—',
    points: d.points,
  }));

  const constructorRows = constructorStandings.map((c) => ({
    position: c.position,
    name: c.Constructor.name,
    subtitle: `${c.wins} ${Number(c.wins) === 1 ? 'win' : 'wins'}`,
    points: c.points,
  }));

  return (
    <>
      <header className="page-header">
        <span className="eyebrow">Standings</span>
        <h1>{year} Championship</h1>
        <p>Full drivers&rsquo; and constructors&rsquo; standings, sourced from Jolpica&rsquo;s Ergast-compatible API.</p>
      </header>

      <section className="full-standings">
        <div className="standings-grid">
          {driverRows.length > 0 ? (
            <DriverStandingsPanel rows={driverRows} visibleCount={driverRows.length} />
          ) : (
            <div className="standings-panel">
              <div className="empty-state">Driver standings unavailable right now.</div>
            </div>
          )}
          {constructorRows.length > 0 ? (
            <ConstructorStandingsPanel rows={constructorRows} />
          ) : (
            <div className="standings-panel">
              <div className="empty-state">Constructor standings unavailable right now.</div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}