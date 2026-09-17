import LiveDashboard from "@/components/LiveDashboard";
import { Container, SectionHeading, Pill } from "@/components/f1kit";

export const metadata = {
  title: "Live Dashboard — F1 Paddock SL",
};

export default function DashboardPage() {
  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-10 py-8">
        <div className="flex items-center gap-3">
          <Pill tone="accent">Live</Pill>
          <SectionHeading kicker="Timing" title="Live Dashboard" linkLabel="" />
        </div>
        <LiveDashboard />
      </Container>
    </main>
  );
}
