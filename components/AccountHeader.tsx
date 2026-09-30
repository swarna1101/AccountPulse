"use client";

import { RefreshCw } from "lucide-react";
import { AccountAvatar } from "@/components/AccountAvatar";
import { cn, formatUpdated } from "@/lib/format";
import type { Account } from "@/lib/types";

export function AccountHeader({
  account,
  refreshing,
  onRefresh,
  onRemove,
}: {
  account: Account;
  refreshing: boolean;
  onRefresh: () => void;
  onRemove: () => void;
}) {
  const profile = account.intelligence?.company;
  const description = profile?.description || profile?.industry || "";
  const location = profile?.location || "";
  const showSample = account.origin === "sample" && !account.live;

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 items-start gap-3.5">
        <AccountAvatar name={account.name} size="md" />
        <div className="min-w-0 pt-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-[1.35rem] font-semibold tracking-tight text-ink">{account.name}</p>
            {showSample ? (
              <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-muted ring-1 ring-line">
                Sample
              </span>
            ) : null}
            {profile?.ownership === "public" || profile?.ownership === "private" ? (
              <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-muted ring-1 ring-line">
                {profile.ownership === "public" ? "Public" : "Private"}
              </span>
            ) : null}
          </div>
          {description ? <p className="mt-0.5 text-[14px] text-ink-soft">{description}</p> : null}
          {location ? <p className="text-[13px] text-muted">{location}</p> : null}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
        <p className="text-[12.5px] text-muted">{formatUpdated(account)}</p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] text-ink-soft transition-colors hover:bg-white hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw className={cn("size-3.5", refreshing && "animate-spin")} aria-hidden="true" />
            Refresh intelligence
          </button>
          {account.origin === "custom" ? (
            <button
              type="button"
              onClick={onRemove}
              className="rounded-lg px-2 py-1.5 text-[13px] text-muted transition-colors hover:bg-white hover:text-ink"
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
