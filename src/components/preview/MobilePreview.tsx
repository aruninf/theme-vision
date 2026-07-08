"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveTheme } from "@/hooks/useTheme";
import { ChevronLeft, MoreVertical, Bell, Home, Search, User, Settings, ShoppingBag, Heart, Star } from "lucide-react";

type Screen = "splash" | "login" | "home" | "dashboard" | "profile" | "settings" | "product";

const screens: Screen[] = ["splash", "login", "home", "dashboard", "profile", "settings", "product"];

function SplashScreen() {
  const { activeTheme } = useActiveTheme();
  return (
    <div
      className="flex flex-col items-center justify-center h-full"
      style={{ backgroundColor: activeTheme.colors.background }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center"
        style={{ backgroundColor: activeTheme.colors.primary }}
      >
        <ShoppingBag className="w-8 h-8 text-white" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-bold"
        style={{ color: activeTheme.colors.text }}
      >
        BrandStore
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs mt-1"
        style={{ color: activeTheme.colors.text + "99" }}
      >
        Premium Shopping Experience
      </motion.p>
    </div>
  );
}

function LoginScreen() {
  const { activeTheme } = useActiveTheme();
  const c = activeTheme.colors;
  return (
    <div className="flex flex-col p-5 h-full" style={{ backgroundColor: c.background }}>
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: c.primary }}>
          <ShoppingBag className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold" style={{ color: c.text }}>Welcome back</h2>
        <p className="text-xs mt-1" style={{ color: c.text + "99" }}>Sign in to continue shopping</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-3">
        <div>
          <p className="text-[10px] font-medium mb-1" style={{ color: c.text + "99" }}>Email</p>
          <div className="h-9 rounded-lg px-3 flex items-center text-xs" style={{ backgroundColor: c.surface, border: `1px solid ${c.border}`, color: c.text }}>
            hello@example.com
          </div>
        </div>
        <div>
          <p className="text-[10px] font-medium mb-1" style={{ color: c.text + "99" }}>Password</p>
          <div className="h-9 rounded-lg px-3 flex items-center text-xs" style={{ backgroundColor: c.surface, border: `1px solid ${c.border}`, color: c.text }}>
            ••••••••
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-auto space-y-2">
        <div className="h-9 rounded-lg flex items-center justify-center text-xs font-medium text-white" style={{ backgroundColor: c.primary }}>
          Sign In
        </div>
        <p className="text-[10px] text-center" style={{ color: c.text + "66" }}>
          Don&apos;t have an account? <span style={{ color: c.primary }}>Sign up</span>
        </p>
      </motion.div>
    </div>
  );
}

