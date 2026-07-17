import { notFound } from "next/navigation";

import { AccountHeader } from "@/components/features/accounts/account-header";
import { AccountDetailTabs } from "@/components/features/accounts/account-detail-tabs";

import { ACCOUNTS, getAccountById } from "@/data/accounts";
import { getStakeholdersByAccount } from "@/data/stakeholders";
import { getTimelineByAccount } from "@/data/timeline";
import { getOpportunitiesByAccount } from "@/data/pipeline";
import { AI_INSIGHTS } from "@/data/insights";
import { CONTENT_ASSETS } from "@/data/content";
import { createRng } from "@/data/seed";

export function generateStaticParams() {
  return ACCOUNTS.map((a) => ({ id: a.id }));
}

function contentForAccount(accountId: string) {
  const seed = accountId.split("-").reduce((s, part) => s + part.length, accountId.length * 17);
  const rng = createRng(seed);
  return rng.pickMultiple(CONTENT_ASSETS, rng.int(2, 5));
}

export default async function AccountDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const account = getAccountById(id);
  if (!account) notFound();

  const stakeholders = getStakeholdersByAccount(id);
  const timeline = getTimelineByAccount(id);
  const opportunities = getOpportunitiesByAccount(id);
  const insights = AI_INSIGHTS.filter((i) => i.accountId === id);
  const content = contentForAccount(id);

  return (
    <div>
      <AccountHeader account={account} />
      <AccountDetailTabs
        account={account}
        stakeholders={stakeholders}
        timeline={timeline}
        opportunities={opportunities}
        content={content}
        insights={insights}
      />
    </div>
  );
}
