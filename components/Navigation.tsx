"use client";

import { motion } from "framer-motion";
import { AnimatedButton } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="absolute top-0 left-0 right-0 z-50 p-4 md:p-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            {/* Orange circular background */}
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg md:text-xl">P</span>
            </div>
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-sm"></div>
          </div>
          <span className="text-lg md:text-xl font-bold text-white">Pro Pal AI</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Products
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Pricing
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Resources
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Partners
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Why Pro Pal
            </a>
          </div>
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <AnimatedButton 
            variant="ghost" 
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 text-sm font-medium"
          >
            Contact us
          </AnimatedButton>
          <AnimatedButton className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 text-sm font-medium px-4 py-2 rounded-lg shadow-lg shadow-orange-500/25"
            onClick={() => router.push('/signup')}
          >
            Sign up for free
          </AnimatedButton>
        </div>

        {/* Mobile Menu Button */}
        <AnimatedButton 
          variant="ghost" 
          size="sm" 
          className="lg:hidden text-white hover:bg-gray-800/50 p-2"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </AnimatedButton>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-gray-800 shadow-2xl"
        >
          <div className="px-6 py-6 space-y-6">
            {/* Mobile Navigation Links */}
            <div className="space-y-4">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-base font-medium py-2">
                Products
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-base font-medium py-2">
                Pricing
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-base font-medium py-2">
                Resources
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-base font-medium py-2">
                Partners
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-base font-medium py-2">
                Why Pro Pal
              </a>
            </div>

            {/* Mobile CTA Buttons */}
            <div className="space-y-3 pt-4 border-t border-gray-800">
              <AnimatedButton 
                variant="ghost" 
                className="w-full text-gray-300 hover:text-white hover:bg-gray-800/50 text-base font-medium justify-start"
              >
                Contact us
              </AnimatedButton>
              <AnimatedButton className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 text-base font-medium py-3 rounded-lg shadow-lg shadow-orange-500/25"
                onClick={() => router.push('/signup')}
              >
                Sign up for free
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}