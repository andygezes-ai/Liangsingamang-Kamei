import { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { RouteAlternative, HazardReport, PublicFacility, Location } from '../types';
import { HAZARD_CATEGORY_LABELS } from '../mocks/demoData';

interface RouteMapProps {
  routes: RouteAlternative[];
  selectedRouteId: string | null;
  hazardReports: HazardReport[];
  facilities: PublicFacility[];
  fromLocation: Location | null;
  toLocation: Location | null;
}

const FACILITY_ICONS: Record<string, string> = {
  'police-station': '🏛️',
  'hospital': '🏥',
  'bus-stop': '🚏',
  'public-restroom': '🚻',
  'pharmacy': '💊',
};

const HAZARD_ICONS: Record<string, string> = {
  'poor-lighting': '💡',
  'blocked-footpath': '🚧',
  'road-damage': '⚠️',
  'construction': '🏗️',
  'accessibility': '♿',
  'other': '📍',
};

export default function RouteMap({ routes, selectedRouteId, hazardReports, facilities, fromLocation, toLocation }: RouteMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<L.LayerGroup | null>(null);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [19.1100, 72.8600],
      zoom: 12,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    layersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update layers when data changes
  useEffect(() => {
    if (!mapRef.current || !layersRef.current) return;

    const layers = layersRef.current;
    layers.clearLayers();

    const bounds: L.LatLng[] = [];

    // Draw routes (non-selected first, selected last so it's on top)
    const sortedRoutes = [...routes].sort((a, b) => {
      if (a.id === selectedRouteId) return 1;
      if (b.id === selectedRouteId) return -1;
      return 0;
    });

    sortedRoutes.forEach(route => {
      const isSelected = route.id === selectedRouteId;
      const latLngs = route.coordinates.map(c => L.latLng(c[0], c[1]));

      // Shadow line for selected route
      if (isSelected) {
        L.polyline(latLngs, {
          color: route.color,
          weight: 10,
          opacity: 0.25,
        }).addTo(layers);
      }

      const polyline = L.polyline(latLngs, {
        color: route.color,
        weight: isSelected ? 5 : 3,
        opacity: isSelected ? 1 : 0.5,
        dashArray: isSelected ? undefined : '8 6',
      }).addTo(layers);

      polyline.bindPopup(`
        <div style="font-family: 'Inter', sans-serif; min-width: 160px;">
          <strong style="color: ${route.color};">${route.name}</strong>
          <div style="margin-top: 4px; font-size: 13px; color: #69736E;">
            ${route.distance} · ${route.duration}
          </div>
          <div style="margin-top: 4px; font-size: 12px; color: #69736E;">
            ${route.summary}
          </div>
        </div>
      `);

      latLngs.forEach(ll => bounds.push(ll));
    });

    // Start marker
    if (fromLocation) {
      const startIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background:#173F35;color:white;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;box-shadow:0 2px 8px rgba(0,0,0,0.3);border:3px solid white;">A</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
      L.marker([fromLocation.lat, fromLocation.lng], { icon: startIcon })
        .addTo(layers)
        .bindPopup(`<strong>Start:</strong> ${fromLocation.name}`);
      bounds.push(L.latLng(fromLocation.lat, fromLocation.lng));
    }

    // End marker
    if (toLocation) {
      const endIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background:#B85C52;color:white;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;box-shadow:0 2px 8px rgba(0,0,0,0.3);border:3px solid white;">B</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
      L.marker([toLocation.lat, toLocation.lng], { icon: endIcon })
        .addTo(layers)
        .bindPopup(`<strong>Destination:</strong> ${toLocation.name}`);
      bounds.push(L.latLng(toLocation.lat, toLocation.lng));
    }

    // Hazard markers
    hazardReports.forEach(report => {
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background:#FFF3E0;border:2px solid #D89B35;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 1px 4px rgba(0,0,0,0.2);">${HAZARD_ICONS[report.category] || '⚠️'}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      L.marker([report.location.lat, report.location.lng], { icon })
        .addTo(layers)
        .bindPopup(`
          <div style="font-family:'Inter',sans-serif;min-width:180px;">
            <strong style="color:#D89B35;">${HAZARD_CATEGORY_LABELS[report.category]}</strong>
            ${report.isSynthetic ? '<span style="background:#E9EFE7;color:#69736E;font-size:10px;padding:1px 6px;border-radius:4px;margin-left:6px;">Demo Data</span>' : ''}
            <div style="margin-top:6px;font-size:13px;color:#242B29;">${report.description}</div>
            <div style="margin-top:4px;font-size:12px;color:#69736E;">${report.location.name} · ${report.date}</div>
            <div style="margin-top:4px;font-size:11px;color:#69736E;">Status: ${report.status}</div>
          </div>
        `);
    });

    // Facility markers
    facilities.forEach(facility => {
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background:#E9EFE7;border:2px solid #A7B9A5;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;box-shadow:0 1px 3px rgba(0,0,0,0.15);">${FACILITY_ICONS[facility.type] || '📍'}</div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });
      L.marker([facility.lat, facility.lng], { icon })
        .addTo(layers)
        .bindPopup(`
          <div style="font-family:'Inter',sans-serif;">
            <strong style="color:#173F35;">${facility.name}</strong>
            <div style="font-size:12px;color:#69736E;margin-top:2px;">${facility.type.replace('-', ' ')}</div>
          </div>
        `);
    });

    // Fit bounds
    if (bounds.length > 1) {
      mapRef.current.fitBounds(L.latLngBounds(bounds), { padding: [50, 50] });
    }
  }, [routes, selectedRouteId, hazardReports, facilities, fromLocation, toLocation]);

  return (
    <div className="route-map" ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '500px' }} />
  );
}
