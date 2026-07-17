import type { Sentiment, Stakeholder } from "@/types";
import { ACCOUNTS } from "@/data/accounts";
import { createRng, daysAgoIso } from "@/data/seed";

const rng = createRng(202);

const FIRST_NAMES = [
  "James", "Maria", "Robert", "Linda", "Michael", "Elena", "David", "Sarah",
  "Kevin", "Grace", "Thomas", "Olivia", "Daniel", "Hana", "Chris", "Aisha",
  "Ryan", "Ines", "Victor", "Naomi", "Paul", "Yuki", "Alex", "Zara",
];
const LAST_NAMES = [
  "Anderson", "Torres", "Bennett", "Nakamura", "Foster", "Kowalski", "Reyes",
  "Whitfield", "Okafor", "Larsson", "Bianchi", "Novak", "Mercer", "Osei",
  "Delgado", "Hartman", "Sullivan", "Petrov", "Lindqvist", "Costa",
];
const TITLES = [
  { title: "Chief Information Officer", dept: "IT", influence: 95, decision: true },
  { title: "VP of Sales", dept: "Sales", influence: 88, decision: true },
  { title: "VP of Marketing", dept: "Marketing", influence: 80, decision: true },
  { title: "Director of Operations", dept: "Operations", influence: 70, decision: false },
  { title: "Head of Procurement", dept: "Procurement", influence: 82, decision: true },
  { title: "IT Director", dept: "IT", influence: 65, decision: false },
  { title: "Chief Financial Officer", dept: "Finance", influence: 92, decision: true },
  { title: "Product Manager", dept: "Product", influence: 45, decision: false },
  { title: "Revenue Operations Lead", dept: "Sales", influence: 60, decision: false },
  { title: "Marketing Manager", dept: "Marketing", influence: 40, decision: false },
  { title: "Senior Business Analyst", dept: "Operations", influence: 35, decision: false },
  { title: "Chief Executive Officer", dept: "Executive", influence: 99, decision: true },
];
const SENTIMENTS: Sentiment[] = ["Positive", "Neutral", "Negative"];
const STATUSES: Stakeholder["status"][] = ["Champion", "Supporter", "Neutral", "Detractor", "Unknown"];

export const STAKEHOLDERS: Stakeholder[] = ACCOUNTS.flatMap((account) => {
  const count = account.stakeholderCount;
  return Array.from({ length: count }).map((_, i) => {
    const first = rng.pick(FIRST_NAMES);
    const last = rng.pick(LAST_NAMES);
    const roleInfo = rng.pick(TITLES);
    const engagement = rng.int(10, 98);
    return {
      id: `${account.id}-stk-${i + 1}`,
      accountId: account.id,
      accountName: account.name,
      name: `${first} ${last}`,
      title: roleInfo.title,
      department: roleInfo.dept,
      avatar: "",
      linkedin: `https://linkedin.com/in/${first.toLowerCase()}-${last.toLowerCase()}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@${account.domain}`,
      influence: roleInfo.influence,
      championScore: rng.int(0, 100),
      engagement,
      lastContact: daysAgoIso(rng.int(0, 90)),
      sentiment: SENTIMENTS[rng.int(0, 2)],
      status: STATUSES[rng.int(0, STATUSES.length - 1)],
      isDecisionMaker: roleInfo.decision,
    };
  });
});

export function getStakeholdersByAccount(accountId: string): Stakeholder[] {
  return STAKEHOLDERS.filter((s) => s.accountId === accountId);
}
