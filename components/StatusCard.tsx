"use client";

export function StatusCard({
  title,
  body,
  actionLabel,
  onAction,
}: {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <section className="rounded-2xl border border-line bg-white px-6 py-10 text-center sm:px-10">
      <h1 className="font-serif text-[1.7rem] tracking-tight text-ink">{title}</h1>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-ink-soft">{body}</p>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-accent px-4 text-[14px] font-medium text-white transition-colors hover:bg-accent-ink"
        >
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}
