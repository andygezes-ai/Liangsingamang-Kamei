import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div className="footer__brand-col">
            <div className="footer__brand">
              <Shield size={20} />
              <span>WayGuard</span>
            </div>
            <p className="footer__tagline">Navigate with awareness.</p>
            <p className="footer__disclaimer">
              WayGuard is a prototype developed for demonstration purposes.
              It does not guarantee safety and uses synthetic data.
            </p>
          </div>

          <div className="footer__links-col">
            <h4>Product</h4>
            <Link to="/app">Route Planner</Link>
            <Link to="/reports">Community Reports</Link>
            <Link to="/methodology">Methodology</Link>
          </div>

          <div className="footer__links-col">
            <h4>Transparency</h4>
            <Link to="/methodology">How Indicators Work</Link>
            <Link to="/methodology#limitations">Data Limitations</Link>
            <Link to="/methodology#data-sources">Data Sources</Link>
          </div>

          <div className="footer__links-col">
            <h4>Community</h4>
            <Link to="/reports">Submit a Report</Link>
            <Link to="/reports">View Reports</Link>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; 2026 WayGuard — Prototype. Not for production use.</p>
          <p className="footer__notice">
            WayGuard supports informed route decisions using available environmental and community information.
            It cannot guarantee personal safety.
          </p>
        </div>
      </div>
    </footer>
  );
}
