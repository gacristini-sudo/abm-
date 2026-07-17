import { Globe, MapPin, Users2 } from "lucide-react";

import { EntityAvatar } from "@/components/shared/entity-avatar";
import { HealthBadge, StageBadge, TierBadge } from "@/components/shared/status-badges";
import { ScoreBar } from "@/components/shared/score-bar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { Account } from "@/types";

export function AccountHeader({ account }: { account: Account }) {
  return (
    <Card className="mb-6 flex-row flex-wrap items-start gap-6 p-6">
      <EntityAvatar name={account.name} size="xl" shape="square" />

      <div className="min-w-[240px] flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-semibold">{account.name}</h1>
          <TierBadge tier={account.tier} />
          <StageBadge stage={account.status} />
          <HealthBadge status={account.healthStatus} />
        </div>
        <p className="max-w-xl text-sm text-muted-foreground">{account.description}</p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Globe className="size-3.5" /> {account.domain}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5" /> {account.address}
          </span>
          <span className="flex items-center gap-1">
            <Users2 className="size-3.5" /> {account.employees.toLocaleString()} employees
          </span>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <EntityAvatar name={account.owner.name} size="xs" />
          <span className="text-xs text-muted-foreground">Owned by {account.owner.name}</span>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-x-8 gap-y-3 border-t border-border pt-4 sm:w-auto sm:grid-cols-1 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
        <div>
          <p className="text-xs text-muted-foreground">Pipeline</p>
          <p className="text-lg font-semibold tabular-nums">{formatCurrency(account.pipeline)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Revenue</p>
          <p className="text-lg font-semibold tabular-nums">{formatCurrency(account.revenue)}</p>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-2 border-t border-border pt-4 sm:w-56 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-14 shrink-0 text-muted-foreground">ICP</span>
          <ScoreBar value={account.icpScore} />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-14 shrink-0 text-muted-foreground">Intent</span>
          <ScoreBar value={account.intentScore} />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-14 shrink-0 text-muted-foreground">Engagement</span>
          <ScoreBar value={account.engagementScore} />
        </div>
      </div>

      <div className="flex w-full gap-2 border-t border-border pt-4 sm:w-auto sm:flex-col sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
        <Button size="sm" className="flex-1 sm:flex-none">Log Activity</Button>
        <Button size="sm" variant="outline" className="flex-1 sm:flex-none">Edit</Button>
      </div>
    </Card>
  );
}
