import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#e10600" },
    secondary: { main: "#16161d" },
    background: { default: "#f5f5f7", paper: "#ffffff" },
  },
  typography: {
    fontFamily: 'var(--font-inter), "Inter", sans-serif',
  },
  shape: { borderRadius: 12 },
});

export default theme;
