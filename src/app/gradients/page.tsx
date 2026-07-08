"use client";

import { motion } from "framer-motion";
import { Droplets } from "lucide-react";
import { GradientPreview } from "@/components/gradients/GradientPreview";

export default function GradientsPage() {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
              <Droplets className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Gradient Library</h1>
          </div>
          <p className="text-muted-foreground">
            Premium mesh, aurora, and linear gradients for backgrounds and UI elements
          </p>
        </motion.div>

        <GradientPreview />
      </div>
    </div>
  );
}
