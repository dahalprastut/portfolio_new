"use client";

import type { Region } from "@/lib/data";

interface RegionToggleProps {
  activeRegion: Region;
  onRegionChange: (region: Region) => void;
}

export default function RegionToggle({
  activeRegion,
  onRegionChange,
}: RegionToggleProps) {
  return (
    <div
      className="
        inline-flex items-center relative
        rounded-full p-1
        bg-white/6 backdrop-blur-md border border-white/10
        [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.08)]
      "
    >
      {/* Sliding indicator */}
      <div
        className="
          absolute top-1 bottom-1 rounded-full
          bg-[var(--color-accent-soft)] border border-[rgba(201,168,124,0.35)]
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        "
        style={{
          width: "calc(50% - 4px)",
          left: activeRegion === "nepal" ? "4px" : "calc(50%)",
        }}
      />

      <button
        onClick={() => onRegionChange("nepal")}
        className={`
          relative z-10 px-5 py-2 rounded-full
          font-[var(--font-mono)] text-xs font-medium tracking-wide uppercase
          transition-colors duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${
            activeRegion === "nepal"
              ? "text-[var(--color-accent)]"
              : "text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)]"
          }
        `}
      >
        Nepal
      </button>
      <button
        onClick={() => onRegionChange("us")}
        className={`
          relative z-10 px-5 py-2 rounded-full
          font-[var(--font-mono)] text-xs font-medium tracking-wide uppercase
          transition-colors duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${
            activeRegion === "us"
              ? "text-[var(--color-accent)]"
              : "text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)]"
          }
        `}
      >
        US
      </button>
    </div>
  );
}
