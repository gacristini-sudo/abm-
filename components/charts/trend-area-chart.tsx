"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { useChartTheme } from "@/hooks/use-chart-theme";
import { ChartTooltip } from "@/components/charts/chart-tooltip";
import { resolveFormatter, type ValueFormat } from "@/lib/chart-format";

interface TrendAreaChartProps {
  data: { label: string; value: number }[];
  format?: ValueFormat;
  height?: number;
  colorIndex?: number;
}

export function TrendAreaChart({ data, format = "number", height = 240, colorIndex = 0 }: TrendAreaChartProps) {
  const { colors, ink } = useChartTheme();
  const formatter = resolveFormatter(format);
  const color = colors[colorIndex % colors.length];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke={ink.grid} />
        <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: ink.axis }} tick={{ fill: ink.muted, fontSize: 11 }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fill: ink.muted, fontSize: 11 }} tickFormatter={formatter} width={44} />
        <Tooltip content={<ChartTooltip formatter={(v) => formatter(v)} />} cursor={{ stroke: ink.axis, strokeWidth: 1 }} />
        <Area type="monotone" dataKey="value" name="Value" stroke={color} strokeWidth={2} fill="url(#trendFill)" dot={false} activeDot={{ r: 4 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
