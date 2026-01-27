import {type ReactNode, useEffect, useMemo, useState} from "react";
import {ThemeProvider, CssBaseline} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {ColourModeContext, type ColourMode, type ColourModeContextValue} from "../hooks/useColourMode.ts";


interface ThemeModeProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "colour-mode";


export const ThemeModeProvider = ({children}: ThemeModeProviderProps) => {
  const [mode, setMode] = useState<ColourMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ColourMode | null;
    if (stored === "light" || stored === "dark") return stored;

    return (
      window.matchMedia("(prefers-colour-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  });


  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {main: "#22b573"},
          secondary: {main: "#7b1fa2"},
          tertiary: {main: "#2194f3"},
          ...(mode === "dark" && {
            primary: {main: "#1c784f"},
            secondary: {main: "#63277c"},
            tertiary: {main: "#1e70b5"},
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
          }),
        },
        typography: {
          fontFamily: '"Montserrat", "Work Sans", sans-serif',
          h1: {fontFamily: '"Nunito Sans", "Work Sans", sans-serif'},
          h2: {fontFamily: '"Nunito Sans", "Work Sans", sans-serif'},
          h3: {fontFamily: '"Nunito Sans", "Work Sans", sans-serif'},
          h4: {fontFamily: '"Nunito Sans", "Work Sans", sans-serif'},
          h5: {fontFamily: '"Nunito Sans", "Work Sans", sans-serif'},
          h6: {fontFamily: '"Nunito Sans", "Work Sans", sans-serif'},
          button: {fontFamily: '"Montserrat", "Work Sans", sans-serif'},
          body1: {fontFamily: '"Montserrat", "Work Sans", sans-serif'},
          body2: {fontFamily: '"Montserrat", "Work Sans", sans-serif'},
        },
      }),
    [mode]
  );

  const value = useMemo<ColourModeContextValue>(
    () => ({
      mode,
      toggleMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
      setMode,
    }),
    [mode]
  );

  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
      : '';
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  // Apply CSS variables based on theme
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--colour-primary', hexToRgb(theme.palette.primary.main));
    root.style.setProperty('--colour-secondary', hexToRgb(theme.palette.secondary.main));
    root.style.setProperty('--colour-tertiary', hexToRgb(theme.palette.tertiary.main));
  }, [theme]);

  return (
    <ColourModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {children}
      </ThemeProvider>
    </ColourModeContext.Provider>
  );
};
