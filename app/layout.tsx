import type { Metadata } from 'next';

// Self-hosted fonts (no runtime dependency on Google Fonts).
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
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLatestSession, getMeeting, isSessionLive } from '@/lib/openf1';

export const metadata: Metadata = {
  title: 'TFB — The F1 Bulletin',
  description:
    'Live sessions, championship standings, and race analysis, built on OpenF1 and historical Jolpica data.',
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
      <body>
        <Header badgeText={badge} isLive={live} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}