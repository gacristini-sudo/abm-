import { Gauge, TrendingUp, Clock, Percent, Mail, Phone, Link2, CalendarCheck } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GaugeChart } from "@/components/charts/gauge-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { TrendAreaChart } from "@/components/charts/trend-area-chart";
import { SdrLeaderboard } from "@/components/features/analytics/sdr-leaderboard";
import { ScoreBar } from "@/components/shared/score-bar";

import {
  PIPELINE_COVERAGE,
  QUOTA_ATTAINMENT,
  QUOTA_GAP,
  AVG_SALES_CYCLE_DAYS,
  LOST_REASONS,
  FORECAST_BY_REP,
  WIN_RATE_TREND,
} from "@/data/commercial";
import { SDR_REPS } from "@/data/sdr";
import { formatCurrency } from "@/lib/utils";

const commercialSummary = [
  { id: "coverage", label: "Pipeline Coverage", value: `${PIPELINE_COVERAGE}x`, icon: TrendingUp },
  { id: "attainment", label: "Quota Attainment", value: `${QUOTA_ATTAINMENT}%`, icon: Gauge },
  { id: "cycle", label: "Avg. Sales Cycle", value: `${AVG_SALES_CYCLE_DAYS}d`, icon: Clock },
  { id: "gap", label: "Quota Gap", value: formatCurrency(QUOTA_GAP), icon: Percent },
];

const totalEmails = SDR_REPS.reduce((s, r) => s + r.emailsSent, 0);
const totalCalls = SDR_REPS.reduce((s, r) => s + r.calls, 0);
const totalLinkedin = SDR_REPS.reduce((s, r) => s + r.linkedinTouches, 0);
const totalMeetings = SDR_REPS.reduce((s, r) => s + r.meetingsBooked, 0);

const sdrSummary = [
  { id: "emails", label: "Emails Sent", value: totalEmails.toLocaleString(), icon: Mail },
  { id: "calls", label: "Calls Made", value: totalCalls.toLocaleString(), icon: Phone },
  { id: "linkedin", label: "LinkedIn Touches", value: totalLinkedin.toLocaleString(), icon: Link2 },
  { id: "meetings", label: "Meetings Booked", value: totalMeetings.toLocaleString(), icon: CalendarCheck },
];

const dailyPerformance = Array.from({ length: 14 }).map((_, i) => ({
  label: `D${i + 1}`,
  value: SDR_REPS.reduce((s, r) => s + (r.dailyActivity[i] ?? 0), 0),
}));

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader title="Analytics" description="Commercial performance and SDR productivity" />

      <Tabs defaultValue="commercial">
        <TabsList>
          <TabsTrigger value="commercial">Commercial</TabsTrigger>
          <TabsTrigger value="sdr">SDR Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="commercial" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {commercialSummary.map((k) => (
              <div key={k.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <k.icon className="size-4.5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                  <p className="text-lg font-semibold tabular-nums">{k.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <SectionCard title="Quota Attainment" className="xl:col-span-1">
              <GaugeChart value={QUOTA_ATTAINMENT} max={100} label={`${QUOTA_ATTAINMENT}%`} sublabel="of quarterly quota" height={180} />
            </SectionCard>
            <SectionCard title="Win Rate Trend" className="xl:col-span-1">
              <TrendAreaChart data={WIN_RATE_TREND} format="percent" height={180} colorIndex={1} />
            </SectionCard>
            <SectionCard title="Lost Reasons" className="xl:col-span-1">
              <DonutChart data={LOST_REASONS.map((r) => ({ label: r.reason, value: r.value }))} format="percent" height={180} />
            </SectionCard>
          </div>

          <SectionCard title="Forecast by Rep" description="Quota vs. closed-won this quarter" contentClassName="space-y-4">
            {FORECAST_BY_REP.map((rep) => (
              <div key={rep.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{rep.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatCurrency(rep.closed)} / {formatCurrency(rep.quota)}
                  </span>
                </div>
                <ScoreBar value={Math.round((rep.closed / rep.quota) * 100)} />
              </div>
            ))}
          </SectionCard>
        </TabsContent>

        <TabsContent value="sdr" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sdrSummary.map((k) => (
              <div key={k.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <k.icon className="size-4.5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                  <p className="text-lg font-semibold tabular-nums">{k.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <SectionCard title="Daily Activity" description="Combined outbound touches across the team" className="xl:col-span-2">
              <TrendAreaChart data={dailyPerformance} height={260} colorIndex={2} />
            </SectionCard>
            <SectionCard title="Leaderboard" description="Ranked by pipeline generated">
              <SdrLeaderboard reps={SDR_REPS} />
            </SectionCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
