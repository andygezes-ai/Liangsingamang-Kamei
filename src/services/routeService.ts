import type { RouteAlternative, Location } from '../types';
import { demoLocations } from '../mocks/demoData';

const routeColors = ['#173F35', '#D89B35', '#B85C52'];

export async function searchRoutes(from: Location, to: Location): Promise<RouteAlternative[]> {
  const response = await fetch(`/api/route?fromLat=${from.lat}&fromLon=${from.lng}&toLat=${to.lat}&toLon=${to.lng}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Unable to calculate routes.');

  return (data.routes as { id: string; distanceMeters: number; durationSeconds: number; geometry: { coordinates: [number, number][] } }[])
    .map((route, index) => ({
      id: route.id,
      name: ['Fastest route', 'Alternative route', 'Another alternative'][index] || `Route ${index + 1}`,
      distance: `${(route.distanceMeters / 1000).toFixed(1)} km`,
      duration: `~${Math.round(route.durationSeconds / 60)} min`,
      coordinates: route.geometry.coordinates.map(([lng, lat]) => [lat, lng] as [number, number]),
      indicators: { lightingCoverage: null, hazardClearance: null, facilityAccess: null, reportFreshness: null, dataCompleteness: 0 },
      color: routeColors[index % routeColors.length],
      warnings: ['Safety indicators are not connected to live data and are unavailable for this route.'],
      summary: 'Road route calculated by OSRM. Safety data is not included.',
    }));
}

/**
 * Get all demo locations for the autocomplete
 */
export function getLocations(): Location[] {
  return demoLocations;
}

/**
 * Find a location by its id
 */
export function getLocationById(id: string): Location | undefined {
  return demoLocations.find(l => l.id === id);
}
