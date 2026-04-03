import React from 'react';
// Team member images
import tatheerImg from '../../images/tatheer-D3U24Aas.jpeg';
import shaheenImg from '../../images/shaheen-X734SHnd.jpeg';
import muhammadAliImg from '../../images/Ali.png';
import farasImg from '../../images/faras-DMTD_SZo.png';
import haneefImg from '../../images/haneef-LMxFmg0z.jpeg';
import {
  Search,
  FileText,
  Palette,
  Code,
  Rocket,
  Wrench,
  TrendingUp,
  Building2,
  BriefcaseBusiness,
  Share2,
  Linkedin,
  Github,
} from 'lucide-react';

export function Hero({ onContactClick }) {
  return (
    <section id="home" className="section hero">
      <div className="hero-bg hero-bg-1" />
      <div className="hero-bg hero-bg-2" />
      <div className="hero-overlay" />
      <div className="hero-anim hero-anim-1" />
      <div className="hero-anim hero-anim-2" />
      <div className="container hero-grid">
        <div className="hero-copy hero-copy-enter">
          <p className="eyebrow">Emerging Edge</p>
          <h1>Software, apps, and digital products built to perform.</h1>
          <p className="lead">
            Emerging Edge delivers websites, apps, and digital products that are easy to use and
            ready to scale.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={onContactClick}>
              Let&apos;s Talk
            </button>
          </div>
          <p className="trust-text">Chosen by startups, SMBs, and enterprise teams.</p>
        </div>
      </div>
    </section>
  );
}

