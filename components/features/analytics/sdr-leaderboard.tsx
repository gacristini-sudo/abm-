import { Trophy } from "lucide-react";

import { EntityAvatar } from "@/components/shared/entity-avatar";
import { Sparkline } from "@/components/charts/sparkline";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { SdrRep } from "@/types";

const MEDAL_COLORS = ["text-amber-500", "text-slate-400", "text-orange-700"];

export function SdrLeaderboard({ reps }: { reps: SdrRep[] }) {
  return (
    <div className="flex flex-col divide-y divide-border/70">
      {reps.map((rep) => (
        <div key={rep.id} className="flex items-center gap-4 py-3">
          <div className="flex w-6 shrink-0 items-center justify-center">
            {rep.rank <= 3 ? (
              <Trophy className={cn("size-4", MEDAL_COLORS[rep.rank - 1])} />
            ) : (
              <span className="text-sm font-medium text-muted-foreground">{rep.rank}</span>
            )}
          </div>
          <EntityAvatar name={rep.name} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{rep.name}</p>
            <p className="text-xs text-muted-foreground">
              {rep.meetingsBooked} meetings · {rep.conversionRate}% conversion
            </p>
          </div>
          <div className="hidden h-8 w-20 sm:block">
            <Sparkline data={rep.dailyActivity} color="#2a78d6" />
          </div>
          <span className="w-24 shrink-0 text-right text-sm font-semibold tabular-nums">
            {formatCurrency(rep.pipelineGenerated)}
          </span>
        </div>
      ))}
    </div>
  );
}
