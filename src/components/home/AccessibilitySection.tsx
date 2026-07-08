"use client";

import { motion } from "framer-motion";
import { Eye, CheckCircle2, AlertTriangle, BarChart3, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  {
    icon: Eye,
    title: "WCAG AA & AAA",
    description: "Every theme is tested against WCAG 2.1 contrast requirements",
    color: "text-green-500",
  },
  {
    icon: Users,
    title: "Color Blind Friendly",
    description: "Themes optimized for protanopia, deuteranopia, and tritanopia",
    color: "text-blue-500",
  },
  {
    icon: BarChart3,
    title: "Contrast Ratings",
    description: "Detailed contrast ratios for all color combinations",
    color: "text-purple-500",
  },
  {
    icon: CheckCircle2,
    title: "Accessibility Score",
    description: "Overall accessibility score from 0-100 for each theme",
    color: "text-emerald-500",
  },
];

export function AccessibilitySection() {
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
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[var(--theme-primary)]/10 flex items-center justify-center">
              <Eye className="w-4 h-4 text-[var(--theme-primary)]" />
            </div>
            <span className="text-sm font-medium text-[var(--theme-primary)]">Accessibility</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Colors for Everyone
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every theme is tested for accessibility to ensure your product is usable by everyone
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-primary)]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-xl bg-accent/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium mb-1">Accessibility Note</p>
              <p className="text-sm text-muted-foreground">
                While all themes target accessibility, some decorative themes (like Glass Synth or Gaming Neon)
                may not achieve full WCAG compliance due to their creative design choices. We clearly label each
                theme&apos;s compliance level so you can make informed decisions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
