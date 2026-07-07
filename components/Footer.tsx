'use client';

import Link from 'next/link';
import NextImage from 'next/image';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#0D0D12', // Deep dark matching the screenshot base
        color: '#E4E4E7',
        borderTop: '1px solid #1F1F27',
        fontFamily: 'Formula1 Display-Regular',
        padding: '3.5rem 0 2rem 0',
        width: '100%',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '95%', // Matching your Header's liquid layout
          margin: '0 auto',
          padding: '0 5%',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
        }}
      >
        {/* Top Segment: Brand & Navigation */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '2rem',
          }}
        >
          {/* Brand Info & Logo Replacement */}
          <div style={{ maxWidth: '480px' }}>
            <div
              style={{
                width: '100px',
                height: '62px',
                position: 'relative',
                marginBottom: '1rem',
                flexShrink: 0,
              }}
            >
              <NextImage
                src="/F1-Fan-Paddock.png"
                alt="F1 Fan Paddock Logo"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left' }}
                priority
              />
            </div>
            <p
              style={{
                fontSize: '0.825rem',
                lineHeight: '1.5',
                color: '#A1A1AA',
                margin: 0,
              }}
            >
              Independent Formula 1 stats and analysis. Live timing via OpenF1, historical records via Jolpica —
              not affiliated with Formula 1, FOM, or the FIA.
            </p>
          </div>

          {/* Navigation Links */}
          <nav
            aria-label="Footer"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {[
              { name: 'Home', path: '/' },
              { name: 'Live Dashboard', path: '/dashboard' },
              { name: 'Standings', path: '/standings' },
              { name: 'Articles', path: '/articles' },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  color: '#E4E4E7',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#E10600')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#E4E4E7')}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social / Dev Connections */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a
              href="https://openf1.org"
              target="_blank"
              rel="noreferrer"
              aria-label="OpenF1"
              style={{ color: '#71717A', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#71717A')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px' }}>
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9z" />
              </svg>
            </a>
            <a
              href="https://github.com/jolpica/jolpica-f1"
              target="_blank"
              rel="noreferrer"
              aria-label="Jolpica"
              style={{ color: '#71717A', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#71717A')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px' }}>
                <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.92.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Structural Divider Accent Track Line */}
        <div style={{ height: '1px', backgroundColor: '#1F1F27', width: '100%' }} />

        {/* Bottom Segment: Copyright & Engine Credits */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.75rem',
            color: '#71717A',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span>© {new Date().getFullYear()} TFB — The F1 Bulletin</span>
            <span>
              Design & Build by{' '}
              <a
                href="https://vihangaart.space"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'color 0.2s ease',
                  borderBottom: '1px dashed #3F3F46'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#E10600';
                  e.currentTarget.style.borderBottomColor = '#E10600';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderBottomColor = '#3F3F46';
                }}
              >
                Vihanga
              </a>
            </span>
          </div>

          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span>Data Feeds: OpenF1 (Live) · Jolpica Engine (Historical)</span>
            <span style={{ color: '#3F3F46', letterSpacing: '0.05em' }}>PRODUCED UNDER RACING CONDITIONS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}