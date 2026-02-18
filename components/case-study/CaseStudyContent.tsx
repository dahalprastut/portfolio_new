import type { Project } from "@/lib/data";
import CaseStudyHero from "./CaseStudyHero";
import CaseStudyIntro from "./CaseStudyIntro";
import CaseStudyGallery from "./CaseStudyGallery";
import NextProjectCard from "./NextProjectCard";
import ParallaxDivider from "./ParallaxDivider";
import GlassButton from "@/components/GlassButton";

interface CaseStudyContentProps {
  project: Project;
  nextProject?: Project;
}

export default function CaseStudyContent({
  project,
  nextProject,
}: CaseStudyContentProps) {
  return (
    <div className="bg-[var(--color-void)]">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <CaseStudyHero project={project} />

      {/* ── Introduction ─────────────────────────────────────────────── */}
      {project.introduction && (
        <CaseStudyIntro
          heading="Introduction"
          body={project.introduction}
          index={0}
        />
      )}

      {/* ── Parallax divider 1 ───────────────────────────────────────── */}
      <ParallaxDivider color={project.color} />

      {/* ── Challenge ────────────────────────────────────────────────── */}
      {project.challenge && (
        <CaseStudyIntro
          heading="The Challenge"
          body={project.challenge}
          index={1}
        />
      )}

      {/* ── Visual Gallery ───────────────────────────────────────────── */}
      <CaseStudyGallery color={project.color} />

      {/* ── Parallax divider 2 ───────────────────────────────────────── */}
      <ParallaxDivider color={project.color} speed={0.28} />

      {/* ── Solution ─────────────────────────────────────────────────── */}
      {project.solution && (
        <CaseStudyIntro
          heading="The Solution"
          body={project.solution}
          index={2}
        />
      )}

      {/* ── Parallax divider 3 ───────────────────────────────────────── */}
      <ParallaxDivider color={project.color} speed={0.22} />

      {/* ── Live CTA ─────────────────────────────────────────────────── */}
      {project.liveUrl && (
        <div
          className="mx-auto text-center py-[clamp(5rem,10vw,10rem)]"
          style={{ padding: "clamp(5rem,10vw,10rem) clamp(1.5rem,5vw,6rem)", maxWidth: "1440px" }}
        >
          <p className="font-[var(--font-mono)] text-[11px] tracking-[0.2em] uppercase text-[var(--color-ink-tertiary)] mb-8">
            See it live
          </p>
          <GlassButton href={project.liveUrl} size="lg" variant="accent">
            View Website →
          </GlassButton>
        </div>
      )}

      {/* ── Thin divider ─────────────────────────────────────────────── */}
      <div className="w-full h-px bg-white/[0.06]" />

      {/* ── Next Project ─────────────────────────────────────────────── */}
      {nextProject && <NextProjectCard project={nextProject} />}
    </div>
  );
}
