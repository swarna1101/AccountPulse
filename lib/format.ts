import type { Account } from "@/lib/types";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function initials(name: string): string {
  const words = name
    .replace(/[^A-Za-z0-9\s&]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return "•";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

const AVATAR_TONES = [
  "bg-[#E7E9F4] text-[#2C3878]",
  "bg-[#EFE7DF] text-[#6A5344]",
  "bg-[#E4EBE6] text-[#3E5348]",
  "bg-[#E8E6F0] text-[#433E5C]",
  "bg-[#F3E6E1] text-[#6B463C]",
];

export function avatarTone(name: string): string {
  let hash = 0;
  for (const char of name) hash = (hash + char.charCodeAt(0)) % AVATAR_TONES.length;
  return AVATAR_TONES[hash];
}

export function formatSignalDate(value: string, now = new Date()): string {
  if (!value) return "Recent";
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Recent";

  const startOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const days = Math.round((startOf(now) - startOf(date)) / 86_400_000);

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days > 1 && days < 14) return `${days} days ago`;
  if (days >= 14 && days < 45) {
    const weeks = Math.round(days / 7);
    return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() === now.getFullYear() ? undefined : "numeric",
  });
}

export function formatUpdated(account: Pick<Account, "origin" | "live" | "updatedAt">, now = Date.now()): string {
  if (account.origin === "sample" && !account.live) return "Sample brief";
  if (!account.updatedAt) return "Not researched yet";

  const then = new Date(account.updatedAt).getTime();
  if (Number.isNaN(then)) return "Updated just now";

  const diff = Math.max(0, now - then);
  if (diff < 45_000) return "Updated just now";

  const minutes = Math.round(diff / 60_000);
  if (minutes < 60) return `Updated ${minutes}m ago`;

  const hours = Math.round(diff / 3_600_000);
  if (hours < 24) return `Updated ${hours}h ago`;

  const days = Math.round(diff / 86_400_000);
  if (days === 1) return "Updated yesterday";
  if (days < 14) return `Updated ${days} days ago`;

  return `Updated ${new Date(account.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })}`;
}

export function sourceDomain(url: string): string | null {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (
      host.includes("google.com") ||
      host.includes("vertexaisearch") ||
      host.includes("googleapis.com") ||
      host.length === 0
    ) {
      return null;
    }
    return host;
  } catch {
    return null;
  }
}

export function sourceCountLabel(count: number): string {
  return count === 1 ? "1 public source used" : `${count} public sources used`;
}

export function messageFor(
  code: "invalid_company" | "missing_key" | "timeout" | "unavailable" | "malformed" | "quota" | "network",
  context: "sample" | "refresh" | "first",
): string {
  if (context === "sample") {
    if (code === "missing_key") {
      return "Live research isn’t available right now. You’re still seeing the sample brief.";
    }
    return "We couldn’t refresh this brief just now. You’re still seeing the sample brief.";
  }

  if (context === "refresh") {
    return "We couldn’t refresh this brief just now. You’re still seeing the last version.";
  }

  switch (code) {
    case "invalid_company":
      return "Enter the company name a customer would recognise.";
    case "missing_key":
      return "Live research isn’t available in this environment yet.";
    case "timeout":
      return "Research is taking longer than expected. Please try again.";
    case "quota":
      return "Live research is temporarily unavailable. Please try again in a little while.";
    case "malformed":
      return "We couldn’t put together a reliable brief from what we found. Please try again.";
    case "network":
      return "We couldn’t reach AccountPulse just now. Check your connection and try again.";
    default:
      return "We couldn’t research this account just now. Please try again in a moment.";
  }
}
