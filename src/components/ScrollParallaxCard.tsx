import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

interface ScrollParallaxCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // Adjust intensity of tilt and float
  key?: React.Key;
}

export default function ScrollParallaxCard({ children, className = "", intensity = 1 }: ScrollParallaxCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this specific card relative to viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Calculate subtle scroll-linked floating and 3D tilting
  const y = useTransform(scrollYProgress, [0, 1], [25 * intensity, -25 * intensity]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [5 * intensity, -5 * intensity]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-3 * intensity, 3 * intensity]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

  return (
    <div ref={cardRef} style={{ perspective: "1200px" }} className="w-full">
      <motion.div
        style={{ 
          y, 
          rotateX, 
          rotateY, 
          scale,
          transformStyle: "preserve-3d" 
        }}
        transition={{ type: "spring", stiffness: 100, damping: 25 }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
