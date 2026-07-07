import { TickerSession } from '@/lib/ticker';

export default function SessionTicker({ raceName, sessions }: { raceName: string; sessions: TickerSession[] }) {
  if (!sessions.length) return null;

  return (
    <section className="ticker">
      <div className="ticker-label">
        This Weekend — {raceName.replace(' Grand Prix', '')} <span style={{ opacity: 0.6 }}>(Local time)</span>
      </div>
      <div className="ticker-track">
        {sessions.map((s) => (
          <div key={s.label} className={`ticker-item is-${s.status}`}>
            <div className="session-day">{s.day}</div>
            <div className="session-name">{s.label}</div>
            <div className="session-time">{s.time}</div>
          </div>
        ))}
      </div>
    </section>
  );
}