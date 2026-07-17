"use client";

import { Plus } from "lucide-react";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import { GlobalSearchTrigger } from "@/components/layout/command-palette";
import { NotificationsMenu } from "@/components/layout/notifications";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function TopBar() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <MobileNav />
      <Breadcrumb />
      <div className="flex-1" />
      <div className="hidden sm:block">
        <GlobalSearchTrigger />
      </div>
      <Button size="sm" className="hidden md:inline-flex">
        <Plus /> New Account
      </Button>
      <Separator orientation="vertical" className="hidden h-6 md:block" />
      <NotificationsMenu />
      <ThemeToggle />
      <Separator orientation="vertical" className="h-6" />
      <UserMenu />
    </header>
  );
}
