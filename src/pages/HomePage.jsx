import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FloatingTopButton from '../components/layout/FloatingTopButton';
import { scrollToId } from '../utils/scroll';
import { Hero, About, WhyChooseUs, Process, Testimonials, Team } from '../components/sections/HomeSections';

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showBottomTechBg, setShowBottomTechBg] = useState(false);

  useEffect(() => {
    const section = new URLSearchParams(location.search).get('section');
    if (!section) return;
    requestAnimationFrame(() => {
      setTimeout(() => scrollToId(section), 50);
    });
    navigate('/', { replace: true });
  }, [location.search, navigate]);

  useEffect(() => {
    const handleBottomBgVisibility = () => {
      const zone = document.getElementById('bottom-tech-zone');
      const footer = document.querySelector('footer');
      if (!zone || !footer) return;
      const shouldShow = window.scrollY + 120 >= zone.offsetTop && window.scrollY + 120 < footer.offsetTop;
      setShowBottomTechBg(shouldShow);
    };
    window.addEventListener('scroll', handleBottomBgVisibility, { passive: true });
    window.addEventListener('resize', handleBottomBgVisibility);
    handleBottomBgVisibility();
    return () => {
      window.removeEventListener('scroll', handleBottomBgVisibility);
      window.removeEventListener('resize', handleBottomBgVisibility);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="page">
        <main>
          <Hero onContactClick={() => navigate('/contact')} />
          <About onContactClick={() => navigate('/contact')} />
          <Process />
          <WhyChooseUs />
          <div id="bottom-tech-zone" className="bottom-tech-zone">
            <Testimonials />
            <Team limit={6} showExplore onExploreClick={() => navigate('/team')} />
          </div>
        </main>
        <Footer />
      </div>
      <div className={`bottom-tech-fixed-bg ${showBottomTechBg ? 'bottom-tech-fixed-bg-visible' : ''}`} aria-hidden="true" />
      <FloatingTopButton />
    </>
  );
}
