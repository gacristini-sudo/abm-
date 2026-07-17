"use client";

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { useChartTheme } from "@/hooks/use-chart-theme";
import { formatCurrency } from "@/lib/utils";
import { ChartTooltip } from "@/components/charts/chart-tooltip";
import type { RevenuePoint } from "@/types";

export function RevenueChart({ data }: { data: RevenuePoint[] }) {
  const { colors, ink } = useChartTheme();

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors[0]} stopOpacity={0.28} />
            <stop offset="100%" stopColor={colors[0]} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke={ink.grid} strokeDasharray="0" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={{ stroke: ink.axis }}
          tick={{ fill: ink.muted, fontSize: 11 }}
          interval="preserveStartEnd"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: ink.muted, fontSize: 11 }}
          tickFormatter={(v) => formatCurrency(v)}
          width={56}
        />
        <Tooltip
          content={<ChartTooltip formatter={(v) => formatCurrency(v)} />}
          cursor={{ stroke: ink.axis, strokeWidth: 1 }}
        />
        <Legend
          verticalAlign="top"
          height={28}
          align="right"
          wrapperStyle={{ fontSize: 12, color: ink.text }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          name="Revenue"
          stroke={colors[0]}
          strokeWidth={2}
          fill="url(#revenueFill)"
          dot={false}
          activeDot={{ r: 4 }}
        />
        <Area
          type="monotone"
          dataKey="target"
          name="Target"
          stroke={ink.axis}
          strokeWidth={1.5}
          strokeDasharray="4 4"
          fill="none"
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="forecast"
          name="Forecast"
          stroke={colors[4]}
          strokeWidth={1.5}
          strokeDasharray="2 3"
          fill="none"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
