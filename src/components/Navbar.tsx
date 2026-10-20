import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <nav className={`navbar ${!isHome ? 'navbar--solid' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <Shield size={24} strokeWidth={2.2} />
          <span className="navbar__wordmark">WayGuard</span>
        </Link>

        <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          <a href="/#features" className="navbar__link" onClick={() => setMobileOpen(false)}>Product</a>
          <a href="/#how-it-works" className="navbar__link" onClick={() => setMobileOpen(false)}>How It Works</a>
          <Link to="/methodology" className="navbar__link" onClick={() => setMobileOpen(false)}>Transparency</Link>
          <Link to="/reports" className="navbar__link" onClick={() => setMobileOpen(false)}>Community</Link>
          <Link to="/app" className="btn-primary btn-sm" onClick={() => setMobileOpen(false)}>Plan a Route</Link>
        </div>

        <button
          className="navbar__mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
