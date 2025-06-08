"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import TechBackground from "@/components/TechBackground";
import Navigation from "@/components/Navigation";
import FloatingIcons from "./FloatingIcons";
import AICircuitDashboard from "./AICircuitDashboard";
import { AnimatedButton } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CompactNavbar from '@/components/CompactNavbar';
import { useState, useEffect } from "react";

export default function MainContent() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/signup');
  };
  const [showCompactNav, setShowCompactNav] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setShowCompactNav(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Tech Background */}
      <TechBackground />
      
      <div className="relative z-20">
        {/* Original Navigation */}
        <Navigation />
        
        {/* Compact Navigation */}
        <CompactNavbar 
          isVisible={showCompactNav} 
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />
        
        {/* Floating Icons */}
        <FloatingIcons />
        <div className="relative z-10 pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm mb-8"
            >
              ✨ Beta Release
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
            >
              Powerful AI Labs by{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Pro Pal AI
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Boost your AI application's speed and efficiency globally by bringing 
              inference closer to your users. Enjoy unmatched performance with our intelligent 
              edge AI infrastructure and comprehensive analytics.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <AnimatedButton 
                size="lg"
                onClick={handleGetStarted}
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </AnimatedButton>
              <AnimatedButton 
                variant="ghost" 
                size="lg"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 text-lg rounded-lg"
              >
                <Play className="mr-2 w-5 h-5" />
                Book a demo
              </AnimatedButton>
            </motion.div>

            {/* AI Circuit Dashboard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="relative mx-auto max-w-4xl"
            >
              <AICircuitDashboard />
             
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}