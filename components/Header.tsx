'use client';

import { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  badgeText: string | null;
  isLive: boolean;
}

export default function Header({ badgeText, isLive }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="wordmark">
            TF<span>B</span>
          </Link>

          <div className={`nav-overlay ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
          <nav className={`main-nav ${open ? 'open' : ''}`} aria-label="Primary">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/dashboard" onClick={() => setOpen(false)}>
              Live Dashboard
            </Link>
            <Link href="/standings" onClick={() => setOpen(false)}>
              Standings
            </Link>
            <Link href="/articles" onClick={() => setOpen(false)}>
              Articles
            </Link>
          </nav>

          <div className="header-right">
            {badgeText && (
              <span className="live-badge">
                <span className="live-dot" style={!isLive ? { animation: 'none', opacity: 0.5 } : undefined} />
                {isLive ? 'LIVE · ' : ''}
                {badgeText}
              </span>
            )}
            <button
              className="nav-toggle"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? (
                  <>
                    <line x1="5" y1="5" x2="19" y2="19" />
                    <line x1="19" y1="5" x2="5" y2="19" />
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
          </div>
        </div>
      </header>
    </>
  );
}