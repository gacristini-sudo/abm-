"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Download, Plus } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { AccountFilters, DEFAULT_ACCOUNT_FILTERS, type AccountFilterState } from "@/components/features/accounts/account-filters";
import { accountColumns } from "@/components/features/accounts/account-columns";
import { ACCOUNTS } from "@/data/accounts";
import type { Account } from "@/types";

function filterAccounts(accounts: Account[], filters: AccountFilterState): Account[] {
  return accounts.filter((a) => {
    if (filters.search && !a.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.tier !== "all" && a.tier !== filters.tier) return false;
    if (filters.region !== "all" && a.region !== filters.region) return false;
    if (filters.owner !== "all" && a.owner.name !== filters.owner) return false;
    if (filters.segment !== "all" && a.segment !== filters.segment) return false;
    if (filters.status !== "all" && a.status !== filters.status) return false;
    if (filters.minIntent !== "all" && a.intentScore < Number(filters.minIntent)) return false;
    return true;
  });
}

export default function AccountsPage() {
  const router = useRouter();
  const [filters, setFilters] = React.useState<AccountFilterState>(DEFAULT_ACCOUNT_FILTERS);

  const filtered = React.useMemo(() => filterAccounts(ACCOUNTS, filters), [filters]);

  return (
    <div>
      <PageHeader
        title="Accounts"
        description={`${filtered.length} of ${ACCOUNTS.length} target accounts`}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download /> Export
            </Button>
            <Button size="sm">
              <Plus /> New Account
            </Button>
          </>
        }
      />

      <AccountFilters value={filters} onChange={setFilters} />

      <DataTable
        columns={accountColumns}
        data={filtered}
        pageSize={12}
        onRowClick={(account) => router.push(`/accounts/${account.id}`)}
        emptyTitle="No accounts match your filters"
        emptyDescription="Try adjusting or resetting your filters."
      />
    </div>
  );
}
