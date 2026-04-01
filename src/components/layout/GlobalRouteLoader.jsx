import React, { useEffect, useRef, useState } from 'react';
import BouncingCirclesLoader from '../ui/bouncing-circles-loader';

export default function GlobalRouteLoader() {
  const first = useRef(true);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!first.current) return;
    const duration = 900;
    const timer = setTimeout(() => {
      setShow(false);
      first.current = false;
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <BouncingCirclesLoader size={120} circleSize={24} circleCount={12} />
        <div className="loader-brand">
          {'Emerging'.split('').map((ch, index) => (
            <span
              key={`em-${index}`}
              className="loader-brand-emerging"
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              {ch}
            </span>
          ))}
          <span style={{ width: '0.35em' }} />
          {'Edge'.split('').map((ch, index) => (
            <span
              key={`ed-${index}`}
              className="loader-brand-edge"
              style={{ animationDelay: `${(index + 8) * 0.07}s` }}
            >
              {ch}
            </span>
          ))}
        </div>
        <p className="loader-text">Loading...</p>
      </div>
    </div>
  );
}
