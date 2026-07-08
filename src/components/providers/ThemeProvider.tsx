"use client";

import { useState, useCallback, useEffect, ReactNode } from "react";
import { Theme, ExportFormat } from "@/types/theme";
import { themes } from "@/data/themes";
import { generateExport } from "@/lib/theme-utils";
import { ThemeContext } from "@/hooks/useTheme";

function isLightColor(hex: string): boolean {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return true;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<Theme>(themes[0]);
  const [customColors, setCustomColors] = useState<Record<string, string> | null>(null);
  const [gradientMode, setGradientMode] = useState<"solid" | "linear" | "radial" | "animated">("solid");

  const isCustom = customColors !== null;

  const resetCustom = useCallback(() => {
    setCustomColors(null);
  }, []);

  const applyTheme = useCallback((theme: Theme, custom?: Record<string, string> | null) => {
    const colors = custom || theme.colors;
    const root = document.documentElement;

    const light = isLightColor(colors.background);
    const textColor = light ? "#0B0F19" : "#F1F5F9";

    // Theme-specific variables (for components to reference)
    root.style.setProperty("--theme-primary", colors.primary);
    root.style.setProperty("--theme-secondary", colors.secondary);
    root.style.setProperty("--theme-accent", colors.accent);
    root.style.setProperty("--theme-background", colors.background);
    root.style.setProperty("--theme-surface", colors.surface);
    root.style.setProperty("--theme-card", colors.card);
    root.style.setProperty("--theme-border", colors.border);
    root.style.setProperty("--theme-text", colors.text);
    root.style.setProperty("--theme-success", colors.success);
    root.style.setProperty("--theme-warning", colors.warning);
    root.style.setProperty("--theme-error", colors.error);
    root.style.setProperty("--theme-info", colors.info);
    root.style.setProperty("--theme-hover", colors.hover);
    root.style.setProperty("--theme-disabled", colors.disabled);

    // shadcn/ui variables — these control the actual page chrome
    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--foreground", colors.text);
    root.style.setProperty("--card", colors.card);
    root.style.setProperty("--card-foreground", colors.text);
    root.style.setProperty("--popover", colors.card);
    root.style.setProperty("--popover-foreground", colors.text);
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--primary-foreground", light ? "#FFFFFF" : "#FFFFFF");
    root.style.setProperty("--secondary", colors.surface);
    root.style.setProperty("--secondary-foreground", colors.text);
    root.style.setProperty("--muted", colors.surface);
    root.style.setProperty("--muted-foreground", light ? "#64748B" : "#94A3B8");
    root.style.setProperty("--accent", colors.surface);
    root.style.setProperty("--accent-foreground", colors.text);
    root.style.setProperty("--destructive", colors.error);
    root.style.setProperty("--border", colors.border);
    root.style.setProperty("--input", colors.border);
    root.style.setProperty("--ring", colors.primary);
    root.style.setProperty("--radius", "0.625rem");
    root.style.setProperty("--primary-rgb", theme.rgb.primary);
  }, []);

  useEffect(() => {
    applyTheme(activeTheme, customColors);
  }, [activeTheme, customColors, applyTheme]);

  const handleSetActiveTheme = useCallback((theme: Theme) => {
    setActiveTheme(theme);
    setCustomColors(null);
  }, []);

  const exportTheme = useCallback(
    (format: ExportFormat) => {
      const code = generateExport(activeTheme, format);
      const blob = new Blob([code], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${activeTheme.slug}-${format}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    },
    [activeTheme]
  );

  return (
    <ThemeContext.Provider
      value={{
        activeTheme,
        setActiveTheme: handleSetActiveTheme,
        customColors,
        setCustomColors,
        isCustom,
        resetCustom,
        gradientMode,
        setGradientMode,
        exportTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
