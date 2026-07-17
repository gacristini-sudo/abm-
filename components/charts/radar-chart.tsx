"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as ReRadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { useChartTheme } from "@/hooks/use-chart-theme";
import { ChartTooltip } from "@/components/charts/chart-tooltip";

interface RadarDatum {
  label: string;
  value: number;
}

export function RadarChartComp({ data, height = 280 }: { data: RadarDatum[]; height?: number }) {
  const { colors, ink } = useChartTheme();

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReRadarChart data={data} outerRadius="72%">
        <PolarGrid stroke={ink.grid} />
        <PolarAngleAxis dataKey="label" tick={{ fill: ink.text, fontSize: 11 }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: ink.muted, fontSize: 10 }} axisLine={false} />
        <Radar
          name="Score"
          dataKey="value"
          stroke={colors[0]}
          strokeWidth={2}
          fill={colors[0]}
          fillOpacity={0.25}
        />
        <Tooltip content={<ChartTooltip />} />
      </ReRadarChart>
    </ResponsiveContainer>
  );
}
