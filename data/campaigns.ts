import type { Campaign } from "@/types";
import { createRng, daysAgoIso, daysFromNowIso } from "@/data/seed";

const rng = createRng(505);

const CAMPAIGN_DEFS: { name: string; objective: string; channel: string }[] = [
  { name: "Enterprise ABM Q3 Surge", objective: "Pipeline Generation", channel: "Multi-Channel" },
  { name: "Financial Services Vertical Push", objective: "Account Engagement", channel: "LinkedIn Ads" },
  { name: "Executive Dinner Series", objective: "Relationship Building", channel: "Field Events" },
  { name: "Healthcare Modernization Play", objective: "Pipeline Generation", channel: "Email + Ads" },
  { name: "Renewal Risk Nurture", objective: "Retention", channel: "Email" },
  { name: "Intent Surge Retargeting", objective: "Reengagement", channel: "Display Ads" },
  { name: "Tier 1 Account Direct Mail", objective: "Awareness", channel: "Direct Mail" },
  { name: "Manufacturing ROI Webinar Series", objective: "Demand Generation", channel: "Webinar" },
  { name: "CIO Roundtable Program", objective: "Relationship Building", channel: "Field Events" },
  { name: "Expansion Play - Data Cloud", objective: "Cross-sell / Upsell", channel: "Email + LinkedIn" },
  { name: "Competitive Displacement Campaign", objective: "Pipeline Generation", channel: "Multi-Channel" },
  { name: "Analyst Report Syndication", objective: "Awareness", channel: "Content Syndication" },
];

export const CAMPAIGNS: Campaign[] = CAMPAIGN_DEFS.map((def, i) => {
  const accounts = rng.int(18, 220);
  const meetings = rng.int(4, 60);
  const pipelineInfluenced = rng.int(120, 2400) * 1000;
  const spend = rng.int(8, 120) * 1000;
  return {
    id: `camp-${i + 1}`,
    name: def.name,
    objective: def.objective,
    channel: def.channel,
    status: rng.pick(["Active", "Active", "Paused", "Completed", "Draft"] as const),
    accounts,
    ctr: Math.round(rng.float(0.8, 6.5) * 100) / 100,
    openRate: Math.round(rng.float(18, 62) * 10) / 10,
    meetings,
    pipelineInfluenced,
    revenueInfluenced: Math.round(pipelineInfluenced * rng.float(0.15, 0.5)),
    roi: Math.round(rng.float(1.2, 9.4) * 10) / 10,
    spend,
    startDate: daysAgoIso(rng.int(30, 180)),
    endDate: daysFromNowIso(rng.int(-20, 90)),
  };
});
