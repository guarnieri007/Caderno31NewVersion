import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "../component/styles/darkTheme";
import { lightTheme } from "../component/styles/lightTheme";

type ThemeMode = "dark" | "light";

type ThemeContextValue = {
  mode: ThemeMode;
  theme: typeof darkTheme; // both themes should share the same shape
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Try to restore from localStorage; fallback to dark
    const saved = localStorage.getItem("theme_mode");
    return (saved === "light" || saved === "dark") ? saved : "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme_mode", mode);
  }, [mode]);

  const theme = useMemo(() => (mode === "dark" ? darkTheme : lightTheme), [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const value = useMemo(() => ({ mode, theme, setMode, toggleMode }), [mode, theme]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useAppTheme must be used inside AppThemeProvider");
  }
  return ctx;
}