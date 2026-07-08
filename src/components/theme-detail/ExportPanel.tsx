"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useActiveTheme } from "@/hooks/useTheme";
import { ExportFormat } from "@/types/theme";
import { generateExport, getExportLabel } from "@/lib/theme-utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, Check } from "lucide-react";

const exportFormats: ExportFormat[] = [
  "css-variables",
  "tailwind-config",
  "scss-variables",
  "flutter-themedata",
  "react-native",
  "swiftui",
  "android-xml",
  "material-3",
  "json-tokens",
];

export function ExportPanel() {
  const { activeTheme, exportTheme } = useActiveTheme();
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("css-variables");
  const [copied, setCopied] = useState(false);

  const code = generateExport(activeTheme, selectedFormat);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {exportFormats.map((format) => (
          <button
            key={format}
            onClick={() => setSelectedFormat(format)}
            className="px-2.5 py-1 rounded-md text-[10px] font-medium transition-all border"
            style={{
              backgroundColor: selectedFormat === format ? "var(--theme-primary)" : "transparent",
              color: selectedFormat === format ? "#fff" : "var(--theme-text)",
              borderColor: selectedFormat === format ? "var(--theme-primary)" : "var(--theme-border)",
              opacity: selectedFormat === format ? 1 : 0.6,
            }}
          >
            {getExportLabel(format)}
          </button>
        ))}
      </div>

      <div className="relative rounded-lg overflow-hidden border border-border/50">
        <ScrollArea className="h-48">
          <pre
            className="p-3 text-[10px] font-mono leading-relaxed"
            style={{ backgroundColor: "var(--theme-surface)", color: "var(--theme-text)" }}
          >
            {code}
          </pre>
        </ScrollArea>

        <div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={copyCode}
            className="w-6 h-6 rounded-md flex items-center justify-center bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-accent/50 transition-colors"
          >
            {copied ? (
              <Check className="w-3 h-3 text-green-500" />
            ) : (
              <Copy className="w-3 h-3 text-muted-foreground" />
            )}
          </button>
          <button
            onClick={() => exportTheme(selectedFormat)}
            className="w-6 h-6 rounded-md flex items-center justify-center bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-accent/50 transition-colors"
          >
            <Download className="w-3 h-3 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
