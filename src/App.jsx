import React, { useState, useEffect } from 'react';
import logoImg from './images/logo.jpeg';
import { ThemeToggle } from './components/ui/theme-toggle';
import { MenuToggle } from './components/ui/menu-toggle';
import BouncingCirclesLoader from './components/ui/bouncing-circles-loader';
import RadialOrbitalTimeline from './components/ui/radial-orbital-timeline';
import { Search, FileText, Palette, Code, Rocket, Wrench, TrendingUp } from 'lucide-react';

const NAV_ITEMS = ['Home', 'About', 'Process', 'Contact'];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function App() {
  const [showLoaderDemo, setShowLoaderDemo] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header onShowLoader={() => setShowLoaderDemo(true)} />
      {(showLoaderDemo || isInitialLoad) && (
        <div
          className="loader-overlay"
          onClick={() => {
            if (showLoaderDemo) setShowLoaderDemo(false);
          }}
        >
          <div className="loader-content" onClick={(e) => e.stopPropagation()}>
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
            {showLoaderDemo && (
              <button
                className="loader-close"
                onClick={() => setShowLoaderDemo(false)}
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
      <div className="page">
        <main>
          <Hero />
          <About />
          <Process />
          <Stats />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

function Header({ onShowLoader }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 900 : false,
  );
  const [isDark, setIsDark] = useState(
    typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : false,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Listen for theme changes from ThemeToggle
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleThemeChange = (event) => {
      const detail = event.detail;
      if (detail && typeof detail.isDark === 'boolean') {
        setIsDark(detail.isDark);
      }
    };
    window.addEventListener('ee-theme-change', handleThemeChange);
    return () => window.removeEventListener('ee-theme-change', handleThemeChange);
  }, []);

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
        <div className="logo" onClick={() => scrollToId('home')}>
          <img
            src={logoImg}
            alt="Emerging Edge logo "
            className="logo-img"
            style={{ borderRadius: '50%' }}
          />
          <span className="logo-text">
            <span className="logo-text-emerging">Emerging</span>{' '}
            <span className="logo-text-edge">Edge</span>
          </span>
        </div>
        <nav
          className={`nav ${open ? 'nav-open' : ''}`}
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
              key={item}
              className="nav-link"
              onClick={() => {
                scrollToId(item.toLowerCase());
                setOpen(false);
              }}
            >
              {item}
            </button>
          ))}
          {/* Mobile-only theme toggle inside menu */}
          <div className="nav-mobile-toggle">
            <ThemeToggle />
          </div>
        </nav>
        <div className="header-actions">
          {/* Desktop-only theme toggle */}
          <div className="header-toggle header-toggle-desktop">
            <ThemeToggle />
          </div>
        </div>
        <MenuToggle isOpen={open} onClick={() => setOpen((v) => !v)} />
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="section hero">
      <div className="hero-bg hero-bg-1" />
      <div className="hero-bg hero-bg-2" />
      <div className="hero-overlay" />
      <div className="hero-anim hero-anim-1" />
      <div className="hero-anim hero-anim-2" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Emerging Edge</p>
          <h1>Engineering the Future. Empowering Innovation.</h1>
          <p className="lead">
            Emerging Edge delivers scalable digital ecosystems, intelligent automation, and enterprise-grade technology
            solutions.
          </p>
          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => {
                scrollToId('contact');
              }}
            >
              Start Your Project
            </button>
          </div>
          <p className="trust-text">Trusted by startups, scale-ups, and global enterprises.</p>
        </div>
      </div>
    </section>
  );
}

