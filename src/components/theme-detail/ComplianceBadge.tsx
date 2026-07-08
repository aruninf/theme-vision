"use client";

import { useActiveTheme } from "@/hooks/useTheme";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export function ComplianceBadge() {
  const { activeTheme: theme } = useActiveTheme();
  const a11y = theme.accessibility;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Accessibility Score</span>
        <span
          className="text-2xl font-bold"
          style={{
            color:
              a11y.score >= 90
                ? "var(--theme-success)"
                : a11y.score >= 80
                  ? "var(--theme-warning)"
                  : "var(--theme-error)",
          }}
        >
          {a11y.score}
        </span>
      </div>

      <div className="h-2 rounded-full bg-accent/50 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${a11y.score}%`,
            backgroundColor:
              a11y.score >= 90
                ? "var(--theme-success)"
                : a11y.score >= 80
                  ? "var(--theme-warning)"
                  : "var(--theme-error)",
          }}
        />
      </div>

      <div className="space-y-2">
        {[
          { label: "WCAG AA Compliant", pass: a11y.wcagAA },
          { label: "WCAG AAA Compliant", pass: a11y.wcagAAA },
          { label: "Color Blind Friendly", pass: a11y.colorBlindFriendly },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{item.label}</span>
            {item.pass ? (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Contrast Rating</span>
        <Badge
          variant="outline"
          className="text-[10px]"
          style={{
            borderColor:
              a11y.contrastRating === "Excellent"
                ? "var(--theme-success)"
                : a11y.contrastRating === "Good"
                  ? "var(--theme-warning)"
                  : "var(--theme-error)",
            color:
              a11y.contrastRating === "Excellent"
                ? "var(--theme-success)"
                : a11y.contrastRating === "Good"
                  ? "var(--theme-warning)"
                  : "var(--theme-error)",
          }}
        >
          {a11y.contrastRating}
        </Badge>
      </div>
    </div>
  );
}
