"use client";

import { motion } from "framer-motion";
import {
  FileJson, FileCode, FileType, Terminal, Smartphone,
  Apple, FileWarning, Palette, FileText,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const exportOptions = [
  { icon: FileCode, title: "CSS Variables", desc: "Custom properties for any project" },
  { icon: Terminal, title: "Tailwind Config", desc: "Extended color configuration" },
  { icon: FileType, title: "SCSS Variables", desc: "Sass-friendly variable format" },
  { icon: Smartphone, title: "Flutter ThemeData", desc: "Dart code for Flutter apps" },
  { icon: FileJson, title: "React Native", desc: "Theme object for RN apps" },
  { icon: Apple, title: "SwiftUI Colors", desc: "Color assets for iOS/macOS" },
  { icon: FileWarning, title: "Android XML", desc: "Android color resources" },
  { icon: Palette, title: "Material 3", desc: "Jetpack Compose color scheme" },
  { icon: FileText, title: "JSON Tokens", desc: "Design tokens in JSON format" },
];

export function ExportSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Export Anywhere
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Export your theme in every format your project needs
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {exportOptions.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/50 bg-card/30 hover:bg-card/60 hover:border-[var(--theme-primary)]/30 transition-all duration-200 group text-center"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-[var(--theme-primary)]" />
                </div>
                <div>
                  <p className="text-xs font-medium">{opt.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{opt.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
