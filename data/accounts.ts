import type { Account, AccountStatus, HealthStatus, Tier } from "@/types";
import { COMPANIES, OWNERS, REGIONS, PRODUCTS } from "@/data/companies";
import { createRng, daysAgoIso, series } from "@/data/seed";

const rng = createRng(101);

const STATUSES: AccountStatus[] = [
  "Target",
  "Engaged",
  "MQL",
  "SAL",
  "SQL",
  "Opportunity",
  "Proposal",
  "Closed Won",
  "Closed Lost",
];

const NEXT_ACTIONS = [
  "Send proposal follow-up",
  "Schedule executive briefing",
  "Share ROI case study",
  "Book demo with IT stakeholders",
  "Confirm renewal terms",
  "Introduce Customer Success",
  "Send pricing options",
  "Follow up on RFP",
  "Coordinate onsite workshop",
  "Re-engage after intent surge",
];

function tierFor(index: number): Tier {
  if (index % 5 === 0) return "Tier 1";
  if (index % 2 === 0) return "Tier 2";
  return "Tier 3";
}

function healthFor(score: number): HealthStatus {
  if (score >= 75) return "Healthy";
  if (score >= 55) return "Neutral";
  if (score >= 35) return "At Risk";
  return "Critical";
}

export const ACCOUNTS: Account[] = COMPANIES.map((company, index) => {
  const tier = tierFor(index);
  const icpScore = rng.int(45, 99);
  const intentScore = rng.int(20, 99);
  const engagementScore = rng.int(15, 98);
  const healthScore = rng.int(20, 98);
  const status = STATUSES[rng.int(0, STATUSES.length - 1)];
  const isClosedWon = status === "Closed Won";
  const isClosedLost = status === "Closed Lost";
  const pipeline = isClosedWon || isClosedLost ? 0 : rng.int(15, 950) * 1000;
  const revenue = isClosedWon ? rng.int(50, 1800) * 1000 : rng.int(0, 3) === 0 ? rng.int(10, 300) * 1000 : 0;

  return {
    id: `acc-${index + 1}`,
    name: company.name,
    domain: company.domain,
    logo: "",
    segment: company.segment,
    industry: company.industry,
    tier,
    region: REGIONS[index % REGIONS.length],
    icpScore,
    intentScore,
    engagementScore,
    healthScore,
    pipeline,
    revenue,
    employees: company.employees,
    owner: OWNERS[index % OWNERS.length],
    status,
    healthStatus: healthFor(healthScore),
    lastInteraction: daysAgoIso(rng.int(0, 45)),
    nextAction: NEXT_ACTIONS[rng.int(0, NEXT_ACTIONS.length - 1)],
    sparkline: series(12, rng.int(20, 80), 12, rng),
    stakeholderCount: rng.int(2, 14),
    openOpportunities: isClosedWon || isClosedLost ? 0 : rng.int(0, 4),
    products: rng.pickMultiple(PRODUCTS, rng.int(1, 3)),
    address: `${rng.int(100, 9900)} ${rng.pick(["Market", "Commerce", "Innovation", "Harbor", "Summit"])} ${rng.pick(["St", "Ave", "Blvd", "Way"])}, ${rng.pick(["San Francisco, CA", "Austin, TX", "New York, NY", "Chicago, IL", "Seattle, WA", "London, UK", "Singapore", "Toronto, ON"])}`,
    website: `https://www.${company.domain}`,
    description: `${company.name} is ${/^[aeiou]/i.test(company.segment) ? "an" : "a"} ${company.segment.toLowerCase()} ${company.industry.toLowerCase()} organization with ${company.employees.toLocaleString()} employees, evaluating solutions to modernize revenue operations and accelerate growth.`,
  };
});

export function getAccountById(id: string): Account | undefined {
  return ACCOUNTS.find((a) => a.id === id);
}
