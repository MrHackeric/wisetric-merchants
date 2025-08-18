import { createTheme } from "@mui/material/styles";

export const ORANGE = "#f7a31a";
export const NAVY = "#1e2642";

const theme = createTheme({
  typography: {
    fontFamily: '"Ubuntu", sans-serif',
    // Customize specific variants
    h1: {
      fontWeight: 900,
      letterSpacing: -0.5,
    },
    h2: {
      fontWeight: 800,
      letterSpacing: -0.25,
    },
    h3: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      letterSpacing: 0.5,
    },
  },
  palette: {
    mode: "dark",
    primary: { main: ORANGE },
    background: {
      default: "transparent",
      paper: "rgba(255,255,255,0.06)",
    },
    text: { primary: "#ffffff", secondary: "#cbd5e1" },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(8px)",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { 
          textTransform: "none", 
          fontWeight: 700, 
          borderRadius: 9999,
          fontFamily: '"Ubuntu", sans-serif',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { 
          fontWeight: 700,
          fontFamily: '"Ubuntu", sans-serif',
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        fontFamily: '"Ubuntu", sans-serif',
      },
    },
  },
});

export default theme;