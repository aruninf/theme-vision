"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VariableEditor } from "@/components/builder/VariableEditor";
import { BuilderCanvas } from "@/components/builder/BuilderCanvas";
import { useActiveTheme } from "@/hooks/useTheme";
import { themes } from "@/data/themes";
import { ThemeCard } from "@/components/themes/ThemeCard";
import { Sparkles } from "lucide-react";

export default function BuilderPage() {
  const { setActiveTheme, activeTheme } = useActiveTheme();

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-accent)] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Theme Builder</h1>
          </div>
          <p className="text-muted-foreground">
            Customize every color variable and see changes in real time across mobile and web UIs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Color editor */}
            <div
              className="rounded-xl border border-border/50 p-4 bg-card/50"
            >
              <VariableEditor />
            </div>

            {/* Start from theme */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground mb-3">
                Start from a theme
              </h3>
              <ScrollArea className="h-[300px] pr-2">
                <div className="space-y-2">
                  {themes.slice(0, 10).map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setActiveTheme(theme)}
                      className="w-full text-left"
                    >
                      <ThemeCard theme={theme} compact />
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-9">
            <BuilderCanvas />
          </div>
        </div>
      </div>
    </div>
  );
}
