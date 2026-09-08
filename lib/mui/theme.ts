import { createTheme } from "@mui/material/styles";

const YT = {
  bg: "#0f0f0f",
  elevated: "#212121",
  menu: "#282828",
  hover: "#272727",
  search: "#121212",
  border: "#303030",
  text: "#f1f1f1",
  textDim: "#aaaaaa",
  red: "#ff0000",
  redDark: "#cc0000",
  blue: "#3ea6ff",
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: YT.red, dark: YT.redDark },
    secondary: { main: YT.redDark },
    background: { default: YT.bg, paper: YT.bg },
    text: { primary: YT.text, secondary: YT.textDim },
    divider: YT.border,
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: 'var(--font-inter), "Geist", sans-serif',
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: YT.bg },
        a: { color: "inherit", textDecoration: "none" },
        "::selection": { backgroundColor: "#ffffff22" },
      },
    },
    MuiIconButton: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          color: YT.text,
          transition: "background-color 0.15s ease",
          "&:hover": { backgroundColor: YT.hover },
        },
      },
    },
    MuiButton: {
      defaultProps: { color: "inherit", disableElevation: true, disableRipple: true },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "18px",
          color: YT.text,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: YT.bg,
          backgroundImage: "none",
          color: YT.text,
          boxShadow: "none",
          borderBottom: `1px solid ${YT.border}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: YT.bg,
          backgroundImage: "none",
          borderRight: `1px solid ${YT.border}`,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: YT.menu,
          backgroundImage: "none",
          borderRadius: "12px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: YT.elevated,
          backgroundImage: "none",
          borderRadius: "12px",
          boxShadow: "0 20px 48px rgba(0,0,0,0.6)",
        },
      },
    },
    MuiListItemButton: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          borderRadius: "10px",
          transition: "background-color 0.15s ease",
          "&:hover": { backgroundColor: YT.hover },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#272727",
          color: YT.text,
          fontWeight: 500,
          transition: "background-color 0.15s ease",
          "&:hover": { backgroundColor: "#3d3d3d" },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { backgroundColor: YT.red, color: "#fff", fontWeight: 700 },
      },
    },
  },
});

export default theme;