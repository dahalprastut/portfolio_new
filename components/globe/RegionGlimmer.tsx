"use client";

import type { Region } from "@/lib/data";

const REGION_GLIMMER = {
  nepal: "rgba(220, 20, 60, 0.18)",
  us:    "rgba(96, 165, 250, 0.32)",
};

interface RegionGlimmerProps {
  activeRegion: Region;
}

export default function RegionGlimmer({ activeRegion }: RegionGlimmerProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        boxShadow: `inset 0 0 300px 120px ${REGION_GLIMMER[activeRegion]}`,
        opacity: 1,
        transition: "box-shadow 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        zIndex: 1,
      }}
    />
  );
}
