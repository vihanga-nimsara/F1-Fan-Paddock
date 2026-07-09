'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// ─── 2026 F1 Season Race Calendar & Results ───
// Round 9 completed (British GP), Round 10 upcoming (Hungarian GP)

interface RaceResult {
  position: string;
  driver: string;
  team: string;
  flagIso: string;
  time: string;
  points: string;
  fastestLap?: boolean;
}

interface RaceWeekend {
  round: number;
  name: string;
  circuit: string;
  location: string;
  country: string;
  flagIso: string;
  date: string;
  month: string;
  status: 'completed' | 'upcoming' | 'live';
  trackImage?: string;
  results?: RaceResult[];
  winner?: string;
  winnerTeam?: string;
  winnerColor?: string;
  polePosition?: string;
  fastestLap?: string;
  weather?: string;
  laps?: string;
  distance?: string;
}

const RACES_2026: RaceWeekend[] = [
  {
    round: 1,
    name: 'Australian Grand Prix',
    circuit: 'Albert Park Circuit',
    location: 'Melbourne',
    country: 'Australia',
    flagIso: 'au',
    date: '16',
    month: 'MAR',
    status: 'completed',
    winner: 'Kimi Antonelli',
    winnerTeam: 'Mercedes',
    winnerColor: '#6CD3BF',
    polePosition: 'Kimi Antonelli',
    fastestLap: 'Kimi Antonelli',
    weather: 'Sunny',
    laps: '58',
    distance: '307.6 km',
    results: [
      { position: '1', driver: 'Kimi Antonelli', team: 'Mercedes', flagIso: 'it', time: '1:24:15.432', points: '26', fastestLap: true },
      { position: '2', driver: 'George Russell', team: 'Mercedes', flagIso: 'gb', time: '+3.421', points: '18' },
      { position: '3', driver: 'Lewis Hamilton', team: 'Ferrari', flagIso: 'gb', time: '+8.905', points: '15' },
      { position: '4', driver: 'Charles Leclerc', team: 'Ferrari', flagIso: 'mc', time: '+12.334', points: '12' },
      { position: '5', driver: 'Lando Norris', team: 'McLaren', flagIso: 'gb', time: '+18.772', points: '10' },
      { position: '6', driver: 'Oscar Piastri', team: 'McLaren', flagIso: 'au', time: '+22.189', points: '8' },
      { position: '7', driver: 'Max Verstappen', team: 'Red Bull Racing', flagIso: 'nl', time: '+28.445', points: '6' },
      { position: '8', driver: 'Isack Hadjar', team: 'Alpine', flagIso: 'fr', time: '+34.221', points: '4' },
      { position: '9', driver: 'Pierre Gasly', team: 'Alpine', flagIso: 'fr', time: '+38.990', points: '2' },
      { position: '10', driver: 'Liam Lawson', team: 'Racing Bulls', flagIso: 'nz', time: '+42.118', points: '1' },
    ],
  },
  {
    round: 2,
    name: 'Chinese Grand Prix',
    circuit: 'Shanghai International Circuit',
    location: 'Shanghai',
    country: 'China',
    flagIso: 'cn',
    date: '23',
    month: 'MAR',
    status: 'completed',
    winner: 'Kimi Antonelli',
    winnerTeam: 'Mercedes',
    winnerColor: '#6CD3BF',
    polePosition: 'George Russell',
    fastestLap: 'Kimi Antonelli',
    weather: 'Cloudy',
    laps: '56',
    distance: '305.3 km',
    results: [
      { position: '1', driver: 'Kimi Antonelli', team: 'Mercedes', flagIso: 'it', time: '1:32:45.112', points: '26', fastestLap: true },
      { position: '2', driver: 'Lewis Hamilton', team: 'Ferrari', flagIso: 'gb', time: '+5.234', points: '18' },
      { position: '3', driver: 'George Russell', team: 'Mercedes', flagIso: 'gb', time: '+9.876', points: '15' },
      { position: '4', driver: 'Charles Leclerc', team: 'Ferrari', flagIso: 'mc', time: '+14.221', points: '12' },
      { position: '5', driver: 'Lando Norris', team: 'McLaren', flagIso: 'gb', time: '+19.445', points: '10' },
      { position: '6', driver: 'Max Verstappen', team: 'Red Bull Racing', flagIso: 'nl', time: '+25.778', points: '8' },
      { position: '7', driver: 'Oscar Piastri', team: 'McLaren', flagIso: 'au', time: '+31.009', points: '6' },
      { position: '8', driver: 'Isack Hadjar', team: 'Alpine', flagIso: 'fr', time: '+38.334', points: '4' },
      { position: '9', driver: 'Liam Lawson', team: 'Racing Bulls', flagIso: 'nz', time: '+44.556', points: '2' },
      { position: '10', driver: 'Pierre Gasly', team: 'Alpine', flagIso: 'fr', time: '+49.887', points: '1' },
    ],
  },
  {
    round: 3,
    name: 'Japanese Grand Prix',
    circuit: 'Suzuka International Racing Course',
    location: 'Suzuka',
    country: 'Japan',
    flagIso: 'jp',
    date: '06',
    month: 'APR',
    status: 'completed',
    winner: 'George Russell',
    winnerTeam: 'Mercedes',
    winnerColor: '#6CD3BF',
    polePosition: 'Kimi Antonelli',
    fastestLap: 'George Russell',
    weather: 'Rain',
    laps: '53',
    distance: '307.5 km',
    results: [
      { position: '1', driver: 'George Russell', team: 'Mercedes', flagIso: 'gb', time: '1:48:22.445', points: '26', fastestLap: true },
      { position: '2', driver: 'Kimi Antonelli', team: 'Mercedes', flagIso: 'it', time: '+2.118', points: '18' },
      { position: '3', driver: 'Lewis Hamilton', team: 'Ferrari', flagIso: 'gb', time: '+6.334', points: '15' },
      { position: '4', driver: 'Charles Leclerc', team: 'Ferrari', flagIso: 'mc', time: '+11.009', points: '12' },
      { position: '5', driver: 'Lando Norris', team: 'McLaren', flagIso: 'gb', time: '+16.445', points: '10' },
      { position: '6', driver: 'Oscar Piastri', team: 'McLaren', flagIso: 'au', time: '+22.778', points: '8' },
      { position: '7', driver: 'Max Verstappen', team: 'Red Bull Racing', flagIso: 'nl', time: '+29.112', points: '6' },
      { position: '8', driver: 'Isack Hadjar', team: 'Alpine', flagIso: 'fr', time: '+35.667', points: '4' },
      { position: '9', driver: 'Pierre Gasly', team: 'Alpine', flagIso: 'fr', time: '+41.223', points: '2' },
      { position: '10', driver: 'Liam Lawson', team: 'Racing Bulls', flagIso: 'nz', time: '+47.889', points: '1' },
    ],
  },
  {
    round: 4,
    name: 'Bahrain Grand Prix',
    circuit: 'Bahrain International Circuit',
    location: 'Sakhir',
    country: 'Bahrain',
    flagIso: 'bh',
    date: '13',
    month: 'APR',
    status: 'completed',
    winner: 'Kimi Antonelli',
    winnerTeam: 'Mercedes',
    winnerColor: '#6CD3BF',
    polePosition: 'Kimi Antonelli',
    fastestLap: 'Kimi Antonelli',
    weather: 'Clear Night',
    laps: '57',
    distance: '308.2 km',
    results: [
      { position: '1', driver: 'Kimi Antonelli', team: 'Mercedes', flagIso: 'it', time: '1:31:45.009', points: '26', fastestLap: true },
      { position: '2', driver: 'George Russell', team: 'Mercedes', flagIso: 'gb', time: '+4.556', points: '18' },
      { position: '3', driver: 'Charles Leclerc', team: 'Ferrari', flagIso: 'mc', time: '+9.112', points: '15' },
      { position: '4', driver: 'Lewis Hamilton', team: 'Ferrari', flagIso: 'gb', time: '+13.445', points: '12' },
      { position: '5', driver: 'Lando Norris', team: 'McLaren', flagIso: 'gb', time: '+18.889', points: '10' },
      { position: '6', driver: 'Oscar Piastri', team: 'McLaren', flagIso: 'au', time: '+24.334', points: '8' },
      { position: '7', driver: 'Max Verstappen', team: 'Red Bull Racing', flagIso: 'nl', time: '+30.667', points: '6' },
      { position: '8', driver: 'Isack Hadjar', team: 'Alpine', flagIso: 'fr', time: '+37.001', points: '4' },
      { position: '9', driver: 'Liam Lawson', team: 'Racing Bulls', flagIso: 'nz', time: '+43.445', points: '2' },
      { position: '10', driver: 'Pierre Gasly', team: 'Alpine', flagIso: 'fr', time: '+49.778', points: '1' },
    ],
  },
  {
    round: 5,
    name: 'Saudi Arabian Grand Prix',
    circuit: 'Jeddah Street Circuit',
    location: 'Jeddah',
    country: 'Saudi Arabia',
    flagIso: 'sa',
    date: '20',
    month: 'APR',
    status: 'completed',
    winner: 'Lewis Hamilton',
    winnerTeam: 'Ferrari',
    winnerColor: '#E80020',
    polePosition: 'Lewis Hamilton',
    fastestLap: 'George Russell',
    weather: 'Clear Night',
    laps: '50',
    distance: '308.4 km',
    results: [
      { position: '1', driver: 'Lewis Hamilton', team: 'Ferrari', flagIso: 'gb', time: '1:28:42.119', points: '25' },
      { position: '2', driver: 'Charles Leclerc', team: 'Ferrari', flagIso: 'mc', time: '+2.334', points: '18' },
      { position: '3', driver: 'Kimi Antonelli', team: 'Mercedes', flagIso: 'it', time: '+7.445', points: '15' },
      { position: '4', driver: 'George Russell', team: 'Mercedes', flagIso: 'gb', time: '+12.112', points: '12' },
      { position: '5', driver: 'Lando Norris', team: 'McLaren', flagIso: 'gb', time: '+17.889', points: '10' },
      { position: '6', driver: 'Oscar Piastri', team: 'McLaren', flagIso: 'au', time: '+23.445', points: '8' },
      { position: '7', driver: 'Max Verstappen', team: 'Red Bull Racing', flagIso: 'nl', time: '+29.778', points: '6' },
      { position: '8', driver: 'Isack Hadjar', team: 'Alpine', flagIso: 'fr', time: '+36.223', points: '4' },
      { position: '9', driver: 'Pierre Gasly', team: 'Alpine', flagIso: 'fr', time: '+42.667', points: '2' },
      { position: '10', driver: 'Liam Lawson', team: 'Racing Bulls', flagIso: 'nz', time: '+49.112', points: '1' },
    ],
  },
  {
    round: 6,
    name: 'Miami Grand Prix',
    circuit: 'Miami International Autodrome',
    location: 'Miami',
    country: 'USA',
    flagIso: 'us',
    date: '04',
    month: 'MAY',
    status: 'completed',
    winner: 'Kimi Antonelli',
    winnerTeam: 'Mercedes',
    winnerColor: '#6CD3BF',
    polePosition: 'George Russell',
    fastestLap: 'Kimi Antonelli',
    weather: 'Sunny',
    laps: '57',
    distance: '308.3 km',
    results: [
      { position: '1', driver: 'Kimi Antonelli', team: 'Mercedes', flagIso: 'it', time: '1:29:33.556', points: '26', fastestLap: true },
      { position: '2', driver: 'George Russell', team: 'Mercedes', flagIso: 'gb', time: '+3.889', points: '18' },
      { position: '3', driver: 'Lewis Hamilton', team: 'Ferrari', flagIso: 'gb', time: '+8.445', points: '15' },
      { position: '4', driver: 'Charles Leclerc', team: 'Ferrari', flagIso: 'mc', time: '+13.112', points: '12' },
      { position: '5', driver: 'Lando Norris', team: 'McLaren', flagIso: 'gb', time: '+19.667', points: '10' },
      { position: '6', driver: 'Oscar Piastri', team: 'McLaren', flagIso: 'au', time: '+25.223', points: '8' },
      { position: '7', driver: 'Max Verstappen', team: 'Red Bull Racing', flagIso: 'nl', time: '+31.889', points: '6' },
      { position: '8', driver: 'Isack Hadjar', team: 'Alpine', flagIso: 'fr', time: '+38.445', points: '4' },
      { position: '9', driver: 'Liam Lawson', team: 'Racing Bulls', flagIso: 'nz', time: '+44.778', points: '2' },
      { position: '10', driver: 'Pierre Gasly', team: 'Alpine', flagIso: 'fr', time: '+51.112', points: '1' },
    ],
  },
  {
    round: 7,
    name: 'Emilia Romagna Grand Prix',
    circuit: 'Autodromo Enzo e Dino Ferrari',
    location: 'Imola',
    country: 'Italy',
    flagIso: 'it',
    date: '18',
    month: 'MAY',
    status: 'completed',
    winner: 'George Russell',
    winnerTeam: 'Mercedes',
    winnerColor: '#6CD3BF',
    polePosition: 'Kimi Antonelli',
    fastestLap: 'George Russell',
    weather: 'Sunny',
    laps: '63',
    distance: '305.0 km',
    results: [
      { position: '1', driver: 'George Russell', team: 'Mercedes', flagIso: 'gb', time: '1:24:12.778', points: '26', fastestLap: true },
      { position: '2', driver: 'Kimi Antonelli', team: 'Mercedes', flagIso: 'it', time: '+1.445', points: '18' },
      { position: '3', driver: 'Lewis Hamilton', team: 'Ferrari', flagIso: 'gb', time: '+6.112', points: '15' },
      { position: '4', driver: 'Charles Leclerc', team: 'Ferrari', flagIso: 'mc', time: '+10.889', points: '12' },
      { position: '5', driver: 'Lando Norris', team: 'McLaren', flagIso: 'gb', time: '+16.445', points: '10' },
      { position: '6', driver: 'Oscar Piastri', team: 'McLaren', flagIso: 'au', time: '+22.112', points: '8' },
      { position: '7', driver: 'Max Verstappen', team: 'Red Bull Racing', flagIso: 'nl', time: '+28.778', points: '6' },
      { position: '8', driver: 'Isack Hadjar', team: 'Alpine', flagIso: 'fr', time: '+35.334', points: '4' },
      { position: '9', driver: 'Pierre Gasly', team: 'Alpine', flagIso: 'fr', time: '+41.889', points: '2' },
      { position: '10', driver: 'Liam Lawson', team: 'Racing Bulls', flagIso: 'nz', time: '+48.445', points: '1' },
    ],
  },
  {
    round: 8,
    name: 'Monaco Grand Prix',
    circuit: 'Circuit de Monaco',
    location: 'Monte Carlo',
    country: 'Monaco',
    flagIso: 'mc',
    date: '25',
    month: 'MAY',
    status: 'completed',
    winner: 'Kimi Antonelli',
    winnerTeam: 'Mercedes',
    winnerColor: '#6CD3BF',
    polePosition: 'Kimi Antonelli',
    fastestLap: 'Kimi Antonelli',
    weather: 'Sunny',
    laps: '78',
    distance: '260.3 km',
    results: [
      { position: '1', driver: 'Kimi Antonelli', team: 'Mercedes', flagIso: 'it', time: '1:52:45.223', points: '26', fastestLap: true },
      { position: '2', driver: 'George Russell', team: 'Mercedes', flagIso: 'gb', time: '+4.112', points: '18' },
      { position: '3', driver: 'Charles Leclerc', team: 'Ferrari', flagIso: 'mc', time: '+9.445', points: '15' },
      { position: '4', driver: 'Lewis Hamilton', team: 'Ferrari', flagIso: 'gb', time: '+14.778', points: '12' },
      { position: '5', driver: 'Lando Norris', team: 'McLaren', flagIso: 'gb', time: '+20.334', points: '10' },
      { position: '6', driver: 'Oscar Piastri', team: 'McLaren', flagIso: 'au', time: '+26.889', points: '8' },
      { position: '7', driver: 'Max Verstappen', team: 'Red Bull Racing', flagIso: 'nl', time: '+33.445', points: '6' },
      { position: '8', driver: 'Isack Hadjar', team: 'Alpine', flagIso: 'fr', time: '+40.112', points: '4' },
      { position: '9', driver: 'Pierre Gasly', team: 'Alpine', flagIso: 'fr', time: '+46.778', points: '2' },
      { position: '10', driver: 'Liam Lawson', team: 'Racing Bulls', flagIso: 'nz', time: '+53.445', points: '1' },
    ],
  },
  {
    round: 9,
    name: 'British Grand Prix',
    circuit: 'Silverstone Circuit',
    location: 'Silverstone',
    country: 'United Kingdom',
    flagIso: 'gb',
    date: '06',
    month: 'JUL',
    status: 'completed',
    winner: 'Kimi Antonelli',
    winnerTeam: 'Mercedes',
    winnerColor: '#6CD3BF',
    polePosition: 'Kimi Antonelli',
    fastestLap: 'George Russell',
    weather: 'Cloudy',
    laps: '52',
    distance: '306.2 km',
    results: [
      { position: '1', driver: 'Kimi Antonelli', team: 'Mercedes', flagIso: 'it', time: '1:26:33.445', points: '25' },
      { position: '2', driver: 'George Russell', team: 'Mercedes', flagIso: 'gb', time: '+2.889', points: '18' },
      { position: '3', driver: 'Lewis Hamilton', team: 'Ferrari', flagIso: 'gb', time: '+7.445', points: '15' },
      { position: '4', driver: 'Charles Leclerc', team: 'Ferrari', flagIso: 'mc', time: '+12.112', points: '12' },
      { position: '5', driver: 'Lando Norris', team: 'McLaren', flagIso: 'gb', time: '+18.667', points: '10' },
      { position: '6', driver: 'Oscar Piastri', team: 'McLaren', flagIso: 'au', time: '+24.223', points: '8' },
      { position: '7', driver: 'Max Verstappen', team: 'Red Bull Racing', flagIso: 'nl', time: '+30.889', points: '6' },
      { position: '8', driver: 'Isack Hadjar', team: 'Alpine', flagIso: 'fr', time: '+37.445', points: '4' },
      { position: '9', driver: 'Pierre Gasly', team: 'Alpine', flagIso: 'fr', time: '+44.112', points: '2' },
      { position: '10', driver: 'Liam Lawson', team: 'Racing Bulls', flagIso: 'nz', time: '+50.778', points: '1' },
    ],
  },
  {
    round: 10,
    name: 'Hungarian Grand Prix',
    circuit: 'Hungaroring',
    location: 'Budapest',
    country: 'Hungary',
    flagIso: 'hu',
    date: '20',
    month: 'JUL',
    status: 'upcoming',
  },
  {
    round: 11,
    name: 'Belgian Grand Prix',
    circuit: 'Circuit de Spa-Francorchamps',
    location: 'Spa',
    country: 'Belgium',
    flagIso: 'be',
    date: '27',
    month: 'JUL',
    status: 'upcoming',
  },
  {
    round: 12,
    name: 'Dutch Grand Prix',
    circuit: 'Circuit Zandvoort',
    location: 'Zandvoort',
    country: 'Netherlands',
    flagIso: 'nl',
    date: '24',
    month: 'AUG',
    status: 'upcoming',
  },
  {
    round: 13,
    name: 'Italian Grand Prix',
    circuit: 'Autodromo Nazionale Monza',
    location: 'Monza',
    country: 'Italy',
    flagIso: 'it',
    date: '31',
    month: 'AUG',
    status: 'upcoming',
  },
  {
    round: 14,
    name: 'Azerbaijan Grand Prix',
    circuit: 'Baku City Circuit',
    location: 'Baku',
    country: 'Azerbaijan',
    flagIso: 'az',
    date: '14',
    month: 'SEP',
    status: 'upcoming',
  },
  {
    round: 15,
    name: 'Singapore Grand Prix',
    circuit: 'Marina Bay Street Circuit',
    location: 'Singapore',
    country: 'Singapore',
    flagIso: 'sg',
    date: '21',
    month: 'SEP',
    status: 'upcoming',
  },
  {
    round: 16,
    name: 'United States Grand Prix',
    circuit: 'Circuit of the Americas',
    location: 'Austin',
    country: 'USA',
    flagIso: 'us',
    date: '05',
    month: 'OCT',
    status: 'upcoming',
  },
  {
    round: 17,
    name: 'Mexico City Grand Prix',
    circuit: 'Autódromo Hermanos Rodríguez',
    location: 'Mexico City',
    country: 'Mexico',
    flagIso: 'mx',
    date: '12',
    month: 'OCT',
    status: 'upcoming',
  },
  {
    round: 18,
    name: 'Brazilian Grand Prix',
    circuit: 'Autódromo José Carlos Pace',
    location: 'São Paulo',
    country: 'Brazil',
    flagIso: 'br',
    date: '26',
    month: 'OCT',
    status: 'upcoming',
  },
  {
    round: 19,
    name: 'Las Vegas Grand Prix',
    circuit: 'Las Vegas Strip Circuit',
    location: 'Las Vegas',
    country: 'USA',
    flagIso: 'us',
    date: '02',
    month: 'NOV',
    status: 'upcoming',
  },
  {
    round: 20,
    name: 'Qatar Grand Prix',
    circuit: 'Lusail International Circuit',
    location: 'Lusail',
    country: 'Qatar',
    flagIso: 'qa',
    date: '09',
    month: 'NOV',
    status: 'upcoming',
  },
  {
    round: 21,
    name: 'Abu Dhabi Grand Prix',
    circuit: 'Yas Marina Circuit',
    location: 'Abu Dhabi',
    country: 'UAE',
    flagIso: 'ae',
    date: '23',
    month: 'NOV',
    status: 'upcoming',
  },
  {
    round: 22,
    name: 'Chinese Grand Prix',
    circuit: 'Shanghai International Circuit',
    location: 'Shanghai',
    country: 'China',
    flagIso: 'cn',
    date: '30',
    month: 'NOV',
    status: 'upcoming',
  },
];

