import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';

interface CompactNavbarProps {
  isVisible: boolean;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export default function CompactNavbar({ isVisible, isMobileMenuOpen, toggleMobileMenu }: CompactNavbarProps) {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-b border-gray-800 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-lg font-bold text-white">Pro Pal AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors cursor-pointer">
              <span className="text-sm font-medium">Products</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Pricing
            </a>
            <div className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors cursor-pointer">
              <span className="text-sm font-medium">Resources</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors cursor-pointer">
              <span className="text-sm font-medium">Partners</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors cursor-pointer">
              <span className="text-sm font-medium">Why Pro Pal AI</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              Sign up for free
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white hover:text-gray-300 transition-colors p-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-800"
          >
            <div className="px-2 pt-4 pb-6 space-y-4">
              <div className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors cursor-pointer py-2">
                <span className="text-base font-medium">Products</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <a href="#pricing" className="block text-gray-300 hover:text-white transition-colors text-base font-medium py-2">
                Pricing
              </a>
              <div className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors cursor-pointer py-2">
                <span className="text-base font-medium">Resources</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors cursor-pointer py-2">
                <span className="text-base font-medium">Partners</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors cursor-pointer py-2">
                <span className="text-base font-medium">Why Pro Pal AI</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="pt-4 border-t border-gray-800">
                <button className="w-full bg-white text-black px-4 py-3 rounded-lg text-base font-medium hover:bg-gray-100 transition-colors">
                  Sign up for free
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}