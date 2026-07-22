/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { FeaturedProject, RecentWork, Testimonial, SiteConfig } from "../types";
import { Sparkles, ArrowUpRight, Star, Quote, Eye, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import FAQSection from "../components/FAQSection";
import BottomCTASection from "../components/BottomCTASection";

interface BlogProps {
  featuredProjects?: FeaturedProject[];
  recentWorks?: RecentWork[];
  testimonials: Testimonial[];
  activeTab: "solutions" | "architecture" | "reviews";
  setActiveTab: (tab: "solutions" | "architecture" | "reviews") => void;
  onSelectFutureProject: (p: FeaturedProject) => void;
  siteConfig: SiteConfig | null;
  onNavigate: (page: string) => void;
  onOpenBooking?: () => void;
}

export default function Blog({
  featuredProjects = [],
  recentWorks = [],
  testimonials = [],
  activeTab,
  setActiveTab,
  onSelectFutureProject,
  siteConfig,
  onNavigate,
  onOpenBooking
}: BlogProps) {

  // Default fallback values if arrays are empty
  const displayFeatured = featuredProjects.length > 0 ? featuredProjects : [
    {
      id: "fp-1",
      title: "Omni-Channel Design System",
      category: "Enterprise System",
      tagline: "Unifying multi-platform experiences with zero friction",
      role: "Lead Systems Designer",
      timeline: "Q1-Q3 2025",
      impact: "Reduced design-to-dev friction by 40%",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const displayRecent = recentWorks.length > 0 ? recentWorks : [
    {
      id: "rw-1",
      title: "E-Commerce Fluid Interface",
      date: "May 2026",
      image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80",
      url: "#"
    }
  ];

  const displayReviews = testimonials.length > 0 ? testimonials : [
    {
      id: "t-1",
      name: "Sarah Jenkins",
      role: "Director of UX, TechCorp",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      text: "Rahul delivered a world-class design system. Absolute stellar work and high velocity output.",
      rating: 5
    }
  ];

  // Pagination states
  const [solutionsPage, setSolutionsPage] = React.useState(1);
  const [architecturePage, setArchitecturePage] = React.useState(1);
  const [reviewsPage, setReviewsPage] = React.useState(1);

  const ITEMS_PER_PAGE = 9;

  const totalSolutionsPages = Math.ceil(displayFeatured.length / ITEMS_PER_PAGE);
  const totalArchitecturePages = Math.ceil(displayRecent.length / ITEMS_PER_PAGE);
  const totalReviewsPages = Math.ceil(displayReviews.length / ITEMS_PER_PAGE);

  const paginatedFeatured = displayFeatured.slice((solutionsPage - 1) * ITEMS_PER_PAGE, solutionsPage * ITEMS_PER_PAGE);
  const paginatedRecent = displayRecent.slice((architecturePage - 1) * ITEMS_PER_PAGE, architecturePage * ITEMS_PER_PAGE);
  const paginatedReviews = displayReviews.slice((reviewsPage - 1) * ITEMS_PER_PAGE, reviewsPage * ITEMS_PER_PAGE);

  const handlePageChange = (pageSetter: (p: number) => void, newPage: number) => {
    pageSetter(newPage);
    const el = document.getElementById("blog-view-top");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const renderPagination = (currentPage: number, totalPages: number, onPageChange: (p: number) => void) => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center gap-2 mt-16 pt-8">
        <button
          onClick={() => handlePageChange(onPageChange, currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 rounded-full flex items-center justify-center border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(onPageChange, page)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-md shadow-black/5 dark:shadow-white/5"
                  : "border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(onPageChange, currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 rounded-full flex items-center justify-center border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="py-32 bg-transparent min-h-screen text-[#1A1A1A] dark:text-white transition-colors duration-300 relative overflow-hidden">
      {/* Background Starfield Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Inherited StarryLockedBackground covers this page as well */}
      </div>

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Dynamic Editorial Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            CREATIVE PORTFOLIO HUB
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-tighter text-[#1A1A1A] dark:text-white mt-4 leading-tight">
            Design &amp; Technology Showcase
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans tracking-wide leading-relaxed">
            A comprehensive compilation of advanced UI/UX solutions, production system architectures, and client consultations.
          </p>
        </div>

        {/* Render Active View */}
        <div id="blog-view-top" className="min-h-[400px]">
          
          {/* ================= SOLUTIONS TAB ================= */}
          {activeTab === "solutions" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div className="pb-4">
                <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Featured Case Studies ({displayFeatured.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {paginatedFeatured.map((item, index) => (
                  <motion.div
                    key={item.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
                    onClick={() => onSelectFutureProject(item)}
                    className="group relative bg-white dark:bg-[#121212] border border-zinc-200/80 dark:border-zinc-800/60 rounded-[32px] overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
                  >
                    {/* Project Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200/50 dark:border-zinc-800/40">
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out opacity-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-45 transition-opacity duration-300" />
                      
                      {/* Floating Category Badge with active dot */}
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-white/95 dark:bg-[#0E0D0C]/95 text-black dark:text-white border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-pulse" />
                        {item.category}
                      </div>

                      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 dark:bg-black/95 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 border border-zinc-200/40 dark:border-zinc-800/30">
                        <Eye className="w-4 h-4 text-black dark:text-white" />
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="p-8 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                          <span>{item.timeline || "Q1-Q4 2026"}</span>
                          {item.role && (
                            <span>ROLE: {item.role}</span>
                          )}
                        </div>

                        <h3 className="font-display text-2xl font-semibold tracking-tight text-[#1A1A1A] dark:text-white mb-3 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors leading-snug">
                          {item.title}
                        </h3>

                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 mb-4">
                            {item.tags.slice(0, 3).map((tag, tagIdx) => (
                              <span 
                                key={tagIdx} 
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-mono bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/40 font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                            {item.tags.length > 3 && (
                              <span className="text-[9px] font-mono text-zinc-400 font-bold">
                                +{item.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {item.tagline && (
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                            {item.tagline}
                          </p>
                        )}
                      </div>

                      <div className="mt-6 pt-5 border-t border-zinc-200/50 dark:border-zinc-800/40 flex items-center justify-between w-full">
                        <div className="group inline-flex items-center gap-2.5 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                          <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-900 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black flex items-center justify-center transition-all duration-300 border border-zinc-200/50 dark:border-zinc-800/40">
                            <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-inherit" />
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Case Study</p>
                            <p className="text-xs sm:text-sm font-semibold tracking-tight text-[#1A1A1A] dark:text-white group-hover:text-black dark:group-hover:text-white">Explore Full Project</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {renderPagination(solutionsPage, totalSolutionsPages, setSolutionsPage)}
            </motion.div>
          )}

          {/* ================= ARCHITECTURE TAB ================= */}
          {activeTab === "architecture" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div className="pb-4">
                <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Shipped Systems &amp; Technical Builds ({displayRecent.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {paginatedRecent.map((work, index) => (
                  <motion.div
                    key={work.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
                    className="group relative bg-zinc-50/40 dark:bg-[#0E0D0C]/45 border border-zinc-200/70 dark:border-zinc-800/80 rounded-[32px] overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative border-b border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-100 dark:bg-zinc-900">
                      <img
                        src={work.image}
                        alt={work.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
                      
                      {/* Live Deployment Pulse Ribbon */}
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest bg-zinc-900/95 dark:bg-white/95 text-white dark:text-black border border-white/10 dark:border-black/10 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        DEPLOYED SYSTEM
                      </div>
                    </div>

                    <div className="p-8 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                          <span>ARCHITECTURAL BUILD</span>
                          <span>{work.date}</span>
                        </div>

                        {work.tags && work.tags.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 mt-3">
                            {work.tags.map((tag, tagIdx) => (
                              <span 
                                key={tagIdx} 
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono bg-zinc-100 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/40 backdrop-blur-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <h3 className="font-sans text-xl font-bold tracking-tight text-[#1A1A1A] dark:text-white mt-4 leading-snug group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
                          {work.title}
                        </h3>
                      </div>

                      {work.url && work.url !== "#" && (
                        <div className="mt-8 pt-5 border-t border-zinc-200/50 dark:border-zinc-800/40 flex items-center">
                          <a
                            href={work.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2.5 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200 w-full"
                          >
                            <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-900 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black flex items-center justify-center transition-all duration-300 border border-zinc-200/50 dark:border-zinc-800/40">
                              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-inherit" />
                            </div>
                            <div className="text-left">
                              <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Deployed System</p>
                              <p className="text-xs sm:text-sm font-semibold tracking-tight text-[#1A1A1A] dark:text-white group-hover:text-black dark:group-hover:text-white">Launch Application</p>
                            </div>
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {renderPagination(architecturePage, totalArchitecturePages, setArchitecturePage)}
            </motion.div>
          )}

          {/* ================= REVIEWS TAB ================= */}
          {activeTab === "reviews" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div className="pb-4">
                <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Client Evaluations &amp; Testimonials ({displayReviews.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {paginatedReviews.map((review, index) => (
                  <motion.div
                    key={review.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
                    className="group relative p-8 bg-white dark:bg-[#121212] border border-zinc-200/80 dark:border-zinc-800/60 rounded-[32px] overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between h-full"
                  >
                    <Quote className="absolute right-6 top-6 w-16 h-16 text-zinc-100 dark:text-zinc-900/30 group-hover:scale-105 group-hover:text-zinc-400/10 dark:group-hover:text-zinc-700/10 transition-all duration-500 pointer-events-none select-none" />

                    <div className="relative z-10">
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mb-6">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < (review.rating || 5)
                                ? "text-[#F4B400] fill-[#F4B400]"
                                : "text-zinc-250 dark:text-zinc-800"
                            }`}
                          />
                        ))}
                        <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 ml-2 font-bold uppercase tracking-wider">
                          Verified Client
                        </span>
                      </div>

                      {/* Review Text */}
                      <p className="text-[#3C4043] dark:text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans font-normal italic relative z-10">
                        &ldquo;{review.text}&rdquo;
                      </p>
                    </div>

                    {/* Review Author */}
                    <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/40">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-800/40 shrink-0 shadow-inner">
                        {review.avatar ? (
                          <img
                            src={review.avatar}
                            alt={review.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-mono font-bold text-xs bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                            {review.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-sans text-xs sm:text-sm font-bold text-black dark:text-white tracking-tight">
                          {review.name}
                        </h4>
                        <p className="text-[10px] text-[#5F6368] dark:text-zinc-400 font-sans mt-0.5 font-medium uppercase tracking-wider">
                          {review.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {renderPagination(reviewsPage, totalReviewsPages, setReviewsPage)}
            </motion.div>
          )}

        </div>
      </div>
      
      {/* FAQ & CTA Sections before footer */}
      <div className="mt-16">
        <FAQSection />
        <BottomCTASection siteConfig={siteConfig} onNavigate={onNavigate} onOpenBooking={onOpenBooking} />
      </div>
    </div>
  );
}
