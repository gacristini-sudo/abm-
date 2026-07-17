import Link from "next/link";

import { EntityAvatar } from "@/components/shared/entity-avatar";
import { relativeTime } from "@/lib/utils";
import type { TimelineEvent } from "@/types";
import { getAccountById } from "@/data/accounts";

export function ActivityFeed({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="flex flex-col divide-y divide-border/70">
      {events.map((event) => {
        const account = getAccountById(event.accountId);
        return (
          <Link
            key={event.id}
            href={`/accounts/${event.accountId}`}
            className="flex items-start gap-3 py-3 transition-colors hover:bg-accent/40 rounded-lg px-2 -mx-2"
          >
            <EntityAvatar name={account?.name ?? "?"} size="sm" shape="square" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{event.title}</p>
              <p className="truncate text-xs text-muted-foreground">
                {account?.name} · {event.actor}
              </p>
            </div>
            <span className="shrink-0 text-[11px] text-muted-foreground">{relativeTime(event.date)}</span>
          </Link>
        );
      })}
    </div>
  );
}
