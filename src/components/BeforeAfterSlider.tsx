import React, { useState, useRef, useCallback } from "react";
import { ChevronsLeftRight, AlertCircle, CheckCircle2 } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  beforeTitle?: string;
  beforeDescription?: string;
  afterImage?: string;
  afterTitle?: string;
  afterDescription?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage = "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
  beforeTitle = "Legacy UX & High Friction",
  beforeDescription = "Confusing layout, slow loading, low conversion rate, and high bounce rate.",
  afterImage = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  afterTitle = "Redesigned Fluid Solution",
  afterDescription = "Clear hierarchy, optimized micro-interactions, +42% conversion, and lightning fast.",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPosition(percentage);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, [handleMove]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, [handleMove]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  }, [isDragging, handleMove]);

  return (
    <div className="w-full bg-white dark:bg-[#1C1B19] p-6 sm:p-10 rounded-[32px] border border-zinc-200/60 dark:border-zinc-800/60 shadow-lg select-none">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200/60 dark:border-zinc-800/40 bg-gray-50/50 dark:bg-zinc-900/50 text-[11px] font-semibold text-black dark:text-white uppercase tracking-wider mb-2">
            UX Evolution Analysis
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-black dark:text-white">
            Before / After UX Transformation
          </h3>
        </div>
        <div className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-200/50 dark:border-zinc-800/50">
          Drag handle to inspect transition
        </div>
      </div>

      {/* Slider Visual Area */}
      <div
        ref={containerRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-[320px] sm:h-[480px] rounded-2xl overflow-hidden cursor-ew-resize border border-zinc-200 dark:border-zinc-800 shadow-inner group touch-none"
      >
        {/* AFTER Image (Background) */}
        <img
          src={afterImage}
          alt={afterTitle}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 z-10">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>AFTER: {afterTitle}</span>
        </div>

        {/* BEFORE Image (Foreground clipped by position) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeTitle}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current?.clientWidth || "100%" }}
          />
          <div className="absolute top-4 left-4 bg-rose-500/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 z-10">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>BEFORE: {beforeTitle}</span>
          </div>
        </div>

        {/* Divider Bar & Drag Handle */}
        <div
          className="absolute inset-y-0 w-1 bg-white dark:bg-zinc-200 shadow-2xl z-20 transition-transform duration-75"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black border-2 border-white dark:border-black flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
            <ChevronsLeftRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Before / After Description Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="p-5 rounded-2xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 text-left">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-rose-500" />
            <h4 className="font-bold text-sm text-rose-600 dark:text-rose-400 font-sans">{beforeTitle}</h4>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
            {beforeDescription}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-left">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <h4 className="font-bold text-sm text-emerald-600 dark:text-emerald-400 font-sans">{afterTitle}</h4>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
            {afterDescription}
          </p>
        </div>
      </div>

    </div>
  );
};
