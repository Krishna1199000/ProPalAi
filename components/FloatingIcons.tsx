"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Shield, Database, Cpu, Wifi } from "lucide-react";

const icons = [
  { Icon: Brain, position: { top: "20%", left: "10%" } },
  { Icon: Zap, position: { top: "30%", right: "15%" } },
  { Icon: Shield, position: { bottom: "25%", left: "8%" } },
  { Icon: Database, position: { bottom: "35%", right: "12%" } },
  { Icon: Cpu, position: { top: "60%", left: "5%" } },
  { Icon: Wifi, position: { top: "50%", right: "8%" } },
];

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {icons.map(({ Icon, position }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [0.8, 1.2, 0.8],
            y: [-10, 10, -10]
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "easeInOut"
          }}
          className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm border border-orange-500/30 flex items-center justify-center"
          style={position}
        >
          <Icon className="w-6 h-6 text-orange-400" />
        </motion.div>
      ))}
    </div>
  );
}