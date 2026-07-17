"use client";

import * as React from "react";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const PREFERENCES = [
  { id: "email-digest", label: "Weekly performance digest", description: "A summary of pipeline, revenue, and account health every Monday.", defaultChecked: true },
  { id: "at-risk", label: "Account health alerts", description: "Get notified when a target account's health score drops sharply.", defaultChecked: true },
  { id: "intent-surge", label: "Intent surges", description: "Alert me when a target account shows a significant intent spike.", defaultChecked: true },
  { id: "meeting-booked", label: "Meeting booked", description: "Notify me when a meeting is booked with a target account.", defaultChecked: false },
  { id: "slack", label: "Slack notifications", description: "Mirror in-app notifications to the #revenue-alerts Slack channel.", defaultChecked: false },
];

export function NotificationsSection() {
  return (
    <div className="max-w-xl divide-y divide-border">
      {PREFERENCES.map((pref) => (
        <div key={pref.id} className="flex items-center justify-between gap-4 py-3.5">
          <div>
            <Label htmlFor={pref.id} className="text-sm font-medium">{pref.label}</Label>
            <p className="text-xs text-muted-foreground">{pref.description}</p>
          </div>
          <Switch id={pref.id} defaultChecked={pref.defaultChecked} />
        </div>
      ))}
    </div>
  );
}
