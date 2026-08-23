"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let consented = true;
    try {
      consented = localStorage.getItem("f1-cookie-consent") !== null;
    } catch {}
    if (!consented) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem("f1-cookie-consent", "accepted");
    } catch {}
    setVisible(false);
  };

  const decline = () => {
    try {
      localStorage.setItem("f1-cookie-consent", "declined");
    } catch {}
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-md rounded-[2px] border border-pebble-20 bg-carbon-deep/95 p-5 shadow-[0_20px_60px_rgb(0_0_0/0.5)] backdrop-blur-md"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-f1red-15 text-f1red">
                <Cookie size={18} />
              </span>
              <h2 className="m-0 font-display text-base font-semibold tracking-[0.04em] text-pebble">
                We value your privacy
              </h2>
            </div>
            <p className="m-0 text-xs leading-relaxed text-pebble-80">
              We use cookies to improve your experience on F1 Fan Paddock and
              analyze site traffic. You can read more in our{" "}
              <Link
                href="/privacy"
                className="font-medium text-f1red underline-offset-2 hover:underline"
                onClick={accept}
              >
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={accept}
                className="flex-1 cursor-pointer rounded-[2px] border-none bg-f1red px-4 py-2.5 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={decline}
                className="flex-1 cursor-pointer rounded-[2px] border border-pebble-20 bg-transparent px-4 py-2.5 font-body text-sm font-semibold text-pebble-80 transition-colors hover:bg-pebble-10 hover:text-pebble"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}