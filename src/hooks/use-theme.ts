
// This file is intentionally left empty as the useTheme hook 
// is now defined directly within ThemeProvider.tsx to avoid circular dependencies
// and keep theme-related logic colocated.
// You can safely delete this file if it's not imported elsewhere,
// or keep it empty if your project structure prefers a placeholder.

// The useTheme hook is now:
/*
import { useContext } from "react";
import { ThemeContext, ThemeContextState } from "@/components/ThemeProvider"; // Adjust path if ThemeProvider moves

export const useTheme = (): ThemeContextState => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
*/
// Note: The actual implementation is now part of ThemeProvider.tsx
export {};
