"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { useChartTheme } from "@/hooks/use-chart-theme";
import { cn } from "@/lib/utils";

interface GaugeChartProps {
  value: number;
  max?: number;
  label?: string;
  sublabel?: string;
  color?: string;
  height?: number;
  className?: string;
}

export function GaugeChart({
  value,
  max = 100,
  label,
  sublabel,
  color,
  height = 160,
  className,
}: GaugeChartProps) {
  const { colors, ink } = useChartTheme();
  const clamped = Math.min(max, Math.max(0, value));
  const data = [
    { name: "value", v: clamped },
    { name: "rest", v: max - clamped },
  ];
  const fillColor = color ?? colors[0];

  return (
    <div className={cn("relative", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="v"
            startAngle={180}
            endAngle={0}
            innerRadius="70%"
            outerRadius="100%"
            cy="85%"
            cornerRadius={6}
            stroke="none"
          >
            <Cell fill={fillColor} />
            <Cell fill={ink.grid} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-1 text-center">
        <span className="text-xl font-semibold tabular-nums">{label ?? `${Math.round(clamped)}`}</span>
        {sublabel && <span className="text-[11px] text-muted-foreground">{sublabel}</span>}
      </div>
    </div>
  );
}
