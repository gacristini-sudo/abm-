"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";

const OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function AppearanceSection() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  return (
    <div className="max-w-xl space-y-3">
      <p className="text-sm text-muted-foreground">Choose how Meridian ABM looks on this device.</p>
      <div className="grid grid-cols-3 gap-3">
        {OPTIONS.map((opt) => {
          const active = mounted && theme === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setTheme(opt.value)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-colors",
                active ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:bg-accent/40"
              )}
            >
              <opt.icon className="size-5" />
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
