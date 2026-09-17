import { getSeasonRaces } from "@/lib/f1";
import { Container, SectionHeading } from "@/components/f1kit";
import CalendarView from "@/components/CalendarView";

export const metadata = {
  title: "Calendar — F1 Paddock SL",
};

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const races = await getSeasonRaces("current");

  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-8 py-8">
        <SectionHeading kicker="2026" title="Race Calendar" linkLabel="" />
        <CalendarView races={races} />
      </Container>
    </main>
  );
}
