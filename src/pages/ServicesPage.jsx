import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FloatingTopButton from '../components/layout/FloatingTopButton';

const SERVICES = [
  {
    title: 'Web Development',
    tag: 'Modern websites',
    body: 'Modern websites with clean design, fast load times, and secure foundations.',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    imageFocusDesktop: '70% center',
    imageFocusMobile: '62% center',
  },
  {
    title: 'Mobile Development',
    tag: 'Mobile apps',
    body: 'Android and iOS apps designed for smooth user experience and long-term maintenance.',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    imageFocusDesktop: '72% center',
    imageFocusMobile: '58% center',
  },
  {
    title: 'UI/UX Design',
    tag: 'Simple design',
    body: 'Clear user journeys and practical interfaces that make products intuitive from day one.',
    image:
      'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1200&q=80',
    imageFocusDesktop: '76% center',
    imageFocusMobile: '55% center',
  },
  {
    title: 'Digital Marketing',
    tag: 'Better reach',
    body: 'Data-led campaigns focused on visibility, quality traffic, and measurable growth.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    imageFocusDesktop: '68% center',
    imageFocusMobile: '52% center',
  },
  {
    title: 'SaaS Solutions',
    tag: 'SaaS products',
    body: 'Scalable SaaS platforms with secure architecture, subscriptions, and reliable performance.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    imageFocusDesktop: '70% center',
    imageFocusMobile: '56% center',
  },
  {
    title: 'Consulting & Support',
    tag: 'Team support',
    body: 'Technical guidance, issue resolution, and dependable support for continuous improvement.',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    imageFocusDesktop: '74% center',
    imageFocusMobile: '60% center',
  },
];

export default function ServicesPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="page">
        <main>
          <section id="services" className="section tinted innovation">
            <div className="container innovation-inner">
              <div className="innovation-header">
                <p className="eyebrow">Our Services</p>
                <h2>Solutions designed for growth and reliability.</h2>
                <p className="innovation-lead">
                  We provide full-cycle digital services from design to engineering and ongoing
                  support.
                </p>
              </div>
              <div className="solutions-grid">
                {SERVICES.map((item) => (
                  <article key={item.title} className="card gradient-card solution-card">
                    <div className="solution-orbit">
                      <span className="solution-icon" aria-hidden="true" />
                    </div>
                    <div className="solution-shell">
                      <div className="solution-content">
                        <p className="solution-tag">{item.tag}</p>
                        <h3>{item.title}</h3>
                        <p className="solution-body">{item.body}</p>
                        <button
                          type="button"
                          className="solution-link"
                          onClick={() => navigate('/contact')}
                        >
                          <span>Learn more</span>
                          <span className="solution-link-arrow" aria-hidden="true">
                            ↗
                          </span>
                        </button>
                      </div>
                      <div
                        className="solution-media"
                        aria-hidden="true"
                        style={{
                          '--solution-focus-desktop': item.imageFocusDesktop,
                          '--solution-focus-mobile': item.imageFocusMobile,
                        }}
                      >
                        <img src={item.image} alt="" className="solution-media-img" loading="lazy" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
      <FloatingTopButton />
    </>
  );
}
