"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "pointer" | "text" | "action" | "media" | "drag" | "hidden";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    const mq = window.matchMedia("(pointer: coarse)");
    if (mq.matches) {
      setIsTouch(true);
      return;
    }

    document.body.classList.add("custom-cursor-active");

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    const lerp = 0.15;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const animate = () => {
      outlineX += (mouseX - outlineX) * lerp;
      outlineY += (mouseY - outlineY) * lerp;

      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
      }

      requestAnimationFrame(animate);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;

      if (cursorEl) {
        const state = cursorEl.getAttribute("data-cursor") as CursorState;
        setCursorState(state);
        setLabel(cursorEl.getAttribute("data-cursor-label") || "");
      } else if (
        target.closest("a, button, input, textarea, select, [role='button']")
      ) {
        setCursorState("pointer");
        setLabel("");
      } else {
        setCursorState("default");
        setLabel("");
      }
    };

    const onMouseLeave = () => setCursorState("hidden");
    const onMouseEnter = () => setCursorState("default");

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);
    requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (isTouch) return null;

  const getOutlineSize = () => {
    switch (cursorState) {
      case "pointer": return 48;
      case "action": return 80;
      case "media": return 120;
      case "drag": return 80;
      default: return 0;
    }
  };

  const getDotSize = () => {
    switch (cursorState) {
      case "pointer": return 8;
      case "text": return 4;
      case "action":
      case "media":
      case "drag":
        return 0;
      case "hidden": return 0;
      default: return 16;
    }
  };

  const outlineSize = getOutlineSize();
  const dotSize = getDotSize();
  const isTextState = cursorState === "text";
  const showLabel = ["action", "media", "drag"].includes(cursorState);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ willChange: "transform" }}
      >
        <div
          className="rounded-full bg-white transition-[width,height] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            width: isTextState ? 4 : dotSize,
            height: isTextState ? 24 : dotSize,
            borderRadius: isTextState ? 2 : "50%",
            marginLeft: isTextState ? -2 : -dotSize / 2,
            marginTop: isTextState ? -12 : -dotSize / 2,
            opacity: cursorState === "hidden" ? 0 : 1,
          }}
        />
      </div>
      {/* Outline */}
      <div
        ref={outlineRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-exclusion"
        style={{ willChange: "transform" }}
      >
        <div
          className="rounded-full border border-white/90 flex items-center justify-center transition-[width,height,opacity] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            width: outlineSize,
            height: outlineSize,
            marginLeft: -outlineSize / 2,
            marginTop: -outlineSize / 2,
            opacity: outlineSize > 0 ? 1 : 0,
          }}
        >
          {showLabel && label && (
            <span className="font-[var(--font-mono)] text-xs text-white tracking-wide uppercase">
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
