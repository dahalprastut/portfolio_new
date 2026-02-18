"use client";

import { useState, useEffect } from "react";
import { personalInfo } from "@/lib/data";
import HeroBackground3D from "./HeroBackground3D";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const specializations = personalInfo.heroSpecializations;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % specializations.length);
        setIsVisible(true);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, [specializations.length]);

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-[var(--color-void)]">
      {/* Immersive 3D background */}
      <HeroBackground3D />

      {/* Subtle vignette to help text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 20% 50%, transparent 40%, rgba(3,3,3,0.7) 100%)",
        }}
      />

      {/* Hero content — left-anchored */}
      <div
        className="relative z-10 mx-auto w-full"
        style={{ padding: "8rem clamp(1.5rem, 5vw, 6rem) 6rem" }}
      >
        <div className="max-w-3xl">
          {/* Overline tag */}
          <div
            className="inline-flex items-center gap-2 mb-6 opacity-0 animate-[fade-in-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.3s_forwards]"
          >
            <span className="w-6 h-px bg-[var(--color-accent)]" />
            <span className="font-[var(--font-mono)] text-[11px] tracking-[0.2em] uppercase text-[var(--color-accent)]">
              {personalInfo.title}
            </span>
          </div>

          {/* Greeting */}
          <p
            className="font-[var(--font-body)] text-[var(--text-body-xl)] text-[var(--color-ink-secondary)] mb-4 opacity-0 animate-[fade-in-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.5s_forwards]"
          >
            {personalInfo.heroGreeting}{" "}
            <strong className="text-[var(--color-ink)] font-semibold">
              {personalInfo.name}
            </strong>{" "}
            &amp; I specialize in
          </p>

          {/* Cycling title */}
          <div className="overflow-hidden h-[clamp(3.8rem,8vw+1rem,10rem)]">
            <h1
              className="font-[var(--font-display)] text-[clamp(3.5rem,7vw+1rem,9rem)] font-bold tracking-[-0.04em] leading-none text-[var(--color-ink)] transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: isVisible ? "translateY(0)" : "translateY(110%)",
                opacity: isVisible ? 1 : 0,
              }}
            >
              {specializations[currentIndex]}
            </h1>
          </div>

          {/* Brief bio line */}
          <p
            className="mt-8 font-[var(--font-body)] text-[var(--text-body)] text-[var(--color-ink-tertiary)] max-w-md leading-relaxed opacity-0 animate-[fade-in-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.8s_forwards]"
          >
            {personalInfo.aboutStatement}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 animate-[float_3s_ease-in-out_infinite]">
        <span className="font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-tertiary)] opacity-50">
          Scroll
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          className="opacity-50"
        >
          <rect
            x="1"
            y="1"
            width="14"
            height="22"
            rx="7"
            stroke="var(--color-ink-tertiary)"
            strokeWidth="1.5"
          />
          <circle cx="8" cy="8" r="2" fill="var(--color-ink-tertiary)">
            <animate
              attributeName="cy"
              values="8;16;8"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    </section>
  );
}
