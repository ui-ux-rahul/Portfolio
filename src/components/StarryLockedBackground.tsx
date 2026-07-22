import React from "react";
import importedBg from "../assets/images/saas-landing-page-ui-ux-designer-background.webp";

// Always fallback to static public asset path for production SSR & static serving
const backgroundImage = importedBg || "/assets/images/saas-landing-page-ui-ux-designer-background.webp";

export default function StarryLockedBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* 1. Base Layer for Light Mode: Pristine bright off-white canvas */}
      <div className="absolute inset-0 bg-[#FAFAFA] dark:hidden" />
      
      {/* 2. Base Layer for Dark Mode */}
      <div className="absolute inset-0 bg-[#0E0D0C] hidden dark:block" />

      {/* 3. Dark Mode Background: 100% crisp visibility */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out opacity-0 dark:opacity-100"
        style={{
          backgroundImage: `url("${backgroundImage}"), url("/assets/images/saas-landing-page-ui-ux-designer-background.webp")`,
        }}
      />
      
      {/* 4. Light Mode Background: Ultra subtle soft light accent */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out opacity-[0.03] dark:opacity-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("${backgroundImage}"), url("/assets/images/saas-landing-page-ui-ux-designer-background.webp")`,
        }}
      />
      
      {/* 5. Minimalistic Organic Grain Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.85 0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}
