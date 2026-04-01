import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../images/logo.jpeg';
import {
  Linkedin,
  Facebook,
  Instagram,
  Building2,
  BriefcaseBusiness,
  Share2,
} from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  const goHomeSection = (id) => {
    navigate(`/?section=${id}`);
  };

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-brand-row">
            <img src={logoImg} alt="Emerging Edge logo" className="footer-logo-img" />
            <h3 className="footer-title">
              <span className="footer-emerging">Emerging</span>{' '}
              <span className="footer-edge">Edge</span>
            </h3>
          </div>
          <p className="footer-text">
            Emerging Edge is a software company focused on web, mobile, and custom product
            development.
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4 className="footer-heading">
              <Building2 size={14} />
              <span>Company</span>
            </h4>
            <button className="link" onClick={() => goHomeSection('home')}>
              Home
            </button>
            <button className="link" onClick={() => goHomeSection('about')}>
              About
            </button>
            <button className="link" onClick={() => goHomeSection('process')}>
              Process
            </button>
            <button className="link" onClick={() => navigate('/contact')}>
              Contact
            </button>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">
              <BriefcaseBusiness size={14} />
              <span>Services</span>
            </h4>
            <span className="footer-item">Web Development</span>
            <span className="footer-item">Mobile Apps</span>
            <span className="footer-item">UI/UX Design</span>
            <span className="footer-item">SaaS Solutions</span>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">
              <Share2 size={14} />
              <span>Connect</span>
            </h4>
            <div className="social-links-grid">
              <a className="link social-link" href="#" onClick={(e) => e.preventDefault()}>
                <Linkedin size={14} />
                <span>LinkedIn</span>
              </a>
              <a className="link social-link" href="#" onClick={(e) => e.preventDefault()}>
                <Facebook size={14} />
                <span>Facebook</span>
              </a>
              <a className="link social-link" href="#" onClick={(e) => e.preventDefault()}>
                <Instagram size={14} />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Emerging Edge. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
