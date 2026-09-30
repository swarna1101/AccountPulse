"use client";

import { Menu } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AccountHeader } from "@/components/AccountHeader";
import { AddAccountModal } from "@/components/AddAccountModal";
import { Landing } from "@/components/Landing";
import { LoadingBrief } from "@/components/LoadingBrief";
import { ShareToday } from "@/components/ShareToday";
import { Sidebar } from "@/components/Sidebar";
import { SignalList } from "@/components/SignalList";
import { Sources } from "@/components/Sources";
import { StatusCard } from "@/components/StatusCard";
import { StrategicThemes } from "@/components/StrategicThemes";
import { hasUsableBrief } from "@/lib/brief";
import { companyKey } from "@/lib/company";
import { DEMO_ACCOUNTS, DEFAULT_ACCOUNT_ID } from "@/lib/demo-data";
import { messageFor } from "@/lib/format";
import { requestIntelligence } from "@/lib/research-client";
import { hydrateAccounts, parsePersisted, readPersistedRaw, savePersisted } from "@/lib/storage";
import type { Account } from "@/lib/types";

const SERVER_SNAPSHOT = "__server__";

function subscribePersisted(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === "accountpulse.v1") onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}

export function Dashboard() {
  const snapshot = useSyncExternalStore(subscribePersisted, readPersistedRaw, () => SERVER_SNAPSHOT);
  const [accounts, setAccounts] = useState<Account[]>(DEMO_ACCOUNTS);
  const [selectedId, setSelectedId] = useState(DEFAULT_ACCOUNT_ID);
  const [appliedSnapshot, setAppliedSnapshot] = useState<string | null>(null);
  const [screen, setScreen] = useState<"home" | "app">("home");
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [researchingIds, setResearchingIds] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const requests = useRef(new Map<string, number>());
  const accountsRef = useRef(accounts);
  const selectedIdRef = useRef(selectedId);

  if (snapshot !== SERVER_SNAPSHOT && snapshot !== appliedSnapshot) {
    setAppliedSnapshot(snapshot);
    const next = hydrateAccounts(parsePersisted(snapshot));
    setAccounts(next.accounts);
    setSelectedId(next.selectedId);
  }

  useEffect(() => {
    accountsRef.current = accounts;
    selectedIdRef.current = selectedId;
  });

  useEffect(() => {
    if (appliedSnapshot === null) return;
    savePersisted(accounts, selectedId);
  }, [accounts, selectedId, appliedSnapshot]);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const selected = accounts.find((account) => account.id === selectedId) ?? accounts[0];
  const researching = selected ? researchingIds.includes(selected.id) : false;

  function selectAccount(id: string) {
    setSelectedId(id);
    setNotice(null);
    setMobileOpen(false);
    setScreen("app");
  }

  function goHome() {
    setNotice(null);
    setMobileOpen(false);
    setScreen("home");
  }

  function removeAccount(id: string) {
    const remaining = accounts.filter((account) => account.id !== id);
    const next = remaining.length > 0 ? remaining : DEMO_ACCOUNTS;
    setAccounts(next);
    setSelectedId((current) => {
      if (current !== id) return current;
      const index = accounts.findIndex((account) => account.id === id);
      return next[Math.max(0, index - 1)]?.id ?? next[0].id;
    });
    setNotice(null);
  }

  function beginResearch(accountId: string) {
    setResearchingIds((current) => (current.includes(accountId) ? current : [...current, accountId]));
  }

  function endResearch(accountId: string) {
    setResearchingIds((current) => current.filter((id) => id !== accountId));
  }

  async function research(accountId: string, company: string) {
    const sequence = (requests.current.get(accountId) ?? 0) + 1;
    requests.current.set(accountId, sequence);
    beginResearch(accountId);
    setNotice(null);

    const result = await requestIntelligence(company);
    if (requests.current.get(accountId) !== sequence) return;

    const account = accountsRef.current.find((item) => item.id === accountId);
    const stillViewing = selectedIdRef.current === accountId;

    if (!account) {
      endResearch(accountId);
      return;
    }

    if (result.ok && hasUsableBrief(result.intelligence)) {
      const intelligence = result.intelligence;
      setAccounts((current) =>
        current.map((item) =>
          item.id === accountId
            ? {
                ...item,
                name: intelligence.company.name || item.name,
                intelligence,
                updatedAt: new Date().toISOString(),
                live: true,
                error: null,
              }
            : item,
        ),
      );
      endResearch(accountId);
      return;
    }

    if (result.ok && hasUsableBrief(account.intelligence)) {
      if (stillViewing) {
        setNotice(
          account.origin === "sample" && !account.live
            ? "We couldn’t find enough recent public information to replace the sample brief."
            : "We couldn’t find enough new public information to refresh this brief.",
        );
      }
      endResearch(accountId);
      return;
    }

    if (result.ok) {
      const intelligence = result.intelligence;
      setAccounts((current) =>
        current.map((item) =>
          item.id === accountId
            ? {
                ...item,
                name: intelligence.company.name || item.name,
                intelligence,
                updatedAt: new Date().toISOString(),
                live: true,
                error: null,
              }
            : item,
        ),
      );
      endResearch(accountId);
      return;
    }

    const context =
      account.origin === "sample" && !account.live
        ? "sample"
        : hasUsableBrief(account.intelligence)
          ? "refresh"
          : "first";
    const message = messageFor(result.code, context);

    if (context === "first") {
      setAccounts((current) =>
        current.map((item) => (item.id === accountId ? { ...item, error: message, live: false } : item)),
      );
    } else if (stillViewing) {
      setNotice(message);
    }

    endResearch(accountId);
  }

  function addAccount(company: string) {
    const existing = accounts.find((account) => companyKey(account.name) === companyKey(company));
    setModalOpen(false);

    if (existing) {
      setSelectedId(existing.id);
      setMobileOpen(false);
      void research(existing.id, company);
      return;
    }

    const account: Account = {
      id: `custom-${crypto.randomUUID()}`,
      name: company,
      origin: "custom",
      intelligence: null,
      updatedAt: null,
      live: false,
      error: null,
    };

    setAccounts((current) => [...current, account]);
    setSelectedId(account.id);
    setMobileOpen(false);
    setScreen("app");
    void research(account.id, company);
  }

  if (screen === "home") {
    return (
      <Landing
        accounts={accounts}
        onSearch={(company) => {
          setScreen("app");
          addAccount(company);
        }}
        onOpen={selectAccount}
      />
    );
  }

  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar
        accounts={accounts}
        selectedId={selected?.id ?? DEFAULT_ACCOUNT_ID}
        researchingIds={researchingIds}
        mobileOpen={mobileOpen}
        onSelect={selectAccount}
        onAdd={() => {
          setMobileOpen(false);
          setModalOpen(true);
        }}
        onRemove={removeAccount}
        onCloseMobile={() => setMobileOpen(false)}
        onHome={goHome}
      />

      <div className="min-h-screen md:pl-[252px]">
        <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-canvas px-4 py-3 md:hidden">
          <button
            type="button"
            aria-label="Open accounts"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-1.5 text-ink"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goHome}
            aria-label="Back to start"
            className="text-[15px] font-semibold tracking-tight"
          >
            AccountPulse
          </button>
        </div>

        <main className="mx-auto w-full max-w-[760px] px-5 py-8 sm:px-8 md:py-12">
          {selected && researching ? <LoadingBrief company={selected.name} /> : null}

          {selected && !researching ? (
            <div className="space-y-10">
              <AccountHeader
                account={selected}
                refreshing={false}
                onRefresh={() => void research(selected.id, selected.name)}
                onRemove={() => removeAccount(selected.id)}
              />

              {notice ? (
                <p role="status" className="rounded-xl border border-line bg-white px-4 py-3 text-[14px] leading-6 text-ink-soft">
                  {notice}
                </p>
              ) : null}

              {hasUsableBrief(selected.intelligence) && selected.intelligence ? (
                <Brief intelligence={selected.intelligence} sample={selected.origin === "sample" && !selected.live} name={selected.name} />
              ) : (
                <>
                  <StatusCard
                    title={selected.error ? "We couldn’t research this account" : "Not enough signal yet"}
                    body={
                      selected.error ??
                      "We couldn’t find enough recent, credible public information to build a strong account brief for this company."
                    }
                    actionLabel="Try again"
                    onAction={() => void research(selected.id, selected.name)}
                  />
                  {selected.intelligence?.sources?.length ? <Sources sources={selected.intelligence.sources} /> : null}
                </>
              )}
            </div>
          ) : null}
        </main>
      </div>

      {modalOpen ? <AddAccountModal onClose={closeModal} onSubmit={addAccount} /> : null}
    </div>
  );
}

