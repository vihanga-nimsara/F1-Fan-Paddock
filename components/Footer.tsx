'use client';

import Link from 'next/link';
import NextImage from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Top bar with red accent */}
        <div className="footer-accent" />

        {/* Main grid */}
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <NextImage
                src="/F1-Fan-Paddock.png"
                alt="F1 Fan Paddock"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left' }}
                priority
              />
            </div>
            <p className="footer-tag">
              Independent Formula 1 stats and analysis. Live timing via OpenF1, historical records via Jolpica.
            </p>
            <div className="footer-disclaimer">
              <span className="disclaimer-dot" />
              Not affiliated with Formula 1, FOM, or the FIA
            </div>
          </div>

          {/* Navigation columns */}
          <div className="footer-nav-col">
            <h4 className="footer-nav-title">Explore</h4>
            <nav className="footer-nav-links">
              <Link href="/" className="footer-link">Home</Link>
              <Link href="/dashboard" className="footer-link">Live Dashboard</Link>
              <Link href="/standings?tab=drivers" className="footer-link">Driver Standings</Link>
              <Link href="/standings?tab=constructors" className="footer-link">Constructor Standings</Link>
              <Link href="/trends" className="footer-link">Trends</Link>
              <Link href="/articles" className="footer-link">Articles</Link>
            </nav>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-nav-title">Data Sources</h4>
            <nav className="footer-nav-links">
              <a href="https://openf1.org" target="_blank" rel="noreferrer" className="footer-link footer-link-external">
                OpenF1
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
              <a href="https://github.com/jolpica/jolpica-f1" target="_blank" rel="noreferrer" className="footer-link footer-link-external">
                Jolpica
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
              <a href="https://www.formula1.com" target="_blank" rel="noreferrer" className="footer-link footer-link-external">
                Formula1.com
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </nav>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-nav-title">Connect</h4>
            <div className="footer-social">
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="footer-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.73c0 .27.16.58.67.5C19.14 20.16 22 16.42 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="footer-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" aria-label="Discord" className="footer-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.293a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span className="footer-copyright">© {currentYear} TFB — The F1 Bulletin</span>
            <span className="footer-separator">·</span>
            <span className="footer-credit">
              Design & Build by{' '}
              <a href="https://vihangaart.space" target="_blank" rel="noopener noreferrer" className="footer-credit-link">
                Vihanga
              </a>
            </span>
          </div>
          <div className="footer-bottom-right">
            <span className="footer-engine">Data Feeds: OpenF1 (Live) · Jolpica Engine (Historical)</span>
            <span className="footer-badge">
              <span className="badge-dot" />
              PRODUCED UNDER RACING CONDITIONS
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--surface);
          border-top: 1px solid var(--line);
          position: relative;
          margin-top: auto;
        }

        .footer-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--f1-red) 0%, transparent 60%);
        }

        .footer-inner {
          max-width: 1360px;
          margin: 0 auto;
          padding: 48px clamp(20px, 4vw, 48px) 32px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 40px;
        }

        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }

        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        /* Brand column */
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-logo {
          width: 140px;
          height: 48px;
          position: relative;
          flex-shrink: 0;
        }

        .footer-tag {
          font-size: 13px;
          line-height: 1.6;
          color: var(--muted);
          margin: 0;
          max-width: 320px;
        }

        .footer-disclaimer {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-dim);
          letter-spacing: 0.3px;
        }

        .disclaimer-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--f1-red);
          opacity: 0.6;
        }

        /* Nav columns */
        .footer-nav-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-nav-title {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted-dim);
          margin: 0;
        }

        .footer-nav-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-link {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s ease, padding-left 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          width: fit-content;
        }

        .footer-link:hover {
          color: var(--f1-red);
          padding-left: 4px;
        }

        .footer-link-external svg {
          opacity: 0.5;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .footer-link-external:hover svg {
          opacity: 1;
          transform: translate(1px, -1px);
        }

        /* Social */
        .footer-social {
          display: flex;
          gap: 10px;
        }

        .footer-social-link {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface-raised);
          border: 1px solid var(--line);
          color: var(--muted-dim);
          transition: all 0.2s ease;
        }

        .footer-social-link:hover {
          background: var(--f1-red-dim);
          border-color: var(--f1-red-glow);
          color: var(--f1-red);
          transform: translateY(-2px);
        }

        /* Divider */
        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, var(--line) 0%, transparent 100%);
          margin-bottom: 24px;
        }

        /* Bottom bar */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        @media (max-width: 700px) {
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        .footer-bottom-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .footer-copyright {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--muted-dim);
          font-weight: 700;
        }

        .footer-separator {
          color: var(--line);
          font-weight: 700;
        }

        .footer-credit {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--muted-dim);
          font-weight: 700;
        }

        .footer-credit-link {
          color: var(--text-secondary);
          text-decoration: none;
          border-bottom: 1px dashed var(--line);
          transition: all 0.2s ease;
          font-weight: 800;
        }

        .footer-credit-link:hover {
          color: var(--f1-red);
          border-bottom-color: var(--f1-red);
        }

        .footer-bottom-right {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .footer-engine {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-dim);
          letter-spacing: 0.3px;
        }

        .footer-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--f1-red);
          background: var(--f1-red-dim);
          border: 1px solid var(--f1-red-glow);
          padding: 5px 12px;
          border-radius: 4px;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--f1-red);
          animation: pulseLive 1.8s ease-in-out infinite;
        }

        @keyframes pulseLive {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(225, 6, 0, 0.5);
          }
          50% {
            opacity: 0.6;
            box-shadow: 0 0 0 4px rgba(225, 6, 0, 0);
          }
        }
      `}</style>
    </footer>
  );
}