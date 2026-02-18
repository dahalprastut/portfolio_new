"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { usePathname } from "next/navigation";

// Cuberto-style page transition.
//
// Strategy:
//  1. Intercept any internal <a href> click via document-level event delegation.
//     → Immediately slide the black curtain DOWN to cover the screen.
//  2. On pathname change (navigation complete), wait a beat then slide curtain
//     further DOWN off-screen, revealing the new page.
//
// This hides the browser's scroll-to-top jump that happens during navigation.

export default function TransitionCurtain() {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);
  const controls = useAnimation();
  const covering = useRef(false);
  const revealed = useRef(true);

  // ── Step 1: Cover screen on link click ──────────────────────────────────
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Element;
      const link = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      // Only intercept internal page links
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        link.target === "_blank"
      ) {
        return;
      }

      if (covering.current) return;
      covering.current = true;
      revealed.current = false;

      controls.set({ y: "-100%" });
      controls.start({
        y: "0%",
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
      });
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [controls]);

  // ── Step 2: Reveal on new page load ─────────────────────────────────────
  useEffect(() => {
    if (prevPathname.current === null) {
      prevPathname.current = pathname;
      // First paint: do a short reveal so the initial load feels intentional
      controls.set({ y: "0%" });
      controls.start({
        y: "100%",
        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 },
      }).then(() => {
        controls.set({ y: "-100%" });
        covering.current = false;
        revealed.current = true;
      });
      return;
    }

    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    // Ensure curtain is covering (in case click handler didn't fire, e.g. keyboard nav)
    if (!covering.current) {
      controls.set({ y: "0%" });
    }

    // Short pause so new page content renders behind the curtain
    const id = setTimeout(() => {
      controls
        .start({
          y: "100%",
          transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
        })
        .then(() => {
          controls.set({ y: "-100%" });
          covering.current = false;
          revealed.current = true;
        });
    }, 120);

    return () => clearTimeout(id);
  }, [pathname, controls]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[200]"
      animate={controls}
      initial={{ y: "0%" }}
      style={{ backgroundColor: "#030303" }}
    >
      {/* Thin champagne accent line at the leading (bottom) edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ backgroundColor: "rgba(201, 168, 124, 0.5)" }}
      />
    </motion.div>
  );
}
