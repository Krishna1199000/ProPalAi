"use client";

import { useState } from "react";
import IntroScreen from "@/components/IntroScreen";
import MainContent from "@/components/MainContent";
import GPUPricingCards from '@/components/GPUPricingCards';
import Footer from '@/components/Footer';
import RotatingGlobe from "@/components/RotatingGlobe";


export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
      {!showIntro && <MainContent />}
      <RotatingGlobe />
      <GPUPricingCards />

      {/* Footer */}
      <Footer />
    </>
  );
}
