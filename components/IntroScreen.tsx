"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [stage, setStage] = useState<"letters" | "logo" | "shutter">("letters");
  const letters = ["P", "r", "o", "P", "a", "l"];

  useEffect(() => {
    // Progress through stages
    const letterDuration = 200; // 200ms per letter
    const totalLetterTime = letters.length * letterDuration + 500; // +500ms buffer

    const logoTimer = setTimeout(() => {
      setStage("logo");
    }, totalLetterTime);

    const shutterTimer = setTimeout(() => {
      setStage("shutter");
    }, totalLetterTime + 1500); // +1500ms for logo display

    const completeTimer = setTimeout(() => {
      onComplete();
    }, totalLetterTime + 2500); // +2500ms for shutter animation

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(shutterTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {/* Tech Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-orange-600/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-orange-500/30 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-orange-400/20 rounded-full animate-pulse delay-1000" />
      </div>

      {/* Letter Animation */}
      {stage === "letters" && (
        <div className="flex space-x-2">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.2,
                duration: 0.4,
                ease: "easeOut",
              }}
              className="text-6xl md:text-8xl font-bold text-white"
            >
              {letter}
            </motion.span>
          ))}
        </div>
      )}

      {/* Full Logo */}
      {stage === "logo" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
            Pro Pal AI
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full" />
        </motion.div>
      )}

      {/* Shutter Animation */}
      {stage === "shutter" && (
        <>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-1/2 h-full bg-black z-10"
          />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-1/2 h-full bg-black z-10"
          />
        </>
      )}
    </div>
  );
}