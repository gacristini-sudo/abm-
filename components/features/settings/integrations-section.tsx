"use client";

import * as React from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EntityAvatar } from "@/components/shared/entity-avatar";

const INTEGRATIONS = [
  { name: "Salesforce", category: "CRM", connected: true },
  { name: "HubSpot", category: "Marketing Automation", connected: true },
  { name: "Slack", category: "Collaboration", connected: true },
  { name: "Bombora", category: "Intent Data", connected: true },
  { name: "6sense", category: "Intent Data", connected: false },
  { name: "ZoomInfo", category: "Data Enrichment", connected: true },
  { name: "LinkedIn Ads", category: "Advertising", connected: false },
  { name: "Google Ads", category: "Advertising", connected: false },
];

export function IntegrationsSection() {
  const [connections, setConnections] = React.useState(
    Object.fromEntries(INTEGRATIONS.map((i) => [i.name, i.connected]))
  );

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {INTEGRATIONS.map((integration) => {
        const connected = connections[integration.name];
        return (
          <Card key={integration.name} className="gap-3 p-4">
            <div className="flex items-center gap-3">
              <EntityAvatar name={integration.name} shape="square" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{integration.name}</p>
                <p className="text-xs text-muted-foreground">{integration.category}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Badge variant={connected ? "success" : "outline"}>{connected ? "Connected" : "Not connected"}</Badge>
              <Button
                size="sm"
                variant={connected ? "outline" : "default"}
                onClick={() => setConnections((c) => ({ ...c, [integration.name]: !c[integration.name] }))}
              >
                {connected ? "Disconnect" : "Connect"}
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
