"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { categories } from "@/data/categories";
import { useScrollReveal } from "@/hooks/useScrollReveal";
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

export function IndustryCategories() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Industry Categories
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Curated themes for every industry — from SaaS to gaming
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Palette;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.03 }}
              >
                <Link
                  href={`/themes?category=${cat.slug}`}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border border-border/50",
                    "hover:border-[var(--theme-primary)]/30 hover:bg-[var(--theme-primary)]/5",
                    "transition-all duration-200 group cursor-pointer"
                  )}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-[var(--theme-primary)]" />
                  </div>
                  <span className="text-xs font-medium text-center text-muted-foreground group-hover:text-foreground">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
