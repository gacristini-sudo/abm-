import type { MarketingEvent } from "@/types";
import { createRng, daysAgoIso, daysFromNowIso } from "@/data/seed";

const rng = createRng(909);

const EVENT_DEFS: { name: string; type: MarketingEvent["type"]; location: string; offsetDays: number }[] = [
  { name: "ABM Summit 2026", type: "Conference", location: "San Francisco, CA", offsetDays: 45 },
  { name: "Enterprise CIO Roundtable", type: "Roundtable", location: "New York, NY", offsetDays: 22 },
  { name: "Revenue Operations Live", type: "Webinar", location: "Virtual", offsetDays: 12 },
  { name: "Manufacturing Innovation Expo", type: "Trade Show", location: "Chicago, IL", offsetDays: 60 },
  { name: "Executive Dinner - Financial Services", type: "Field Event", location: "London, UK", offsetDays: 30 },
  { name: "Customer Advisory Board", type: "Roundtable", location: "Austin, TX", offsetDays: -14 },
  { name: "State of ABM Webinar Series #4", type: "Webinar", location: "Virtual", offsetDays: -30 },
  { name: "APAC Growth Forum", type: "Conference", location: "Singapore", offsetDays: -60 },
  { name: "Healthcare Vertical Breakfast", type: "Field Event", location: "Boston, MA", offsetDays: 8 },
  { name: "SaaStr Annual", type: "Trade Show", location: "San Mateo, CA", offsetDays: -90 },
];

export const MARKETING_EVENTS: MarketingEvent[] = EVENT_DEFS.map((def, i) => {
  const isPast = def.offsetDays < 0;
  const registered = rng.int(60, 420);
  const attended = isPast ? Math.round(registered * rng.float(0.55, 0.9)) : 0;
  const pipelineGenerated = isPast ? rng.int(80, 1600) * 1000 : 0;
  return {
    id: `event-${i + 1}`,
    name: def.name,
    type: def.type,
    date: def.offsetDays >= 0 ? daysFromNowIso(def.offsetDays) : daysAgoIso(-def.offsetDays),
    status: isPast ? "Completed" : def.offsetDays < 3 ? "Live" : "Upcoming",
    registered,
    attended,
    accountsInvolved: rng.int(20, 180),
    pipelineGenerated,
    revenueGenerated: isPast ? Math.round(pipelineGenerated * rng.float(0.1, 0.35)) : 0,
    location: def.location,
  };
});
