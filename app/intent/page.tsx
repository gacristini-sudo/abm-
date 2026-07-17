import Link from "next/link";
import { Activity, Flame, Radar as RadarIcon, TrendingUp } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { ScoreBar } from "@/components/shared/score-bar";
import { DonutChart } from "@/components/charts/donut-chart";
import { TrendAreaChart } from "@/components/charts/trend-area-chart";
import { Badge } from "@/components/ui/badge";
import { EntityAvatar } from "@/components/shared/entity-avatar";

import { INTENT_TOPICS, SURGING_ACCOUNTS, INTENT_WEEKLY_TREND, INTENT_SOURCE_BREAKDOWN, INTENT_SIGNALS } from "@/data/intent";

const weeklyTrendData = INTENT_WEEKLY_TREND.map((value, i) => ({ label: `W${i + 1}`, value }));
const avgIntent = Math.round(INTENT_SIGNALS.reduce((s, i) => s + i.score, 0) / INTENT_SIGNALS.length);

const summary = [
  { id: "signals", label: "Active Intent Signals", value: String(INTENT_SIGNALS.length), icon: Activity },
  { id: "avg", label: "Average Intent Score", value: String(avgIntent), icon: RadarIcon },
  { id: "surging", label: "Surging Accounts", value: String(SURGING_ACCOUNTS.length), icon: Flame },
  { id: "topic", label: "Top Topic", value: INTENT_TOPICS[0].topic, icon: TrendingUp },
];

export default function IntentDataPage() {
  return (
    <div>
      <PageHeader title="Intent Data" description="Buyer intent signals aggregated across all providers" />

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((k) => (
          <div key={k.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <k.icon className="size-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{k.label}</p>
              <p className="truncate text-lg font-semibold tabular-nums">{k.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard title="Weekly Intent Evolution" description="Aggregate intent score across target accounts" className="xl:col-span-2">
          <TrendAreaChart data={weeklyTrendData} />
        </SectionCard>
        <SectionCard title="Signal Source" description="Where intent data originates">
          <DonutChart data={INTENT_SOURCE_BREAKDOWN.map((s) => ({ label: s.source, value: s.signals }))} format="number" height={220} />
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard title="Top Topics" description="Highest scoring research topics this month" contentClassName="space-y-3.5">
          {INTENT_TOPICS.slice(0, 10).map((t) => (
            <div key={t.topic} className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium">{t.topic}</span>
                <span className={`text-xs font-medium ${t.trend >= 0 ? "text-success" : "text-destructive"}`}>
                  {t.trend >= 0 ? "+" : ""}{t.trend}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ScoreBar value={t.score} className="flex-1" />
                <Badge variant="outline" className="shrink-0">{t.accounts} accts</Badge>
              </div>
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Surging Accounts" description="Largest week-over-week intent increases" contentClassName="space-y-1">
          {SURGING_ACCOUNTS.map((s) => (
            <Link
              key={s.id}
              href={`/accounts/${s.accountId}`}
              className="flex items-center gap-3 rounded-lg px-2 py-2 -mx-2 transition-colors hover:bg-accent/40"
            >
              <EntityAvatar name={s.accountName} shape="square" size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{s.accountName}</p>
                <p className="truncate text-xs text-muted-foreground">{s.topic} · {s.source}</p>
              </div>
              <Badge variant="warning" className="shrink-0">+{s.surge}%</Badge>
            </Link>
          ))}
        </SectionCard>
      </div>
    </div>
  );
}
