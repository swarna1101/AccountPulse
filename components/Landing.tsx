"use client";

import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { AccountAvatar } from "@/components/AccountAvatar";
import { LogoMark } from "@/components/Logo";
import { isValidCompanyName, normalizeCompanyName } from "@/lib/company";
import type { Account } from "@/lib/types";

const SAMPLES: Array<{ id: string; line: string }> = [
  { id: "canva", line: "Enterprise expansion" },
  { id: "stripe", line: "Platform breadth" },
  { id: "hubspot", line: "AI in the CRM" },
];

const OUTCOMES = [
  {
    label: "What changed",
    body: "The few public shifts inside the organisation that are actually worth knowing. Hiring, product, expansion, leadership.",
  },
  {
    label: "Why it matters",
    body: "How that change shows up in the relationship, so you are not walking in with a headline and nowhere to take it.",
  },
  {
    label: "What to say",
    body: "A natural opener for the call. Consultative, specific, and easy to say out loud.",
  },
];

export function Landing({
  accounts,
  onSearch,
  onOpen,
}: {
  accounts: Account[];
  onSearch: (company: string) => void;
  onOpen: (id: string) => void;
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const samples = SAMPLES.map((sample) => accounts.find((account) => account.id === sample.id)).filter(
    (account): account is Account => Boolean(account),
  );
  const saved = accounts.filter((account) => account.origin === "custom");

  function submit(event: FormEvent) {
    event.preventDefault();
    const company = normalizeCompanyName(name);
    if (!isValidCompanyName(company)) {
      setError("Enter a company name.");
      return;
    }
    onSearch(company);
  }

  return (
    <div className="min-h-screen bg-canvas">
      <header className="flex items-center gap-2.5 px-5 py-5 sm:px-8">
        <LogoMark />
        <span className="text-[15px] font-semibold tracking-tight">AccountPulse</span>
      </header>

      <main className="mx-auto flex w-full max-w-[760px] flex-col px-5 pb-20 pt-8 sm:px-8 sm:pt-16">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-accent">FOR CUSTOMER SUCCESS</p>
        <h1 className="mt-3 font-serif text-[2.6rem] leading-[1.08] tracking-tight text-ink sm:text-[3.25rem]">
          Know what’s changing.
          <br />
          Know what to say.
        </h1>
        <p className="mt-5 max-w-[38rem] text-[17px] leading-7 text-ink-soft">
          Before a customer call, see what is happening inside the account, and leave with one insight worth sharing today.
        </p>

        <form onSubmit={submit} className="mt-8">
          <label htmlFor="company-search" className="sr-only">
            Customer or company name
          </label>
          <div className="rounded-2xl border border-line bg-white p-2 shadow-[0_1px_2px_rgba(28,25,23,0.04),0_18px_50px_rgba(28,25,23,0.06)]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                id="company-search"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  if (error) setError("");
                }}
                maxLength={80}
                autoComplete="off"
                placeholder="Your customer, or any company"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "company-search-error" : "company-search-hint"}
                className="h-12 w-full bg-transparent px-3 text-[16px] text-ink outline-none placeholder:text-muted/80"
              />
              <button
                type="submit"
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-[14.5px] font-medium text-white transition-colors hover:bg-accent-ink"
              >
                Try any company
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          {error ? (
            <p id="company-search-error" className="mt-3 text-[13px] text-ink-soft">
              {error}
            </p>
          ) : (
            <p id="company-search-hint" className="mt-3 text-[13px] leading-6 text-muted">
              Public web information, distilled into a brief you can use on the call.
            </p>
          )}
        </form>

        <section className="mt-10" aria-labelledby="outcomes-heading">
          <h2 id="outcomes-heading" className="text-[13px] font-medium text-ink">
            What this search gives you
          </h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            {OUTCOMES.map((outcome) => (
              <li key={outcome.label} className="rounded-2xl border border-line bg-white px-4 py-4">
                <p className="text-[13px] font-semibold text-ink">{outcome.label}</p>
                <p className="mt-2 text-[13px] leading-6 text-ink-soft">{outcome.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 border-t border-line pt-8">
          <h2 className="text-[13px] font-medium text-ink">See a sample brief</h2>
          <p className="mt-1 text-[13px] leading-6 text-muted">A prepared account, so you can read the product before you search.</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {samples.map((account) => {
              const line = SAMPLES.find((sample) => sample.id === account.id)?.line;
              return (
                <li key={account.id}>
                  <button
                    type="button"
                    onClick={() => onOpen(account.id)}
                    className="flex w-full items-center gap-3 rounded-xl border border-line bg-white px-3 py-3 text-left transition-colors hover:border-[#c9c6ee] hover:bg-white"
                  >
                    <AccountAvatar name={account.name} />
                    <span className="min-w-0">
                      <span className="block truncate text-[14px] font-medium text-ink">{account.name}</span>
                      <span className="block truncate text-[12.5px] text-muted">{line}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {saved.length > 0 ? (
          <section className="mt-8">
            <h2 className="text-[13px] font-medium text-ink">Your accounts</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {saved.map((account) => (
                <li key={account.id}>
                  <button
                    type="button"
                    onClick={() => onOpen(account.id)}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-3 text-[13.5px] text-ink transition-colors hover:border-[#c9c6ee]"
                  >
                    <AccountAvatar name={account.name} />
                    {account.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
    </div>
  );
}
