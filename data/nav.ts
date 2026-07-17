import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Building2,
  Users,
  GitBranch,
  Megaphone,
  Radar,
  FileText,
  CalendarDays,
  BarChart3,
  Coins,
  Settings,
  Sparkles,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavSection {
  label?: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    items: [{ label: "Dashboard", href: "/", icon: LayoutDashboard }],
  },
  {
    label: "Revenue Engine",
    items: [
      { label: "Accounts", href: "/accounts", icon: Building2 },
      { label: "Stakeholders", href: "/stakeholders", icon: Users },
      { label: "Pipeline", href: "/pipeline", icon: GitBranch },
      { label: "Revenue", href: "/revenue", icon: Coins },
    ],
  },
  {
    label: "Marketing",
    items: [
      { label: "Campaigns", href: "/campaigns", icon: Megaphone },
      { label: "Intent Data", href: "/intent", icon: Radar },
      { label: "Content", href: "/content", icon: FileText },
      { label: "Events", href: "/events", icon: CalendarDays },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
      { label: "AI Insights", href: "/ai-insights", icon: Sparkles, badge: "AI" },
    ],
  },
  {
    items: [{ label: "Settings", href: "/settings", icon: Settings }],
  },
];

export const ALL_NAV_ITEMS: NavItem[] = NAV_SECTIONS.flatMap((s) => s.items);
