"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-reveal");

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("main section, main > *"),
    );

    // Keep only the innermost blocks so wrappers + their children don't double-animate.
    const visible = targets.filter((el) => {
      for (const other of targets) {
        if (other !== el && el.contains(other)) return false;
      }
      return true;
    });

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      visible.forEach((el) => {
        el.setAttribute("data-reveal", "");
        el.classList.add("is-visible");
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );

    visible.forEach((el, i) => {
      el.setAttribute("data-reveal", "");
      el.style.animationDelay = `${(i % 5) * 70}ms`;
      io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
