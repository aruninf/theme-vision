"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveTheme } from "@/hooks/useTheme";
import { Menu, X, ChevronRight, BarChart3, TrendingUp, Users, DollarSign, Activity } from "lucide-react";

type View = "landing" | "dashboard";

export function WebPreview() {
  const [view, setView] = useState<View>("landing");
  const { activeTheme } = useActiveTheme();
  const c = activeTheme.colors;

  return (
    <div className="flex flex-col">
      {/* View toggle */}
      <div
        className="flex gap-1 px-3 py-2"
        style={{ backgroundColor: c.background, borderBottom: `1px solid ${c.border}` }}
      >
        {(["landing", "dashboard"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className="px-3 py-1 rounded-md text-[10px] font-medium capitalize transition-all"
            style={{
              backgroundColor: view === v ? c.primary + "20" : "transparent",
              color: view === v ? c.primary : c.text + "66",
              border: view === v ? `1px solid ${c.primary}40` : "none",
            }}
          >
            {v} page
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="h-[460px] overflow-hidden relative">
        <AnimatePresence mode="wait">
          {view === "landing" ? (
            <LandingPage key="landing" />
          ) : (
            <DashboardPage key="dashboard" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LandingPage() {
  const { activeTheme } = useActiveTheme();
  const c = activeTheme.colors;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full overflow-y-auto"
      style={{ backgroundColor: c.background }}
    >
      {/* Navbar */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: `1px solid ${c.border}`, backgroundColor: c.surface + "99" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: c.primary }}>
            <Activity className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-bold" style={{ color: c.text }}>Brand</span>
        </div>
        <div className="flex items-center gap-3">
          {["Features", "Pricing", "About"].map((link) => (
            <span key={link} className="text-[9px] font-medium" style={{ color: c.text + "77" }}>{link}</span>
          ))}
          <div className="px-2.5 py-1 rounded-md text-[9px] font-medium text-white" style={{ backgroundColor: c.primary }}>
            Get Started
          </div>
        </div>
      </div>

      {/* Hero section */}
      <div className="px-4 py-6 text-center">
        <h2
          className="text-lg font-bold leading-tight"
          style={{ color: c.text }}
        >
          Build Something{" "}
          <span style={{ color: c.primary }}>Amazing</span>
        </h2>
        <p className="text-[10px] mt-1.5 leading-relaxed max-w-xs mx-auto" style={{ color: c.text + "99" }}>
          Create beautiful products with our modern platform. Start building today.
        </p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="px-3 py-1.5 rounded-md text-[9px] font-medium text-white" style={{ backgroundColor: c.primary }}>
            Get Started Free
          </div>
          <div
            className="px-3 py-1.5 rounded-md text-[9px] font-medium"
            style={{ color: c.text, border: `1px solid ${c.border}` }}
          >
            Learn More
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Analytics", desc: "Track everything" },
            { label: "Security", desc: "Enterprise grade" },
            { label: "Speed", desc: "Lightning fast" },
          ].map((f) => (
            <div
              key={f.label}
              className="rounded-lg p-2.5"
              style={{ backgroundColor: c.card, border: `1px solid ${c.border}` }}
            >
              <div className="w-5 h-5 rounded flex items-center justify-center mb-1.5" style={{ backgroundColor: c.primary + "20" }}>
                <BarChart3 className="w-3 h-3" style={{ color: c.primary }} />
              </div>
              <p className="text-[9px] font-semibold" style={{ color: c.text }}>{f.label}</p>
              <p className="text-[8px] mt-0.5" style={{ color: c.text + "66" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: "Starter", price: "$19", period: "/mo" },
            { name: "Pro", price: "$49", period: "/mo", popular: true },
          ].map((plan) => (
            <div
              key={plan.name}
              className="rounded-lg p-3 relative"
              style={{
                backgroundColor: plan.popular ? c.primary + "10" : c.card,
                border: `1px solid ${plan.popular ? c.primary + "40" : c.border}`,
              }}
            >
              {plan.popular && (
                <span
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full text-[7px] font-medium text-white"
                  style={{ backgroundColor: c.primary }}
                >
                  Popular
                </span>
              )}
              <p className="text-[9px] font-medium" style={{ color: c.text }}>{plan.name}</p>
              <div className="flex items-baseline gap-0.5 mt-1">
                <span className="text-sm font-bold" style={{ color: c.text }}>{plan.price}</span>
                <span className="text-[8px]" style={{ color: c.text + "66" }}>{plan.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-4 py-3 text-center text-[8px]"
        style={{ color: c.text + "44", borderTop: `1px solid ${c.border}` }}
      >
        &copy; 2026 Brand. All rights reserved.
      </div>
    </motion.div>
  );
}

function DashboardPage() {
  const { activeTheme } = useActiveTheme();
  const c = activeTheme.colors;

  const stats = [
    { label: "Revenue", value: "$45,230", change: "+12.5%", icon: DollarSign },
    { label: "Users", value: "2,847", change: "+8.2%", icon: Users },
    { label: "Growth", value: "23.5%", change: "+3.1%", icon: TrendingUp },
    { label: "Sales", value: "1,234", change: "+18.7%", icon: BarChart3 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full overflow-y-auto"
      style={{ backgroundColor: c.background }}
    >
      {/* Sidebar + main layout */}
      <div className="flex h-full">
        {/* Mini sidebar */}
        <div
          className="w-10 flex flex-col items-center gap-3 py-3"
          style={{ backgroundColor: c.surface, borderRight: `1px solid ${c.border}` }}
        >
          {[Activity, BarChart3, Users, TrendingUp].map((Icon, i) => (
            <Icon
              key={i}
              className="w-3.5 h-3.5"
              style={{ color: i === 1 ? c.primary : c.text + "44" }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold" style={{ color: c.text }}>Dashboard</h2>
            <span className="text-[8px]" style={{ color: c.text + "44" }}>Today</span>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-lg p-2"
                  style={{ backgroundColor: c.card, border: `1px solid ${c.border}` }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[8px]" style={{ color: c.text + "66" }}>{stat.label}</span>
                    <Icon className="w-3 h-3" style={{ color: c.text + "33" }} />
                  </div>
                  <p className="text-sm font-bold" style={{ color: c.text }}>{stat.value}</p>
                  <p className="text-[8px] font-medium" style={{ color: c.success }}>{stat.change}</p>
                </div>
              );
            })}
          </div>

          {/* Chart area */}
          <div
            className="rounded-lg p-3 mb-3"
            style={{ backgroundColor: c.card, border: `1px solid ${c.border}` }}
          >
            <p className="text-[9px] font-medium mb-2" style={{ color: c.text + "88" }}>Weekly Revenue</p>
            <div className="flex items-end gap-1.5 h-12">
              {[30, 45, 25, 65, 55, 75, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm transition-all"
                  style={{
                    height: `${h}%`,
                    backgroundColor: i === 6 ? c.primary : c.primary + "40",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Activity list */}
          <div
            className="rounded-lg p-3"
            style={{ backgroundColor: c.card, border: `1px solid ${c.border}` }}
          >
            <p className="text-[9px] font-medium mb-2" style={{ color: c.text + "88" }}>Recent Activity</p>
            {[
              { action: "New user registered", time: "2m ago" },
              { action: "Payment received", time: "15m ago" },
              { action: "Server deployment", time: "1h ago" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-1.5"
                style={{ borderBottom: i < 2 ? `1px solid ${c.border}` : "none" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.success }} />
                  <span className="text-[8px]" style={{ color: c.text }}>{item.action}</span>
                </div>
                <span className="text-[7px]" style={{ color: c.text + "44" }}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
