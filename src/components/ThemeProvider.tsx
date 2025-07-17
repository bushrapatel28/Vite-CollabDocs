import React, { createContext, useEffect, useState, ReactNode } from "react";
import {
  Theme,
  ThemeContextType,
  getStoredTheme,
  setStoredTheme,
  getSystemTheme,
  applyTheme,
  resolveTheme,
  ThemeContext,
} from "@/lib/theme";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return getStoredTheme() || defaultTheme;
  });

  const [actualTheme, setActualTheme] = useState<"light" | "dark">(() => {
    return resolveTheme(theme);
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    setStoredTheme(newTheme);
  };

  useEffect(() => {
    const resolved = resolveTheme(theme);
    setActualTheme(resolved);
    applyTheme(resolved);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (theme === "system") {
        const systemTheme = getSystemTheme();
        setActualTheme(systemTheme);
        applyTheme(systemTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    setTheme,
    actualTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}