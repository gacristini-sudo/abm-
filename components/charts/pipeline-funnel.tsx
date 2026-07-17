"use client";

import * as React from "react";
import { ArrowDown } from "lucide-react";

import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { useChartTheme } from "@/hooks/use-chart-theme";
import type { PipelineStageData } from "@/types";

export function PipelineFunnel({ stages }: { stages: PipelineStageData[] }) {
  const { colors } = useChartTheme();
  const [hovered, setHovered] = React.useState<string | null>(null);
  const maxCount = Math.max(...stages.map((s) => s.count));

  return (
    <div className="flex flex-col">
      {stages.map((stage, i) => {
        const widthPct = Math.max(10, (stage.count / maxCount) * 100);
        const isHovered = hovered === stage.stage;
        return (
          <div key={stage.stage}>
            <div
              className="group flex items-center gap-4 py-1.5"
              onMouseEnter={() => setHovered(stage.stage)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="w-24 shrink-0 text-right text-sm font-medium">{stage.stage}</div>
              <div className="w-14 shrink-0 text-right text-sm font-semibold tabular-nums">
                {formatNumber(stage.count, false)}
              </div>
              <div className="relative h-11 flex-1">
                <div
                  className={cn(
                    "h-full rounded-lg transition-all duration-200",
                    isHovered && "shadow-md brightness-105"
                  )}
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: colors[i % colors.length],
                    marginLeft: `${(100 - widthPct) / 2}%`,
                  }}
                />
              </div>
              <div className="w-14 shrink-0 text-right text-xs font-medium tabular-nums text-muted-foreground">
                {stage.conversionRate}%
              </div>
              <div className="hidden w-20 shrink-0 text-right text-xs text-muted-foreground sm:block">
                {stage.avgDays > 0 ? `${stage.avgDays}d avg` : "—"}
              </div>
              <div className="hidden w-24 shrink-0 text-right text-xs font-medium tabular-nums sm:block">
                {stage.value > 0 ? formatCurrency(stage.value) : "—"}
              </div>
            </div>
            {i < stages.length - 1 && (
              <div className="ml-24 flex items-center gap-1 pl-[calc(3.5rem+1rem)] text-[11px] text-muted-foreground">
                <ArrowDown className="size-3" />
                <span>{Math.round((stages[i + 1].count / stage.count) * 1000) / 10}% converted</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
