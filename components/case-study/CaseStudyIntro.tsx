interface CaseStudyIntroProps {
  heading: string;
  body: string;
  index?: number;
}

export default function CaseStudyIntro({ heading, body, index = 0 }: CaseStudyIntroProps) {
  return (
    <div
      className="mx-auto py-[clamp(5rem,10vw,9rem)]"
      style={{ padding: "clamp(5rem,10vw,9rem) clamp(1.5rem, 5vw, 6rem)", maxWidth: "1200px" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24">
        {/* Left: heading + index */}
        <div className="flex flex-col gap-4">
          <span className="font-[var(--font-mono)] text-[11px] tracking-[0.2em] uppercase text-[var(--color-accent)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="font-[var(--font-display)] font-bold text-[clamp(1.75rem,2.5vw+0.5rem,2.75rem)] text-[var(--color-ink)] leading-tight">
            {heading}
          </h2>
        </div>

        {/* Right: body */}
        <div>
          <p className="font-[var(--font-body)] text-[var(--text-body-lg)] text-[var(--color-ink-secondary)] leading-[1.8]">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}
