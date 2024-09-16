import { Location } from "../types/geolocation_type";

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Return the distance in meters between two gps points
 */
export function getGPSDistance(coord1?: Location, coord2?: Location): number {
  const R = 6371e3; // Rayon moyen de la Terre en mètres
  const lat1 = coord1?.latitude ?? 0;
  const lat2 = coord2?.latitude ?? 0;
  const lon1 = coord1?.longitude ?? 0;
  const lon2 = coord2?.longitude ?? 0;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Distance en mètres
  return R * c;
}
