import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FloatingTopButton from '../components/layout/FloatingTopButton';
import { Team } from '../components/sections/HomeSections';

export default function TeamPage() {
  return (
    <>
      <Header />
      <div className="page">
        <main>
          <Team />
        </main>
        <Footer />
      </div>
      <FloatingTopButton />
    </>
  );
}
