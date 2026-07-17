"use client";

import { Bell, Sparkles, Activity, Info } from "lucide-react";

import { NOTIFICATIONS } from "@/data/notifications";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const ICONS = {
  insight: Sparkles,
  activity: Activity,
  system: Info,
};

export function NotificationsMenu() {
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="size-4.5" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 flex size-2 rounded-full bg-destructive ring-2 ring-background" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5">
          <span className="text-sm font-semibold">Notifications</span>
          <span className="text-xs text-muted-foreground">{unread} unread</span>
        </div>
        <div className="max-h-80 overflow-y-auto scrollbar-thin">
          {NOTIFICATIONS.map((n) => {
            const Icon = ICONS[n.type];
            return (
              <div
                key={n.id}
                className={cn(
                  "flex gap-3 border-b border-border/60 px-3.5 py-3 last:border-0 hover:bg-accent/40 transition-colors",
                  !n.read && "bg-primary/5"
                )}
              >
                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Icon className="size-3.5 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-0.5">
                  <p className="text-sm font-medium leading-tight">{n.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{n.description}</p>
                  <p className="text-[11px] text-muted-foreground/70">{n.time}</p>
                </div>
                {!n.read && <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />}
              </div>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
