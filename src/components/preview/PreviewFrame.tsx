"use client";

import { ReactNode } from "react";
import { useActiveTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

interface PreviewFrameProps {
  children: ReactNode;
  label: string;
  className?: string;
}

export function PreviewFrame({ children, label, className }: PreviewFrameProps) {
  const { activeTheme } = useActiveTheme();
  const c = activeTheme.colors;

  return (
    <div
      className={cn("rounded-xl border overflow-hidden", className)}
      style={{ borderColor: c.border, backgroundColor: c.background }}
    >
      <div
        className="flex items-center justify-between px-3 py-1.5 border-b"
        style={{ borderColor: c.border, backgroundColor: c.surface }}
      >
        <span className="text-[10px] font-medium" style={{ color: c.text + "88" }}>{label}</span>
        <div className="flex gap-1">
          {["#FF5F56", "#FFBD2E", "#27C93F"].map((color) => (
            <div key={color} className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
      <div className="p-3">
        {children}
      </div>
    </div>
  );
}
