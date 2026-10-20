import { Sun, AlertTriangle, Building2, Clock, Database, Info, ChevronDown, ChevronUp, Scale } from 'lucide-react';
import { useState } from 'react';
import { indicatorWeights, dataCoverage } from '../mocks/demoData';
import { Link } from 'react-router-dom';

export default function MethodologyPage() {
  const [showCalculationDetails, setShowCalculationDetails] = useState(false);

  const indicatorMeta: Record<string, { icon: React.ReactNode; color: string; bgColor: string; lightBg: string }> = {
    lightingCoverage: {
      icon: <Sun size={24} className="text-amber-500" />,
      color: '#D89B35',
      bgColor: '#FEF3C7',
      lightBg: '#FFFDF5',
    },
    hazardClearance: {
      icon: <AlertTriangle size={24} className="text-rose-600" />,
      color: '#B85C52',
      bgColor: '#FEE2E2',
      lightBg: '#FEF7F7',
    },
    facilityAccess: {
      icon: <Building2 size={24} className="text-emerald-700" />,
      color: '#173F35',
      bgColor: '#D1FAE5',
      lightBg: '#F4FAF6',
    },
    reportFreshness: {
      icon: <Clock size={24} className="text-teal-600" />,
      color: '#4A7C59',
      bgColor: '#CCFBF1',
      lightBg: '#F2FAF8',
    },
    dataCompleteness: {
      icon: <Database size={24} className="text-slate-600" />,
      color: '#69736E',
      bgColor: '#E2E8F0',
      lightBg: '#F8FAF9',
    },
  };

  const limitations = [
    {
      id: 1,
      title: 'Prototype Demonstration Data',
      text: 'WayGuard is a prototype using demonstration data only.',
    },
    {
      id: 2,
      title: 'Illustrative Indicator Weights',
      text: 'Indicator weights are illustrative assumptions, not based on validated research.',
    },
    {
      id: 3,
      title: 'Absence of Evidence is Not Evidence of Absence',
      text: 'The absence of reported hazards does not indicate the absence of hazards.',
    },
    {
      id: 4,
      title: 'Unknown Data Treatment',
      text: 'Missing data is treated as unknown, never as evidence of safety.',
    },
    {
      id: 5,
      title: 'Unverified Community Submissions',
      text: 'Community reports are not independently verified in this prototype.',
    },
    {
      id: 6,
      title: 'Not a Safety Rating',
      text: 'Route scores should not be interpreted as safety ratings.',
    },
    {
      id: 7,
      title: 'Personal Judgment Required',
      text: 'Users should always exercise personal judgment regardless of route scores.',
    },
    {
      id: 8,
      title: 'No Crime Prediction or Guarantee',
      text: 'WayGuard does not predict personal crime risk or guarantee safe passage.',
    },
  ];

  return (
    <div className="methodology-page" style={{ maxWidth: '1120px', margin: '0 auto', padding: '40px 20px 80px' }}>
      {/* ─── 1. Page Header ────────────────────────────────────────── */}
      <header className="methodology-header" style={{ marginBottom: '48px', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#E9EFE7',
            color: '#173F35',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          <Scale size={16} />
          Transparency & Civic Governance
        </div>

        <h1
          style={{
            fontFamily: "'Outfit', 'Inter', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 700,
            color: '#173F35',
            lineHeight: 1.2,
            marginBottom: '16px',
          }}
        >
          Methodology & Transparency
        </h1>

        <p
          className="methodology-subtitle"
          style={{
            fontSize: '18px',
            color: '#69736E',
            maxWidth: '720px',
            margin: '0 auto 28px',
            lineHeight: 1.6,
          }}
        >
          Understanding how WayGuard calculates route indicators and the limitations of available data.
        </p>

        {/* Important notice box */}
        <div
          className="methodology-notice"
          style={{
            border: '2px solid #D89B35',
            backgroundColor: '#FFFDF5',
            borderRadius: '12px',
            padding: '18px 24px',
            maxWidth: '820px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            textAlign: 'left',
            boxShadow: '0 4px 14px rgba(216, 155, 53, 0.08)',
          }}
        >
          <AlertTriangle
            size={24}
            style={{ color: '#D89B35', flexShrink: 0, marginTop: '2px' }}
            aria-hidden="true"
          />
          <div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#D89B35',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '4px',
              }}
            >
              Essential Transparency Notice
            </div>
            <p
              style={{
                margin: 0,
                fontSize: '15px',
                color: '#242B29',
                lineHeight: 1.5,
                fontWeight: 500,
              }}
            >
              WayGuard supports informed route decisions using available environmental and community information. It cannot guarantee personal safety.
            </p>
          </div>
        </div>
      </header>

      {/* ─── 2. Indicator Explanations ──────────────────────────────── */}
      <section
        id="indicators"
        className="methodology-indicators"
        style={{ marginBottom: '64px' }}
      >
        <div style={{ marginBottom: '28px' }}>
          <h2
            style={{
              fontFamily: "'Outfit', 'Inter', sans-serif",
              fontSize: '24px',
              fontWeight: 700,
              color: '#173F35',
              marginBottom: '8px',
            }}
          >
            Route Indicators & Weighting
          </h2>
          <p style={{ color: '#69736E', fontSize: '15px', maxWidth: '760px', lineHeight: 1.6 }}>
            Every route in WayGuard is evaluated across five distinct environmental dimensions. Each indicator reflects
            specific civic datasets or aggregated community reports, scaled from 0 to 100.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '24px',
          }}
        >
          {indicatorWeights.map((ind) => {
            const meta = indicatorMeta[ind.key] || {
              icon: <Info size={24} />,
              color: '#173F35',
              bgColor: '#E9EFE7',
              lightBg: '#FFFFFF',
            };
            const weightPercent = Math.round(ind.weight * 100);

            return (
              <div
                key={ind.key}
                className="indicator-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        backgroundColor: meta.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: meta.color,
                      }}
                    >
                      {meta.icon}
                    </div>
                    <span
                      style={{
                        backgroundColor: '#F3F4F6',
                        color: '#242B29',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: 700,
                        border: `1px solid ${meta.color}40`,
                      }}
                    >
                      {weightPercent}% Weight
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#173F35',
                      marginBottom: '10px',
                    }}
                  >
                    {ind.label}
                  </h3>

                  <p
                    style={{
                      fontSize: '14px',
                      color: '#69736E',
                      lineHeight: 1.6,
                      marginBottom: '20px',
                    }}
                  >
                    {ind.description}
                  </p>
                </div>

                {/* Weight Bar */}
                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #F3F4F6' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '12px',
                      color: '#69736E',
                      marginBottom: '6px',
                      fontWeight: 600,
                    }}
                  >
                    <span>Relative Influence</span>
                    <span style={{ color: meta.color }}>{weightPercent}%</span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: '#E5E7EB',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${weightPercent}%`,
                        height: '100%',
                        backgroundColor: meta.color,
                        borderRadius: '4px',
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── 3. Score Calculation ───────────────────────────────────── */}
      <section
        id="scoring"
        className="methodology-scoring"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E5E7EB',
          padding: '36px',
          marginBottom: '64px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div
            style={{
              padding: '10px',
              backgroundColor: '#E9EFE7',
              borderRadius: '10px',
              color: '#173F35',
            }}
          >
            <Scale size={24} />
          </div>
          <h2
            style={{
              fontFamily: "'Outfit', 'Inter', sans-serif",
              fontSize: '24px',
              fontWeight: 700,
              color: '#173F35',
              margin: 0,
            }}
          >
            How the Composite Score is Calculated
          </h2>
        </div>

        <p style={{ color: '#69736E', fontSize: '15px', lineHeight: 1.7, marginBottom: '28px' }}>
          The composite score is calculated as a <strong>weighted normalized average</strong> of all available indicators
          for a selected path. Rather than simple addition, each indicator’s value is weighted according to prototype
          priorities. If an indicator is missing, the weights of remaining available indicators are re-normalized so the
          resulting scale stays consistent between 0 and 100.
        </p>

        {/* Stacked Horizontal Bar Chart (CSS only) */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '10px',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#173F35' }}>
              Weight Distribution (100% Total)
            </span>
            <span style={{ fontSize: '12px', color: '#69736E' }}>
              Stacked indicator contribution
            </span>
          </div>

          <div
            className="stacked-bar-container"
            style={{
              width: '100%',
              height: '42px',
              borderRadius: '10px',
              overflow: 'hidden',
              display: 'flex',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            {indicatorWeights.map((w) => {
              const meta = indicatorMeta[w.key];
              const pct = Math.round(w.weight * 100);
              return (
                <div
                  key={w.key}
                  title={`${w.label}: ${pct}%`}
                  style={{
                    width: `${pct}%`,
                    backgroundColor: meta?.color || '#173F35',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 700,
                    textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                    borderRight: '1px solid rgba(255,255,255,0.3)',
                    padding: '0 4px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {pct}%
                </div>
              );
            })}
          </div>

          {/* Stacked Bar Legend */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px 24px',
              marginTop: '16px',
              padding: '12px 16px',
              backgroundColor: '#F8FAF8',
              borderRadius: '8px',
            }}
          >
            {indicatorWeights.map((w) => {
              const meta = indicatorMeta[w.key];
              const pct = Math.round(w.weight * 100);
              return (
                <div
                  key={w.key}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}
                >
                  <span
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '3px',
                      backgroundColor: meta?.color || '#173F35',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ color: '#242B29', fontWeight: 500 }}>{w.label}</span>
                  <span style={{ color: '#69736E', fontWeight: 700 }}>({pct}%)</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Guardrail Rules Box */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              padding: '18px',
              backgroundColor: '#FEF7F7',
              borderRadius: '12px',
              borderLeft: '4px solid #B85C52',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#B85C52', marginBottom: '4px' }}>
              Minimum 3 Indicators
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#4B5563', lineHeight: 1.5 }}>
              Score is <strong>not calculated</strong> if fewer than 3 indicators have data. WayGuard returns "Insufficient data" rather than a skewed estimate.
            </p>
          </div>

          <div
            style={{
              padding: '18px',
              backgroundColor: '#FFFDF5',
              borderRadius: '12px',
              borderLeft: '4px solid #D89B35',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#D89B35', marginBottom: '4px' }}>
              Completeness Threshold
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#4B5563', lineHeight: 1.5 }}>
              Score is <strong>not calculated</strong> if data completeness is below 30%, preventing misleading figures over unmapped corridors.
            </p>
          </div>

          <div
            style={{
              padding: '18px',
              backgroundColor: '#F4FAF6',
              borderRadius: '12px',
              borderLeft: '4px solid #173F35',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#173F35', marginBottom: '4px' }}>
              Conservative Unknowns
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#4B5563', lineHeight: 1.5 }}>
              Missing data is <strong>never interpreted as evidence of safety</strong>. Unmonitored stretches remain explicitly unknown.
            </p>
          </div>

          <div
            style={{
              padding: '18px',
              backgroundColor: '#F8FAF9',
              borderRadius: '12px',
              borderLeft: '4px solid #69736E',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#69736E', marginBottom: '4px' }}>
              Illustrative Weights
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#4B5563', lineHeight: 1.5 }}>
              These weights are <strong>illustrative prototype assumptions</strong>, not scientifically validated algorithmic absolutes.
            </p>
          </div>
        </div>

        {/* Collapsible Math & Formula Breakdown */}
        <div
          style={{
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <button
            type="button"
            onClick={() => setShowCalculationDetails(!showCalculationDetails)}
            style={{
              width: '100%',
              padding: '16px 20px',
              backgroundColor: '#FAFAF9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              fontWeight: 600,
              fontSize: '14px',
              color: '#173F35',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scale size={18} />
              Mathematical Formula & Calculation Walkthrough
            </span>
            {showCalculationDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {showCalculationDetails && (
            <div style={{ padding: '20px', backgroundColor: '#FFFFFF', fontSize: '14px', color: '#4B5563', lineHeight: 1.6 }}>
              <p style={{ marginBottom: '12px' }}>
                When all indicators <em>i</em> (from 1 to <em>n</em>) are available with score value <em>v<sub>i</sub></em> and weight <em>w<sub>i</sub></em>:
              </p>
              <div
                style={{
                  backgroundColor: '#F8FAF8',
                  padding: '12px 18px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  color: '#173F35',
                  marginBottom: '16px',
                  border: '1px solid #E9EFE7',
                }}
              >
                Composite Score = round( (∑ w_i × v_i) / (∑ w_i) )
              </div>
              <p style={{ marginBottom: '8px' }}>
                <strong>Example Calculation:</strong> Route 1 has Lighting (82 × 0.30) + Hazard Clearance (65 × 0.25) +
                Facility Access (78 × 0.20) + Report Freshness (70 × 0.15) + Data Completeness (75 × 0.10):
              </p>
              <div
                style={{
                  backgroundColor: '#F8FAF8',
                  padding: '12px 18px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  color: '#242B29',
                }}
              >
                Sum = 24.6 + 16.25 + 15.6 + 10.5 + 7.5 = 74.45 → <strong>Final Score: 74</strong>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── 4. Data Sources ────────────────────────────────────────── */}
      <section
        id="data-sources"
        className="methodology-data-sources"
        style={{ marginBottom: '64px' }}
      >
        <div style={{ marginBottom: '24px' }}>
          <h2
            style={{
              fontFamily: "'Outfit', 'Inter', sans-serif",
              fontSize: '24px',
              fontWeight: 700,
              color: '#173F35',
              marginBottom: '8px',
            }}
          >
            Data Sources & Freshness
          </h2>
          <p style={{ color: '#69736E', fontSize: '15px', maxWidth: '760px', lineHeight: 1.6 }}>
            Transparency requires full disclosure of where information originates, how recently it was refreshed, and its
            inherent structural limitations.
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E5E7EB',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table
              className="data-sources-table"
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: '14px',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#F8FAF8', borderBottom: '1px solid #E5E7EB' }}>
                  <th style={{ padding: '16px 20px', fontWeight: 700, color: '#173F35' }}>Indicator</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700, color: '#173F35' }}>Available</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700, color: '#173F35' }}>Source</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700, color: '#173F35' }}>Last Updated</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700, color: '#173F35' }}>Limitation</th>
                </tr>
              </thead>
              <tbody>
                {dataCoverage.map((item, idx) => (
                  <tr
                    key={item.indicator}
                    style={{
                      borderBottom: idx < dataCoverage.length - 1 ? '1px solid #F3F4F6' : 'none',
                      backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FCFDFC',
                    }}
                  >
                    <td style={{ padding: '16px 20px', fontWeight: 600, color: '#173F35' }}>
                      {item.indicator}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {item.available ? (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#15803D',
                            backgroundColor: '#DCFCE7',
                            padding: '3px 10px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 700,
                          }}
                        >
                          <span aria-hidden="true">✓</span> Yes
                        </span>
                      ) : (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#B91C1C',
                            backgroundColor: '#FEE2E2',
                            padding: '3px 10px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 700,
                          }}
                        >
                          <span aria-hidden="true">✕</span> No
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px', color: '#4B5563', maxWidth: '220px' }}>
                      {item.source}
                    </td>
                    <td style={{ padding: '16px 20px', color: '#69736E', whiteSpace: 'nowrap' }}>
                      {item.lastUpdated ? item.lastUpdated : 'N/A'}
                    </td>
                    <td style={{ padding: '16px 20px', color: '#69736E', maxWidth: '300px', lineHeight: 1.5 }}>
                      {item.limitation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── 5. Limitations ─────────────────────────────────────────── */}
      <section
        id="limitations"
        className="methodology-limitations"
        style={{ marginBottom: '64px' }}
      >
        <div style={{ marginBottom: '24px' }}>
          <h2
            style={{
              fontFamily: "'Outfit', 'Inter', sans-serif",
              fontSize: '24px',
              fontWeight: 700,
              color: '#173F35',
              marginBottom: '8px',
            }}
          >
            Important Limitations
          </h2>
          <p style={{ color: '#69736E', fontSize: '15px', maxWidth: '760px', lineHeight: 1.6 }}>
            WayGuard is built with an explicit commitment to epistemic humility: technology must clarify what it does not know.
            Please review these critical constraints:
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '16px',
          }}
        >
          {limitations.map((item) => (
            <div
              key={item.id}
              className="limitation-item"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E5E7EB',
                borderLeft: '4px solid #D89B35',
                padding: '20px',
                display: 'flex',
                gap: '14px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
              }}
            >
              <div
                style={{
                  color: '#D89B35',
                  backgroundColor: '#FFFDF5',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                <Info size={18} />
              </div>

              <div>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#69736E',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '4px',
                  }}
                >
                  Limitation {item.id}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    color: '#242B29',
                    lineHeight: 1.55,
                    fontWeight: 500,
                  }}
                >
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 6. CTA Section ─────────────────────────────────────────── */}
      <section
        className="methodology-cta"
        style={{
          backgroundColor: '#173F35',
          color: '#FFFFFF',
          borderRadius: '24px',
          padding: '48px 32px',
          textAlign: 'center',
          boxShadow: '0 10px 25px -5px rgba(23, 63, 53, 0.25)',
        }}
      >
        <h2
          style={{
            fontFamily: "'Outfit', 'Inter', sans-serif",
            fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
            fontWeight: 700,
            marginBottom: '12px',
          }}
        >
          Navigate with Greater Awareness
        </h2>
        <p
          style={{
            fontSize: '16px',
            color: '#E9EFE7',
            maxWidth: '600px',
            margin: '0 auto 32px',
            lineHeight: 1.6,
          }}
        >
          Compare multi-indicator routes side by side or contribute community observations to improve coverage for all pedestrians.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link
            to="/app"
            className="btn-primary"
            style={{
              backgroundColor: '#D89B35',
              color: '#FFFFFF',
              padding: '14px 28px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(216, 155, 53, 0.3)',
              transition: 'all 0.2s ease',
            }}
          >
            Try the Route Planner
          </Link>
          <Link
            to="/reports"
            className="btn-secondary"
            style={{
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              padding: '12px 26px',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            View Community Reports
          </Link>
        </div>
      </section>
    </div>
  );
}
