"use client";

import { RotateCcw } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { REGIONS, OWNERS } from "@/data/companies";
import type { AccountStatus, Tier } from "@/types";

export interface AccountFilterState {
  search: string;
  tier: Tier | "all";
  region: string;
  owner: string;
  segment: string;
  status: AccountStatus | "all";
  minIntent: string;
}

export const DEFAULT_ACCOUNT_FILTERS: AccountFilterState = {
  search: "",
  tier: "all",
  region: "all",
  owner: "all",
  segment: "all",
  status: "all",
  minIntent: "all",
};

const TIERS: Tier[] = ["Tier 1", "Tier 2", "Tier 3"];
const SEGMENTS = ["Enterprise", "Mid-Market", "Growth"];
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
const INTENT_THRESHOLDS = [
  { label: "Any intent", value: "all" },
  { label: "70+", value: "70" },
  { label: "50+", value: "50" },
  { label: "30+", value: "30" },
];

interface AccountFiltersProps {
  value: AccountFilterState;
  onChange: (value: AccountFilterState) => void;
}

export function AccountFilters({ value, onChange }: AccountFiltersProps) {
  const set = <K extends keyof AccountFilterState>(key: K, v: AccountFilterState[K]) =>
    onChange({ ...value, [key]: v });

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <Input
        placeholder="Search accounts..."
        value={value.search}
        onChange={(e) => set("search", e.target.value)}
        className="h-9 w-52"
      />

      <Select value={value.tier} onValueChange={(v) => set("tier", v as AccountFilterState["tier"])}>
        <SelectTrigger size="sm"><SelectValue placeholder="Tier" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tiers</SelectItem>
          {TIERS.map((t) => (
            <SelectItem key={t} value={t}>{t}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={value.region} onValueChange={(v) => set("region", v)}>
        <SelectTrigger size="sm"><SelectValue placeholder="Region" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Regions</SelectItem>
          {REGIONS.map((r) => (
            <SelectItem key={r} value={r}>{r}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={value.segment} onValueChange={(v) => set("segment", v)}>
        <SelectTrigger size="sm"><SelectValue placeholder="Segment" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Segments</SelectItem>
          {SEGMENTS.map((s) => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={value.owner} onValueChange={(v) => set("owner", v)}>
        <SelectTrigger size="sm"><SelectValue placeholder="Owner" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Owners</SelectItem>
          {OWNERS.map((o) => (
            <SelectItem key={o.name} value={o.name}>{o.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={value.status} onValueChange={(v) => set("status", v as AccountFilterState["status"])}>
        <SelectTrigger size="sm"><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {STATUSES.map((s) => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={value.minIntent} onValueChange={(v) => set("minIntent", v)}>
        <SelectTrigger size="sm"><SelectValue placeholder="Intent" /></SelectTrigger>
        <SelectContent>
          {INTENT_THRESHOLDS.map((t) => (
            <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="ghost" size="sm" onClick={() => onChange(DEFAULT_ACCOUNT_FILTERS)}>
        <RotateCcw /> Reset
      </Button>
    </div>
  );
}
