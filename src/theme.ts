import {
  createTheme,
  responsiveFontSizes,
  type Theme,
} from "@mui/material/styles";
import { type PaletteMode } from "@mui/material";
//import { deepmerge } from '@mui/utils'

declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"];
  }
  interface PaletteOptions {
    accent?: PaletteOptions["primary"];
  }
}

const getDesignTokens = (mode: PaletteMode) => {
  const isDark = mode === "dark";

  const accentMain = "#fcd34d";

  return {
    palette: {
      mode,
      primary: {
        main: isDark ? "#90caf9" : "#1976d2",
      },
      secondary: {
        main: isDark ? "#f48fb1" : "#9c27b0",
      },
      accent: {
        main: accentMain,
        contrastText: "#000",
      },
      background: {
        default: isDark ? "#121212" : "#fafafa",
        paper: isDark ? "#1e1e1e" : "#fff",
      },
      text: {
        primary: isDark ? "#fff" : "#000",
      },
    },
    typography: {
      h1: {
        fontWeight: 700,
        fontFamily: "'Roboto Slab', serif",
      },
      h2: {
        fontWeight: 700,
        fontFamily: "'Roboto', serif",
      },
      h3: {
        fontWeight: 700,
        fontFamily: "'montserrat', sans-serif",
      },
      body1: {
        lineHeight: 1.7,
      },
      body2: {
        lineHeight: 1.6,
      },
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            color: "inherit",
            textDecoration: "none",
            transition: "color 0.3s ease",
            "&:hover": {
              color: accentMain,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: "color 0.3s ease",
            "&:hover": {
              color: accentMain,
            },
            // for SVG icons inside the button
            "& svg": {
              transition: "color 0.3s ease",
            },
            "&:hover svg": {
              color: accentMain,
            },
            "&:focus-visible": {
              outline: "none",
              boxShadow: `0 0 0 2px ${accentMain}40`,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            "&:focus": {
              outline: "none !important",
            },
            "&:focus-visible": {
              outline: "none !important",
            },
            "&.Mui-focusVisible": {
              outline: "none !important",
            },
          },
        },
      },
    },
  };
};

export const createAppTheme = (mode: PaletteMode): Theme =>
  responsiveFontSizes(createTheme(getDesignTokens(mode)));

export const lightTheme = createAppTheme("light");
export const darkTheme = createAppTheme("dark");
