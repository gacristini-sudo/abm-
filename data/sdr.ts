import type { SdrRep } from "@/types";
import { createRng, series } from "@/data/seed";

const rng = createRng(1111);

const REPS = [
  "Amelia Chen", "Marcus Webb", "Priya Sharma", "Jordan Blake", "Sofia Marin",
  "Ethan Cole", "Nina Patel", "Diego Ruiz", "Chloe Bennett", "Owen Fischer",
];

export const SDR_REPS: SdrRep[] = REPS.map((name, i) => {
  const emailsSent = rng.int(180, 620);
  const meetingsBooked = rng.int(6, 42);
  return {
    id: `sdr-${i + 1}`,
    name,
    avatar: "",
    emailsSent,
    calls: rng.int(80, 260),
    linkedinTouches: rng.int(40, 190),
    meetingsBooked,
    conversionRate: Math.round((meetingsBooked / emailsSent) * 1000) / 10,
    pipelineGenerated: rng.int(60, 640) * 1000,
    rank: 0,
    dailyActivity: series(14, rng.int(15, 45), 8, rng),
  };
})
  .sort((a, b) => b.pipelineGenerated - a.pipelineGenerated)
  .map((rep, i) => ({ ...rep, rank: i + 1 }));
