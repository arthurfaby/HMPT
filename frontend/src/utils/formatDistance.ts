export function formatDistance(distanceInMeters: number): string {
  if (distanceInMeters < 1000) {
    return `${Math.round(distanceInMeters)} m`;
  } else {
    const distanceInKm = (distanceInMeters / 1000).toFixed(1);
    return `${distanceInKm} km`;
  }
}
