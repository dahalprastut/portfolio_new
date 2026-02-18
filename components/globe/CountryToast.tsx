"use client";

import { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import type { Region } from "@/lib/data";

const TOAST_DATA = {
  nepal: {
    flag: "🇳🇵",
    headline: "Nepal",
  },
  us: {
    flag: "🇺🇸",
    headline: "United States",
  },
};

interface CountryToastProps {
  activeRegion: Region;
  position: [number, number, number];
}

export default function CountryToast({
  activeRegion,
  position,
}: CountryToastProps) {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) {
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [visible]);

  if (!mounted) return null;

  const data = TOAST_DATA[activeRegion];

  return (
    <Html position={position} distanceFactor={6} center style={{ pointerEvents: "none" }}>
      <div
        className={`country-toast ${!visible ? "toast-exiting" : ""}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          padding: "16px 20px",
          borderRadius: "50px",
          backgroundColor: "rgba(10, 10, 10, 0.75)",
          border: "1px solid rgba(237, 237, 237, 0.12)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.08),
                       0 8px 32px rgba(0,0,0,0.3)`,
          fontFamily: "var(--font-body, -apple-system, sans-serif)",
          whiteSpace: "nowrap",
        }}
      >
        {/* Flag emoji - larger, more prominent */}
        <div style={{ fontSize: "32px", lineHeight: "1" }}>{data.flag}</div>

        {/* Headline only */}
        <div
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "rgba(237, 237, 237, 0.9)",
            lineHeight: "1",
            letterSpacing: "0.02em",
          }}
        >
          {data.headline}
        </div>
      </div>
    </Html>
  );
}
