import {
  Mail,
  Phone,
  Users as UsersIcon,
  Link2,
  CalendarDays,
  Download,
  MousePointerClick,
  Briefcase,
  FileText,
  Trophy,
  type LucideIcon,
} from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { relativeTime } from "@/lib/utils";
import type { TimelineEvent, TimelineEventType } from "@/types";

const TYPE_MAP: Record<TimelineEventType, { icon: LucideIcon; color: string }> = {
  Email: { icon: Mail, color: "text-blue-600 bg-blue-500/15" },
  Call: { icon: Phone, color: "text-emerald-600 bg-emerald-500/15" },
  Meeting: { icon: UsersIcon, color: "text-violet-600 bg-violet-500/15" },
  LinkedIn: { icon: Link2, color: "text-sky-600 bg-sky-500/15" },
  Event: { icon: CalendarDays, color: "text-orange-600 bg-orange-500/15" },
  Download: { icon: Download, color: "text-cyan-600 bg-cyan-500/15" },
  "Website Visit": { icon: MousePointerClick, color: "text-slate-600 bg-slate-500/15" },
  Opportunity: { icon: Briefcase, color: "text-amber-600 bg-amber-500/15" },
  Proposal: { icon: FileText, color: "text-pink-600 bg-pink-500/15" },
  "Closed Won": { icon: Trophy, color: "text-success bg-success/15" },
};

export function Timeline({ events }: { events: TimelineEvent[] }) {
  if (events.length === 0) {
    return <EmptyState title="No activity yet" description="Interactions with this account will appear here." />;
  }

  return (
    <div className="relative">
      <div className="absolute top-2 bottom-2 left-4 w-px bg-border" />
      <div className="flex flex-col gap-5">
        {events.map((event) => {
          const { icon: Icon, color } = TYPE_MAP[event.type];
          return (
            <div key={event.id} className="relative flex gap-4 pl-0">
              <div className={`z-10 flex size-8 shrink-0 items-center justify-center rounded-full ${color}`}>
                <Icon className="size-4" />
              </div>
              <div className="flex-1 pb-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium">{event.title}</p>
                  {event.meta && (
                    <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {event.meta}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{event.description}</p>
                <p className="mt-1 text-[11px] text-muted-foreground/80">
                  {event.actor} · {relativeTime(event.date)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
