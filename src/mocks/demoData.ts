import type { Location, RouteAlternative, HazardReport, PublicFacility, DataCoverage, IndicatorWeight } from '../types';

// ─── Demo Locations ──────────────────────────────────────────────
export const demoLocations: Location[] = [
  { id: 'loc-1', name: 'Central Railway Station', lat: 19.1821, lng: 72.8416, address: 'CSMT, Fort, Mumbai' },
  { id: 'loc-2', name: 'Bandra Kurla Complex', lat: 19.0596, lng: 72.8656, address: 'BKC, Bandra East, Mumbai' },
  { id: 'loc-3', name: 'Juhu Beach', lat: 19.0987, lng: 72.8267, address: 'Juhu, Mumbai' },
  { id: 'loc-4', name: 'Powai Lake', lat: 19.1275, lng: 72.9060, address: 'Powai, Mumbai' },
  { id: 'loc-5', name: 'Gateway of India', lat: 18.9220, lng: 72.8347, address: 'Apollo Bandar, Colaba, Mumbai' },
  { id: 'loc-6', name: 'Andheri Station', lat: 19.1197, lng: 72.8464, address: 'Andheri, Mumbai' },
];

// ─── Demo Routes ─────────────────────────────────────────────────
export const demoRoutes: Record<string, RouteAlternative[]> = {
  'default': [
    {
      id: 'route-1',
      name: 'Main Road via Western Express Highway',
      distance: '12.4 km',
      duration: '~28 min',
      color: '#173F35',
      coordinates: [
        [19.1821, 72.8416], [19.1750, 72.8450], [19.1600, 72.8500],
        [19.1400, 72.8550], [19.1200, 72.8600], [19.1000, 72.8620],
        [19.0800, 72.8640], [19.0596, 72.8656],
      ],
      indicators: {
        lightingCoverage: 82,
        hazardClearance: 65,
        facilityAccess: 78,
        reportFreshness: 70,
        dataCompleteness: 75,
      },
      warnings: ['2 unverified hazard reports along this route'],
      summary: 'Well-lit primary road with moderate reported hazard data. Good facility access along the route.',
    },
    {
      id: 'route-2',
      name: 'Alternate via Sion–Panvel Highway',
      distance: '14.8 km',
      duration: '~35 min',
      color: '#D89B35',
      coordinates: [
        [19.1821, 72.8416], [19.1780, 72.8500], [19.1650, 72.8650],
        [19.1450, 72.8750], [19.1200, 72.8800], [19.1000, 72.8750],
        [19.0800, 72.8700], [19.0596, 72.8656],
      ],
      indicators: {
        lightingCoverage: 58,
        hazardClearance: 80,
        facilityAccess: 45,
        reportFreshness: 55,
        dataCompleteness: 50,
      },
      warnings: ['Limited lighting data available for parts of this route', 'Fewer public facilities reported'],
      summary: 'Longer alternate with fewer reported hazards but limited lighting and facility data.',
    },
    {
      id: 'route-3',
      name: 'Coastal Route via Marine Drive',
      distance: '16.2 km',
      duration: '~42 min',
      color: '#B85C52',
      coordinates: [
        [19.1821, 72.8416], [19.1700, 72.8350], [19.1500, 72.8300],
        [19.1300, 72.8280], [19.1100, 72.8350], [19.0900, 72.8450],
        [19.0700, 72.8550], [19.0596, 72.8656],
      ],
      indicators: {
        lightingCoverage: 70,
        hazardClearance: null,
        facilityAccess: 60,
        reportFreshness: null,
        dataCompleteness: 35,
      },
      warnings: ['Insufficient hazard data for this route', 'Data completeness is low — indicators may be unreliable'],
      summary: 'Scenic coastal route. Hazard data and report freshness are unavailable for significant portions.',
    },
  ],
};

// ─── Demo Hazard Reports ─────────────────────────────────────────
export const demoHazardReports: HazardReport[] = [
  {
    id: 'hr-1',
    category: 'poor-lighting',
    description: 'Street lights not working on the stretch between Sion and Matunga for approximately 200m.',
    location: { lat: 19.1750, lng: 72.8450, name: 'Sion–Matunga Road' },
    date: '2026-10-15',
    status: 'verified',
    isSynthetic: true,
  },
  {
    id: 'hr-2',
    category: 'road-damage',
    description: 'Large pothole on the left lane, approximately 1m wide. Hazardous for two-wheelers.',
    location: { lat: 19.1400, lng: 72.8550, name: 'Western Express Highway, near Vile Parle' },
    date: '2026-10-18',
    status: 'under-review',
    isSynthetic: true,
  },
  {
    id: 'hr-3',
    category: 'blocked-footpath',
    description: 'Footpath completely blocked by construction material and vendor carts. Pedestrians forced onto road.',
    location: { lat: 19.1200, lng: 72.8600, name: 'Bandra West, Linking Road' },
    date: '2026-10-12',
    status: 'verified',
    isSynthetic: true,
  },
  {
    id: 'hr-4',
    category: 'construction',
    description: 'Metro construction has narrowed the road to a single lane. No signage present.',
    location: { lat: 19.1000, lng: 72.8620, name: 'Santacruz East, MIDC Road' },
    date: '2026-10-10',
    status: 'pending-review',
    isSynthetic: true,
  },
  {
    id: 'hr-5',
    category: 'accessibility',
    description: 'Broken ramp near bus stop. Wheelchair users cannot access the sidewalk.',
    location: { lat: 19.0800, lng: 72.8640, name: 'Kurla Station West Exit' },
    date: '2026-10-08',
    status: 'resolved',
    isSynthetic: true,
  },
  {
    id: 'hr-6',
    category: 'poor-lighting',
    description: 'Entire stretch is unlit after 7 PM. No street lamps visible for ~500m.',
    location: { lat: 19.1650, lng: 72.8650, name: 'Sion–Panvel Highway underpass' },
    date: '2026-10-17',
    status: 'verified',
    isSynthetic: true,
  },
];

