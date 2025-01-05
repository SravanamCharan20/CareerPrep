import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { KeyHighlights } from '../components/home/KeyHighlights';
import { Testimonials } from '../components/home/Testimonials';

export function Home() {
  return (
    <>
      <HeroSection />
      <KeyHighlights />
      <Testimonials />
    </>
  );
}