import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { NotFound } from './components/ui/not-found-2';
import './styles.css';

// Initialize theme immediately to prevent flash
(function initTheme() {
  if (typeof window === 'undefined') return;
  const stored = window.localStorage.getItem('ee-theme');
  const root = document.documentElement;
  
  // Default to light mode if no stored preference
  if (stored === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
})();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

