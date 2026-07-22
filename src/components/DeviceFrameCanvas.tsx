import React, { useState } from "react";
import { motion } from "motion/react";
import { Monitor, Tablet, Smartphone, RotateCw, ExternalLink, Sparkles } from "lucide-react";

interface DeviceFrameCanvasProps {
  title: string;
  image: string;
  interactiveIframeUrl?: string;
  deviceDesktopImage?: string;
  deviceTabletImage?: string;
  deviceMobileImage?: string;
  liveLink?: string;
}

export const DeviceFrameCanvas: React.FC<DeviceFrameCanvasProps> = ({
  title,
  image,
  interactiveIframeUrl,
  deviceDesktopImage,
  deviceTabletImage,
  deviceMobileImage,
  liveLink,
}) => {
  const [activeDevice, setActiveDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [iframeKey, setIframeKey] = useState(0);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setTouchStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || e.changedTouches.length === 0) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        // Swiped Left
        if (activeDevice === "desktop") setActiveDevice("tablet");
        else if (activeDevice === "tablet") setActiveDevice("mobile");
      } else {
        // Swiped Right
        if (activeDevice === "mobile") setActiveDevice("tablet");
        else if (activeDevice === "tablet") setActiveDevice("desktop");
      }
    }
    setTouchStartX(null);
  };

  const getActiveImage = () => {
    if (activeDevice === "desktop") return deviceDesktopImage || image;
    if (activeDevice === "tablet") return deviceTabletImage || image;
    return deviceMobileImage || image;
  };

  const getWidthClass = () => {
    if (activeDevice === "desktop") return "w-full max-w-full";
    if (activeDevice === "tablet") return "w-full max-w-[768px]";
    return "w-full max-w-[375px]";
  };

  const getResolutionTag = () => {
    if (activeDevice === "desktop") return "1440 × 900 px (Desktop)";
    if (activeDevice === "tablet") return "768 × 1024 px (Tablet)";
    return "375 × 812 px (Mobile)";
  };

  return (
    <div className="w-full bg-zinc-950 text-white p-4 sm:p-8 rounded-[32px] border border-zinc-800 shadow-2xl overflow-hidden select-none">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest hidden sm:inline">
            Live Prototype Canvas
          </span>
        </div>

        {/* Device Switcher Pills */}
        <div className="flex items-center gap-1 bg-zinc-900/90 p-1 rounded-full border border-zinc-800">
          <button
            onClick={() => setActiveDevice("desktop")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeDevice === "desktop"
                ? "bg-white text-black shadow-md"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setActiveDevice("tablet")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeDevice === "tablet"
                ? "bg-white text-black shadow-md"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => setActiveDevice("mobile")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeDevice === "mobile"
                ? "bg-white text-black shadow-md"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Info & Action Controls */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-zinc-400 hidden lg:inline">
            {getResolutionTag()}
          </span>
          {interactiveIframeUrl && (
            <button
              onClick={() => setIframeKey((prev) => prev + 1)}
              className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors cursor-pointer"
              title="Reload Frame"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          )}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors cursor-pointer"
              title="Open Live Site"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Frame Container Stage */}
      <div 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-full flex justify-center items-center min-h-[380px] sm:min-h-[520px] bg-zinc-900/50 rounded-2xl p-2 sm:p-6 border border-zinc-800/50 relative touch-pan-y"
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className={`mx-auto bg-zinc-900 rounded-xl overflow-hidden border border-zinc-700/60 shadow-2xl ${getWidthClass()}`}
        >
          {/* Mock Browser/Device Header */}
          <div className="bg-zinc-850 px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            </div>
            <div className="px-4 py-1 rounded-md bg-zinc-950/80 text-[10px] font-mono text-zinc-400 border border-zinc-800 truncate max-w-[240px]">
              {interactiveIframeUrl || `https://preview.design/${title.toLowerCase().replace(/\s+/g, "-")}`}
            </div>
            <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
          </div>

          {/* Device Screen Body */}
          <div
            className={`relative overflow-hidden ${
              activeDevice === "mobile"
                ? "h-[580px]"
                : activeDevice === "tablet"
                ? "h-[520px]"
                : "h-[480px] sm:h-[580px]"
            }`}
          >
            {interactiveIframeUrl ? (
              <iframe
                key={iframeKey}
                src={interactiveIframeUrl}
                title={title}
                className="w-full h-full border-none"
              />
            ) : (
              <img
                src={getActiveImage()}
                alt={`${title} ${activeDevice} preview`}
                className="w-full h-full object-cover object-top transition-all duration-500"
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
