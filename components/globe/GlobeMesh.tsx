"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLOBE_RADIUS } from "./utils";
import type { Region } from "@/lib/data";

// Atmosphere shader for Fresnel-edge glow
const atmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform vec3 glowColor;
  void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    gl_FragColor = vec4(glowColor, intensity * 0.6);
  }
`;

const REGION_GLOBE_COLORS = {
  nepal: { atmosphere: "#DC143C", wireframe: "#6B1020" },
  us:    { atmosphere: "#60A5FA", wireframe: "#1E3A8A" },
};

interface GlobeMeshProps {
  activeRegion: Region;
}

export default function GlobeMesh({ activeRegion }: GlobeMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetAtmosphereColor = useRef(new THREE.Color("#C9A87C"));
  const targetWireframeColor = useRef(new THREE.Color("#333355"));
  const targetWireframeOpacity = useRef(0.15);
  const wireframeMatRef = useRef<THREE.MeshBasicMaterial>(null);

  const atmosphereMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        uniforms: {
          glowColor: { value: new THREE.Color("#C9A87C") },
        },
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
      }),
    []
  );

  useEffect(() => {
    const c = REGION_GLOBE_COLORS[activeRegion];
    targetAtmosphereColor.current.set(c.atmosphere);
    targetWireframeColor.current.set(c.wireframe);
    targetWireframeOpacity.current = 0.15;
  }, [activeRegion]);

  // Slow idle rotation + lerp colors & opacity
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
    atmosphereMaterial.uniforms.glowColor.value.lerp(targetAtmosphereColor.current, delta * 3);
    if (wireframeMatRef.current) {
      wireframeMatRef.current.color.lerp(targetWireframeColor.current, delta * 3);
      wireframeMatRef.current.opacity += (targetWireframeOpacity.current - wireframeMatRef.current.opacity) * delta * 3;
    }
  });

  return (
    <group>
      {/* Globe sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshStandardMaterial
          color="#1a1a2e"
          roughness={0.8}
          metalness={0.2}
          emissive="#0a0a1a"
          emissiveIntensity={0.1}
        />
        {/* Wireframe overlay for land detail */}
        <mesh>
          <sphereGeometry args={[GLOBE_RADIUS + 0.005, 32, 32]} />
          <meshBasicMaterial
            ref={wireframeMatRef}
            color="#333355"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      </mesh>

      {/* Atmosphere glow */}
      <mesh scale={1.15}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <primitive object={atmosphereMaterial} />
      </mesh>
    </group>
  );
}
