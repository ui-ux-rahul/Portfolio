import React, { useState, useEffect, useRef } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export default function LazyImage({ src, alt, className, referrerPolicy }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "150px", // Start loading 150px before it enters the viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-zinc-900/10 dark:bg-zinc-800/10 overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-850 animate-pulse" />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          referrerPolicy={referrerPolicy}
          className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
}