function HomeScreen() {
  const { activeTheme } = useActiveTheme();
  const c = activeTheme.colors;
  const items = [
    { name: "Classic White", price: "$89", color: "#f5f5f5" },
    { name: "Urban Black", price: "$99", color: "#222" },
    { name: "Ocean Blue", price: "$79", color: "#1e40af" },
    { name: "Forest Green", price: "$85", color: "#166534" },
  ];

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: c.background }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${c.border}` }}>
        <h1 className="text-sm font-bold" style={{ color: c.text }}>Discover</h1>
        <div className="flex items-center gap-3">
          <Heart className="w-4 h-4" style={{ color: c.text + "99" }} />
          <Bell className="w-4 h-4" style={{ color: c.text + "99" }} />
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-4">
        <div className="flex gap-2 mb-4">
          {["All", "New", "Popular", "Sale"].map((tab) => (
            <button
              key={tab}
              className="px-3 py-1 rounded-full text-[10px] font-medium"
              style={{
                backgroundColor: tab === "All" ? c.primary : c.surface,
                color: tab === "All" ? "#fff" : c.text + "99",
                border: `1px solid ${c.border}`,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: c.card, border: `1px solid ${c.border}` }}
            >
              <div className="h-16 flex items-center justify-center" style={{ backgroundColor: item.color }}>
                <ShoppingBag className="w-5 h-5" style={{ color: item.color === "#f5f5f5" ? "#333" : "#fff", opacity: 0.5 }} />
              </div>
              <div className="p-2">
                <p className="text-[10px] font-medium truncate" style={{ color: c.text }}>{item.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs font-bold" style={{ color: c.primary }}>{item.price}</p>
                  <Star className="w-3 h-3" style={{ color: c.warning, fill: c.warning }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-around px-8 py-2" style={{ borderTop: `1px solid ${c.border}`, backgroundColor: c.surface }}>
        {[Home, Search, ShoppingBag, User].map((Icon, i) => (
          <Icon
            key={i}
            className="w-4 h-4"
            style={{ color: i === 0 ? c.primary : c.text + "66" }}
          />
        ))}
      </div>
    </div>
  );
}

function DashboardScreen() {
  const { activeTheme } = useActiveTheme();
  const c = activeTheme.colors;
  return (
    <div className="flex flex-col h-full p-4" style={{ backgroundColor: c.background }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold" style={{ color: c.text }}>Dashboard</h2>
        <span className="text-[10px]" style={{ color: c.text + "66" }}>Last 30 days</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { label: "Revenue", value: "$12,450", change: "+12.5%" },
          { label: "Users", value: "1,847", change: "+8.2%" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-3"
            style={{ backgroundColor: c.card, border: `1px solid ${c.border}` }}
          >
            <p className="text-[10px]" style={{ color: c.text + "66" }}>{stat.label}</p>
            <p className="text-sm font-bold mt-1" style={{ color: c.text }}>{stat.value}</p>
            <p className="text-[10px] font-medium" style={{ color: c.success }}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div
        className="flex-1 rounded-xl p-4 flex flex-col"
        style={{ backgroundColor: c.card, border: `1px solid ${c.border}` }}
      >
        <p className="text-[10px] font-medium mb-3" style={{ color: c.text + "66" }}>Recent Activity</p>
        {[
          { action: "New sale", detail: "Urban Black - $99", time: "2m ago" },
          { action: "New user", detail: "Sarah K. joined", time: "15m ago" },
          { action: "Review", detail: "5★ on Classic White", time: "1h ago" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-2"
            style={{ borderBottom: i < 2 ? `1px solid ${c.border}` : "none" }}
          >
            <div>
              <p className="text-[11px] font-medium" style={{ color: c.text }}>{item.action}</p>
              <p className="text-[9px]" style={{ color: c.text + "66" }}>{item.detail}</p>
            </div>
            <span className="text-[9px]" style={{ color: c.text + "44" }}>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen() {
  const { activeTheme } = useActiveTheme();
  const c = activeTheme.colors;
  return (
    <div className="flex flex-col h-full p-4" style={{ backgroundColor: c.background }}>
      <div className="flex items-center justify-center mb-6">
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white" style={{ backgroundColor: c.primary }}>
          JD
        </div>
      </div>
      <p className="text-sm font-bold text-center" style={{ color: c.text }}>Jane Doe</p>
      <p className="text-[10px] text-center mb-4" style={{ color: c.text + "66" }}>jane@example.com</p>

      {["My Orders", "Wishlist", "Addresses", "Payment Methods", "Help Center"].map((item, i) => (
        <div
          key={item}
          className="flex items-center justify-between py-2.5 px-3 rounded-lg mb-1"
          style={{ backgroundColor: c.surface, border: `1px solid ${c.border}` }}
        >
          <span className="text-[11px] font-medium" style={{ color: c.text }}>{item}</span>
          <ChevronLeft className="w-3 h-3 rotate-180" style={{ color: c.text + "44" }} />
        </div>
      ))}
    </div>
  );
}

function SettingsScreen() {
  const { activeTheme } = useActiveTheme();
  const c = activeTheme.colors;
  return (
    <div className="flex flex-col h-full p-4" style={{ backgroundColor: c.background }}>
      <h2 className="text-sm font-bold mb-4" style={{ color: c.text }}>Settings</h2>
      {[
        { label: "Notifications", value: "On" },
        { label: "Dark Mode", value: "On" },
        { label: "Language", value: "English" },
        { label: "Currency", value: "USD" },
      ].map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between py-2.5 px-3 rounded-lg mb-1"
          style={{ backgroundColor: c.surface, border: `1px solid ${c.border}` }}
        >
          <span className="text-[11px] font-medium" style={{ color: c.text }}>{item.label}</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px]" style={{ color: c.text + "66" }}>{item.value}</span>
            <div
              className="w-7 h-4 rounded-full p-0.5"
              style={{ backgroundColor: item.value === "On" ? c.primary : c.border }}
            >
              <div
                className="w-3 h-3 rounded-full bg-white"
                style={{ marginLeft: item.value === "On" ? "auto" : "0" }}
              />
            </div>
          </div>
        </div>
      ))}
      <div
        className="mt-auto rounded-xl p-3"
        style={{ backgroundColor: c.error + "15", border: `1px solid ${c.error}30` }}
      >
        <p className="text-[10px] font-medium" style={{ color: c.error }}>Sign Out</p>
      </div>
    </div>
  );
}

function ProductScreen() {
  const { activeTheme } = useActiveTheme();
  const c = activeTheme.colors;
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: c.background }}>
      <div className="h-24 flex items-center justify-center" style={{ backgroundColor: c.surface }}>
        <ShoppingBag className="w-7 h-7" style={{ color: c.text + "33" }} />
      </div>
      <div className="flex-1 p-4">
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3" style={{ color: c.warning, fill: c.warning }} />
          ))}
          <span className="text-[10px] ml-1" style={{ color: c.text + "66" }}>(124)</span>
        </div>
        <h2 className="text-sm font-bold" style={{ color: c.text }}>Urban Black Sneakers</h2>
        <p className="text-[10px] mt-1 leading-relaxed" style={{ color: c.text + "99" }}>
          Premium black sneakers with comfortable cushioning and modern design.
        </p>
        <p className="text-lg font-bold mt-3" style={{ color: c.primary }}>$99.00</p>

        <div className="flex gap-1.5 mt-3">
          {["S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              className="w-7 h-7 rounded-lg text-[10px] font-medium"
              style={{
                backgroundColor: size === "M" ? c.primary : c.surface,
                color: size === "M" ? "#fff" : c.text,
                border: `1px solid ${size === "M" ? c.primary : c.border}`,
              }}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-3">
          <div className="h-9 rounded-lg flex items-center justify-center text-xs font-medium text-white" style={{ backgroundColor: c.primary }}>
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
}

const screenComponents: Record<Screen, React.FC> = {
  splash: SplashScreen,
  login: LoginScreen,
  home: HomeScreen,
  dashboard: DashboardScreen,
  profile: ProfileScreen,
  settings: SettingsScreen,
  product: ProductScreen,
};

export function MobilePreview() {
  const [screen, setScreen] = useState<Screen>("home");
  const { activeTheme } = useActiveTheme();
  const c = activeTheme.colors;
  const ScreenComponent = screenComponents[screen];

  return (
    <div className="flex flex-col">
      {/* Phone frame */}
      <div className="mx-auto w-full max-w-[280px]">
        {/* Notch area */}
        <div
          className="flex items-center justify-between px-4 py-1.5 text-[9px]"
          style={{ backgroundColor: c.background, color: c.text }}
        >
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-1.5 rounded-sm" style={{ border: `0.5px solid ${c.text}`, position: "relative", overflow: "hidden" }}>
              <div className="absolute inset-0" style={{ backgroundColor: c.text, width: "70%" }} />
            </div>
          </div>
        </div>

        {/* Screen type tabs */}
        <div
          className="flex gap-1 px-2 py-1.5 overflow-x-auto"
          style={{ backgroundColor: c.background, borderBottom: `1px solid ${c.border}` }}
        >
          {screens.map((s) => (
            <button
              key={s}
              onClick={() => setScreen(s)}
              className="px-2 py-0.5 rounded text-[9px] font-medium capitalize whitespace-nowrap transition-all"
              style={{
                backgroundColor: screen === s ? c.primary + "20" : "transparent",
                color: screen === s ? c.primary : c.text + "66",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Screen content */}
        <div className="h-[460px] overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <ScreenComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center py-2" style={{ backgroundColor: c.background }}>
          <div className="w-16 h-1 rounded-full" style={{ backgroundColor: c.border }} />
        </div>
      </div>
    </div>
  );
}
