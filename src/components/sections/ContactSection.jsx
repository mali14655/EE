import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock3 } from 'lucide-react';
import BouncingCirclesLoader from '../ui/bouncing-circles-loader';

export default function ContactSection() {
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
        <div className="contact-copy">
          <p className="eyebrow">Contact us</p>
          <h2>Let&apos;s build your project</h2>
          <p>
            Share your goals, timeline, and product vision. We will review your requirements and
            respond with clear next steps within 24 hours.
          </p>
          <div className="contact-details">
            <div className="contact-detail-item">
              <Mail size={16} />
              <span>hello@emergingedge.tech</span>
            </div>
            <div className="contact-detail-item">
              <Phone size={16} />
              <span>+91 00000 00000</span>
            </div>
            <div className="contact-detail-item">
              <MapPin size={16} />
              <span>Peshawar, Pakistan</span>
            </div>
            <div className="contact-detail-item">
              <Clock3 size={16} />
              <span>Mon - Sat, 10:00 AM to 7:00 PM</span>
            </div>
          </div>
          <div className="contact-map-wrap">
            <iframe
              title="Emerging Edge location map"
              className="contact-map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Peshawar%2C%20Pakistan&z=12&output=embed"
            />
          </div>
        </div>
        <form className="card contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-head">
            <h3>Project Inquiry Form</h3>
            <p>
              Share a few details and our team will reach out with timelines, scope clarity, and
              the next recommended steps.
            </p>
          </div>
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
            Project Details
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              placeholder="Tell us what you want to build..."
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
          <p className="contact-form-note">
            Your information is secure and used only for project communication.
          </p>
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
