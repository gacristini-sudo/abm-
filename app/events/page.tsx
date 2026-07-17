import { Calendar, MapPin, Users2 } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { MARKETING_EVENTS } from "@/data/events";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { MarketingEvent } from "@/types";

const STATUS_VARIANT: Record<MarketingEvent["status"], "info" | "success" | "outline"> = {
  Upcoming: "info",
  Live: "success",
  Completed: "outline",
};

function EventCard({ event }: { event: MarketingEvent }) {
  return (
    <Card className="gap-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <Badge variant="outline" className="mb-1.5">{event.type}</Badge>
          <p className="text-sm font-semibold leading-snug">{event.name}</p>
        </div>
        <Badge variant={STATUS_VARIANT[event.status]} className="shrink-0">{event.status}</Badge>
      </div>
      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Calendar className="size-3.5" /> {formatDate(event.date)}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="size-3.5" /> {event.location}
        </span>
        <span className="flex items-center gap-1.5">
          <Users2 className="size-3.5" /> {event.registered} registered
          {event.status === "Completed" && ` · ${event.attended} attended`}
        </span>
      </div>
      {event.status === "Completed" && (
        <div className="flex items-center justify-between border-t border-border pt-2.5 text-xs">
          <span className="text-muted-foreground">Pipeline generated</span>
          <span className="font-semibold tabular-nums">{formatCurrency(event.pipelineGenerated)}</span>
        </div>
      )}
    </Card>
  );
}

export default function EventsPage() {
  const upcoming = MARKETING_EVENTS.filter((e) => e.status !== "Completed").sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const past = MARKETING_EVENTS.filter((e) => e.status === "Completed").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const totalPipeline = past.reduce((s, e) => s + e.pipelineGenerated, 0);

  return (
    <div>
      <PageHeader
        title="Events"
        description={`${upcoming.length} upcoming · ${past.length} completed · ${formatCurrency(totalPipeline)} pipeline generated`}
      />

      <SectionCard title="Upcoming & Live" className="mb-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Completed">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {past.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
