"use client";

import { Button } from "@base-ui/react/button";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-[2px] font-display text-[12px] font-semibold tracking-[0.06em] transition-[transform,opacity,background,color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-f1red focus-visible:ring-offset-2 focus-visible:ring-offset-carbon disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-f1red px-5 py-2.5 text-white hover:opacity-90",
  secondary:
    "border border-pebble-40 px-5 py-2.5 text-pebble hover:border-pebble",
  ghost: "px-4 py-2 text-pebble hover:text-f1red",
};

type F1ButtonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  href?: string;
  external?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function F1Button({
  variant = "primary",
  className = "",
  children,
  href,
  external,
  ...rest
}: F1ButtonProps) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;

  if (href) {
    if (external || href.startsWith("http")) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <Button className={cls} type={rest.type ?? "button"} {...rest}>
      {children}
    </Button>
  );
}
