"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/topbar";
import { CommandPalette } from "@/components/layout/command-palette";
import { useUiStore } from "@/hooks/use-ui-store";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className={cn("flex min-h-screen flex-col transition-[margin] duration-200", collapsed ? "md:ml-16" : "md:ml-64")}>
        <TopBar />
        <main className="flex-1 px-4 py-5 md:px-6 md:py-6">
          <div className="mx-auto w-full max-w-[1600px] animate-fade-in">{children}</div>
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
