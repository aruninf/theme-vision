"use client";

import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0 bg-transparent"
          style={{ accentColor: value }}
        />
        <div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{ backgroundColor: value, border: "1px solid rgba(255,255,255,0.1)" }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <label className="block text-[10px] font-medium text-muted-foreground mb-0.5">
          {label}
        </label>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-7 text-[11px] font-mono px-2"
        />
      </div>
    </div>
  );
}
