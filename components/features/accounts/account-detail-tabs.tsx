"use client";

import * as React from "react";
import { ExternalLink, Link2 } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Timeline } from "@/components/shared/timeline";
import { EntityAvatar } from "@/components/shared/entity-avatar";
import { ScoreBar } from "@/components/shared/score-bar";
import { SentimentBadge, StageBadge, SeverityBadge } from "@/components/shared/status-badges";
import { formatCurrency, relativeTime } from "@/lib/utils";
import type { Account, AiInsight, ContentAsset, Opportunity, Stakeholder, TimelineEvent, TimelineEventType } from "@/types";

const TIMELINE_FILTERS: { label: string; value: TimelineEventType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Emails", value: "Email" },
  { label: "Calls", value: "Call" },
  { label: "Meetings", value: "Meeting" },
  { label: "LinkedIn", value: "LinkedIn" },
  { label: "Events", value: "Event" },
  { label: "Downloads", value: "Download" },
  { label: "Website", value: "Website Visit" },
];

function TimelineTab({ events }: { events: TimelineEvent[] }) {
  const [filter, setFilter] = React.useState<TimelineEventType | "all">("all");
  const filtered = filter === "all" ? events : events.filter((e) => e.type === filter);

  return (
    <SectionCard title="Activity Timeline" description="Every touchpoint with this account">
      <div className="mb-5 flex flex-wrap gap-1.5">
        {TIMELINE_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              filter === f.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:bg-accent/50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <Timeline events={filtered} />
    </SectionCard>
  );
}

function SummaryTab({ account, stakeholders, opportunities }: { account: Account; stakeholders: Stakeholder[]; opportunities: Opportunity[] }) {
  const topStakeholders = [...stakeholders].sort((a, b) => b.influence - a.influence).slice(0, 4);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <SectionCard title="Products" className="lg:col-span-1">
        <div className="flex flex-wrap gap-2">
          {account.products.map((p) => (
            <Badge key={p} variant="secondary">{p}</Badge>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Key Stakeholders" className="lg:col-span-1" contentClassName="space-y-3">
        {topStakeholders.map((s) => (
          <div key={s.id} className="flex items-center gap-3">
            <EntityAvatar name={s.name} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{s.name}</p>
              <p className="truncate text-xs text-muted-foreground">{s.title}</p>
            </div>
            <SentimentBadge sentiment={s.sentiment} />
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Open Opportunities" className="lg:col-span-1" contentClassName="space-y-3">
        {opportunities.length === 0 ? (
          <EmptyState title="No open opportunities" />
        ) : (
          opportunities.slice(0, 4).map((o) => (
            <div key={o.id} className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{o.name}</p>
                <StageBadge stage={o.stage} />
              </div>
              <span className="shrink-0 text-sm font-semibold tabular-nums">{formatCurrency(o.amount)}</span>
            </div>
          ))
        )}
      </SectionCard>
    </div>
  );
}

function StakeholdersTab({ stakeholders }: { stakeholders: Stakeholder[] }) {
  if (stakeholders.length === 0) return <EmptyState title="No stakeholders mapped yet" />;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stakeholders.map((s) => (
        <Card key={s.id} className="gap-3 p-4">
          <div className="flex items-center gap-3">
            <EntityAvatar name={s.name} size="md" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{s.name}</p>
              <p className="truncate text-xs text-muted-foreground">{s.title}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="outline">{s.department}</Badge>
            <SentimentBadge sentiment={s.sentiment} />
            {s.isDecisionMaker && <Badge variant="info">Decision Maker</Badge>}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-16 shrink-0 text-muted-foreground">Influence</span>
              <ScoreBar value={s.influence} />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-16 shrink-0 text-muted-foreground">Champion</span>
              <ScoreBar value={s.championScore} />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <a href={s.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary">
              <Link2 className="size-3" /> LinkedIn
            </a>
            <span>{relativeTime(s.lastContact)}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

function OpportunitiesTab({ opportunities }: { opportunities: Opportunity[] }) {
  if (opportunities.length === 0) return <EmptyState title="No opportunities yet" description="Opportunities will appear here once created." />;

  return (
    <div className="space-y-3">
      {opportunities.map((o) => (
        <Card key={o.id} className="flex-row items-center justify-between gap-4 p-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{o.name}</p>
            <p className="text-xs text-muted-foreground">{o.product} · Owner: {o.owner}</p>
          </div>
          <StageBadge stage={o.stage} />
          <span className="w-24 shrink-0 text-right text-sm font-semibold tabular-nums">{formatCurrency(o.amount)}</span>
          <span className="w-16 shrink-0 text-right text-xs text-muted-foreground">{o.probability}%</span>
        </Card>
      ))}
    </div>
  );
}

function ContentTab({ content }: { content: ContentAsset[] }) {
  if (content.length === 0) return <EmptyState title="No content consumed yet" />;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {content.map((c) => (
        <Card key={c.id} className="gap-2 p-4">
          <Badge variant="outline" className="w-fit">{c.type}</Badge>
          <p className="text-sm font-medium leading-snug">{c.title}</p>
          <p className="text-xs text-muted-foreground">{c.views.toLocaleString()} views · {c.downloads.toLocaleString()} downloads</p>
        </Card>
      ))}
    </div>
  );
}

function InsightsTab({ insights }: { insights: AiInsight[] }) {
  if (insights.length === 0) return <EmptyState title="No AI insights for this account" description="Check back as engagement data accumulates." />;

  return (
    <div className="space-y-3">
      {insights.map((insight) => (
        <Card key={insight.id} className="gap-2 p-4">
          <div className="flex items-center justify-between gap-2">
            <SeverityBadge severity={insight.severity} />
            {insight.value && <span className="text-xs font-semibold tabular-nums">{insight.value}</span>}
          </div>
          <p className="text-sm font-medium">{insight.title}</p>
          <p className="text-xs text-muted-foreground">{insight.description}</p>
          {insight.recommendedAction && (
            <p className="flex items-center gap-1 text-xs font-medium text-primary">
              <ExternalLink className="size-3" /> {insight.recommendedAction}
            </p>
          )}
        </Card>
      ))}
    </div>
  );
}

interface AccountDetailTabsProps {
  account: Account;
  stakeholders: Stakeholder[];
  timeline: TimelineEvent[];
  opportunities: Opportunity[];
  content: ContentAsset[];
  insights: AiInsight[];
}

export function AccountDetailTabs({ account, stakeholders, timeline, opportunities, content, insights }: AccountDetailTabsProps) {
  return (
    <Tabs defaultValue="summary">
      <TabsList className="flex-wrap h-auto">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
        <TabsTrigger value="stakeholders">Stakeholders ({stakeholders.length})</TabsTrigger>
        <TabsTrigger value="opportunities">Opportunities ({opportunities.length})</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="insights">AI Insights ({insights.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="summary">
        <SummaryTab account={account} stakeholders={stakeholders} opportunities={opportunities} />
      </TabsContent>
      <TabsContent value="timeline">
        <TimelineTab events={timeline} />
      </TabsContent>
      <TabsContent value="stakeholders">
        <StakeholdersTab stakeholders={stakeholders} />
      </TabsContent>
      <TabsContent value="opportunities">
        <OpportunitiesTab opportunities={opportunities} />
      </TabsContent>
      <TabsContent value="content">
        <ContentTab content={content} />
      </TabsContent>
      <TabsContent value="insights">
        <InsightsTab insights={insights} />
      </TabsContent>
    </Tabs>
  );
}
