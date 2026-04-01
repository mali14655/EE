import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import ServicesPage from './pages/ServicesPage';
import ScrollToTop from './components/layout/ScrollToTop';
import GlobalRouteLoader from './components/layout/GlobalRouteLoader';
import ScrollRevealEffects from './components/layout/ScrollRevealEffects';
import { NotFound } from './components/ui/not-found-2';
import './styles.css';

// Initialize theme immediately to prevent flash
(function initTheme() {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;

  // Always start in light mode on first paint.
  root.classList.remove('dark');
  window.localStorage.setItem('ee-theme', 'light');
})();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <GlobalRouteLoader />
      <ScrollRevealEffects />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

