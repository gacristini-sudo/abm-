"use client";

import { Bar, BarChart as ReBarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { useChartTheme } from "@/hooks/use-chart-theme";
import { ChartTooltip } from "@/components/charts/chart-tooltip";
import { resolveFormatter, type ValueFormat } from "@/lib/chart-format";

interface BarDatum {
  label: string;
  value: number;
}

interface SimpleBarChartProps {
  data: BarDatum[];
  layout?: "vertical" | "horizontal";
  format?: ValueFormat;
  height?: number;
  color?: string;
}

export function SimpleBarChart({
  data,
  layout = "horizontal",
  format = "number",
  height = 300,
  color,
}: SimpleBarChartProps) {
  const { colors, ink } = useChartTheme();
  const formatter = resolveFormatter(format);
  const barColor = color ?? colors[0];
  const isVertical = layout === "vertical";

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart
        data={data}
        layout={isVertical ? "vertical" : "horizontal"}
        margin={{ top: 4, right: 16, bottom: 0, left: isVertical ? 8 : 0 }}
        barCategoryGap={isVertical ? 10 : 18}
      >
        <CartesianGrid horizontal={!isVertical} vertical={isVertical} stroke={ink.grid} />
        {isVertical ? (
          <>
            <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: ink.muted, fontSize: 11 }} tickFormatter={formatter} />
            <YAxis
              type="category"
              dataKey="label"
              tickLine={false}
              axisLine={false}
              width={140}
              tick={{ fill: ink.text, fontSize: 12 }}
            />
          </>
        ) : (
          <>
            <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: ink.axis }} tick={{ fill: ink.muted, fontSize: 11 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: ink.muted, fontSize: 11 }} tickFormatter={formatter} width={48} />
          </>
        )}
        <Tooltip
          cursor={{ fill: "var(--muted)", opacity: 0.4 }}
          content={<ChartTooltip formatter={(v) => formatter(v)} />}
        />
        <Bar dataKey="value" name="Value" radius={isVertical ? [0, 6, 6, 0] : [6, 6, 0, 0]} maxBarSize={40}>
          {data.map((_, i) => (
            <Cell key={i} fill={barColor} />
          ))}
        </Bar>
      </ReBarChart>
    </ResponsiveContainer>
  );
}
