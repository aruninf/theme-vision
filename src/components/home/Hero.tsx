"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActiveTheme } from "@/hooks/useTheme";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { activeTheme } = useActiveTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      activeTheme.colors.primary,
      activeTheme.colors.accent,
      activeTheme.colors.secondary,
    ];

    const blobs = [
      { x: 0.2, y: 0.3, r: 0.3, dx: 0.001, dy: 0.0005 },
      { x: 0.8, y: 0.4, r: 0.25, dx: -0.0008, dy: 0.0008 },
      { x: 0.5, y: 0.8, r: 0.35, dx: 0.0006, dy: -0.0006 },
    ];

    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((b, i) => {
        b.x += b.dx;
        b.y += b.dy;
        if (b.x < -0.1 || b.x > 1.1) b.dx *= -1;
        if (b.y < -0.1 || b.y > 1.1) b.dy *= -1;

        const gradient = ctx.createRadialGradient(
          b.x * canvas.width,
          b.y * canvas.height,
          0,
          b.x * canvas.width,
          b.y * canvas.height,
          b.r * canvas.width
        );

        gradient.addColorStop(0, colors[i] + "60");
        gradient.addColorStop(0.5, colors[i] + "20");
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      frame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeTheme]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora background - full viewport height */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: "blur(100px)" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--theme-border) 1px, transparent 1px), linear-gradient(90deg, var(--theme-border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border"
            style={{
              backgroundColor: activeTheme.colors.primary + "15",
              color: activeTheme.colors.primary,
              borderColor: activeTheme.colors.primary + "30",
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Preview colors in real UI before choosing
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6"
        >
          Choose Colors{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: `linear-gradient(135deg, ${activeTheme.colors.primary}, ${activeTheme.colors.accent}, ${activeTheme.colors.secondary})`,
            }}
          >
            You&apos;ll Never Regret.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Preview complete websites and mobile apps with real UI before choosing your color palette.
          See every shade in action across dashboards, landing pages, and mobile interfaces.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/themes">
            <Button
              size="lg"
              className="rounded-full text-base h-12 px-8 gap-2 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              style={{ backgroundColor: activeTheme.colors.primary }}
            >
              Explore Themes
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/builder">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full text-base h-12 px-8 gap-2 hover:bg-accent/50"
              style={{ borderColor: activeTheme.colors.border }}
            >
              <Palette className="w-4 h-4" />
              Create Custom Theme
            </Button>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 flex items-start justify-center p-1"
            style={{ borderColor: activeTheme.colors.border }}
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{ backgroundColor: activeTheme.colors.text + "66" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
