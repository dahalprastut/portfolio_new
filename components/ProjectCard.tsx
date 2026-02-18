"use client";

import Link from "next/link";
import TechTag from "./TechTag";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="group relative"
      data-cursor="media"
      data-cursor-label="Explore"
    >
      <Link href={project.href} className="block">
        {/* Media */}
        <div className="aspect-[500/675] overflow-hidden rounded-[20px] relative bg-[var(--color-surface)]">
          {/* Placeholder gradient when no image */}
          <div
            className="w-full h-full transition-transform duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            style={{
              background: project.color
                ? `linear-gradient(135deg, ${project.color}22, ${project.color}08)`
                : "linear-gradient(135deg, var(--color-surface-raised), var(--color-surface))",
            }}
          >
            {/* Project title overlay for visual interest */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <span className="font-[var(--font-display)] text-[clamp(2rem,4vw,4rem)] text-white/10 text-center leading-tight">
                {project.title}
              </span>
            </div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Read More pill */}
          <span className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-white/6 backdrop-blur-md border border-white/10 font-[var(--font-mono)] text-[10px] tracking-wide uppercase text-[var(--color-ink)] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]">
            Read More
          </span>
        </div>

        {/* Content */}
        <div className="pt-6 space-y-3">
          <span className="font-[var(--font-body)] text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-secondary)]">
            {project.title}
          </span>
          <h3 className="font-[var(--font-body)] text-[clamp(1.25rem,1.5vw+0.5rem,1.75rem)] font-semibold text-[var(--color-ink)] transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
            {project.description}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <TechTag key={tag}>{tag}</TechTag>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
