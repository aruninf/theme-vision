"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GradientCollection } from "@/types/theme";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Eye, Copy, Check } from "lucide-react";

interface GradientCardProps {
  gradient: GradientCollection;
  isActive: boolean;
  onApply: () => void;
}

export function GradientCard({ gradient, isActive, onApply }: GradientCardProps) {
  const [copied, setCopied] = useState(false);

  const copyGradientCSS = (e: React.MouseEvent) => {
    e.stopPropagation();
    const css = `background: ${gradient.gradient};`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group rounded-xl border overflow-hidden bg-card/50 backdrop-blur-sm transition-all duration-200 hover:shadow-xl"
      style={{
        borderColor: isActive ? "var(--theme-primary)" : "var(--border)",
        boxShadow: isActive ? "0 0 0 2px var(--theme-primary)" : "none",
      }}
    >
      {/* Gradient preview */}
      <div
        className="h-36 relative overflow-hidden cursor-pointer"
        style={{ background: gradient.gradient }}
        onClick={onApply}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        {gradient.animated && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4 bg-black/30 text-white border-0 gap-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              Animated
            </Badge>
          </div>
        )}
        <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Badge variant="secondary" className="text-[9px] bg-black/40 text-white border-0 backdrop-blur-sm gap-1">
            <Eye className="w-2.5 h-2.5" />
            Preview
          </Badge>
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold">{gradient.name}</h3>
        <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{gradient.description}</p>

        {/* Color dots with hex labels */}
        <div className="flex gap-1 mt-2">
          {gradient.colors.slice(0, 5).map((color, i) => (
            <div
              key={i}
              className="group/color relative"
            >
              <div
                className="w-4 h-4 rounded-full border border-border/50 cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(color);
                }}
                title={color}
              />
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover/color:opacity-100 transition-opacity text-[8px] font-mono bg-popover px-1 rounded whitespace-nowrap">
                {color}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-3">
          <Badge
            variant="outline"
            className="text-[9px] px-1.5 py-0 h-4 capitalize border-border/30"
          >
            {gradient.type}
          </Badge>

          <div className="flex gap-1">
            {/* Copy CSS button */}
            <button
              onClick={copyGradientCSS}
              className="h-6 w-6 rounded-md flex items-center justify-center text-[10px] bg-accent/50 hover:bg-accent transition-colors"
              title="Copy CSS"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3 text-muted-foreground" />
              )}
            </button>

            <Button
              onClick={onApply}
              size="sm"
              className={cn(
                "h-6 rounded-lg text-[9px] font-semibold px-2.5 gap-1 transition-all",
                isActive
                  ? "bg-[var(--theme-primary)] text-white"
                  : "bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-white"
              )}
            >
              {isActive ? "Active" : "Try it"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
