/** The small zh/EN label that opens every section. */
export default function Eyebrow({ zh, en, note, tone = "ink" }) {
  const dark = tone === "light";

  return (
    <div className="flex flex-wrap items-center gap-[10px]">
      <p
        className={`font-display text-[13px] font-bold ${dark ? "text-white" : "text-ink"}`}
      >
        {zh}
      </p>
      <p
        className={`font-mono-brand text-[12px] font-bold tracking-[2.4px] ${
          dark ? "text-brand-soft" : "text-brand"
        }`}
      >
        {en}
      </p>
      {note ? (
        <p className="font-display text-[15px] font-light text-muted">{note}</p>
      ) : null}
    </div>
  );
}
