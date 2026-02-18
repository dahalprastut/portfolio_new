interface CaseStudyGalleryProps {
  color?: string;
}

export default function CaseStudyGallery({ color }: CaseStudyGalleryProps) {
  return (
    <div className="w-full py-[clamp(4rem,8vw,8rem)] bg-[var(--color-surface)]">
      <div
        className="mx-auto"
        style={{ padding: "0 clamp(1.5rem, 5vw, 6rem)", maxWidth: "1440px" }}
      >
        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="w-6 h-px bg-[var(--color-accent)]" />
          <span className="font-[var(--font-mono)] text-[11px] tracking-[0.2em] uppercase text-[var(--color-accent)]">
            Visual Work
          </span>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Large feature card */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`rounded-[var(--radius-lg)] overflow-hidden ${i === 0 ? "md:col-span-2" : ""}`}
              style={{
                aspectRatio: i === 0 ? "16 / 7" : "4 / 3",
                background: color
                  ? `linear-gradient(${135 + i * 40}deg, ${color}20, ${color}08, rgba(10,10,10,0.9))`
                  : "var(--color-surface-raised)",
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-[var(--font-mono)] text-xs text-[var(--color-ink-ghost)] uppercase tracking-widest">
                  Screen {i + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
