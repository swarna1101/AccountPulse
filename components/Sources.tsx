"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn, sourceCountLabel, sourceDomain } from "@/lib/format";
import type { Source } from "@/lib/types";

export function Sources({ sources }: { sources: Source[] }) {
  const [open, setOpen] = useState(false);
  if (sources.length === 0) return null;

  return (
    <section className="border-t border-line pt-4">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg py-1 text-left"
      >
        <span>
          <span className="block text-[13px] font-medium text-ink">Sources</span>
          <span className="mt-0.5 block text-[12.5px] text-muted">{sourceCountLabel(sources.length)}</span>
        </span>
        <ChevronDown
          className={cn("size-4 text-muted transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <ul className="mt-3 divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
          {sources.map((source) => {
            const domain = sourceDomain(source.url);
            return (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 px-4 py-3 text-[13.5px] transition-colors hover:bg-canvas"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-ink">{source.title}</span>
                    {domain ? <span className="block truncate text-[12px] text-muted">{domain}</span> : null}
                  </span>
                  <ExternalLink className="size-3.5 shrink-0 text-muted" aria-hidden="true" />
                  <span className="sr-only">Opens in a new tab</span>
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}
