import { createRng } from "@/data/seed";
import { OPPORTUNITIES, PIPELINE_FUNNEL } from "@/data/pipeline";

const rng = createRng(1515);

const openPipeline = OPPORTUNITIES.filter((o) => o.stage !== "Closed Won").reduce((s, o) => s + o.amount, 0);
export const QUARTERLY_QUOTA = 6_200_000;
export const CLOSED_WON_VALUE = OPPORTUNITIES.filter((o) => o.stage === "Closed Won").reduce((s, o) => s + o.amount, 0);
export const PIPELINE_COVERAGE = Math.round((openPipeline / (QUARTERLY_QUOTA - CLOSED_WON_VALUE)) * 100) / 100;
export const QUOTA_GAP = Math.max(0, QUARTERLY_QUOTA - CLOSED_WON_VALUE);
export const QUOTA_ATTAINMENT = Math.round((CLOSED_WON_VALUE / QUARTERLY_QUOTA) * 1000) / 10;

export const AVG_SALES_CYCLE_DAYS = PIPELINE_FUNNEL.filter((s) => s.avgDays > 0).reduce((s, x) => s + x.avgDays, 0);

export const LOST_REASONS = [
  { reason: "Budget constraints", value: 32 },
  { reason: "Chose competitor", value: 24 },
  { reason: "No decision / stalled", value: 18 },
  { reason: "Poor timing", value: 14 },
  { reason: "Missing feature", value: 8 },
  { reason: "Other", value: 4 },
];

export const FORECAST_BY_REP = [
  "Amelia Chen", "Marcus Webb", "Priya Sharma", "Jordan Blake", "Sofia Marin", "Ethan Cole",
].map((name) => {
  const quota = rng.int(700, 1100) * 1000;
  const closed = Math.round(quota * rng.float(0.4, 1.15));
  const bestCase = closed + rng.int(50, 300) * 1000;
  return { name, quota, closed, bestCase };
});

export const WIN_RATE_TREND = Array.from({ length: 8 }).map((_, i) => ({
  label: `Q${(i % 4) + 1}`,
  value: rng.int(28, 52),
}));
