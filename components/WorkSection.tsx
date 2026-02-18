"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRegion } from "@/lib/region-context";
import { getProjectsByRegion } from "@/lib/data";
import SectionMarquee from "./SectionMarquee";
import ProjectCard from "./ProjectCard";

export default function WorkSection() {
  const { activeRegion } = useRegion();
  const projects = getProjectsByRegion(activeRegion);

  return (
    <section id="work">
      <SectionMarquee text="RECENT WORKS" variant="mixed" />

      <div
        className="mx-auto"
        style={{ padding: "0 clamp(1.5rem, 5vw, 6rem)", maxWidth: "1440px" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
