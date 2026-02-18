"use client";

import { useRef, useEffect } from "react";

interface ParallaxDividerProps {
  color?: string;
  /** Parallax speed — 0 = no movement, 0.5 = half scroll speed */
  speed?: number;
}

export default function ParallaxDivider({
  color,
  speed = 0.35,
}: ParallaxDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const bg = bgRef.current;
    if (!container || !bg) return;

    function update() {
      const rect = container!.getBoundingClientRect();
      const vh = window.innerHeight;

      // Only apply parallax when container is in (or near) the viewport
      if (rect.bottom < -100 || rect.top > vh + 100) return;

      const inViewPct = (vh - rect.top) / (vh + rect.height);
      const offset = (inViewPct - 0.5) * rect.height * speed;
      bg!.style.transform = `translateY(${offset.toFixed(2)}px)`;
    }

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => window.removeEventListener("scroll", update);
  }, [speed]);

  const grad = color
    ? `linear-gradient(135deg, ${color}1A 0%, ${color}08 45%, #030303 100%)`
    : "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, #030303 100%)";

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full"
      style={{ height: "clamp(50vh, 65vw, 75vh)" }}
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute left-0 w-full"
        style={{
          top: "-20%",
          height: "140%",
          background: grad,
          willChange: "transform",
        }}
      />

      {/* Geometric decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Large outer ring */}
        <div
          className="absolute rounded-full border"
          style={{
            width: "clamp(200px, 35vw, 480px)",
            height: "clamp(200px, 35vw, 480px)",
            borderColor: color ? `${color}18` : "rgba(255,255,255,0.05)",
          }}
        />
        {/* Middle ring */}
        <div
          className="absolute rounded-full border"
          style={{
            width: "clamp(120px, 20vw, 280px)",
            height: "clamp(120px, 20vw, 280px)",
            borderColor: color ? `${color}25` : "rgba(255,255,255,0.07)",
          }}
        />
        {/* Inner ring */}
        <div
          className="absolute rounded-full border"
          style={{
            width: "clamp(50px, 8vw, 100px)",
            height: "clamp(50px, 8vw, 100px)",
            borderColor: color ? `${color}40` : "rgba(255,255,255,0.1)",
          }}
        />
        {/* Horizontal line */}
        <div
          className="absolute top-1/2 left-0 right-0 h-px"
          style={{ backgroundColor: color ? `${color}10` : "rgba(255,255,255,0.04)" }}
        />
        {/* Vertical line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px"
          style={{ backgroundColor: color ? `${color}10` : "rgba(255,255,255,0.04)" }}
        />
      </div>
    </div>
  );
}
