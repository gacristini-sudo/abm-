import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { KpiCard } from "@/components/shared/kpi-card";
import { SectionCard } from "@/components/shared/section-card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { PipelineFunnel } from "@/components/charts/pipeline-funnel";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { SeverityBadge } from "@/components/shared/status-badges";
import { Button } from "@/components/ui/button";

import { KPIS } from "@/data/kpis";
import { REVENUE_BY_MONTH } from "@/data/revenue";
import { PIPELINE_FUNNEL } from "@/data/pipeline";
import { TIMELINE_EVENTS } from "@/data/timeline";
import { AI_INSIGHTS } from "@/data/insights";
import { resolveIcon } from "@/lib/icon-map";

const ACCENTS = ["#2a78d6", "#008300", "#e87ba4", "#eda100", "#1baf7a", "#eb6834", "#4a3aa7", "#e34948", "#2a78d6", "#1baf7a"];

const recentActivity = [...TIMELINE_EVENTS]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 8);

const topInsights = AI_INSIGHTS.filter((i) => i.severity === "critical" || i.severity === "warning").slice(0, 5);

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Executive Dashboard"
        description="Real-time view of your account-based marketing performance."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download /> Export
            </Button>
            <Button size="sm" asChild>
              <Link href="/ai-insights">
                AI Insights <ArrowRight />
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {KPIS.map((kpi, i) => (
          <KpiCard key={kpi.id} kpi={kpi} icon={resolveIcon(kpi.icon)} accentColor={ACCENTS[i % ACCENTS.length]} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard
          title="Revenue Performance"
          description="Actual revenue vs. target and forecast"
          className="xl:col-span-2"
          actions={
            <Button variant="ghost" size="sm" asChild>
              <Link href="/revenue">
                View details <ArrowRight />
              </Link>
            </Button>
          }
        >
          <RevenueChart data={REVENUE_BY_MONTH} />
        </SectionCard>

        <SectionCard
          title="AI Insights"
          description="Highest priority signals this week"
          actions={
            <Button variant="ghost" size="sm" asChild>
              <Link href="/ai-insights">
                View all <ArrowRight />
              </Link>
            </Button>
          }
          contentClassName="space-y-3"
        >
          {topInsights.map((insight) => (
            <Link
              key={insight.id}
              href={insight.accountId ? `/accounts/${insight.accountId}` : "/ai-insights"}
              className="flex flex-col gap-1.5 rounded-lg border border-border/70 p-3 transition-colors hover:bg-accent/40"
            >
              <div className="flex items-center justify-between gap-2">
                <SeverityBadge severity={insight.severity} />
                {insight.value && <span className="text-xs font-medium tabular-nums">{insight.value}</span>}
              </div>
              <p className="text-sm font-medium leading-snug">{insight.title}</p>
            </Link>
          ))}
        </SectionCard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard
          title="Pipeline Snapshot"
          description="Target through Closed Won across all accounts"
          className="xl:col-span-2"
          actions={
            <Button variant="ghost" size="sm" asChild>
              <Link href="/pipeline">
                Full pipeline <ArrowRight />
              </Link>
            </Button>
          }
        >
          <PipelineFunnel stages={PIPELINE_FUNNEL} />
        </SectionCard>

        <SectionCard
          title="Recent Activity"
          description="Latest engagement across accounts"
          actions={
            <Button variant="ghost" size="sm" asChild>
              <Link href="/accounts">
                All accounts <ArrowRight />
              </Link>
            </Button>
          }
        >
          <ActivityFeed events={recentActivity} />
        </SectionCard>
      </div>
    </div>
  );
}
