import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EntityAvatar } from "@/components/shared/entity-avatar";
import { formatCurrency } from "@/lib/utils";
import type { AccountStatus, Opportunity } from "@/types";

const KANBAN_STAGES: AccountStatus[] = ["MQL", "SAL", "SQL", "Opportunity", "Proposal", "Closed Won"];

export function OpportunityKanban({ opportunities }: { opportunities: Opportunity[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
      {KANBAN_STAGES.map((stage) => {
        const items = opportunities.filter((o) => o.stage === stage);
        const total = items.reduce((s, o) => s + o.amount, 0);
        return (
          <div key={stage} className="w-72 shrink-0">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-sm font-semibold">{stage}</span>
              <span className="text-xs text-muted-foreground">{items.length} · {formatCurrency(total)}</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {items.map((o) => (
                <Link key={o.id} href={`/accounts/${o.accountId}`}>
                  <Card className="gap-2 p-3.5 transition-shadow hover:shadow-md">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-snug">{o.name}</p>
                      <Badge variant="outline" className="shrink-0">{o.probability}%</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{o.accountName}</p>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5">
                        <EntityAvatar name={o.owner} size="xs" />
                        <span className="text-xs text-muted-foreground">{o.owner}</span>
                      </div>
                      <span className="text-sm font-semibold tabular-nums">{formatCurrency(o.amount)}</span>
                    </div>
                  </Card>
                </Link>
              ))}
              {items.length === 0 && (
                <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                  No deals
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
