"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRegion } from "@/lib/region-context";
import { getExperiencesByRegion } from "@/lib/data";
import TechTag from "./TechTag";
import { useInView } from "@/hooks/useInView";

function TimelineItem({
  experience,
  index,
}: {
  experience: (typeof import("@/lib/data"))["experiences"][number];
  index: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className="relative pl-8 pb-12 last:pb-0 border-l border-white/10"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `all 800ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms`,
      }}
    >
      {/* Timeline dot */}
      <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent-glow)]" />

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h3 className="font-[var(--font-body)] text-[var(--text-h4)] font-semibold text-[var(--color-ink)]">
            {experience.title}
          </h3>
          <span className="font-[var(--font-mono)] text-xs text-[var(--color-ink-tertiary)]">
            {experience.period}
          </span>
        </div>

        <p className="font-[var(--font-body)] text-sm font-medium text-[var(--color-accent)]">
          {experience.company}
          <span className="text-[var(--color-ink-tertiary)]">
            {" "}
            — {experience.location}
          </span>
        </p>

        <p className="font-[var(--font-body)] text-[var(--text-body)] text-[var(--color-ink-secondary)] leading-relaxed">
          {experience.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {experience.technologies.map((tech) => (
            <TechTag key={tech} variant="blue">
              {tech}
            </TechTag>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ExperienceTimeline() {
  const { activeRegion } = useRegion();
  const experiences = getExperiencesByRegion(activeRegion);

  return (
    <section
      className="py-[clamp(6rem,12vw,12rem)]"
      style={{ padding: "clamp(6rem,12vw,12rem) clamp(1.5rem, 5vw, 6rem)" }}
    >
      <div className="mx-auto max-w-3xl">
        <span className="font-[var(--font-mono)] text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-tertiary)] mb-8 block">
          Experience
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {experiences.map((exp, i) => (
              <TimelineItem key={exp.id} experience={exp} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
