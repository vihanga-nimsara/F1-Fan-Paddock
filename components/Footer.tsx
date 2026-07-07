import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div>
          <div className="wordmark" style={{ fontSize: 20 }}>
            TF<span>B</span>
          </div>
          <p className="footer-tag">
            Independent Formula 1 stats and analysis. Live timing via OpenF1, historical records via Jolpica —
            not affiliated with Formula 1, FOM, or the FIA.
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Live Dashboard</Link>
          <Link href="/standings">Standings</Link>
          <Link href="/articles">Articles</Link>
        </nav>

        <div className="footer-social">
          <a href="https://openf1.org" target="_blank" rel="noreferrer" aria-label="OpenF1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9z" />
            </svg>
          </a>
          <a href="https://github.com/jolpica/jolpica-f1" target="_blank" rel="noreferrer" aria-label="Jolpica">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.92.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
            </svg>
          </a>
        </div>

        <div className="copyright">
          <span>© {new Date().getFullYear()} TFB — The F1 Bulletin</span>
          <span>Data: OpenF1 (live) · Jolpica (historical)</span>
        </div>
      </div>
    </footer>
  );
}