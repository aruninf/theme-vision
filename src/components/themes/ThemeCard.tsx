"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Star, CheckCircle2, Palette } from "lucide-react";
import { Theme } from "@/types/theme";
import { useActiveTheme } from "@/hooks/useTheme";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeCardProps {
  theme: Theme;
  compact?: boolean;
}

export function ThemeCard({ theme, compact = false }: ThemeCardProps) {
  const { setActiveTheme, activeTheme } = useActiveTheme();
  const isActive = activeTheme.id === theme.id;

  const colorKeys = ["primary", "secondary", "accent", "background", "surface", "card"] as const;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "group relative rounded-xl border overflow-hidden transition-all duration-200",
        "hover:shadow-xl hover:shadow-[var(--theme-primary)]/10",
        "bg-card/50 backdrop-blur-sm",
        isActive ? "ring-2 ring-[var(--theme-primary)] border-[var(--theme-primary)]" : "border-border/50",
        compact ? "p-3" : "p-5"
      )}
    >
      <Link href={`/theme/${theme.slug}`} className="block">
        {/* Color swatch bar */}
        <div className={cn("flex gap-1 mb-3", compact && "mb-2")}>
          {colorKeys.map((key) => (
            <div
              key={key}
              className="h-2 flex-1 rounded-full first:rounded-l-full last:rounded-r-full"
              style={{ backgroundColor: theme.colors[key as keyof typeof theme.colors] }}
            />
          ))}
        </div>

        <div className={cn("flex items-start justify-between gap-2", compact && "flex-col")}>
          <div className="min-w-0">
            <h3 className={cn("font-semibold truncate", compact ? "text-sm" : "text-base")}>
              {theme.name}
            </h3>
            {!compact && (
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                {theme.mood.slice(0, 3).join(" · ")}
              </p>
            )}
          </div>
          {!compact && theme.premium && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-amber-500/10 text-amber-500 border-amber-500/20">
              <Star className="w-2.5 h-2.5 mr-0.5" />
              Premium
            </Badge>
          )}
        </div>

        {!compact && (
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Eye className="w-3 h-3" />
              {theme.accessibility.score}
            </div>
            {theme.accessibility.wcagAA && (
              <div className="flex items-center gap-1 text-[11px]" style={{ color: theme.colors.success }}>
                <CheckCircle2 className="w-3 h-3" />
                AA
              </div>
            )}
            {theme.accessibility.wcagAAA && (
              <div className="flex items-center gap-1 text-[11px]" style={{ color: theme.colors.success }}>
                <CheckCircle2 className="w-3 h-3" />
                AAA
              </div>
            )}
          </div>
        )}
      </Link>

      {/* Apply button - visible on hover always, visible at bottom on mobile */}
      <div className={cn("mt-3", compact && "mt-2")}>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setActiveTheme(theme);
          }}
          size="sm"
          className={cn(
            "w-full rounded-lg text-xs font-semibold gap-1.5 transition-all",
            isActive
              ? "bg-[var(--theme-primary)] text-white ring-2 ring-[var(--theme-primary)]/30"
              : "bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-white border border-[var(--theme-primary)]/20"
          )}
        >
          <Palette className="w-3.5 h-3.5" />
          {isActive ? "Applied ✓" : "Apply Theme"}
        </Button>
      </div>
    </motion.div>
  );
}
