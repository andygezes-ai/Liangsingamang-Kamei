import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  ShieldAlert,
  GitCompareArrows,
  MessageSquareWarning,
  BarChart3,
  ArrowRight,
  ChevronRight,
  Eye,
  AlertTriangle,
  Shield,
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      {/* ─── 1. Hero Section ────────────────────────────────────────── */}
      <section className="landing-hero">
        <div className="landing-hero__container">
          <div className="landing-hero__content">
            <div className="landing-hero__badge">
              <Shield size={14} className="landing-hero__badge-icon" />
              <span>Civic Navigation Initiative</span>
            </div>

            <p className="landing-hero__tagline">Navigate with awareness.</p>

            <h1 className="landing-hero__headline">
              Your route should consider more than distance.
            </h1>

            <p className="landing-hero__description">
              Compare available routes using reported hazards, lighting information,
              public-facility access, and data confidence — so you can make a more
              informed travel decision.
            </p>

            <div className="landing-hero__actions">
              <Link to="/app" className="btn-primary">
                Plan a Route
                <ArrowRight size={18} />
              </Link>
              <a href="#how-it-works" className="btn-secondary">
                How It Works
              </a>
            </div>

            <div className="landing-hero__trust-strip">
              <span className="trust-pill">
                <Eye size={13} /> Open Indicators
              </span>
              <span className="trust-pill">
                <MessageSquareWarning size={13} /> Crowdsourced Alerts
              </span>
              <span className="trust-pill">
                <ShieldAlert size={13} /> Zero False Guarantees
              </span>
            </div>
          </div>

          {/* SVG Map Illustration showing 3 alternative routes */}
          <div className="landing-hero__visual" aria-label="Route comparison illustration">
            <svg
              viewBox="0 0 680 440"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="landing-hero__svg-map"
              role="img"
              aria-labelledby="hero-svg-title hero-svg-desc"
            >
              <title id="hero-svg-title">WayGuard Multi-Route Comparison</title>
              <desc id="hero-svg-desc">
                Illustration showing three route alternatives between an origin and destination with hazard indicators and lighting coverage.
              </desc>

              <defs>
                {/* Cartographic Grid Pattern */}
                <pattern id="map-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                  <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#E2E8F0" strokeWidth="0.8" opacity="0.6" />
                </pattern>

                {/* Subtle Coastline / Water Gradient */}
                <linearGradient id="water-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.15" />
                </linearGradient>

                {/* Route Glow Filters */}
                <filter id="route-glow-green" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="pin-shadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.18" />
                </filter>
              </defs>

              {/* Map Canvas Background */}
              <rect width="680" height="440" rx="16" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
              <rect width="680" height="440" rx="16" fill="url(#map-grid)" />

              {/* Stylized Coastal Water Body */}
              <path
                d="M 0 380 Q 180 340 280 400 T 680 390 L 680 440 L 0 440 Z"
                fill="url(#water-gradient)"
              />
              <path
                d="M 0 380 Q 180 340 280 400 T 680 390"
                stroke="#38BDF8"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.4"
                fill="none"
              />

              {/* Secondary Street Grid (Subtle urban backdrop) */}
              <g stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" opacity="0.5">
                <line x1="80" y1="40" x2="80" y2="400" />
                <line x1="220" y1="40" x2="220" y2="400" />
                <line x1="360" y1="40" x2="360" y2="400" />
                <line x1="500" y1="40" x2="500" y2="400" />
                <line x1="40" y1="120" x2="640" y2="120" />
                <line x1="40" y1="240" x2="640" y2="240" />
                <line x1="40" y1="340" x2="640" y2="340" />
              </g>

              {/* ─── ROUTE 3 (Coastal / Terracotta: #B85C52) ─── */}
              <path
                d="M 100 320 C 180 380, 290 360, 390 310 S 490 200, 560 110"
                stroke="#B85C52"
                strokeWidth="6"
                strokeOpacity="0.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 100 320 C 180 380, 290 360, 390 310 S 490 200, 560 110"
                stroke="#B85C52"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="6 4"
                fill="none"
              />

              {/* ─── ROUTE 2 (Alternate / Amber: #D89B35) ─── */}
              <path
                d="M 100 320 C 140 180, 250 80, 360 95 S 480 80, 560 110"
                stroke="#D89B35"
                strokeWidth="6"
                strokeOpacity="0.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 100 320 C 140 180, 250 80, 360 95 S 480 80, 560 110"
                stroke="#D89B35"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* ─── ROUTE 1 (Primary / Pine Green: #173F35) ─── */}
              <path
                d="M 100 320 C 190 300, 250 220, 340 200 S 470 140, 560 110"
                stroke="#173F35"
                strokeWidth="8"
                strokeOpacity="0.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 100 320 C 190 300, 250 220, 340 200 S 470 140, 560 110"
                stroke="#173F35"
                strokeWidth="4.5"
                strokeLinecap="round"
                filter="url(#route-glow-green)"
                fill="none"
              />

              {/* Route Direction Arrows (Subtle chevron markers) */}
              <circle cx="218" cy="253" r="3" fill="#173F35" />
              <circle cx="445" cy="154" r="3" fill="#173F35" />

              {/* ─── HAZARD & ENVIRONMENTAL ICONS ON ROUTES ─── */}
              {/* Hazard 1 on Route 3 (Terracotta) */}
              <g transform="translate(245, 360)" filter="url(#pin-shadow)">
                <rect x="-14" y="-14" width="28" height="28" rx="8" fill="#FFFFFF" stroke="#B85C52" strokeWidth="2" />
                <path d="M 0 -7 L 7 5 L -7 5 Z" fill="#B85C52" />
                <line x1="0" y1="-2" x2="0" y2="1" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="0" cy="3" r="0.8" fill="#FFFFFF" />
              </g>

              {/* Hazard 2 on Route 3 */}
              <g transform="translate(425, 275)" filter="url(#pin-shadow)">
                <rect x="-13" y="-13" width="26" height="26" rx="7" fill="#FFFFFF" stroke="#B85C52" strokeWidth="1.8" />
                <path d="M -5 -5 L 5 5 M 5 -5 L -5 5" stroke="#B85C52" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* Hazard on Route 2 (Amber construction / roadwork) */}
              <g transform="translate(240, 115)" filter="url(#pin-shadow)">
                <rect x="-14" y="-14" width="28" height="28" rx="8" fill="#FFFFFF" stroke="#D89B35" strokeWidth="2" />
                <path d="M 0 -7 L 7 5 L -7 5 Z" fill="#D89B35" />
                <line x1="0" y1="-2" x2="0" y2="1" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="0" cy="3" r="0.8" fill="#FFFFFF" />
              </g>

              {/* Lighting Badge on Route 1 (Green) */}
              <g transform="translate(340, 195)" filter="url(#pin-shadow)">
                <circle cx="0" cy="0" r="14" fill="#173F35" stroke="#FFFFFF" strokeWidth="2" />
                {/* Stylized Sun / Streetlight Rays */}
                <circle cx="0" cy="0" r="4" fill="#FACC15" />
                <path d="M 0 -8 L 0 -6 M 0 6 L 0 8 M -8 0 L -6 0 M 6 0 L 8 0" stroke="#FACC15" strokeWidth="1.5" strokeLinecap="round" />
              </g>

              {/* ─── START MARKER (Origin: CSMT) ─── */}
              <g transform="translate(100, 320)" filter="url(#pin-shadow)">
                {/* Pulsing ring */}
                <circle cx="0" cy="0" r="18" fill="#173F35" fillOpacity="0.15" />
                <circle cx="0" cy="0" r="11" fill="#FFFFFF" stroke="#173F35" strokeWidth="3" />
                <circle cx="0" cy="0" r="4.5" fill="#173F35" />

                {/* Origin Label Card */}
                <g transform="translate(-15, -42)">
                  <rect x="-45" y="-12" width="120" height="26" rx="6" fill="#1E293B" />
                  <text x="15" y="4" fill="#FFFFFF" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="600" textAnchor="middle">
                    Origin: Central Station
                  </text>
                  <polygon points="15,14 10,8 20,8" fill="#1E293B" />
                </g>
              </g>

              {/* ─── DESTINATION MARKER (BKC Tech Hub) ─── */}
              <g transform="translate(560, 110)" filter="url(#pin-shadow)">
                <circle cx="0" cy="0" r="18" fill="#0284C7" fillOpacity="0.15" />
                <circle cx="0" cy="0" r="11" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
                <circle cx="0" cy="0" r="4.5" fill="#0284C7" />

                {/* Destination Label Card */}
                <g transform="translate(-10, -42)">
                  <rect x="-40" y="-12" width="100" height="26" rx="6" fill="#1E293B" />
                  <text x="10" y="4" fill="#FFFFFF" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="600" textAnchor="middle">
                    Destination: BKC
                  </text>
                  <polygon points="10,14 5,8 15,8" fill="#1E293B" />
                </g>
              </g>

              {/* ─── FLOATING ROUTE COMPARISON CHIPS ─── */}
              {/* Route 1 Chip */}
              <g transform="translate(365, 160)" filter="url(#pin-shadow)">
                <rect width="170" height="34" rx="8" fill="#FFFFFF" stroke="#173F35" strokeWidth="1.5" />
                <rect x="8" y="9" width="16" height="16" rx="4" fill="#173F35" />
                <text x="16" y="21" fill="#FFFFFF" fontSize="10" fontWeight="700" textAnchor="middle">1</text>
                <text x="32" y="16" fill="#0F172A" fontSize="11" fontWeight="600">Western Exp. (12.4 km)</text>
                <text x="32" y="27" fill="#166534" fontSize="9.5" fontWeight="500">82% Well-Lit • Best Access</text>
              </g>

              {/* Route 2 Chip */}
              <g transform="translate(370, 50)" filter="url(#pin-shadow)">
                <rect width="160" height="32" rx="8" fill="#FFFFFF" stroke="#D89B35" strokeWidth="1.5" />
                <rect x="8" y="8" width="16" height="16" rx="4" fill="#D89B35" />
                <text x="16" y="20" fill="#FFFFFF" fontSize="10" fontWeight="700" textAnchor="middle">2</text>
                <text x="30" y="15" fill="#0F172A" fontSize="10.5" fontWeight="600">Sion-Panvel (14.8 km)</text>
                <text x="30" y="26" fill="#B45309" fontSize="9" fontWeight="500">1 Roadwork • Moderate</text>
              </g>

              {/* Route 3 Chip */}
              <g transform="translate(425, 335)" filter="url(#pin-shadow)">
                <rect width="165" height="32" rx="8" fill="#FFFFFF" stroke="#B85C52" strokeWidth="1.5" />
                <rect x="8" y="8" width="16" height="16" rx="4" fill="#B85C52" />
                <text x="16" y="20" fill="#FFFFFF" fontSize="10" fontWeight="700" textAnchor="middle">3</text>
                <text x="30" y="15" fill="#0F172A" fontSize="10.5" fontWeight="600">Coastal Route (16.2 km)</text>
                <text x="30" y="26" fill="#991B1B" fontSize="9" fontWeight="500">2 Hazards • Low Data (35%)</text>
              </g>

              {/* Map Legend (Bottom-Left) */}
              <g transform="translate(24, 24)" filter="url(#pin-shadow)">
                <rect width="160" height="72" rx="8" fill="#FFFFFF" fillOpacity="0.95" stroke="#E2E8F0" strokeWidth="1" />
                <text x="12" y="18" fill="#475569" fontSize="10" fontWeight="700" letterSpacing="0.5" style={{ textTransform: 'uppercase' }}>
                  Route Evaluation
                </text>
                <circle cx="18" cy="34" r="4.5" fill="#173F35" />
                <text x="28" y="37" fill="#1E293B" fontSize="10" fontWeight="500">High coverage</text>
                <circle cx="18" cy="49" r="4.5" fill="#D89B35" />
                <text x="28" y="52" fill="#1E293B" fontSize="10" fontWeight="500">Moderate coverage</text>
                <circle cx="18" cy="64" r="4.5" fill="#B85C52" />
                <text x="28" y="67" fill="#1E293B" fontSize="10" fontWeight="500">Hazard / low coverage</text>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* ─── 2. Problem Section ─────────────────────────────────────── */}
      <section className="landing-problem">
        <div className="landing-problem__container">
          <div className="landing-section-header">
            <span className="section-eyebrow">The Routing Dilemma</span>
            <h2 className="landing-problem__title">
              Distance alone doesn't tell the whole story
            </h2>
            <p className="landing-problem__subtitle">
              Mainstream GPS navigation tools optimize strictly for transit velocity
              and shortest mileage. But when traveling through urban environments — especially
              at dusk, in unfamiliar districts, or with mobility considerations — street-level
              conditions matter far more than shaving three minutes off travel time.
            </p>
          </div>

          <div className="landing-problem__grid">
            <div className="problem-column">
              <div className="problem-column__icon-wrapper problem-column__icon--clock">
                <Clock size={28} />
              </div>
              <h3 className="problem-column__title">Speed Overrides Reality</h3>
              <p className="problem-column__text">
                Standard navigation engines aggressively prioritize geometric shortcuts.
                A route that saves two minutes may funnel you through completely unlit
                alleys, isolated industrial underpasses, or deserted thoroughfares with zero
                pedestrian footfall.
              </p>
            </div>

            <div className="problem-column">
              <div className="problem-column__icon-wrapper problem-column__icon--pin">
                <MapPin size={28} />
              </div>
              <h3 className="problem-column__title">Local Context is Invisible</h3>
              <p className="problem-column__text">
                Generic map engines have zero awareness of temporary sidewalk excavations,
                broken pedestrian curb ramps, or distance to active public safe spaces like
                manned transit counters, 24-hour pharmacies, or police kiosks.
              </p>
            </div>

            <div className="problem-column">
              <div className="problem-column__icon-wrapper problem-column__icon--shield">
                <ShieldAlert size={28} />
              </div>
              <h3 className="problem-column__title">Awareness Over False Guarantees</h3>
              <p className="problem-column__text">
                No algorithm can guarantee personal safety, and apps that claim to do so
                give a false sense of security. True empowerment comes from transparent,
                unfiltered environmental data and data confidence scores so you make your
                own conscious choice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. Feature Cards Section ───────────────────────────────── */}
      <section className="landing-features">
        <div className="landing-features__container">
          <div className="landing-section-header">
            <span className="section-eyebrow">Core Capabilities</span>
            <h2 className="landing-features__title">
              Designed for conscious urban navigation
            </h2>
            <p className="landing-features__subtitle">
              WayGuard combines verifiable civic data with transparent community moderation,
              giving you a multi-dimensional perspective on every journey.
            </p>
          </div>

          <div className="landing-features__grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-card__icon-box feature-card__icon--compare">
                <GitCompareArrows size={26} />
              </div>
              <h3 className="feature-card__title">Route Comparison</h3>
              <p className="feature-card__description">
                Evaluate multiple calculated routes side-by-side. Compare differences in
                street lighting intensity, verified hazard reports, facility density, and
                data completeness before stepping out the door.
              </p>
              <ul className="feature-card__list">
                <li>Multi-path indicator trade-offs</li>
                <li>Clear distance &amp; time breakdown</li>
                <li>Visual differentiation by coverage quality</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-card__icon-box feature-card__icon--warning">
                <MessageSquareWarning size={26} />
              </div>
              <h3 className="feature-card__title">Community Hazard Reports</h3>
              <p className="feature-card__description">
                Crowdsourced street alerts detailing inadequate lighting, blocked pedestrian
                sidewalks, road damage, and physical accessibility impediments — with public
                verification status and clear submission timestamps.
              </p>
              <ul className="feature-card__list">
                <li>Categorized infrastructure reports</li>
                <li>Status tracking: Pending, Verified, Resolved</li>
                <li>Community-first civic reporting interface</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-card__icon-box feature-card__icon--chart">
                <BarChart3 size={26} />
              </div>
              <h3 className="feature-card__title">Explainable Indicators</h3>
              <p className="feature-card__description">
                Zero black-box calculations. Every composite score is broken down into its
                underlying weights, data freshness, and data completeness metrics. If data
                is sparse, we warn you immediately.
              </p>
              <ul className="feature-card__list">
                <li>Documented weighting formulas</li>
                <li>Data completeness warning flags</li>
                <li>Independent indicators for lighting &amp; facilities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. How It Works Section ────────────────────────────────── */}
      <section id="how-it-works" className="landing-how-it-works">
        <div className="landing-how-it-works__container">
          <div className="landing-section-header">
            <span className="section-eyebrow">User Guide</span>
            <h2 className="landing-how-it-works__title">How WayGuard works</h2>
            <p className="landing-how-it-works__subtitle">
              Four straightforward steps to move from simple destination search to
              context-aware route selection.
            </p>
          </div>

          <div className="landing-how-it-works__steps">
            {/* Step 1 */}
            <div className="step-card">
              <div className="step-card__header">
                <span className="step-card__number">01</span>
                <div className="step-card__icon">
                  <MapPin size={20} />
                </div>
              </div>
              <h3 className="step-card__title">
                Enter a starting point and destination
              </h3>
              <p className="step-card__description">
                Type your origin and target destination or pick from popular transit
                hubs and civic landmarks to initiate the multi-route analysis.
              </p>
            </div>

            {/* Step 2 */}
            <div className="step-card">
              <div className="step-card__header">
                <span className="step-card__number">02</span>
                <div className="step-card__icon">
                  <GitCompareArrows size={20} />
                </div>
              </div>
              <h3 className="step-card__title">
                Compare available routes
              </h3>
              <p className="step-card__description">
                Inspect up to three distinct calculated routes displayed simultaneously
                on the map, each color-coded with distance and travel time.
              </p>
            </div>

            {/* Step 3 */}
            <div className="step-card">
              <div className="step-card__header">
                <span className="step-card__number">03</span>
                <div className="step-card__icon">
                  <BarChart3 size={20} />
                </div>
              </div>
              <h3 className="step-card__title">
                Review indicators and data limitations
              </h3>
              <p className="step-card__description">
                Check individual metrics for street lighting, reported hazards, and
                facility access. Notice any warning flags for incomplete or older data.
              </p>
            </div>

            {/* Step 4 */}
            <div className="step-card">
              <div className="step-card__header">
                <span className="step-card__number">04</span>
                <div className="step-card__icon">
                  <Shield size={20} />
                </div>
              </div>
              <h3 className="step-card__title">
                Choose according to personal preferences
              </h3>
              <p className="step-card__description">
                Select the path that matches your comfort level and needs — whether you
                prefer brighter streets, flatter sidewalks, or proximity to hospitals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. Product Preview Section ─────────────────────────────── */}
      <section className="landing-preview">
        <div className="landing-preview__container">
          <div className="landing-section-header">
            <span className="section-eyebrow">Interactive Demonstration</span>
            <h2 className="landing-preview__title">
              See how route comparison works
            </h2>
            <p className="landing-preview__subtitle">
              A streamlined, high-contrast interface designed for quick assessment of
              critical travel factors at a single glance.
            </p>
          </div>

          {/* Visual Mockup Shell */}
          <div className="preview-window">
            <div className="preview-window__topbar">
              <div className="preview-window__controls">
                <span className="preview-window__dot dot--red"></span>
                <span className="preview-window__dot dot--yellow"></span>
                <span className="preview-window__dot dot--green"></span>
              </div>
              <div className="preview-window__title-bar">
                WayGuard Route Explorer — Mumbai Central to BKC
              </div>
              <div className="preview-window__status">
                <span className="preview-status-pill">Demo Mode</span>
              </div>
            </div>

            <div className="preview-window__body">
              {/* Sidebar with mini route cards */}
              <div className="preview-sidebar">
                <div className="preview-search-box">
                  <div className="preview-search-field">
                    <span className="preview-dot preview-dot--start"></span>
                    <span className="preview-search-text">Central Railway Station</span>
                  </div>
                  <div className="preview-search-connector"></div>
                  <div className="preview-search-field">
                    <span className="preview-dot preview-dot--end"></span>
                    <span className="preview-search-text">Bandra Kurla Complex (BKC)</span>
                  </div>
                </div>

                <div className="preview-route-list">
                  {/* Route 1 Card (Selected) */}
                  <div className="preview-route-card preview-route-card--active preview-route-card--green">
                    <div className="preview-route-card__header">
                      <div className="preview-route-card__tag-group">
                        <span className="preview-route-badge badge--green">Route 1</span>
                        <span className="preview-route-name">Main Road via WEH</span>
                      </div>
                      <span className="preview-score-badge badge--score-high">78 / 100</span>
                    </div>

                    <div className="preview-route-card__meta">
                      <span><strong>12.4 km</strong></span>
                      <span>•</span>
                      <span>~28 min</span>
                      <span>•</span>
                      <span className="text-emerald-700">Well-lit</span>
                    </div>

                    {/* Indicator progress bars */}
                    <div className="preview-indicator-bars">
                      <div className="indicator-bar-row">
                        <span className="indicator-label">Lighting Coverage</span>
                        <div className="indicator-track">
                          <div className="indicator-fill fill--green" style={{ width: '82%' }}></div>
                        </div>
                        <span className="indicator-value">82%</span>
                      </div>
                      <div className="indicator-bar-row">
                        <span className="indicator-label">Hazard Clearance</span>
                        <div className="indicator-track">
                          <div className="indicator-fill fill--amber" style={{ width: '65%' }}></div>
                        </div>
                        <span className="indicator-value">65%</span>
                      </div>
                      <div className="indicator-bar-row">
                        <span className="indicator-label">Facility Access</span>
                        <div className="indicator-track">
                          <div className="indicator-fill fill--green" style={{ width: '78%' }}></div>
                        </div>
                        <span className="indicator-value">78%</span>
                      </div>
                      <div className="indicator-bar-row">
                        <span className="indicator-label">Data Completeness</span>
                        <div className="indicator-track">
                          <div className="indicator-fill fill--green" style={{ width: '75%' }}></div>
                        </div>
                        <span className="indicator-value">75%</span>
                      </div>
                    </div>
                  </div>

                  {/* Route 2 Card */}
                  <div className="preview-route-card preview-route-card--amber">
                    <div className="preview-route-card__header">
                      <div className="preview-route-card__tag-group">
                        <span className="preview-route-badge badge--amber">Route 2</span>
                        <span className="preview-route-name">Alternate via Sion-Panvel</span>
                      </div>
                      <span className="preview-score-badge badge--score-mod">62 / 100</span>
                    </div>
                    <div className="preview-route-card__meta">
                      <span><strong>14.8 km</strong></span>
                      <span>•</span>
                      <span>~35 min</span>
                      <span>•</span>
                      <span className="text-amber-700">1 Report</span>
                    </div>
                  </div>

                  {/* Route 3 Card */}
                  <div className="preview-route-card preview-route-card--red">
                    <div className="preview-route-card__header">
                      <div className="preview-route-card__tag-group">
                        <span className="preview-route-badge badge--red">Route 3</span>
                        <span className="preview-route-name">Coastal Route</span>
                      </div>
                      <span className="preview-score-badge badge--score-low">Low Data</span>
                    </div>
                    <div className="preview-route-card__meta">
                      <span><strong>16.2 km</strong></span>
                      <span>•</span>
                      <span>~42 min</span>
                      <span>•</span>
                      <span className="text-rose-700">Data 35%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Area Preview */}
              <div className="preview-map-area">
                <div className="preview-map-canvas">
                  {/* Stylized background roads */}
                  <div className="preview-map-road road--horizontal-1"></div>
                  <div className="preview-map-road road--horizontal-2"></div>
                  <div className="preview-map-road road--vertical-1"></div>
                  <div className="preview-map-road road--vertical-2"></div>

                  {/* Route Polylines Representation */}
                  <svg className="preview-map-svg" viewBox="0 0 500 320">
                    {/* Route 3 line */}
                    <path
                      d="M 60 250 C 140 300, 260 280, 340 230 S 410 140, 440 70"
                      stroke="#B85C52"
                      strokeWidth="3.5"
                      strokeDasharray="5 3"
                      fill="none"
                    />
                    {/* Route 2 line */}
                    <path
                      d="M 60 250 C 100 140, 200 60, 300 70 S 390 60, 440 70"
                      stroke="#D89B35"
                      strokeWidth="3.5"
                      fill="none"
                    />
                    {/* Route 1 line (selected) */}
                    <path
                      d="M 60 250 C 150 230, 200 170, 280 150 S 380 100, 440 70"
                      stroke="#173F35"
                      strokeWidth="5"
                      fill="none"
                    />
                  </svg>

                  {/* Markers & Map Tooltips */}
                  <div className="preview-map-pin preview-map-pin--start" style={{ left: '50px', top: '235px' }}>
                    <div className="pin-pulse"></div>
                    <div className="pin-dot pin-dot--start"></div>
                    <span className="pin-tooltip">CSMT Station</span>
                  </div>

                  <div className="preview-map-pin preview-map-pin--end" style={{ left: '430px', top: '55px' }}>
                    <div className="pin-dot pin-dot--end"></div>
                    <span className="pin-tooltip">BKC Hub</span>
                  </div>

                  {/* Hazard Marker on Route */}
                  <div className="preview-map-hazard" style={{ left: '200px', top: '85px' }}>
                    <span className="hazard-chip">
                      <AlertTriangle size={12} /> Pothole Report
                    </span>
                  </div>

                  {/* Facility Marker */}
                  <div className="preview-map-facility" style={{ left: '270px', top: '165px' }}>
                    <span className="facility-chip">
                      <Shield size={12} /> Police Chowki
                    </span>
                  </div>

                  {/* Route Summary Overlay Pill */}
                  <div className="preview-map-overlay-summary">
                    <div className="overlay-summary__text">
                      <span className="overlay-summary__title">Selected: Western Express Highway</span>
                      <span className="overlay-summary__subtitle">High indicator confidence (75%) • 28 min</span>
                    </div>
                    <Link to="/app" className="btn-primary preview-launch-btn">
                      Open in App
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Transparency Section ────────────────────────────────── */}
      <section className="landing-transparency">
        <div className="landing-transparency__container">
          <div className="landing-section-header">
            <span className="section-eyebrow">Civic Accountability</span>
            <h2 className="landing-transparency__title">
              We believe in transparency
            </h2>
            <p className="landing-transparency__subtitle">
              Civic technology must be honest about what it can and cannot do. We build
              tools that empower people through clear visibility, not black-box promises.
            </p>
          </div>

          {/* Prominent Mandatory Safety Notice */}
          <div className="transparency-notice-box" role="alert">
            <div className="transparency-notice-box__icon">
              <ShieldAlert size={28} />
            </div>
            <div className="transparency-notice-box__content">
              <h3 className="transparency-notice-box__heading">
                Important Civic Safety Notice
              </h3>
              <p className="transparency-notice-box__statement">
                WayGuard supports informed route decisions using available environmental
                and community information. It cannot guarantee personal safety.
              </p>
              <p className="transparency-notice-box__detail">
                Street conditions are dynamic, changing by the hour. An absence of reported
                hazards does not mean a street is completely secure or free of risks. Always
                exercise personal discretion, maintain awareness of surroundings, and follow
                local authority guidance.
              </p>
            </div>
          </div>

          {/* Data Limitations Explanation */}
          <div className="transparency-pillars">
            <div className="transparency-pillar">
              <div className="transparency-pillar__header">
                <AlertTriangle size={20} className="pillar-icon pillar-icon--amber" />
                <h4>Explicit Data Completeness</h4>
              </div>
              <p>
                Not all streets have equal civic sensor coverage or active report histories.
                If data completeness falls below 30%, WayGuard will refuse to output a composite
                score to prevent deceptive or misleading recommendations.
              </p>
            </div>

            <div className="transparency-pillar">
              <div className="transparency-pillar__header">
                <MessageSquareWarning size={20} className="pillar-icon pillar-icon--blue" />
                <h4>Report Freshness &amp; Verification</h4>
              </div>
              <p>
                Community reports clearly state whether they are pending review, verified by
                community moderators, or resolved. Every report displays its exact submission
                date so you never rely on obsolete information.
              </p>
            </div>

            <div className="transparency-pillar">
              <div className="transparency-pillar__header">
                <BarChart3 size={20} className="pillar-icon pillar-icon--green" />
                <h4>Open Weighting &amp; Scoring</h4>
              </div>
              <p>
                We do not employ secret algorithms. Every indicator weight — lighting (30%),
                hazard clearance (25%), facility access (20%), report freshness (15%), and
                completeness (10%) — is published openly for community audit.
              </p>
            </div>
          </div>

          <div className="landing-transparency__cta">
            <Link to="/methodology" className="btn-outline">
              Read Our Methodology
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 7. Final Call to Action Strip ──────────────────────────── */}
      <section className="landing-cta-strip">
        <div className="landing-cta-strip__container">
          <div className="landing-cta-strip__content">
            <h2 className="landing-cta-strip__title">
              Ready to explore conscious navigation?
            </h2>
            <p className="landing-cta-strip__description">
              Try our interactive prototype today. Compare multiple pathways and make
              travel decisions backed by civic data and community awareness.
            </p>
          </div>
          <div className="landing-cta-strip__action">
            <Link to="/app" className="btn-primary landing-cta-btn">
              Plan a Route
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