function Brief({
  intelligence,
  sample,
  name,
}: {
  intelligence: NonNullable<Account["intelligence"]>;
  sample: boolean;
  name: string;
}) {
  return (
    <div className="space-y-10">
      <section>
        <p className="text-[11px] font-semibold tracking-[0.16em] text-muted">YOUR ACCOUNT BRIEF</p>
        <h1 className="mt-2 max-w-[36rem] font-serif text-[2.05rem] leading-[1.15] tracking-tight text-ink">
          Here’s what matters at {name} today.
        </h1>
        <p className="mt-3 max-w-[38rem] text-[15px] leading-7 text-ink-soft">
          Recent signals distilled into what you need to know before your next customer conversation.
        </p>
        {intelligence.executiveSummary ? (
          <p className="mt-4 max-w-[38rem] text-[15px] leading-7 text-ink">{intelligence.executiveSummary}</p>
        ) : null}
        {sample ? (
          <p className="mt-3 text-[13px] leading-6 text-muted">
            Prepared sample, so you can read a finished brief before researching a live account.
          </p>
        ) : null}
      </section>

      {intelligence.shareToday ? <ShareToday share={intelligence.shareToday} /> : null}
      <SignalList signals={intelligence.signals} />
      <StrategicThemes themes={intelligence.themes} summary={intelligence.themeSummary} />
      <Sources sources={intelligence.sources} />
    </div>
  );
}
