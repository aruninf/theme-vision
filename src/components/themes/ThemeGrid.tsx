"use client";

import { motion } from "framer-motion";
import { Theme } from "@/types/theme";
import { ThemeCard } from "./ThemeCard";

interface ThemeGridProps {
  themes: Theme[];
}

export function ThemeGrid({ themes }: ThemeGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {themes.map((theme, i) => (
        <motion.div
          key={theme.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.03 }}
        >
          <ThemeCard theme={theme} />
        </motion.div>
      ))}
    </div>
  );
}
