import type { ContentAsset, ContentType } from "@/types";
import { createRng, daysAgoIso, series } from "@/data/seed";

const rng = createRng(808);

const CONTENT_DEFS: { title: string; type: ContentType }[] = [
  { title: "2026 State of Account-Based Marketing", type: "Whitepaper" },
  { title: "How Cascade Financial Cut Sales Cycle by 40%", type: "Case Study" },
  { title: "Scaling Enterprise ABM: Live Webinar", type: "Webinar" },
  { title: "The ROI of Intent-Driven Selling", type: "Whitepaper" },
  { title: "Northwind Logistics Success Story", type: "Case Study" },
  { title: "ABM Summit 2026 Highlights", type: "Event" },
  { title: "Enterprise Pricing & Packaging", type: "Landing Page" },
  { title: "AI Copilot for Revenue Teams", type: "Landing Page" },
  { title: "Building a Revenue Operations Center of Excellence", type: "Webinar" },
  { title: "Manufacturing Vertical Playbook", type: "Whitepaper" },
  { title: "Zenith Aerospace Expansion Story", type: "Case Study" },
  { title: "Buyer Intent 101: A Practical Guide", type: "Whitepaper" },
  { title: "Free ROI Calculator", type: "Landing Page" },
  { title: "Customer Advisory Board Recap", type: "Event" },
  { title: "Migrating from Legacy MAP: Field Guide", type: "Whitepaper" },
];

export const CONTENT_ASSETS: ContentAsset[] = CONTENT_DEFS.map((def, i) => {
  const views = rng.int(800, 24000);
  const downloads = Math.round(views * rng.float(0.08, 0.35));
  const pipelineInfluenced = rng.int(60, 1800) * 1000;
  return {
    id: `content-${i + 1}`,
    title: def.title,
    type: def.type,
    views,
    downloads,
    avgTimeSeconds: rng.int(45, 480),
    pipelineInfluenced,
    revenueInfluenced: Math.round(pipelineInfluenced * rng.float(0.1, 0.4)),
    accountsEngaged: rng.int(20, 340),
    publishedDate: daysAgoIso(rng.int(10, 400)),
    trend: series(8, rng.int(30, 90), 15, rng),
  };
});
