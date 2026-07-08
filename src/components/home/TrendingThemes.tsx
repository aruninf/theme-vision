"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { getTrendingThemes } from "@/data/themes";
import { ThemeCard } from "@/components/themes/ThemeCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function TrendingThemes() {
  const trending = getTrendingThemes().slice(0, 6);
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[var(--theme-primary)]/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-[var(--theme-primary)]" />
              </div>
              <span className="text-sm font-medium text-[var(--theme-primary)]">Trending Now</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Trending Themes
            </h2>
            <p className="text-muted-foreground mt-2">
              Most popular color themes among our community
            </p>
          </div>
          <Link
            href="/themes"
            className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all themes <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trending.map((theme, i) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ThemeCard theme={theme} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
