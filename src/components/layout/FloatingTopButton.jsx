import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { smoothScrollToY } from '../../utils/scroll';

export default function FloatingTopButton() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 360);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showBackToTop) return null;

  return (
    <button
      className="floating-top-btn"
      onClick={() => smoothScrollToY(0, 1100)}
      aria-label="Back to top"
    >
      <ArrowUp size={16} />
    </button>
  );
}
