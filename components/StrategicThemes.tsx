export function StrategicThemes({ themes, summary }: { themes: string[]; summary: string }) {
  if (themes.length === 0) return null;

  return (
    <section className="rounded-2xl border border-line bg-white px-5 py-5 sm:px-6">
      <h2 className="text-[15px] font-semibold tracking-tight text-ink">Patterns we’re seeing</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {themes.map((theme) => (
          <li
            key={theme}
            className="rounded-full border border-line bg-canvas px-3 py-1 text-[13px] text-ink"
          >
            {theme}
          </li>
        ))}
      </ul>
      {summary ? <p className="mt-4 max-w-[40rem] text-[14px] leading-6 text-ink-soft">{summary}</p> : null}
    </section>
  );
}
