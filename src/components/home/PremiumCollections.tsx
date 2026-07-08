"use client";

import { motion } from "framer-motion";
import { Sparkles, Crown } from "lucide-react";
import { getPremiumThemes } from "@/data/themes";
import { ThemeCard } from "@/components/themes/ThemeCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function PremiumCollections() {
  const premium = getPremiumThemes().slice(0, 4);
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--theme-primary)]/5 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[var(--theme-primary)]/10 flex items-center justify-center">
                <Crown className="w-4 h-4 text-[var(--theme-primary)]" />
              </div>
              <span className="text-sm font-medium text-[var(--theme-primary)]">Premium</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Premium Collections
            </h2>
            <p className="text-muted-foreground mt-2">
              Handcrafted premium themes for discerning designers
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {premium.map((theme, i) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="relative">
                <div className="absolute -top-2 -right-2 z-10">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
                    <Sparkles className="w-3 h-3" /> Premium
                  </span>
                </div>
                <ThemeCard theme={theme} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
