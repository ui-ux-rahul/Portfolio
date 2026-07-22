/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  Search, 
  X, 
  Command, 
  Briefcase, 
  FolderKanban, 
  BookOpen, 
  Calendar, 
  Download, 
  Sun, 
  Moon, 
  Mail, 
  Check, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Palette,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project, FeaturedProject, BlogPost, ServiceItem } from "../types";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  featuredProjects: FeaturedProject[];
  blogPosts: BlogPost[];
  services: ServiceItem[];
  onNavigate: (page: string) => void;
  onSelectProject: (project: any) => void;
  onOpenBooking: () => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigation" | "Projects" | "Articles" | "Services" | "Quick Actions";
  icon: React.ReactNode;
  action: () => void;
  badge?: string;
}

export default function CommandPalette({
  isOpen,
  onClose,
  projects = [],
  featuredProjects = [],
  blogPosts = [],
  services = [],
  onNavigate,
  onSelectProject,
  onOpenBooking,
  darkMode,
  setDarkMode,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Handle global Cmd+K or Ctrl+K key binding
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or state
          window.dispatchEvent(new CustomEvent("open-command-palette"));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("workprofile.uiux@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleDownloadResume = () => {
    window.open("/Rahul_Dutta_Resume.pdf", "_blank");
    onClose();
  };

  // Construct items list dynamically
  const allItems: CommandItem[] = [
    // Quick Actions
    {
      id: "act-book",
      title: "Book Consultation Session",
      subtitle: "Schedule a 1:1 strategy call with Rahul",
      category: "Quick Actions",
      icon: <Calendar className="w-4 h-4 text-[#4285F4]" />,
      badge: "Instant",
      action: () => {
        onOpenBooking();
        onClose();
      }
    },
    {
      id: "act-resume",
      title: "Download Resume PDF",
      subtitle: "Official 2026 Product Designer Resume",
      category: "Quick Actions",
      icon: <Download className="w-4 h-4 text-emerald-500" />,
      badge: "PDF",
      action: handleDownloadResume
    },
    {
      id: "act-theme",
      title: darkMode ? "Switch to Light Mode" : "Switch to Dark Mode",
      subtitle: "Toggle display contrast theme",
      category: "Quick Actions",
      icon: darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />,
      action: () => {
        setDarkMode(!darkMode);
        onClose();
      }
    },
    {
      id: "act-email",
      title: copiedEmail ? "Email Address Copied!" : "Copy Email Address",
      subtitle: "workprofile.uiux@gmail.com",
      category: "Quick Actions",
      icon: copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Mail className="w-4 h-4 text-blue-500" />,
      badge: copiedEmail ? "Copied" : "Click",
      action: handleCopyEmail
    },

    // Navigation
    {
      id: "nav-home",
      title: "Go to Home",
      subtitle: "Main hero, metrics & portfolio preview",
      category: "Navigation",
      icon: <Sparkles className="w-4 h-4 text-purple-500" />,
      action: () => {
        onNavigate("home");
        onClose();
      }
    },
    {
      id: "nav-expertise",
      title: "Go to Expertise & Services",
      subtitle: "SaaS architecture, UI/UX & Design Systems",
      category: "Navigation",
      icon: <Layers className="w-4 h-4 text-amber-500" />,
      action: () => {
        onNavigate("solutions");
        onClose();
      }
    },
    {
      id: "nav-case-studies",
      title: "Go to Case Studies",
      subtitle: "In-depth design process & product breakdowns",
      category: "Navigation",
      icon: <FolderKanban className="w-4 h-4 text-indigo-500" />,
      action: () => {
        onNavigate("architecture");
        onClose();
      }
    },
    {
      id: "nav-testimonials",
      title: "Go to Testimonials & Reviews",
      subtitle: "Client feedback & industry recommendations",
      category: "Navigation",
      icon: <BookOpen className="w-4 h-4 text-rose-500" />,
      action: () => {
        onNavigate("reviews");
        onClose();
      }
    },
    {
      id: "nav-style-guide",
      title: "View Design System Style Guide",
      subtitle: "Typography tokens, color swatches & layout rules",
      category: "Navigation",
      icon: <Palette className="w-4 h-4 text-teal-500" />,
      action: () => {
        onNavigate("style-guide");
        onClose();
      }
    },
    {
      id: "nav-admin",
      title: "Admin Dashboard Console",
      subtitle: "Content CMS & Inquiry CRM",
      category: "Navigation",
      icon: <ShieldCheck className="w-4 h-4 text-zinc-500" />,
      badge: "Admin",
      action: () => {
        onNavigate("admin");
        onClose();
      }
    },

    // Featured Projects
    ...featuredProjects.map((fp) => ({
      id: `fp-${fp.id}`,
      title: fp.title,
      subtitle: fp.category + (fp.tagline ? ` — ${fp.tagline}` : ""),
      category: "Projects" as const,
      icon: <FolderKanban className="w-4 h-4 text-[#4285F4]" />,
      badge: "Case Study",
      action: () => {
        onSelectProject(fp);
        onClose();
      }
    })),

    // Standard Projects
    ...projects.map((p) => ({
      id: `p-${p.id}`,
      title: p.title,
      subtitle: `${p.category} — ${p.description.substring(0, 60)}...`,
      category: "Projects" as const,
      icon: <Briefcase className="w-4 h-4 text-[#34A853]" />,
      action: () => {
        if (p.liveLink && (p.liveLink.startsWith("http://") || p.liveLink.startsWith("https://"))) {
          window.open(p.liveLink, "_blank");
        } else {
          onSelectProject(p);
        }
        onClose();
      }
    })),

    // Services / Expertise
    ...services.map((s) => ({
      id: `s-${s.id}`,
      title: `${s.step} ${s.title}`,
      subtitle: s.description.substring(0, 70) + "...",
      category: "Services" as const,
      icon: <Layers className="w-4 h-4 text-amber-500" />,
      action: () => {
        onNavigate("solutions");
        onClose();
      }
    }))
  ];

  // Filter items by query
  const filteredItems = allItems.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  });

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  // Auto scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 sm:p-6 pt-16 sm:pt-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
        />

        {/* Command Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-[28px] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]"
          onKeyDown={handleKeyDown}
        >
          {/* Search Header Bar */}
          <div className="relative flex items-center px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/80 shrink-0">
            <Search className="w-5 h-5 text-zinc-400 shrink-0 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search projects, case studies, pages, or actions... (Try 'Resume' or 'Book')"
              className="w-full bg-transparent text-sm font-sans font-medium text-black dark:text-white placeholder-zinc-400 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 mr-2 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-lg text-[10px] font-mono font-semibold uppercase hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer transition-colors"
            >
              ESC
            </button>
          </div>

          {/* Results List */}
          <div ref={listRef} className="overflow-y-auto p-3 space-y-1.5 flex-1 max-h-[60vh] scrollbar-thin">
            {filteredItems.length === 0 ? (
              <div className="p-12 text-center text-zinc-400 text-xs font-sans">
                No matching results found for "<span className="text-black dark:text-white font-semibold">{query}</span>". Try searching for "Book", "Resume", or "Case Studies".
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={item.id}
                    data-index={idx}
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer transition-all duration-150 group min-h-[44px] ${
                      isSelected
                        ? "bg-[#1A1A1A] text-white dark:bg-white dark:text-black shadow-sm"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 pr-2">
                      <div className={`p-2 rounded-xl transition-colors shrink-0 ${
                        isSelected 
                          ? "bg-white/10 dark:bg-black/10 text-white dark:text-black" 
                          : "bg-zinc-100 dark:bg-zinc-800/80"
                      }`}>
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="font-sans text-xs font-bold truncate tracking-tight flex items-center gap-2">
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider font-bold ${
                              isSelected
                                ? "bg-white/20 text-white dark:bg-black/20 dark:text-black"
                                : "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <div className={`text-[11px] truncate mt-0.5 ${
                            isSelected ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-500 dark:text-zinc-400"
                          }`}>
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${
                        isSelected ? "text-white dark:text-black" : "text-zinc-400 opacity-0 group-hover:opacity-100"
                      }`} />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Keyboard Guide */}
          <div className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/40 text-[10px] text-zinc-400 flex items-center justify-between shrink-0 font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-sans shadow-2xs">↑↓</kbd> navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-sans shadow-2xs">↵</kbd> select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-sans shadow-2xs">esc</kbd> close
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold text-zinc-400">
              <Command className="w-3 h-3" /> Quick Search
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
