import { hasContext } from "@/lib/account";
import { formatRenewal } from "@/lib/format";
import type { Account } from "@/lib/types";

export function formatHandoff(account: Account): string {
  const lines: string[] = [account.name];
  const notes = account.context;
  const intelligence = account.intelligence;

  if (hasContext(notes)) {
    lines.push("", "What you know");
    if (notes.renewal) lines.push(`Renewal: ${formatRenewal(notes.renewal)}`);
    if (notes.product) lines.push(`What they bought: ${notes.product}`);
    if (notes.champion) lines.push(`Champion: ${notes.champion}`);
    if (notes.goal) lines.push(`What they’re trying to achieve: ${notes.goal}`);
  }

  const share = intelligence?.shareToday;
  if (share) {
    lines.push("", "What to share today", share.headline, share.insight, "", "Why it matters", share.whyItMatters, "", "Suggested conversation", share.conversationStarter);
  }

  const prep = intelligence?.callPrep;
  if (prep?.opportunity) lines.push("", "Opportunity", prep.opportunity);
  if (prep?.risk) lines.push("", "Risk", prep.risk);
  if (prep?.questions?.length) {
    lines.push("", "Questions to ask");
    prep.questions.forEach((question, index) => lines.push(`${index + 1}. ${question}`));
  }

  return lines.join("\n").trim();
}
