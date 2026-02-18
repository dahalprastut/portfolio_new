"use client";

import dynamic from "next/dynamic";

const HeroBackground3DCanvas = dynamic(
  () => import("./HeroBackground3DCanvas"),
  { ssr: false, loading: () => null }
);

export default function HeroBackground3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <HeroBackground3DCanvas />
    </div>
  );
}
