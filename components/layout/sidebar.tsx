"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsLeft, ChevronsRight, Boxes } from "lucide-react";

import { NAV_SECTIONS } from "@/data/nav";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/hooks/use-ui-store";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SidebarNav({
  onNavigate,
  forceExpanded = false,
}: {
  onNavigate?: () => void;
  forceExpanded?: boolean;
}) {
  const pathname = usePathname();
  const collapsedState = useUiStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const collapsed = forceExpanded ? false : collapsedState;

  return (
    <div className="flex h-full flex-col">
      <div
        className={cn(
          "flex h-14 items-center gap-2 border-b border-sidebar-border px-4",
          collapsed && "justify-center px-2"
        )}
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Boxes className="size-4.5" />
        </div>
        {!collapsed && (
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Meridian ABM</span>
            <span className="text-[11px] text-muted-foreground">Enterprise Suite</span>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 py-3">
        {NAV_SECTIONS.map((section, si) => (
          <div key={si} className="mb-4">
            {section.label && !collapsed && (
              <div className="px-2 pb-1.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                {section.label}
              </div>
            )}
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const active = isActive(pathname, item.href);
                const link = (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                      collapsed && "justify-center px-2",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                    )}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-sidebar-primary" />
                    )}
                    <item.icon className={cn("size-4.5 shrink-0", active && "text-sidebar-primary")} />
                    {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
                if (collapsed) {
                  return (
                    <Tooltip key={item.href}>
                      <TooltipTrigger asChild>{link}</TooltipTrigger>
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    </Tooltip>
                  );
                }
                return link;
              })}
            </div>
          </div>
        ))}
      </nav>

      {!forceExpanded && (
        <div className="border-t border-sidebar-border p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className={cn("w-full text-sidebar-foreground/70 hover:text-sidebar-foreground", collapsed && "px-0")}
          >
            {collapsed ? <ChevronsRight className="size-4" /> : (
              <>
                <ChevronsLeft className="size-4" />
                <span>Collapse</span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 hidden border-r border-sidebar-border bg-sidebar transition-[width] duration-200 md:flex",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarNav />
    </aside>
  );
}
