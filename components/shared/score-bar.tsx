import { cn } from "@/lib/utils";

interface ScoreBarProps {
  value: number;
  label?: string;
  className?: string;
  size?: "sm" | "md";
}

function colorFor(value: number): string {
  if (value >= 75) return "bg-success";
  if (value >= 50) return "bg-blue-500";
  if (value >= 30) return "bg-warning";
  return "bg-destructive";
}

export function ScoreBar({ value, label, className, size = "sm" }: ScoreBarProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("flex-1 overflow-hidden rounded-full bg-muted", size === "sm" ? "h-1.5" : "h-2")}>
        <div
          className={cn("h-full rounded-full transition-all", colorFor(value))}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      <span className="w-7 shrink-0 text-right text-xs font-medium tabular-nums text-muted-foreground">
        {label ?? value}
      </span>
    </div>
  );
}