// ─── Demo Facilities ─────────────────────────────────────────────
export const demoFacilities: PublicFacility[] = [
  { id: 'f-1', name: 'Sion Police Chowki', type: 'police-station', lat: 19.1700, lng: 72.8480 },
  { id: 'f-2', name: 'Lilavati Hospital', type: 'hospital', lat: 19.0504, lng: 72.8286 },
  { id: 'f-3', name: 'Bandra Bus Depot', type: 'bus-stop', lat: 19.0540, lng: 72.8400 },
  { id: 'f-4', name: 'Kurla Pharmacy Plus', type: 'pharmacy', lat: 19.0700, lng: 72.8790 },
  { id: 'f-5', name: 'Andheri Public Restroom', type: 'public-restroom', lat: 19.1200, lng: 72.8467 },
];

// ─── Indicator Weights ───────────────────────────────────────────
export const indicatorWeights: IndicatorWeight[] = [
  {
    key: 'lightingCoverage',
    label: 'Lighting Coverage',
    weight: 0.30,
    description: 'Estimated proportion of the route with reported street lighting based on available municipal and community data.',
  },
  {
    key: 'hazardClearance',
    label: 'Reported Hazard Clearance',
    weight: 0.25,
    description: 'Inverse of reported hazards along the route. Higher values indicate fewer unresolved reports, not the absence of hazards.',
  },
  {
    key: 'facilityAccess',
    label: 'Public Facility Access',
    weight: 0.20,
    description: 'Proximity to mapped public facilities such as police stations, hospitals, and bus stops along the route.',
  },
  {
    key: 'reportFreshness',
    label: 'Report Freshness',
    weight: 0.15,
    description: 'How recent the community reports are for the route. Older data may not reflect current conditions.',
  },
  {
    key: 'dataCompleteness',
    label: 'Data Completeness',
    weight: 0.10,
    description: 'How much of the route has available indicator data. Low completeness means the score may be unreliable.',
  },
];

// ─── Data Coverage Info ──────────────────────────────────────────
export const dataCoverage: DataCoverage[] = [
  {
    indicator: 'Lighting Coverage',
    available: true,
    source: 'Simulated municipal lighting data (demonstration only)',
    lastUpdated: '2026-10-01',
    limitation: 'Real-world coverage requires integration with municipal lighting infrastructure databases.',
  },
  {
    indicator: 'Reported Hazards',
    available: true,
    source: 'Synthetic community reports (demonstration only)',
    lastUpdated: '2026-10-18',
    limitation: 'Reports are demonstration data. Absence of reports does not indicate absence of hazards.',
  },
  {
    indicator: 'Public Facility Access',
    available: true,
    source: 'Illustrative facility locations (demonstration only)',
    lastUpdated: '2026-09-15',
    limitation: 'Actual facility locations, hours, and accessibility status require authoritative data sources.',
  },
  {
    indicator: 'Report Freshness',
    available: true,
    source: 'Calculated from report timestamps',
    lastUpdated: null,
    limitation: 'Freshness only reflects when reports were submitted, not when conditions were last verified.',
  },
  {
    indicator: 'Data Completeness',
    available: true,
    source: 'Calculated from available indicator coverage per route',
    lastUpdated: null,
    limitation: 'Low completeness means fewer indicators are available; the composite score should be interpreted with caution.',
  },
];

export const HAZARD_CATEGORY_LABELS: Record<string, string> = {
  'poor-lighting': 'Poor Lighting',
  'blocked-footpath': 'Blocked Footpath',
  'road-damage': 'Road Damage',
  'construction': 'Construction Obstruction',
  'accessibility': 'Accessibility Concern',
  'other': 'Other Environmental Concern',
};

export const REPORT_STATUS_LABELS: Record<string, string> = {
  'pending-review': 'Pending Review',
  'under-review': 'Under Review',
  'verified': 'Verified',
  'rejected': 'Rejected',
  'resolved': 'Resolved',
};
