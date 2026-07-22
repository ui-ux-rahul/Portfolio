/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import BackToTop from "./components/BackToTop";
import SEOHead from "./components/SEOHead";
import Preloader from "./components/Preloader";
import StarryLockedBackground from "./components/StarryLockedBackground";

// Code-split heavy secondary pages, footer & modals for lightning-fast initial page load & maximum LCP score
const Footer = lazy(() => import("./components/Footer"));
const InteractiveParticles = lazy(() => import("./components/InteractiveParticles"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const StyleGuide = lazy(() => import("./pages/StyleGuide"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const BookingModal = lazy(() => import("./components/BookingModal"));
const CommandPalette = lazy(() => import("./components/CommandPalette"));
import { Project, Testimonial, BlogPost, SiteConfig, FeaturedProject, RecentWork, TimelineSection, ServiceItem } from "./types";
import { initialProjects, initialTestimonials, initialBlogPosts, initialFeaturedProjects, initialRecentWorks, initialServices, initialSiteConfig } from "./initialData";
import { motion, AnimatePresence } from "motion/react";
import { playClickSound } from "./lib/audio";

export default function App() {
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme ? savedTheme === "dark" : false;
    }
    return false;
  });
  const [selectedFutureProject, setSelectedFutureProject] = useState<any>(null);
  const [returnFromProject, setReturnFromProject] = useState<boolean>(false);
  const [projectEntryPoint, setProjectEntryPoint] = useState<string>("home");
  const [savedHomeScroll, setSavedHomeScroll] = useState<number>(0);
  const [savedBlogScroll, setSavedBlogScroll] = useState<number>(0);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [blogActiveTab, setBlogActiveTab] = useState<"solutions" | "architecture" | "reviews">("solutions");

  // Global event listener for command palette open signal
  useEffect(() => {
    const handleOpenCommandPalette = () => setIsCommandPaletteOpen(true);
    window.addEventListener("open-command-palette", handleOpenCommandPalette);
    return () => window.removeEventListener("open-command-palette", handleOpenCommandPalette);
  }, []);
  
  // Safely extract server-injected state from global window object
  const initialData = typeof window !== "undefined" ? (window as any).__INITIAL_DATA__ : undefined;

  // Real data state initialized with zero-flickering server-injected data
  const [projects, setProjects] = useState<Project[]>(initialData?.projects || []);
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>(initialData?.featuredProjects || []);
  const [recentWorks, setRecentWorks] = useState<RecentWork[]>(initialData?.recentWorks || []);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialData?.testimonials || []);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialData?.blogPosts || []);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(initialData?.siteConfig || initialSiteConfig);
  const [timelineSections, setTimelineSections] = useState<TimelineSection[]>(initialData?.timelineSections || []);
  const [services, setServices] = useState<ServiceItem[]>(initialData?.services || []);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(!initialData);
  
  // Admin auth token
  const [token, setToken] = useState<string | null>(null);

  // Smooth scroll to top whenever page changes, or to exact project scroll position if returning
  useEffect(() => {
    if (currentPage === "home" && returnFromProject) {
      setReturnFromProject(false);
      setTimeout(() => {
        window.scrollTo({ top: savedHomeScroll, behavior: "smooth" });
      }, 100);
    } else if (currentPage === "blog" && returnFromProject) {
      setReturnFromProject(false);
      setTimeout(() => {
        window.scrollTo({ top: savedBlogScroll, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  // Initialize Dark Mode setting on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const preferDark = savedTheme ? savedTheme === "dark" : false; // Default to clean white/light theme
    setDarkMode(preferDark);
    
    // Check if token already exists in localStorage
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Global premium micro-sound feedback listener
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("button, a, [role='button'], input[type='submit'], .cursor-pointer");
      if (interactiveEl) {
        if (interactiveEl.hasAttribute("disabled") || interactiveEl.classList.contains("no-sound-feedback")) {
          return;
        }
        playClickSound();
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  // Sync dark mode class with root HTML tag
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("theme-transitioning");
    
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    const timer = setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, 600);

    return () => clearTimeout(timer);
  }, [darkMode]);

  // Lock body scroll while preloader is active to prevent scroll under preloader
  useEffect(() => {
    const root = window.document.documentElement;
    if (showPreloader) {
      root.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
    } else {
      root.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      root.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, [showPreloader]);

  // Premium clip-path circular expand theme switcher transition (Telegram/Linear-style)
  const handleThemeChange = (dark: boolean, event?: React.MouseEvent) => {
    const doc = document as any;
    const isAppearanceTransition = doc.startViewTransition &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isAppearanceTransition || !event) {
      setDarkMode(dark);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      setDarkMode(dark);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: dark ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 480,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: dark
            ? '::view-transition-new(root)'
            : '::view-transition-old(root)',
        }
      );
    });
  };


  // Keep browser address bar in sync with custom page state (HTML5 History API)
  useEffect(() => {
    let path = "/";
    const slug1 = siteConfig?.navItem1Text ? siteConfig.navItem1Text.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "expertise";
    const slug2 = siteConfig?.navItem2Text ? siteConfig.navItem2Text.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "case-studies";
    const slug3 = siteConfig?.navItem3Text ? siteConfig.navItem3Text.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "testimonials";

    if (currentPage === "blog") {
      if (blogActiveTab === "solutions") {
        path = `/${slug1}`;
      } else if (blogActiveTab === "architecture") {
        path = `/${slug2}`;
      } else if (blogActiveTab === "reviews") {
        path = `/${slug3}`;
      } else {
        path = "/blog";
      }
    } else if (currentPage === "admin") {
      path = "/admin";
    } else if (currentPage === "style-guide") {
      path = "/style-guide";
    } else if (currentPage === "project-detail" && selectedFutureProject) {
      const slug = selectedFutureProject.title
        ? selectedFutureProject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
        : "details";
      path = `/${slug}`;
    }
    
    if (window.location.pathname !== path) {
      window.history.pushState({ page: currentPage, project: selectedFutureProject, blogTab: blogActiveTab }, "", path);
    }
  }, [currentPage, selectedFutureProject, blogActiveTab, siteConfig]);

  // Handle initial page load from URL path and popstate (back/forward browser buttons)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const slug1 = siteConfig?.navItem1Text ? siteConfig.navItem1Text.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "expertise";
      const slug2 = siteConfig?.navItem2Text ? siteConfig.navItem2Text.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "case-studies";
      const slug3 = siteConfig?.navItem3Text ? siteConfig.navItem3Text.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "testimonials";

      if (path === "/projects" || path === "/about" || path === "/testimonials") {
        setCurrentPage("home");
      } else if (path === "/blog") {
        setCurrentPage("blog");
      } else if (path === `/${slug1}`) {
        setCurrentPage("blog");
        setBlogActiveTab("solutions");
      } else if (path === `/${slug2}`) {
        setCurrentPage("blog");
        setBlogActiveTab("architecture");
      } else if (path === `/${slug3}`) {
        setCurrentPage("blog");
        setBlogActiveTab("reviews");
      } else if (path === "/contact") {
        setCurrentPage("home");
        setIsBookingOpen(true);
      } else if (path === "/admin") {
        setCurrentPage("admin");
      } else if (path === "/style-guide") {
        setCurrentPage("style-guide");
      } else if (path === "/" || path === "") {
        setCurrentPage("home");
      } else {
        // It could be a project slug! e.g., "/upshob" or "/excel-essentials"
        // Let's find a matching featured project or project
        const slug = path.substring(1);
        const match = featuredProjects.find(
          (p) => (p.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
        ) || projects.find(
          (p) => (p.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
        );
        
        if (match) {
          setSelectedFutureProject(match);
          setCurrentPage("project-detail");
        } else {
          // If no match found, fallback to home
          setCurrentPage("home");
        }
      }
    };

    // Run on mount once data is loaded
    if (!isDataLoading) {
      handleLocationChange();
    }

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, [isDataLoading, featuredProjects, projects, siteConfig]);

  // Auto scroll to top on any page or tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, blogActiveTab]);



  // Fetch initial data from the custom Express backend
  useEffect(() => {
    const fetchAllData = async () => {
      const hasInitialData = !!initialData;
      if (!hasInitialData) {
        setIsDataLoading(true);
      }
      
      try {
        const [projRes, testRes, blogRes, configRes, featRes, recentRes, timelineRes, servicesRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/testimonials"),
          fetch("/api/blog"),
          fetch("/api/site-config"),
          fetch("/api/featured-projects"),
          fetch("/api/recent-works"),
          fetch("/api/timeline-sections"),
          fetch("/api/services")
        ]);

        if (projRes.ok) {
          const data = await projRes.json();
          setProjects(data);
        } else if (!hasInitialData) {
          setProjects(initialProjects);
        }

        if (featRes && featRes.ok) {
          const data = await featRes.json();
          setFeaturedProjects(data);
        } else if (!hasInitialData) {
          setFeaturedProjects(initialFeaturedProjects);
        }

        if (recentRes && recentRes.ok) {
          const data = await recentRes.json();
          setRecentWorks(data);
        } else if (!hasInitialData) {
          setRecentWorks(initialRecentWorks);
        }

        if (testRes.ok) {
          const data = await testRes.json();
          setTestimonials(data);
        } else if (!hasInitialData) {
          setTestimonials(initialTestimonials);
        }

        if (blogRes.ok) {
          const data = await blogRes.json();
          setBlogPosts(data);
        } else if (!hasInitialData) {
          setBlogPosts(initialBlogPosts);
        }

        if (configRes.ok) {
          const configData = await configRes.json();
          setSiteConfig(configData);
        }

        if (timelineRes && timelineRes.ok) {
          const timelineData = await timelineRes.json();
          setTimelineSections(timelineData);
        }

        if (servicesRes && servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setServices(servicesData);
        } else if (!hasInitialData) {
          setServices(initialServices);
        }
      } catch (err) {
        console.error("Backend fetch error, seeding fallbacks:", err);
        if (!hasInitialData) {
          setProjects(initialProjects);
          setFeaturedProjects(initialFeaturedProjects);
          setRecentWorks(initialRecentWorks);
          setTestimonials(initialTestimonials);
          setBlogPosts(initialBlogPosts);
          setServices(initialServices);
        }
      } finally {
        if (!hasInitialData) {
          // Ensure shimmer skeleton renders smoothly for 1 second of perceived performance upgrade
          setTimeout(() => {
            setIsDataLoading(false);
          }, 1100);
        } else {
          setIsDataLoading(false);
        }
      }
    };

    fetchAllData();
  }, []);

  const handleLogin = (authToken: string) => {
    setToken(authToken);
    localStorage.setItem("adminToken", authToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("adminToken");
    setCurrentPage("home");
  };

  const handleNavigate = (page: string) => {
    const slug1 = siteConfig?.navItem1Text ? siteConfig.navItem1Text.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "expertise";
    const slug2 = siteConfig?.navItem2Text ? siteConfig.navItem2Text.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "case-studies";
    const slug3 = siteConfig?.navItem3Text ? siteConfig.navItem3Text.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "testimonials";

    if (!page) return;

    if (page.startsWith("http://") || page.startsWith("https://")) {
      window.open(page, "_blank", "noopener,noreferrer");
      return;
    }

    if (page === "solutions" || page === slug1 || page === "/solutions" || page === `/${slug1}`) {
      setCurrentPage("blog");
      setBlogActiveTab("solutions");
    } else if (page === "architecture" || page === "recent-work" || page === "projects" || page === slug2 || page === "/architecture" || page === `/${slug2}`) {
      setCurrentPage("blog");
      setBlogActiveTab("architecture");
    } else if (page === "reviews" || page === slug3 || page === "/reviews" || page === `/${slug3}`) {
      setCurrentPage("blog");
      setBlogActiveTab("reviews");
    } else if (page === "blog" || page === "/blog") {
      setCurrentPage("blog");
    } else if (page === "contact" || page === "/contact") {
      setCurrentPage("home");
      setIsBookingOpen(true);
    } else if (page === "admin" || page === "/admin") {
      setCurrentPage("admin");
    } else if (page === "style-guide" || page === "/style-guide") {
      setCurrentPage("style-guide");
    } else if (page === "home" || page === "/" || page === "") {
      setCurrentPage("home");
    } else {
      const cleanSlug = page.startsWith("/") ? page.substring(1) : page;
      const match = featuredProjects.find(
        (p) => (p.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-") === cleanSlug
      ) || projects.find(
        (p) => (p.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-") === cleanSlug
      );
      
      if (match) {
        setSelectedFutureProject(match);
        setCurrentPage("project-detail");
      } else if (cleanSlug === slug1) {
        setCurrentPage("blog");
        setBlogActiveTab("solutions");
      } else if (cleanSlug === slug2) {
        setCurrentPage("blog");
        setBlogActiveTab("architecture");
      } else if (cleanSlug === slug3) {
        setCurrentPage("blog");
        setBlogActiveTab("reviews");
      } else {
        // Handle any custom page url from custom admin button settings
        window.history.pushState({ page: "home" }, "", page.startsWith("/") ? page : `/${page}`);
        setCurrentPage("home");
      }
    }
  };

  const handleSelectFutureProject = (p: any) => {
    if (currentPage === "blog") {
      setSavedBlogScroll(window.scrollY);
      setProjectEntryPoint("blog");
    } else {
      setSavedHomeScroll(window.scrollY);
      setProjectEntryPoint("home");
    }
    setSelectedFutureProject(p);
    setCurrentPage("project-detail");
  };

  // Render Page selection
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <Home
            projects={projects}
            featuredProjects={featuredProjects}
            recentWorks={recentWorks}
            testimonials={testimonials}
            onNavigate={handleNavigate}
            onSelectFutureProject={handleSelectFutureProject}
            siteConfig={siteConfig}
            timelineSections={timelineSections}
            services={services}
            onOpenBooking={() => setIsBookingOpen(true)}
            isLoading={isDataLoading}
            showPreloader={showPreloader}
          />
        );
      case "projects":
      case "about":
      case "testimonials":
        return (
          <Home
            projects={projects}
            featuredProjects={featuredProjects}
            recentWorks={recentWorks}
            testimonials={testimonials}
            onNavigate={handleNavigate}
            onSelectFutureProject={handleSelectFutureProject}
            siteConfig={siteConfig}
            timelineSections={timelineSections}
            services={services}
            onOpenBooking={() => setIsBookingOpen(true)}
            isLoading={isDataLoading}
            showPreloader={showPreloader}
          />
        );
      case "project-detail":
        return selectedFutureProject ? (
          <ProjectDetails 
            project={selectedFutureProject} 
            onNavigate={(page) => {
              if (page === "home") {
                setReturnFromProject(true);
                setCurrentPage(projectEntryPoint);
              } else {
                handleNavigate(page);
              }
            }} 
            onOpenBooking={() => setIsBookingOpen(true)} 
            siteConfig={siteConfig}
          />
        ) : (
          <Home
            projects={projects}
            featuredProjects={featuredProjects}
            recentWorks={recentWorks}
            testimonials={testimonials}
            onNavigate={handleNavigate}
            onSelectFutureProject={handleSelectFutureProject}
            siteConfig={siteConfig}
            timelineSections={timelineSections}
            services={services}
            onOpenBooking={() => setIsBookingOpen(true)}
            isLoading={isDataLoading}
          />
        );
      case "blog":
        return (
          <Blog
            featuredProjects={featuredProjects}
            recentWorks={recentWorks}
            testimonials={testimonials}
            activeTab={blogActiveTab}
            setActiveTab={setBlogActiveTab}
            onSelectFutureProject={handleSelectFutureProject}
            siteConfig={siteConfig}
            onNavigate={handleNavigate}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        );
      case "style-guide":
        return <StyleGuide />;
      case "login":
        return <Login onLoginSuccess={handleLogin} onNavigate={handleNavigate} />;
      case "admin":
        if (!token) {
          return <Login onLoginSuccess={handleLogin} onNavigate={handleNavigate} />;
        }
        return (
          <AdminDashboard
            projects={projects}
            setProjects={setProjects}
            featuredProjects={featuredProjects}
            setFeaturedProjects={setFeaturedProjects}
            recentWorks={recentWorks}
            setRecentWorks={setRecentWorks}
            testimonials={testimonials}
            setTestimonials={setTestimonials}
            blogPosts={blogPosts}
            setBlogPosts={setBlogPosts}
            siteConfig={siteConfig}
            setSiteConfig={setSiteConfig}
            timelineSections={timelineSections}
            setTimelineSections={setTimelineSections}
            services={services}
            setServices={setServices}
            token={token}
          />
        );
      default:
        return (
          <Home
            projects={projects}
            featuredProjects={featuredProjects}
            recentWorks={recentWorks}
            testimonials={testimonials}
            onNavigate={handleNavigate}
            onSelectFutureProject={handleSelectFutureProject}
            siteConfig={siteConfig}
            timelineSections={timelineSections}
            services={services}
            onOpenBooking={() => setIsBookingOpen(true)}
            isLoading={isDataLoading}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#1A1A1A] dark:text-zinc-100 antialiased selection:bg-[#4285F4]/10 selection:text-[#4285F4] transition-colors duration-500 ease-in-out relative">
      {/* Global Locked Starry Background underneath entire app */}
      <StarryLockedBackground />

      {/* Premium First-Load Typewriter Split Preloader */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}
      
      <SEOHead 
        currentPage={currentPage} 
        projectTitle={selectedFutureProject?.title} 
        projectDescription={selectedFutureProject?.description || selectedFutureProject?.tagline || selectedFutureProject?.challenge}
        brandName={siteConfig?.brandName} 
        siteConfig={siteConfig || undefined}
      />

      {/* Main app content wrapped to transition in after preloader completes */}
      <div 
        className="flex-grow flex flex-col w-full min-h-screen" 
        style={{ 
          opacity: showPreloader ? 0 : 1, 
          transition: "opacity 0.8s ease-in-out",
          pointerEvents: showPreloader ? "none" : "auto"
        }}
      >
        {/* Navigation Header - Revealed smoothly with delay after Preloader exits */}
        <AnimatePresence>
          {!showPreloader && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="fixed top-0 left-0 right-0 z-50 w-full"
            >
              <Navbar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                darkMode={darkMode}
                setDarkMode={handleThemeChange}
                isAdmin={!!token}
                logout={handleLogout}
                siteConfig={siteConfig}
                onOpenBooking={() => setIsBookingOpen(true)}
                onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
                blogActiveTab={blogActiveTab}
                setBlogActiveTab={setBlogActiveTab}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Pane with Transitions */}
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className="relative z-10 w-full"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.12,
                    delayChildren: 0.05,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1]
                  }
                },
                exit: {
                  opacity: 0,
                  transition: {
                    duration: 0.25,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Suspense fallback={<div className="min-h-screen w-full bg-transparent" />}>
                {renderPage()}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer bar */}
        <Suspense fallback={<div className="w-full h-24 bg-transparent" />}>
          <Footer setCurrentPage={setCurrentPage} isAdmin={!!token} siteConfig={siteConfig} />
        </Suspense>
      </div>

      {/* Interactive Booking Modal */}
      <Suspense fallback={null}>
        <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} brandName={siteConfig?.brandName} />
      </Suspense>

      {/* Global Command Palette (Cmd+K) */}
      <Suspense fallback={null}>
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          projects={projects}
          featuredProjects={featuredProjects}
          blogPosts={blogPosts}
          services={services}
          onNavigate={handleNavigate}
          onSelectProject={handleSelectFutureProject}
          onOpenBooking={() => setIsBookingOpen(true)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </Suspense>

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}
