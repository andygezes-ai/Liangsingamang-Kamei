import { useState } from 'react';
import {
  AlertTriangle,
  MapPin,
  Calendar,
  Filter,
  Plus,
  Check,
  Clock,
  Eye,
  XCircle,
  CheckCircle,
  ChevronDown,
  X,
} from 'lucide-react';
import { getReports, submitReport } from '../services/reportService';
import { HAZARD_CATEGORY_LABELS, REPORT_STATUS_LABELS, demoLocations } from '../mocks/demoData';
import type { HazardReport, HazardCategory, ReportStatus } from '../types';

export default function ReportsPage() {
  // ─── Form State ───────────────────────────────────────────────────
  const [category, setCategory] = useState<HazardCategory | ''>('');
  const [description, setDescription] = useState<string>('');
  const [locationId, setLocationId] = useState<string>('');
  const [date, setDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState<number>(0);
  const [errors, setErrors] = useState<{
    category?: string;
    description?: string;
    location?: string;
    date?: string;
  }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // ─── Reports List State ───────────────────────────────────────────
  const [reports, setReports] = useState<HazardReport[]>(() => getReports());
  const [statusFilter, setStatusFilter] = useState<ReportStatus | 'all'>('all');

  // ─── Photo Handling ───────────────────────────────────────────────
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(objectUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setFileInputKey((prev) => prev + 1);
  };

  // ─── Form Validation & Submit ─────────────────────────────────────
  const validateForm = (): boolean => {
    const newErrors: {
      category?: string;
      description?: string;
      location?: string;
      date?: string;
    } = {};

    if (!category) {
      newErrors.category = 'Please select a hazard category.';
    }

    if (!description.trim()) {
      newErrors.description = 'Please provide a description.';
    } else if (description.trim().length < 20) {
      newErrors.description = `Description must be at least 20 characters (current: ${description.trim().length}).`;
    }

    if (!locationId) {
      newErrors.location = 'Please select an observed location.';
    }

    if (!date) {
      newErrors.date = 'Please provide the observation date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const selectedLoc = demoLocations.find((l) => l.id === locationId);
    if (!selectedLoc) {
      setErrors((prev) => ({ ...prev, location: 'Selected location could not be found.' }));
      return;
    }

    submitReport({
      category: category as HazardCategory,
      description: description.trim(),
      locationName: selectedLoc.name,
      lat: selectedLoc.lat,
      lng: selectedLoc.lng,
      date,
    });

    // Refresh reports list from storage
    setReports(getReports());
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setCategory('');
    setDescription('');
    setLocationId('');
    setDate(new Date().toISOString().split('T')[0]);
    setPhotoPreview(null);
    setFileInputKey((prev) => prev + 1);
    setErrors({});
    setIsSubmitted(false);
  };

  // ─── Status Filter List ───────────────────────────────────────────
  const filterOptions: { key: ReportStatus | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending-review', label: 'Pending Review' },
    { key: 'under-review', label: 'Under Review' },
    { key: 'verified', label: 'Verified' },
    { key: 'resolved', label: 'Resolved' },
    { key: 'rejected', label: 'Rejected' },
  ];

  const filteredReports = reports.filter((report) => {
    if (statusFilter === 'all') return true;
    return report.status === statusFilter;
  });

  const getStatusIcon = (status: ReportStatus) => {
    switch (status) {
      case 'pending-review':
        return <Clock size={13} />;
      case 'under-review':
        return <Eye size={13} />;
      case 'verified':
        return <CheckCircle size={13} />;
      case 'rejected':
        return <XCircle size={13} />;
      case 'resolved':
        return <Check size={13} />;
    }
  };

  return (
    <div className="reports-page">
      {/* ─── Civic Prototype Disclaimer Notice ──────────────────────── */}
      <div
        style={{
          background: '#FFF9F0',
          borderBottom: '1px solid #FDE68A',
          padding: '12px 24px',
          fontSize: '0.85rem',
          color: '#92400E',
        }}
      >
        <div
          className="container"
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <AlertTriangle size={18} style={{ flexShrink: 0, color: '#D97706' }} />
          <span>
            <strong>Demonstration Notice:</strong> Reports submitted through this interface are stored in browser local storage for prototype testing. No data is dispatched to municipal or emergency dispatch authorities.
          </span>
        </div>
      </div>

      {/* ─── 1. Report Submission Form Section ──────────────────────── */}
      <section className="report-form-section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
            <span className="section-label">Community Action</span>
            <h2>Submit a Hazard Report</h2>
            <p className="section-subtitle" style={{ margin: '8px auto 0' }}>
              Help improve route information by reporting environmental hazards you observe.
            </p>
          </div>

          {isSubmitted ? (
            <div className="report-form">
              <div className="success-card">
                <div className="success-card__icon">
                  <Check size={28} />
                </div>
                <h3>Report Submitted Successfully</h3>
                <p>
                  Report submitted successfully. Your report has been assigned pending-review status. This is demonstration data and has not been sent to any authority.
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleReset}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}
                >
                  <Plus size={16} />
                  <span>Submit Another</span>
                </button>
              </div>
            </div>
          ) : (
            <form className="report-form" onSubmit={handleSubmit} noValidate>
              {/* Category Field */}
              <div className="form-field">
                <label htmlFor="report-category">
                  Category <span style={{ color: '#B85C52' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    id="report-category"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value as HazardCategory);
                      if (errors.category) {
                        setErrors((prev) => ({ ...prev, category: undefined }));
                      }
                    }}
                    style={{
                      borderColor: errors.category ? 'var(--muted-red)' : undefined,
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      paddingRight: '36px',
                    }}
                  >
                    <option value="">Select a hazard category...</option>
                    {(Object.keys(HAZARD_CATEGORY_LABELS) as HazardCategory[]).map((catKey) => (
                      <option key={catKey} value={catKey}>
                        {HAZARD_CATEGORY_LABELS[catKey]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      color: 'var(--secondary)',
                    }}
                  />
                </div>
                {errors.category && (
                  <div className="form-field__error">{errors.category}</div>
                )}
              </div>

              {/* Description Field */}
              <div className="form-field">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label htmlFor="report-description" style={{ margin: 0 }}>
                    Description <span style={{ color: '#B85C52' }}>*</span>
                  </label>
                  <span
                    className="form-field__hint"
                    style={{
                      margin: 0,
                      color: description.length > 0 && description.length < 20 ? 'var(--amber)' : undefined,
                      fontWeight: 500,
                    }}
                  >
                    {description.length} / 500 characters (min. 20)
                  </span>
                </div>
                <textarea
                  id="report-description"
                  rows={4}
                  maxLength={500}
                  placeholder="Provide specific details about the observed hazard (minimum 20 characters)..."
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description && e.target.value.trim().length >= 20) {
                      setErrors((prev) => ({ ...prev, description: undefined }));
                    }
                  }}
                  style={{
                    borderColor: errors.description ? 'var(--muted-red)' : undefined,
                  }}
                />
                {errors.description && (
                  <div className="form-field__error">{errors.description}</div>
                )}
              </div>

              {/* Location Field */}
              <div className="form-field">
                <label htmlFor="report-location">
                  Location <span style={{ color: '#B85C52' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    id="report-location"
                    value={locationId}
                    onChange={(e) => {
                      setLocationId(e.target.value);
                      if (errors.location) {
                        setErrors((prev) => ({ ...prev, location: undefined }));
                      }
                    }}
                    style={{
                      borderColor: errors.location ? 'var(--muted-red)' : undefined,
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      paddingRight: '36px',
                    }}
                  >
                    <option value="">Select an observed location...</option>
                    {demoLocations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name} {loc.address ? `(${loc.address})` : ''}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      color: 'var(--secondary)',
                    }}
                  />
                </div>
                {errors.location && (
                  <div className="form-field__error">{errors.location}</div>
                )}
              </div>

              {/* Date Field */}
              <div className="form-field">
                <label htmlFor="report-date">
                  Date/Time <span style={{ color: '#B85C52' }}>*</span>
                </label>
                <input
                  type="date"
                  id="report-date"
                  value={date}
                  max={new Date().toISOString().split('T')[0]}
                  onChange={(e) => {
                    setDate(e.target.value);
                    if (errors.date) {
                      setErrors((prev) => ({ ...prev, date: undefined }));
                    }
                  }}
                  style={{
                    borderColor: errors.date ? 'var(--muted-red)' : undefined,
                  }}
                />
                {errors.date && (
                  <div className="form-field__error">{errors.date}</div>
                )}
              </div>

              {/* Photo Field (Optional) */}
              <div className="form-field">
                <label htmlFor="report-photo">
                  Photo <span style={{ fontWeight: 400, color: 'var(--secondary)' }}>(Optional)</span>
                </label>
                <input
                  key={fileInputKey}
                  type="file"
                  id="report-photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                <div className="form-field__hint">Upload a JPEG, PNG, or WebP image to provide visual context.</div>

                {photoPreview && (
                  <div style={{ position: 'relative', display: 'inline-block', marginTop: '10px' }}>
                    <img src={photoPreview} alt="Hazard preview" className="photo-preview" />
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      title="Remove image preview"
                      aria-label="Remove image preview"
                      style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        background: 'rgba(36, 43, 41, 0.75)',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: '12px',
                  padding: '14px 20px',
                }}
              >
                <Plus size={18} />
                <span>Submit Hazard Report</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ─── 2. Report List Section ─────────────────────────────────── */}
      <section className="report-list-section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="section-label">Public Registry</span>
              <h2>Community Reports</h2>
              <p className="section-subtitle" style={{ marginTop: '4px' }}>
                These reports are demonstration data. No report verification has been performed.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--secondary)', fontSize: '0.85rem' }}>
              <Filter size={15} />
              <span>Filtering by report verification state</span>
            </div>
          </div>

          {/* Status Filter Bar */}
          <div className="filter-bar" role="toolbar" aria-label="Filter reports by status">
            {filterOptions.map((opt) => {
              const isActive = statusFilter === opt.key;
              const count = opt.key === 'all'
                ? reports.length
                : reports.filter((r) => r.status === opt.key).length;

              return (
                <button
                  key={opt.key}
                  type="button"
                  className={`filter-btn ${isActive ? 'filter-btn--active' : ''}`}
                  onClick={() => setStatusFilter(opt.key)}
                >
                  <span>{opt.label}</span>
                  <span
                    style={{
                      marginLeft: '6px',
                      fontSize: '0.74rem',
                      opacity: isActive ? 0.9 : 0.7,
                      fontWeight: 600,
                    }}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Report Grid or Empty State */}
          {filteredReports.length === 0 ? (
            <div className="empty-state">
              <AlertTriangle size={36} className="empty-state__icon" />
              <p>No reports match the selected filter.</p>
            </div>
          ) : (
            <div className="report-grid">
              {filteredReports.map((report) => {
                const categoryClass = `category-badge--${report.category}`;
                const categoryLabel = HAZARD_CATEGORY_LABELS[report.category] || report.category;
                const statusLabel = REPORT_STATUS_LABELS[report.status] || report.status;

                return (
                  <article key={report.id} className="report-card">
                    <div className="report-card__header">
                      <div className="report-card__badges">
                        <span className={`category-badge ${categoryClass}`}>
                          {categoryLabel}
                        </span>
                        {report.isSynthetic && (
                          <span className="synthetic-badge">
                            Demo Data
                          </span>
                        )}
                      </div>

                      <span className={`status-badge status-badge--${report.status}`}>
                        {getStatusIcon(report.status)}
                        <span>{statusLabel}</span>
                      </span>
                    </div>

                    <p className="report-card__description">
                      {report.description}
                    </p>

                    {report.photoUrl && (
                      <div style={{ marginBottom: '12px' }}>
                        <img
                          src={report.photoUrl}
                          alt="Report attachment"
                          style={{
                            maxWidth: '100%',
                            maxHeight: '160px',
                            objectFit: 'cover',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-light)',
                          }}
                        />
                      </div>
                    )}

                    <div className="report-card__meta">
                      <span className="report-card__meta-item">
                        <MapPin size={14} />
                        <span>{report.location.name}</span>
                      </span>
                      <span className="report-card__meta-item">
                        <Calendar size={14} />
                        <span>{report.date}</span>
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
