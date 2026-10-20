import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import RoutePlannerPage from './pages/RoutePlannerPage';
import ReportsPage from './pages/ReportsPage';
import MethodologyPage from './pages/MethodologyPage';

export default function App() {
  const location = useLocation();
  const isApp = location.pathname === '/app';

  return (
    <div className="app">
      {!isApp && <Navbar />}
      <main className={isApp ? 'main--full' : 'main'}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<RoutePlannerPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </main>
      {!isApp && <Footer />}
    </div>
  );
}
