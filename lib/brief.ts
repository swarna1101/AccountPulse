import type { Intelligence } from "@/lib/types";

export function hasUsableBrief(intelligence: Intelligence | null): boolean {
  if (!intelligence || intelligence.insufficientData) return false;
  const share = intelligence.shareToday;
  const hasShare = Boolean(share?.headline && share.insight && share.whyItMatters);
  return hasShare || intelligence.signals.length > 0;
}
