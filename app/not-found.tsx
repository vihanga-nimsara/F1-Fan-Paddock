import Link from "next/link";
import { Container, Kicker } from "@/components/f1kit";
import F1Button from "@/components/ui/F1Button";

export const metadata = {
  title: "Page Not Found — F1 Fan Paddock",
};

export default function NotFound() {
  return (
    <main className="relative w-full">
      <Container className="flex flex-col items-center gap-6 py-24 text-center md:py-32">
        <Kicker>Error</Kicker>
        <h1 className="m-0 font-headline text-[clamp(96px,20vw,220px)] font-semibold leading-[0.8] tracking-[0.01em] text-f1red">
          404
        </h1>
        <h2 className="m-0 max-w-[18ch] font-headline text-[clamp(24px,4vw,44px)] font-semibold leading-[0.95] tracking-[0.01em] text-pebble">
          Page Not Found
        </h2>
        <p className="m-0 max-w-[480px] font-body text-base leading-relaxed text-pebble-80">
          The page you were looking for didn't make it out of the pit lane.
          Check the URL or head back to the start.
        </p>
        <F1Button href="/">Back to the grid →</F1Button>
      </Container>
    </main>
  );
}
