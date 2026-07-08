import { Hero } from "@/components/home/Hero";
import { TrendingThemes } from "@/components/home/TrendingThemes";
import { IndustryCategories } from "@/components/home/IndustryCategories";
import { PremiumCollections } from "@/components/home/PremiumCollections";
import { LivePreviewSection } from "@/components/home/LivePreviewSection";
import { AccessibilitySection } from "@/components/home/AccessibilitySection";
import { ExportSection } from "@/components/home/ExportSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrendingThemes />
      <IndustryCategories />
      <PremiumCollections />
      <LivePreviewSection />
      <AccessibilitySection />
      <ExportSection />
    </>
  );
}
