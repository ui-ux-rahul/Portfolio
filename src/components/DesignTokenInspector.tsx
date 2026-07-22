import React, { useState } from "react";
import { Check, Copy, Layers, Palette, Type, Sliders, Sparkles } from "lucide-react";

interface ColorToken {
  name: string;
  hex: string;
}

interface DesignTokenInspectorProps {
  colors?: ColorToken[];
  typographyFont?: string;
  typographyScale?: { level: string; size: string; weight: string }[];
  spacingScale?: { name: string; px: string }[];
}

export const DesignTokenInspector: React.FC<DesignTokenInspectorProps> = ({
  colors = [
    { name: "Primary Brand", hex: "#0F172A" },
    { name: "Accent Blue", hex: "#2563EB" },
    { name: "Emerald Signal", hex: "#10B981" },
    { name: "Neutral Canvas", hex: "#F8FAFC" },
  ],
  typographyFont = "Plus Jakarta Sans / Inter",
  typographyScale = [
    { level: "Display H1", size: "48px / 3rem", weight: "700 Bold" },
    { level: "Heading H2", size: "32px / 2rem", weight: "600 SemiBold" },
    { level: "Subtitle H3", size: "20px / 1.25rem", weight: "500 Medium" },
    { level: "Body Text", size: "16px / 1rem", weight: "400 Regular" },
  ],
  spacingScale = [
    { name: "xs", px: "4px" },
    { name: "sm", px: "8px" },
    { name: "md", px: "16px" },
    { name: "lg", px: "24px" },
    { name: "xl", px: "32px" },
    { name: "2xl", px: "48px" },
  ],
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"colors" | "typography" | "components" | "spacing">("colors");
  const [btnState, setBtnState] = useState<"default" | "hover" | "active" | "disabled">("default");

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <div className="w-full bg-white dark:bg-[#1C1B19] p-6 sm:p-10 rounded-[32px] border border-zinc-200/60 dark:border-zinc-800/60 shadow-lg select-none">
      
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200/60 dark:border-zinc-800/40 bg-gray-50/50 dark:bg-zinc-900/50 text-[11px] font-semibold text-black dark:text-white uppercase tracking-wider mb-2">
            Design System Specs
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-black dark:text-white">
            Live Design Token Inspector
          </h3>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-2 bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setActiveTab("colors")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "colors"
                ? "bg-black dark:bg-white text-white dark:text-black shadow-md"
                : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Colors</span>
          </button>
          <button
            onClick={() => setActiveTab("typography")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "typography"
                ? "bg-black dark:bg-white text-white dark:text-black shadow-md"
                : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>Typography</span>
          </button>
          <button
            onClick={() => setActiveTab("spacing")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "spacing"
                ? "bg-black dark:bg-white text-white dark:text-black shadow-md"
                : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Spacing</span>
          </button>
          <button
            onClick={() => setActiveTab("components")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "components"
                ? "bg-black dark:bg-white text-white dark:text-black shadow-md"
                : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Component States</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Color Palette */}
      {activeTab === "colors" && (
        <div className="space-y-6">
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans">
            Click any color token swatch to copy its HEX value directly to your clipboard.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {colors.map((c, idx) => (
              <div
                key={idx}
                onClick={() => copyToClipboard(c.hex)}
                className="group relative flex flex-col p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-all cursor-pointer shadow-2xs"
              >
                <div
                  className="w-full aspect-square rounded-xl shadow-inner border border-black/10 dark:border-white/10 mb-3 relative overflow-hidden"
                  style={{ backgroundColor: c.hex }}
                >
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                    {copiedHex === c.hex ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy HEX
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-black dark:text-white font-sans">{c.name}</h5>
                    <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase mt-0.5">{c.hex}</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                    AAA
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Typography */}
      {activeTab === "typography" && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-zinc-500 uppercase">Primary Font Family</span>
            <span className="text-sm font-bold text-black dark:text-white font-sans">{typographyFont}</span>
          </div>

          <div className="space-y-4">
            {typographyScale.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono font-bold text-zinc-400">{item.level}</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                      {item.size} • {item.weight}
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-black dark:text-white font-sans tracking-tight">
                    The quick brown fox jumps over the lazy dog
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Spacing Scale */}
      {activeTab === "spacing" && (
        <div className="space-y-6">
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans">
            Consistent spacing system based on a strict 4px/8px modular grid.
          </p>
          <div className="space-y-3">
            {spacingScale.map((s, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center gap-4"
              >
                <div className="w-20 text-xs font-mono font-bold text-zinc-500">{s.name} ({s.px})</div>
                <div className="flex-1 bg-zinc-200 dark:bg-zinc-800 h-6 rounded-md overflow-hidden relative">
                  <div
                    className="bg-black dark:bg-white h-full transition-all duration-300"
                    style={{ width: `calc(${parseInt(s.px) || 8} * 4px)` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Component States */}
      {activeTab === "components" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans">
              Test interactive UI component micro-states. Select state below to inspect visual styling.
            </p>
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full border border-zinc-200 dark:border-zinc-800">
              {(["default", "hover", "active", "disabled"] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setBtnState(st)}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono capitalize transition-all cursor-pointer ${
                    btnState === st
                      ? "bg-black dark:bg-white text-white dark:text-black font-bold"
                      : "text-zinc-500 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="p-10 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[180px]">
            {/* Primary Fluid Button Preview */}
            <button
              disabled={btnState === "disabled"}
              className={`px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                btnState === "default"
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-md hover:scale-105"
                  : btnState === "hover"
                  ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black scale-105 shadow-lg"
                  : btnState === "active"
                  ? "bg-black text-white dark:bg-white dark:text-black scale-95 ring-4 ring-blue-500/30"
                  : "bg-zinc-300 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-600 cursor-not-allowed opacity-60"
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Primary CTA ({btnState})</span>
              </span>
            </button>

            {/* Secondary Glass Button Preview */}
            <button
              disabled={btnState === "disabled"}
              className={`px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider border transition-all duration-200 ${
                btnState === "default"
                  ? "border-black/20 text-black dark:border-white/20 dark:text-white"
                  : btnState === "hover"
                  ? "bg-black/10 text-black dark:bg-white/10 dark:text-white border-black dark:border-white"
                  : btnState === "active"
                  ? "bg-black/20 text-black dark:bg-white/20 dark:text-white scale-95"
                  : "border-zinc-200 text-zinc-400 dark:border-zinc-800 dark:text-zinc-600 cursor-not-allowed opacity-60"
              }`}
            >
              Secondary Outline
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
