import { DollarSign, TrendingUp, Target, Percent } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { SimpleBarChart } from "@/components/charts/bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";

import {
  REVENUE_BY_MONTH,
  REVENUE_BY_CAMPAIGN,
  REVENUE_BY_SEGMENT,
  REVENUE_BY_PRODUCT,
  REVENUE_ATTRIBUTION,
} from "@/data/revenue";
import { formatCurrency } from "@/lib/utils";

const totalRevenue = REVENUE_BY_MONTH.reduce((s, r) => s + r.revenue, 0);
const totalTarget = REVENUE_BY_MONTH.reduce((s, r) => s + r.target, 0);
const attainment = Math.round((totalRevenue / totalTarget) * 1000) / 10;
const latestForecast = REVENUE_BY_MONTH[REVENUE_BY_MONTH.length - 1].forecast;

const summary = [
  { id: "total", label: "Total Revenue (TTM)", value: formatCurrency(totalRevenue), icon: DollarSign },
  { id: "attainment", label: "Target Attainment", value: `${attainment}%`, icon: Percent },
  { id: "forecast", label: "Next Month Forecast", value: formatCurrency(latestForecast), icon: TrendingUp },
  { id: "target", label: "Annual Target", value: formatCurrency(totalTarget), icon: Target },
];

export default function RevenuePage() {
  return (
    <div>
      <PageHeader title="Revenue" description="Revenue performance, attribution, and forecast" />

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((k) => (
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

      <SectionCard title="Revenue by Month" description="Actual vs. target vs. forecast" className="mb-4">
        <RevenueChart data={REVENUE_BY_MONTH} />
      </SectionCard>

      <div className="mb-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard title="Revenue by Campaign" description="Top influenced campaigns">
          <SimpleBarChart
            data={REVENUE_BY_CAMPAIGN.map((c) => ({ label: c.name, value: c.revenue }))}
            layout="vertical"
            format="currency"
            height={320}
          />
        </SectionCard>
        <SectionCard title="Revenue by Product">
          <SimpleBarChart
            data={REVENUE_BY_PRODUCT.map((p) => ({ label: p.product, value: p.revenue }))}
            layout="vertical"
            format="currency"
            height={320}
          />
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard title="Revenue by Segment">
          <DonutChart data={REVENUE_BY_SEGMENT.map((s) => ({ label: s.segment, value: s.revenue }))} format="currency" />
        </SectionCard>
        <SectionCard title="Revenue Attribution" description="Share of influenced revenue by channel">
          <DonutChart data={REVENUE_ATTRIBUTION.map((a) => ({ label: a.channel, value: a.value }))} format="percent" />
        </SectionCard>
      </div>
    </div>
  );
}
