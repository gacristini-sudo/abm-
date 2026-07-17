"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { stakeholderColumns } from "@/components/features/stakeholders/stakeholder-columns";
import { STAKEHOLDERS } from "@/data/stakeholders";
import type { Stakeholder } from "@/types";

const DEPARTMENTS = Array.from(new Set(STAKEHOLDERS.map((s) => s.department))).sort();
const STATUSES: Stakeholder["status"][] = ["Champion", "Supporter", "Neutral", "Detractor", "Unknown"];

export default function StakeholdersPage() {
  const [search, setSearch] = React.useState("");
  const [department, setDepartment] = React.useState("all");
  const [status, setStatus] = React.useState("all");

  const filtered = React.useMemo(() => {
    return STAKEHOLDERS.filter((s) => {
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.accountName.toLowerCase().includes(search.toLowerCase())) return false;
      if (department !== "all" && s.department !== department) return false;
      if (status !== "all" && s.status !== status) return false;
      return true;
    });
  }, [search, department, status]);

  return (
    <div>
      <PageHeader
        title="Stakeholders"
        description={`${filtered.length} of ${STAKEHOLDERS.length} contacts across all accounts`}
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Input placeholder="Search by name or account..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 w-64" />
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger size="sm"><SelectValue placeholder="Area" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Areas</SelectItem>
            {DEPARTMENTS.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger size="sm"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="ghost" size="sm" onClick={() => { setSearch(""); setDepartment("all"); setStatus("all"); }}>
          <RotateCcw /> Reset
        </Button>
      </div>

      <DataTable
        columns={stakeholderColumns}
        data={filtered}
        pageSize={12}
        emptyTitle="No stakeholders match your filters"
        emptyDescription="Try adjusting or resetting your filters."
      />
    </div>
  );
}
