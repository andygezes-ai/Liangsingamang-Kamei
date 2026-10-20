import type { RouteIndicators } from '../types';
import { indicatorWeights } from '../mocks/demoData';

/**
 * Calculate a weighted composite score from route indicators.
 * Returns null if data completeness is below threshold or if
 * too many indicators are missing.
 */
export function calculateCompositeScore(indicators: RouteIndicators): number | null {
  const values = indicatorWeights.map(w => ({
    weight: w.weight,
    value: indicators[w.key],
  }));

  const available = values.filter(v => v.value !== null);

  // Need at least 3 indicators with data
  if (available.length < 3) return null;

  // If data completeness is below 30%, refuse to calculate
  if (indicators.dataCompleteness !== null && indicators.dataCompleteness < 30) return null;

  let totalWeight = 0;
  let weightedSum = 0;

  for (const v of available) {
    totalWeight += v.weight;
    weightedSum += v.weight * (v.value as number);
  }

  if (totalWeight === 0) return null;

  return Math.round(weightedSum / totalWeight);
}

/**
 * Returns a label for a score value
 */
export function getScoreLabel(score: number | null): string {
  if (score === null) return 'Insufficient data';
  if (score >= 75) return 'Higher indicator coverage';
  if (score >= 50) return 'Moderate indicator coverage';
  return 'Lower indicator coverage';
}

/**
 * Returns the CSS class for a score value
 */
export function getScoreClass(score: number | null): string {
  if (score === null) return 'score-unknown';
  if (score >= 75) return 'score-high';
  if (score >= 50) return 'score-moderate';
  return 'score-low';
}

/**
 * Count available indicators
 */
export function countAvailableIndicators(indicators: RouteIndicators): { available: number; total: number } {
  const keys: (keyof RouteIndicators)[] = [
    'lightingCoverage', 'hazardClearance', 'facilityAccess', 'reportFreshness', 'dataCompleteness',
  ];
  const available = keys.filter(k => indicators[k] !== null).length;
  return { available, total: keys.length };
}
