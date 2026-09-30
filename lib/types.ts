export const SIGNAL_CATEGORIES = [
  "People",
  "Hiring",
  "Product",
  "Funding",
  "Partnership",
  "Expansion",
  "Financial",
  "Strategy",
] as const;

export type SignalCategory = (typeof SIGNAL_CATEGORIES)[number];

export type Importance = "high" | "medium" | "low";

export type Ownership = "public" | "private" | "unknown";

export type CompanyProfile = {
  name: string;
  description: string;
  industry: string;
  location: string;
  website: string;
  ownership: Ownership;
};

export type FinanceDirection = "growing" | "tightening" | "raising" | "steady" | "unknown";

export type FinancePicture = {
  available: boolean;
  fact: string;
  period: string;
  direction: FinanceDirection;
  whyItMatters: string;
};

export const ATTENTION_LANES = ["Product", "People", "Money", "Market"] as const;

export type AttentionLane = (typeof ATTENTION_LANES)[number];

export type AttentionItem = {
  lane: AttentionLane;
  status: "active" | "quiet";
  headline: string;
  summary: string;
};

export type ShareToday = {
  category: SignalCategory;
  headline: string;
  insight: string;
  whyItMatters: string;
  conversationStarter: string;
};

export type Signal = {
  category: SignalCategory;
  headline: string;
  summary: string;
  whyItMatters: string;
  date: string;
  importance: Importance;
};

export type Source = {
  title: string;
  url: string;
};

export type Intelligence = {
  company: CompanyProfile;
  executiveSummary: string;
  shareToday: ShareToday | null;
  signals: Signal[];
  themes: string[];
  themeSummary: string;
  finance: FinancePicture;
  attention: AttentionItem[];
  sources: Source[];
  insufficientData: boolean;
};

export type AccountOrigin = "sample" | "custom";

export type Account = {
  id: string;
  name: string;
  origin: AccountOrigin;
  intelligence: Intelligence | null;
  updatedAt: string | null;
  live: boolean;
  error: string | null;
};

export type ApiErrorCode =
  | "invalid_company"
  | "missing_key"
  | "timeout"
  | "unavailable"
  | "malformed"
  | "quota";

export type IntelligenceApiResponse =
  | { ok: true; intelligence: Intelligence }
  | { ok: false; code: ApiErrorCode };
