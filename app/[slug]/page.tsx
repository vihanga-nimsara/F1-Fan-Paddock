import { Container, SectionHeading, MediaFallback } from "@/components/f1kit";
import { Flag } from "lucide-react";

export const metadata = {
  title: "F1 Paddock SL",
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
        <div className="flex flex-col items-center gap-4 rounded-xl bg-pebble-5 p-12 text-center">
          <div className="h-40 w-full max-w-md overflow-hidden rounded-xl">
            <MediaFallback
              sublabel="F1 Paddock SL"
              label={
                <Flag
                  className="h-16 w-16 text-pebble/60"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
              }
            />
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
