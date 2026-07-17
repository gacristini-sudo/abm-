"use client";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { Link2 } from "lucide-react";

import { EntityAvatar } from "@/components/shared/entity-avatar";
import { ScoreBar } from "@/components/shared/score-bar";
import { SentimentBadge } from "@/components/shared/status-badges";
import { Badge } from "@/components/ui/badge";
import { relativeTime } from "@/lib/utils";
import type { Stakeholder } from "@/types";

const STATUS_VARIANT: Record<Stakeholder["status"], "success" | "info" | "secondary" | "destructive" | "outline"> = {
  Champion: "success",
  Supporter: "info",
  Neutral: "secondary",
  Detractor: "destructive",
  Unknown: "outline",
};

export const stakeholderColumns: ColumnDef<Stakeholder>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const s = row.original;
      return (
        <div className="flex items-center gap-3">
          <EntityAvatar name={s.name} />
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{s.name}</span>
            <Link
              href={`/accounts/${s.accountId}`}
              className="text-xs text-muted-foreground hover:text-primary"
              onClick={(e) => e.stopPropagation()}
            >
              {s.accountName}
            </Link>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <span className="text-sm">{row.original.title}</span>,
  },
  {
    accessorKey: "department",
    header: "Area",
    cell: ({ row }) => <Badge variant="outline">{row.original.department}</Badge>,
  },
  {
    accessorKey: "linkedin",
    header: "LinkedIn",
    cell: ({ row }) => (
      <a
        href={row.original.linkedin}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
      >
        <Link2 className="size-3.5" /> Profile
      </a>
    ),
  },
  {
    accessorKey: "influence",
    header: "Influence",
    cell: ({ row }) => <ScoreBar value={row.original.influence} className="w-24" />,
  },
  {
    accessorKey: "championScore",
    header: "Champion Score",
    cell: ({ row }) => <ScoreBar value={row.original.championScore} className="w-24" />,
  },
  {
    accessorKey: "engagement",
    header: "Engagement",
    cell: ({ row }) => <ScoreBar value={row.original.engagement} className="w-24" />,
  },
  {
    accessorKey: "lastContact",
    header: "Last Contact",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{relativeTime(row.original.lastContact)}</span>,
  },
  {
    accessorKey: "sentiment",
    header: "Sentiment",
    cell: ({ row }) => <SentimentBadge sentiment={row.original.sentiment} />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant={STATUS_VARIANT[row.original.status]}>{row.original.status}</Badge>,
  },
];
