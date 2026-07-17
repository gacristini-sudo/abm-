"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatNumber } from "@/lib/utils";
import type { Campaign } from "@/types";

const STATUS_VARIANT: Record<Campaign["status"], "success" | "secondary" | "outline" | "info"> = {
  Active: "success",
  Paused: "secondary",
  Completed: "outline",
  Draft: "info",
};

export const campaignColumns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "name",
    header: "Campaign",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.name}</span>
        <span className="text-xs text-muted-foreground">{row.original.channel}</span>
      </div>
    ),
  },
  {
    accessorKey: "objective",
    header: "Objective",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.objective}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant={STATUS_VARIANT[row.original.status]}>{row.original.status}</Badge>,
  },
  {
    accessorKey: "accounts",
    header: "Accounts",
    cell: ({ row }) => <span className="tabular-nums">{formatNumber(row.original.accounts, false)}</span>,
  },
  {
    accessorKey: "ctr",
    header: "CTR",
    cell: ({ row }) => <span className="tabular-nums">{row.original.ctr}%</span>,
  },
  {
    accessorKey: "openRate",
    header: "Open Rate",
    cell: ({ row }) => <span className="tabular-nums">{row.original.openRate}%</span>,
  },
  {
    accessorKey: "meetings",
    header: "Meetings",
    cell: ({ row }) => <span className="tabular-nums">{row.original.meetings}</span>,
  },
  {
    accessorKey: "pipelineInfluenced",
    header: "Pipeline Influenced",
    cell: ({ row }) => <span className="font-medium tabular-nums">{formatCurrency(row.original.pipelineInfluenced)}</span>,
  },
  {
    accessorKey: "revenueInfluenced",
    header: "Revenue Influenced",
    cell: ({ row }) => <span className="font-medium tabular-nums">{formatCurrency(row.original.revenueInfluenced)}</span>,
  },
  {
    accessorKey: "roi",
    header: "ROI",
    cell: ({ row }) => <span className="font-semibold tabular-nums text-success">{row.original.roi}x</span>,
  },
];
