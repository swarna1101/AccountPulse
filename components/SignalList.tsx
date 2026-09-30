import {
  Compass,
  Globe,
  Handshake,
  Landmark,
  Layers,
  UserPlus,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { signalKey } from "@/lib/account";
import { formatSignalDate } from "@/lib/format";
import type { Signal, SignalCategory } from "@/lib/types";

const ICONS: Record<SignalCategory, LucideIcon> = {
  People: Users,
  Hiring: UserPlus,
  Product: Layers,
  Funding: Landmark,
  Partnership: Handshake,
  Expansion: Globe,
  Financial: Wallet,
  Strategy: Compass,
};

export function SignalList({ signals, freshKeys = [] }: { signals: Signal[]; freshKeys?: string[] }) {
  if (signals.length === 0) return null;

  return (
    <section>
      <h2 className="text-[15px] font-semibold tracking-tight text-ink">Recent signals</h2>
      <p className="mt-1 text-[13.5px] text-ink-soft">Meaningful changes across the account.</p>

      <div className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
        {signals.map((signal) => {
          const Icon = ICONS[signal.category];
          const isNew = freshKeys.includes(signalKey(signal.headline));
          return (
            <article key={`${signal.category}-${signal.headline}`} className="px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-muted">
                <Icon className="size-3.5 text-ink-soft" aria-hidden="true" />
                <span className="font-medium text-ink-soft">{signal.category}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={signal.date || undefined}>{formatSignalDate(signal.date)}</time>
                {isNew ? (
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent-ink">New</span>
                ) : null}
                {signal.importance === "high" ? (
                  <span className="ml-auto rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent-ink">
                    High relevance
                  </span>
                ) : null}
              </div>
              <h3 className="mt-1.5 text-[15px] font-medium tracking-tight text-ink">{signal.headline}</h3>
              <p className="mt-1 text-[14px] leading-6 text-ink-soft">{signal.summary}</p>
              <p className="mt-2 text-[13.5px] leading-6 text-ink">
                <span className="text-muted">Why it matters. </span>
                {signal.whyItMatters}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
