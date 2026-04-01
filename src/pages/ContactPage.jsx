import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FloatingTopButton from '../components/layout/FloatingTopButton';
import ContactSection from '../components/sections/ContactSection';

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="page">
        <main>
          <ContactSection />
        </main>
        <Footer />
      </div>
      <FloatingTopButton />
    </>
  );
}
