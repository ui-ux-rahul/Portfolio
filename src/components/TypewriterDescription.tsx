/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";

interface TypewriterDescriptionProps {
  text: string;
  className?: string;
  speed?: number; // duration between characters in milliseconds
}

export default function TypewriterDescription({
  text,
  className = "",
  speed = 35 // Slower, smoother default speed
}: TypewriterDescriptionProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
            observer.disconnect(); // Only trigger once
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [hasStarted, text, speed]);

  return (
    <p ref={containerRef} className={className}>
      <span>{displayedText}</span>
      {/* Invisible placeholder of the remaining text to keep the height and wrapping completely static from start */}
      <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
        {text.slice(displayedText.length)}
      </span>
    </p>
  );
}
