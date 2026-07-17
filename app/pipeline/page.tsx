import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { PipelineFunnel } from "@/components/charts/pipeline-funnel";
import { OpportunityKanban } from "@/components/features/pipeline/opportunity-kanban";

import { PIPELINE_FUNNEL, OPPORTUNITIES } from "@/data/pipeline";
import { formatCurrency } from "@/lib/utils";
import { Target, Clock, TrendingUp, Percent } from "lucide-react";

const totalPipelineValue = PIPELINE_FUNNEL.filter((s) => s.stage !== "Closed Won").reduce((s, x) => s + x.value, 0);
const avgCycleDays = Math.round(
  PIPELINE_FUNNEL.filter((s) => s.avgDays > 0).reduce((s, x) => s + x.avgDays, 0)
);
const closedWonStage = PIPELINE_FUNNEL.find((s) => s.stage === "Closed Won")!;
const targetStage = PIPELINE_FUNNEL.find((s) => s.stage === "Target")!;
const overallConversion = Math.round((closedWonStage.count / targetStage.count) * 1000) / 10;

const summaryKpis = [
  { id: "total-pipeline", label: "Total Pipeline Value", value: formatCurrency(totalPipelineValue), icon: TrendingUp },
  { id: "avg-cycle", label: "Total Cycle Time", value: `${avgCycleDays}d`, icon: Clock },
  { id: "conversion", label: "Target to Won", value: `${overallConversion}%`, icon: Percent },
  { id: "open-deals", label: "Open Opportunities", value: String(OPPORTUNITIES.filter((o) => o.stage !== "Closed Won").length), icon: Target },
];

export default function PipelinePage() {
  return (
    <div>
      <PageHeader title="Pipeline" description="Full-funnel visibility from Target through Closed Won" />

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryKpis.map((k) => (
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

      <SectionCard title="Pipeline Funnel" description="Target through Closed Won across all accounts" className="mb-4">
        <PipelineFunnel stages={PIPELINE_FUNNEL} />
      </SectionCard>

      <SectionCard title="Opportunity Board" description="Active deals grouped by stage">
        <OpportunityKanban opportunities={OPPORTUNITIES} />
      </SectionCard>
    </div>
  );
}
