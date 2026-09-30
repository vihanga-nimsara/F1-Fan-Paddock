import { Container } from "@/components/f1kit";
import PageHeader from "@/components/PageHeader";
import FaqAccordion from "@/components/FaqAccordion";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  path: "/faq",
  description:
    "Quick answers for new fans — how live timings work, where standings come from, and how to publish on F1 Paddock SL.",
});

export default function FaqPage() {
  return (
    <main className="w-full">
      <Container className="flex flex-col gap-10 py-10">
        <PageHeader
          title="Frequently Asked Questions"
          accent=""
          description="Quick answers for new fans. Still stuck? Reach the paddock on socials."
        />
        <FaqAccordion />
      </Container>
    </main>
  );
}
