import { AlertTriangle, CheckCircle2, MinusCircle, TrendingDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AccountStatus, HealthStatus, InsightSeverity, Sentiment, Tier } from "@/types";

export function HealthBadge({ status }: { status: HealthStatus }) {
  const map: Record<HealthStatus, { variant: "success" | "warning" | "destructive" | "secondary"; icon: React.ReactNode }> = {
    Healthy: { variant: "success", icon: <CheckCircle2 /> },
    Neutral: { variant: "secondary", icon: <MinusCircle /> },
    "At Risk": { variant: "warning", icon: <TrendingDown /> },
    Critical: { variant: "destructive", icon: <AlertTriangle /> },
  };
  const { variant, icon } = map[status];
  return (
    <Badge variant={variant}>
      {icon}
      {status}
    </Badge>
  );
}

export function TierBadge({ tier }: { tier: Tier }) {
  const styles: Record<Tier, string> = {
    "Tier 1": "border-transparent bg-violet-500/15 text-violet-700 dark:text-violet-400",
    "Tier 2": "border-transparent bg-blue-500/15 text-blue-700 dark:text-blue-400",
    "Tier 3": "border-transparent bg-slate-500/15 text-slate-700 dark:text-slate-400",
  };
  return <Badge className={styles[tier]}>{tier}</Badge>;
}

export function StageBadge({ stage }: { stage: AccountStatus }) {
  const styles: Record<AccountStatus, string> = {
    Target: "bg-slate-500/15 text-slate-700 dark:text-slate-400",
    Engaged: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
    MQL: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-400",
    SAL: "bg-teal-500/15 text-teal-700 dark:text-teal-400",
    SQL: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400",
    Opportunity: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    Proposal: "bg-orange-500/15 text-orange-700 dark:text-orange-400",
    "Closed Won": "bg-success/15 text-success dark:text-green-400",
    "Closed Lost": "bg-destructive/15 text-destructive dark:text-red-400",
  };
  return <Badge className={cn("border-transparent", styles[stage])}>{stage}</Badge>;
}

export function SentimentBadge({ sentiment }: { sentiment: Sentiment }) {
  const map: Record<Sentiment, "success" | "secondary" | "destructive"> = {
    Positive: "success",
    Neutral: "secondary",
    Negative: "destructive",
  };
  return <Badge variant={map[sentiment]}>{sentiment}</Badge>;
}

export function SeverityBadge({ severity }: { severity: InsightSeverity }) {
  const map: Record<InsightSeverity, { variant: "destructive" | "warning" | "info" | "success"; label: string }> = {
    critical: { variant: "destructive", label: "Critical" },
    warning: { variant: "warning", label: "Warning" },
    info: { variant: "info", label: "Info" },
    positive: { variant: "success", label: "Opportunity" },
  };
  const { variant, label } = map[severity];
  return <Badge variant={variant}>{label}</Badge>;
}
