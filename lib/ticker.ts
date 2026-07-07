import { JolpicaRaceSchedule } from './jolpica';

export interface TickerSession {
  label: string;
  day: string;
  time: string;
  startsAt: Date;
  status: 'done' | 'live' | 'next' | 'upcoming';
}

const SESSION_DURATION_MS = 90 * 60 * 1000; // rough default, race is longer but fine for classification

function fmtDay(date: Date) {
  return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}
function fmtTime(date: Date) {
  return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
}

/** Finds the next race weekend (or the one currently in progress) and returns
 * an ordered list of its sessions with live/done/next status computed
 * against the current time. */
export function buildTicker(races: JolpicaRaceSchedule[]): { raceName: string; sessions: TickerSession[] } | null {
  const now = Date.now();

  // Find the first weekend whose race date+time is still in the future, or within the last day
  const candidate = races.find((r) => {
    const raceDateTime = new Date(`${r.date}T${r.time ?? '00:00:00Z'}`);
    return raceDateTime.getTime() > now - 24 * 60 * 60 * 1000;
  });

  if (!candidate) return null;

  const raw: { label: string; date?: string; time?: string }[] = [
    { label: 'FP1', date: candidate.FirstPractice?.date, time: candidate.FirstPractice?.time },
    { label: 'FP2', date: candidate.SecondPractice?.date, time: candidate.SecondPractice?.time },
    { label: 'FP3', date: candidate.ThirdPractice?.date, time: candidate.ThirdPractice?.time },
    { label: 'Sprint Qualifying', date: candidate.SprintQualifying?.date, time: candidate.SprintQualifying?.time },
    { label: 'Sprint', date: candidate.Sprint?.date, time: candidate.Sprint?.time },
    { label: 'Qualifying', date: candidate.Qualifying?.date, time: candidate.Qualifying?.time },
    { label: 'Race', date: candidate.date, time: candidate.time },
  ].filter((s): s is { label: string; date: string; time: string } => !!s.date && !!s.time);

  const sessions: TickerSession[] = raw
    .map((s) => {
      const startsAt = new Date(`${s.date}T${s.time}`);
      return { label: s.label, day: fmtDay(startsAt), time: fmtTime(startsAt), startsAt, status: 'upcoming' as const };
    })
    .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());

  let nextAssigned = false;
  
  for (const s of sessions) {
    const start = s.startsAt.getTime();
    const end = start + SESSION_DURATION_MS;

    if (now >= start && now <= end) {
      s.status = 'live';
      nextAssigned = true; // A live session counts as the active focus point
    } else if (now > end) {
      s.status = 'done';
    } else if (!nextAssigned) {
      s.status = 'next';
      nextAssigned = true; // The absolute earliest future session gets flagged as next
    } else {
      s.status = 'upcoming'; // All chronologically successive future blocks remain upcoming
    }
  }

  return { raceName: candidate.raceName, sessions };
}