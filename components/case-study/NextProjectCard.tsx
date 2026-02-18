import Link from "next/link";
import type { Project } from "@/lib/data";

interface NextProjectCardProps {
  project: Project;
}

export default function NextProjectCard({ project }: NextProjectCardProps) {
  return (
    <section
      className="py-[clamp(6rem,12vw,12rem)] bg-[var(--color-void)]"
      data-cursor="media"
      data-cursor-label="Next"
    >
      <div
        className="mx-auto text-center"
        style={{ padding: "0 clamp(1.5rem, 5vw, 6rem)", maxWidth: "1440px" }}
      >
        <span className="font-[var(--font-mono)] text-[10px] font-semibold tracking-[0.15em] uppercase text-[var(--color-ink-secondary)] mb-6 block">
          Next Project
        </span>

        <Link href={project.href} className="group inline-block">
          <h2 className="font-[var(--font-display)] font-bold text-[clamp(2.5rem,5vw+1rem,6rem)] text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors duration-500">
            {project.title}
          </h2>
          <p className="font-[var(--font-body)] text-lg text-[var(--color-ink-secondary)] mt-4 group-hover:text-[var(--color-ink-secondary)] transition-colors duration-500">
            {project.description}
          </p>
        </Link>
      </div>
    </section>
  );
}
