"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Minimum time the loader stays visible (ms)
const MIN_DISPLAY_MS = 3200;

const LOADING_STEPS = [
  "Initializing assets",
  "Loading stylesheets",
  "Rendering components",
  "Optimizing layout",
  "Finalizing render",
];

export default function LoadingScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);

  // Check if this is first load
  useEffect(() => {
    const isFirstLoad = !sessionStorage.getItem("app_loaded");
    if (!isFirstLoad) {
      setDone(true);
      setShouldShow(false);
    } else {
      // Mark as loaded for this session
      sessionStorage.setItem("app_loaded", "true");
    }
  }, []);

  // ── Three.js scene ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!shouldShow) return;

    // Lock scroll while loading screen is visible
    document.body.style.overflow = "hidden";

    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 5;

    // Wireframe icosahedron — the signature shape
    const geo = new THREE.IcosahedronGeometry(1.4, 1);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xc9a87c,
      wireframe: true,
      opacity: 0,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Inner smaller icosahedron (white)
    const innerGeo = new THREE.IcosahedronGeometry(0.8, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      opacity: 0,
      transparent: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Resize handler
    const onResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // Get canvas dimensions
    const W = canvas.clientWidth || 256;
    const H = canvas.clientHeight || 256;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();

    // Animation state
    let frameId: number;
    let elapsed = 0;
    let lastTime = performance.now();
    let progressValue = 0;
    let progressTarget = 0;
    let exploding = false;
    let explodeTime = 0;
    let destroyed = false;

    // Simulate progress ramp with step updates
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];
    const stepsCount = 70;
    for (let step = 1; step <= stepsCount; step++) {
      const delay = (step / stepsCount) * MIN_DISPLAY_MS * (0.3 + (step / stepsCount) * 0.7);
      const targetPct = Math.round((step / stepsCount) * 100);
      const stepIndex = Math.floor((step / stepsCount) * (LOADING_STEPS.length - 1));

      const id = setTimeout(() => {
        if (destroyed) return;
        progressTarget = targetPct;
        setProgress(targetPct);
        setCurrentStep(stepIndex);
      }, delay);
      timeoutIds.push(id);
    }

    function animate() {
      frameId = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      elapsed += delta;

      // Ease progress toward target
      progressValue += (progressTarget - progressValue) * 0.12;
      const t = progressValue / 100;

      // Opacity fades in as loading progresses
      mat.opacity = Math.min(t * 1.4, 0.7);
      innerMat.opacity = Math.min(t * 1.2, 0.5);

      if (!exploding) {
        // Rotation speeds up as progress increases
        const speed = 0.4 + t * 1.0;
        mesh.rotation.x += delta * speed * 0.7;
        mesh.rotation.y += delta * speed;
        innerMesh.rotation.x -= delta * speed * 0.5;
        innerMesh.rotation.y -= delta * speed * 0.8;

        // Subtle scale pulse
        const pulse = 1 + Math.sin(elapsed * 2) * 0.015;
        mesh.scale.setScalar(pulse);
        innerMesh.scale.setScalar(pulse * 0.98);

        // Trigger explosion when fully loaded
        if (progressTarget >= 100 && !exploding) {
          exploding = true;
          explodeTime = 0;
        }
      } else {
        // Explosion — scale up and fade out
        explodeTime += delta;
        const ef = Math.min(explodeTime / 0.6, 1);
        const eased = 1 - Math.pow(1 - ef, 3);

        mesh.scale.setScalar(1 + eased * 2.5);
        innerMesh.scale.setScalar(1 + eased * 3.5);
        mat.opacity = (1 - eased) * 0.7;
        innerMat.opacity = (1 - eased) * 0.5;

        if (ef >= 1 && !destroyed) {
          destroyed = true;
          setExiting(true);
          setTimeout(() => setDone(true), 700);
        }
      }

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      destroyed = true;
      document.body.style.overflow = "";
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      timeoutIds.forEach(clearTimeout);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
    };
  }, [shouldShow]);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        backgroundColor: "#030303",
        opacity: exiting ? 0 : 1,
        transition: exiting ? "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
        pointerEvents: exiting ? "none" : "all",
      }}
    >
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        className="w-48 h-48 md:w-64 md:h-64"
        style={{ display: "block" }}
      />

      {/* Name */}
      <div className="mt-4 mb-8">
        <p
          className="font-[var(--font-display)] font-bold text-[var(--color-ink-tertiary)] tracking-[0.3em] uppercase text-xs"
          style={{ letterSpacing: "0.35em" }}
        >
          Prastut Dahal
        </p>
      </div>

      {/* Progress section */}
      <div className="relative w-64 md:w-80">
        {/* Step label */}
        <div className="mb-6 h-6 flex items-center justify-center">
          <p
            className="font-[var(--font-mono)] text-[12px] tracking-[0.05em] uppercase"
            style={{
              color: "#C9A87C",
              transition: "opacity 0.3s ease",
              opacity: 1,
            }}
          >
            {LOADING_STEPS[currentStep]}
          </p>
        </div>

        {/* Percentage and label */}
        <div className="flex justify-between mb-3">
          <span
            className="font-[var(--font-mono)] text-[11px] tracking-[0.15em] uppercase"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Loading
          </span>
          <span
            className="font-[var(--font-mono)] text-sm font-medium tabular-nums"
            style={{ color: "#C9A87C" }}
          >
            {String(Math.round(progress)).padStart(2, "0")}%
          </span>
        </div>

        {/* Progress track */}
        <div
          className="w-full h-px"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          {/* Fill */}
          <div
            className="h-full"
            style={{
              width: `${progress}%`,
              backgroundColor: "#C9A87C",
              transition: "width 120ms linear",
              boxShadow: "0 0 8px rgba(201,168,124,0.5)",
            }}
          />
        </div>
      </div>

      {/* Corner decorations */}
      <div
        className="absolute top-8 left-8 w-6 h-6 border-t border-l"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      />
      <div
        className="absolute top-8 right-8 w-6 h-6 border-t border-r"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      />
      <div
        className="absolute bottom-8 left-8 w-6 h-6 border-b border-l"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      />
      <div
        className="absolute bottom-8 right-8 w-6 h-6 border-b border-r"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      />
    </div>
  );
}
