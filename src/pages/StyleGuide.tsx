import React from "react";
import { 
  ArrowRight, 
  Sparkles, 
  Layers, 
  PenTool, 
  Code, 
  Globe, 
  ChevronRight,
  Shield,
  Smartphone,
  Video,
  Monitor,
  Zap,
  Play
} from "lucide-react";

export default function StyleGuide() {
  return (
    <div className="bg-white dark:bg-[#0E0D0C] text-[#1A1A1A] dark:text-[#E4E4E7] min-h-screen pt-24 pb-32 transition-colors duration-300">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="border-b border-gray-100 dark:border-zinc-900 pb-12 mb-16 text-left">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-[11px] font-semibold text-black dark:text-white tracking-wide mb-6 uppercase">
            System Spec
          </div>
          <h1 className="font-sans text-[50px] sm:text-[70px] md:text-[80px] font-normal leading-[0.9] tracking-tighter text-black dark:text-white select-none">
            Style Guide
          </h1>
          <p className="text-gray-600 dark:text-zinc-400 text-lg sm:text-[20px] font-normal leading-relaxed max-w-2xl mt-6">
            A unified design language system representing the typography, colors, components, and interactive standards across the entire portfolio website. Use this manual to maintain absolute consistency.
          </p>
        </div>

        {/* 1. TYPOGRAPHY SYSTEM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-16 border-b border-gray-100 dark:border-zinc-900 text-left">
          <div className="lg:col-span-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">01 / TYPOGRAPHY</span>
            <h2 className="font-sans text-2xl font-normal text-black dark:text-white mt-2">
              Font Hierarchy & Pairings
            </h2>
            <p className="text-[#5F6368] dark:text-zinc-400 text-sm mt-3 leading-relaxed">
              Using elegant, modern sans-serif type scaling coupled with precise weight distribution. Standardizing screen typography eliminates fragmentation.
            </p>
          </div>
          <div className="lg:col-span-8 space-y-12">
            
            {/* Display / Large Titles */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">DISPLAY HEADLINE (HERO & HUGE TITLES) • font-normal text-[60px] sm:text-[80px] md:text-[90px] leading-[0.9] tracking-tighter</span>
              <div className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-4 py-1">
                <h3 className="font-sans text-4xl sm:text-6xl md:text-7xl font-normal leading-[0.9] tracking-tighter text-black dark:text-white">
                  Rahul Dutta Design
                </h3>
              </div>
            </div>

            {/* Section Headings */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">SECTION HEADER • font-normal text-[36px] sm:text-[44px] leading-[1.1] tracking-tight</span>
              <div className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-4 py-1">
                <h4 className="font-sans text-3xl sm:text-4xl font-normal tracking-tight text-black dark:text-white">
                  Built for developers for the agent era
                </h4>
              </div>
            </div>

            {/* Subtitles & Descriptions */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">SUBTITLE / PARAGRAPH TEXT • text-lg sm:text-[20px] font-normal leading-relaxed</span>
              <div className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-4 py-1">
                <p className="text-gray-600 dark:text-zinc-400 text-lg sm:text-[20px] font-normal leading-relaxed">
                  Every layout and pixel-perfect design system is built for user trust, whether you are a scaling startup or an individual creator.
                </p>
              </div>
            </div>

            {/* Card titles */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">CARD TITLE • text-lg sm:text-xl font-medium tracking-tight</span>
              <div className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-4 py-1">
                <h5 className="font-sans text-lg sm:text-xl font-medium text-black dark:text-white tracking-tight">
                  Full Stack Developer Case
                </h5>
              </div>
            </div>

            {/* Body & Meta */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">BODY / META TEXT • text-sm sm:text-base / text-xs sm:text-sm</span>
              <div className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-4 py-1">
                <p className="text-[#5F6368] dark:text-zinc-400 text-sm leading-relaxed mb-1">
                  Thoughts on design, code, art direction, and building digital spaces.
                </p>
                <p className="text-[11px] sm:text-xs text-[#5F6368] dark:text-zinc-500 font-sans uppercase tracking-wider">
                  09 Jan, 2026 &bull; Product Design
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 2. COLOR PALETTE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-16 border-b border-gray-100 dark:border-zinc-900 text-left">
          <div className="lg:col-span-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">02 / CHROMATICS</span>
            <h2 className="font-sans text-2xl font-normal text-black dark:text-white mt-2">
              Color Architecture
            </h2>
            <p className="text-[#5F6368] dark:text-zinc-400 text-sm mt-3 leading-relaxed">
              A high-contrast system adjusting dynamically between stark clinical white themes and deep obsidian-charcoal night frames.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              {/* Stark White */}
              <div className="flex flex-col gap-2">
                <div className="w-full aspect-square rounded-2xl bg-white border border-gray-200 shadow-sm flex items-end p-4">
                  <span className="text-xs font-mono font-bold text-black bg-white/85 px-1.5 py-0.5 rounded">#FFFFFF</span>
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-black dark:text-white">Light Background</span>
                  <span className="block text-[11px] text-zinc-400">Main light theme canvas</span>
                </div>
              </div>

              {/* Slate Dark */}
              <div className="flex flex-col gap-2">
                <div className="w-full aspect-square rounded-2xl bg-[#0E0D0C] border border-zinc-800 flex items-end p-4">
                  <span className="text-xs font-mono font-bold text-white bg-black/85 px-1.5 py-0.5 rounded">#0E0D0C</span>
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-black dark:text-white">Dark Background</span>
                  <span className="block text-[11px] text-zinc-400">Main dark theme canvas</span>
                </div>
              </div>

              {/* Stark Accent Charcoal */}
              <div className="flex flex-col gap-2">
                <div className="w-full aspect-square rounded-2xl bg-[#1A1A1A] border border-zinc-800 flex items-end p-4">
                  <span className="text-xs font-mono font-bold text-white bg-[#1A1A1A]/85 px-1.5 py-0.5 rounded">#1A1A1A</span>
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-black dark:text-white">Primary Charcoal</span>
                  <span className="block text-[11px] text-zinc-400">Display headings & main text</span>
                </div>
              </div>

              {/* Muted Border / Subtitle Gray */}
              <div className="flex flex-col gap-2">
                <div className="w-full aspect-square rounded-2xl bg-[#5F6368] flex items-end p-4">
                  <span className="text-xs font-mono font-bold text-white bg-black/45 px-1.5 py-0.5 rounded">#5F6368</span>
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-black dark:text-white">Muted Gray Accent</span>
                  <span className="block text-[11px] text-zinc-400">Subtitles, secondary labels & borders</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 3. INTERACTIVE COMPONENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-16 border-b border-gray-100 dark:border-zinc-900 text-left">
          <div className="lg:col-span-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">03 / ATOMICS</span>
            <h2 className="font-sans text-2xl font-normal text-black dark:text-white mt-2">
              Action Components & Badges
            </h2>
            <p className="text-[#5F6368] dark:text-zinc-400 text-sm mt-3 leading-relaxed">
              Standardized interaction feedback elements. All triggers use smooth timing curves and precise border alignments.
            </p>
          </div>
          <div className="lg:col-span-8 space-y-10">
            
            {/* Buttons Row */}
            <div className="space-y-4">
              <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">STANDARD CTA BUTTONS</span>
              <div className="flex flex-wrap gap-4 items-center">
                <button className="px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-bold tracking-tight shadow-sm cursor-pointer transition-colors">
                  Solid Primary Action
                </button>
                <button className="px-6 py-3 rounded-full border border-gray-300 dark:border-zinc-700 text-xs font-bold tracking-tight text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
                  Secondary Border Action
                </button>
                <button className="px-5 py-2 border border-transparent bg-black dark:bg-white text-white dark:text-black hover:bg-[#1A1A1A] dark:hover:bg-zinc-200 rounded-full text-xs font-semibold transition-colors cursor-pointer shadow-sm uppercase tracking-wider">
                  Capsule Accent Trigger
                </button>
              </div>
            </div>

            {/* Badges and pills */}
            <div className="space-y-4">
              <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">SYSTEM PILLS & BADGES</span>
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-[11px] font-semibold text-black dark:text-white tracking-wide uppercase">
                  Portfolio & Creative Showcase
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-[11px] font-semibold text-black dark:text-white tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white animate-pulse" />
                  <span>Interactive Services</span>
                </div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#EFEFEA] hover:bg-[#e4e4dd] dark:bg-zinc-900 dark:hover:bg-zinc-800 text-[#3C4043] dark:text-zinc-300 rounded-full text-xs font-sans font-medium transition-all cursor-default border border-transparent dark:border-zinc-850">
                  <span className="w-2 h-2 rounded-full bg-[#757575]" />
                  <span>Standard Tag Detail</span>
                </span>
              </div>
            </div>

            {/* Standard Inline Triggers */}
            <div className="space-y-4">
              <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">INLINE NAV LINK TRIGGERS</span>
              <div className="flex flex-wrap gap-8">
                <button className="inline-flex items-center text-sm text-[#5F6368] dark:text-zinc-400 hover:text-black dark:hover:text-white font-sans transition-colors cursor-pointer">
                  Read Case Study <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </button>
                <button className="text-xs sm:text-[13px] font-sans text-[#1A1A1A] dark:text-zinc-300 hover:text-zinc-500 transition-colors cursor-pointer">
                  Standard Link Accent
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 4. LAYOUTS & MOCK CARD MODULES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-16 border-b border-gray-100 dark:border-zinc-900 text-left">
          <div className="lg:col-span-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">04 / MOLECULES</span>
            <h2 className="font-sans text-2xl font-normal text-black dark:text-white mt-2">
              Cards & Layout Structures
            </h2>
            <p className="text-[#5F6368] dark:text-zinc-400 text-sm mt-3 leading-relaxed">
              Standard module structure showing the updated typography size alignments. Card descriptions are styled for maximum readability.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              {/* Community Case Card Mockup */}
              <div className="flex flex-col gap-4 text-left border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 bg-gray-50/50 dark:bg-zinc-900/20">
                <div className="aspect-[1.5] rounded-2xl bg-[#E8EAED] dark:bg-zinc-800 overflow-hidden flex items-center justify-center relative">
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">HiFi Portfolio Media</span>
                  <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Play className="w-3 h-3 fill-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-sans text-lg sm:text-xl font-medium text-black dark:text-white tracking-tight">
                    Full Stack Developer
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-[#5F6368] dark:text-zinc-400 leading-relaxed">
                    Build production-ready applications with confidence with thoroughly designed artifacts and comprehensive verification tests.
                  </p>
                  <div className="pt-3">
                    <button className="inline-flex items-center text-sm sm:text-base text-[#5F6368] dark:text-zinc-400 hover:text-black dark:hover:text-white font-sans transition-colors cursor-pointer">
                      View case <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Blog Module Mockup */}
              <div className="flex flex-col justify-between h-full border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 bg-gray-50/50 dark:bg-zinc-900/20">
                <div>
                  <div className="aspect-video rounded-2xl bg-[#111113] overflow-hidden flex items-center justify-center p-4">
                    <span className="text-xs font-mono font-bold text-zinc-600">BLOG MEDIA</span>
                  </div>
                  <div className="pt-4 text-left">
                    <h3 className="font-sans text-lg sm:text-[20px] font-medium leading-[1.25] text-black dark:text-white tracking-tight line-clamp-2">
                      Introducing Portfolio 2.0 and agent networks
                    </h3>
                    <div className="mt-2 text-xs sm:text-sm text-[#5F6368] dark:text-zinc-400 font-sans">
                      May 19, 2026 &bull; Product Design
                    </div>
                  </div>
                </div>
                <div className="pt-4 text-left border-t border-gray-150/10 dark:border-zinc-800/10 mt-4">
                  <button className="inline-flex items-center text-sm sm:text-base text-[#5F6368] dark:text-zinc-400 hover:text-black dark:hover:text-white font-sans transition-colors cursor-pointer">
                    Read blog <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 5. LAYOUT GRID SYSTEM SPECIFICATIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-16 text-left">
          <div className="lg:col-span-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">05 / GRID</span>
            <h2 className="font-sans text-2xl font-normal text-black dark:text-white mt-2">
              Reference Grid &amp; Columns
            </h2>
            <p className="text-[#5F6368] dark:text-zinc-400 text-sm mt-3 leading-relaxed">
              Our layout uses a fluid responsive design framing system aligning elements within a modern maximum-width container with uniform spacing rules.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="space-y-8">
              {/* Visual 12-Column Grid Demo */}
              <div className="space-y-4">
                <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">12-COLUMN RESPONSIVE LAYOUT SYSTEM</span>
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-3 p-4 border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/30">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="h-16 rounded-xl bg-white dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-center font-mono text-[10px] text-zinc-500 dark:text-zinc-400 font-bold">
                      C{i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bento Grid Layout Variations */}
              <div className="space-y-4 pt-4">
                <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">BENTO GRID PROPORTIONS (3-COLUMN / 4-COLUMN)</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-[#121212] flex flex-col justify-between h-28 shadow-2xs">
                    <span className="text-[10px] font-mono text-zinc-400">SPAN 1 / 3</span>
                    <span className="text-xs font-semibold text-black dark:text-zinc-300">Standard Grid Card</span>
                  </div>
                  <div className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-[#121212] flex flex-col justify-between h-28 md:col-span-2 shadow-2xs">
                    <span className="text-[10px] font-mono text-zinc-400">SPAN 2 / 3</span>
                    <span className="text-xs font-semibold text-black dark:text-zinc-300">Expanded Feature Display</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
