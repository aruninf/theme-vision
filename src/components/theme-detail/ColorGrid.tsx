"use client";

import { motion } from "framer-motion";
import { useActiveTheme } from "@/hooks/useTheme";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

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
  { key: "hover", label: "Hover" },
  { key: "disabled", label: "Disabled" },
];

export function ColorGrid() {
  const { activeTheme } = useActiveTheme();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {colorKeys.map(({ key, label }, i) => {
        const hex = (activeTheme.colors as unknown as Record<string, string>)[key];
        const rgb = (activeTheme.rgb as unknown as Record<string, string>)[key];
        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="group relative rounded-xl overflow-hidden border border-border/50 bg-card/50"
          >
            <div
              className="h-16 cursor-pointer relative"
              style={{ backgroundColor: hex }}
              onClick={() => copyToClipboard(hex, key)}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                {copied === key ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <Copy className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
            <div className="p-2">
              <p className="text-[10px] font-medium">{label}</p>
              <p className="text-[9px] font-mono text-muted-foreground">{hex}</p>
              <p className="text-[8px] font-mono text-muted-foreground">rgb({rgb})</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
