"use client";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight } from "lucide-react";

import { EntityAvatar } from "@/components/shared/entity-avatar";
import { ScoreBar } from "@/components/shared/score-bar";
import { HealthBadge, StageBadge, TierBadge } from "@/components/shared/status-badges";
import { formatCurrency, relativeTime } from "@/lib/utils";
import type { Account } from "@/types";

export const accountColumns: ColumnDef<Account>[] = [
  {
    accessorKey: "name",
    header: "Company",
    cell: ({ row }) => {
      const account = row.original;
      return (
        <Link
          href={`/accounts/${account.id}`}
          className="flex items-center gap-3 font-medium text-foreground hover:text-primary"
          onClick={(e) => e.stopPropagation()}
        >
          <EntityAvatar name={account.name} shape="square" />
          <div className="flex flex-col">
            <span>{account.name}</span>
            <span className="text-xs font-normal text-muted-foreground">{account.domain}</span>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "segment",
    header: "Segment",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.segment}</span>,
  },
  {
    accessorKey: "tier",
    header: "Tier",
    cell: ({ row }) => <TierBadge tier={row.original.tier} />,
  },
  {
    accessorKey: "icpScore",
    header: "ICP",
    cell: ({ row }) => <ScoreBar value={row.original.icpScore} className="w-24" />,
  },
  {
    accessorKey: "intentScore",
    header: "Intent",
    cell: ({ row }) => <ScoreBar value={row.original.intentScore} className="w-24" />,
  },
  {
    accessorKey: "engagementScore",
    header: "Engagement",
    cell: ({ row }) => <ScoreBar value={row.original.engagementScore} className="w-24" />,
  },
  {
    accessorKey: "pipeline",
    header: "Pipeline",
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">
        {row.original.pipeline > 0 ? formatCurrency(row.original.pipeline) : "—"}
      </span>
    ),
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">
        {row.original.revenue > 0 ? formatCurrency(row.original.revenue) : "—"}
      </span>
    ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <EntityAvatar name={row.original.owner.name} size="xs" />
        <span className="text-sm">{row.original.owner.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StageBadge stage={row.original.status} />,
  },
  {
    accessorKey: "healthScore",
    header: "Health",
    cell: ({ row }) => <HealthBadge status={row.original.healthStatus} />,
  },
  {
    accessorKey: "lastInteraction",
    header: "Last Interaction",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{relativeTime(row.original.lastInteraction)}</span>,
  },
  {
    accessorKey: "nextAction",
    header: "Next Action",
    cell: ({ row }) => (
      <span className="flex items-center gap-1 text-xs text-muted-foreground">
        {row.original.nextAction}
        <ArrowUpRight className="size-3 opacity-50" />
      </span>
    ),
  },
];
