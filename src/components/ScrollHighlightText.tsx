import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

interface ScrollHighlightTextProps {
  children?: ReactNode;
  textTop?: string;
  textBottom?: string;
  className?: string;
  align?: "center" | "left";
}

interface WordHighlightProps {
  word: string;
  scrollYProgress: MotionValue<number>;
  revealStart: number;
  revealEnd: number;
  className?: string;
  key?: string | number;
}

function WordHighlight({ 
  word, 
  scrollYProgress, 
  revealStart, 
  revealEnd, 
  className = "" 
}: WordHighlightProps) {
  // Call useTransform legally at the top-level of this functional component
  const wordOpacity = useTransform(
    scrollYProgress,
    [0, revealStart, revealEnd, 0.85, 0.98],
    [0.25, 0.25, 1, 1, 0.25]
  );

  return (
    <motion.span
      style={{ opacity: wordOpacity }}
      className={className}
    >
      {word}
    </motion.span>
  );
}

export default function ScrollHighlightText({ 
  children, 
  textTop, 
  textBottom, 
  className = "",
  align
}: ScrollHighlightTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Precise scroll progress targeting this container's entry/exit in the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 15%"]
  });

  // Fallback if no structured text is provided: use a beautiful container-level scroll fade
  const containerOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.35, 1, 1, 0.35]);
  const containerScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.98, 1, 1, 0.98]);

  // Determine flex alignment
  let justifyClass = "justify-center lg:justify-start";
  if (align === "center" || (className.includes("text-center") && !className.includes("lg:text-left"))) {
    justifyClass = "justify-center text-center";
  } else if (align === "left" || className.includes("text-left") || className.includes("lg:text-left")) {
    if (className.includes("lg:text-left") && className.includes("text-center")) {
      justifyClass = "justify-center lg:justify-start";
    } else {
      justifyClass = "justify-start text-left";
    }
  }

  // If we have explicit string lines, split them into words for a staggered word-by-word sequential sweep
  if (textTop || textBottom) {
    const wordsTop = textTop ? textTop.split(" ") : [];
    const wordsBottom = textBottom ? textBottom.split(" ") : [];
    const allWords = [...wordsTop, ...wordsBottom];
    const totalCount = allWords.length;

    return (
      <div 
        ref={containerRef} 
        className={`will-change-transform flex flex-col gap-3 sm:gap-4 ${className}`}
      >
        {/* Top Big Title Line */}
        {textTop && (
          <div className={`flex flex-wrap ${justifyClass} gap-x-3 gap-y-1`}>
            {wordsTop.map((word, index) => {
              // Word level sequential reveal starts early on entry and completes fast
              const revealStart = 0.01 + (index / totalCount) * 0.12;
              const revealEnd = revealStart + 0.08;

              return (
                <WordHighlight
                  key={`top-${index}`}
                  word={word}
                  scrollYProgress={scrollYProgress}
                  revealStart={revealStart}
                  revealEnd={revealEnd}
                  className="inline-block text-[44px] sm:text-[80px] md:text-[90px] font-normal leading-none tracking-tighter text-black dark:text-white transition-all duration-150"
                />
              );
            })}
          </div>
        )}

        {/* Bottom Subtitle Line */}
        {textBottom && (
          <div className={`flex flex-wrap ${justifyClass} gap-x-3 gap-y-1`}>
            {wordsBottom.map((word, index) => {
              // Offset the bottom words to start after the top words
              const overallIndex = wordsTop.length + index;
              const revealStart = 0.01 + (overallIndex / totalCount) * 0.12;
              const revealEnd = revealStart + 0.08;

              return (
                <WordHighlight
                  key={`bottom-${index}`}
                  word={word}
                  scrollYProgress={scrollYProgress}
                  revealStart={revealStart}
                  revealEnd={revealEnd}
                  className="inline-block text-[32px] sm:text-[56px] md:text-[64px] font-normal leading-none tracking-tighter text-[#5F6368] dark:text-zinc-500 transition-all duration-150"
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Fallback rendering
  return (
    <motion.div
      ref={containerRef}
      style={{ opacity: containerOpacity, scale: containerScale }}
      className={`will-change-transform origin-center ${className}`}
    >
      {children}
    </motion.div>
  );
}