export function About({ onContactClick }) {
  const solutions = [
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

  return (
    <section id="about" className="section tinted innovation">
      <div className="container innovation-inner">
        <div className="innovation-header">
          <p className="eyebrow">What we do</p>
          <h2>End-to-end digital services for modern businesses.</h2>
          <p className="innovation-lead">
            Strategy, design, development, and support delivered under one team.
          </p>
        </div>
        <div className="solutions-grid">
          {solutions.map((item) => (
            <article key={item.title} className="card gradient-card solution-card">
              <div className="solution-orbit">
                <span className="solution-icon" aria-hidden="true" />
              </div>
              <div className="solution-shell">
                <div className="solution-content">
                  <p className="solution-tag">{item.tag}</p>
                  <h3>{item.title}</h3>
                  <p className="solution-body">{item.body}</p>
                  <button type="button" className="solution-link" onClick={onContactClick}>
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
  );
}

export function WhyChooseUs() {
  const reasons = [
    {
      title: 'Business-first execution',
      body: 'Every decision is aligned to your business goals, timelines, and measurable outcomes.',
      icon: BriefcaseBusiness,
    },
    {
      title: 'Dedicated delivery team',
      body: 'You work with one accountable team across planning, design, development, and support.',
      icon: Building2,
    },
    {
      title: 'Transparent communication',
      body: 'Weekly updates, clear milestones, and direct collaboration keep every project on track.',
      icon: Share2,
    },
  ];

  return (
    <section id="why-choose-us" className="section tinted innovation">
      <div className="container innovation-inner">
        <div className="innovation-header">
          <p className="eyebrow">Why Choose Emerging Edge</p>
          <h2>Why growing teams choose Emerging Edge.</h2>
          <p className="innovation-lead">
            We combine strategy, design, and engineering to deliver reliable digital products with
            measurable business impact.
          </p>
        </div>
        <div className="cards-3 why-choose-grid">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="card subtle-card why-choose-card">
                <span className="why-choose-icon" aria-hidden="true">
                  <Icon size={18} />
                </span>
                <h3>{item.title}</h3>
                <p className="solution-body">{item.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const processSteps = [
    { id: 1, title: 'Discovery & Consultation', date: 'Step 1', content: 'Project goals, users, and business needs are mapped before any execution begins.', category: 'Discovery', icon: Search },
    { id: 2, title: 'Strategy & Planning', date: 'Step 2', content: 'A practical roadmap is prepared with timelines, priorities, and technical direction.', category: 'Planning', icon: FileText },
    { id: 3, title: 'Design & Prototyping', date: 'Step 3', content: 'User-first interfaces and clickable prototypes are finalized before development.', category: 'Design', icon: Palette },
    { id: 4, title: 'Development', date: 'Step 4', content: 'Development focuses on clean code, secure systems, and scalable architecture.', category: 'Development', icon: Code },
    { id: 5, title: 'Testing & Quality Assurance', date: 'Step 5', content: 'Quality checks cover devices, browsers, bug fixes, and performance tuning.', category: 'Testing', icon: Wrench },
    { id: 6, title: 'Deployment & Launch', date: 'Step 6', content: 'Deployment is managed with production checks for a stable, low-risk launch.', category: 'Launch', icon: Rocket },
    { id: 7, title: 'Ongoing Support & Growth', date: 'Step 7', content: 'Post-launch support includes updates, enhancements, and growth-focused maintenance.', category: 'Support', icon: TrendingUp },
  ];

  return (
    <section id="process" className="section tinted innovation">
      <div className="container innovation-inner">
        <div className="innovation-header">
          <p className="eyebrow">How we work</p>
          <h2>Our delivery process</h2>
          <p className="innovation-lead">
            A clear seven-step workflow designed for quality delivery and smooth communication.
          </p>
        </div>
        <div className="solutions-grid">
          {processSteps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.id} className="card gradient-card process-step-card">
                <div className="process-step-content">
                  <div className="process-step-head">
                    <span className="process-step-icon">
                      <Icon size={18} />
                    </span>
                    <p className="solution-tag" style={{ margin: 0 }}>
                      {step.date}
                    </p>
                  </div>
                  <p className="process-step-meta">{step.category}</p>
                  <h3>{step.title}</h3>
                  <p className="solution-body">{step.content}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="section tinted">
      <div className="container stats-grid">
        <div>
          <p className="eyebrow">Our impact</p>
          <h2>Outcomes delivered across products and teams.</h2>
          <p className="innovation-lead">
            We focus on measurable business outcomes, not just code delivery. Every engagement is
            designed to improve speed, quality, and user experience.
          </p>
        </div>
        <div className="stats-cards">
          <div className="stat">
            <span className="stat-number">120+</span>
            <span className="stat-label">Projects Delivered</span>
          </div>
          <div className="stat">
            <span className="stat-number">40+</span>
            <span className="stat-label">Clients Supported</span>
          </div>
          <div className="stat">
            <span className="stat-number">98%</span>
            <span className="stat-label">Client Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const items = [
    {
      quote:
        'Emerging Edge translated our requirements into a stable product roadmap and delivered every milestone with clear communication.',
      name: 'Amit Verma',
      role: 'CEO',
      company: 'Fintech Startup',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    },
    {
      quote:
        'Performance, UX, and conversion quality improved noticeably after launch. Their team remained proactive, transparent, and dependable.',
      name: 'Sara Khan',
      role: 'Founder',
      company: 'D2C Brand',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    },
    {
      quote:
        'Strong engineering execution backed by practical business insight. Post-launch support was timely and highly reliable.',
      name: 'Rahul Mehta',
      role: 'Product Head',
      company: 'Enterprise Client',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
  ];
  return (
    <section className="section tinted innovation">
      <div className="container innovation-inner">
        <div className="innovation-header">
          <p className="eyebrow">Client feedback</p>
          <h2>Trusted by teams that value quality delivery.</h2>
          <p className="innovation-lead">
            Long-term partnerships built on communication, accountability, and measurable outcomes.
          </p>
        </div>
        <div className="cards-3">
          {items.map((t) => (
            <article className="card subtle-card testimonial-card" key={t.name}>
              <div className="testimonial-header">
                <span className="testimonial-avatar" aria-hidden="true">
                  <img src={t.image} alt={t.name} className="testimonial-avatar-img" loading="lazy" />
                </span>
                <div className="testimonial-meta">
                  <p className="quote-name">{t.name}</p>
                  <p className="quote-role">{t.role}</p>
                </div>
              </div>
              <p className="quote">“{t.quote}”</p>
              <p className="testimonial-company">{t.company}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Team({ limit, showExplore = false, onExploreClick }) {
  const members = [
    {
      name: 'Shaheen Shah',
      role: 'Chief Executive Officer (CEO)',
      bio: 'Leading product direction, operations, and growth across teams.',
      image: shaheenImg,
      imagePosition: 'center 15%',
      // Social links intentionally hidden for now.
      linkedin: null,
      github: null,
    },
    {
      name: 'Syed Tatheer Hussain',
      role: 'Business Partner',
      bio: 'Guiding strategy, partnerships, and long-term delivery alignment.',
      image: tatheerImg,
      imagePosition: 'center 15%',
      linkedin: 'https://www.linkedin.com/in/tatheer-hussain/',
      github: 'https://github.com/00tatheer00',
    },
    {
      name: 'Muhammad Ali',
      role: 'MERN Stack Developer',
      bio: 'Building full-stack MERN features with reliable APIs and clean UI.',
      image: muhammadAliImg,
      imagePosition: 'center top',
      linkedin: 'https://www.linkedin.com/in/muhammadali-dev5/',
      github: 'https://github.com/mali14655',
    },
    {
      name: 'Faras Khursheed',
      role: 'Mobile Application Developer',
      bio: 'Developing responsive mobile experiences with performance and usability in mind.',
      image: farasImg,
      imagePosition: 'center 25%' ,
      linkedin: 'https://www.linkedin.com/in/faras-khursheed-b19b23270/',
      github: 'https://github.com/Faras-khursheed99',
    },
    {
      name: 'Muhammad Haneef Iqbal',
      role: 'Lead Generation Specialist',
      bio: 'Driving qualified leads through targeted campaigns, outreach, and conversion-focused strategy.',
      image: haneefImg,
      imagePosition: 'center 15%',
      linkedin: 'https://www.linkedin.com/in/muhammad-haneef-iqbal-smm',
      github: null,
    },
  ];
  const visibleMembers = typeof limit === 'number' ? members.slice(0, limit) : members;

  return (
    <section id="team" className="section tinted innovation">
      <div className="container innovation-inner">
        <div className="innovation-header">
          <p className="eyebrow">Our team</p>
          <h2>People behind the product delivery.</h2>
          <p className="innovation-lead">
            A focused team of strategists, designers, and engineers working as one delivery unit.
          </p>
        </div>
        <div className="team-grid">
          {visibleMembers.map((member) => (
            <article key={member.name} className="card team-card">
              <div className="team-photo-wrap">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-photo"
                  loading="lazy"
                  style={{ objectPosition: member.imagePosition }}
                />
                {(member.linkedin || member.github) && (
                  <div className="team-socials">
                    {member.linkedin && (
                      <a
                        className="team-social-link"
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Linkedin size={14} />
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {member.github && (
                      <a
                        className="team-social-link"
                        href={member.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Github size={14} />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
              <div className="team-content">
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
        {showExplore && (
          <div className="team-explore-wrap">
            <button className="btn-primary team-explore-btn" type="button" onClick={onExploreClick}>
              Explore whole team
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
