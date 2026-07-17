import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Flame,
  Lightbulb,
  Rocket,
  UserX,
  FileText,
  Percent,
  ShieldAlert,
  HeartPulse,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { SeverityBadge } from "@/components/shared/status-badges";
import { EntityAvatar } from "@/components/shared/entity-avatar";
import { EmptyState } from "@/components/shared/empty-state";

import { AI_INSIGHTS, RECOMMENDED_CONTENT } from "@/data/insights";
import type { InsightType } from "@/types";

const GROUPS: { type: InsightType; title: string; description: string; icon: LucideIcon }[] = [
  { type: "risk", title: "Accounts at Risk", description: "Signals suggesting potential churn", icon: AlertTriangle },
  { type: "intent", title: "High Intent Accounts", description: "Accounts actively researching solutions", icon: Flame },
  { type: "action", title: "Next Best Action", description: "AI-recommended next steps", icon: Lightbulb },
  { type: "expansion", title: "Expansion Opportunities", description: "Accounts ready for upsell or cross-sell", icon: Rocket },
  { type: "stakeholder", title: "Stakeholders Missing", description: "Buying committees with coverage gaps", icon: UserX },
  { type: "probability", title: "Probability to Close", description: "Deals with elevated close likelihood", icon: Percent },
  { type: "pipeline-risk", title: "Pipeline Risk", description: "Open deals showing signs of stalling", icon: ShieldAlert },
  { type: "health", title: "Health Alerts", description: "Accounts with declining health scores", icon: HeartPulse },
];

export default function AiInsightsPage() {
  return (
    <div>
      <PageHeader title="AI Insights" description="Automated signals generated from account engagement and intent data" />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {GROUPS.map((group) => {
          const items = AI_INSIGHTS.filter((i) => i.type === group.type);
          return (
            <SectionCard
              key={group.type}
              title={group.title}
              description={group.description}
              actions={<group.icon className="size-4 text-muted-foreground" />}
              contentClassName="space-y-2.5"
            >
              {items.length === 0 ? (
                <EmptyState title="No signals right now" />
              ) : (
                items.map((insight) => (
                  <Link
                    key={insight.id}
                    href={insight.accountId ? `/accounts/${insight.accountId}` : "#"}
                    className="flex items-start gap-3 rounded-lg border border-border/70 p-3 transition-colors hover:bg-accent/40"
                  >
                    {insight.accountName && <EntityAvatar name={insight.accountName} size="sm" shape="square" />}
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <SeverityBadge severity={insight.severity} />
                        {insight.value && <span className="text-xs font-semibold tabular-nums">{insight.value}</span>}
                      </div>
                      <p className="text-sm font-medium leading-snug">{insight.title}</p>
                      <p className="text-xs text-muted-foreground">{insight.description}</p>
                    </div>
                  </Link>
                ))
              )}
            </SectionCard>
          );
        })}

        <SectionCard
          title="Recommended Content"
          description="AI-matched content for active opportunities"
          actions={<FileText className="size-4 text-muted-foreground" />}
          contentClassName="space-y-2.5"
        >
          {RECOMMENDED_CONTENT.map((rec, i) => (
            <div key={i} className="rounded-lg border border-border/70 p-3">
              <p className="text-sm font-medium">{rec.content}</p>
              <p className="text-xs text-muted-foreground">
                For {rec.accountName} · {rec.reason}
              </p>
            </div>
          ))}
        </SectionCard>
      </div>
    </div>
  );
}
