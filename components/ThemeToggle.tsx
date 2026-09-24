"use client";

import { useThemeMode } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useThemeMode();

  return (
    <ThemeSwitcher
      value={theme}
      onChange={(next) => setTheme(next)}
      aria-label="Toggle colour theme"
      className={cn("h-8", className)}
    />
  );
}