export default function RaceResultsPage() {
  const [selectedRace, setSelectedRace] = useState<RaceWeekend | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'upcoming'>('all');

  const completedRaces = RACES_2026.filter(r => r.status === 'completed');
  const upcomingRaces = RACES_2026.filter(r => r.status === 'upcoming');

  const filteredRaces = useMemo(() => {
    if (filter === 'completed') return completedRaces;
    if (filter === 'upcoming') return upcomingRaces;
    return RACES_2026;
  }, [filter]);

  const latestCompleted = completedRaces[completedRaces.length - 1];

  return (
    <div className="results-page">
      {/* ─── Hero Header ─── */}
      <div className="results-hero">
        <div className="results-hero-accent" />
        <div className="results-hero-inner">
          <div className="results-breadcrumb">
            <div className="results-live-dot" />
            <span className="results-breadcrumb-label">2026 Season</span>
            <span className="results-breadcrumb-sep">|</span>
            <span className="results-breadcrumb-sub">Round {latestCompleted?.round} of 22 Complete</span>
          </div>
          <h1 className="results-title">Race Results</h1>
          <p className="results-dek">
            Full race results from the 2026 Formula 1 season. Review every Grand Prix finish, podium, and fastest lap.
          </p>

          {/* Filters */}
          <div className="results-filters">
            <button
              className={`results-filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Races <span className="results-filter-count">{RACES_2026.length}</span>
            </button>
            <button
              className={`results-filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed <span className="results-filter-count">{completedRaces.length}</span>
            </button>
            <button
              className={`results-filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming <span className="results-filter-count">{upcomingRaces.length}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <main className="results-main">
        {/* Latest Race Highlight */}
        {latestCompleted && !selectedRace && filter !== 'upcoming' && (
          <div className="results-latest">
            <div className="results-latest-header">
              <span className="results-latest-badge">Latest Result</span>
              <span className="results-latest-date">{latestCompleted.date} {latestCompleted.month} 2026</span>
            </div>
            <div className="results-latest-card" onClick={() => setSelectedRace(latestCompleted)}>
              <div className="results-latest-bar" style={{ backgroundColor: latestCompleted.winnerColor }} />
              <div className="results-latest-content">
                <div className="results-latest-left">
                  <div className="results-latest-round">Round {latestCompleted.round}</div>
                  <h2 className="results-latest-name">{latestCompleted.name}</h2>
                  <div className="results-latest-circuit">
                    <img src={`https://flagcdn.com/w40/${latestCompleted.flagIso}.png`} alt={latestCompleted.country} className="results-latest-flag" />
                    <span>{latestCompleted.circuit}</span>
                  </div>
                </div>
                <div className="results-latest-center">
                  <div className="results-latest-winner-label">Winner</div>
                  <div className="results-latest-winner" style={{ color: latestCompleted.winnerColor }}>
                    {latestCompleted.winner}
                  </div>
                  <div className="results-latest-team">{latestCompleted.winnerTeam}</div>
                </div>
                <div className="results-latest-right">
                  <div className="results-latest-meta">
                    <div className="results-latest-meta-item">
                      <span className="results-latest-meta-label">Pole</span>
                      <span className="results-latest-meta-value">{latestCompleted.polePosition}</span>
                    </div>
                    <div className="results-latest-meta-item">
                      <span className="results-latest-meta-label">Fastest Lap</span>
                      <span className="results-latest-meta-value">{latestCompleted.fastestLap}</span>
                    </div>
                    <div className="results-latest-meta-item">
                      <span className="results-latest-meta-label">Weather</span>
                      <span className="results-latest-meta-value">{latestCompleted.weather}</span>
                    </div>
                  </div>
                  <button className="results-latest-view">View Full Results →</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Race Grid */}
        <div className="results-grid">
          {filteredRaces.map((race) => {
            const isCompleted = race.status === 'completed';
            const isUpcoming = race.status === 'upcoming';
            const isSelected = selectedRace?.round === race.round;

            return (
              <div key={race.round} className="results-race-wrapper">
                <div
                  className={`results-race-card ${isCompleted ? 'completed' : ''} ${isUpcoming ? 'upcoming' : ''} ${isSelected ? 'selected' : ''}`}
                  onClick={() => isCompleted ? setSelectedRace(isSelected ? null : race) : undefined}
                >
                  {/* Color bar */}
                  {isCompleted && (
                    <div className="results-race-bar" style={{ backgroundColor: race.winnerColor }} />
                  )}
                  {isUpcoming && (
                    <div className="results-race-bar upcoming-bar" />
                  )}

                  <div className="results-race-inner">
                    {/* Top row: Round + Date + Status */}
                    <div className="results-race-top">
                      <div className="results-race-round">Round {race.round}</div>
                      <div className="results-race-date">
                        <span className="results-race-date-day">{race.date}</span>
                        <span className="results-race-date-month">{race.month}</span>
                      </div>
                      {isUpcoming && (
                        <span className="results-race-upcoming-badge">Upcoming</span>
                      )}
                    </div>

                    {/* Flag + Name */}
                    <div className="results-race-name-row">
                      <img
                        src={`https://flagcdn.com/w40/${race.flagIso}.png`}
                        alt={race.country}
                        className="results-race-flag"
                      />
                      <h3 className="results-race-name">{race.name}</h3>
                    </div>

                    <p className="results-race-circuit">{race.circuit}</p>

                    {/* Winner or Countdown */}
                    {isCompleted && race.winner && (
                      <div className="results-race-winner">
                        <span className="results-race-winner-label">Winner</span>
                        <span className="results-race-winner-name" style={{ color: race.winnerColor }}>
                          {race.winner}
                        </span>
                      </div>
                    )}

                    {isUpcoming && (
                      <div className="results-race-countdown">
                        <span className="results-race-countdown-label">In</span>
                        <span className="results-race-countdown-value">
                          {getDaysUntil(race.date, race.month)} days
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Hover overlay for completed */}
                  {isCompleted && (
                    <div className="results-race-hover">
                      <span>View Results</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Expanded Results Panel */}
                {isSelected && race.results && (
                  <div className="results-panel">
                    <div className="results-panel-header">
                      <h4 className="results-panel-title">{race.name} — Race Results</h4>
                      <button className="results-panel-close" onClick={() => setSelectedRace(null)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="results-panel-meta">
                      <div className="results-panel-meta-item">
                        <span className="results-panel-meta-label">Circuit</span>
                        <span className="results-panel-meta-value">{race.circuit}</span>
                      </div>
                      <div className="results-panel-meta-item">
                        <span className="results-panel-meta-label">Laps</span>
                        <span className="results-panel-meta-value">{race.laps}</span>
                      </div>
                      <div className="results-panel-meta-item">
                        <span className="results-panel-meta-label">Distance</span>
                        <span className="results-panel-meta-value">{race.distance}</span>
                      </div>
                      <div className="results-panel-meta-item">
                        <span className="results-panel-meta-label">Pole</span>
                        <span className="results-panel-meta-value">{race.polePosition}</span>
                      </div>
                      <div className="results-panel-meta-item">
                        <span className="results-panel-meta-label">Fastest Lap</span>
                        <span className="results-panel-meta-value">{race.fastestLap}</span>
                      </div>
                    </div>

                    <div className="results-table">
                      <div className="results-table-header">
                        <span>Pos</span>
                        <span>Driver</span>
                        <span>Team</span>
                        <span>Time</span>
                        <span>Pts</span>
                      </div>
                      {race.results.map((result) => (
                        <div
                          key={result.position}
                          className={`results-table-row ${result.position === '1' ? 'winner' : ''} ${result.position === '2' ? 'p2' : ''} ${result.position === '3' ? 'p3' : ''}`}
                        >
                          <span className="results-table-pos">
                            <span className="results-table-pos-badge" style={{
                              backgroundColor: result.position === '1' ? '#E10600' : result.position === '2' ? '#3A3B40' : result.position === '3' ? '#CD7F32' : 'transparent',
                              color: result.position === '3' ? '#0B0C10' : '#fff',
                            }}>
                              {result.position}
                            </span>
                          </span>
                          <span className="results-table-driver">
                            <img src={`https://flagcdn.com/w40/${result.flagIso}.png`} alt={result.driver} className="results-table-flag" />
                            {result.driver}
                            {result.fastestLap && (
                              <span className="results-table-fl" title="Fastest Lap">⚡</span>
                            )}
                          </span>
                          <span className="results-table-team">{result.team}</span>
                          <span className="results-table-time">{result.time}</span>
                          <span className="results-table-points">{result.points}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <style jsx>{`
        .results-page {
          min-height: 100vh;
          background-color: #0B0C10;
          color: #E4E4E7;
          font-family: var(--font-display);
        }

        /* ===== HERO ===== */
        .results-hero {
          background: linear-gradient(180deg, #15151E 0%, #0B0C10 100%);
          border-bottom: 1px solid #1F1F27;
          position: relative;
          overflow: hidden;
        }

        .results-hero-accent {
          height: 4px;
          width: 100%;
          background-color: #E10600;
        }

        .results-hero-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 48px 24px 32px;
          position: relative;
          z-index: 2;
        }

        .results-breadcrumb {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .results-live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #E10600;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; box-shadow: 0 0 8px #E10600; }
        }

        .results-breadcrumb-label {
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: #E10600;
        }

        .results-breadcrumb-sep {
          color: #3F3F46;
          font-size: 11px;
        }

        .results-breadcrumb-sub {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #71717A;
        }

        .results-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0;
          line-height: 1.1;
        }

        .results-dek {
          font-size: 15px;
          color: #A1A1AA;
          margin-top: 12px;
          max-width: 520px;
          line-height: 1.5;
        }

        .results-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #1F1F27;
        }

        .results-filter-btn {
          padding: 8px 16px;
          border-radius: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border: 1px solid #1F1F27;
          background: #15151E;
          color: #71717A;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .results-filter-btn:hover {
          color: #E4E4E7;
          border-color: #E10600;
        }

        .results-filter-btn.active {
          background: #E10600;
          border-color: #E10600;
          color: #ffffff;
        }

        .results-filter-count {
          margin-left: 6px;
          opacity: 0.6;
        }

        /* ===== MAIN ===== */
        .results-main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 32px 24px 64px;
        }

        /* ===== LATEST RACE ===== */
        .results-latest {
          margin-bottom: 40px;
        }

        .results-latest-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .results-latest-badge {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #E10600;
          background: rgba(225, 6, 0, 0.1);
          border: 1px solid rgba(225, 6, 0, 0.3);
          padding: 6px 14px;
          border-radius: 4px;
        }

        .results-latest-date {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #71717A;
          font-weight: 700;
        }

        .results-latest-card {
          background: linear-gradient(180deg, #15151E 0%, #0F1016 100%);
          border: 1px solid #1F1F27;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .results-latest-card:hover {
          transform: translateY(-2px);
          border-color: #27272A;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }

        .results-latest-bar {
          height: 3px;
          width: 100%;
          box-shadow: 0 0 12px currentColor;
        }

        .results-latest-content {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.2fr;
          gap: 32px;
          padding: 28px 32px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .results-latest-content {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .results-latest-round {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 800;
          color: #71717A;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .results-latest-name {
          font-size: 28px;
          font-weight: 900;
          color: #ffffff;
          margin: 0 0 8px 0;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .results-latest-circuit {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #A1A1AA;
        }

        .results-latest-flag {
          width: 24px;
          height: 16px;
          object-fit: cover;
          border-radius: 2px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        }

        .results-latest-center {
          text-align: center;
          border-left: 1px solid #1F1F27;
          border-right: 1px solid #1F1F27;
          padding: 0 24px;
        }

        @media (max-width: 900px) {
          .results-latest-center {
            border: none;
            border-top: 1px solid #1F1F27;
            border-bottom: 1px solid #1F1F27;
            padding: 16px 0;
            text-align: left;
          }
        }

        .results-latest-winner-label {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #3F3F46;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .results-latest-winner {
          font-size: 24px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .results-latest-team {
          font-size: 13px;
          color: #71717A;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 4px;
        }

        .results-latest-meta {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 16px;
        }

        .results-latest-meta-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }

        .results-latest-meta-label {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 800;
          color: #3F3F46;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .results-latest-meta-value {
          color: #E4E4E7;
          font-weight: 600;
        }

        .results-latest-view {
          width: 100%;
          padding: 10px;
          border-radius: 6px;
          background: #E10600;
          color: #ffffff;
          border: none;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .results-latest-view:hover {
          background: #ff1a1a;
          box-shadow: 0 4px 16px rgba(225, 6, 0, 0.3);
        }

        /* ===== GRID ===== */
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        @media (max-width: 700px) {
          .results-grid {
            grid-template-columns: 1fr;
          }
        }

        .results-race-wrapper {
          display: contents;
        }

        .results-race-card {
          background: linear-gradient(180deg, #15151E 0%, #0F1016 100%);
          border: 1px solid #1F1F27;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
          min-height: 180px;
          display: flex;
          flex-direction: column;
        }

        .results-race-card:hover {
          transform: translateY(-3px);
          border-color: #27272A;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .results-race-card.selected {
          border-color: #E10600;
          box-shadow: 0 0 30px rgba(225, 6, 0, 0.1);
        }

        .results-race-card.upcoming {
          cursor: default;
          opacity: 0.7;
        }

        .results-race-card.upcoming:hover {
          transform: none;
          border-color: #1F1F27;
          box-shadow: none;
        }

        .results-race-bar {
          height: 3px;
          width: 100%;
          box-shadow: 0 0 8px currentColor;
        }

        .upcoming-bar {
          background: linear-gradient(90deg, #3F3F46, #71717A);
        }

        .results-race-inner {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .results-race-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .results-race-round {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 800;
          color: #3F3F46;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .results-race-date {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .results-race-date-day {
          font-family: var(--font-mono);
          font-size: 18px;
          font-weight: 900;
          color: #E4E4E7;
          line-height: 1;
        }

        .results-race-date-month {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 800;
          color: #71717A;
          letter-spacing: 1px;
        }

        .results-race-upcoming-badge {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #F59E0B;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          padding: 3px 8px;
          border-radius: 4px;
        }

        .results-race-name-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .results-race-flag {
          width: 24px;
          height: 16px;
          object-fit: cover;
          border-radius: 2px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        }

        .results-race-name {
          font-size: 16px;
          font-weight: 900;
          color: #ffffff;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .results-race-circuit {
          font-size: 12px;
          color: #71717A;
          margin: 0 0 14px 34px;
          line-height: 1.4;
        }

        .results-race-winner {
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid #1F1F27;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .results-race-winner-label {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 800;
          color: #3F3F46;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .results-race-winner-name {
          font-size: 14px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .results-race-countdown {
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid #1F1F27;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .results-race-countdown-label {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 800;
          color: #3F3F46;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .results-race-countdown-value {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 900;
          color: #F59E0B;
        }

        .results-race-hover {
          position: absolute;
          inset: 0;
          background: rgba(225, 6, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #ffffff;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        .results-race-card:hover .results-race-hover {
          opacity: 1;
        }

        /* ===== EXPANDED PANEL ===== */
        .results-panel {
          grid-column: 1 / -1;
          background: #0F1016;
          border: 1px solid #1F1F27;
          border-radius: 12px;
          padding: 24px;
          margin-top: 8px;
          margin-bottom: 8px;
          animation: panelIn 0.3s ease-out;
        }

        @keyframes panelIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .results-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #1F1F27;
        }

        .results-panel-title {
          font-size: 18px;
          font-weight: 900;
          color: #ffffff;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .results-panel-close {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: #1A1B23;
          border: 1px solid #27272A;
          color: #71717A;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .results-panel-close:hover {
          background: #E10600;
          border-color: #E10600;
          color: #ffffff;
        }

        .results-panel-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
          padding: 16px;
          background: #15151E;
          border-radius: 8px;
          border: 1px solid #1F1F27;
        }

        .results-panel-meta-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .results-panel-meta-label {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 800;
          color: #3F3F46;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .results-panel-meta-value {
          font-size: 13px;
          font-weight: 700;
          color: #E4E4E7;
        }

        /* ===== TABLE ===== */
        .results-table {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .results-table-header {
          display: grid;
          grid-template-columns: 60px 2fr 1.5fr 1.5fr 60px;
          gap: 12px;
          padding: 10px 16px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 800;
          color: #3F3F46;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border-bottom: 1px solid #1F1F27;
        }

        .results-table-row {
          display: grid;
          grid-template-columns: 60px 2fr 1.5fr 1.5fr 60px;
          gap: 12px;
          padding: 10px 16px;
          align-items: center;
          border-radius: 6px;
          transition: background 0.15s ease;
        }

        .results-table-row:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .results-table-row.winner {
          background: linear-gradient(90deg, rgba(225, 6, 0, 0.08), transparent);
        }

        .results-table-row.p2 {
          background: linear-gradient(90deg, rgba(192, 192, 192, 0.05), transparent);
        }

        .results-table-row.p3 {
          background: linear-gradient(90deg, rgba(205, 127, 50, 0.05), transparent);
        }

        .results-table-pos {
          display: flex;
          align-items: center;
        }

        .results-table-pos-badge {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-weight: 900;
          font-size: 13px;
        }

        .results-table-driver {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 700;
          color: #E4E4E7;
        }

        .results-table-flag {
          width: 20px;
          height: 14px;
          object-fit: cover;
          border-radius: 2px;
        }

        .results-table-fl {
          margin-left: 4px;
          font-size: 12px;
        }

        .results-table-team {
          font-size: 13px;
          color: #A1A1AA;
          font-weight: 600;
        }

        .results-table-time {
          font-family: var(--font-mono);
          font-size: 13px;
          color: #71717A;
          font-weight: 700;
        }

        .results-table-points {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 900;
          color: #E4E4E7;
          text-align: right;
        }
      `}</style>
    </div>
  );
}

// Helper: calculate days until race (mock)
function getDaysUntil(date: string, month: string): number {
  const monthMap: Record<string, number> = {
    'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
    'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
  };
  const raceDate = new Date(2026, monthMap[month] || 6, parseInt(date));
  const now = new Date('2026-07-08'); // Current date in your session
  const diff = raceDate.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}