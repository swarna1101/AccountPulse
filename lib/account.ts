import type { Account, AccountContext, Intelligence } from "@/lib/types";

export const EMPTY_CONTEXT: AccountContext = {
  renewal: "",
  product: "",
  champion: "",
  goal: "",
};

export function sanitizeContext(value: unknown): AccountContext {
  const record = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const text = (key: string, max: number) => {
    const raw = typeof record[key] === "string" ? record[key] : "";
    return raw.replace(/\s+/g, " ").trim().slice(0, max);
  };
  const renewal = text("renewal", 10);
  return {
    renewal: /^\d{4}-\d{2}-\d{2}$/.test(renewal) ? renewal : "",
    product: text("product", 120),
    champion: text("champion", 80),
    goal: text("goal", 160),
  };
}

export function hasContext(context: AccountContext | undefined): boolean {
  if (!context) return false;
  return Boolean(context.renewal || context.product || context.champion || context.goal);
}

export function signalKey(headline: string): string {
  return headline.trim().toLowerCase().replace(/\s+/g, " ");
}

export function signalKeys(intelligence: Intelligence | null | undefined): string[] {
  if (!intelligence) return [];
  return Array.from(new Set(intelligence.signals.map((signal) => signalKey(signal.headline)).filter(Boolean)));
}

export function unseenSignalKeys(account: Pick<Account, "intelligence" | "seenKeys">): string[] {
  const seen = new Set(account.seenKeys ?? []);
  return signalKeys(account.intelligence).filter((key) => !seen.has(key));
}
