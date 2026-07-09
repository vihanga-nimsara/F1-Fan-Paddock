// lib/flags.ts

const DEMONYM_TO_ISO: Record<string, string> = {
  british: 'gb',
  dutch: 'nl',
  monegasque: 'mc',
  australian: 'au',
  french: 'fr',
  'new zealander': 'nz',
  spanish: 'es',
  thai: 'th',
  german: 'de',
  finnish: 'fi',
  mexican: 'mx',
  canadian: 'ca',
  italian: 'it',
  argentine: 'ar',
  argentinian: 'ar',
  brazilian: 'br',
  japanese: 'jp',
  chinese: 'cn',
  danish: 'dk',
  american: 'us',
  belgian: 'be',
  swiss: 'ch',
  austrian: 'at',
  polish: 'pl',
  swedish: 'se',
  // add more as the grid changes
};

/**
 * Resolves a driver's nationality (demonym, e.g. "British") or a raw
 * country name to a FlagCDN URL.
 */
export function getFlagUrl(nationality: string | undefined): string {
  if (!nationality) return '';

  const key = nationality.trim().toLowerCase();

  const iso = DEMONYM_TO_ISO[key];
  if (iso) return `https://flagcdn.com/w40/${iso}.png`;

  // fallback: maybe it's already a full country name matching codes.json
  const isoFromCountryName = Object.keys(codes).find(
    (code) => (codes as Record<string, string>)[code].toLowerCase() === key
  );
  if (isoFromCountryName) return `https://flagcdn.com/w40/${isoFromCountryName.toLowerCase()}.png`;

  return '';
}