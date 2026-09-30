import { hasContext, sanitizeContext, signalKeys } from "@/lib/account";
import { DEMO_ACCOUNTS, DEFAULT_ACCOUNT_ID } from "@/lib/demo-data";
import type { Account, AccountContext, Intelligence } from "@/lib/types";

const STORAGE_KEY = "accountpulse.v1";

type Override = {
  intelligence: Intelligence;
  updatedAt: string;
};

export type PersistedState = {
  selectedId: string;
  custom: Account[];
  overrides: Record<string, Override>;
  contexts: Record<string, AccountContext>;
  seen: Record<string, string[]>;
};

function isIntelligence(value: unknown): value is Intelligence {
  if (!value || typeof value !== "object") return false;
  const record = value as Intelligence;
  return Boolean(record.company && typeof record.company.name === "string" && Array.isArray(record.signals));
}

function isCustomAccount(value: unknown): value is Account {
  if (!value || typeof value !== "object") return false;
  const account = value as Account;
  return (
    typeof account.id === "string" &&
    typeof account.name === "string" &&
    account.origin === "custom" &&
    (account.intelligence === null || isIntelligence(account.intelligence))
  );
}

export function readPersistedRaw(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function parsePersisted(raw: string): PersistedState | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    const custom = Array.isArray(parsed.custom) ? parsed.custom.filter(isCustomAccount) : [];
    const overrides: Record<string, Override> = {};

    if (parsed.overrides && typeof parsed.overrides === "object") {
      for (const [id, value] of Object.entries(parsed.overrides)) {
        if (!value || typeof value !== "object") continue;
        const entry = value as Override;
        if (typeof entry.updatedAt === "string" && isIntelligence(entry.intelligence)) {
          overrides[id] = { intelligence: entry.intelligence, updatedAt: entry.updatedAt };
        }
      }
    }

    return {
      selectedId: typeof parsed.selectedId === "string" ? parsed.selectedId : DEFAULT_ACCOUNT_ID,
      custom,
      overrides,
      contexts: readContexts(parsed.contexts),
      seen: readSeen(parsed.seen),
    };
  } catch {
    return null;
  }
}

export function loadPersisted(): PersistedState | null {
  return parsePersisted(readPersistedRaw());
}

export function savePersisted(accounts: Account[], selectedId: string): string | null {
  if (typeof window === "undefined") return null;

  const overrides: Record<string, Override> = {};
  for (const account of accounts) {
    if (account.origin === "sample" && account.live && account.intelligence && account.updatedAt) {
      overrides[account.id] = {
        intelligence: account.intelligence,
        updatedAt: account.updatedAt,
      };
    }
  }

  const contexts: Record<string, AccountContext> = {};
  const seen: Record<string, string[]> = {};
  for (const account of accounts) {
    if (hasContext(account.context)) contexts[account.id] = sanitizeContext(account.context);
    if (account.seenKeys?.length) seen[account.id] = account.seenKeys;
  }

  const state: PersistedState = {
    selectedId,
    custom: accounts.filter((account) => account.origin === "custom"),
    overrides,
    contexts,
    seen,
  };
  const raw = JSON.stringify(state);

  try {
    window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // Persistence is helpful, not required. A full quota should not break the brief.
  }

  return raw;
}

function readContexts(value: unknown): Record<string, AccountContext> {
  if (!value || typeof value !== "object") return {};
  const contexts: Record<string, AccountContext> = {};
  for (const [id, entry] of Object.entries(value)) {
    const context = sanitizeContext(entry);
    if (hasContext(context)) contexts[id] = context;
  }
  return contexts;
}

function readSeen(value: unknown): Record<string, string[]> {
  if (!value || typeof value !== "object") return {};
  const seen: Record<string, string[]> = {};
  for (const [id, entry] of Object.entries(value)) {
    if (!Array.isArray(entry)) continue;
    const keys = entry.filter((key): key is string => typeof key === "string" && key.length > 0);
    if (keys.length > 0) seen[id] = keys;
  }
  return seen;
}

function withBook(account: Account, stored: PersistedState | null): Account {
  const context = stored?.contexts[account.id] ?? sanitizeContext(account.context);
  const seenKeys =
    stored?.seen && account.id in stored.seen
      ? stored.seen[account.id]
      : account.seenKeys?.length
        ? account.seenKeys
        : signalKeys(account.intelligence);
  return { ...account, context, seenKeys };
}

export function hydrateAccounts(stored: PersistedState | null): { accounts: Account[]; selectedId: string } {
  const accounts = DEMO_ACCOUNTS.map((demo) => {
    const override = stored?.overrides[demo.id];
    const account = override
      ? {
          ...demo,
          name: override.intelligence.company.name || demo.name,
          intelligence: override.intelligence,
          updatedAt: override.updatedAt,
          live: true,
          error: null,
        }
      : demo;
    return withBook(account, stored);
  });

  for (const custom of stored?.custom ?? []) {
    if (!accounts.some((account) => account.id === custom.id)) {
      accounts.push(
        withBook(
          {
            ...custom,
            origin: "custom",
            live: Boolean(custom.intelligence),
            error: custom.error ?? null,
            updatedAt: custom.updatedAt ?? null,
            context: sanitizeContext(custom.context),
            seenKeys: Array.isArray(custom.seenKeys) ? custom.seenKeys : [],
          },
          stored,
        ),
      );
    }
  }

  const selectedId =
    stored && accounts.some((account) => account.id === stored.selectedId)
      ? stored.selectedId
      : DEFAULT_ACCOUNT_ID;

  return { accounts, selectedId };
}
