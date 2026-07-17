import type { IntentSignal, IntentSource, IntentTopic } from "@/types";
import { ACCOUNTS } from "@/data/accounts";
import { createRng, daysAgoIso, series } from "@/data/seed";

const rng = createRng(606);

export const INTENT_SOURCES: IntentSource[] = ["Bombora", "6sense", "ZoomInfo", "LinkedIn", "Google"];

const TOPIC_DEFS: { topic: string; category: string }[] = [
  { topic: "Account-Based Marketing Platforms", category: "Category" },
  { topic: "Revenue Operations Software", category: "Category" },
  { topic: "B2B Intent Data Providers", category: "Category" },
  { topic: "Sales Engagement Tools", category: "Category" },
  { topic: "Marketing Attribution", category: "Use Case" },
  { topic: "Customer Data Platform", category: "Category" },
  { topic: "AI Sales Assistant", category: "Emerging" },
  { topic: "Pipeline Forecasting", category: "Use Case" },
  { topic: "Predictive Lead Scoring", category: "Use Case" },
  { topic: "Competitor: 6sense", category: "Competitive" },
  { topic: "Competitor: Demandbase", category: "Competitive" },
  { topic: "Digital Transformation Strategy", category: "Trend" },
  { topic: "CRM Migration", category: "Use Case" },
  { topic: "Marketing Automation Platforms", category: "Category" },
  { topic: "Buyer Intent Signals", category: "Category" },
];

export const INTENT_TOPICS: IntentTopic[] = TOPIC_DEFS.map((def) => ({
  topic: def.topic,
  category: def.category,
  score: rng.int(35, 99),
  trend: Math.round(rng.float(-18, 42) * 10) / 10,
  accounts: rng.int(8, 180),
})).sort((a, b) => b.score - a.score);

export const INTENT_SIGNALS: IntentSignal[] = ACCOUNTS.filter((a) => a.intentScore > 40).map((account, i) => ({
  id: `intent-${i + 1}`,
  accountId: account.id,
  accountName: account.name,
  topic: rng.pick(TOPIC_DEFS).topic,
  score: account.intentScore,
  source: rng.pick(INTENT_SOURCES),
  surge: Math.round(rng.float(5, 180)),
  date: daysAgoIso(rng.int(0, 14)),
}));

export const SURGING_ACCOUNTS = [...INTENT_SIGNALS]
  .sort((a, b) => b.surge - a.surge)
  .slice(0, 10);

export const INTENT_WEEKLY_TREND = series(12, 62, 8, createRng(707));

export const INTENT_SOURCE_BREAKDOWN = INTENT_SOURCES.map((source) => ({
  source,
  signals: rng.int(120, 980),
  share: 0,
})).map((row, _, arr) => {
  const total = arr.reduce((sum, r) => sum + r.signals, 0);
  return { ...row, share: Math.round((row.signals / total) * 1000) / 10 };
});
