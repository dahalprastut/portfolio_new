import type { Project } from "@/lib/data";

interface CaseStudyHeroProps {
  project: Project;
}

export default function CaseStudyHero({ project }: CaseStudyHeroProps) {
  return (
    <section className="pt-36 pb-0 bg-[var(--color-void)]">
      <div
        className="mx-auto"
        style={{ padding: "0 clamp(1.5rem, 5vw, 6rem)", maxWidth: "1440px" }}
      >
        {/* Overline */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-px bg-[var(--color-accent)]" />
          <p className="font-[var(--font-mono)] text-[11px] tracking-[0.2em] uppercase text-[var(--color-accent)]">
            {project.client}
          </p>
        </div>

        {/* Title */}
        <h1 className="font-[var(--font-display)] font-bold text-[clamp(2.5rem,5vw+0.5rem,6rem)] text-[var(--color-ink)] leading-tight tracking-tight mb-12 max-w-4xl">
          {project.description}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap gap-12 mb-16">
          {project.client && (
            <div>
              <span className="block font-[var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-accent)] mb-2">
                Client
              </span>
              <span className="font-[var(--font-body)] text-[var(--text-body)] text-[var(--color-ink)]">
                {project.client}
              </span>
            </div>
          )}
          {project.responsibility && (
            <div>
              <span className="block font-[var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-accent)] mb-2">
                Role
              </span>
              <span className="font-[var(--font-body)] text-[var(--text-body)] text-[var(--color-ink)]">
                {project.responsibility}
              </span>
            </div>
          )}
          {project.year && (
            <div>
              <span className="block font-[var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-accent)] mb-2">
                Year
              </span>
              <span className="font-[var(--font-body)] text-[var(--text-body)] text-[var(--color-ink)]">
                {project.year}
              </span>
            </div>
          )}
        </div>

        {/* Divider line */}
        <div className="w-full h-px bg-white/8 mb-0" />
      </div>

      {/* Full-width hero visual — no side padding */}
      <div className="w-full mt-0">
        <div
          className="w-full"
          style={{
            height: "clamp(320px, 55vw, 680px)",
            background: project.color
              ? `linear-gradient(135deg, ${project.color}28 0%, ${project.color}10 40%, #030303 100%)`
              : "var(--color-surface)",
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="font-[var(--font-display)] font-bold text-[clamp(4rem,12vw,14rem)] tracking-tight select-none"
              style={{ color: project.color ? `${project.color}12` : "rgba(255,255,255,0.04)" }}
            >
              {project.title}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
