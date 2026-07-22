import { motion } from "motion/react";

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent flex flex-col justify-between pt-28 sm:pt-36 pb-12 transition-colors duration-300">
      {/* Premium smoky ambient blur backdrops */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Large smoke plume 1 */}
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[350px] rounded-full bg-zinc-500/[0.03] dark:bg-white/[0.04] blur-[120px] animate-smoke-1"></div>
        {/* Large smoke plume 2 */}
        <div className="absolute top-[25%] right-[15%] w-[600px] h-[400px] rounded-full bg-zinc-500/[0.02] dark:bg-white/[0.03] blur-[140px] animate-smoke-2"></div>
        {/* Subtle grid pattern matching the high-end feel */}
        <div className="absolute inset-0 bg-[radial-gradient(#00000006_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-grow flex flex-col justify-center items-center z-10">
        {/* Subtle Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl border border-[#E9E6DC] dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
          <span>UI/UX DESIGNER</span>
        </motion.div>

        {/* Hero Main Heading - 100% matches screenshot copy */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-display text-[48px] sm:text-6xl md:text-7xl lg:text-8xl font-medium text-[#070708] dark:text-white tracking-tight leading-[1.1] max-w-5xl mb-6 text-center"
        >
          Designing Digital <br />
          Experiences that <br />
          Users Trust
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-zinc-500 text-xs sm:text-sm tracking-wider uppercase mb-10"
        >
          Trusted by startups, SaaS platforms, and enterprise companies
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex gap-4 justify-center items-center mb-16"
        >
          <motion.a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 sm:py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-750 text-xs text-[#070708] dark:text-white tracking-wider uppercase bg-transparent hover:bg-[#070708] hover:text-white hover:border-[#070708] dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all duration-300 font-medium cursor-pointer"
          >
            Dribbble
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 sm:py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-750 text-xs text-[#070708] dark:text-white tracking-wider uppercase bg-transparent hover:bg-[#070708] hover:text-white hover:border-[#070708] dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all duration-300 font-medium cursor-pointer"
          >
            LinkedIn
          </motion.a>
        </motion.div>

        {/* Interactive Scroll Down exactly as screenshot */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-10 text-[9px] tracking-[0.25em] text-zinc-500 uppercase select-none mb-16"
        >
          <span>Scroll down</span>
          <div className="flex flex-col items-center justify-center">
            {/* Scroll Mouse Wheel */}
            <div className="w-[18px] h-[30px] rounded-full border border-zinc-300 dark:border-zinc-700 flex justify-center p-1">
              <motion.div 
                animate={{ 
                  y: [0, 8, 0],
                  opacity: [1, 0, 1]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-1 h-1.5 rounded-full bg-zinc-700 dark:bg-white"
              />
            </div>
          </div>
          <span>to see projects</span>
        </motion.div>
      </div>

      {/* Partners Brand Logo strip at the bottom of hero */}
      <div className="relative w-full border-t border-[#E9E6DC] dark:border-zinc-900 py-8 bg-white/30 dark:bg-black/40 backdrop-blur-xs z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-6 text-zinc-500 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">
            <span className="hover:text-black dark:hover:text-white transition-colors cursor-default">NZMO</span>
            <span className="hover:text-black dark:hover:text-white transition-colors cursor-default">Webbridge</span>
            <span className="hover:text-black dark:hover:text-white transition-colors cursor-default">VIRTUALITY</span>
            <span className="hover:text-black dark:hover:text-white transition-colors cursor-default">GUARDVISION</span>
          </div>
        </div>
      </div>
    </div>
  );
}
