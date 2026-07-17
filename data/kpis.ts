import type { KpiDatum } from "@/types";
import { ACCOUNTS } from "@/data/accounts";
import { OPPORTUNITIES } from "@/data/pipeline";
import { createRng, series } from "@/data/seed";

const rng = createRng(1313);

const targetAccounts = ACCOUNTS.length;
const engagedAccounts = ACCOUNTS.filter((a) => a.status !== "Target").length;
const openOpportunities = OPPORTUNITIES.filter((o) => o.stage !== "Closed Won").length;
const closedWon = OPPORTUNITIES.filter((o) => o.stage === "Closed Won");
const totalPipeline = ACCOUNTS.reduce((s, a) => s + a.pipeline, 0);
const totalRevenue = ACCOUNTS.reduce((s, a) => s + a.revenue, 0);
const winRate = Math.round((closedWon.length / OPPORTUNITIES.length) * 1000) / 10;
const avgDealSize = Math.round(
  closedWon.reduce((s, o) => s + o.amount, 0) / Math.max(1, closedWon.length)
);

export const KPIS: KpiDatum[] = [
  { id: "target-accounts", label: "Target Accounts", value: targetAccounts, format: "number", previousValue: targetAccounts - rng.int(2, 8), sparkline: series(10, targetAccounts - 6, 3, rng), icon: "Target" },
  { id: "engaged-accounts", label: "Engaged Accounts", value: engagedAccounts, format: "number", previousValue: engagedAccounts - rng.int(1, 6), sparkline: series(10, engagedAccounts - 5, 3, rng), icon: "Users" },
  { id: "opportunities", label: "Opportunities", value: openOpportunities, format: "number", previousValue: openOpportunities - rng.int(-3, 5), sparkline: series(10, openOpportunities - 4, 2, rng), icon: "Briefcase" },
  { id: "closed-won", label: "Closed Won", value: closedWon.length, format: "number", previousValue: Math.max(0, closedWon.length - rng.int(1, 4)), sparkline: series(10, Math.max(1, closedWon.length - 3), 1.5, rng), icon: "Trophy" },
  { id: "pipeline", label: "Pipeline", value: totalPipeline, format: "currency", previousValue: totalPipeline * rng.float(0.85, 0.97), sparkline: series(10, totalPipeline / 1000 - 400, 80, rng), icon: "TrendingUp" },
  { id: "revenue", label: "Revenue", value: totalRevenue, format: "currency", previousValue: totalRevenue * rng.float(0.82, 0.95), sparkline: series(10, totalRevenue / 1000 - 300, 60, rng), icon: "DollarSign" },
  { id: "win-rate", label: "Win Rate", value: winRate, format: "percent", previousValue: winRate - rng.float(-4, 6), sparkline: series(10, winRate, 3, rng), icon: "Percent" },
  { id: "avg-deal-size", label: "Average Deal Size", value: avgDealSize, format: "currency", previousValue: avgDealSize * rng.float(0.88, 1.05), sparkline: series(10, avgDealSize / 1000, 8, rng), icon: "Wallet" },
  { id: "sales-velocity", label: "Sales Velocity", value: 18400, format: "currency", previousValue: 16200, sparkline: series(10, 17000, 900, rng), icon: "Gauge" },
  { id: "roi", label: "ROI", value: 428, format: "percent", previousValue: 391, sparkline: series(10, 400, 20, rng), icon: "Sparkles" },
];
