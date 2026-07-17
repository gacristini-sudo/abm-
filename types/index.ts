export type Tier = "Tier 1" | "Tier 2" | "Tier 3";

export type AccountStatus =
  | "Target"
  | "Engaged"
  | "MQL"
  | "SAL"
  | "SQL"
  | "Opportunity"
  | "Proposal"
  | "Closed Won"
  | "Closed Lost";

export type HealthStatus = "Healthy" | "Neutral" | "At Risk" | "Critical";

export type Sentiment = "Positive" | "Neutral" | "Negative";

export interface TrendPoint {
  date: string;
  value: number;
}

export interface Account {
  id: string;
  name: string;
  domain: string;
  logo: string;
  segment: string;
  industry: string;
  tier: Tier;
  region: string;
  icpScore: number;
  intentScore: number;
  engagementScore: number;
  healthScore: number;
  pipeline: number;
  revenue: number;
  employees: number;
  owner: { name: string; avatar: string };
  status: AccountStatus;
  healthStatus: HealthStatus;
  lastInteraction: string;
  nextAction: string;
  sparkline: number[];
  stakeholderCount: number;
  openOpportunities: number;
  products: string[];
  address: string;
  website: string;
  description: string;
}

export interface Stakeholder {
  id: string;
  accountId: string;
  accountName: string;
  name: string;
  title: string;
  department: string;
  avatar: string;
  linkedin: string;
  email: string;
  influence: number;
  championScore: number;
  engagement: number;
  lastContact: string;
  sentiment: Sentiment;
  status: "Champion" | "Supporter" | "Neutral" | "Detractor" | "Unknown";
  isDecisionMaker: boolean;
}

export type TimelineEventType =
  | "Email"
  | "Call"
  | "Meeting"
  | "LinkedIn"
  | "Event"
  | "Download"
  | "Website Visit"
  | "Opportunity"
  | "Proposal"
  | "Closed Won";

export interface TimelineEvent {
  id: string;
  accountId: string;
  type: TimelineEventType;
  title: string;
  description: string;
  actor: string;
  date: string;
  meta?: string;
}

export interface PipelineStageData {
  stage: AccountStatus;
  count: number;
  value: number;
  avgDays: number;
  conversionRate: number;
}

export interface Opportunity {
  id: string;
  accountId: string;
  accountName: string;
  name: string;
  stage: AccountStatus;
  amount: number;
  probability: number;
  owner: string;
  closeDate: string;
  createdDate: string;
  product: string;
}

export interface Campaign {
  id: string;
  name: string;
  objective: string;
  channel: string;
  status: "Active" | "Paused" | "Completed" | "Draft";
  accounts: number;
  ctr: number;
  openRate: number;
  meetings: number;
  pipelineInfluenced: number;
  revenueInfluenced: number;
  roi: number;
  spend: number;
  startDate: string;
  endDate: string;
}

export type IntentSource = "Bombora" | "6sense" | "ZoomInfo" | "LinkedIn" | "Google";

export interface IntentTopic {
  topic: string;
  score: number;
  trend: number;
  accounts: number;
  category: string;
}

export interface IntentSignal {
  id: string;
  accountId: string;
  accountName: string;
  topic: string;
  score: number;
  source: IntentSource;
  surge: number;
  date: string;
}

export type ContentType = "Whitepaper" | "Case Study" | "Webinar" | "Event" | "Landing Page";

export interface ContentAsset {
  id: string;
  title: string;
  type: ContentType;
  views: number;
  downloads: number;
  avgTimeSeconds: number;
  pipelineInfluenced: number;
  revenueInfluenced: number;
  accountsEngaged: number;
  publishedDate: string;
  trend: number[];
}

export interface MarketingEvent {
  id: string;
  name: string;
  type: "Webinar" | "Conference" | "Roundtable" | "Trade Show" | "Field Event";
  date: string;
  status: "Upcoming" | "Live" | "Completed";
  registered: number;
  attended: number;
  accountsInvolved: number;
  pipelineGenerated: number;
  revenueGenerated: number;
  location: string;
}

export interface RevenuePoint {
  month: string;
  revenue: number;
  target: number;
  forecast: number;
}

export interface SdrRep {
  id: string;
  name: string;
  avatar: string;
  emailsSent: number;
  calls: number;
  linkedinTouches: number;
  meetingsBooked: number;
  conversionRate: number;
  pipelineGenerated: number;
  rank: number;
  dailyActivity: number[];
}

export type InsightType =
  | "risk"
  | "intent"
  | "action"
  | "expansion"
  | "stakeholder"
  | "content"
  | "probability"
  | "pipeline-risk"
  | "health";

export type InsightSeverity = "critical" | "warning" | "info" | "positive";

export interface AiInsight {
  id: string;
  type: InsightType;
  severity: InsightSeverity;
  title: string;
  description: string;
  accountId?: string;
  accountName?: string;
  value?: string;
  createdAt: string;
  recommendedAction?: string;
}

export interface KpiDatum {
  id: string;
  label: string;
  value: number;
  format: "currency" | "number" | "percent" | "days";
  previousValue: number;
  sparkline: number[];
  icon: string;
}
