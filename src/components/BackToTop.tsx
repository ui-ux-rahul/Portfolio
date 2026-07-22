import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Visibility threshold
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate exact scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Circular progress path values
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 15 }}
          whileHover={{ 
            scale: 1.1,
            y: -2,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full text-black dark:text-white cursor-pointer flex items-center justify-center group bg-white/60 dark:bg-[#0E0D0C]/60 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 shadow-md outline-none"
          aria-label="Back to top"
          title="Back to top"
          id="back-to-top-trigger"
        >
          {/* Circular progress overlay */}
          <svg className="absolute w-full h-full transform -rotate-90 pointer-events-none" viewBox="0 0 44 44">
            <circle
              className="text-transparent"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="22"
              cy="22"
            />
            <motion.circle
              className="text-black dark:text-white"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="22"
              cy="22"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
              strokeLinecap="round"
            />
          </svg>

          {/* Icon */}
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300 relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
