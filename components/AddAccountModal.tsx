"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { isValidCompanyName, normalizeCompanyName } from "@/lib/company";

export function AddAccountModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (company: string) => void;
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const items = Array.from(
        dialog.querySelectorAll<HTMLElement>("button, input, [href], [tabindex]:not([tabindex='-1'])"),
      ).filter((element) => !element.hasAttribute("disabled"));
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const company = normalizeCompanyName(name);
    if (!isValidCompanyName(company)) {
      setError("Enter a company name.");
      inputRef.current?.focus();
      return;
    }
    onSubmit(company);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-[#1c1917]/35" aria-label="Close dialog" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative z-10 w-full max-w-[420px] rounded-2xl border border-line bg-white p-6 shadow-[0_16px_50px_rgba(28,25,23,0.12)]"
      >
        <h2 id={titleId} className="font-serif text-[1.7rem] tracking-tight text-ink">
          Add customer
        </h2>
        <p id={descriptionId} className="mt-2 text-[14px] leading-6 text-ink-soft">
          AccountPulse uses public web information to build your account briefing.
        </p>

        <form onSubmit={submit} className="mt-5">
          <label htmlFor="customer-name" className="text-[13px] font-medium text-ink">
            Customer or company name
          </label>
          <input
            ref={inputRef}
            id="customer-name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (error) setError("");
            }}
            maxLength={80}
            autoComplete="off"
            placeholder="Acme"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "customer-name-error" : undefined}
            className="mt-2 h-11 w-full rounded-lg border border-line bg-white px-3 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-accent"
          />
          {error ? (
            <p id="customer-name-error" className="mt-2 text-[13px] text-ink-soft">
              {error}
            </p>
          ) : null}

          <div className="mt-5 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 items-center justify-center rounded-lg px-3 text-[14px] text-ink-soft transition-colors hover:bg-canvas hover:text-ink"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-4 text-[14px] font-medium text-white transition-colors hover:bg-accent-ink"
            >
              Research account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
