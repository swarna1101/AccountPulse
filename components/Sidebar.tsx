"use client";

import { Plus, X } from "lucide-react";
import { AccountAvatar } from "@/components/AccountAvatar";
import { LogoMark } from "@/components/Logo";
import { cn } from "@/lib/format";
import type { Account } from "@/lib/types";

export function Sidebar({
  accounts,
  selectedId,
  researchingIds,
  mobileOpen,
  onSelect,
  onAdd,
  onRemove,
  onCloseMobile,
  onHome,
}: {
  accounts: Account[];
  selectedId: string;
  researchingIds: string[];
  mobileOpen: boolean;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onCloseMobile: () => void;
  onHome: () => void;
}) {
  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-[#1c1917]/30 md:hidden"
          aria-label="Close accounts"
          onClick={onCloseMobile}
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[252px] flex-col border-r border-line bg-sidebar",
          "transition-transform duration-200 md:z-20 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="px-3 pb-6 pt-4">
          <button
            type="button"
            onClick={onHome}
            aria-label="Back to start"
            className="flex w-full items-center gap-2.5 rounded-lg px-1 py-1.5 text-left"
          >
            <LogoMark />
            <span className="text-[15px] font-semibold tracking-tight text-ink">AccountPulse</span>
          </button>
        </div>

        <div className="px-3">
          <p className="px-2 pb-2 text-[11px] font-medium tracking-[0.16em] text-muted">ACCOUNTS</p>
          <ul className="space-y-0.5">
            {accounts.map((account) => {
              const selected = account.id === selectedId;
              const researching = researchingIds.includes(account.id);
              return (
                <li key={account.id}>
                  <div
                    className={cn(
                      "group flex items-center rounded-lg pr-1 transition-colors",
                      selected ? "bg-white shadow-[0_1px_2px_rgba(28,25,23,0.05)]" : "hover:bg-white/70",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => onSelect(account.id)}
                      aria-current={selected ? "true" : undefined}
                      className={cn(
                        "flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13.5px]",
                        selected ? "text-ink" : "text-ink-soft hover:text-ink",
                      )}
                    >
                      <AccountAvatar name={account.name} />
                      <span className="truncate">{account.name}</span>
                      {researching ? (
                        <span className="ml-auto size-1.5 shrink-0 animate-pulse rounded-full bg-accent" aria-hidden="true" />
                      ) : null}
                    </button>
                    {account.origin === "custom" ? (
                      <button
                        type="button"
                        aria-label={`Remove ${account.name}`}
                        onClick={() => onRemove(account.id)}
                        className="mr-1 rounded-md p-1 text-muted opacity-0 transition-opacity hover:text-ink focus-visible:opacity-100 group-hover:opacity-100 group-focus-within:opacity-100"
                      >
                        <X className="size-3.5" aria-hidden="true" />
                      </button>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={onAdd}
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-[13.5px] text-ink-soft transition-colors hover:bg-white/70 hover:text-ink"
          >
            <Plus className="size-4" aria-hidden="true" />
            Add account
          </button>
        </div>

        <p className="mt-auto px-5 py-5 text-[12px] text-muted">Built for Customer Success</p>
      </aside>
    </>
  );
}
