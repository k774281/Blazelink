/**
 * Stands in for artwork the client has yet to supply. Deliberately reads as
 * unfinished — a dashed frame with a label, rather than a grey void — so an
 * empty slot is never mistaken for an image that failed to load.
 */
export default function ImagePlaceholder({ label, className = "" }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-[12px] border border-dashed border-line-dash bg-panel ${className}`}
    >
      <img src="/figma/icon-image-lg.svg" alt="" width={24} height={24} />
      {label ? (
        <p className="font-mono-brand px-4 text-center text-[12px] font-medium tracking-[1.44px] text-muted">
          {label}
        </p>
      ) : null}
    </div>
  );
}
