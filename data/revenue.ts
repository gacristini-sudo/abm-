import type { RevenuePoint } from "@/types";
import { createRng } from "@/data/seed";
import { CAMPAIGNS } from "@/data/campaigns";
import { ACCOUNTS } from "@/data/accounts";

const rng = createRng(1010);

const MONTHS = [
  "Aug 2025", "Sep 2025", "Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026",
  "Feb 2026", "Mar 2026", "Apr 2026", "May 2026", "Jun 2026", "Jul 2026",
];

let base = 620000;
export const REVENUE_BY_MONTH: RevenuePoint[] = MONTHS.map((month, i) => {
  base = Math.max(300000, base + rng.int(-40000, 95000));
  const target = base * rng.float(0.9, 1.05);
  const forecast = i >= 9 ? base * rng.float(1.02, 1.18) : base;
  return {
    month,
    revenue: Math.round(base),
    target: Math.round(target),
    forecast: Math.round(forecast),
  };
});

export const REVENUE_BY_CAMPAIGN = CAMPAIGNS.map((c) => ({
  name: c.name,
  revenue: c.revenueInfluenced,
})).sort((a, b) => b.revenue - a.revenue).slice(0, 8);

export const REVENUE_BY_SEGMENT = ["Enterprise", "Mid-Market", "Growth"].map((segment) => ({
  segment,
  revenue: ACCOUNTS.filter((a) => a.segment === segment).reduce((s, a) => s + a.revenue, 0),
}));

export const REVENUE_BY_PRODUCT = [
  { product: "Platform Core", revenue: 4200000 },
  { product: "Analytics Suite", revenue: 2100000 },
  { product: "Automation Add-on", revenue: 1350000 },
  { product: "Enterprise Connect", revenue: 980000 },
  { product: "AI Copilot", revenue: 1620000 },
  { product: "Data Cloud", revenue: 1120000 },
];

export const REVENUE_ATTRIBUTION = [
  { channel: "Multi-Touch ABM", value: 38 },
  { channel: "Outbound SDR", value: 22 },
  { channel: "Field Events", value: 16 },
  { channel: "Content Syndication", value: 12 },
  { channel: "Paid Ads", value: 8 },
  { channel: "Other", value: 4 },
];
