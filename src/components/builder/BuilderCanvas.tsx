"use client";

import { useActiveTheme } from "@/hooks/useTheme";
import { MobilePreview } from "@/components/preview/MobilePreview";
import { WebPreview } from "@/components/preview/WebPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Monitor } from "lucide-react";

export function BuilderCanvas() {
  const { activeTheme } = useActiveTheme();
  const c = activeTheme.colors;

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: c.border, backgroundColor: c.background }}
    >
      <Tabs defaultValue="web" className="w-full">
        <div
          className="flex items-center justify-between px-3 py-1.5 border-b"
          style={{ borderColor: c.border, backgroundColor: c.surface }}
        >
          <span className="text-[10px] font-medium" style={{ color: c.text + "88" }}>
            Live Preview — <span style={{ color: c.primary }}>{activeTheme.name}</span>
          </span>
          <TabsList className="h-6">
            <TabsTrigger value="web" className="text-[10px] px-2 py-0.5 h-5 gap-1">
              <Monitor className="w-3 h-3" />
              Web
            </TabsTrigger>
            <TabsTrigger value="mobile" className="text-[10px] px-2 py-0.5 h-5 gap-1">
              <Smartphone className="w-3 h-3" />
              Mobile
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="web" className="mt-0">
          <div className="max-w-full overflow-hidden">
            <WebPreview />
          </div>
        </TabsContent>

        <TabsContent value="mobile" className="mt-0">
          <div className="flex justify-center p-4">
            <MobilePreview />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
