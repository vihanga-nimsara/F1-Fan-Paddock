"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ADSENSE_CLIENT } from "@/lib/site";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Props = {
  /** Ad unit id from AdSense. When missing the component renders nothing. */
  slot: string | undefined;
  /** "auto" for in-feed, "vertical" for sidebar/skyscraper units. */
  format?: "auto" | "vertical";
  className?: string;
  /** Accessible label — the slot itself is decorative ad content. */
  label?: string;
};

/**
 * Renders a single AdSense unit. Pushes to the adsbygoogle queue in an effect
 * because the loader script is `afterInteractive`, so it is not guaranteed to
 * be on window by the time the DOM mounts.
 */
export default function AdSlot({
  slot,
  format = "auto",
  className,
  label = "Advertisement",
}: Props) {
  const pushed = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slot || pushed.current) return;
    // The loader may still be in flight; poll briefly rather than dropping the
    // ad. window.adsbygoogle exists as soon as the loader script starts.
    let tries = 0;
    const push = () => {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushed.current = true;
    };
    const id = setInterval(() => {
      tries += 1;
      if (window.adsbygoogle) {
        clearInterval(id);
        push();
      } else if (tries > 20) {
        clearInterval(id);
      }
    }, 100);
    return () => clearInterval(id);
  }, [slot]);

  if (!slot) return null;

  return (
    <div
      ref={ref}
      aria-label={label}
      role="complementary"
      className={cn("w-full overflow-hidden", className)}
    >
      <ins
        className="adsbygoogle block w-full"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={format === "auto" ? "true" : "false"}
      />
    </div>
  );
}
