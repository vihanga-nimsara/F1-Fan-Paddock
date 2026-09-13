"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { useThemeMode } from "@/components/theme-provider";
import { createAppTheme } from "@/lib/mui/theme";

export default function MuiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolved } = useThemeMode();

  return (
    <AppRouterCacheProvider options={{ key: "paddock" }}>
      <ThemeProvider theme={createAppTheme(resolved)}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}