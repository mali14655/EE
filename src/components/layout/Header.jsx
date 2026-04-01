import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../../images/logo.jpeg';
import { ThemeToggle } from '../ui/theme-toggle';
import { MenuToggle } from '../ui/menu-toggle';
import { scrollToId } from '../../utils/scroll';
import { useRef } from 'react';

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'Services', route: '/services' },
  { label: 'Team', route: '/team' },
  { label: 'Contact', route: '/contact' },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);
  const navItemRefs = useRef({});
  const prevActiveIndexRef = useRef(-1);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 900 : false,
  );
  const [isDark, setIsDark] = useState(
    typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : false,
  );
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const [snakeWrap, setSnakeWrap] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
      if (window.innerWidth > 900) setOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleThemeChange = (event) => {
      const detail = event.detail;
      if (detail && typeof detail.isDark === 'boolean') {
        setIsDark(detail.isDark);
      }
    };
    window.addEventListener('ee-theme-change', handleThemeChange);
    return () => window.removeEventListener('ee-theme-change', handleThemeChange);
  }, []);

  const isHome = location.pathname === '/';

  const isNavItemActive = (item) => {
    if (item.route) return location.pathname === item.route;
    if (item.id === 'home' || item.id === 'about') return location.pathname === '/';
    return false;
  };

  const getActiveIndex = () => NAV_ITEMS.findIndex((item) => isNavItemActive(item));

  const goToSection = (id) => {
    if (isHome) {
      scrollToId(id);
    } else {
      navigate(`/?section=${id}`);
    }
    setOpen(false);
  };

  useEffect(() => {
    const activeIndex = getActiveIndex();
    const prevIndex = prevActiveIndexRef.current;
    const isWrapFromLastToFirst =
      prevIndex === NAV_ITEMS.length - 1 && activeIndex === 0 && !isMobile;

    if (isWrapFromLastToFirst) {
      setSnakeWrap(true);
      window.setTimeout(() => setSnakeWrap(false), 520);
    }

    const activeItem = NAV_ITEMS.find((item) => isNavItemActive(item));
    if (!activeItem || !navRef.current) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }
    const btn = navItemRefs.current[activeItem.label];
    const navRect = navRef.current.getBoundingClientRect();
    const btnRect = btn?.getBoundingClientRect();
    if (!btnRect) return;
    setIndicator({
      left: btnRect.left - navRect.left + 8,
      width: Math.max(btnRect.width - 16, 24),
      visible: true,
    });
    prevActiveIndexRef.current = activeIndex;
  }, [location.pathname, open, isMobile]);

  return (
    <header className="header" style={{ width: '100%' }}>
      <div
        className="header-inner"
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: isMobile ? '0.85rem 0.85rem' : '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
      >
        <div className="logo" onClick={() => goToSection('home')}>
          <img
            src={logoImg}
            alt="Emerging Edge logo"
            className="logo-img"
            style={{ borderRadius: '50%' }}
          />
          <span className="logo-text">
            <span className="logo-text-emerging">Emerging</span>{' '}
            <span className="logo-text-edge">Edge</span>
          </span>
        </div>
        <nav
          ref={navRef}
          className={`nav ${open ? 'nav-open' : ''} ${snakeWrap ? 'nav-wrap-snake-active' : ''}`}
          style={
            isMobile && open
              ? {
                  background: isDark ? '#020617' : '#ffffff',
                }
              : undefined
          }
        >
          {NAV_ITEMS.map((item) => (
            <button
              ref={(el) => {
                navItemRefs.current[item.label] = el;
              }}
              key={item.label}
              className={`nav-link ${isNavItemActive(item) ? 'nav-link-active' : ''}`}
              onClick={() => {
                if (item.route) {
                  navigate(item.route);
                  setOpen(false);
                } else if (item.id) {
                  goToSection(item.id);
                }
              }}
            >
              {item.label}
            </button>
          ))}
          <span
            className={`nav-active-indicator ${indicator.visible ? 'nav-active-indicator-visible' : ''}`}
            style={{ width: `${indicator.width}px`, transform: `translateX(${indicator.left}px)` }}
            aria-hidden="true"
          />
          <div className="nav-mobile-toggle">
            <ThemeToggle />
          </div>
        </nav>
        <div className="header-actions">
          <button className="header-connect-btn" onClick={() => navigate('/contact')}>
            Let&apos;s Connect
          </button>
          <div className="header-toggle header-toggle-desktop">
            <ThemeToggle />
          </div>
        </div>
        <MenuToggle isOpen={open} onClick={() => setOpen((v) => !v)} />
      </div>
    </header>
  );
}
