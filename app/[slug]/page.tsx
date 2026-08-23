import { Container, SectionHeading, MediaFallback } from "@/components/f1kit";

export const metadata = {
  title: "F1 Fan Paddock",
};

export default async function PlaceholderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-10 py-8">
        <SectionHeading kicker="Coming Soon" title={title} linkLabel="" />
        <div className="flex flex-col items-center gap-4 rounded-[2px] bg-pebble-5 p-12 text-center">
          <div className="h-40 w-full max-w-md overflow-hidden rounded-[2px]">
            <MediaFallback sublabel="F1 Fan Paddock" label="🏁" />
          </div>
          <p className="m-0 max-w-[50ch] font-body text-sm text-pebble-80">
            This section is under construction. Check back soon for more from the
            paddock.
          </p>
        </div>
      </Container>
    </main>
  );
}
