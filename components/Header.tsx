'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface HeaderProps {
  badgeText: string | null; // Pass the event name or target ISO date string here
  isLive: boolean;
  nextRaceDate?: string; // Optional: Pass a date string like '2026-07-12T13:00:00Z'
}

export default function Header({ badgeText, isLive, nextRaceDate }: HeaderProps) {
  const pathname = usePathname();
  const [countdown, setCountdown] = useState('');

  const isActive = (path: string) => pathname === path;

  // Countdown calculations for the non-live states
  useEffect(() => {
    if (isLive || !nextRaceDate) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(nextRaceDate) - +new Date();
      if (difference <= 0) {
        setCountdown('RACE WEEKEND');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      if (days > 0) {
        setCountdown(`${days}D ${hours}H UNTIL`);
      } else {
        setCountdown(`${hours}H ${minutes}M UNTIL`);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [isLive, nextRaceDate]);

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
          zIndex: 100,
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
          zIndex: 90,
          height: '76px',
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'inherit', // Uses your CSS font configuration
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '95%', // Liquid UI constraint scaling
            margin: '0 auto',
            padding: '0 5%', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand Logo Link */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              padding: '4px 0',
              transition: 'transform 0.2s ease',
              zIndex: 95, // Ensures the link area sits cleanly on top
              position: 'relative',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div
              style={{
                width: '110px', 
                height: '68px', // Fixed the bounding box height overflow covering structural layout areas
                flexShrink: 0,
                position: 'relative',
              }}
            >
              <NextImage
                src="/F1-Fan-Paddock.png"
                alt="F1 Fan Paddock Logo"
                fill
                style={{ objectFit: 'contain' }}
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
              gap: 'clamp(1rem, 2.5vw, 2.5rem)', // Fluid spacing layout
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
                  fontFamily: 'Formula1 Display-Regular',
                  color: isActive(link.path) ? '#E10600' : '#E4E4E7',
                  transition: 'color 0.2s ease',
                  zIndex: 95,
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
                      height: '3px',
                      backgroundColor: '#E10600',
                      transform: 'skewX(-12deg)',
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Premium Dynamic Badge Component */}
          <div style={{ display: 'flex', alignItems: 'center', zIndex: 95 }}>
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
                  fontFamily: 'inherit',
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
                
                {isLive && (
                  <style>{`
                    @keyframes pulse {
                      0% { transform: scale(0.95); opacity: 0.5; }
                      50% { transform: scale(1.15); opacity: 1; box-shadow: 0 0 8px #E10600; }
                      100% { transform: scale(0.95); opacity: 0.5; }
                    }
                  `}</style>
                )}

                <span>{isLive ? 'LIVE' : countdown}</span>

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