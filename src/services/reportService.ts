import type { HazardReport, HazardCategory, ReportStatus } from '../types';
import { demoHazardReports } from '../mocks/demoData';

const STORAGE_KEY = 'wayguard-reports';

/**
 * Load reports from localStorage merged with demo data
 */
export function getReports(): HazardReport[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  const userReports: HazardReport[] = stored ? JSON.parse(stored) : [];
  return [...demoHazardReports, ...userReports];
}

/**
 * Filter reports by status
 */
export function getReportsByStatus(status: ReportStatus | 'all'): HazardReport[] {
  const all = getReports();
  if (status === 'all') return all;
  return all.filter(r => r.status === status);
}

/**
 * Submit a new report (stores in localStorage)
 */
export function submitReport(data: {
  category: HazardCategory;
  description: string;
  locationName: string;
  lat: number;
  lng: number;
  date: string;
}): HazardReport {
  const report: HazardReport = {
    id: `user-${Date.now()}`,
    category: data.category,
    description: data.description,
    location: { lat: data.lat, lng: data.lng, name: data.locationName },
    date: data.date,
    status: 'pending-review',
    isSynthetic: false,
  };

  const stored = localStorage.getItem(STORAGE_KEY);
  const existing: HazardReport[] = stored ? JSON.parse(stored) : [];
  existing.push(report);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

  return report;
}
