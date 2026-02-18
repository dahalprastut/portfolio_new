"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CoronalLoop3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.Fog(0x000000, 10, 20);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2.5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Create single coronal loop with Gaussian width
    const createCoronalLoop = () => {
      const points: THREE.Vector3[] = [];
      const segmentCount = 300;

      // Create an arch/loop path using sine curve
      for (let i = 0; i <= segmentCount; i++) {
        const t = i / segmentCount;
        const x = (t - 0.5) * 3;

        // Gaussian curve for the arch
        const gaussian = Math.exp(-((x * x) / 0.5));
        const y = gaussian * 1.5;
        const z = 0;

        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points);

      // Create custom geometry with Gaussian radius
      const geometry = new THREE.BufferGeometry();
      const pathSegments = 150;
      const radiusSegments = 16;

      const vertices: number[] = [];
      const indices: number[] = [];

      for (let i = 0; i <= pathSegments; i++) {
        const t = i / pathSegments;
        const point = curve.getPoint(t);

        // Gaussian radius - thicker in the middle, thinner at edges
        const gaussianRadius = Math.exp(-((t - 0.5) * (t - 0.5)) / 0.08) * 0.25;

        // Create circle around the curve point
        for (let j = 0; j < radiusSegments; j++) {
          const angle = (j / radiusSegments) * Math.PI * 2;
          const x = point.x + Math.cos(angle) * gaussianRadius;
          const y = point.y + Math.sin(angle) * gaussianRadius;
          const z = point.z + Math.cos(angle) * gaussianRadius * 0.5;

          vertices.push(x, y, z);
        }
      }

      // Create indices for the tube
      for (let i = 0; i < pathSegments; i++) {
        for (let j = 0; j < radiusSegments; j++) {
          const a = i * radiusSegments + j;
          const b = i * radiusSegments + ((j + 1) % radiusSegments);
          const c = (i + 1) * radiusSegments + j;
          const d = (i + 1) * radiusSegments + ((j + 1) % radiusSegments);

          indices.push(a, c, b);
          indices.push(b, c, d);
        }
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(vertices), 3)
      );
      geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
      geometry.computeVertexNormals();

      // Material with yellow/golden color and glow
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0xffeb99),
        emissive: new THREE.Color(0xffd700),
        emissiveIntensity: 0.8,
        shininess: 80,
        wireframe: false,
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Add a glow layer for the tube
      const glowGeometry = geometry.clone();
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xffaa00),
        transparent: true,
        opacity: 0.3,
        side: THREE.BackSide,
      });

      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      glowMesh.scale.multiplyScalar(1.3);
      mesh.add(glowMesh);

      return mesh;
    };

    const coronalLoop = createCoronalLoop();
    scene.add(coronalLoop);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffaa00, 1);
    pointLight2.position.set(-2, 1, 2);
    scene.add(pointLight2);

    // Animation
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Gentle rotation
      coronalLoop.rotation.y += 0.001;
      coronalLoop.rotation.x += 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-[20px] overflow-hidden"
      style={{ minHeight: "400px" }}
    />
  );
}
