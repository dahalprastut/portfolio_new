"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { latLngToVector3, GLOBE_RADIUS } from "./utils";

interface CountryMarkerProps {
  lat: number;
  lng: number;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function CountryMarker({
  lat,
  lng,
  label,
  isActive,
  onClick,
}: CountryMarkerProps) {
  const dotRef = useRef<THREE.Mesh>(null);
  const position = latLngToVector3(lat, lng, GLOBE_RADIUS + 0.02);

  // Pulse animation for active marker
  useFrame(({ clock }) => {
    if (dotRef.current) {
      const scale = isActive
        ? 1 + Math.sin(clock.elapsedTime * 3) * 0.3
        : 1;
      dotRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={position}>
      {/* Glowing dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial
          color={isActive ? "#C9A87C" : "#555555"}
          transparent
          opacity={isActive ? 1 : 0.6}
        />
      </mesh>

      {/* Glow ring */}
      {isActive && (
        <mesh>
          <ringGeometry args={[0.06, 0.1, 32]} />
          <meshBasicMaterial
            color="#C9A87C"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* HTML label */}
      <Html
        position={[0, 0.15, 0]}
        center
        distanceFactor={5}
        style={{ pointerEvents: "auto" }}
      >
        <button
          onClick={onClick}
          className={`
            px-3 py-1.5 rounded-full whitespace-nowrap
            font-[var(--font-mono)] text-[10px] font-medium tracking-wide uppercase
            backdrop-blur-md border transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${
              isActive
                ? "bg-[var(--color-accent-soft)] border-[rgba(201,168,124,0.4)] text-[var(--color-accent)] shadow-[0_0_20px_rgba(201,168,124,0.3)]"
                : "bg-white/6 border-white/10 text-[var(--color-ink-secondary)] hover:bg-white/10"
            }
          `}
        >
          {label}
        </button>
      </Html>
    </group>
  );
}
