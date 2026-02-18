"use client";

import { useState, useEffect } from "react";

interface ScrollDirectionState {
  direction: "up" | "down";
  scrollY: number;
  isAtTop: boolean;
}

export function useScrollDirection(threshold = 10): ScrollDirectionState {
  const [state, setState] = useState<ScrollDirectionState>({
    direction: "up",
    scrollY: 0,
    isAtTop: true,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const diff = scrollY - lastScrollY;

      if (Math.abs(diff) >= threshold) {
        setState({
          direction: diff > 0 ? "down" : "up",
          scrollY,
          isAtTop: scrollY < 10,
        });
        lastScrollY = scrollY;
      } else {
        setState((prev) => ({
          ...prev,
          scrollY,
          isAtTop: scrollY < 10,
        }));
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return state;
}
