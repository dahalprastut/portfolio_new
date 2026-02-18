"use client";

import dynamic from "next/dynamic";
import GlobeFallback from "./GlobeFallback";
import type { Region } from "@/lib/data";

const GlobeScene = dynamic(() => import("./GlobeScene"), {
  ssr: false,
  loading: () => <GlobeFallback />,
});

interface GlobeCanvasProps {
  activeRegion: Region;
  onRegionChange: (region: Region) => void;
}

export default function GlobeCanvas({
  activeRegion,
  onRegionChange,
}: GlobeCanvasProps) {
  return (
    <div className="w-full h-full min-h-[400px]">
      <GlobeScene activeRegion={activeRegion} onRegionChange={onRegionChange} />
    </div>
  );
}
