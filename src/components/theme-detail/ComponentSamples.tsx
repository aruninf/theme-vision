"use client";

import { useActiveTheme } from "@/hooks/useTheme";

export function ComponentSamples() {
  const { activeTheme } = useActiveTheme();
  const c = activeTheme.colors;

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Buttons */}
      <div className="space-y-2">
        <p className="text-[10px] font-medium text-muted-foreground">Buttons</p>
        <div className="space-y-1.5">
          <div
            className="h-7 rounded-lg flex items-center justify-center text-[10px] font-medium text-white"
            style={{ backgroundColor: c.primary }}
          >
            Primary
          </div>
          <div
            className="h-7 rounded-lg flex items-center justify-center text-[10px] font-medium"
            style={{ color: c.primary, border: `1px solid ${c.primary}` }}
          >
            Secondary
          </div>
          <div
            className="h-7 rounded-lg flex items-center justify-center text-[10px] font-medium"
            style={{ color: c.text + "66", backgroundColor: c.surface, border: `1px solid ${c.border}` }}
          >
            Disabled
          </div>
        </div>
      </div>

      {/* Input fields */}
      <div className="space-y-2">
        <p className="text-[10px] font-medium text-muted-foreground">Input Fields</p>
        <div className="space-y-1.5">
          <div
            className="h-7 rounded-lg px-2 flex items-center text-[9px]"
            style={{ backgroundColor: c.surface, border: `1px solid ${c.border}`, color: c.text }}
          >
            Input text...
          </div>
          <div
            className="h-7 rounded-lg px-2 flex items-center text-[9px]"
            style={{
              backgroundColor: c.surface,
              border: `1px solid ${c.primary}`,
              color: c.text,
              boxShadow: `0 0 0 2px ${c.primary}20`,
            }}
          >
            Focused input
          </div>
          <div
            className="h-7 rounded-lg px-2 flex items-center text-[9px]"
            style={{ backgroundColor: c.surface, border: `1px solid ${c.error}`, color: c.text }}
          >
            Error input
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="space-y-2">
        <p className="text-[10px] font-medium text-muted-foreground">Alerts</p>
        <div className="space-y-1.5">
          <div
            className="px-2 py-1.5 rounded-lg text-[9px]"
            style={{ backgroundColor: c.success + "15", border: `1px solid ${c.success}30`, color: c.success }}
          >
            Success: Operation completed
          </div>
          <div
            className="px-2 py-1.5 rounded-lg text-[9px]"
            style={{ backgroundColor: c.warning + "15", border: `1px solid ${c.warning}30`, color: c.warning }}
          >
            Warning: Please check
          </div>
          <div
            className="px-2 py-1.5 rounded-lg text-[9px]"
            style={{ backgroundColor: c.error + "15", border: `1px solid ${c.error}30`, color: c.error }}
          >
            Error: Something went wrong
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="space-y-2">
        <p className="text-[10px] font-medium text-muted-foreground">Badges & Status</p>
        <div className="flex flex-wrap gap-1">
          {[
            { label: "Active", color: c.success },
            { label: "Pending", color: c.warning },
            { label: "Failed", color: c.error },
            { label: "Info", color: c.info },
          ].map((badge) => (
            <span
              key={badge.label}
              className="px-2 py-0.5 rounded-full text-[8px] font-medium"
              style={{ backgroundColor: badge.color + "20", color: badge.color, border: `1px solid ${badge.color}40` }}
            >
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
