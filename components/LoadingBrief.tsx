"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "Searching recent company signals",
  "Identifying meaningful changes",
  "Connecting signals to customer context",
  "Preparing conversation insights",
];

export function LoadingBrief({ company }: { company: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((current) => (current + 1) % STEPS.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div aria-busy="true" aria-live="polite">
      <p className="text-[11px] font-semibold tracking-[0.16em] text-muted">YOUR ACCOUNT BRIEF</p>
      <h1 className="mt-2 font-serif text-[2rem] leading-[1.15] tracking-tight text-ink">
        Building your account brief…
      </h1>
      <p className="mt-3 text-[15px] leading-7 text-ink-soft">Looking at {company}. This usually takes a moment.</p>

      <ol className="mt-6 space-y-2.5">
        {STEPS.map((label, index) => {
          const active = index === step;
          const done = index < step;
          return (
            <li key={label} className="flex items-center gap-2.5 text-[14px]">
              <span
                className={
                  active
                    ? "size-1.5 rounded-full bg-accent"
                    : done
                      ? "size-1.5 rounded-full bg-accent/35"
                      : "size-1.5 rounded-full bg-line"
                }
                aria-hidden="true"
              />
              <span className={active ? "text-ink" : "text-muted"}>{label}</span>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 space-y-3" aria-hidden="true">
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="h-0.5 bg-[#e4e0f2]" />
          <div className="space-y-3 px-6 py-6">
            <div className="h-3 w-36 animate-pulse rounded bg-[#ebe7e1]" />
            <div className="h-8 w-4/5 animate-pulse rounded bg-[#ebe7e1]" />
            <div className="h-4 w-full animate-pulse rounded bg-[#ebe7e1]" />
            <div className="h-4 w-11/12 animate-pulse rounded bg-[#ebe7e1]" />
            <div className="mt-4 h-16 animate-pulse rounded-xl bg-[#f4f5fa]" />
          </div>
        </div>
        <div className="space-y-3 rounded-2xl border border-line bg-white px-6 py-5">
          <div className="h-3 w-28 animate-pulse rounded bg-[#ebe7e1]" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-[#ebe7e1]" />
          <div className="h-4 w-full animate-pulse rounded bg-[#ebe7e1]" />
        </div>
        <div className="space-y-3 rounded-2xl border border-line bg-white px-6 py-5">
          <div className="h-3 w-24 animate-pulse rounded bg-[#ebe7e1]" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-[#ebe7e1]" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-[#ebe7e1]" />
        </div>
      </div>
    </div>
  );
}
