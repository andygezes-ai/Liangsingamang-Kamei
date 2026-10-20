import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  MapPin,
  ArrowUpDown,
  Search,
  X,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Info,
  Shield,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { getLocations, searchRoutes } from '../services/routeService';
import {
  calculateCompositeScore,
  getScoreLabel,
  getScoreClass,
  countAvailableIndicators,
} from '../lib/scoring';
import { indicatorWeights, demoHazardReports, demoFacilities } from '../mocks/demoData';
import type { RouteAlternative, Location } from '../types';
import RouteMap from '../components/RouteMap';

export default function RoutePlannerPage() {
  const [fromId, setFromId] = useState<string>('');
  const [toId, setToId] = useState<string>('');
  const [routes, setRoutes] = useState<RouteAlternative[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [expandedRouteId, setExpandedRouteId] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const locations = getLocations();

  const fromLocation: Location | null = locations.find((l) => l.id === fromId) || null;
  const toLocation: Location | null = locations.find((l) => l.id === toId) || null;

  const handleSearch = async () => {
    if (!fromId || !toId) {
      setValidationError('Please select both a starting location and destination.');
      return;
    }

    if (fromId === toId) {
      setValidationError('Starting location and destination cannot be the same place.');
      return;
    }

    if (!fromLocation || !toLocation) {
      setValidationError('One or both selected locations could not be found.');
      return;
    }

    setValidationError(null);
    setIsSearching(true);
    try {
      const results = await searchRoutes(fromLocation, toLocation);
      setRoutes(results);
      setHasSearched(true);
      setSelectedRouteId(results[0]?.id ?? null);
    } catch (error) {
      setRoutes([]);
      setHasSearched(true);
      setSelectedRouteId(null);
      setValidationError(error instanceof Error ? error.message : 'Unable to calculate routes.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSwap = () => {
    setFromId(toId);
    setToId(fromId);
    setValidationError(null);
  };

  const handleClear = () => {
    setFromId('');
    setToId('');
    setRoutes([]);
    setSelectedRouteId(null);
    setExpandedRouteId(null);
    setHasSearched(false);
    setValidationError(null);
  };

  const handleSelectRoute = (id: string) => {
    setSelectedRouteId(id);
  };

  const toggleExpand = (id: string) => {
    setExpandedRouteId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="planner-page">
      {/* 1. App Header */}
      <header className="planner-header">
        <div className="planner-header__brand-group">
          <Link to="/" className="planner-header__brand" aria-label="WayGuard Home">
            <Shield size={22} className="planner-header__logo-icon" />
            <span className="planner-header__brand-name">WayGuard</span>
          </Link>
          <span className="planner-header__badge">Route Navigator</span>
        </div>

        <div className="planner-header__actions">
          <Link to="/" className="planner-header__back-link">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* 2. Main Layout: Sidebar + Map */}
      <div className="planner-layout">
        {/* Left Sidebar (380px width) */}
        <aside className="planner-sidebar" aria-label="Route Planning Controls">
          {/* Route Search Form */}
          <div className="route-search">
            <div className="route-search__inputs">
              {/* From Dropdown */}
              <div className="search-field">
                <label htmlFor="from-location" className="search-field__label">
                  <span className="marker-dot marker-dot--start">A</span>
                  <span>From</span>
                </label>
                <div className="search-field__control">
                  <MapPin size={18} className="search-field__icon" />
                  <select
                    id="from-location"
                    value={fromId}
                    onChange={(e) => {
                      setFromId(e.target.value);
                      if (validationError) setValidationError(null);
                    }}
                    className="search-field__select"
                    aria-label="Starting location"
                  >
                    <option value="">Choose origin...</option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="route-search__swap-wrapper">
                <button
                  type="button"
                  className="btn-swap"
                  onClick={handleSwap}
                  title="Swap starting point and destination"
                  aria-label="Swap starting point and destination"
                >
                  <ArrowUpDown size={16} />
                </button>
              </div>

              {/* To Dropdown */}
              <div className="search-field">
                <label htmlFor="to-location" className="search-field__label">
                  <span className="marker-dot marker-dot--dest">B</span>
                  <span>To</span>
                </label>
                <div className="search-field__control">
                  <MapPin size={18} className="search-field__icon" />
                  <select
                    id="to-location"
                    value={toId}
                    onChange={(e) => {
                      setToId(e.target.value);
                      if (validationError) setValidationError(null);
                    }}
                    className="search-field__select"
                    aria-label="Destination location"
                  >
                    <option value="">Choose destination...</option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Validation Error Message */}
            {validationError && (
              <div className="route-search__error" role="alert">
                <AlertTriangle size={15} className="error-icon" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Search and Clear Action Buttons */}
            <div className="route-search__buttons">
              <button
                type="button"
                className="btn-find-routes"
                onClick={handleSearch}
              >
                <Search size={16} />
                <span>{isSearching ? 'Finding Routes…' : 'Find Routes'}</span>
              </button>

              {(fromId || toId || hasSearched) && (
                <button
                  type="button"
                  className="btn-clear-search"
                  onClick={handleClear}
                  title="Clear inputs and routes"
                >
                  <X size={16} />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Route Results or Empty State */}
          <div className="planner-sidebar__content">
            {!hasSearched ? (
              <div className="planner-empty-state">
                <div className="empty-state__icon-wrapper">
                  <Search size={28} />
                </div>
                <h3 className="empty-state__title">Plan Your Journey</h3>
                <p className="empty-state__description">
                  Enter a starting point and destination to compare routes.
                </p>
                <div className="empty-state__tips">
                  <div className="tip-item">
                    <Info size={14} />
                    <span>Select two different locations above to view routes</span>
                  </div>
                </div>
              </div>
            ) : routes.length === 0 ? (
              <div className="planner-empty-state">
                <div className="empty-state__icon-wrapper">
                  <AlertTriangle size={28} />
                </div>
                <h3 className="empty-state__title">No Routes Found</h3>
                <p className="empty-state__description">
                  No route options available for the selected endpoints. Try selecting different locations.
                </p>
              </div>
            ) : (
              <div className="route-results">
                <div className="route-results__header">
                  <h3 className="route-results__title">Available Routes ({routes.length})</h3>
                  <span className="route-results__subtitle">Select a route to inspect details</span>
                </div>

                <div className="route-results__list">
                  {routes.slice(0, 3).map((route) => {
                    const score = calculateCompositeScore(route.indicators);
                    const scoreLabel = getScoreLabel(score);
                    const scoreClass = getScoreClass(score);
                    const { available, total } = countAvailableIndicators(route.indicators);
                    const isSelected = selectedRouteId === route.id;
                    const isExpanded = expandedRouteId === route.id;
                    const completeness = route.indicators.dataCompleteness ?? 0;

                    return (
                      <article
                        key={route.id}
                        className={`route-card ${isSelected ? 'route-card--selected' : ''}`}
                        onClick={() => handleSelectRoute(route.id)}
                      >
                        {/* Route Card Header */}
                        <div className="route-card__header">
                          <div className="route-card__title-row">
                            <span
                              className="route-card__color-pill"
                              style={{ backgroundColor: route.color }}
                              aria-hidden="true"
                            />
                            <h4 className="route-card__name">{route.name}</h4>
                          </div>

                          <div className="route-card__metrics">
                            <span className="metric-tag">{route.distance}</span>
                            <span className="metric-separator">&bull;</span>
                            <span className="metric-tag">{route.duration}</span>
                          </div>
                        </div>

                        {/* Route Summary */}
                        {route.summary && (
                          <p className="route-card__summary">{route.summary}</p>
                        )}

                        {/* Composite Score Badge & Label */}
                        <div className="route-card__score-box">
                          <div className={`score-badge ${scoreClass}`}>
                            <span className="score-badge__value">
                              {score !== null ? score : '—'}
                            </span>
                            <span className="score-badge__max">/100</span>
                          </div>
                          <div className="score-badge__info">
                            <span className="score-badge__label">{scoreLabel}</span>
                            <span className="score-badge__sub">Composite awareness score</span>
                          </div>
                        </div>

                        {/* Data Completeness Bar */}
                        <div className="route-card__completeness">
                          <div className="completeness__header">
                            <span className="completeness__title">Data Completeness</span>
                            <span className="completeness__stat">
                              {available}/{total} indicators available ({completeness}%)
                            </span>
                          </div>
                          <div className="completeness__track">
                            <div
                              className="completeness__fill"
                              style={{ width: `${completeness}%` }}
                            />
                          </div>
                        </div>

                        {/* Warnings List */}
                        {route.warnings.length > 0 && (
                          <div className="route-card__warnings">
                            {route.warnings.map((warning, wIdx) => (
                              <div key={wIdx} className="warning-item">
                                <AlertTriangle size={14} className="warning-item__icon" />
                                <span className="warning-item__text">{warning}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Expandable Indicator Breakdown */}
                        <div className="route-card__indicators-toggle">
                          <button
                            type="button"
                            className="btn-toggle-indicators"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(route.id);
                            }}
                            aria-expanded={isExpanded}
                          >
                            <span>{isExpanded ? 'Hide indicator breakdown' : 'View indicator breakdown'}</span>
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="route-card__breakdown">
                            <h5 className="breakdown__title">Route Indicator Breakdown</h5>
                            <div className="breakdown__list">
                              {indicatorWeights.map((indicator) => {
                                const rawValue = route.indicators[indicator.key];
                                const hasValue = rawValue !== null;

                                return (
                                  <div key={indicator.key} className="breakdown__item">
                                    <div className="breakdown__item-header">
                                      <span
                                        className="breakdown__item-label"
                                        title={indicator.description}
                                      >
                                        {indicator.label}
                                      </span>
                                      <span
                                        className={`breakdown__item-val ${!hasValue ? 'breakdown__item-val--none' : ''}`}
                                      >
                                        {hasValue ? `${rawValue}%` : 'No data'}
                                      </span>
                                    </div>
                                    <div className="breakdown__track">
                                      <div
                                        className="breakdown__fill"
                                        style={{
                                          width: `${hasValue ? rawValue : 0}%`,
                                          backgroundColor: !hasValue
                                            ? 'transparent'
                                            : rawValue >= 70
                                              ? '#173F35'
                                              : rawValue >= 50
                                                ? '#D89B35'
                                                : '#B85C52',
                                        }}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* View Route Action Button */}
                        <div className="route-card__action">
                          <button
                            type="button"
                            className={`btn-select-route ${isSelected ? 'btn-select-route--active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectRoute(route.id);
                            }}
                          >
                            {isSelected ? (
                              <>
                                <Check size={15} />
                                <span>Active on Map</span>
                              </>
                            ) : (
                              <span>View Route</span>
                            )}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Map Legend */}
          <div className="planner-legend">
            <h4 className="planner-legend__title">Map Legend</h4>
            <div className="planner-legend__grid">
              <div className="legend-entry">
                <span className="legend-chip legend-chip--start">A</span>
                <span className="legend-entry__text">Origin</span>
              </div>
              <div className="legend-entry">
                <span className="legend-chip legend-chip--dest">B</span>
                <span className="legend-entry__text">Destination</span>
              </div>
              <div className="legend-entry">
                <span className="legend-swatch legend-swatch--primary" />
                <span className="legend-entry__text">Primary Route</span>
              </div>
              <div className="legend-entry">
                <span className="legend-swatch legend-swatch--alternate" />
                <span className="legend-entry__text">Alternate Route</span>
              </div>
              <div className="legend-entry">
                <span className="legend-icon-badge">⚠️</span>
                <span className="legend-entry__text">Reported Hazard</span>
              </div>
              <div className="legend-entry">
                <span className="legend-icon-badge">🏛️</span>
                <span className="legend-entry__text">Public Facility</span>
              </div>
            </div>
          </div>

          {/* Demonstration Disclaimer */}
          <footer className="planner-disclaimer">
            <Info size={14} className="planner-disclaimer__icon" />
            <p className="planner-disclaimer__text">
              Routes and indicators shown are demonstration data.
            </p>
          </footer>
        </aside>

        {/* Right Map Area */}
        <main className="planner-map" aria-label="Interactive Route Map">
          <RouteMap
            routes={routes}
            selectedRouteId={selectedRouteId}
            hazardReports={demoHazardReports}
            facilities={demoFacilities}
            fromLocation={fromLocation}
            toLocation={toLocation}
          />
        </main>
      </div>
    </div>
  );
}
