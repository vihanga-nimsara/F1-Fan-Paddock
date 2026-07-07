// Maps constructor identifiers (from Jolpica or OpenF1 team names) to the
// palette already established in the brand's CSS custom properties.

export interface TeamColorEntry {
  hex: string;
  cssVar: string;
}

const TEAM_COLORS: Record<string, TeamColorEntry> = {
  mercedes: { hex: '#00A19C', cssVar: '--t-mercedes' },
  ferrari: { hex: '#E8002D', cssVar: '--t-ferrari' },
  mclaren: { hex: '#FF8000', cssVar: '--t-mclaren' },
  red_bull: { hex: '#3671C6', cssVar: '--t-redbull' },
  alpine: { hex: '#FF87BC', cssVar: '--t-alpine' },
  rb: { hex: '#4C6EF5', cssVar: '--t-racingbulls' },
  racing_bulls: { hex: '#4C6EF5', cssVar: '--t-racingbulls' },
  haas: { hex: '#C8CCCF', cssVar: '--t-haas' },
  williams: { hex: '#00A0DE', cssVar: '--t-williams' },
  sauber: { hex: '#8B93A1', cssVar: '--t-audi' },
  audi: { hex: '#8B93A1', cssVar: '--t-audi' },
  aston_martin: { hex: '#00594F', cssVar: '--t-astonmartin' },
  cadillac: { hex: '#C9A227', cssVar: '--t-cadillac' },
};

/** Loose match: tries the Ergast constructorId first, then falls back to
 * matching by substring against the team's display name (useful for
 * OpenF1's free-text team_name field, and for brand-new 2026 entrants that
 * Jolpica may not have assigned a stable id to yet). */
export function getTeamColor(idOrName: string): string {
  const key = idOrName.toLowerCase().replace(/\s+/g, '_');
  if (TEAM_COLORS[key]) return TEAM_COLORS[key].hex;

  const lower = idOrName.toLowerCase();
  const match = Object.entries(TEAM_COLORS).find(([id]) =>
    lower.includes(id.replace(/_/g, ' ')) || lower.includes(id)
  );
  return match ? match[1].hex : '#8657E0'; // fallback: brand purple
}