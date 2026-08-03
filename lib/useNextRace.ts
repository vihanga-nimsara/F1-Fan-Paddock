import { useEffect, useState } from "react";

export interface Race {
  round: number;
  name: string;
  circuit: string;
  location: string;
  date: string;
  time: string;
  lat: number;
  lon: number;
}

const NEXT_RACE: Race = {
  round: 10,
  name: "Belgian GP",
  circuit: "Spa-Francorchamps",
  location: "Spa, Belgium",
  date: "2026-07-19",
  time: "18:30:00",
  lat: 50.4372,
  lon: 5.9714,
};

export function useNextRace() {
  const [race, setRace] = useState<Race>(NEXT_RACE);
  const [countdown, setCountdown] = useState({
    days: 0,
    hrs: 0,
    min: 0,
    sec: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const target = new Date(
        `${race.date}T${race.time}Z`
      ).getTime();

      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown({
          days: 0,
          hrs: 0,
          min: 0,
          sec: 0,
        });
        return;
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hrs: Math.floor(
          (diff / (1000 * 60 * 60)) % 24
        ),
        min: Math.floor(
          (diff / (1000 * 60)) % 60
        ),
        sec: Math.floor(
          (diff / 1000) % 60
        ),
      });
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [race]);

  return {
    race,
    countdown,
  };
}