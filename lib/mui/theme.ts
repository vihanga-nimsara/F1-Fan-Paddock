import { createTheme, type Theme } from "@mui/material/styles";

const LIGHT = {
  bg: "#ffffff",
  elevated: "#f5f5f4",
  menu: "#ffffff",
  hover: "#f4f4f5",
  border: "#e4e4e7",
  text: "#18181b",
  textDim: "#71717a",
  red: "#e10600",
  redDark: "#b30500",
};

const DARK = {
  bg: "#111111",
  elevated: "#1d1d1d",
  menu: "#232323",
  hover: "#262626",
  search: "#161616",
  border: "#2e2e2e",
  text: "#fafafa",
  textDim: "#a3a3aa",
  red: "#ff1e00",
  redDark: "#e10600",
};

export function createAppTheme(mode: "light" | "dark"): Theme {
  const C = mode === "light" ? LIGHT : DARK;

  return createTheme({
    palette: {
      mode,
      primary: { main: C.red, dark: C.redDark, light: C.red },
      secondary: { main: C.redDark },
      background: { default: C.bg, paper: mode === "light" ? "#fcfcfc" : C.elevated },
      text: { primary: C.text, secondary: C.textDim },
      divider: C.border,
    },
    shape: { borderRadius: 6 },
    typography: {
      fontFamily: 'var(--font-pjs), "Plus Jakarta Sans", sans-serif',
      h1: { fontWeight: 700, letterSpacing: "-0.02em" },
      h2: { fontWeight: 700, letterSpacing: "-0.02em" },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { backgroundColor: C.bg },
          a: { color: "inherit", textDecoration: "none" },
        },
      },
      MuiIconButton: {
        defaultProps: { disableRipple: true },
        styleOverrides: {
          root: {
            color: C.text,
            transition: "background-color 0.15s ease",
            "&:hover": { backgroundColor: C.hover },
          },
        },
      },
      MuiButton: {
        defaultProps: { color: "inherit", disableElevation: true, disableRipple: true },
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "10px",
            color: C.text,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            border: `1px solid ${C.border}`,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: C.bg,
            backgroundImage: "none",
            color: C.text,
            boxShadow: "none",
            borderBottom: `1px solid ${C.border}`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: C.bg,
            backgroundImage: "none",
            borderRight: `1px solid ${C.border}`,
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: C.menu,
            backgroundImage: "none",
            borderRadius: "12px",
            boxShadow: `0 12px 30px ${mode === "dark" ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.12)"}`,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: C.elevated,
            backgroundImage: "none",
            borderRadius: "12px",
            boxShadow: `0 20px 48px ${mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.18)"}`,
          },
        },
      },
      MuiListItemButton: {
        defaultProps: { disableRipple: true },
        styleOverrides: {
          root: {
            borderRadius: "8px",
            transition: "background-color 0.15s ease",
            "&:hover": { backgroundColor: C.hover },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: C.hover,
            color: C.text,
            fontWeight: 500,
            transition: "background-color 0.15s ease",
            "&:hover": { backgroundColor: mode === "light" ? "#e4e4e7" : "#3d3d3d" },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: { backgroundColor: C.red, color: "#fff", fontWeight: 700 },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            border: `1px solid ${C.border}`,
            borderRadius: "8px",
          },
        },
      },
    },
  });
}

export default createAppTheme("light");