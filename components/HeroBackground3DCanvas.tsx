"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT_COLOR = new THREE.Color("#C9A87C");
const WHITE_COLOR = new THREE.Color("#FFFFFF");

// Shared mouse ref — updated by a single global listener mounted in the canvas root
const sharedMouse = { x: 0, y: 0 };

/* ── Single wireframe shape ───────────────────────────────────── */
function WireShape({
  geometry,
  position,
  scale,
  speed,
  color,
}: {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  scale: number;
  speed: [number, number, number];
  color: THREE.Color;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, dt) => {
    ref.current.rotation.x += speed[0] * dt;
    ref.current.rotation.y += speed[1] * dt;
    ref.current.rotation.z += speed[2] * dt;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <primitive object={geometry} attach="geometry" />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.32} />
    </mesh>
  );
}

/* ── Drifting particles ──────────────────────────────────────── */
function Particles({ count = 360 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const { positions, velocities } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const v = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      p[i3]     = (Math.random() - 0.5) * 20;
      p[i3 + 1] = (Math.random() - 0.5) * 14;
      p[i3 + 2] = (Math.random() - 0.5) * 8;
      v[i3]     = (Math.random() - 0.5) * 0.005;
      v[i3 + 1] = (Math.random() - 0.5) * 0.005;
      v[i3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return { positions: p, velocities: v };
  }, [count]);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    return g;
  }, [positions]);

  useFrame(() => {
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3]     += velocities[i3]     + sharedMouse.x * 0.001;
      arr[i3 + 1] += velocities[i3 + 1] + sharedMouse.y * 0.001;
      arr[i3 + 2] += velocities[i3 + 2];
      if (arr[i3]     >  10) arr[i3]     = -10;
      if (arr[i3]     < -10) arr[i3]     =  10;
      if (arr[i3 + 1] >   7) arr[i3 + 1] =  -7;
      if (arr[i3 + 1] <  -7) arr[i3 + 1] =   7;
      if (arr[i3 + 2] >   4) arr[i3 + 2] =  -4;
      if (arr[i3 + 2] <  -4) arr[i3 + 2] =   4;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color={WHITE_COLOR}
        size={0.042}
        sizeAttenuation
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Group with mouse parallax ───────────────────────────────── */
function SceneGroup() {
  const groupRef = useRef<THREE.Group>(null!);
  const targetRot = useRef({ x: 0, y: 0 });

  const icosaGeo  = useMemo(() => new THREE.IcosahedronGeometry(1, 0), []);
  const octaGeo   = useMemo(() => new THREE.OctahedronGeometry(1, 0), []);
  const tetraGeo  = useMemo(() => new THREE.TetrahedronGeometry(1, 0), []);
  const dodecaGeo = useMemo(() => new THREE.DodecahedronGeometry(1, 0), []);

  useFrame((_, dt) => {
    targetRot.current.x += (sharedMouse.y * 0.12 - targetRot.current.x) * 2.5 * dt;
    targetRot.current.y += (sharedMouse.x * 0.22 - targetRot.current.y) * 2.5 * dt;
    groupRef.current.rotation.x = targetRot.current.x;
    groupRef.current.rotation.y = targetRot.current.y;
  });

  return (
    <group ref={groupRef}>
      {/* Large central icosahedron — right-of-center */}
      <WireShape geometry={icosaGeo}  position={[4.5, 0, -3]}     scale={3.5} speed={[0.06, 0.09, 0.03]} color={ACCENT_COLOR} />
      {/* Smaller accent shapes */}
      <WireShape geometry={octaGeo}   position={[7, 2.5, 0]}      scale={0.8} speed={[0.12, 0.08, 0.15]} color={WHITE_COLOR} />
      <WireShape geometry={tetraGeo}  position={[2.5, -2.8, 1]}   scale={0.55} speed={[0.1, 0.14, 0.08]}  color={WHITE_COLOR} />
      <WireShape geometry={dodecaGeo} position={[8.5, -1.5, -2]}  scale={1.1} speed={[0.05, 0.07, 0.04]} color={ACCENT_COLOR} />
      <WireShape geometry={icosaGeo}  position={[1, 3.5, -1]}     scale={0.4} speed={[0.18, 0.12, 0.2]}  color={WHITE_COLOR} />
      <WireShape geometry={octaGeo}   position={[9.5, 3, -1]}     scale={0.65} speed={[0.08, 0.15, 0.06]} color={ACCENT_COLOR} />
      <Particles count={360} />
    </group>
  );
}

/* ── Canvas root ─────────────────────────────────────────────── */
export default function HeroBackground3DCanvas() {
  // Single mouse listener for the whole canvas
  useEffect(() => {
    function onMove(e: MouseEvent) {
      sharedMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      sharedMouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 65 }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.5} />
      <SceneGroup />
    </Canvas>
  );
}
