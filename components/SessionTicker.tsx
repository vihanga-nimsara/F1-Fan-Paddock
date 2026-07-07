import { TickerSession } from '@/lib/ticker';

export default function SessionTicker({ raceName, sessions }: { raceName: string; sessions: TickerSession[] }) {
  if (!sessions.length) return null;

  // Inline color mapping helper for different session statuses
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return '#10B981';      // Pit-wall Green
      case 'next': return '#38BDF8';      // Aero Blue
      case 'done': return '#4B5563';      // Muted Carbon
      default: return '#6B7280';
    }
  };

  return (
    <section style={{ 
      display: 'flex', 
      alignItems: 'center', 
      backgroundColor: '#111118', 
      borderBottom: '1px solid #1F1F29', 
      fontFamily: 'var(--font-mono, monospace)', 
      fontSize: '0.75rem', 
      overflow: 'hidden',
      width: '100%'
    }}>
      {/* Track Label Tag */}
      <div style={{ 
        backgroundColor: '#0C0C10', 
        padding: '1rem 1.5rem', 
        borderRight: '1px solid #1F1F29', 
        whiteSpace: 'nowrap', 
        fontWeight: 700, 
        letterSpacing: '0.02em',
        color: '#FFFFFF'
      }}>
        WEEKEND TIMELINE — {raceName.replace(' Grand Prix', '').toUpperCase()} <span style={{ color: '#4B5563', fontSize: '0.6875rem', fontWeight: 500 }}>(LOCAL)</span>
      </div>

      {/* Horizontal Scrollable Session Track */}
      <div style={{ 
        display: 'flex', 
        flexGrow: 1, 
        overflowX: 'auto', 
        scrollbarWidth: 'none', // Hides scrollbar on Firefox
        msOverflowStyle: 'none' // Hides scrollbar on IE/Edge
      }}>
        {/* Style injection to hide webkit scrollbars */}
        <style dangerouslySetInnerHTML={{__html: `div::-webkit-scrollbar { display: none; }`}} />

        {sessions.map((s) => {
          const statusColor = getStatusColor(s.status);
          const isLive = s.status === 'live';

          return (
            <div 
              key={s.label} 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                padding: '0.75rem 1.5rem', 
                borderRight: '1px solid #1F1F29', 
                minWidth: '140px',
                backgroundColor: isLive ? 'rgba(16, 185, 129, 0.02)' : 'transparent',
                position: 'relative'
              }}
            >
              {/* Upper status header line */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.125rem' }}>
                <span style={{ 
                  width: '5px', 
                  height: '5px', 
                  borderRadius: '50%', 
                  backgroundColor: statusColor,
                  boxShadow: isLive ? '0 0 8px #10B981' : 'none'
                }} />
                <span style={{ color: '#6B7280', fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  {s.day} // {s.status.toUpperCase()}
                </span>
              </div>

              {/* Session Core Info */}
              <div style={{ color: isLive ? '#FFFFFF' : '#E5E7EB', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8125rem', letterSpacing: '-0.01em' }}>
                {s.label}
              </div>
              <div style={{ color: isLive ? '#10B981' : '#9CA3AF', fontSize: '0.6875rem', marginTop: '0.125rem', fontWeight: 500 }}>
                {s.time}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}