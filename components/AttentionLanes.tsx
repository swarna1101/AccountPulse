import type { AttentionItem } from "@/lib/types";
import { ATTENTION_LANES } from "@/lib/types";

export function AttentionLanes({ items, summary }: { items?: AttentionItem[]; summary?: string }) {
  const lanes = ATTENTION_LANES.map(
    (lane) => items?.find((item) => item.lane === lane) ?? { lane, status: "quiet" as const, headline: "", summary: "" },
  );
  if (!items?.length && !summary) return null;

  return (
    <section aria-labelledby="attention-heading">
      <h2 id="attention-heading" className="text-[15px] font-semibold tracking-tight text-ink">
        Where attention is going
      </h2>
      <p className="mt-1 text-[13.5px] text-ink-soft">The strongest recent change in each part of the business.</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {lanes.map((lane) => {
          const quiet = lane.status !== "active" || !lane.headline;
          return (
            <li key={lane.lane} className="rounded-2xl border border-line bg-white px-4 py-4">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted">{lane.lane.toUpperCase()}</p>
              {quiet ? (
                <p className="mt-2 text-[14px] text-muted">Quiet. Nothing recent worth raising.</p>
              ) : (
                <>
                  <p className="mt-2 text-[15px] font-medium leading-snug tracking-tight text-ink">{lane.headline}</p>
                  {lane.summary ? <p className="mt-1.5 text-[13.5px] leading-6 text-ink-soft">{lane.summary}</p> : null}
                </>
              )}
            </li>
          );
        })}
      </ul>
      {summary ? <p className="mt-4 max-w-[40rem] text-[14px] leading-6 text-ink-soft">{summary}</p> : null}
    </section>
  );
}
