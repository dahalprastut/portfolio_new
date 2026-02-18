"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { latLngToVector3, GLOBE_RADIUS, NEPAL, OHIO } from "./utils";

export default function JourneyArc() {
  const curve = useMemo(() => {
    const start = latLngToVector3(NEPAL.lat, NEPAL.lng, GLOBE_RADIUS + 0.02);
    const end = latLngToVector3(OHIO.lat, OHIO.lng, GLOBE_RADIUS + 0.02);

    // Midpoint elevated above the globe surface
    const mid = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(GLOBE_RADIUS + 0.8);

    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, []);

  const points = useMemo(() => curve.getPoints(64), [curve]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#C9A87C"
        transparent
        opacity={0.6}
        linewidth={1}
      />
    </line>
  );
}
