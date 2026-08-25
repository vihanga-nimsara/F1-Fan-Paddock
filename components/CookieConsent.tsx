"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Dialog, DialogContent, Button } from "@mui/material";

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
    <Dialog
      open={visible}
      onClose={accept}
      maxWidth="xs"
      fullWidth
      aria-label="Cookie consent"
      slotProps={{
        paper: {
          sx: {
            position: "fixed",
            bottom: 16,
            top: "auto",
            left: "auto",
            right: 16,
            m: 0,
            maxWidth: 420,
            borderRadius: "12px",
            p: 1,
            fontFamily: "var(--font-body)",
          },
        },
      }}
    >
      <DialogContent sx={{ fontFamily: "var(--font-body)" }}>
        <div className="flex flex-col gap-3">
          <h2 className="m-0 font-display text-base font-semibold tracking-[0.04em] text-pebble">
            We value your privacy
          </h2>
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
            <Button
              variant="contained"
              fullWidth
              disableElevation
              onClick={accept}
            >
              Accept All
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={decline}
              sx={{ borderColor: "rgba(20,20,28,0.2)", color: "#16161d" }}
            >
              Decline
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
