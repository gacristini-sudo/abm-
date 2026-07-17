import type { AccountStatus, Opportunity, PipelineStageData } from "@/types";
import { ACCOUNTS } from "@/data/accounts";
import { OWNERS, PRODUCTS } from "@/data/companies";
import { createRng, daysAgoIso, daysFromNowIso } from "@/data/seed";

const rng = createRng(404);

export const FUNNEL_STAGES: AccountStatus[] = [
  "Target",
  "Engaged",
  "MQL",
  "SAL",
  "SQL",
  "Opportunity",
  "Proposal",
  "Closed Won",
];

const STAGE_START_COUNTS: Record<AccountStatus, number> = {
  Target: 480,
  Engaged: 340,
  MQL: 245,
  SAL: 178,
  SQL: 126,
  Opportunity: 84,
  Proposal: 52,
  "Closed Won": 31,
  "Closed Lost": 0,
};

const STAGE_AVG_DAYS: Record<AccountStatus, number> = {
  Target: 14,
  Engaged: 11,
  MQL: 9,
  SAL: 7,
  SQL: 15,
  Opportunity: 21,
  Proposal: 12,
  "Closed Won": 0,
  "Closed Lost": 0,
};

const STAGE_VALUE_PER_ACCOUNT: Record<AccountStatus, number> = {
  Target: 0,
  Engaged: 0,
  MQL: 42000,
  SAL: 68000,
  SQL: 95000,
  Opportunity: 140000,
  Proposal: 165000,
  "Closed Won": 185000,
  "Closed Lost": 0,
};

export const PIPELINE_FUNNEL: PipelineStageData[] = FUNNEL_STAGES.map((stage, i) => {
  const count = STAGE_START_COUNTS[stage];
  const prevCount = i === 0 ? count : STAGE_START_COUNTS[FUNNEL_STAGES[i - 1]];
  return {
    stage,
    count,
    value: count * STAGE_VALUE_PER_ACCOUNT[stage],
    avgDays: STAGE_AVG_DAYS[stage],
    conversionRate: i === 0 ? 100 : Math.round((count / prevCount) * 1000) / 10,
  };
});

const OPP_NAME_SUFFIXES = [
  "Platform Expansion",
  "Enterprise Rollout",
  "Renewal + Upsell",
  "Net-New Deployment",
  "Multi-Year Agreement",
  "Analytics Add-on",
  "Global Rollout",
  "Department Pilot",
];

const activeAccounts = ACCOUNTS.filter(
  (a) => a.status !== "Target" && a.status !== "Engaged" && a.status !== "Closed Lost"
);

export const OPPORTUNITIES: Opportunity[] = activeAccounts.map((account, i) => {
  const stage: AccountStatus = ["MQL", "SAL", "SQL", "Opportunity", "Proposal", "Closed Won"].includes(
    account.status
  )
    ? account.status
    : "Opportunity";
  return {
    id: `opp-${i + 1}`,
    accountId: account.id,
    accountName: account.name,
    name: `${account.name.split(" ")[0]} ${rng.pick(OPP_NAME_SUFFIXES)}`,
    stage,
    amount: account.pipeline || rng.int(40, 400) * 1000,
    probability: stage === "Closed Won" ? 100 : rng.int(10, 90),
    owner: rng.pick(OWNERS).name,
    closeDate: daysFromNowIso(rng.int(-10, 90)),
    createdDate: daysAgoIso(rng.int(20, 200)),
    product: rng.pick(PRODUCTS),
  };
});

export function getOpportunitiesByAccount(accountId: string): Opportunity[] {
  return OPPORTUNITIES.filter((o) => o.accountId === accountId);
}
