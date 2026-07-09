// app/layout.tsx
import type { Metadata } from 'next';

// Self-hosted fonts
import '@fontsource/titillium-web/400.css';
import '@fontsource/titillium-web/600.css';
import '@fontsource/titillium-web/700.css';
import '@fontsource/titillium-web/900.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/600.css';
import '@fontsource/jetbrains-mono/700.css';

import './globals.css';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { getLatestSession, getMeeting, isSessionLive } from '@/lib/openf1';

export const metadata: Metadata = {
  title: 'F1 Fan Paddock',
  description:
    'Live sessions, championship standings, and race analysis, built on OpenF1 and historical Jolpica data.',
  other: {
    'format-detection': 'telephone=no, date=no, address=no, email=no',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getLatestSession();
  const meeting = session ? await getMeeting(session.meeting_key) : null;
  const live = isSessionLive(session);

  const badge =
    session && meeting
      ? `${meeting.circuit_short_name?.toUpperCase() ?? meeting.location.toUpperCase()} · ${session.session_name.toUpperCase()}`
      : null;

  return (
    <html lang="en">
      <body style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0B0C10' }}>
        <Sidebar badgeText={badge} isLive={live} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}