function About() {
  const solutions = [
    {
      title: 'Web Development',
      tag: 'Experience-led platforms',
      body: 'Design and build resilient web platforms that stay fast, secure, and reliable as your customer base scales.',
    },
    {
      title: 'Mobile Development',
      tag: 'Always-on experiences',
      body: 'Launch mobile apps that feel native, sync in real time, and plug seamlessly into your existing ecosystem.',
    },
    {
      title: 'UI/UX Design',
      tag: 'Human-centered journeys',
      body: 'Turn complex workflows into intuitive journeys with research-backed UX and distinctive visual systems.',
    },
    {
      title: 'Digital Marketing',
      tag: 'Growth with signal',
      body: 'Connect your product, content, and data to create campaigns that are measurable, optimised, and repeatable.',
    },
    {
      title: 'SaaS Solutions',
      tag: 'Products with a roadmap',
      body: 'Ship subscription-ready platforms with the security, billing, and observability you need to grow with confidence.',
    },
    {
      title: 'Consulting & Support',
      tag: 'Experts in your corner',
      body: 'Partner with architects and engineers who can own delivery, upskill your team, and keep systems healthy.',
    },
  ];

  return (
    <section id="about" className="section tinted innovation">
      <div className="container innovation-inner">
        <div className="innovation-header">
          <p className="eyebrow">Innovative solutions from experts</p>
          <h2>One unified platform for building what&apos;s next.</h2>
          <p className="innovation-lead">
            We bring product strategy, engineering, and data together so your team can move from idea to impact without
            adding complexity.
          </p>
        </div>
        <div className="solutions-grid">
          {solutions.map((item) => (
            <article key={item.title} className="card gradient-card solution-card">
              <div className="solution-orbit">
                <span className="solution-icon" aria-hidden="true" />
              </div>
              <div className="solution-content">
                <p className="solution-tag">{item.tag}</p>
                <h3>{item.title}</h3>
                <p className="solution-body">{item.body}</p>
                <button
                  type="button"
                  className="solution-link"
                  onClick={() => scrollToId('contact')}
                >
                  <span>Service details</span>
                  <span className="solution-link-arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const timelineData = [
    {
      id: 1,
      title: 'Discovery & Consultation',
      date: 'Step 1',
      content: 'We start by understanding your business, goals, and challenges. Requirement gathering, market understanding, and defining project scope. We listen first. Then we plan.',
      category: 'Discovery',
      icon: Search,
      relatedIds: [2],
      status: 'completed',
      energy: 100,
    },
    {
      id: 2,
      title: 'Strategy & Planning',
      date: 'Step 2',
      content: 'We create a clear roadmap before writing a single line of code. Technical architecture planning, UI/UX wireframing, and timeline & milestone definition. Clear plan. No confusion.',
      category: 'Planning',
      icon: FileText,
      relatedIds: [1, 3],
      status: 'completed',
      energy: 95,
    },
    {
      id: 3,
      title: 'Design & Prototyping',
      date: 'Step 3',
      content: 'We design modern, user-focused interfaces. Responsive layouts, brand-aligned visuals, and interactive prototypes. You see the vision before development begins.',
      category: 'Design',
      icon: Palette,
      relatedIds: [2, 4],
      status: 'completed',
      energy: 90,
    },
    {
      id: 4,
      title: 'Development',
      date: 'Step 4',
      content: 'Our team builds your solution using modern technologies. Clean, scalable code, secure backend systems, and performance optimization. Built for speed, security, and growth.',
      category: 'Development',
      icon: Code,
      relatedIds: [3, 5],
      status: 'in-progress',
      energy: 75,
    },
    {
      id: 5,
      title: 'Testing & Quality Assurance',
      date: 'Step 5',
      content: 'We thoroughly test everything before launch. Bug fixing, cross-device testing, and performance checks. We deliver polished, reliable systems.',
      category: 'Testing',
      icon: Wrench,
      relatedIds: [4, 6],
      status: 'pending',
      energy: 50,
    },
    {
      id: 6,
      title: 'Deployment & Launch',
      date: 'Step 6',
      content: 'We deploy your project smoothly and securely. Server configuration, domain setup, and live monitoring. Zero-stress launch process.',
      category: 'Launch',
      icon: Rocket,
      relatedIds: [5, 7],
      status: 'pending',
      energy: 30,
    },
    {
      id: 7,
      title: 'Ongoing Support & Growth',
      date: 'Step 7',
      content: 'Our partnership doesn\'t end at launch. Maintenance & updates, feature enhancements, and technical support. We grow with your business.',
      category: 'Support',
      icon: TrendingUp,
      relatedIds: [6],
      status: 'pending',
      energy: 20,
    },
  ];

  return (
    <section id="process" className="section">
      <div className="container">
        <p className="eyebrow">How We Work</p>
        <h2>Structured delivery, flexible execution.</h2>
        <RadialOrbitalTimeline timelineData={timelineData} />
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="section tinted">
      <div className="container stats-grid">
        <div>
          <p className="eyebrow">Our Impact</p>
          <h2>Key metrics that matter.</h2>
        </div>
        <div className="stats-cards">
          <div className="stat">
            <span className="stat-number">0</span>
            <span className="stat-label">Projects Delivered</span>
          </div>
          <div className="stat">
            <span className="stat-number">0</span>
            <span className="stat-label">Global Clients</span>
          </div>
          <div className="stat">
            <span className="stat-number">0</span>
            <span className="stat-label">Client Satisfaction %</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      quote: 'Exceptional delivery and professionalism.',
      name: 'CEO, Tech Firm',
    },
    {
      quote: 'They transformed our digital infrastructure.',
      name: 'Startup Founder',
    },
    {
      quote: 'Highly strategic and technically strong.',
      name: 'Enterprise Client',
    },
  ];
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">What Clients Say</p>
        <h2>Partners, not just vendors.</h2>
        <div className="cards-3">
          {items.map((t) => (
            <div className="card subtle-card" key={t.name}>
              <p className="quote">“{t.quote}”</p>
              <p className="quote-name">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      setStatus({ type: 'success', message: data.message });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="section tinted">
      <div className="container two-col contact">
        <div>
          <p className="eyebrow">Let&apos;s Build Together</p>
          <h2>Let&apos;s Build Together</h2>
          <p>
            Tell us about your project, your vision, or your challenges. Our team will respond within 24 hours.
          </p>
        </div>
        <form className="card contact-form" onSubmit={handleSubmit}>
          <label>
            Your Name
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder="Jane Doe"
              disabled={loading}
            />
          </label>
          <label>
            Your Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              placeholder="you@company.com"
              disabled={loading}
            />
          </label>
          <label>
            Your Message
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              placeholder="Tell us about your product, timeline, and goals..."
              disabled={loading}
            />
          </label>
          <button className="btn-primary full-width" type="submit" disabled={loading}>
            {loading ? (
              <span className="button-loading">
                <BouncingCirclesLoader size={20} circleSize={4} circleCount={6} speed={0.8} />
                <span>Sending...</span>
              </span>
            ) : (
              'Send Message'
            )}
          </button>
          {status.message && (
            <p className={`status ${status.type === 'error' ? 'status-error' : 'status-success'}`}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <h3>Emerging Edge</h3>
          <p>Shaping tomorrow&apos;s digital world.</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Quick Links</h4>
            <button className="link" onClick={() => scrollToId('home')}>
              Home
            </button>
            <button className="link" onClick={() => scrollToId('services')}>
              Services
            </button>
            <button className="link" onClick={() => scrollToId('contact')}>
              Contact
            </button>
          </div>
          <div>
            <h4>Follow</h4>
            <a className="link" href="#" onClick={(e) => e.preventDefault()}>
              LinkedIn
            </a>
            <a className="link" href="#" onClick={(e) => e.preventDefault()}>
              Facebook
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Emerging Edge. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default App;

