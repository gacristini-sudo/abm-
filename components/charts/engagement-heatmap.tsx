"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SEQUENTIAL_BLUE } from "@/lib/chart-colors";
import { cn } from "@/lib/utils";

interface HeatmapRow {
  label: string;
  values: number[];
}

function colorFor(value: number): string {
  const idx = Math.min(SEQUENTIAL_BLUE.length - 1, Math.floor((value / 100) * SEQUENTIAL_BLUE.length));
  return SEQUENTIAL_BLUE[idx];
}

export function EngagementHeatmap({ rows, columns }: { rows: HeatmapRow[]; columns: string[] }) {
  return (
    <div className="overflow-x-auto scrollbar-thin">
      <div className="min-w-[560px]">
        <div className="mb-1.5 grid gap-1" style={{ gridTemplateColumns: `140px repeat(${columns.length}, minmax(0,1fr))` }}>
          <span />
          {columns.map((col) => (
            <span key={col} className="text-center text-[10px] font-medium text-muted-foreground">
              {col}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid items-center gap-1"
              style={{ gridTemplateColumns: `140px repeat(${columns.length}, minmax(0,1fr))` }}
            >
              <span className="truncate text-xs font-medium text-foreground/85">{row.label}</span>
              {row.values.map((value, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn("aspect-square w-full rounded-[4px] transition-transform hover:scale-110")}
                      style={{ backgroundColor: colorFor(value) }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    {row.label} · {columns[i]}: {value}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
