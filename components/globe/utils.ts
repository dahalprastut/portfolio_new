import * as THREE from "three";

/**
 * Convert lat/lng (degrees) to a Vector3 on a sphere of given radius
 */
export function latLngToVector3(
  lat: number,
  lng: number,
  radius: number
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/**
 * Get camera position that looks at a lat/lng on the globe
 */
export function getCameraPositionForLatLng(
  lat: number,
  lng: number,
  distance: number
): THREE.Vector3 {
  return latLngToVector3(lat, lng, distance);
}

// Marker locations
export const NEPAL = { lat: 28.39, lng: 84.12, label: "Nepal" };
export const OHIO = { lat: 40.42, lng: -82.91, label: "Ohio, US" };

export const GLOBE_RADIUS = 2;
export const CAMERA_DISTANCE = 5;
