"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Palette, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { themes, getThemeBySlug } from "@/data/themes";
import { useActiveTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorGrid } from "@/components/theme-detail/ColorGrid";
import { ComplianceBadge } from "@/components/theme-detail/ComplianceBadge";
import { ComponentSamples } from "@/components/theme-detail/ComponentSamples";
import { ExportPanel } from "@/components/theme-detail/ExportPanel";
import { WebPreview } from "@/components/preview/WebPreview";
import { MobilePreview } from "@/components/preview/MobilePreview";

interface Props {
  slug: string;
}

export function ThemeDetailClient({ slug }: Props) {
  const { activeTheme, setActiveTheme } = useActiveTheme();
  const theme = useMemo(() => getThemeBySlug(slug), [slug]);
  const isApplied = activeTheme.id === theme?.id;

  if (!theme) {
    return (
      <div className="pt-20 pb-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Theme not found</h1>
        <Link href="/themes" className="text-[var(--theme-primary)] hover:underline">
          Browse all themes
        </Link>
      </div>
    );
  }

  const relatedThemes = themes
    .filter((t) => t.id !== theme.id && t.categories.some((c) => theme.categories.includes(c)))
    .slice(0, 4);

  return (
    <div className="pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/themes"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to themes
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  {theme.name}
                </h1>
                {theme.premium && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                    Premium
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground max-w-2xl">{theme.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {theme.mood.map((m) => (
                  <Badge key={m} variant="secondary" className="text-[10px] px-2 py-0.5">
                    {m}
                  </Badge>
                ))}
                {theme.industries.map((ind) => (
                  <Badge
                    key={ind}
                    variant="outline"
                    className="text-[10px] px-2 py-0.5"
                    style={{
                      borderColor: theme.colors.primary + "30",
                      color: theme.colors.primary,
                    }}
                  >
                    {ind}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 w-full lg:w-64">
              <Button
                onClick={() => setActiveTheme(theme)}
                size="lg"
                className={cn(
                  "w-full rounded-xl text-base font-semibold gap-2 h-14 shadow-xl transition-all duration-300",
                  isApplied
                    ? "bg-[var(--theme-success)] hover:bg-[var(--theme-success)] text-white"
                    : "bg-[var(--theme-primary)] hover:opacity-90 text-white hover:shadow-2xl hover:scale-[1.02]"
                )}
              >
                {isApplied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Applied to Preview ✓
                  </>
                ) : (
                  <>
                    <Palette className="w-5 h-5" />
                    Apply This Theme
                  </>
                )}
              </Button>

              <div className="flex gap-1 mt-3 rounded-xl overflow-hidden h-2">
                {["primary", "secondary", "accent", "background", "surface", "card"].map((k) => (
                  <div
                    key={k}
                    className="flex-1"
                    style={{ backgroundColor: theme.colors[k as keyof typeof theme.colors] }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <span>Score: <strong style={{ color: theme.colors.primary }}>{theme.accessibility.score}</strong></span>
                <span>Contrast: <strong>{theme.accessibility.contrastRating}</strong></span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gradient showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4" style={{ color: theme.colors.primary }} />
            <span className="text-sm font-semibold" style={{ color: theme.colors.primary }}>
              Theme Gradients
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(Object.entries(theme.gradients) as [string, { name: string; type: string; colors: string[]; angle?: number }][]).map(([key, grad]) => (
              <div
                key={key}
                className="rounded-xl overflow-hidden border"
                style={{ borderColor: theme.colors.border }}
              >
                <div
                  className="h-20 flex items-center justify-center"
                  style={{
                    background: grad.type === "radial"
                      ? `radial-gradient(circle, ${grad.colors.join(", ")})`
                      : `linear-gradient(${grad.angle || 135}deg, ${grad.colors.join(", ")})`,
                  }}
                >
                  <Badge
                    variant="secondary"
                    className="text-[9px] px-2 py-0.5 capitalize bg-black/30 text-white border-0 backdrop-blur-sm"
                  >
                    {grad.type}
                  </Badge>
                </div>
                <div className="px-3 py-2 flex items-center justify-between">
                  <span className="text-xs font-medium">{grad.name}</span>
                  <div className="flex gap-1">
                    {grad.colors.map((c, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <Tabs defaultValue="preview" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="preview">Live Preview</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-xl border overflow-hidden bg-card" style={{ borderColor: theme.colors.border }}>
                <div className="px-3 py-1.5 border-b" style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.surface }}>
                  <span className="text-[10px] font-medium" style={{ color: theme.colors.text + "88" }}>Mobile App</span>
                </div>
                <MobilePreview />
              </div>
              <div className="rounded-xl border overflow-hidden bg-card" style={{ borderColor: theme.colors.border }}>
                <div className="px-3 py-1.5 border-b" style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.surface }}>
                  <span className="text-[10px] font-medium" style={{ color: theme.colors.text + "88" }}>Website</span>
                </div>
                <WebPreview />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="colors">
            <ColorGrid />
          </TabsContent>

          <TabsContent value="accessibility">
            <div className="max-w-md">
              <ComplianceBadge />
            </div>
          </TabsContent>

          <TabsContent value="components">
            <ComponentSamples />
          </TabsContent>

          <TabsContent value="export">
            <ExportPanel />
          </TabsContent>
        </Tabs>

        <Separator className="my-8" />

        {relatedThemes.length > 0 && (
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-4">Related Themes</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedThemes.map((t) => (
                <Link
                  key={t.id}
                  href={`/theme/${t.slug}`}
                  className="p-4 rounded-xl border bg-card/50 hover:border-[var(--theme-primary)]/30 transition-all group"
                  style={{ borderColor: theme.colors.border }}
                >
                  <div className="flex gap-1 mb-3">
                    {["primary", "secondary", "accent", "background"].map((k) => (
                      <div
                        key={k}
                        className="h-2 flex-1 rounded-full"
                        style={{ backgroundColor: t.colors[k as keyof typeof t.colors] }}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {t.mood.slice(0, 2).join(" · ")}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
