import {
  Target,
  Users,
  Briefcase,
  Trophy,
  TrendingUp,
  DollarSign,
  Percent,
  Wallet,
  Gauge,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  Target,
  Users,
  Briefcase,
  Trophy,
  TrendingUp,
  DollarSign,
  Percent,
  Wallet,
  Gauge,
  Sparkles,
};

export function resolveIcon(name: string): LucideIcon {
  return ICONS[name] ?? Sparkles;
}
