"use client";

import Link from "next/link";
import { Button, type ButtonProps } from "@mui/material";

type F1ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  size?: ButtonProps["size"];
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "size" | "translate" | "slot">;

const YOUTUBE_STYLES: Record<string, Record<string, any>> = {
  primary: {
    bgcolor: "#cc0000",
    color: "#fff",
    ":hover": { bgcolor: "#b30000" },
  },
  secondary: {
    bgcolor: "#272727",
    color: "#f1f1f1",
    ":hover": { bgcolor: "#3d3d3d" },
  },
  ghost: {
    bgcolor: "transparent",
    color: "#f1f1f1",
    ":hover": { bgcolor: "#272727" },
  },
};

export default function F1Button({
  variant = "primary",
  className = "",
  children,
  href,
  external,
  size = "medium",
  type,
  ...rest
}: F1ButtonProps) {
  const commonProps = {
    disableElevation: true,
    size,
    className,
    sx: {
      textTransform: "none",
      fontWeight: 600,
      borderRadius: "3px",
      px: 2.5,
      ...YOUTUBE_STYLES[variant],
    },
    ...rest,
  } as any;

  if (href) {
    if (external || href.startsWith("http")) {
      return (
        <Button component="a" href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
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
