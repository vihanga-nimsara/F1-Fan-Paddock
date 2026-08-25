"use client";

import Link from "next/link";
import { Button } from "@mui/material";

type Variant = "primary" | "secondary" | "ghost";

const MUI_VARIANT: Record<Variant, "contained" | "outlined" | "text"> = {
  primary: "contained",
  secondary: "outlined",
  ghost: "text",
};

type F1ButtonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  href?: string;
  external?: boolean;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color" | "size" | "translate" | "slot"
>;

export default function F1Button({
  variant = "primary",
  className = "",
  children,
  href,
  external,
  type,
  ...rest
}: F1ButtonProps) {
  const sx = {
    fontFamily: "var(--font-display)",
    textTransform: "none",
    fontWeight: 600,
    letterSpacing: "0.06em",
    borderRadius: "12px",
    fontSize: "12px",
    ...(variant === "primary" && {
      bgcolor: "#e10600",
      color: "#ffffff",
      "&:hover": { bgcolor: "#b30500", opacity: 0.9 },
    }),
    ...(variant === "secondary" && {
      borderColor: "rgba(20,20,28,0.4)",
      color: "var(--color-pebble)",
      "&:hover": { borderColor: "var(--color-pebble)" },
    }),
    ...(variant === "ghost" && {
      color: "var(--color-pebble)",
      "&:hover": { color: "#e10600" },
    }),
  };

  const commonProps = {
    variant: MUI_VARIANT[variant],
    disableElevation: true,
    className,
    sx,
    ...rest,
  } as any;

  if (href) {
    if (external || href.startsWith("http")) {
      return (
        <Button
          component="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...commonProps}
        >
          {children}
        </Button>
      );
    }
    return (
      <Button component={Link} href={href} {...commonProps}>
        {children}
      </Button>
    );
  }

  return (
    <Button type={type ?? "button"} {...commonProps}>
      {children}
    </Button>
  );
}
