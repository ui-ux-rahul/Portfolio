import React from "react";
import { motion } from "motion/react";
import { MessageSquare, Folder } from "lucide-react";
import { SiteConfig } from "../types";

// Deterministic helper to generate decorative spiral ticks matching the custom CTA design
const generateTicks = () => {
  const ticks = [];
  const cx = 550; // Shifted slightly right to frame the text beautifully
  const cy = 250;
  const ringCount = 13;
  const baseRadius = 45;
  const radiusStep = 24;

  for (let ring = ringCount - 1; ring >= 0; ring--) {
    const r = baseRadius + ring * radiusStep;
    const tickCount = Math.floor(ring * 5.2 + 10);
    
    for (let i = 0; i < tickCount; i++) {
      const angleFraction = i / tickCount;
      const baseAngle = angleFraction * Math.PI * 2;
      
      // Twisting spiral offset
      const twist = ring * 0.13;
      const angle = baseAngle + twist;
      
      // Calculate start coordinate
      const x1 = cx + r * Math.cos(angle);
      const y1 = cy + r * Math.sin(angle);
      
      // Ticks are tilted from the radial vector to emphasize the swirling field
      const tilt = 0.28; 
      const dirAngle = angle + tilt;
      
      // Tick length
      const length = 5.5 + (ring % 3) * 1.5;
      
      const x2 = x1 + length * Math.cos(dirAngle);
      const y2 = y1 + length * Math.sin(dirAngle);
      
      // Opacity fades as we go outward, with some deterministic variation
      const baseOpacity = Math.max(0.08, 1 - (r / 390));
      const opacityVar = 0.5 + 0.5 * Math.sin(ring * 3.5 + i * 2.2);
      const opacity = baseOpacity * (0.3 + 0.7 * opacityVar) * 0.95;
      
      // Electric/royal blue color variation matching Google branding
      const colorIndex = (ring + i) % 4;
      const colors = ["#4285F4", "#5e97f6", "#3b6fcb", "#8ab4f8"];
      const color = colors[colorIndex];

      ticks.push({
        id: `${ring}-${i}`,
        x1,
        y1,
        x2,
        y2,
        opacity,
        color,
        ring,
        index: i
      });
    }
  }
  return ticks;
};

interface BottomCTASectionProps {
  siteConfig: SiteConfig | null;
  onNavigate: (page: string) => void;
  onOpenBooking?: () => void;
}

export default function BottomCTASection({ siteConfig, onNavigate, onOpenBooking }: BottomCTASectionProps) {
  return (
    <section 
      className="py-14 sm:py-24 bg-transparent relative overflow-hidden transition-colors duration-300 z-10 w-full"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial={{ scale: 0.96, opacity: 0.9 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative backdrop-blur-xl bg-white/70 dark:bg-zinc-900/40 rounded-[28px] md:rounded-[36px] overflow-hidden p-8 sm:p-12 md:p-20 min-h-[440px] flex flex-col justify-center items-center lg:items-start text-center lg:text-left border border-gray-200/40 dark:border-zinc-800/45 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.25)]"
        >
          
          {/* Swirling electric vector background field */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
            <div className="absolute right-[-200px] sm:right-[-100px] md:right-[-50px] lg:right-0 top-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] md:w-[900px] h-[500px] pointer-events-none">
              <motion.svg 
                className="w-full h-full"
                viewBox="0 0 1000 500" 
                preserveAspectRatio="xMidYMid slice"
                style={{ transformOrigin: "550px 250px", opacity: 0.6 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                {generateTicks().map((tick) => (
                  <motion.line
                    key={tick.id}
                    x1={tick.x1}
                    y1={tick.y1}
                    x2={tick.x2}
                    y2={tick.y2}
                    stroke={tick.color}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    style={{ opacity: tick.opacity }}
                    animate={{
                      opacity: [tick.opacity * 0.7, tick.opacity * 1.3, tick.opacity * 0.7],
                    }}
                    transition={{
                      duration: 3 + (tick.ring % 4),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: (tick.ring * 0.1) + (tick.index * 0.02)
                    }}
                  />
                ))}
              </motion.svg>
            </div>
          </div>

          {/* Content section */}
          <div className="relative z-10 max-w-[550px] flex flex-col items-center lg:items-start justify-center h-full w-full">
            <h2 className="font-sans text-3xl sm:text-4xl md:text-[40px] font-medium leading-[1.15] text-black dark:text-white tracking-tight mb-8 text-center lg:text-left">
              {siteConfig?.bottomCtaHeading ? (
                <span className="whitespace-pre-line">{siteConfig.bottomCtaHeading}</span>
              ) : (
                <>
                  Let's build <br className="hidden sm:inline" />
                  something incredible <br className="hidden sm:inline" />
                  together
                </>
              )}
              <span className="inline-block w-[3px] h-[0.9em] bg-black dark:bg-white ml-2 animate-pulse align-middle" style={{ verticalAlign: 'middle', marginTop: '-4px' }} />
            </h2>

            <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto justify-center lg:justify-start items-center mt-2">
              {!onOpenBooking && !(window as any).Cal && (siteConfig?.bottomCtaPrimaryBtnUrl || "contact").startsWith("http") ? (
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={siteConfig?.bottomCtaPrimaryBtnUrl || "contact"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:px-6 sm:py-3 rounded-full bg-black text-white hover:bg-zinc-800 border border-transparent dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all duration-300 shadow-md hover:shadow-lg text-xs sm:text-[13px] font-bold tracking-tight cursor-pointer text-center shrink-0"
                >
                  <span>{siteConfig?.bottomCtaPrimaryBtnText || "Contact Rahul"}</span>
                </motion.a>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (onOpenBooking) {
                      onOpenBooking();
                    } else {
                      const url = siteConfig?.bottomCtaPrimaryBtnUrl || "contact";
                      if (url.startsWith("http")) {
                        window.open(url, "_blank");
                      } else {
                        onNavigate(url);
                      }
                    }
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:px-6 sm:py-3 rounded-full bg-black text-white hover:bg-zinc-800 border border-transparent dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all duration-300 shadow-md hover:shadow-lg text-xs sm:text-[13px] font-bold tracking-tight cursor-pointer text-center shrink-0"
                >
                  <span>{siteConfig?.bottomCtaPrimaryBtnText || "Contact Rahul"}</span>
                </motion.button>
              )}
              {(siteConfig?.bottomCtaSecondaryBtnUrl || "projects").startsWith("http") ? (
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={siteConfig?.bottomCtaSecondaryBtnUrl || "projects"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:px-6 sm:py-3 rounded-full bg-transparent border border-black/20 text-black hover:bg-black/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10 transition-all duration-300 text-xs sm:text-[13px] font-bold tracking-tight cursor-pointer text-center shrink-0"
                >
                  <span>{siteConfig?.bottomCtaSecondaryBtnText || "View Solutions"}</span>
                </motion.a>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const url = siteConfig?.bottomCtaSecondaryBtnUrl || "projects";
                    onNavigate(url);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:px-6 sm:py-3 rounded-full bg-transparent border border-black/20 text-black hover:bg-black/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10 transition-all duration-300 text-xs sm:text-[13px] font-bold tracking-tight cursor-pointer text-center shrink-0"
                >
                  <span>{siteConfig?.bottomCtaSecondaryBtnText || "View Solutions"}</span>
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
