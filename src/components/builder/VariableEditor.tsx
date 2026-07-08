"use client";

import { useActiveTheme } from "@/hooks/useTheme";
import { ColorPicker } from "./ColorPicker";

export function VariableEditor() {
  const { activeTheme, customColors, setCustomColors, resetCustom, isCustom } = useActiveTheme();

  const colors = customColors || activeTheme.colors;

  const updateColor = (key: string, value: string) => {
    const base = customColors || { ...activeTheme.colors };
    setCustomColors({ ...base, [key]: value });
  };

  const colorKeys = [
    { key: "primary", label: "Primary" },
    { key: "secondary", label: "Secondary" },
    { key: "accent", label: "Accent" },
    { key: "background", label: "Background" },
    { key: "surface", label: "Surface" },
    { key: "card", label: "Card" },
    { key: "border", label: "Border" },
    { key: "text", label: "Text" },
    { key: "success", label: "Success" },
    { key: "warning", label: "Warning" },
    { key: "error", label: "Error" },
    { key: "info", label: "Info" },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-muted-foreground">Color Variables</h3>
        {isCustom && (
          <button
            onClick={resetCustom}
            className="text-[10px] text-muted-foreground hover:text-foreground underline"
          >
            Reset
          </button>
        )}
      </div>
      <div className="space-y-1.5">
        {colorKeys.map(({ key, label }) => (
          <ColorPicker
            key={key}
            label={label}
            value={(colors as unknown as Record<string, string>)[key]}
            onChange={(v) => updateColor(key, v)}
          />
        ))}
      </div>
    </div>
  );
}
