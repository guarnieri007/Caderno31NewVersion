import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";

import { themes, ThemeCollection, ThemeMode } from "../themes/registry";
import { defaultDarkTheme } from "../themes/default_dark_theme";

type ThemeVariant = string;

type ThemeContextValue = {
  themes: ThemeCollection;
  mode: ThemeMode;
  variant: ThemeVariant;

  setMode: (mode: ThemeMode) => void;
  setVariant: (variant: ThemeVariant) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const fallbackTheme = themes.default?.dark ?? Object.values(themes)[0]?.dark ?? Object.values(themes)[0]?.light ?? defaultDarkTheme;

  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("theme_mode");
    return saved === "light" || saved === "dark" ? saved : "dark";
  });

  const [variant, setVariant] = useState<ThemeVariant>(() => {
    const saved = localStorage.getItem("theme_variant");
    return saved || "default";
  });

  useEffect(() => {
    localStorage.setItem("theme_mode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("theme_variant", String(variant));
  }, [variant]);

  const theme = useMemo(() => {

    // fallback absoluto
    if (!themes || Object.keys(themes).length === 0) {
      console.error("Theme registry is empty");
      return fallbackTheme;
    }

    const variantThemes = themes[variant];

    if (!variantThemes) {
      console.warn("Theme variant not found:", variant);
      return themes.default?.[mode] ?? fallbackTheme;
    }

    const resolvedTheme = variantThemes[mode];

    if (!resolvedTheme) {
      console.warn("Theme mode not found:", variant, mode);
      return fallbackTheme;
    }

    return resolvedTheme;

  }, [fallbackTheme, mode, variant]);

  const toggleMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const value = useMemo(
    () => ({
      themes,
      mode,
      variant,
      setMode,
      setVariant,
      toggleMode
    }),
    [mode, variant]
  );

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
