"use client";

import { useRegion } from "@/lib/region-context";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import TextReveal from "./TextReveal";
import GlobeCanvas from "./globe/GlobeCanvas";
import Globe2D from "./globe/Globe2D";
import RegionToggle from "./globe/RegionToggle";

export default function JourneySection() {
  const { activeRegion, setActiveRegion } = useRegion();
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <section
      id="journey"
      className="relative py-[clamp(6rem,12vw,12rem)]"
    >
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        style={{ padding: "0 clamp(1.5rem, 5vw, 6rem)", maxWidth: "1440px" }}
      >
        {/* Left — Narrative */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="font-[var(--font-mono)] text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-tertiary)]">
              The Journey
            </span>
            <TextReveal
              as="h2"
              className="font-[var(--font-display)] text-[clamp(2rem,3vw+0.5rem,3.5rem)] font-normal leading-tight text-[var(--color-ink)]"
            >
              From Kathmandu to Ohio — building software across continents
            </TextReveal>
          </div>
          <p className="font-[var(--font-body)] text-[var(--text-body-lg)] text-[var(--color-ink-secondary)] leading-relaxed max-w-lg">
            My career began in Nepal&apos;s growing tech ecosystem, building fintech
            platforms and winning hackathons. Then I moved to the US to pursue
            graduate research in scientific visualization at Bowling Green State
            University, and now build enterprise software in Ohio.
          </p>

          {/* Region Toggle - visible on mobile below text, on desktop below text */}
          <div className="flex justify-start">
            <RegionToggle
              activeRegion={activeRegion}
              onRegionChange={setActiveRegion}
            />
          </div>
        </div>

        {/* Right — Globe */}
        <div className="relative h-[500px] lg:h-[600px]">
          {isMobile ? (
            <Globe2D
              activeRegion={activeRegion}
              onRegionChange={setActiveRegion}
            />
          ) : (
            <GlobeCanvas
              activeRegion={activeRegion}
              onRegionChange={setActiveRegion}
            />
          )}
        </div>
      </div>
    </section>
  );
}
