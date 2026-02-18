"use client";

import { skillCategories } from "@/lib/data";
import { useInView } from "@/hooks/useInView";

export default function Skills() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section
      className="py-[clamp(6rem,12vw,12rem)]"
      style={{ padding: "clamp(6rem,12vw,12rem) clamp(1.5rem, 5vw, 6rem)" }}
    >
      <div className="mx-auto max-w-[1440px]">
        <span className="font-[var(--font-mono)] text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-tertiary)] mb-12 block">
          Skills
        </span>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => (
            <div
              key={category.title}
              className="glass rounded-[28px] p-8 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/[0.18] hover:-translate-y-0.5 hover:bg-white/10"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView
                  ? "translateY(0)"
                  : "translateY(30px)",
                transition: `all 800ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`,
              }}
            >
              <h3 className="font-[var(--font-body)] text-[clamp(1.25rem,1.5vw+0.5rem,1.75rem)] font-semibold text-[var(--color-ink)] mb-6">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="font-[var(--font-body)] text-[var(--text-body)] text-[var(--color-ink-secondary)]"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
