'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface SidebarProps {
  badgeText: string | null;
  isLive: boolean;
  nextRaceDate?: string;
}

export default function Sidebar({ badgeText, isLive, nextRaceDate }: SidebarProps) {
  const pathname = usePathname();
  const [countdown, setCountdown] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (isLive || !nextRaceDate) return;
    const calculateTimeLeft = () => {
      const difference = +new Date(nextRaceDate) - +new Date();
      if (difference <= 0) { setCountdown('RACE WEEKEND'); return; }
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      setCountdown(days > 0 ? `${days}D ${hours}H` : `${hours}H ${minutes}M`);
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, [isLive, nextRaceDate]);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: DashboardIcon },
    { name: 'Drivers', path: '/driver-standings', icon: DriversIcon },
    { name: 'Constructors', path: '/constructors', icon: ConstructorsIcon },
    { name: 'Race Results', path: '/results', icon: ResultsIcon },
    { name: 'Seasons', path: '/seasons', icon: SeasonsIcon },
    { name: 'Circuits', path: '/circuits', icon: CircuitsIcon },
    { name: 'Statistics', path: '/statistics', icon: StatsIcon },
    { name: 'Moments', path: '/moments', icon: MomentsIcon },
  ];

  const sidebarWidth = collapsed ? '80px' : '260px';

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="sidebar-mobile-toggle"
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 200,
          background: '#15151E',
          border: '1px solid #1F1F27',
          borderRadius: '8px',
          padding: '10px',
          color: '#E4E4E7',
          cursor: 'pointer',
          display: 'none',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {mobileOpen ? (
            <>
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="sidebar-mobile-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 90,
            display: 'none',
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar-main ${mobileOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: sidebarWidth,
          backgroundColor: '#0B0C10',
          borderRight: '1px solid #1F1F27',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'hidden',
        }}
      >
        {/* F1 Red Top Stripe */}
        <div style={{ height: '3px', width: '100%', backgroundColor: '#E10600', flexShrink: 0 }} />

        {/* Logo Section */}
        <div style={{
          padding: collapsed ? '20px 12px' : '24px 20px',
          borderBottom: '1px solid #1F1F27',
          display: 'flex',
          alignItems: 'center',
          gap: collapsed ? '0' : '12px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          transition: 'all 0.3s ease',
          flexShrink: 0,
        }}>
         <div style={{
  width: collapsed ? '40px' : '48px',
  height: collapsed ? '40px' : '48px',
  borderRadius: '8px',
 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  overflow: 'hidden',
}}>
  <img
    src="/F1-Fan-Paddock.png"
    alt="F1 Fan Paddock logo"
    style={{
      width: 'auto',
      height: '140%',
      objectFit: 'cover',
    }}
  />
</div>
          {!collapsed && (
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span style={{
                fontFamily: '"Formula1 Display-Regular", "Titillium Web", sans-serif',
                fontSize: '15px',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
              }}>
                F1 Fan Paddock
              </span>
              <span style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '9px',
                fontWeight: 500,
                color: '#E10600',
                
             
              }}>
                The F1 Bulletin
              </span>
            </div>
          )}
        </div>

        {/* Live Badge */}
{(badgeText || isLive) && (
  <div style={{
    margin: collapsed ? '12px 8px' : '16px 16px',
    padding: collapsed ? '8px' : '10px 14px',
    borderRadius: '6px',
    background: isLive ? 'rgba(225, 6, 0, 0.1)' : '#15151E',
    border: isLive ? '1px solid rgba(225, 6, 0, 0.3)' : '1px solid #1F1F27',
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'flex-start',
    gap: '8px',
    flexShrink: 0,
  }}>
    <span style={{
      width: '7px',
      height: '7px',
      borderRadius: '50%',
      backgroundColor: isLive ? '#E10600' : '#71717A',
      display: 'inline-block',
      animation: isLive ? 'pulseLive 1.8s infinite' : 'none',
      flexShrink: 0,
    }} />
    {!collapsed && (
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, gap: '2px' }}>
        <span style={{
          fontSize: '10px',
          fontWeight: 800,
          color: isLive ? '#E10600' : '#A1A1AA',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontFamily: '"JetBrains Mono", monospace',
          lineHeight: 1,
        }}>
          {isLive ? 'LIVE NOW' : countdown || 'OFF SEASON'}
        </span>

        {badgeText && (
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.2,
          }}>
            {badgeText}
          </span>
        )}
      </div>
    )}
  </div>
)}

        {/* Navigation */}
        <nav style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          padding: collapsed ? '8px 10px' : '8px 12px',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}>
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: collapsed ? '0' : '14px',
                  padding: collapsed ? '12px' : '12px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  backgroundColor: active ? 'rgba(225, 6, 0, 0.1)' : 'transparent',
                  border: active ? '1px solid rgba(225, 6, 0, 0.2)' : '1px solid transparent',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.borderColor = '#27272A';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                {active && collapsed && (
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: '20%',
                    bottom: '20%',
                    width: '3px',
                    backgroundColor: '#E10600',
                    borderRadius: '0 2px 2px 0',
                  }} />
                )}
                <div style={{
                  color: active ? '#E10600' : '#71717A',
                  transition: 'color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '22px',
                  height: '22px',
                  flexShrink: 0,
                }}>
                  <Icon />
                </div>
                {!collapsed && (
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: active ? '#FFFFFF' : '#A1A1AA',
                    fontFamily: '"Formula1 Display-Regular", "Titillium Web", sans-serif',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}>
                    {link.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            padding: collapsed ? '12px' : '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            color: '#71717A',
            background: 'none',
            border: 'none',
            borderTop: '1px solid #1F1F27',
            cursor: 'pointer',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'color 0.2s ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#E10600'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#71717A'; }}
        >
          {!collapsed && <span>Collapse</span>}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{
              transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
              flexShrink: 0,
            }}
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Contact & Social */}
        {!collapsed && (
          <div style={{
            padding: '16px',
            borderTop: '1px solid #1F1F27',
            flexShrink: 0,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '12px',
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#15151E',
                border: '1px solid #1F1F27',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#E10600',
                flexShrink: 0,
              }}>
                <MailIcon />
              </div>
              <div style={{ minWidth: 0 }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF', display: 'block' }}>
                  Contact
                </span>
                <span style={{ fontSize: '10px', color: '#71717A', fontFamily: '"JetBrains Mono", monospace' }}>
                  Get in touch
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <SocialButton icon={GitHubIcon} />
              <SocialButton icon={TwitterIcon} />
              <SocialButton icon={InstagramIcon} />
            </div>
          </div>
        )}
      </aside>

      {/* Spacer for main content */}
      <div
        className="sidebar-spacer"
        style={{
          width: sidebarWidth,
          flexShrink: 0,
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Animations & Responsive */}
      <style>{`
        @keyframes pulseLive {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(225, 6, 0, 0.4); }
          50% { opacity: 0.6; box-shadow: 0 0 0 5px rgba(225, 6, 0, 0); }
        }
        @media (max-width: 1024px) {
          .sidebar-main {
            transform: translateX(-100%);
            transition: transform 0.3s ease, width 0.3s ease;
          }
          .sidebar-main.open {
            transform: translateX(0);
          }
          .sidebar-spacer {
            display: none !important;
          }
          .sidebar-mobile-toggle {
            display: block !important;
          }
          .sidebar-mobile-overlay {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}

// ─── Icons ───

function DashboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function DriversIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ConstructorsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function ResultsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

function SeasonsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function CircuitsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function StatsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function MomentsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function SocialButton({ icon: Icon }: { icon: React.FC }) {
  return (
    <button
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        background: '#15151E',
        border: '1px solid #1F1F27',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#71717A',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#E10600';
        e.currentTarget.style.color = '#E10600';
        e.currentTarget.style.background = 'rgba(225, 6, 0, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#1F1F27';
        e.currentTarget.style.color = '#71717A';
        e.currentTarget.style.background = '#15151E';
      }}
    >
      <Icon />
    </button>
  );
}