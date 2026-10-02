import { getSeasonRaces } from "@/lib/f1";
import { Container, SectionHeading } from "@/components/f1kit";
import CalendarView from "@/components/CalendarView";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Calendar", path: "/calendar" });

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const races = await getSeasonRaces("current");

  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-8 py-8">
        <SectionHeading title="Race Calendar" />
        <CalendarView races={races} />
      </Container>
    </main>
  );
}
