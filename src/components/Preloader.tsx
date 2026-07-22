import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [step, setStep] = useState<"greeting" | "typing" | "complete" | "hidden">("greeting");
  const [displayedName, setDisplayedName] = useState("");
  const nameToType = "I'm Rahul";

  useEffect(() => {
    // 1. Show "Hi," initially, then trigger typing of the name
    const typeStartTimer = setTimeout(() => {
      setStep("typing");
    }, 700);

    return () => clearTimeout(typeStartTimer);
  }, []);

  // 2. Handle typewriter typing effect for "I'm Rahul"
  useEffect(() => {
    if (step !== "typing") return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < nameToType.length) {
        setDisplayedName(nameToType.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setStep("complete");
      }
    }, 80);

    return () => clearInterval(interval);
  }, [step]);

  // 3. Complete and trigger exit fade
  useEffect(() => {
    if (step !== "complete") return;

    const finishTimer = setTimeout(() => {
      setStep("hidden");
      onComplete();
    }, 1200); // 1.2s delay to read full name, then fade out

    return () => {
      clearTimeout(finishTimer);
    };
  }, [step, onComplete]);

  if (step === "hidden") return null;

  return (
    <div 
      className="fixed inset-0 z-[99999] overflow-hidden select-none bg-transparent flex flex-col items-center justify-center pointer-events-none" 
      id="premium-preloader"
    >
      <AnimatePresence>
        {step !== "hidden" && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            className="max-w-4xl mx-auto flex flex-col items-center select-none pointer-events-none"
          >
            {/* Main Title "Hi," */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ 
                opacity: 0, 
                y: -30, 
                filter: "blur(8px)", 
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
              }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[44px] sm:text-[80px] md:text-[90px] font-medium leading-[0.95] tracking-tighter text-black dark:text-white !transition-none"
            >
              Hi,
            </motion.h1>

            {/* Typewritten Subheading "I'm Rahul" */}
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ 
                opacity: 0, 
                y: 30, 
                filter: "blur(8px)", 
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
              }}
              className="font-sans text-[32px] sm:text-[56px] md:text-[64px] leading-[0.95] tracking-tighter text-[#5F6368] dark:text-zinc-500 font-normal mt-3 min-h-[40px] sm:min-h-[64px] md:min-h-[72px] flex items-center justify-center !transition-none"
            >
              <span>{displayedName}</span>
            </motion.h2>

            {/* Decorative fine-line accent */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.3 }}
              exit={{ scaleX: 0, opacity: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 w-20 h-[1.5px] bg-gray-300 dark:bg-zinc-800 origin-center"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
