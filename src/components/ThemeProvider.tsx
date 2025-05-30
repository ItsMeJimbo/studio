"use client";

import { useEffect, type ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    // Apply theme on initial client-side load
    if (typeof window !== "undefined") {
        applyTheme(mediaQuery.matches);
    }

    const handleChange = (e: MediaQueryListEvent) => {
      applyTheme(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return <>{children}</>;
}
