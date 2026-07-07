'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  badgeText: string | null;
  isLive: boolean;
}

export default function Header({ badgeText, isLive }: HeaderProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Top F1 Red Racing Stripe */}
      <div
        style={{
          height: '4px',
          width: '100%',
          backgroundColor: '#E10600',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 50,
        }}
      />

      <header
        style={{
          position: 'fixed',
          top: '4px',
          left: 0,
          width: '100%',
          backgroundColor: '#15151E',
          color: '#ffffff',
          borderBottom: '1px solid #1F1F27',
          zIndex: 40,
          height: '76px', // Increased header height slightly to comfortably frame the premium logo
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand Logo Link (Text Removed, Crisp High-Definition Scaling) */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              padding: '4px 0',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div
              style={{
                width: '110px', // Enlarged signature size to make it pop beautifully
                height: '156px',  
                flexShrink: 0,
              }}
            >
              <NextImage
                src="/F1-Fan-Paddock.png"
                alt="F1 Fan Paddock Logo"
                width={110} 
                height={156}
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                priority
              />
            </div>
          </Link>

          {/* Navigation Links */}
          <nav
            aria-label="Primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
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
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  position: 'relative',
                  padding: '0.5rem 0',
                  color: isActive(link.path) ? '#E10600' : '#E4E4E7',
                  transition: 'color 0.2s ease',
                }}
              >
                {link.name}

                {isActive(link.path) && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '3px', // Thicker racing accent track underline
                      backgroundColor: '#E10600',
                      transform: 'skewX(-12deg)',
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Premium Live Badge Component */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {badgeText && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.35rem 0.875rem',
                  borderRadius: '3px',
                  fontSize: '0.725rem',
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  border: isLive
                    ? '1px solid rgba(225, 6, 0, 0.6)'
                    : '1px solid #27272A',
                  backgroundColor: isLive
                    ? 'rgba(225, 6, 0, 0.12)'
                    : '#1F1F27',
                  color: isLive ? '#FF1801' : '#A1A1AA',
                  boxShadow: isLive ? '0 0 12px rgba(225, 6, 0, 0.15)' : 'none',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: isLive ? '#E10600' : '#71717A',
                    display: 'inline-block',
                    animation: isLive ? 'pulse 1.8s infinite' : 'none',
                  }}
                />
                
                {/* Standard css keyframe inject hack for inline styles */}
                {isLive && (
                  <style>{`
                    @keyframes pulse {
                      0% { transform: scale(0.95); opacity: 0.5; }
                      50% { transform: scale(1.15); opacity: 1; box-shadow: 0 0 8px #E10600; }
                      100% { transform: scale(0.95); opacity: 0.5; }
                    }
                  `}</style>
                )}

                <span>{isLive ? 'LIVE' : 'UPCOMING'}</span>

                <span style={{ color: '#3F3F46' }}>|</span>

                <span
                  style={{
                    color: '#ffffff',
                    fontWeight: 700,
                  }}
                >
                  {badgeText}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Dynamic Structural Spacer */}
      <div style={{ height: '80px' }} />
    </>
  );
}