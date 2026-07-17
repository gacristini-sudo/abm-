"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { useUiStore } from "@/hooks/use-ui-store";
import { ALL_NAV_ITEMS } from "@/data/nav";
import { ACCOUNTS } from "@/data/accounts";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { EntityAvatar } from "@/components/shared/entity-avatar";
import { Badge } from "@/components/ui/badge";

export function CommandPalette() {
  const router = useRouter();
  const open = useUiStore((s) => s.commandPaletteOpen);
  const setOpen = useUiStore((s) => s.setCommandPaletteOpen);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  const runCommand = React.useCallback(
    (callback: () => void) => {
      setOpen(false);
      callback();
    },
    [setOpen]
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search accounts, pages, actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {ALL_NAV_ITEMS.map((item) => (
            <CommandItem
              key={item.href}
              value={item.label}
              onSelect={() => runCommand(() => router.push(item.href))}
            >
              <item.icon className="text-muted-foreground" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Accounts">
          {ACCOUNTS.slice(0, 8).map((account) => (
            <CommandItem
              key={account.id}
              value={account.name}
              onSelect={() => runCommand(() => router.push(`/accounts/${account.id}`))}
            >
              <EntityAvatar name={account.name} size="xs" shape="square" />
              <span>{account.name}</span>
              <Badge variant="outline" className="ml-auto">
                {account.tier}
              </Badge>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function GlobalSearchTrigger() {
  const setOpen = useUiStore((s) => s.setCommandPaletteOpen);
  return (
    <button
      onClick={() => setOpen(true)}
      className="flex h-9 w-full max-w-sm items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-accent/40"
    >
      <Search className="size-4" />
      <span className="flex-1 text-left">Search accounts, pages...</span>
      <CommandShortcut className="ml-0">
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px]">⌘K</kbd>
      </CommandShortcut>
    </button>
  );
}
