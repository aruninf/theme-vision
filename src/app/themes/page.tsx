"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { themes } from "@/data/themes";
import { ThemeGrid } from "@/components/themes/ThemeGrid";
import { CategoryNav } from "@/components/themes/CategoryNav";
import { Input } from "@/components/ui/input";

export default function ThemesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return themes.filter((theme) => {
      const matchesCategory =
        !activeCategory || theme.categories.includes(activeCategory);
      const matchesSearch =
        !search ||
        theme.name.toLowerCase().includes(search.toLowerCase()) ||
        theme.description.toLowerCase().includes(search.toLowerCase()) ||
        theme.mood.some((m) => m.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Theme Library
          </h1>
          <p className="text-muted-foreground">
            Browse {themes.length}+ handcrafted themes for every industry and use case
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search themes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm rounded-lg"
            />
          </div>
        </div>

        <div className="mb-6">
          <CategoryNav
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        {filtered.length > 0 ? (
          <ThemeGrid themes={filtered} />
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No themes found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
