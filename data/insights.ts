import type { AiInsight } from "@/types";
import { ACCOUNTS } from "@/data/accounts";
import { createRng, daysAgoIso } from "@/data/seed";

const rng = createRng(1212);

const atRisk = ACCOUNTS.filter((a) => a.healthStatus === "At Risk" || a.healthStatus === "Critical").slice(0, 6);
const highIntent = [...ACCOUNTS].sort((a, b) => b.intentScore - a.intentScore).slice(0, 6);
const expansionCandidates = ACCOUNTS.filter((a) => a.revenue > 0 && a.engagementScore > 60).slice(0, 5);
const missingStakeholders = ACCOUNTS.filter((a) => a.stakeholderCount <= 3 && a.status !== "Closed Lost").slice(0, 5);
const highProbability = [...ACCOUNTS]
  .filter((a) => a.status === "Proposal" || a.status === "Opportunity")
  .slice(0, 5);
const pipelineRisk = ACCOUNTS.filter((a) => a.pipeline > 200000 && a.engagementScore < 45).slice(0, 5);
const nextBestAction = [...ACCOUNTS]
  .filter((a) => a.status !== "Closed Lost" && a.status !== "Closed Won")
  .sort((a, b) => b.intentScore - a.intentScore)
  .slice(5, 10);
const healthAlerts = ACCOUNTS.filter((a) => a.healthScore < 45 && a.status !== "Closed Lost").slice(0, 5);

function buildInsights(): AiInsight[] {
  const insights: AiInsight[] = [];

  atRisk.forEach((a, i) => {
    insights.push({
      id: `risk-${i}`,
      type: "risk",
      severity: a.healthStatus === "Critical" ? "critical" : "warning",
      title: `${a.name} is at risk of churn`,
      description: `Engagement dropped ${rng.int(20, 55)}% over the last 30 days with no executive contact in ${rng.int(25, 60)} days.`,
      accountId: a.id,
      accountName: a.name,
      value: `Health ${a.healthScore}`,
      createdAt: daysAgoIso(rng.int(0, 5)),
      recommendedAction: "Schedule an executive check-in this week",
    });
  });

  highIntent.forEach((a, i) => {
    insights.push({
      id: `intent-${i}`,
      type: "intent",
      severity: "info",
      title: `${a.name} shows surging buyer intent`,
      description: `Intent score climbed to ${a.intentScore} driven by research on competitive alternatives and pricing pages.`,
      accountId: a.id,
      accountName: a.name,
      value: `Intent ${a.intentScore}`,
      createdAt: daysAgoIso(rng.int(0, 3)),
      recommendedAction: "Trigger intent-based outbound sequence",
    });
  });

  expansionCandidates.forEach((a, i) => {
    insights.push({
      id: `expansion-${i}`,
      type: "expansion",
      severity: "positive",
      title: `${a.name} is a strong expansion candidate`,
      description: `High engagement (${a.engagementScore}) and product usage growth suggest readiness for an upsell conversation.`,
      accountId: a.id,
      accountName: a.name,
      value: `+$${rng.int(40, 220)}K potential`,
      createdAt: daysAgoIso(rng.int(0, 10)),
      recommendedAction: "Introduce Data Cloud add-on to economic buyer",
    });
  });

  missingStakeholders.forEach((a, i) => {
    insights.push({
      id: `stakeholder-${i}`,
      type: "stakeholder",
      severity: "warning",
      title: `${a.name} is missing key stakeholders`,
      description: `Only ${a.stakeholderCount} contact(s) mapped. No economic buyer identified in the buying committee.`,
      accountId: a.id,
      accountName: a.name,
      value: `${a.stakeholderCount} contacts`,
      createdAt: daysAgoIso(rng.int(0, 7)),
      recommendedAction: "Run stakeholder mapping workshop",
    });
  });

  highProbability.forEach((a, i) => {
    insights.push({
      id: `probability-${i}`,
      type: "probability",
      severity: "positive",
      title: `${a.name} has elevated close probability`,
      description: `Deal velocity and stakeholder engagement suggest a ${rng.int(65, 92)}% probability to close this quarter.`,
      accountId: a.id,
      accountName: a.name,
      value: `${rng.int(65, 92)}%`,
      createdAt: daysAgoIso(rng.int(0, 4)),
      recommendedAction: "Prioritize proposal finalization",
    });
  });

  pipelineRisk.forEach((a, i) => {
    insights.push({
      id: `pipeline-risk-${i}`,
      type: "pipeline-risk",
      severity: "critical",
      title: `${a.name} pipeline at risk of slipping`,
      description: `$${Math.round(a.pipeline / 1000)}K in pipeline with declining engagement (${a.engagementScore}) and stalled next steps.`,
      accountId: a.id,
      accountName: a.name,
      value: `$${Math.round(a.pipeline / 1000)}K`,
      createdAt: daysAgoIso(rng.int(0, 6)),
      recommendedAction: "Re-engage champion and confirm timeline",
    });
  });

  nextBestAction.forEach((a, i) => {
    insights.push({
      id: `action-${i}`,
      type: "action",
      severity: "info",
      title: `Next best action for ${a.name}`,
      description: a.nextAction,
      accountId: a.id,
      accountName: a.name,
      value: a.status,
      createdAt: daysAgoIso(rng.int(0, 5)),
      recommendedAction: a.nextAction,
    });
  });

  healthAlerts.forEach((a, i) => {
    insights.push({
      id: `health-${i}`,
      type: "health",
      severity: a.healthScore < 30 ? "critical" : "warning",
      title: `${a.name} health score alert`,
      description: `Health score fell to ${a.healthScore}, driven by reduced stakeholder responsiveness and slower deal progression.`,
      accountId: a.id,
      accountName: a.name,
      value: `Health ${a.healthScore}`,
      createdAt: daysAgoIso(rng.int(0, 4)),
      recommendedAction: "Escalate to Customer Success for a health check-in",
    });
  });

  return insights;
}

export const AI_INSIGHTS: AiInsight[] = buildInsights();

export const RECOMMENDED_CONTENT = [
  { accountName: highIntent[0]?.name ?? "Northwind Logistics", content: "2026 State of Account-Based Marketing", reason: "Matches active research topic" },
  { accountName: highIntent[1]?.name ?? "Vertex Dynamics", content: "The ROI of Intent-Driven Selling", reason: "High fit for economic buyer persona" },
  { accountName: expansionCandidates[0]?.name ?? "Cascade Financial Group", content: "AI Copilot for Revenue Teams", reason: "Expansion use case alignment" },
];
