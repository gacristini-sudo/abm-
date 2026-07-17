import type { TimelineEvent, TimelineEventType } from "@/types";
import { ACCOUNTS } from "@/data/accounts";
import { STAKEHOLDERS } from "@/data/stakeholders";
import { createRng, daysAgoIso } from "@/data/seed";

const rng = createRng(303);

const EVENT_LIBRARY: { type: TimelineEventType; titles: string[] }[] = [
  { type: "Email", titles: ["Follow-up email sent", "Nurture email opened", "Replied to pricing inquiry"] },
  { type: "Call", titles: ["Discovery call completed", "Follow-up call scheduled", "Renewal check-in call"] },
  { type: "Meeting", titles: ["Executive briefing held", "Product demo delivered", "QBR meeting completed"] },
  { type: "LinkedIn", titles: ["Engaged with LinkedIn post", "Accepted connection request", "Commented on company update"] },
  { type: "Event", titles: ["Attended webinar", "Registered for field event", "Visited conference booth"] },
  { type: "Download", titles: ["Downloaded whitepaper", "Downloaded ROI calculator", "Downloaded case study"] },
  { type: "Website Visit", titles: ["Visited pricing page", "Viewed product tour", "Returned to site 3x this week"] },
  { type: "Opportunity", titles: ["Opportunity created", "Opportunity stage advanced", "Opportunity re-qualified"] },
  { type: "Proposal", titles: ["Proposal sent", "Proposal revised", "Contract redlines exchanged"] },
  { type: "Closed Won", titles: ["Deal closed won", "Contract signed"] },
];

export const TIMELINE_EVENTS: TimelineEvent[] = ACCOUNTS.flatMap((account) => {
  const count = rng.int(6, 16);
  const stakeholders = STAKEHOLDERS.filter((s) => s.accountId === account.id);
  return Array.from({ length: count }).map((_, i) => {
    const group = rng.pick(EVENT_LIBRARY);
    const actor = stakeholders.length
      ? rng.pick(stakeholders).name
      : rng.pick(["Amelia Chen", "Marcus Webb", "System"]);
    return {
      id: `${account.id}-evt-${i + 1}`,
      accountId: account.id,
      type: group.type,
      title: rng.pick(group.titles),
      description: `${group.type} activity logged for ${account.name}.`,
      actor,
      date: daysAgoIso(rng.int(0, 120)),
      meta: rng.bool(0.4) ? rng.pick(["High priority", "AI flagged", "Auto-logged", "Manual entry"]) : undefined,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export function getTimelineByAccount(accountId: string): TimelineEvent[] {
  return TIMELINE_EVENTS.filter((e) => e.accountId === accountId).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
