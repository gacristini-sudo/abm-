"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { useChartTheme } from "@/hooks/use-chart-theme";
import { ChartTooltip } from "@/components/charts/chart-tooltip";
import { cn } from "@/lib/utils";
import { resolveFormatter, type ValueFormat } from "@/lib/chart-format";

interface DonutDatum {
  label: string;
  value: number;
}

interface DonutChartProps {
  data: DonutDatum[];
  format?: ValueFormat;
  height?: number;
  className?: string;
}

export function DonutChart({ data, format = "number", height = 260, className }: DonutChartProps) {
  const { colors } = useChartTheme();
  const formatter = resolveFormatter(format);
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center", className)}>
      <div style={{ height }} className="relative w-full sm:w-1/2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              innerRadius="62%"
              outerRadius="90%"
              paddingAngle={2}
              cornerRadius={4}
              strokeWidth={0}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip formatter={(v) => formatter(v)} />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-muted-foreground">Total</span>
          <span className="text-lg font-semibold tabular-nums">{formatter(total)}</span>
        </div>
      </div>
      <div className="flex-1 space-y-2">
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-2 text-sm">
            <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
            <span className="flex-1 truncate text-muted-foreground">{d.label}</span>
            <span className="font-medium tabular-nums">{formatter(d.value)}</span>
            <span className="w-10 shrink-0 text-right text-xs text-muted-foreground">
              {total ? Math.round((d.value / total) * 100) : 0}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
