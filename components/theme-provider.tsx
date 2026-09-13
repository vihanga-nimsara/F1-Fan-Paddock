"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

type ThemeProviderState = {
  theme: Theme;
  resolved: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const STORAGE_KEY = "paddock-theme";

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined,
);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
  root.dataset.theme = resolved;
}

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    /* noop */
  }
  return "system";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<ResolvedTheme>("light");

  useEffect(() => {
    const stored = readStoredTheme();
    setThemeState(stored);
    const initial = stored === "system" ? getSystemTheme() : stored;
    setResolved(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (theme === "system") {
        const next = getSystemTheme();
        setResolved(next);
        applyTheme(next);
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* noop */
    }
    setThemeState(next);
    const nextResolved: ResolvedTheme =
      next === "system" ? getSystemTheme() : next;
    setResolved(nextResolved);
    applyTheme(nextResolved);
  }, []);

  const value = useMemo(
    () => ({ theme, resolved, setTheme }),
    [theme, resolved, setTheme],
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }
  return context;
}