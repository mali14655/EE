import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';

export default function ScrollRevealEffects() {
  const location = useLocation();
  const lastYRef = useRef(0);
  const scrollingDownRef = useRef(true);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    lastYRef.current = window.scrollY;
    const handleDirection = () => {
      const y = window.scrollY;
      scrollingDownRef.current = y >= lastYRef.current;
      lastYRef.current = y;
    };
    window.addEventListener('scroll', handleDirection, { passive: true });

    document.documentElement.classList.add('route-enter-anim');
    const routeAnimTimer = window.setTimeout(() => {
      document.documentElement.classList.remove('route-enter-anim');
    }, 650);

    const targets = Array.from(
      document.querySelectorAll(
        '.hero-copy, .innovation-header, .solution-card, .process-step-card, .team-card, .card, .contact-copy, .contact-form, .stats-grid > div',
      ),
    );
    if (!targets.length) return;

    const groupCounters = new Map();
    const getGroupKey = (el) => {
      const section = el.closest('section');
      if (!section) return 'default';
      if (section.id === 'about' || section.id === 'services') return 'services';
      if (section.id === 'team') return 'team';
      if (section.id === 'process') return 'process';
      if (section.id === 'why-choose-us') return 'why';
      if (section.querySelector('.testimonial-card')) return 'testimonials';
      return 'default';
    };

    const getDelay = (group, step) => {
      if (group === 'services') return Math.min(step * 45, 250);
      if (group === 'testimonials') return Math.min(step * 60, 260);
      if (group === 'team') return Math.min(step * 45, 250);
      if (group === 'process') return Math.min(step * 36, 220);
      return Math.min(step * 35, 220);
    };

    targets.forEach((el) => {
      const group = getGroupKey(el);
      const step = groupCounters.get(group) ?? 0;
      groupCounters.set(group, step + 1);
      el.classList.add('reveal-init');
      const delay = `${getDelay(group, step)}ms`;
      el.dataset.revealDelay = delay;
      el.style.transitionDelay = delay;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (scrollingDownRef.current) {
              entry.target.classList.remove('reveal-no-anim');
              entry.target.style.transitionDelay = entry.target.dataset.revealDelay || '0ms';
              // Re-add in next frame so downward re-entry always animates.
              entry.target.classList.remove('reveal-in');
              window.requestAnimationFrame(() => {
                entry.target.classList.add('reveal-in');
              });
            } else {
              // Upward scroll: always show instantly, without delayed reveal.
              entry.target.classList.remove('reveal-no-anim');
              entry.target.classList.add('reveal-no-anim');
              entry.target.style.transitionDelay = '0ms';
              entry.target.classList.add('reveal-in');
            }
          } else {
            entry.target.classList.remove('reveal-in');
            entry.target.classList.remove('reveal-no-anim');
            entry.target.style.transitionDelay = entry.target.dataset.revealDelay || '0ms';
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
    );

    const rafId = window.requestAnimationFrame(() => {
      targets.forEach((el) => observer.observe(el));
    });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleDirection);
      window.clearTimeout(routeAnimTimer);
      document.documentElement.classList.remove('route-enter-anim');
      targets.forEach((el) => {
        el.classList.remove('reveal-init');
        el.classList.remove('reveal-in');
        el.classList.remove('reveal-no-anim');
        delete el.dataset.revealDelay;
        el.style.transitionDelay = '';
      });
    };
  }, [location.pathname]);

  return null;
}
