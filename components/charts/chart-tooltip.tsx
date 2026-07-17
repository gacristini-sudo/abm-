"use client";

import { cn } from "@/lib/utils";

interface TooltipPayloadEntry {
  color?: string;
  name?: string | number;
  value?: string | number;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string | number;
  formatter?: (value: number, name: string) => string;
  labelFormatter?: (label: string) => string;
  className?: string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
  className,
}: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className={cn("rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md", className)}>
      {label !== undefined && (
        <p className="mb-1 font-medium text-popover-foreground">
          {labelFormatter ? labelFormatter(String(label)) : label}
        </p>
      )}
      <div className="space-y-0.5">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}</span>
            <span className="ml-auto font-medium tabular-nums text-popover-foreground">
              {formatter ? formatter(Number(entry.value), String(entry.name)) : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
