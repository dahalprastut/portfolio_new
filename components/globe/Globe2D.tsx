"use client";

import type { Region } from "@/lib/data";

interface Globe2DProps {
  activeRegion: Region;
  onRegionChange: (region: Region) => void;
}

export default function Globe2D({ activeRegion, onRegionChange }: Globe2DProps) {
  return (
    <div className="w-full flex items-center justify-center py-8">
      <svg
        viewBox="0 0 400 200"
        className="w-full max-w-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simplified world outline */}
        <ellipse
          cx="200"
          cy="100"
          rx="180"
          ry="90"
          fill="none"
          stroke="var(--color-ink-ghost)"
          strokeWidth="1"
        />
        {/* Grid lines */}
        <ellipse
          cx="200"
          cy="100"
          rx="120"
          ry="90"
          fill="none"
          stroke="var(--color-ink-ghost)"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <ellipse
          cx="200"
          cy="100"
          rx="60"
          ry="90"
          fill="none"
          stroke="var(--color-ink-ghost)"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <line
          x1="20"
          y1="100"
          x2="380"
          y2="100"
          stroke="var(--color-ink-ghost)"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <line
          x1="200"
          y1="10"
          x2="200"
          y2="190"
          stroke="var(--color-ink-ghost)"
          strokeWidth="0.5"
          opacity="0.3"
        />

        {/* Arc from Nepal to Ohio */}
        <path
          d="M 310 65 Q 260 20 120 55"
          fill="none"
          stroke="#C9A87C"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0.6"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-14"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>

        {/* Nepal marker */}
        <g
          className="cursor-pointer"
          onClick={() => onRegionChange("nepal")}
        >
          <circle
            cx="310"
            cy="65"
            r={activeRegion === "nepal" ? 8 : 5}
            fill={activeRegion === "nepal" ? "#C9A87C" : "#555"}
            opacity={activeRegion === "nepal" ? 1 : 0.6}
          >
            {activeRegion === "nepal" && (
              <animate
                attributeName="r"
                values="6;10;6"
                dur="2s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          {activeRegion === "nepal" && (
            <circle
              cx="310"
              cy="65"
              r="14"
              fill="none"
              stroke="#C9A87C"
              strokeWidth="1"
              opacity="0.3"
            >
              <animate
                attributeName="r"
                values="10;18;10"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.3;0;0.3"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          )}
          <text
            x="310"
            y="50"
            textAnchor="middle"
            fill={activeRegion === "nepal" ? "#C9A87C" : "var(--color-ink-secondary)"}
            fontSize="9"
            fontFamily="var(--font-mono)"
            letterSpacing="0.05em"
          >
            NEPAL
          </text>
        </g>

        {/* Ohio marker */}
        <g
          className="cursor-pointer"
          onClick={() => onRegionChange("us")}
        >
          <circle
            cx="120"
            cy="55"
            r={activeRegion === "us" ? 8 : 5}
            fill={activeRegion === "us" ? "#C9A87C" : "#555"}
            opacity={activeRegion === "us" ? 1 : 0.6}
          >
            {activeRegion === "us" && (
              <animate
                attributeName="r"
                values="6;10;6"
                dur="2s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          {activeRegion === "us" && (
            <circle
              cx="120"
              cy="55"
              r="14"
              fill="none"
              stroke="#C9A87C"
              strokeWidth="1"
              opacity="0.3"
            >
              <animate
                attributeName="r"
                values="10;18;10"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.3;0;0.3"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          )}
          <text
            x="120"
            y="40"
            textAnchor="middle"
            fill={activeRegion === "us" ? "#C9A87C" : "var(--color-ink-secondary)"}
            fontSize="9"
            fontFamily="var(--font-mono)"
            letterSpacing="0.05em"
          >
            OHIO, US
          </text>
        </g>
      </svg>
    </div>
  );
}
