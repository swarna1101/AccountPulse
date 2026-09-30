"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { formatHandoff } from "@/lib/handoff";
import type { Account } from "@/lib/types";

export function CallPrep({ account }: { account: Account }) {
  const prep = account.intelligence?.callPrep;
  const questions = prep?.questions ?? [];
  const hasPrep = Boolean(prep?.opportunity || prep?.risk || questions.length);
  const [copied, setCopied] = useState(false);

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(formatHandoff(account));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section aria-labelledby="call-heading">
      <div className="flex items-center justify-between gap-3">
        <h2 id="call-heading" className="text-[15px] font-semibold tracking-tight text-ink">
          For the call
        </h2>
        <button
          type="button"
          onClick={copyBrief}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[12.5px] font-medium text-accent-ink transition-colors hover:bg-accent-soft"
          aria-label={copied ? "Brief copied" : "Copy brief"}
        >
          {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
          {copied ? "Copied" : "Copy brief"}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </p>
      {hasPrep && prep ? (
        <div className="mt-4 rounded-2xl border border-line bg-white px-5 py-5 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2">
            {prep.opportunity ? (
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-muted">OPPORTUNITY</p>
                <p className="mt-2 text-[14.5px] leading-6 text-ink">{prep.opportunity}</p>
              </div>
            ) : null}
            {prep.risk ? (
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-muted">RISK</p>
                <p className="mt-2 text-[14.5px] leading-6 text-ink">{prep.risk}</p>
              </div>
            ) : null}
          </div>
          {questions.length > 0 ? (
            <div className={prep.opportunity || prep.risk ? "mt-5 border-t border-line pt-5" : ""}>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted">QUESTIONS TO ASK</p>
              <ol className="mt-3 list-decimal space-y-2.5 pl-5">
                {questions.map((question) => (
                  <li key={question} className="text-[14.5px] leading-6 text-ink">
                    {question}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="mt-2 max-w-[40rem] text-[14px] leading-6 text-ink-soft">
          An opportunity, a risk, and three questions appear with the brief. Copy still includes what you know and what to say.
        </p>
      )}
    </section>
  );
}
