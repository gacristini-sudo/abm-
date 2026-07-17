import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Manual compact formatting (not Intl notation:"compact") because Node's bundled
// ICU and browser ICU can round compact numbers differently, causing SSR/CSR
// hydration mismatches for the exact same input value.
function compactSuffix(value: number): { divided: number; suffix: string } {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return { divided: value / 1_000_000_000, suffix: "B" };
  if (abs >= 1_000_000) return { divided: value / 1_000_000, suffix: "M" };
  if (abs >= 1_000) return { divided: value / 1_000, suffix: "K" };
  return { divided: value, suffix: "" };
}

export function formatCurrency(value: number, compact = true): string {
  if (compact && Math.abs(value) >= 1000) {
    const { divided, suffix } = compactSuffix(value);
    const rounded = Math.round(divided * 10) / 10;
    return `$${rounded.toFixed(rounded % 1 === 0 ? 0 : 1)}${suffix}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, compact = true): string {
  if (compact && Math.abs(value) >= 1000) {
    const { divided, suffix } = compactSuffix(value);
    const rounded = Math.round(divided * 10) / 10;
    return `${rounded.toFixed(rounded % 1 === 0 ? 0 : 1)}${suffix}`;
  }
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(value);
}

export function formatPercent(value: number, digits = 1): string {
  return `${value >= 0 ? "" : ""}${value.toFixed(digits)}%`;
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

// Explicit UTC timeZone so SSR (Node) and CSR (browser, arbitrary local TZ) agree.
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
    ...options,
  }).format(d);
}

export function relativeTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.round(months / 12)}y ago`;
}
