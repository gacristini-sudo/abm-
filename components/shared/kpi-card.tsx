import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Sparkline } from "@/components/charts/sparkline";
import { cn, formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import type { KpiDatum } from "@/types";

function formatValue(kpi: KpiDatum): string {
  switch (kpi.format) {
    case "currency":
      return formatCurrency(kpi.value);
    case "percent":
      return formatPercent(kpi.value);
    case "days":
      return `${Math.round(kpi.value)}d`;
    default:
      return formatNumber(kpi.value);
  }
}

interface KpiCardProps {
  kpi: KpiDatum;
  icon: LucideIcon;
  accentColor?: string;
}

export function KpiCard({ kpi, icon: Icon, accentColor = "#2a78d6" }: KpiCardProps) {
  const delta = kpi.previousValue === 0 ? 0 : ((kpi.value - kpi.previousValue) / Math.abs(kpi.previousValue)) * 100;
  const isPositive = delta >= 0;

  return (
    <Card className="gap-3 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between px-5">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">{kpi.label}</p>
          <p className="text-2xl font-semibold tracking-tight tabular-nums">{formatValue(kpi)}</p>
        </div>
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accentColor}1F`, color: accentColor }}
        >
          <Icon className="size-4.5" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 px-5">
        <span
          className={cn(
            "flex items-center gap-0.5 text-xs font-medium",
            isPositive ? "text-success" : "text-destructive"
          )}
        >
          {isPositive ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
          {Math.abs(delta).toFixed(1)}%
        </span>
        <span className="text-[11px] text-muted-foreground">vs prior period</span>
      </div>
      <div className="h-10 px-1">
        <Sparkline data={kpi.sparkline} color={accentColor} />
      </div>
    </Card>
  );
}
