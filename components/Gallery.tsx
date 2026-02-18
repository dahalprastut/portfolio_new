"use client";

import { useRef, useState, useCallback } from "react";
import { galleryItems } from "@/lib/data";

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (trackRef.current?.offsetLeft ?? 0));
    setScrollLeft(trackRef.current?.scrollLeft ?? 0);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !trackRef.current) return;
      e.preventDefault();
      const x = e.pageX - trackRef.current.offsetLeft;
      const walk = (x - startX) * 1.5;
      trackRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const onMouseUp = useCallback(() => setIsDragging(false), []);

  return (
    <section className="py-[clamp(4rem,8vw,8rem)]" data-cursor="drag">
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto scroll-snap-type-x-mandatory select-none [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
        style={{
          paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
          paddingRight: "clamp(1.5rem, 5vw, 6rem)",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {galleryItems.map((item, i) => (
          <div
            key={item.id}
            className="shrink-0 snap-center"
            style={{ width: "clamp(280px, 30vw, 400px)" }}
          >
            <div className="aspect-[4/5] overflow-hidden rounded-[14px] bg-[var(--color-surface)] group">
              {/* Placeholder gradient */}
              <div
                className="w-full h-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] saturate-[0.9] group-hover:saturate-100"
                style={{
                  background: `linear-gradient(${135 + i * 30}deg, var(--color-surface-raised), var(--color-surface-subtle))`,
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-[var(--font-mono)] text-xs text-[var(--color-ink-ghost)] uppercase tracking-widest">
                    {item.alt}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
