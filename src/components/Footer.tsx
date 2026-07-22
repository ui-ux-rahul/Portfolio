import React from "react";
import { SiteConfig } from "../types";

interface FooterProps {
  setCurrentPage: (page: string) => void;
  isAdmin: boolean;
  siteConfig: SiteConfig | null;
}

export default function Footer({ setCurrentPage, isAdmin, siteConfig }: FooterProps) {
  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("editorial-hero");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      setCurrentPage("home");
      setTimeout(() => {
        document.getElementById("editorial-hero")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const renderLink = (link: { label: string; url: string }, index: number) => {
    const url = link.url || "#";
    if (url.endsWith(".pdf") || url.includes(".pdf") || url.includes("download-resume")) {
      return (
        <a
          key={index}
          href={url}
          download="Rahul_Dutta_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-[13px] font-sans text-[#1A1A1A] dark:text-zinc-300 hover:text-zinc-500 dark:hover:text-white transition-colors text-center md:text-left inline-flex items-center gap-1"
        >
          {link.label}
          <svg className="w-3 h-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        </a>
      );
    }
    if (url === "blog") {
      return (
        <button
          key={index}
          onClick={() => setCurrentPage("blog")}
          className="text-xs sm:text-[13px] font-sans text-[#1A1A1A] dark:text-zinc-300 hover:text-zinc-500 dark:hover:text-white transition-colors cursor-pointer text-center md:text-left"
        >
          {link.label}
        </button>
      );
    }
    if (url === "style-guide") {
      return (
        <button
          key={index}
          onClick={() => setCurrentPage("style-guide")}
          className="text-xs sm:text-[13px] font-sans text-[#1A1A1A] dark:text-zinc-300 hover:text-zinc-500 dark:hover:text-white transition-colors cursor-pointer text-center md:text-left"
        >
          {link.label}
        </button>
      );
    }
    if (url.startsWith("#")) {
      return (
        <a
          key={index}
          href={url}
          onClick={(e) => {
            if (url === "#editorial-hero") {
              handleAboutClick(e);
            }
          }}
          className="text-xs sm:text-[13px] font-sans text-[#1A1A1A] dark:text-zinc-300 hover:text-zinc-500 dark:hover:text-white transition-colors text-center md:text-left"
        >
          {link.label}
        </a>
      );
    }
    if (url.startsWith("http")) {
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-[13px] font-sans text-[#1A1A1A] dark:text-zinc-300 hover:text-zinc-500 dark:hover:text-white transition-colors text-center md:text-left"
        >
          {link.label}
        </a>
      );
    }
    return (
      <button
        key={index}
        onClick={() => setCurrentPage(url)}
        className="text-xs sm:text-[13px] font-sans text-[#1A1A1A] dark:text-zinc-300 hover:text-zinc-500 dark:hover:text-white transition-colors cursor-pointer text-center md:text-left"
      >
        {link.label}
      </button>
    );
  };

  const renderSocialLink = (link: { label: string; url: string }, index: number) => {
    const url = link.url || "#";
    if (url.startsWith("#")) {
      return (
        <a
          key={index}
          href={url}
          onClick={(e) => {
            if (url === "#editorial-hero") {
              handleAboutClick(e);
            }
          }}
          className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors text-center md:text-left animate-fadeIn"
        >
          {link.label}
        </a>
      );
    }
    if (url.startsWith("http")) {
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors text-center md:text-left animate-fadeIn"
        >
          {link.label}
        </a>
      );
    }
    return (
      <button
        key={index}
        onClick={() => setCurrentPage(url)}
        className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors cursor-pointer text-center md:text-left"
      >
        {link.label}
      </button>
    );
  };

  // Fallback defaults
  const defaultCol1Links = [
    { label: "Download", url: "#" },
    { label: "Product", url: "#" },
    { label: "Docs", url: "#" },
    { label: "Changelog", url: "#" },
    { label: "Press", url: "#" },
    { label: "Releases", url: "#" }
  ];

  const defaultCol2Links = [
    { label: "Blog", url: "blog" },
    { label: "Pricing", url: "#" },
    { label: "Style Guide", url: "style-guide" }
  ];

  const defaultCol3Links = [
    { label: "Security", url: "#" },
    { label: "Status", url: "#" },
    { label: "Terms", url: "#" },
    { label: "Privacy", url: "#" }
  ];

  const defaultSocialLinks = [
    { label: "About Rahul", url: "#editorial-hero" },
    { label: "Fiverr", url: "https://www.fiverr.com/s/akRBXg8" },
    { label: "Behance", url: "https://www.behance.net/ui-ux-rahul" },
    { label: "Linkedin", url: "https://www.linkedin.com/in/ui-ux-rahul/" }
  ];

  const col1Links = siteConfig?.footerCol1Links || defaultCol1Links;
  const col2Links = siteConfig?.footerCol2Links || defaultCol2Links;
  const col3Links = siteConfig?.footerCol3Links || defaultCol3Links;
  const socialLinks = siteConfig?.footerSocialLinks || defaultSocialLinks;

  return (
    <footer className="relative z-10 bg-transparent py-24 transition-colors duration-300 border-t border-gray-100 dark:border-zinc-900/60">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top section: Heading & Link columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start mb-16 text-center md:text-left">
          <div className="md:col-span-6">
            <h2 className="font-sans text-2xl sm:text-[28px] font-medium tracking-tight text-[#1A1A1A] dark:text-white">
              {siteConfig?.footerHeading || "Experience liftoff"}
            </h2>
          </div>
          <div className="md:col-span-6 grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center md:items-start space-y-3">
              {col1Links.map((link, idx) => renderLink(link, idx))}
            </div>
            <div className="flex flex-col items-center md:items-start space-y-3">
              {col2Links.map((link, idx) => renderLink(link, idx))}
            </div>
            <div className="flex flex-col items-center md:items-start space-y-3">
              {col3Links.map((link, idx) => renderLink(link, idx))}
            </div>
          </div>
        </div>

        {/* Giant display wordmark (Centered, wrapping avoided, fully responsive) */}
        <div className="select-none py-6 sm:py-10 overflow-hidden leading-none text-center flex flex-col items-center justify-center w-full">
          <h1 className="font-sans font-bold text-[13vw] sm:text-[13.5vw] md:text-[14.5vw] tracking-[-0.05em] leading-[0.8] text-[#1A1A1A] dark:text-white w-full text-center whitespace-nowrap overflow-hidden select-none">
            {siteConfig?.footerWordmark || "Rahul Dutta"}
          </h1>
        </div>

        {/* Bottom bar: Brand Description & Footer navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 mt-10 border-t border-gray-100 dark:border-zinc-900 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start w-full md:w-auto text-center md:text-left">
            <span className="font-sans font-semibold text-[15px] sm:text-[17px] tracking-tight text-[#1A1A1A] dark:text-white">
              {siteConfig?.footerDescription || "UI/UX Product Designer & Frontend Technologist"}
            </span>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-[11px] sm:text-xs text-[#5F6368] dark:text-zinc-400 font-sans w-full md:w-auto">
            <button 
              onClick={() => setCurrentPage(isAdmin ? "admin" : "login")}
              className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors cursor-pointer text-center md:text-left"
            >
              Console
            </button>
            {socialLinks.map((link, idx) => renderSocialLink(link, idx))}
          </div>
        </div>

      </div>
    </footer>
  );
}
