"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Region } from "./data";

interface RegionContextType {
  activeRegion: Region;
  setActiveRegion: (region: Region) => void;
}

const RegionContext = createContext<RegionContextType | null>(null);

const REGION_TOKENS: Record<Region, Record<string, string>> = {
  nepal: {
    "--color-accent":       "#DC143C",
    "--color-accent-hover": "#A01030",
    "--color-accent-soft":  "rgba(220, 20, 60, 0.14)",
    "--color-accent-glow":  "rgba(220, 20, 60, 0.35)",
    "--shadow-glow-accent": "0 0 20px rgba(220,20,60,0.25), 0 0 60px rgba(220,20,60,0.08)",
  },
  us: {
    "--color-accent":       "#60A5FA",
    "--color-accent-hover": "#3B82F6",
    "--color-accent-soft":  "rgba(96, 165, 250, 0.14)",
    "--color-accent-glow":  "rgba(96, 165, 250, 0.35)",
    "--shadow-glow-accent": "0 0 20px rgba(96,165,250,0.25), 0 0 60px rgba(96,165,250,0.08)",
  },
};

export function RegionProvider({ children }: { children: ReactNode }) {
  const [activeRegion, setActiveRegion] = useState<Region>("us");

  useEffect(() => {
    const tokens = REGION_TOKENS[activeRegion];
    const root = document.documentElement;
    Object.entries(tokens).forEach(([prop, val]) => root.style.setProperty(prop, val));
  }, [activeRegion]);

  return (
    <RegionContext.Provider value={{ activeRegion, setActiveRegion }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion(): RegionContextType {
  const ctx = useContext(RegionContext);
  if (!ctx) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return ctx;
}
