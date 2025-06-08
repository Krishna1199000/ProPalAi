import React from 'react';
import { Search, Menu, Layers, Database, Wifi, CircuitBoard, Grid3X3 } from 'lucide-react';

export default function FuturisticAIInterface() {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Animated Signal Lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor: '#ff6b35', stopOpacity: 0}} />
            <stop offset="30%" style={{stopColor: '#ff6b35', stopOpacity: 0.6}} />
            <stop offset="70%" style={{stopColor: '#ff6b35', stopOpacity: 0.8}} />
            <stop offset="100%" style={{stopColor: '#ff6b35', stopOpacity: 0}} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Main radiating lines with animated signals */}
        <g>
          {/* Top Left Node Line */}
          <line x1="50%" y1="50%" x2="18%" y2="18%" stroke="rgba(255,107,53,0.1)" strokeWidth="1" />
          <line x1="50%" y1="50%" x2="18%" y2="18%" stroke="url(#signalGradient)" strokeWidth="2" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,200;50,150;0,200" dur="2s" repeatCount="indefinite" />
            <animate attributeName="stroke-dashoffset" values="0;-200" dur="2s" repeatCount="indefinite" />
          </line>

          {/* Top Right Node Line */}
          <line x1="50%" y1="50%" x2="82%" y2="18%" stroke="rgba(255,107,53,0.1)" strokeWidth="1" />
          <line x1="50%" y1="50%" x2="82%" y2="18%" stroke="url(#signalGradient)" strokeWidth="2" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,200;50,150;0,200" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="stroke-dashoffset" values="0;-200" dur="2.5s" repeatCount="indefinite" />
          </line>

          {/* Left Side Node Line */}
          <line x1="50%" y1="50%" x2="8%" y2="50%" stroke="rgba(255,107,53,0.1)" strokeWidth="1" />
          <line x1="50%" y1="50%" x2="8%" y2="50%" stroke="url(#signalGradient)" strokeWidth="2" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,200;50,150;0,200" dur="2.1s" repeatCount="indefinite" />
            <animate attributeName="stroke-dashoffset" values="0;-200" dur="2.1s" repeatCount="indefinite" />
          </line>

          {/* Right Side Node Line */}
          <line x1="50%" y1="50%" x2="92%" y2="50%" stroke="rgba(255,107,53,0.1)" strokeWidth="1" />
          <line x1="50%" y1="50%" x2="92%" y2="50%" stroke="url(#signalGradient)" strokeWidth="2" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,200;50,150;0,200" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="stroke-dashoffset" values="0;-200" dur="1.8s" repeatCount="indefinite" />
          </line>

          {/* Bottom Left Node Line */}
          <line x1="50%" y1="50%" x2="18%" y2="82%" stroke="rgba(255,107,53,0.1)" strokeWidth="1" />
          <line x1="50%" y1="50%" x2="18%" y2="82%" stroke="url(#signalGradient)" strokeWidth="2" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,200;50,150;0,200" dur="2.3s" repeatCount="indefinite" />
            <animate attributeName="stroke-dashoffset" values="0;-200" dur="2.3s" repeatCount="indefinite" />
          </line>

          {/* Bottom Right Node Line */}
          <line x1="50%" y1="50%" x2="82%" y2="82%" stroke="rgba(255,107,53,0.1)" strokeWidth="1" />
          <line x1="50%" y1="50%" x2="82%" y2="82%" stroke="url(#signalGradient)" strokeWidth="2" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,200;50,150;0,200" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="stroke-dashoffset" values="0;-200" dur="2.2s" repeatCount="indefinite" />
          </line>
        </g>

        {/* Removed Additional diagonal lines for more density */}
      </svg>

      {/* Main AI Element */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Central AI Circle */}
          <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center border-2 border-orange-500 shadow-lg shadow-orange-500/30 relative">
            <div className="text-orange-500 text-2xl font-bold">AI</div>
            
            {/* Multiple Animated Pulse Rings */}
            <div className="absolute inset-0 rounded-full border-2 border-orange-500 animate-ping opacity-30"></div>
            <div className="absolute -inset-2 rounded-full border border-orange-500 animate-ping opacity-20" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute -inset-4 rounded-full border border-orange-500/40 animate-ping opacity-10" style={{animationDelay: '1s'}}></div>
            
            {/* Rotating Ring */}
            <div className="absolute -inset-6 rounded-full border border-orange-500/20 animate-spin" style={{animationDuration: '10s'}}></div>
          </div>
        </div>
      </div>

      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Top-Left Corner */}
        <div className="absolute top-[8%] left-[8%] w-8 h-8 border-t-2 border-l-2 border-orange-500/5"></div>
        {/* Top-Right Corner */}
        <div className="absolute top-[8%] right-[8%] w-8 h-8 border-t-2 border-r-2 border-orange-500/5"></div>
        {/* Bottom-Left Corner */}
        <div className="absolute bottom-[8%] left-[8%] w-8 h-8 border-b-2 border-l-2 border-orange-500/5"></div>
        {/* Bottom-Right Corner */}
        <div className="absolute bottom-[8%] right-[8%] w-8 h-8 border-b-2 border-r-2 border-orange-500/5"></div>
      </div>

      {/* Redefined Icon Nodes */}
      {/* Top Left Node (Layers) */}
      <div className="absolute top-[18%] left-[18%]">
        <div className="w-10 h-10 bg-gray-900/50 rounded-full flex items-center justify-center border border-orange-500/20 shadow-sm shadow-orange-500/10">
          <Layers className="w-5 h-5 text-orange-500" />
        </div>
      </div>

      {/* Top Right Node (Search) */}
      <div className="absolute top-[18%] right-[18%]">
        <div className="w-10 h-10 bg-gray-900/50 rounded-full flex items-center justify-center border border-orange-500/20 shadow-sm shadow-orange-500/10">
          <Search className="w-5 h-5 text-orange-500" />
        </div>
      </div>

      {/* Left Side Node (CircuitBoard) */}
      <div className="absolute left-[8%] top-1/2 transform -translate-y-1/2">
        <div className="w-10 h-10 bg-gray-900/50 rounded-full flex items-center justify-center border border-orange-500/20 shadow-sm shadow-orange-500/10">
          <CircuitBoard className="w-5 h-5 text-orange-500" />
        </div>
      </div>

      {/* Right Side Node (Wifi) */}
      <div className="absolute right-[8%] top-1/2 transform -translate-y-1/2">
        <div className="w-10 h-10 bg-gray-900/50 rounded-full flex items-center justify-center border border-orange-500/20 shadow-sm shadow-orange-500/10">
          <Wifi className="w-5 h-5 text-orange-500" />
        </div>
      </div>

      {/* Bottom Left Node (Menu) */}
      <div className="absolute bottom-[18%] left-[18%]">
        <div className="w-10 h-10 bg-gray-900/50 rounded-full flex items-center justify-center border border-orange-500/20 shadow-sm shadow-orange-500/10">
          <Menu className="w-5 h-5 text-orange-500" />
        </div>
      </div>

      {/* Bottom Right Node (Grid3X3) */}
      <div className="absolute bottom-[18%] right-[18%]">
        <div className="w-10 h-10 bg-gray-900/50 rounded-full flex items-center justify-center border border-orange-500/20 shadow-sm shadow-orange-500/10">
          <Grid3X3 className="w-5 h-5 text-orange-500" />
        </div>
      </div>

      {/* Animated Glowing Elements (keep as is) */}
      <div className="absolute top-1/4 left-1/4">
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse relative">
          <div className="absolute inset-0 w-2 h-2 bg-orange-500 rounded-full animate-ping opacity-50"></div>
        </div>
      </div>
      <div className="absolute top-3/4 right-1/4">
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse relative" style={{animationDelay: '1s'}}>
          <div className="absolute inset-0 w-2 h-2 bg-orange-500 rounded-full animate-ping opacity-50" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-3/4">
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse relative" style={{animationDelay: '0.5s'}}>
          <div className="absolute inset-0 w-2 h-2 bg-orange-500 rounded-full animate-ping opacity-50" style={{animationDelay: '0.5s'}}></div>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse relative" style={{animationDelay: '1.5s'}}>
          <div className="absolute inset-0 w-2 h-2 bg-orange-500 rounded-full animate-ping opacity-50" style={{animationDelay: '1.5s'}}></div>
        </div>
      </div>
    </div>
  );
}