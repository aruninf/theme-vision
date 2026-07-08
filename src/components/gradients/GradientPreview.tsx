"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GradientCollection } from "@/types/theme";
import { gradients } from "@/data/gradients";
import { GradientCard } from "./GradientCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Sparkles, Copy, Check, Code, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const gradientTypes = [
  { value: "all", label: "All" },
  { value: "mesh", label: "Mesh" },
  { value: "aurora", label: "Aurora" },
  { value: "sunset", label: "Sunset" },
  { value: "ocean", label: "Ocean" },
  { value: "neon", label: "Neon" },
  { value: "royal", label: "Royal" },
  { value: "emerald", label: "Emerald" },
  { value: "midnight", label: "Midnight" },
  { value: "fire", label: "Fire" },
  { value: "mint", label: "Mint" },
  { value: "glass", label: "Glass" },
];

function GradientCodePanel({ gradient }: { gradient: GradientCollection }) {
  const [copied, setCopied] = useState(false);

  const cssCode = `background: ${gradient.gradient};`;

  const copyCode = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Code className="w-3.5 h-3.5 text-white/60" />
          <span className="text-xs font-medium text-white/80">CSS Code</span>
        </div>
        <button
          onClick={copyCode}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-green-400" />
              <span className="text-[10px] text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-white/60" />
              <span className="text-[10px] text-white/60">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono text-white/80 overflow-x-auto">
        <code>{cssCode}</code>
      </pre>
    </div>
  );
}

function ColorHexBadge({ color }: { color: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-md border border-white/15 hover:bg-black/40 transition-all"
    >
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[10px] font-mono text-white/80">{color}</span>
      {copied ? (
        <Check className="w-2.5 h-2.5 text-green-400" />
      ) : (
        <Copy className="w-2.5 h-2.5 text-white/40" />
      )}
    </button>
  );
}

export function GradientPreview() {
  const [activeType, setActiveType] = useState("all");
  const [activeGradient, setActiveGradient] = useState<GradientCollection | null>(null);
  const [gradientList, setGradientList] = useState(gradients);

  // Update gradient list when type changes
  useEffect(() => {
    setGradientList(
      activeType === "all"
        ? gradients
        : gradients.filter((g) => g.type === activeType)
    );
  }, [activeType]);

  const currentIndex = activeGradient
    ? gradientList.findIndex((g) => g.slug === activeGradient.slug)
    : -1;

  const goNext = useCallback(() => {
    if (currentIndex < gradientList.length - 1) {
      setActiveGradient(gradientList[currentIndex + 1]);
    }
  }, [currentIndex, gradientList]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setActiveGradient(gradientList[currentIndex - 1]);
    }
  }, [currentIndex, gradientList]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveGradient(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  return (
    <div>
      {/* Full-screen gradient preview overlay */}
      <AnimatePresence>
        {activeGradient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
            style={{ background: activeGradient.gradient }}
          >
            {/* Top bar */}
            <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Badge className="bg-black/30 text-white border-0 backdrop-blur-md text-xs px-3 py-1">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {activeGradient.name}
                </Badge>
                <Badge variant="outline" className="bg-black/20 text-white/70 border-white/20 backdrop-blur-md text-[10px] capitalize">
                  {activeGradient.type}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/40">
                  {currentIndex + 1} / {gradientList.length}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md"
                  onClick={() => setActiveGradient(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Center content */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 relative">
              {/* Previous button */}
              {currentIndex > 0 && (
                <button
                  onClick={goPrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md flex items-center justify-center transition-all text-white/80 hover:text-white"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}

              {/* Next button */}
              {currentIndex < gradientList.length - 1 && (
                <button
                  onClick={goNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md flex items-center justify-center transition-all text-white/80 hover:text-white"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}

              <div className="w-full max-w-lg mx-auto space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                    {activeGradient.name}
                  </h2>
                  <p className="text-white/70 text-sm sm:text-base drop-shadow-md">
                    {activeGradient.description}
                  </p>
                </div>

                {/* Copyable color hex values */}
                <div className="flex flex-wrap justify-center gap-2">
                  {activeGradient.colors.map((color, i) => (
                    <ColorHexBadge key={i} color={color} />
                  ))}
                </div>

                {/* CSS code panel */}
                <GradientCodePanel gradient={activeGradient} />
              </div>
            </div>

            {/* Bottom bar */}
            <div className="px-6 py-3 flex items-center justify-center gap-4">
              <span className="text-white/30 text-xs hidden sm:inline">
                ← / → keys to navigate · ESC to close
              </span>
              <span className="text-white/30 text-xs sm:hidden">
                Swipe or tap arrows to navigate
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient type filters */}
      <Tabs value={activeType} onValueChange={setActiveType} className="mb-6">
        <TabsList className="h-8 flex-wrap">
          {gradientTypes.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              className="text-[11px] px-3 py-1 h-6 capitalize"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Gradient grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {gradientList.map((gradient, i) => (
          <motion.div
            key={gradient.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
          >
            <GradientCard
              gradient={gradient}
              isActive={activeGradient?.slug === gradient.slug}
              onApply={() => setActiveGradient(gradient)}
            />
          </motion.div>
        ))}
      </div>

      {gradientList.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No gradients found for this category.
        </div>
      )}
    </div>
  );
}
