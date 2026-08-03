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

      {/* Sidebar Containers */}
      <aside className={`sidebar-main ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'open' : ''}`}>
        {/* F1 Red Top Stripe */}
        <div style={{ height: '3px', width: '100%', backgroundColor: '#E10600', flexShrink: 0 }} />

        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-wrapper">
            <img src="/F1-Fan-Paddock.png" alt="F1 Fan Paddock logo" className="logo-img" />
          </div>
          <div className="logo-text-group">
            <span className="logo-title">F1 Fan Paddock</span>
            <span className="logo-subtitle">The F1 Bulletin</span>
          </div>
        </div>

        {/* Live Status Badge */}
        {(badgeText || isLive) && (
          <div className={`live-badge-container ${isLive ? 'is-live' : ''}`}>
            <span className="live-dot" />
            <div className="live-text-group">
              <span className="live-status-label">
                {isLive ? 'LIVE NOW' : countdown || 'OFF SEASON'}
              </span>
              {badgeText && <span className="live-badge-text">{badgeText}</span>}
            </div>
          </div>
        )}

        {/* Navigation Item Links */}
        <nav className="sidebar-nav-container">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileOpen(false)}
                className={`nav-item-link ${active ? 'active' : ''}`}
              >
                {active && collapsed && <div className="active-indicator-bar" />}
                <div className="nav-icon-wrapper" style={{ color: active ? '#E10600' : 'inherit' }}>
                  <Icon />
                </div>
                <span className="nav-text-label">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Toggle Collapse Bar Component */}
        <button onClick={() => setCollapsed(!collapsed)} className="collapse-toggle-btn">
          <span className="toggle-label-text">Collapse</span>
          <svg className="toggle-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Updated Unified Match Contact & Social Grid Layout */}
        <div className="contact-footer-section">
          <div className="contact-meta-header">
            <div className="contact-icon-box">
              <MailIcon />
            </div>
            <div className="contact-text-labels">
              <span className="contact-title">Contact</span>
              <span className="contact-subtitle">Get in touch</span>
            </div>
          </div>
          <div className="social-actions-row">
            <SocialButton icon={GitHubIcon} />
            <SocialButton icon={TwitterIcon} />
            <SocialButton icon={InstagramIcon} />
          </div>
        </div>
      </aside>

      {/* Synchronized Underlay Content Spacer layout panel */}
      <div className={`sidebar-spacer ${collapsed ? 'collapsed' : ''}`} />

      {/* Fully Configured Optimization Stylesheets Layer */}
      <style>{`
        /* Core System Root Tokens Configuration Context Mapping */
        .sidebar-main {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 260px;
          background-color: #0B0C10;
          border-right: 1px solid #1F1F27;
          z-index: 100;
          display: flex;
          flex-direction: column;
          transition: width 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
          overflow: hidden;
        }
        .sidebar-spacer {
          width: 260px;
          flex-shrink: 0;
          transition: width 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* Collapsed Variant State Transitions Styles */
        .sidebar-main.collapsed {
          width: 78px;
        }
        .sidebar-spacer.collapsed {
          width: 78px;
        }

        /* Core Sections Styles Configuration */
        .logo-section {
          padding: 24px 18px;
          border-bottom: 1px solid #1F1F27;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: padding 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), gap 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
          flex-shrink: 0;
        }
        .sidebar-main.collapsed .logo-section {
          padding: 20px 14px;
          gap: 0px;
        }
        .logo-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
          transition: width 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .sidebar-main.collapsed .logo-wrapper {
          width: 38px;
          height: 38px;
        }
        .logo-img {
          width: auto;
          height: 140%;
          object-fit: cover;
        }
        .logo-text-group {
          display: flex;
          flex-direction: column;
          min-width: 0;
          opacity: 1;
          transition: opacity 0.25s ease, transform 0.35s ease;
        }
        .sidebar-main.collapsed .logo-text-group {
          opacity: 0;
          transform: translateX(-15px);
          pointer-events: none;
          width: 0;
        }
        .logo-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 900;
          color: #FFFFFF;
          letter-spacing: -0.02em;
          line-height: 1.2;
          white-space: nowrap;
        }
        .logo-subtitle {
          font-family: "Inter", sans-serif;
          font-size: 9px;
          font-weight: 600;
          color: #E10600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Improved High Fidelity Live Badge Layout Rules */
        .live-badge-container {
          margin: 16px;
          padding: 12px 14px;
          border-radius: 8px;
          background: #12121A;
          border: 1px solid #1F1F27;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
          transition: margin 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), padding 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.3s;
        }
        .live-badge-container.is-live {
          background: rgba(225, 6, 0, 0.05);
          border: 1px solid rgba(225, 6, 0, 0.25);
          box-shadow: inset 0 0 12px rgba(225, 6, 0, 0.03);
        }
        .sidebar-main.collapsed .live-badge-container {
          margin: 12px 10px;
          padding: 12px 0px;
          justify-content: center;
          gap: 0;
        }
        .live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #71717A;
          display: inline-block;
          flex-shrink: 0;
        }
        .live-badge-container.is-live .live-dot {
          background-color: #E10600;
          animation: pulseLive 1.6s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }
        .live-text-group {
          display: flex;
          flex-direction: column;
          min-width: 0;
          gap: 3px;
          opacity: 1;
          transition: opacity 0.2s ease;
        }
        .sidebar-main.collapsed .live-text-group {
          opacity: 0;
          width: 0;
          pointer-events: none;
        }
        .live-status-label {
          font-size: 10px;
          font-weight: 800;
          color: #A1A1AA;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-family: var(--font-display);
          line-height: 1;
        }
        .live-badge-container.is-live .live-status-label {
          color: #E10600;
        }
        .live-badge-text {
          font-size: 11px;
          font-weight: 700;
          color: #FFFFFF;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.2;
        }

        /* Navigation List Container Interface Area */
        .sidebar-nav-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 8px 12px;
          overflow-y: auto;
          overflow-x: hidden;
        }
        .sidebar-main.collapsed .sidebar-nav-container {
          padding: 8px 10px;
        }
        .nav-item-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          border-radius: 8px;
          text-decoration: none;
          color: #71717A;
          transition: background-color 0.25s ease, border-color 0.25s ease, padding 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
          border: 1px solid transparent;
          justify-content: flex-start;
          position: relative;
        }
        .sidebar-main.collapsed .nav-item-link {
          padding: 12px 0px;
          justify-content: center;
          gap: 0;
        }
        .nav-item-link:hover {
          background-color: rgba(255, 255, 255, 0.03);
          border-color: #1F1F27;
          color: #A1A1AA;
        }
        .nav-item-link.active {
          background-color: rgba(225, 6, 0, 0.08);
          border: 1px solid rgba(225, 6, 0, 0.15);
          color: #FFFFFF !important;
        }
        .active-indicator-bar {
          position: absolute;
          left: 0;
          top: 25%;
          bottom: 25%;
          width: 3px;
          background-color: #E10600;
          border-radius: 0 4px 4px 0;
        }
        .nav-icon-wrapper {
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          flex-shrink: 0;
        }
        .nav-text-label {
          font-size: 12px;
          font-weight: 700;
          font-family: var(--font-display);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: opacity 0.2s ease, transform 0.3s ease;
          white-space: nowrap;
          opacity: 1;
        }
        .sidebar-main.collapsed .nav-text-label {
          opacity: 0;
          transform: translateX(-10px);
          pointer-events: none;
          width: 0;
        }

        /* Collapse Interface Toggle Controls Configuration */
        .collapse-toggle-btn {
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #4B4B55;
          background: none;
          border: none;
          border-top: 1px solid #1F1F27;
          cursor: pointer;
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: color 0.2s ease, padding 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
          flex-shrink: 0;
        }
        .sidebar-main.collapsed .collapse-toggle-btn {
          padding: 14px 0;
          justify-content: center;
        }
        .collapse-toggle-btn:hover {
          color: #E10600;
        }
        .toggle-label-text {
          transition: opacity 0.2s ease;
        }
        .sidebar-main.collapsed .toggle-label-text {
          opacity: 0;
          display: none;
        }
        .toggle-chevron {
          transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
          flex-shrink: 0;
        }
        .sidebar-main.collapsed .toggle-chevron {
          transform: rotate(180deg);
        }

        /* Cohesive Refined Contact & Footer Section */
        .contact-footer-section {
          padding: 16px;
          border-top: 1px solid #1F1F27;
          background-color: #08090C;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          transition: padding 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .sidebar-main.collapsed .contact-footer-section {
          padding: 16px 8px;
        }
        .contact-meta-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          transition: justify-content 0.45s, margin-bottom 0.45s;
        }
        .sidebar-main.collapsed .contact-meta-header {
          margin-bottom: 0px;
          justify-content: center;
        }
        .contact-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: #12121A;
          border: 1px solid #1F1F27;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #71717A;
          flex-shrink: 0;
        }
        .contact-text-labels {
          display: flex;
          flex-direction: column;
          min-width: 0;
          opacity: 1;
          transition: opacity 0.2s ease;
        }
        .sidebar-main.collapsed .contact-text-labels {
          opacity: 0;
          width: 0;
          display: none;
        }
        .contact-title {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          color: #A1A1AA;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        .contact-subtitle {
          font-size: 10px;
          color: #4B4B55;
        }
        .social-actions-row {
          display: flex;
          gap: 8px;
          transition: max-height 0.3s, opacity 0.3s, margin-top 0.3s;
          max-height: 40px;
          opacity: 1;
        }
        .sidebar-main.collapsed .social-actions-row {
          max-height: 0;
          opacity: 0;
          margin-top: 0;
          overflow: hidden;
          pointer-events: none;
        }

        /* Animation Keyframe Parameters */
        @keyframes pulseLive {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(225, 6, 0, 0.5);
          }
          50% {
            opacity: 0.4;
            box-shadow: 0 0 0 6px rgba(225, 6, 0, 0);
          }
        }

        /* Responsive Breakpoint Overrides */
        @media (max-width: 1024px) {
          .sidebar-main {
            transform: translateX(-100%);
            transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .sidebar-main.open {
            transform: translateX(0);
          }
          .sidebar-spacer {
            display: none !important;
          }
          .sidebar-mobile-toggle, .sidebar-mobile-overlay {
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function DriversIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ConstructorsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function ResultsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

function SeasonsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function CircuitsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function StatsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function MomentsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
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
        width: '100%',
        height: '35px',
        borderRadius: '6px',
        background: '#12121A',
        border: '1px solid #1F1F27',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // Fixed key camelCase formatting
        color: '#71717A',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#E10600';
        e.currentTarget.style.color = '#FFFFFF';
        e.currentTarget.style.background = 'rgba(225, 6, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#1F1F27';
        e.currentTarget.style.color = '#71717A';
        e.currentTarget.style.background = '#12121A';
      }}
    >
      <Icon />
    </button>
  );
}