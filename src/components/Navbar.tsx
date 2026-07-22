/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, LogOut, Search, Calendar, PhoneCall, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SiteConfig } from "../types";

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean, event?: React.MouseEvent) => void;
  isAdmin: boolean;
  logout: () => void;
  siteConfig: SiteConfig | null;
  onOpenBooking?: () => void;
  onOpenCommandPalette?: () => void;
  blogActiveTab: "solutions" | "architecture" | "reviews";
  setBlogActiveTab: (tab: "solutions" | "architecture" | "reviews") => void;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  darkMode,
  setDarkMode,
  isAdmin,
  logout,
  siteConfig,
  onOpenBooking,
  onOpenCommandPalette,
  blogActiveTab,
  setBlogActiveTab
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: "solutions", label: siteConfig?.navItem1Text || "Expertise" },
    { id: "architecture", label: siteConfig?.navItem2Text || "Case Studies" },
    { id: "reviews", label: siteConfig?.navItem3Text || "Testimonials" }
  ];

  const handleNavClick = (itemId: "solutions" | "architecture" | "reviews") => {
    setCurrentPage("blog");
    setBlogActiveTab(itemId);
    setIsOpen(false);
  };

  const isItemActive = (itemId: string) => {
    return currentPage === "blog" && blogActiveTab === itemId;
  };

  const handleCtaClick = () => {
    if (isAdmin) {
      setCurrentPage("admin");
      console.log("Navigated to Admin Dashboard Console.");
    } else {
      const actionType = siteConfig?.navCtaActionType || "modal";
      if (actionType === "modal") {
        if (onOpenBooking) {
          onOpenBooking();
        }
      } else {
        const link = siteConfig?.navCtaLink || "contact";
        if (link.startsWith("http://") || link.startsWith("https://")) {
          window.open(link, "_blank");
        } else {
          setCurrentPage(link);
        }
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "py-4 bg-white/85 dark:bg-[#0E0D0C]/85 backdrop-blur-md shadow-sm"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div className="relative flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] h-12 md:h-14">
            
            {/* Brand Logo */}
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={() => {
                  setCurrentPage("home");
                  setIsOpen(false);
                }}
                className="font-sans font-bold text-xl tracking-tight text-black dark:text-white flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="font-sans font-extrabold text-black dark:text-white">
                  {siteConfig?.brandName || "Rahul"}
                </span>
              </button>
            </div>

            {/* Center Navigation Links - hidden on mobile, compact on scroll */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center space-x-2.5 lg:space-x-8 whitespace-nowrap">
              {menuItems.map((item) => {
                const active = isItemActive(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id as any)}
                    className={`font-sans text-xs lg:text-[13px] transition-all duration-200 cursor-pointer relative py-1 ${
                      active
                        ? "text-black dark:text-white font-semibold"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white font-medium"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="navActiveIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-black dark:bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Side: 1st Search, 2nd Theme, 3rd CTA Button */}
            <div className="hidden md:flex items-center space-x-1.5 lg:space-x-2 shrink-0 relative z-20">
              {/* 1st: Search Button */}
              <button
                onClick={() => onOpenCommandPalette && onOpenCommandPalette()}
                className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-800 dark:text-zinc-200 hover:bg-gray-100/80 dark:hover:bg-zinc-900/80 cursor-pointer transition-colors shrink-0"
                title="Search (Cmd+K)"
              >
                <Search className="w-4 h-4 text-zinc-600 dark:text-zinc-400 stroke-[2.2]" />
              </button>

              {/* 2nd: Theme Toggle */}
              <button
                onClick={(e) => setDarkMode(!darkMode, e)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-800 dark:text-zinc-200 hover:bg-gray-100/80 dark:hover:bg-zinc-900/80 cursor-pointer transition-colors shrink-0"
                title="Toggle theme"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-amber-500 stroke-[2.2]" />
                ) : (
                  <Moon className="w-4 h-4 text-zinc-600 dark:text-zinc-400 stroke-[2.2]" />
                )}
              </button>

              {/* Logout button (icon only, theme-style styled) when isAdmin is true */}
              {isAdmin && (
                <button
                  onClick={logout}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-800 dark:text-zinc-200 hover:bg-gray-100/80 dark:hover:bg-zinc-900/80 cursor-pointer transition-colors shrink-0"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 text-rose-500 dark:text-rose-400 stroke-[2.2]" />
                </button>
              )}

              {/* 3rd: Book a Call / CTA Button (With Calendar Icon) */}
              {!isAdmin && siteConfig?.navCtaActionType === "url" && (siteConfig?.navCtaLink?.startsWith("http://") || siteConfig?.navCtaLink?.startsWith("https://")) ? (
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={siteConfig.navCtaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-[#030303] dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-bold tracking-tight shadow-sm border border-transparent cursor-pointer transition-colors text-center shrink-0"
                >
                  <Calendar className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>{siteConfig?.navCtaText || "Book a Call"}</span>
                </motion.a>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCtaClick}
                  className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-[#030303] dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-bold tracking-tight shadow-sm border border-transparent cursor-pointer transition-colors shrink-0"
                >
                  <Calendar className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>{isAdmin ? "Dashboard" : (siteConfig?.navCtaText || "Book a Call")}</span>
                </motion.button>
              )}
            </div>

             {/* Mobile Menu Buttons */}
            <div className="flex md:hidden items-center space-x-2">
              {/* Mobile Search Button */}
              <button
                onClick={() => onOpenCommandPalette && onOpenCommandPalette()}
                className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100/80 dark:hover:bg-zinc-900/80 cursor-pointer transition-colors"
                title="Search"
              >
                <Search className="w-4.5 h-4.5 text-zinc-600 dark:text-zinc-400 stroke-[2.2]" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={(e) => setDarkMode(!darkMode, e)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100/80 dark:hover:bg-zinc-900/80 cursor-pointer transition-colors"
                title="Toggle theme"
              >
                {darkMode ? (
                  <Sun className="w-4.5 h-4.5 text-amber-500 stroke-[2.2]" />
                ) : (
                  <Moon className="w-4.5 h-4.5 text-zinc-600 dark:text-zinc-400 stroke-[2.2]" />
                )}
              </button>

              {/* Mobile Logout if isAdmin */}
              {isAdmin && (
                <button
                  onClick={logout}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100/80 dark:hover:bg-zinc-900/80 cursor-pointer transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 text-rose-500 dark:text-rose-400 stroke-[2.2]" />
                </button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white hover:text-black dark:hover:text-black transition-all duration-200 cursor-pointer"
              >
                {isOpen ? <X className="w-5 h-5 stroke-[2.2]" /> : <Menu className="w-5 h-5 stroke-[2.2]" />}
              </motion.button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[96px] z-40 mx-4 p-4 rounded-3xl border border-zinc-200/50 dark:border-zinc-800 bg-white/95 dark:bg-[#0E0D0C]/95 backdrop-blur-lg shadow-xl md:hidden"
          >
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => {
                const active = isItemActive(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id as any)}
                    className={`w-full text-left px-5 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                      active
                        ? "text-black dark:text-white bg-zinc-100 dark:bg-zinc-900"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <div className="pt-4 border-t border-gray-100 dark:border-zinc-800/80 flex flex-col space-y-2.5">
                {!isAdmin && siteConfig?.navCtaActionType === "url" && (siteConfig?.navCtaLink?.startsWith("http://") || siteConfig?.navCtaLink?.startsWith("https://")) ? (
                  <a
                    href={siteConfig.navCtaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-bold text-center transition-all hover:opacity-95 cursor-pointer shadow-sm block text-center"
                  >
                    {siteConfig?.navCtaText || "Get started"}
                  </a>
                ) : (
                  <button
                    onClick={handleCtaClick}
                    className="w-full py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-bold text-center transition-all hover:opacity-95 cursor-pointer shadow-sm"
                  >
                    {isAdmin ? "Dashboard" : (siteConfig?.navCtaText || "Get started")}
                  </button>
                )}
                {isAdmin && (
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full py-3.5 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-sm font-bold text-center transition-all hover:opacity-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 stroke-[2.2]" />
                    Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
