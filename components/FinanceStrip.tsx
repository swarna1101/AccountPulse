import type { FinancePicture, Ownership } from "@/lib/types";

const DIRECTION_LABEL: Record<FinancePicture["direction"], string> = {
  growing: "Growing",
  tightening: "Tightening",
  raising: "Raising",
  steady: "Steady",
  unknown: "",
};

export function FinanceStrip({
  finance,
  ownership,
}: {
  finance?: FinancePicture;
  ownership?: Ownership;
}) {
  const available = Boolean(finance?.available && finance.fact);
  const direction = finance && available ? DIRECTION_LABEL[finance.direction] : "";

  return (
    <section aria-labelledby="money-heading">
      <h2 id="money-heading" className="text-[11px] font-semibold tracking-[0.16em] text-muted">
        THE MONEY PICTURE
      </h2>
      <div className="mt-3 rounded-2xl border border-line bg-white px-5 py-5 sm:px-6">
        {available && finance ? (
          <>
            <div className="flex items-baseline justify-between gap-4">
              {direction ? <p className="text-[13px] font-medium text-accent-ink">{direction}</p> : <span />}
              {finance.period ? <p className="text-[12.5px] text-muted">{finance.period}</p> : null}
            </div>
            <p className="mt-2 max-w-[40rem] font-serif text-[1.35rem] leading-snug tracking-tight text-ink">
              {finance.fact}
            </p>
            {finance.whyItMatters ? (
              <p className="mt-3 max-w-[40rem] text-[14px] leading-6 text-ink-soft">{finance.whyItMatters}</p>
            ) : null}
          </>
        ) : (
          <>
            <p className="text-[15px] font-medium text-ink">No public financial detail</p>
            <p className="mt-2 max-w-[40rem] text-[14px] leading-6 text-ink-soft">
              {ownership === "private"
                ? "This company is private, and there isn’t a disclosed earnings figure to show. The brief below rests on other public signals."
                : "There isn’t a credible public number to put here. The brief below rests on other signals."}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
