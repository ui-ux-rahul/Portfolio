import React, { useEffect, useState, useRef } from "react";
import { useInView } from "motion/react";

interface AnimatedCounterProps {
  value: string;
}

export default function AnimatedCounter({ value }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    // Parse value: find all digits and suffixes/prefixes
    const match = value.match(/^([^0-9]*)([0-9]+)([^0-9]*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || "";
    const targetNumber = parseInt(match[2], 10);
    const suffix = match[3] || "";

    let start = 0;
    const duration = 1500; // 1.5 seconds animation duration
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const currentNumber = Math.floor(easeProgress * targetNumber);

      setDisplayValue(`${prefix}${currentNumber}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value); // Ensure exact target precision at the end
      }
    };

    requestAnimationFrame(animate);
  }, [value, isInView]);

  return <span ref={ref} id={`counter-${value.replace(/[^a-zA-Z0-9]/g, "")}`}>{displayValue}</span>;
}
