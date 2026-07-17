"use client";

import * as React from "react";
import { Eye, Download, Building2, TrendingUp } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { DataTable } from "@/components/shared/data-table";
import { DonutChart } from "@/components/charts/donut-chart";
import { contentColumns } from "@/components/features/content/content-columns";

import { CONTENT_ASSETS } from "@/data/content";
import { formatCurrency, formatNumber } from "@/lib/utils";
import type { ContentType } from "@/types";

const TYPES: (ContentType | "All")[] = ["All", "Whitepaper", "Case Study", "Webinar", "Event", "Landing Page"];

const totalViews = CONTENT_ASSETS.reduce((s, c) => s + c.views, 0);
const totalDownloads = CONTENT_ASSETS.reduce((s, c) => s + c.downloads, 0);
const totalAccounts = CONTENT_ASSETS.reduce((s, c) => s + c.accountsEngaged, 0);
const totalPipeline = CONTENT_ASSETS.reduce((s, c) => s + c.pipelineInfluenced, 0);

const summary = [
  { id: "views", label: "Total Views", value: formatNumber(totalViews), icon: Eye },
  { id: "downloads", label: "Total Downloads", value: formatNumber(totalDownloads), icon: Download },
  { id: "accounts", label: "Accounts Engaged", value: formatNumber(totalAccounts), icon: Building2 },
  { id: "pipeline", label: "Pipeline Influenced", value: formatCurrency(totalPipeline), icon: TrendingUp },
];

const viewsByType = Object.entries(
  CONTENT_ASSETS.reduce<Record<string, number>>((acc, c) => {
    acc[c.type] = (acc[c.type] ?? 0) + c.views;
    return acc;
  }, {})
).map(([label, value]) => ({ label, value }));

export default function ContentPage() {
  const [typeFilter, setTypeFilter] = React.useState<ContentType | "All">("All");
  const filtered = typeFilter === "All" ? CONTENT_ASSETS : CONTENT_ASSETS.filter((c) => c.type === typeFilter);

  return (
    <div>
      <PageHeader title="Content" description="Engagement and pipeline impact across marketing content assets" />

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

      <div className="mb-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard title="Views by Content Type" className="xl:col-span-1">
          <DonutChart data={viewsByType} format="number" height={220} />
        </SectionCard>

        <SectionCard title="Content Library" className="xl:col-span-2" contentClassName="space-y-0">
          <div className="mb-4 flex flex-wrap gap-1.5">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  typeFilter === t
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-accent/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <DataTable columns={contentColumns} data={filtered} pageSize={6} />
        </SectionCard>
      </div>
    </div>
  );
}
