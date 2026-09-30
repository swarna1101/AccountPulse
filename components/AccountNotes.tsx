"use client";

import { useState, type ReactNode } from "react";
import { hasContext, sanitizeContext } from "@/lib/account";
import { formatRenewal } from "@/lib/format";
import type { AccountContext } from "@/lib/types";

export function AccountNotes({
  context,
  onSave,
}: {
  context: AccountContext;
  onSave: (context: AccountContext) => void;
}) {
  const filled = hasContext(context);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(context);

  function startEditing() {
    setDraft(context);
    setEditing(true);
  }

  function save() {
    const next = sanitizeContext(draft);
    onSave(next);
    setEditing(!hasContext(next));
  }

  return (
    <section aria-labelledby="notes-heading" className="rounded-2xl border border-line bg-white px-5 py-5 sm:px-6">
      <h2 id="notes-heading" className="text-[11px] font-semibold tracking-[0.16em] text-muted">
        WHAT YOU KNOW
      </h2>
      {!filled && !editing ? (
        <div className="mt-2 flex items-start justify-between gap-4">
          <p className="max-w-[36rem] text-[14px] leading-6 text-ink-soft">
            Add the renewal, what they bought, the champion, and the goal. Kept on this browser, and used the next time you refresh the brief.
          </p>
          <button
            type="button"
            onClick={startEditing}
            className="shrink-0 rounded-lg px-2 py-1.5 text-[13px] font-medium text-accent-ink hover:bg-accent-soft"
          >
            Add notes
          </button>
        </div>
      ) : null}
      {editing ? (
        <>
          <p className="mt-2 max-w-[40rem] text-[14px] leading-6 text-ink-soft">
            Renewal, what they bought, the champion, and the goal. Kept on this browser, and used the next time you refresh the brief.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Field label="Renewal" htmlFor="account-renewal">
              <input
                id="account-renewal"
                type="date"
                value={draft.renewal}
                onChange={(event) => setDraft((current) => ({ ...current, renewal: event.target.value }))}
                className="h-10 w-full rounded-lg border border-line bg-canvas px-3 text-[14px] text-ink outline-none"
              />
            </Field>
            <Field label="What they bought" htmlFor="account-product">
              <input
                id="account-product"
                value={draft.product}
                maxLength={120}
                onChange={(event) => setDraft((current) => ({ ...current, product: event.target.value }))}
                className="h-10 w-full rounded-lg border border-line bg-canvas px-3 text-[14px] text-ink outline-none"
              />
            </Field>
            <Field label="Champion" htmlFor="account-champion">
              <input
                id="account-champion"
                value={draft.champion}
                maxLength={80}
                onChange={(event) => setDraft((current) => ({ ...current, champion: event.target.value }))}
                className="h-10 w-full rounded-lg border border-line bg-canvas px-3 text-[14px] text-ink outline-none"
              />
            </Field>
            <Field label="What they’re trying to achieve" htmlFor="account-goal">
              <input
                id="account-goal"
                value={draft.goal}
                maxLength={160}
                onChange={(event) => setDraft((current) => ({ ...current, goal: event.target.value }))}
                className="h-10 w-full rounded-lg border border-line bg-canvas px-3 text-[14px] text-ink outline-none"
              />
            </Field>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={save}
              className="rounded-lg bg-accent px-3 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-accent-ink"
            >
              Save notes
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-lg px-2 py-1.5 text-[13px] text-ink-soft hover:text-ink"
            >
              Cancel
            </button>
          </div>
        </>
      ) : filled ? (
        <div className="mt-3 flex items-start justify-between gap-4">
          <ul className="space-y-1 text-[14px] leading-6 text-ink">
            {context.renewal ? <li>Renewal {formatRenewal(context.renewal)}</li> : null}
            {context.product ? <li>Bought {context.product}</li> : null}
            {context.champion ? <li>Champion {context.champion}</li> : null}
            {context.goal ? <li>{context.goal}</li> : null}
          </ul>
          <button
            type="button"
            onClick={startEditing}
            className="shrink-0 rounded-lg px-2 py-1.5 text-[13px] text-ink-soft hover:bg-canvas hover:text-ink"
          >
            Edit
          </button>
        </div>
      ) : null}
    </section>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="text-[12.5px] text-muted">{label}</span>
      <span className="mt-1 block">{children}</span>
    </label>
  );
}
