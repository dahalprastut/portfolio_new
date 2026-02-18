"use client";

import { useInView } from "@/hooks/useInView";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  splitBy?: "word" | "line";
  staggerMs?: number;
  threshold?: number;
  className?: string;
}

export default function TextReveal({
  children,
  as: Tag = "p",
  splitBy = "word",
  staggerMs = 60,
  threshold = 0.2,
  className = "",
}: TextRevealProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold, once: true });

  const units = splitBy === "word" ? children.split(" ") : children.split("\n");

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={`${className}`}
      style={{ perspective: "1000px" }}
    >
      {units.map((unit, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span
            className="inline-block transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transitionDuration: "800ms",
              transitionDelay: inView ? `${i * staggerMs}ms` : "0ms",
              transform: inView
                ? "translateY(0) rotateX(0deg)"
                : "translateY(110%) rotateX(-10deg)",
              opacity: inView ? 1 : 0,
            }}
          >
            {unit}
            {splitBy === "word" && i < units.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
