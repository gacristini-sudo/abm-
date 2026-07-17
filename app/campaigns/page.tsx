import { Megaphone, Users, Calendar, TrendingUp } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { DataTable } from "@/components/shared/data-table";
import { SimpleBarChart } from "@/components/charts/bar-chart";
import { campaignColumns } from "@/components/features/campaigns/campaign-columns";

import { CAMPAIGNS } from "@/data/campaigns";
import { formatCurrency } from "@/lib/utils";

const activeCampaigns = CAMPAIGNS.filter((c) => c.status === "Active").length;
const totalPipeline = CAMPAIGNS.reduce((s, c) => s + c.pipelineInfluenced, 0);
const totalMeetings = CAMPAIGNS.reduce((s, c) => s + c.meetings, 0);
const avgRoi = Math.round((CAMPAIGNS.reduce((s, c) => s + c.roi, 0) / CAMPAIGNS.length) * 10) / 10;

const summary = [
  { id: "active", label: "Active Campaigns", value: String(activeCampaigns), icon: Megaphone },
  { id: "pipeline", label: "Pipeline Influenced", value: formatCurrency(totalPipeline), icon: TrendingUp },
  { id: "meetings", label: "Meetings Booked", value: String(totalMeetings), icon: Calendar },
  { id: "roi", label: "Average ROI", value: `${avgRoi}x`, icon: Users },
];

const topByPipeline = [...CAMPAIGNS]
  .sort((a, b) => b.pipelineInfluenced - a.pipelineInfluenced)
  .slice(0, 8)
  .map((c) => ({ label: c.name, value: c.pipelineInfluenced }));

export default function CampaignsPage() {
  return (
    <div>
      <PageHeader title="Campaigns" description="Performance across all account-based marketing campaigns" />

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

      <SectionCard title="Pipeline Influenced by Campaign" className="mb-4">
        <SimpleBarChart data={topByPipeline} layout="vertical" format="currency" height={320} />
      </SectionCard>

      <SectionCard title="All Campaigns">
        <DataTable columns={campaignColumns} data={CAMPAIGNS} pageSize={10} />
      </SectionCard>
    </div>
  );
}
