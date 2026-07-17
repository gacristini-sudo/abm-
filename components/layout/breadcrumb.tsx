"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

import { ALL_NAV_ITEMS } from "@/data/nav";
import { getAccountById } from "@/data/accounts";
import { cn } from "@/lib/utils";

function labelForSegment(segments: string[], index: number): string {
  const path = "/" + segments.slice(0, index + 1).join("/");
  const navItem = ALL_NAV_ITEMS.find((n) => n.href === path);
  if (navItem) return navItem.label;

  const segment = segments[index];
  if (segments[0] === "accounts" && index === 1) {
    const account = getAccountById(segment);
    if (account) return account.name;
  }
  return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
}

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
        <Home className="size-3.5" />
      </Link>
      {segments.map((segment, i) => {
        const path = "/" + segments.slice(0, i + 1).join("/");
        const isLast = i === segments.length - 1;
        return (
          <span key={path} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5 opacity-50" />
            {isLast ? (
              <span className={cn("font-medium text-foreground truncate max-w-[220px]")}>
                {labelForSegment(segments, i)}
              </span>
            ) : (
              <Link href={path} className="hover:text-foreground transition-colors truncate max-w-[160px]">
                {labelForSegment(segments, i)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
