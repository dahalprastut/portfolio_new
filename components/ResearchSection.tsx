"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRegion } from "@/lib/region-context";
import { research } from "@/lib/data";
import TechTag from "./TechTag";

export default function ResearchSection() {
  const { activeRegion } = useRegion();

  return (
    <AnimatePresence>
      {activeRegion === "us" && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div
            className="mx-auto py-[clamp(4rem,8vw,8rem)]"
            style={{
              padding: "clamp(4rem,8vw,8rem) clamp(1.5rem, 5vw, 6rem)",
              maxWidth: "1440px",
            }}
          >
            <span className="font-[var(--font-mono)] text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-tertiary)] mb-8 block">
              Research
            </span>

            {research.map((item, i) => (
              <div
                key={i}
                className="glass rounded-[28px] p-8 md:p-12 space-y-6"
              >
                <h3 className="font-[var(--font-display)] text-[clamp(1.5rem,2vw+0.5rem,2.5rem)] text-[var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="font-[var(--font-body)] text-[var(--text-body-lg)] text-[var(--color-ink-secondary)] leading-relaxed max-w-2xl">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <TechTag key={tag} variant="blue">
                      {tag}
                    </TechTag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
