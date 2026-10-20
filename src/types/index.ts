// ─── Location ─────────────────────────────────────────────────────
export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address?: string;
}

// ─── Route Indicators ────────────────────────────────────────────
export interface RouteIndicators {
  lightingCoverage: number | null;       // 0–100 or null if unknown
  hazardClearance: number | null;        // 0–100 or null if unknown
  facilityAccess: number | null;         // 0–100 or null if unknown
  reportFreshness: number | null;        // 0–100 or null if unknown
  dataCompleteness: number | null;       // 0–100 or null if unknown
}

export interface IndicatorWeight {
  key: keyof RouteIndicators;
  label: string;
  weight: number;
  description: string;
}

// ─── Route ───────────────────────────────────────────────────────
export interface RouteAlternative {
  id: string;
  name: string;
  distance: string;
  duration: string;
  coordinates: [number, number][];
  indicators: RouteIndicators;
  color: string;
  warnings: string[];
  summary: string;
}

// ─── Hazard Reports ──────────────────────────────────────────────
export type HazardCategory =
  | 'poor-lighting'
  | 'blocked-footpath'
  | 'road-damage'
  | 'construction'
  | 'accessibility'
  | 'other';

export type ReportStatus =
  | 'pending-review'
  | 'under-review'
  | 'verified'
  | 'rejected'
  | 'resolved';

export interface HazardReport {
  id: string;
  category: HazardCategory;
  description: string;
  location: { lat: number; lng: number; name: string };
  date: string;
  status: ReportStatus;
  photoUrl?: string;
  isSynthetic: boolean;
}

// ─── Facility ────────────────────────────────────────────────────
export interface PublicFacility {
  id: string;
  name: string;
  type: 'police-station' | 'hospital' | 'bus-stop' | 'public-restroom' | 'pharmacy';
  lat: number;
  lng: number;
}

// ─── Data Coverage ───────────────────────────────────────────────
export interface DataCoverage {
  indicator: string;
  available: boolean;
  source: string;
  lastUpdated: string | null;
  limitation: string;
}
