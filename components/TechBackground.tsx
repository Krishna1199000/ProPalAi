"use client";

import { motion } from "framer-motion";

export default function TechBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      
      {/* Circuit patterns */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" className="absolute inset-0">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50h100M50 0v100" stroke="#ff6b35" strokeWidth="0.5" opacity="0.3" />
              <circle cx="50" cy="50" r="2" fill="#ff6b35" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Animated elements */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 border border-orange-500/30 rounded-full"
      />
      
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2] 
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2 
        }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-orange-400/20 rounded-full"
      />

      {/* Gradient overlays */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-orange-500/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-orange-600/10 to-transparent" />
    </div>
  );
}