"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Monitor, Smartphone, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WebPreview } from "@/components/preview/WebPreview";
import { MobilePreview } from "@/components/preview/MobilePreview";

export function LivePreviewSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[var(--theme-primary)]/10 flex items-center justify-center">
              <Play className="w-4 h-4 text-[var(--theme-primary)]" />
            </div>
            <span className="text-sm font-medium text-[var(--theme-primary)]">Live Preview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            See Your Theme Come to Life
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Instantly preview how your chosen colors look across real app screens and website layouts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Mobile App Preview</span>
            </div>
            <div className="rounded-2xl border border-border/50 overflow-hidden bg-card shadow-xl">
              <MobilePreview />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="flex items-center gap-2 mb-4">
              <Monitor className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Website Preview</span>
            </div>
            <div className="rounded-2xl border border-border/50 overflow-hidden bg-card shadow-xl">
              <WebPreview />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link href="/themes">
            <Button
              variant="outline"
              className="rounded-full gap-2 border-border/50 hover:bg-accent/50"
            >
              Try with different themes
              <Play className="w-3 h-3" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
