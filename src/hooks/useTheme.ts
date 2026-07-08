"use client";

import { createContext, useContext } from "react";
import { Theme, ExportFormat } from "@/types/theme";
import { themes } from "@/data/themes";

export interface ThemeContextType {
  activeTheme: Theme;
  setActiveTheme: (theme: Theme) => void;
  customColors: Record<string, string> | null;
  setCustomColors: (colors: Record<string, string> | null) => void;
  isCustom: boolean;
  resetCustom: () => void;
  gradientMode: "solid" | "linear" | "radial" | "animated";
  setGradientMode: (mode: "solid" | "linear" | "radial" | "animated") => void;
  exportTheme: (format: ExportFormat) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  activeTheme: themes[0],
  setActiveTheme: () => {},
  customColors: null,
  setCustomColors: () => {},
  isCustom: false,
  resetCustom: () => {},
  gradientMode: "solid",
  setGradientMode: () => {},
  exportTheme: () => {},
});

export const useActiveTheme = () => useContext(ThemeContext);
