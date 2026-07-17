export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "insight" | "activity" | "system";
}

export const NOTIFICATIONS: NotificationItem[] = [
  { id: "n1", title: "High intent surge detected", description: "Zenith Aerospace intent score jumped to 94", time: "12m ago", read: false, type: "insight" },
  { id: "n2", title: "Proposal viewed", description: "Cascade Financial Group opened your proposal", time: "1h ago", read: false, type: "activity" },
  { id: "n3", title: "Account at risk", description: "Harbor Point Bank health score dropped below 40", time: "3h ago", read: false, type: "insight" },
  { id: "n4", title: "Meeting booked", description: "New meeting scheduled with Aurora Pharmaceuticals", time: "5h ago", read: true, type: "activity" },
  { id: "n5", title: "Weekly report ready", description: "Your ABM performance digest for this week is ready", time: "1d ago", read: true, type: "system" },
];
