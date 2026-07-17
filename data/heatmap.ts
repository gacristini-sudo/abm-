import { ACCOUNTS } from "@/data/accounts";
import { createRng } from "@/data/seed";

const rng = createRng(1414);

export const HEATMAP_WEEKS = Array.from({ length: 10 }).map((_, i) => `W${i + 1}`);

export const ENGAGEMENT_HEATMAP = [...ACCOUNTS]
  .sort((a, b) => b.engagementScore - a.engagementScore)
  .slice(0, 10)
  .map((account) => ({
    label: account.name,
    values: HEATMAP_WEEKS.map(() => rng.int(5, 100)),
  }));
