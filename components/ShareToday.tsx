"use client";

import { Check, Copy, Sparkles } from "lucide-react";
import { useState } from "react";
import type { ShareToday as ShareTodayInsight } from "@/lib/types";

export function ShareToday({ share }: { share: ShareTodayInsight }) {
  const [copied, setCopied] = useState(false);

  async function copyStarter() {
    try {
      await navigator.clipboard.writeText(share.conversationStarter);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(28,25,23,0.04)]">
      <div className="h-0.5 bg-accent" />
      <div className="px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
        <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-accent">
          <Sparkles className="size-3.5" aria-hidden="true" />
          WHAT TO SHARE TODAY
        </p>

        <span className="mt-5 inline-flex rounded-full bg-accent-soft px-2.5 py-1 text-[12px] font-medium text-accent-ink">
          {share.category}
        </span>

        <h2 className="mt-3 max-w-[38rem] font-serif text-[1.85rem] leading-[1.15] tracking-tight text-ink">
          {share.headline}
        </h2>
        <p className="mt-3 max-w-[40rem] text-[15px] leading-7 text-ink-soft">{share.insight}</p>

        <div className="my-6 h-px bg-line" />

        <p className="text-[11px] font-semibold tracking-[0.16em] text-muted">WHY THIS MATTERS</p>
        <p className="mt-2 max-w-[40rem] text-[15px] leading-7 text-ink">{share.whyItMatters}</p>

        <div className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-muted">SUGGESTED CONVERSATION</p>
            <button
              type="button"
              onClick={copyStarter}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[12.5px] font-medium text-accent-ink transition-colors hover:bg-accent-soft"
              aria-label={copied ? "Conversation copied" : "Copy conversation starter"}
            >
              {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <blockquote className="mt-3 rounded-xl bg-[#f4f5fa] px-4 py-4 font-serif text-[17px] italic leading-7 text-ink">
            “{share.conversationStarter}”
          </blockquote>
          <p className="sr-only" aria-live="polite">
            {copied ? "Copied to clipboard" : ""}
          </p>
        </div>
      </div>
    </article>
  );
}
