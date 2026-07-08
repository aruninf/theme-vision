"use client";

import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import {
  Cloud, Brain, HeartPulse, TrendingUp, GraduationCap, UtensilsCrossed,
  Plane, Dumbbell, ShoppingCart, Palette, MessageCircle, Bitcoin,
  Gamepad2, Gem, Sparkles, GlassWater, Square, Moon, Sun,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Cloud, Brain, HeartPulse, TrendingUp, GraduationCap, UtensilsCrossed,
  Plane, Dumbbell, ShoppingCart, Palette, MessageCircle, Bitcoin,
  Gamepad2, Gem, Sparkles, GlassWater, Square, Moon, Sun,
};

interface CategoryNavProps {
  activeCategory: string | null;
  onSelect: (slug: string | null) => void;
}

export function CategoryNav({ activeCategory, onSelect }: CategoryNavProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
          activeCategory === null
            ? "bg-[var(--theme-primary)] text-white border-[var(--theme-primary)]"
            : "bg-accent/50 text-muted-foreground border-border/50 hover:border-[var(--theme-primary)]/30"
        )}
      >
        All Themes
      </button>
      {categories.map((cat) => {
        const Icon = iconMap[cat.icon] || Palette;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.slug)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
              activeCategory === cat.slug
                ? "bg-[var(--theme-primary)] text-white border-[var(--theme-primary)]"
                : "bg-accent/50 text-muted-foreground border-border/50 hover:border-[var(--theme-primary)]/30"
            )}
          >
            <Icon className="w-3 h-3" />
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
