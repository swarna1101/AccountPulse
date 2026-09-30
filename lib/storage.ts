import { DEMO_ACCOUNTS, DEFAULT_ACCOUNT_ID } from "@/lib/demo-data";
import type { Account, Intelligence } from "@/lib/types";

const STORAGE_KEY = "accountpulse.v1";

type Override = {
  intelligence: Intelligence;
  updatedAt: string;
};

export type PersistedState = {
  selectedId: string;
  custom: Account[];
  overrides: Record<string, Override>;
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

  const state: PersistedState = {
    selectedId,
    custom: accounts.filter((account) => account.origin === "custom"),
    overrides,
  };
  const raw = JSON.stringify(state);

  try {
    window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // Persistence is helpful, not required. A full quota should not break the brief.
  }

  return raw;
}

export function hydrateAccounts(stored: PersistedState | null): { accounts: Account[]; selectedId: string } {
  const accounts = DEMO_ACCOUNTS.map((demo) => {
    const override = stored?.overrides[demo.id];
    if (!override) return demo;
    return {
      ...demo,
      name: override.intelligence.company.name || demo.name,
      intelligence: override.intelligence,
      updatedAt: override.updatedAt,
      live: true,
      error: null,
    };
  });

  for (const custom of stored?.custom ?? []) {
    if (!accounts.some((account) => account.id === custom.id)) {
      accounts.push({
        ...custom,
        origin: "custom",
        live: Boolean(custom.intelligence),
        error: custom.error ?? null,
        updatedAt: custom.updatedAt ?? null,
      });
    }
  }

  const selectedId =
    stored && accounts.some((account) => account.id === stored.selectedId)
      ? stored.selectedId
      : DEFAULT_ACCOUNT_ID;

  return { accounts, selectedId };
}
