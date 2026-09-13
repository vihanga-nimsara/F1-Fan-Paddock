"use client";

import { useThemeMode } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeMode();

  return (
    <ThemeSwitcher
      value={theme}
      onChange={(next) => setTheme(next)}
      aria-label="Toggle colour theme"
      className="h-8"
    />
  );
}