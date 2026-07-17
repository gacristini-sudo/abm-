"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Sparkline } from "@/components/charts/sparkline";
import { formatCurrency, formatNumber } from "@/lib/utils";
import type { ContentAsset } from "@/types";

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

export const contentColumns: ColumnDef<ContentAsset>[] = [
  {
    accessorKey: "title",
    header: "Asset",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.title}</span>
        <Badge variant="outline" className="mt-1 w-fit">{row.original.type}</Badge>
      </div>
    ),
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => <span className="tabular-nums">{formatNumber(row.original.views, false)}</span>,
  },
  {
    accessorKey: "downloads",
    header: "Downloads",
    cell: ({ row }) => <span className="tabular-nums">{formatNumber(row.original.downloads, false)}</span>,
  },
  {
    accessorKey: "avgTimeSeconds",
    header: "Avg. Time",
    cell: ({ row }) => <span className="tabular-nums">{formatDuration(row.original.avgTimeSeconds)}</span>,
  },
  {
    accessorKey: "accountsEngaged",
    header: "Accounts",
    cell: ({ row }) => <span className="tabular-nums">{row.original.accountsEngaged}</span>,
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
    id: "trend",
    header: "Trend",
    cell: ({ row }) => (
      <div className="h-8 w-24">
        <Sparkline data={row.original.trend} color="#2a78d6" />
      </div>
    ),
  },
];
