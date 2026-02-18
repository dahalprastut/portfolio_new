"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import GlobeMesh from "./GlobeMesh";
import CountryMarker from "./CountryMarker";
import JourneyArc from "./JourneyArc";
import CountryToast from "./CountryToast";
import RegionGlimmer from "./RegionGlimmer";
import {
  NEPAL,
  OHIO,
  CAMERA_DISTANCE,
  GLOBE_RADIUS,
  getCameraPositionForLatLng,
  latLngToVector3,
} from "./utils";
import type { Region } from "@/lib/data";

interface GlobeSceneInnerProps {
  activeRegion: Region;
  onRegionChange: (region: Region) => void;
}

function CameraController({ activeRegion }: { activeRegion: Region }) {
  const { camera } = useThree();
  const targetRef = useRef(new THREE.Vector3());

  useEffect(() => {
    const loc = activeRegion === "nepal" ? NEPAL : OHIO;
    const target = getCameraPositionForLatLng(
      loc.lat,
      loc.lng,
      CAMERA_DISTANCE
    );
    targetRef.current.copy(target);
  }, [activeRegion]);

  // Smooth camera transition using slerp-like interpolation
  useEffect(() => {
    const loc = activeRegion === "nepal" ? NEPAL : OHIO;
    const targetPos = getCameraPositionForLatLng(
      loc.lat,
      loc.lng,
      CAMERA_DISTANCE
    );

    const startPos = camera.position.clone();
    const startTime = Date.now();
    const duration = 1500;

    function animate() {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      // ease-out-expo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

      camera.position.lerpVectors(startPos, targetPos, eased);
      camera.lookAt(0, 0, 0);

      if (t < 1) {
        requestAnimationFrame(animate);
      }
    }

    animate();
  }, [activeRegion, camera]);

  return null;
}

function GlobeSceneInner({
  activeRegion,
  onRegionChange,
}: GlobeSceneInnerProps) {
  const pointLightRef = useRef<THREE.PointLight>(null);

  const REGION_LIGHT_COLORS = {
    nepal: "#DC143C",
    us:    "#60A5FA",
  };

  useEffect(() => {
    if (pointLightRef.current) {
      pointLightRef.current.color.set(REGION_LIGHT_COLORS[activeRegion]);
    }
  }, [activeRegion]);

  const toastPosition = useMemo((): [number, number, number] => {
    const loc = activeRegion === "nepal" ? NEPAL : OHIO;
    const v = latLngToVector3(loc.lat, loc.lng, GLOBE_RADIUS + 0.45);
    return [v.x, v.y, v.z];
  }, [activeRegion]);

  return (
    <>
      <CameraController activeRegion={activeRegion} />

      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={0.8} />
      <pointLight ref={pointLightRef} position={[-5, -3, -5]} intensity={0.3} color="#C9A87C" />

      <GlobeMesh activeRegion={activeRegion} />

      <CountryMarker
        lat={NEPAL.lat}
        lng={NEPAL.lng}
        label={NEPAL.label}
        isActive={activeRegion === "nepal"}
        onClick={() => onRegionChange("nepal")}
      />
      <CountryMarker
        lat={OHIO.lat}
        lng={OHIO.lng}
        label={OHIO.label}
        isActive={activeRegion === "us"}
        onClick={() => onRegionChange("us")}
      />

      <JourneyArc />

      <CountryToast key={activeRegion} activeRegion={activeRegion} position={toastPosition} />

      <Stars
        radius={50}
        depth={50}
        count={2000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
        rotateSpeed={0.5}
      />
    </>
  );
}

interface GlobeSceneProps {
  activeRegion: Region;
  onRegionChange: (region: Region) => void;
}

export default function GlobeScene({
  activeRegion,
  onRegionChange,
}: GlobeSceneProps) {
  return (
    <>
      <RegionGlimmer key={activeRegion} activeRegion={activeRegion} />
      <Canvas
        camera={{ position: [0, 0, CAMERA_DISTANCE], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true }}
      >
        <GlobeSceneInner
          activeRegion={activeRegion}
          onRegionChange={onRegionChange}
        />
      </Canvas>
    </>
  );
}
