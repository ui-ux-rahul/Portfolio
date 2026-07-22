/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { 
  ArrowRight, 
  Terminal, 
  Cpu, 
  Layers, 
  Code, 
  Sparkles, 
  Globe, 
  MousePointer, 
  Grid, 
  PenTool, 
  MessageSquare, 
  Check, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Folder,
  Activity,
  Play,
  Monitor,
  Smartphone,
  Video,
  Zap,
  Laptop,
  Shield,
  Lightbulb,
  Award,
  Briefcase,
  GraduationCap,
  BookOpen,
  Trophy,
  Star,
  Heart
} from "lucide-react";
import { Project, Testimonial, SiteConfig, FeaturedProject, RecentWork, TimelineSection, TimelineCard, ServiceItem } from "../types";
import TypewriterDescription from "../components/TypewriterDescription";
import AnimatedCounter from "../components/AnimatedCounter";
import ScrollParallaxCard from "../components/ScrollParallaxCard";
import ScrollHighlightText from "../components/ScrollHighlightText";
import { experienceData, educationData, certificationData } from "../initialData";

const iconMap: { [key: string]: any } = {
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  Code,
  Zap,
  Activity,
  Layers,
  Sparkles,
  Lightbulb,
  Heart,
  Trophy,
  Laptop,
  Star,
  Globe,
  PenTool,
  Shield,
  Terminal,
  Cpu,
  MousePointer,
  Grid,
  MessageSquare,
  Monitor,
  Smartphone,
  Video
};
import InteractiveParticles from "../components/InteractiveParticles";

// Deterministic helper to generate decorative spiral ticks matching the custom CTA design
const generateTicks = () => {
  const ticks = [];
  const cx = 550; // Shifted slightly right to frame the text beautifully
  const cy = 250;
  const ringCount = 13;
  const baseRadius = 45;
  const radiusStep = 24;

  for (let ring = 0; ring < ringCount; ring++) {
    const r = baseRadius + ring * radiusStep;
    const tickCount = Math.floor(ring * 5.2 + 10);
    
    for (let i = 0; i < tickCount; i++) {
      const angleFraction = i / tickCount;
      const baseAngle = angleFraction * Math.PI * 2;
      
      // Twisting spiral offset
      const twist = ring * 0.13;
      const angle = baseAngle + twist;
      
      // Calculate start coordinate
      const x1 = cx + r * Math.cos(angle);
      const y1 = cy + r * Math.sin(angle);
      
      // Ticks are tilted from the radial vector to emphasize the swirling field
      const tilt = 0.28; 
      const dirAngle = angle + tilt;
      
      // Tick length
      const length = 5.5 + (ring % 3) * 1.5;
      
      const x2 = x1 + length * Math.cos(dirAngle);
      const y2 = y1 + length * Math.sin(dirAngle);
      
      // Opacity fades as we go outward, with some deterministic variation
      const baseOpacity = Math.max(0.08, 1 - (r / 390));
      const opacityVar = 0.5 + 0.5 * Math.sin(ring * 3.5 + i * 2.2);
      const opacity = baseOpacity * (0.3 + 0.7 * opacityVar) * 0.95;
      
      // Electric/royal blue color variation matching Google branding
      const colorIndex = (ring + i) % 4;
      const colors = ["#4285F4", "#5e97f6", "#3b6fcb", "#8ab4f8"];
      const color = colors[colorIndex];

      ticks.push({
        id: `${ring}-${i}`,
        x1,
        y1,
        x2,
        y2,
        opacity,
        color,
        ring,
        index: i
      });
    }
  }
  return ticks;
};

interface HomeProps {
  projects: Project[];
  featuredProjects?: FeaturedProject[];
  recentWorks?: RecentWork[];
  testimonials: Testimonial[];
  onNavigate: (page: string) => void;
  onSelectFutureProject?: (project: any) => void;
  siteConfig: SiteConfig | null;
  timelineSections?: TimelineSection[];
  services?: ServiceItem[];
  onOpenBooking?: () => void;
  isLoading?: boolean;
  showPreloader?: boolean;
}

export default function Home({ 
  projects, 
  featuredProjects, 
  recentWorks, 
  testimonials, 
  onNavigate, 
  onSelectFutureProject, 
  siteConfig,
  timelineSections,
  services,
  onOpenBooking,
  isLoading = false,
  showPreloader = true
}: HomeProps) {
  const developerItems = [
    {
      role: "Fintech OS",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1000",
      title: "Vault Pro (Financial OS)",
      description: "Designed an Apple-style, highly intuitive local-first financial OS, engineering proprietary 'Triple-Link ID' and 'Atomic Batch Law' protocols to sync background data with MongoDB on reconnect with zero conflict rates."
    },
    {
      role: "Messaging OS",
      image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=1000",
      title: "Chat Box (Messaging OS)",
      description: "Designed and hand-coded a real-time messaging application, structuring a three-column desktop workspace with shared media sidebars that intelligently collapse into a native bottom-tab mobile layout for users."
    },
    {
      role: "Healthcare SaaS",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000",
      title: "Care Guide Redesign",
      description: "Redesigned a legacy 2016 healthcare portal into a custom 2026 system, benchmarking visual layouts against industry leaders like Bayada and Mayo Clinic for development readiness. Scaled a Figma design system with precise tokens."
    },
    {
      role: "Hosting & Deployment",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
      title: "Host The Website Platform",
      description: "Owned the visual design for 13+ responsive sites, mapping layouts from wireframe to Figma deliverables with pixel-perfect accuracy for frictionless developer handoff. Defined motion specs and custom hover states."
    },
    {
      role: "All Projects",
      image: "",
      title: "View All Future Projects",
      description: "Dive into the complete collection of conceptual platforms, design frameworks, and interactive frontend software repositories.",
      isDummy: true
    }
  ];

  const displayFeaturedProjects = featuredProjects && featuredProjects.length > 0 ? featuredProjects : [
    {
      id: "fp-1",
      title: "Upshop",
      category: "SaaS, Food, B2B",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
      aspectClass: "aspect-square"
    },
    {
      id: "fp-2",
      title: "TinyFish",
      category: "A.I., SaaS",
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800",
      aspectClass: "aspect-[1.15]"
    },
    {
      id: "fp-3",
      title: "Barrow Street Nursery School",
      category: "Education",
      image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800",
      aspectClass: "aspect-[1.35]"
    },
    {
      id: "fp-4",
      title: "Prosupps",
      category: "E-Commerce, B2C",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
      aspectClass: "aspect-[1.35]"
    },
    {
      id: "fp-5",
      title: "Suzy Welch",
      category: "Education, B2C, B2B",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
      aspectClass: "aspect-[1.15]"
    },
    {
      id: "fp-6",
      title: "New Engen",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      aspectClass: "aspect-square"
    }
  ];

  const servicesData = [
    {
      step: "1",
      title: "Discover & Define",
      description: "Understanding business goals, user needs, and the problem we are solving.",
      icon: Lightbulb,
    },
    {
      step: "2",
      title: "Ideate & Wireframe",
      description: "Creating logical user flows, site architectures, and low-fidelity structural blueprints.",
      icon: Layers,
    },
    {
      step: "3",
      title: "High-Fidelity UI/UX",
      description: "Crafting polished, high-fidelity interface systems with scalable, responsive Figma libraries.",
      icon: PenTool,
    },
    {
      step: "4",
      title: "Interactive Development",
      description: "Engineering production-ready frontend layouts using modern React and interactive Framer architectures.",
      icon: Code,
    }
  ];

  // We'll showcase the 5-blog post logic or select items directly.
  // FAQ state
  const [activeTab, setActiveTab] = useState<string>("all");
  const blogScrollRef = useRef<HTMLDivElement>(null);
  const workSectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLDivElement>(null);

  const [visibleWorkCount, setVisibleWorkCount] = useState(1);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Dynamic fallback mapping to preserve existing visual content seamlessly while database loads
  const fallbackTimelineSections: TimelineSection[] = [
    {
      id: "sec-experience",
      title: "EXPERIENCE",
      icon: "Briefcase",
      items: experienceData.map(exp => ({
        id: exp.id,
        title: exp.role,
        subtitle: exp.company,
        date: exp.duration,
        details: exp.details
      }))
    },
    {
      id: "sec-education",
      title: "EDUCATION",
      icon: "GraduationCap",
      items: educationData.map(edu => ({
        id: edu.id,
        title: edu.degree,
        subtitle: edu.institution,
        date: edu.duration,
        details: edu.cgpa ? [edu.cgpa] : []
      }))
    },
    {
      id: "sec-certifications",
      title: "CERTIFICATIONS",
      icon: "Award",
      items: certificationData.map(cert => ({
        id: cert.id,
        title: cert.name,
        subtitle: cert.issuer,
        date: cert.date,
        details: []
      }))
    }
  ];

  const activeTimelineSections = timelineSections && timelineSections.length > 0 ? timelineSections : fallbackTimelineSections;

  const headerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isLargeScreen) {
      activeTimelineSections.forEach((sec) => {
        const headerEl = headerRefs.current[sec.id];
        if (headerEl) headerEl.style.top = "";
      });
      return;
    }

    const handleScroll = () => {
      activeTimelineSections.forEach((sec) => {
        const headerEl = headerRefs.current[sec.id];
        const cardEl = cardRefs.current[sec.id];
        if (headerEl && cardEl) {
          const rect = cardEl.getBoundingClientRect();
          const offset = Math.max(0, 192 - rect.top);
          headerEl.style.top = `${100 - offset}px`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLargeScreen, activeTimelineSections]);

  const { scrollYProgress: workScrollYProgress } = useScroll({
    target: workSectionRef,
  });

  useMotionValueEvent(workScrollYProgress, "change", (latest) => {
    let count = 1;
    if (latest > 0.05) count = 2;
    if (latest > 0.15) count = 3;
    if (latest > 0.25) count = 4;
    if (latest > 0.35) count = 5;
    if (latest > 0.45) count = 6;
    if (latest > 0.55) count = 7;
    if (latest > 0.65) count = 8;
    if (latest > 0.75) count = 9;
    if (latest > 0.85) count = 10;

    setVisibleWorkCount(count);
  });

  // CTA Section Scroll Progress (Reveals, expands, and rotates backgrounds as the user approaches it)
  const { scrollYProgress: ctaScrollY } = useScroll({
    target: ctaRef,
    offset: ["start end", "end end"]
  });

  const ctaScale = useTransform(ctaScrollY, [0, 1], [0.94, 1]);
  const ctaY = useTransform(ctaScrollY, [0, 1], [60, 0]);
  const ctaOpacity = useTransform(ctaScrollY, [0, 1], [0.8, 1]);
  const ctaRotate = useTransform(ctaScrollY, [0, 1], [0, 15]);
  const ctaTicksOpacity = useTransform(ctaScrollY, [0, 0.8, 1], [0.15, 0.6, 0.95]);

  // Services (My Expertise) Scroll Progress for scale grow
  const { scrollYProgress: servicesScrollY } = useScroll({
    target: servicesSectionRef,
    offset: ["start end", "end end"]
  });

  const servicesScale = useTransform(servicesScrollY, [0, 1], [0.94, 1]);
  const servicesY = useTransform(servicesScrollY, [0, 1], [60, 0]);
  const servicesOpacity = useTransform(servicesScrollY, [0, 1], [0.8, 1]);

  const workContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (workContainerRef.current) {
      const scrollContainer = workContainerRef.current;
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [visibleWorkCount]);

  const revealVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.01,
      }
    }
  };

  const kineticReveal = {
    hidden: { opacity: 0, y: 35, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 75,
        damping: 15,
        mass: 0.8,
      }
    }
  };

  const heroBadgeReveal = {
    hidden: { opacity: 0, y: -45 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
  };

  const heroLeftReveal = {
    hidden: { opacity: 0, x: -140 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }
  };

  const heroRightReveal = {
    hidden: { opacity: 0, x: 140 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }
  };

  const heroButtonReveal = {
    hidden: { opacity: 0, y: 45, scale: 0.92 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 } }
  };

  const scrollRevealSmooth = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const staggerCarouselContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const carouselCardReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const springTitleVariants = {
    initial: { y: 0, scale: 1 },
    hover: { 
      y: -6, 
      scale: 1.015,
      transition: { type: "spring", stiffness: 350, damping: 14 } 
    }
  };

  const springDescVariants = {
    initial: { y: 0, opacity: 0.8 },
    hover: { 
      y: -4, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 350, damping: 14, delay: 0.03 } 
    }
  };

  const springButtonVariants = {
    initial: { y: 0 },
    hover: { 
      y: -2, 
      transition: { type: "spring", stiffness: 350, damping: 14, delay: 0.06 } 
    }
  };

  const arrowVariants = {
    initial: { x: 0 },
    hover: {
      x: [0, 4, 0],
      transition: {
        repeat: Infinity,
        duration: 1.2,
        ease: "easeInOut",
        repeatDelay: 0.4
      }
    }
  };

  const scrollLeft = () => {
    if (blogScrollRef.current) {
      blogScrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (blogScrollRef.current) {
      blogScrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const displayRecentWorks = recentWorks && recentWorks.length > 0 ? recentWorks : [
    {
      id: "rw-1",
      title: "FinTech Platform & Financial OS",
      date: "May 2026",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      url: "https://pagea.uk/ui-ux-rahul"
    },
    {
      id: "rw-2",
      title: "Interactive Communication Ecosystem",
      date: "April 2026",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
      url: "https://pagea.uk/ui-ux-rahul"
    },
    {
      id: "rw-3",
      title: "Care Guide Healthcare SaaS Redesign",
      date: "March 2026",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
      url: "https://pagea.uk/ui-ux-rahul"
    },
    {
      id: "rw-4",
      title: "Host The Website Hosting Platform",
      date: "January 2026",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      url: "https://pagea.uk/ui-ux-rahul"
    },
    {
      id: "rw-5",
      title: "Apple-Style Local-First Vault OS",
      date: "November 2025",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
      url: "https://pagea.uk/ui-ux-rahul"
    },
    {
      id: "rw-6",
      title: "Scalable Design System Components",
      date: "September 2025",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
      url: "https://pagea.uk/ui-ux-rahul"
    }
  ];

  const tools = [
    { icon: <MousePointer className="w-4 h-4" />, label: "Cursor tool" },
    { icon: <Grid className="w-4 h-4" />, label: "Frame block" },
    { icon: <PenTool className="w-4 h-4" />, label: "Orchestrator pen" },
    { icon: <MessageSquare className="w-4 h-4" />, label: "Sub-agent comment" }
  ];

  return (
    <div className="bg-transparent text-[#1A1A1A] dark:text-[#E4E4E7] min-h-screen transition-colors duration-300 relative">
      
      {/* 1. Sylvan-Style New Hero Section (100% Identical Visual Design match) */}
      <motion.section 
        id="hero" 
        variants={staggerContainer}
        initial="hidden"
        animate={showPreloader ? "hidden" : "visible"}
        className="relative bg-transparent text-black dark:text-white pt-28 pb-14 sm:py-28 md:py-32 overflow-x-hidden flex flex-col justify-center items-center min-h-[90vh] select-none transition-colors duration-300"
      >
        
        {/* Interactive Mouse-Reactive Canvas Particles (HTML5 + JS Canvas) - Revealed after preloader */}
        {!showPreloader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="absolute inset-0 pointer-events-none z-0"
          >
            <InteractiveParticles />
          </motion.div>
        )}

        {/* Content Container */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col items-center text-center">
          
          {/* Centered pill badge */}
          <motion.div 
            variants={heroBadgeReveal}
            className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-[11px] font-semibold text-black dark:text-white tracking-wide mb-6 uppercase"
          >
            {siteConfig?.heroBadge || "Portfolio & Creative Showcase"}
          </motion.div>

          {/* Huge display headline */}
          <motion.h1 
            variants={heroLeftReveal}
            className="font-sans text-[38px] xs:text-[44px] sm:text-[86px] md:text-[100px] lg:text-[110px] font-normal leading-[0.95] sm:leading-[0.9] tracking-tighter text-[#0C0C0D] dark:text-white max-w-5xl mx-auto select-none mt-6 sm:mt-10 whitespace-pre-line text-center"
          >
            {siteConfig?.heroHeading || "Hi, I'm Rahul Dutta.\nDesigning the future of web."}
          </motion.h1>

          {/* Subtitle */}
          <motion.div variants={heroRightReveal}>
            <TypewriterDescription
              className="text-gray-600 dark:text-zinc-400 text-sm sm:text-[20px] font-normal leading-relaxed max-w-[720px] mx-auto mt-5 sm:mt-8 font-sans text-center"
              text={siteConfig?.heroSubheading || "Rahul is a multidisciplinary Product Designer and Frontend Engineer who designs and crafts high-fidelity digital interfaces, persistent design systems, and fluid modern user experiences."}
            />
          </motion.div>

           {/* Call to action button */}
          <motion.div variants={heroButtonReveal} className="mt-6 sm:mt-10 flex justify-center w-full">
            {(siteConfig?.heroButtonActionType || "url") === "url" && 
            ((siteConfig?.heroButtonUrl || siteConfig?.navCtaLink || "contact").startsWith("http://") || 
             (siteConfig?.heroButtonUrl || siteConfig?.navCtaLink || "contact").startsWith("https://")) ? (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={siteConfig?.heroButtonUrl || siteConfig?.navCtaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-auto px-6 py-2.5 sm:px-8.5 sm:py-4 fluid-btn-primary text-xs sm:text-[14px] font-bold tracking-tight cursor-pointer font-sans text-center inline-block"
              >
                {siteConfig?.heroButtonText || "Get in touch"}
              </motion.a>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const actionType = siteConfig?.heroButtonActionType || "url";
                  if (actionType === "modal") {
                    if (onOpenBooking) {
                      onOpenBooking();
                    }
                  } else {
                    const target = siteConfig?.heroButtonUrl || siteConfig?.navCtaLink || "contact";
                    if (target.startsWith("http://") || target.startsWith("https://")) {
                      window.open(target, "_blank");
                    } else {
                      onNavigate(target);
                    }
                  }
                }}
                className="w-auto px-6 py-2.5 sm:px-8.5 sm:py-4 fluid-btn-primary text-xs sm:text-[14px] font-bold tracking-tight cursor-pointer font-sans text-center"
              >
                {siteConfig?.heroButtonText || "Get in touch"}
              </motion.button>
            )}
          </motion.div>

        </div>

      </motion.section>

      {/* 2. Original Editorial Hero (Ramy Ayman Editorial Style - Now in the 2nd position) */}
      <motion.section 
        id="editorial-hero" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={staggerContainer}
        className="relative bg-transparent text-black dark:text-white py-14 sm:py-28 overflow-hidden select-none transition-colors duration-300 z-10"
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[calc(100vh-180px)] flex flex-col justify-between">
          
          {/* Badge at the top */}
          <motion.div variants={kineticReveal} className="w-full flex justify-center pt-8 mb-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-[11px] font-semibold text-black dark:text-white tracking-wide uppercase">
              {siteConfig?.editorialBadge || "Who I Am"}
            </div>
          </motion.div>

          {/* Main Content Body (Swapped: text on Left, image on Right) */}
          <div className="my-auto py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Dynamic Editorial Typography */}
            <div className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left flex flex-col justify-center items-center lg:items-start w-full overflow-visible">
              <motion.h1 variants={kineticReveal} className="font-sans text-[44px] sm:text-[80px] md:text-[90px] font-medium leading-[0.95] tracking-tighter text-black dark:text-white select-none text-center lg:text-left">
                {siteConfig?.editorialRole || "Hello!"}
              </motion.h1>
              <motion.h2 variants={kineticReveal} className="font-sans text-[32px] sm:text-[56px] md:text-[64px] leading-[1.1] pb-4 tracking-tighter text-[#5F6368] dark:text-zinc-500 font-normal mt-2 select-none whitespace-normal sm:whitespace-nowrap w-full text-center lg:text-left">
                {siteConfig?.editorialHeading || ("I'm " + (siteConfig?.brandName || "Rahul Dutta"))}
              </motion.h2>

              {/* Sub-paragraphs (Replicating layout & line height) */}
              <motion.div variants={kineticReveal} className="mt-8 sm:mt-10 w-full flex flex-col items-center lg:items-start">
                <TypewriterDescription
                  className="text-gray-600 dark:text-zinc-400 text-lg sm:text-[20px] font-normal leading-relaxed font-sans mb-8 text-center lg:text-left"
                  text={siteConfig?.editorialStatDescription || "Designer who builds. Writing HTML/CSS since 2015 and transitioning to product design in 2020, I use my engineering roots to design intuitive Figma systems. Shipped 17+ products across SaaS, Fintech, and Healthcare."}
                />

                <div className="my-5" />

                {/* Row 1 of tags */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 py-1 w-full">
                  {(siteConfig?.editorialTagsTop || ["UX Research", "UI Design", "Mobile Application", "MVP Design"]).map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#EFEFEA] hover:bg-[#e4e4dd] dark:bg-zinc-900 dark:hover:bg-zinc-800 text-[#3C4043] dark:text-zinc-300 rounded-full text-xs font-sans font-medium transition-all cursor-default select-none border border-transparent dark:border-zinc-800"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#757575]" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>

                <div className="my-3" />

                {/* Row 2 of tags */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 py-1 w-full">
                  {(siteConfig?.editorialTagsBottom || ["Figma", "React", "Tailwind CSS", "Framer Motion"]).map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#EFEFEA] hover:bg-[#e4e4dd] dark:bg-zinc-900 dark:hover:bg-zinc-800 text-[#3C4043] dark:text-zinc-300 rounded-full text-xs font-sans font-medium transition-all cursor-default select-none border border-transparent dark:border-zinc-800"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#757575]" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>

                {/* Contact Email & Map Location (Issue 3 / Editorial Bio updates) */}
                <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-8 justify-center lg:justify-start items-center w-full">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteConfig?.editorialEmail || "workprofile.uiux@gmail.com")}&su=${encodeURIComponent(siteConfig?.editorialEmailSubject || "Project Inquiry")}&body=${encodeURIComponent(siteConfig?.editorialEmailBody || "Hi Rahul,\n\nI would love to discuss a project with you.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col sm:flex-row items-center gap-2 sm:gap-2.5 text-center sm:text-left text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                  >
                    <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 group-hover:bg-black group-hover:text-white dark:group-hover:bg-zinc-700 dark:group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 border border-zinc-200/50 dark:border-zinc-700/50">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Email Me</p>
                      <p className="text-sm font-semibold tracking-tight">{siteConfig?.editorialEmail || "workprofile.uiux@gmail.com"}</p>
                    </div>
                  </a>

                  <a
                    href={siteConfig?.editorialLocationUrl || "https://maps.google.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col sm:flex-row items-center gap-2 sm:gap-2.5 text-center sm:text-left text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                  >
                    <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 group-hover:bg-black group-hover:text-white dark:group-hover:bg-zinc-700 dark:group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 border border-zinc-200/50 dark:border-zinc-700/50">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Location</p>
                      <p className="text-sm font-semibold tracking-tight">{siteConfig?.editorialLocationText || "Dhaka, Bangladesh"}</p>
                    </div>
                  </a>
                </div>

                <div className="my-5" />
              </motion.div>
            </div>

            {/* Right Column: Portrait Illustration Box */}
            <motion.div variants={kineticReveal} className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end w-full">
              <div className={`relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] aspect-square rounded-[44px] ${
                siteConfig?.editorialProfilePic 
                  ? "bg-transparent border-none p-0" 
                  : "bg-[#2E0B2B] dark:bg-[#1C061A] p-2 sm:p-4 border border-purple-950/10"
              } flex items-center justify-center overflow-hidden group select-none shadow-sm transition-colors`}>
                {siteConfig?.editorialProfilePic ? (
                  <img 
                    src={siteConfig.editorialProfilePic} 
                    alt={siteConfig.brandName || "Profile"} 
                    className="w-full h-full object-cover rounded-[44px]" 
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <svg 
                    viewBox="0 0 400 400" 
                    className="w-full h-full object-contain pointer-events-none"
                  >
                    {/* Background color of the illustration canvas */}
                    <rect width="100%" height="100%" fill="#290B27" rx="36" />
                    
                    {/* Back hair/head mass silhouette (Deepest plum-black) */}
                    <path d="M 60 110 C 60 80, 110 70, 180 70 C 270 70, 310 90, 310 150 C 310 210, 310 250, 310 290 C 310 310, 330 320, 330 340 C 330 350, 300 360, 270 360 C 200 360, 160 360, 120 360 C 80 360, 60 330, 60 290 Z" fill="#1A0219" />
                    
                    {/* Neck/Back head highlighted overlap (Soft pinkish coral) */}
                    <path d="M 190 130 C 205 130, 240 150, 250 190 C 260 230, 275 270, 280 310 C 285 330, 265 340, 235 340 C 195 340, 165 340, 135 340 C 175 310, 185 260, 185 220 C 185 180, 175 150, 190 130 Z" fill="#E29BB5" />
                    
                    {/* Face skin profile (Medium lilac/plum-pink) */}
                    <path d="M 135 150 C 115 150, 90 185, 85 220 C 80 255, 88 265, 94 270 C 101 275, 121 285, 116 305 C 111 325, 145 340, 195 340 C 215 340, 240 325, 245 285 C 250 245, 235 200, 220 170 C 200 150, 165 150, 135 150 Z" fill="#BD6D9A" />
                    
                    {/* Upper forehead bangs/hair overlay */}
                    <path d="M 110 100 C 80 120, 75 150, 75 170 C 75 180, 90 185, 95 170 C 100 155, 110 140, 120 130 Z" fill="#1A0219" />

                    {/* Beard mass contouring bottom of chin & neck */}
                    <path d="M 85 265 C 85 275, 90 290, 105 305 C 120 320, 145 340, 195 340 C 175 330, 155 310, 145 285 C 135 260, 115 250, 85 265 Z" fill="#1A0219" />

                    {/* Eyeglass circular lens (Bright pastel gold) */}
                    <circle cx="110" cy="215" r="17" fill="#FBD584" />
                    
                    {/* Glasses wire framing (Golden sweep) */}
                    <path d="M 110 215 C 140 200, 180 180, 225 170" stroke="#FBD584" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />
                  </svg>
                )}
              </div>
            </motion.div>

          </div>

          {/* Bottom bar metadata removed */}

        </div>
      </motion.section>

      {/* 5. Future Projects Section (Redesigned Grid with 6 items, custom hover, and middle bottom View All Work Theme Button) */}
      <motion.section 
        id="future-projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={staggerContainer}
        className="py-14 sm:py-24 bg-transparent text-black dark:text-white transition-colors duration-300 select-none relative z-10"
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Section Header following other sections layout */}
          <div className="w-full flex flex-col mb-16">
            <div className="w-full text-center lg:text-left">
              {/* Badge */}
              <motion.div variants={kineticReveal} className="w-full flex justify-center mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-[11px] font-semibold text-black dark:text-white tracking-wide uppercase">
                  {siteConfig?.futureProjectsBadge || "Future Projects"}
                </div>
              </motion.div>
              <ScrollHighlightText 
                textTop={siteConfig?.futureProjectsHeading || "Future Projects"}
                textBottom={siteConfig?.futureProjectsSubheading || "(Concepts & Vision)"}
                className="font-sans flex flex-col gap-3 sm:gap-4 select-none text-center lg:text-left"
              />
            </div>

            <div className="w-full my-10" />

            <div className="flex justify-center lg:justify-end w-full">
              <motion.div variants={kineticReveal} className="w-full lg:max-w-md text-center lg:text-right flex flex-col items-center lg:items-end">
                <TypewriterDescription
                  className="text-gray-600 dark:text-zinc-400 text-lg sm:text-[20px] font-normal leading-relaxed font-sans mb-6 text-center lg:text-right"
                  text={siteConfig?.futureProjectsDescription || "A curated collection of upcoming platforms, intuitive communication tools, and local-first software concepts that bridge the gap between design and high-performance frontend engineering."}
                />
                <button 
                  onClick={() => {
                    const link = siteConfig?.futureProjectsButtonLink || "projects";
                    onNavigate(link);
                  }}
                  className="inline-flex items-center gap-2 px-8 py-3.5 fluid-btn-primary text-xs font-semibold cursor-pointer shadow-sm uppercase tracking-wider"
                >
                  <span>{siteConfig?.futureProjectsButtonText || "View all work"}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                </button>
              </motion.div>
            </div>
          </div>

          {/* 6-Card Grid (3 columns on lg+, 2 columns on md/sm, 1 on mobile) with dynamic asymmetric heights */}
          <motion.div 
            variants={scrollRevealSmooth}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 items-start"
          >
            {isLoading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="flex flex-col w-full relative">
                  {/* Card box skeleton with nice pulse effect */}
                  <div className={`relative ${idx % 3 === 0 ? "aspect-square" : idx % 3 === 1 ? "aspect-[4/5]" : "aspect-[3/4]"} w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-zinc-100/50 dark:bg-zinc-900/40 shadow-sm border border-zinc-150/40 dark:border-zinc-800/30 select-none`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-zinc-800/50 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
                  </div>
                  {/* Title skeleton */}
                  <div className="mt-5 px-2 space-y-3">
                    <div className="h-6 w-3/4 bg-gray-200 dark:bg-zinc-850 rounded-[8px] animate-pulse" />
                    <div className="h-4 w-1/2 bg-gray-150 dark:bg-zinc-900 rounded-[6px] animate-pulse" />
                    <div className="h-4 w-1/3 bg-gray-100 dark:bg-zinc-900/50 rounded-[6px] animate-pulse mt-4" />
                  </div>
                </div>
              ))
            ) : (
              displayFeaturedProjects.map((item, idx) => (
                <ScrollParallaxCard key={idx} intensity={0.4}>
                  <motion.div 
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 150, 
                      damping: 20, 
                      delay: idx * 0.15 
                    }}
                    whileHover="hover"
                    onClick={() => onSelectFutureProject && onSelectFutureProject(item)}
                    className="group flex flex-col w-full relative cursor-pointer"
                  >
                    {/* Image Container with Custom Dual-Layer Hover Effect & dynamic aspect class (all borders removed) */}
                    <div className={`relative ${item.aspectClass || "aspect-square"} w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-gray-50 dark:bg-zinc-950 shadow-md select-none`}>
                      
                      {/* Under-layer (background image, 65% opacity) */}
                      <img 
                        src={item.image} 
                        alt={item.imageAlt || item.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-65 dark:opacity-50 pointer-events-none transition-transform duration-750 ease-out group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Top-layer (foreground image, scales down on hover smoothly with 2x scale reduction) */}
                      <div className="absolute inset-0 w-full h-full p-0 flex items-center justify-center">
                        <div className="w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[0.88] origin-center">
                          <img 
                            src={item.image} 
                            alt={item.imageAlt || item.title} 
                            className="w-full h-full object-cover pointer-events-none"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Typography metadata below card - size aligned with Recent Work */}
                    <div className="mt-5 text-left px-2">
                      <motion.h3 
                        variants={springTitleVariants}
                        className="font-sans text-xl sm:text-2xl font-medium leading-[1.25] text-black dark:text-white tracking-tight group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors"
                      >
                        {item.title}
                      </motion.h3>
                      <motion.div 
                        variants={springDescVariants}
                        className="flex flex-wrap items-center gap-2 mt-1.5"
                      >
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 font-sans font-normal">
                          {item.category}
                        </span>
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1 ml-1">
                            {item.tags.map((tag, tagIdx) => (
                              <span 
                                key={tagIdx} 
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-sans font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/80"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Arrow link styled with website main theme button layout */}
                    <motion.div variants={springButtonVariants} className="pt-3 text-left px-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectFutureProject && onSelectFutureProject(item);
                        }}
                        className="inline-flex items-center text-sm sm:text-base text-gray-600 dark:text-zinc-450 hover:text-black dark:hover:text-white font-sans transition-colors cursor-pointer font-medium"
                      >
                        View Case Study{" "}
                        <motion.span variants={arrowVariants} className="inline-block ml-0.5">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </motion.span>
                      </button>
                    </motion.div>
                  </motion.div>
                </ScrollParallaxCard>
              ))
            )}
          </motion.div>

        </div>
      </motion.section>

      {/* 1.5 What I Do Section (Perfect reproduction of the user's reference - Now Swapped to Section 4) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={staggerContainer}
        className="py-14 sm:py-24 bg-transparent relative overflow-hidden select-none transition-colors duration-300 z-10"
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 w-full">

          <div className="w-full flex flex-col">
            <div className="w-full text-center lg:text-left">
              {/* Badge */}
              <motion.div variants={kineticReveal} className="w-full flex justify-center mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-[11px] font-semibold text-black dark:text-white tracking-wide uppercase">
                  {siteConfig?.disciplinesBadge || "Disciplines"}
                </div>
              </motion.div>
              <ScrollHighlightText 
                textTop={siteConfig?.disciplinesHeading || "What I do?"}
                textBottom={siteConfig?.disciplinesSubheading || "(and love doing)"}
                className="font-sans flex flex-col gap-3 sm:gap-4 select-none text-center lg:text-left"
              />
            </div>

            <div className="w-full my-10" />

            <div className="flex justify-center lg:justify-end w-full">
              <motion.div variants={kineticReveal} className="w-full lg:max-w-md text-center lg:text-right">
                <TypewriterDescription
                  className="text-gray-600 dark:text-zinc-400 text-lg sm:text-[20px] font-normal leading-relaxed font-sans text-center lg:text-right"
                  text={siteConfig?.disciplinesDescription || "I build identities that move—sometimes polished, sometimes raw, but always usable. I love bold type, soft details, layered textures, and stories that don't fit neatly in boxes."}
                />
              </motion.div>
            </div>
          </div>

          {/* Disciplines Display */}
          <motion.div variants={kineticReveal} className="mt-28 w-full pb-4 overflow-hidden select-none">
            <div className="flex flex-col gap-8 md:gap-10 text-black dark:text-white font-sans font-semibold text-lg sm:text-xl md:text-2xl">
              {/* Row 1 - Scrolling Left */}
              <div className="w-full overflow-hidden relative py-2 pause-marquee">
                <div className="animate-marquee flex gap-6 md:gap-8 whitespace-nowrap">
                  {Array(8).fill(siteConfig?.disciplinesTagsTop && siteConfig.disciplinesTagsTop.length > 0 ? siteConfig.disciplinesTagsTop : ["Illustration", "Presentation", "Typography", "Branding"]).flat().map((item, idx) => (
                    <span 
                      key={idx} 
                      className="px-6 py-3 sm:px-8 sm:py-4 rounded-full border border-transparent bg-zinc-100/40 dark:bg-zinc-900/30 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-all cursor-default select-none uppercase tracking-wider inline-flex items-center justify-center backdrop-blur-sm shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Row 2 - Scrolling Right */}
              <div className="w-full overflow-hidden relative py-2 pause-marquee">
                <div className="animate-marquee-reverse flex gap-6 md:gap-8 whitespace-nowrap">
                  {Array(8).fill(siteConfig?.disciplinesTagsBottom && siteConfig.disciplinesTagsBottom.length > 0 ? siteConfig.disciplinesTagsBottom : ["Art Direction", "Layout", "Logo Design", "UI Design"]).flat().map((item, idx) => (
                    <span 
                      key={idx} 
                      className="px-6 py-3 sm:px-8 sm:py-4 rounded-full border border-transparent bg-zinc-100/40 dark:bg-zinc-900/30 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-all cursor-default select-none uppercase tracking-wider inline-flex items-center justify-center backdrop-blur-sm shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* 1.8 Where I've Worked & Certifications Section (Redesigned with Premium Sticky Left Column Layout and single-column cards on right) */}
      <motion.section 
        id="work"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={staggerContainer}
        className="py-14 sm:py-24 md:py-32 bg-transparent relative transition-colors duration-300 text-black dark:text-white z-10"
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Centered Pill Badge */}
          <motion.div variants={kineticReveal} className="w-full flex justify-center mb-16">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-[11px] font-semibold text-black dark:text-white tracking-wide uppercase">
              {siteConfig?.credentialsBadge || "Credentials"}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Sticky title. Locks elegantly under navbar */}
            <motion.div variants={kineticReveal} className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start w-full text-center lg:text-left">
              <ScrollHighlightText 
                textTop={siteConfig?.credentialsHeading || "Where"}
                textBottom={siteConfig?.credentialsSubheading || "I've worked"}
                className="font-sans flex flex-col gap-3 sm:gap-4 select-none text-center lg:text-left"
              />
            </motion.div>

            {/* Right Column: description and groups */}
            <div className="lg:col-span-7 text-center lg:text-left relative w-full flex flex-col gap-16">
              
              {/* Section Description */}
              <motion.div variants={kineticReveal} className="w-full lg:max-w-md lg:self-end lg:pt-36 pb-8 text-center lg:text-right mx-auto lg:mx-0">
                <TypewriterDescription
                  className="text-gray-600 dark:text-zinc-400 text-lg sm:text-[20px] font-normal leading-relaxed font-sans text-center lg:text-right"
                  text={siteConfig?.credentialsDescription || "A chronological timeline of my design and development journey, academic highlights, and verified industry credentials."}
                />
              </motion.div>

              {/* Dynamic Timeline Groups */}
              {activeTimelineSections.map((sec) => {
                const IconComponent = iconMap[sec.icon] || Award;
                return (
                  <div key={sec.id} className="w-full relative pb-4 lg:pb-6">
                    <div 
                      ref={(el) => { headerRefs.current[sec.id] = el; }}
                      className="lg:sticky lg:top-[100px] relative top-0 bg-transparent z-20 py-4 flex items-center justify-center lg:justify-start gap-3 border-b border-zinc-200/60 dark:border-zinc-800/40 mb-8 transition-colors duration-300"
                    >
                      <IconComponent className="w-5 h-5 text-black dark:text-white" strokeWidth={1.5} />
                      <h3 className="font-sans text-sm font-bold tracking-widest text-black dark:text-white uppercase">
                        {sec.title}
                      </h3>
                    </div>
                    
                    <div className="flex flex-col gap-6 md:gap-8 relative">
                      {sec.items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          ref={index === 0 ? (el) => { cardRefs.current[sec.id] = el; } : null}
                          whileHover={{ y: -6, scale: 1.01 }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          className="lg:sticky relative backdrop-blur-xl bg-white/70 dark:bg-[#0E0D0C]/60 border border-zinc-200/60 dark:border-zinc-800/40 rounded-[32px] p-8 sm:p-10 text-center sm:text-left flex flex-col justify-between overflow-hidden transition-all duration-300"
                          style={isLargeScreen ? { 
                            top: `${192 + index * 24}px`, 
                            zIndex: 10 + index 
                          } : {}}
                        >
                          <div className="w-full">
                            {/* Top Row: Title, Subtitle, & Date (Parallel & Right Aligned) */}
                            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start w-full gap-4">
                              <div className="flex-grow">
                                <h4 className="font-sans text-xl sm:text-2xl font-semibold leading-[1.25] text-black dark:text-white tracking-tight">
                                  {item.title}
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 font-sans mt-1.5 font-normal text-center sm:text-left">
                                  {item.subtitle}
                                </p>
                              </div>
                              <div className="flex flex-col items-center sm:items-end text-center sm:text-right shrink-0">
                                <div className="text-xs sm:text-sm font-mono text-gray-400 dark:text-zinc-500 whitespace-nowrap font-medium">
                                  {item.date}
                                </div>
                                {sec.id === "sec-education" && item.details && item.details.length > 0 && (
                                  <div className="mt-1.5 text-xs sm:text-sm font-mono text-gray-500 dark:text-zinc-400 font-medium whitespace-nowrap">
                                    {item.details[0]}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Divider Line & Details (if any exist) */}
                            {item.details && item.details.length > 0 && sec.id !== "sec-education" && (
                              <>
                                <div className="w-full border-t border-zinc-200/60 dark:border-zinc-800/40 my-6" />
                                {item.details.length === 1 && (item.details[0].startsWith("CGPA") || !item.details[0].includes(" ")) ? (
                                  <p className="text-gray-650 dark:text-zinc-500 text-xs sm:text-sm font-mono font-medium tracking-wider uppercase text-center sm:text-left">
                                    {item.details[0]}
                                  </p>
                                ) : (
                                  <ul className="text-gray-650 dark:text-zinc-400 text-xs sm:text-sm font-normal leading-relaxed font-sans space-y-2 list-none sm:list-disc pl-0 sm:pl-4 text-center sm:text-left">
                                    {item.details.map((detail, dIdx) => (
                                      <li key={dIdx}>{detail}</li>
                                    ))}
                                  </ul>
                                )}
                              </>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}

          </div> {/* Close lg:col-span-7 */}
          </div> {/* Close grid */}
        </div> {/* Close max-width container */}
      </motion.section>

      {/* 6. Recent Work Section (Swapped to be above My Expertise with premium custom project cards) */}
      <motion.section 
        id="recent-work"
        ref={workSectionRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={staggerContainer}
        className="py-14 sm:py-24 bg-transparent relative overflow-hidden w-full transition-colors duration-300 text-black dark:text-white z-10"
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="w-full flex flex-col">
            <div className="w-full text-center lg:text-left">
              {/* Badge */}
              <motion.div variants={kineticReveal} className="w-full flex justify-center mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-[11px] font-semibold text-black dark:text-white tracking-wide uppercase">
                  {siteConfig?.recentWorkBadge || "Recent Work"}
                </div>
              </motion.div>
              <ScrollHighlightText 
                textTop={siteConfig?.recentWorkHeading || "Selected"}
                textBottom={siteConfig?.recentWorkSubheading || "Works"}
                className="font-sans flex flex-col gap-3 sm:gap-4 select-none text-center lg:text-left"
              />
            </div>

            <div className="w-full my-10" />

            <div className="flex justify-center lg:justify-end w-full">
              <motion.div variants={kineticReveal} className="w-full lg:max-w-md text-center lg:text-right flex flex-col items-center lg:items-end">
                <TypewriterDescription
                  className="text-gray-600 dark:text-zinc-400 text-lg sm:text-[20px] font-normal leading-relaxed font-sans mb-6 text-center lg:text-right w-full"
                  text={siteConfig?.recentWorkDescription || "A display of premium responsive platforms, custom software, and visual interfaces built with absolute focus."}
                />
                <button 
                  onClick={() => onNavigate("architecture")}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-black/20 text-black hover:bg-black/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10 text-xs font-semibold cursor-pointer shadow-sm uppercase tracking-wider transition-all"
                >
                  <span>View recent work</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Carousel container wrapper */}
        <motion.div 
          variants={staggerCarouselContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="relative w-full"
        >
          {/* Carousel container (Outside of the max-width bounding box, with custom padding to align with container) */}
          <div 
            ref={blogScrollRef}
            className="flex gap-6 overflow-x-auto overflow-y-hidden pt-4 pb-8 scrollbar-none snap-x snap-mandatory carousel-padding"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div 
                  key={idx}
                  className="w-[320px] sm:w-[440px] md:w-[480px] min-w-[320px] sm:min-w-[440px] md:min-w-[480px] flex-shrink-0 snap-start flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail Skeleton */}
                    <div className="w-full relative aspect-[1.4] bg-zinc-100/50 dark:bg-zinc-900/40 rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-sm border border-zinc-150/40 dark:border-zinc-800/30 select-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-zinc-800/50 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
                    </div>
                    
                    {/* Title & Date Skeleton */}
                    <div className="pt-5 pb-2 text-left space-y-2.5">
                      <div className="h-6 w-3/4 bg-gray-200 dark:bg-zinc-850 rounded-[8px] animate-pulse" />
                      <div className="h-4 w-1/4 bg-gray-150 dark:bg-zinc-900 rounded-[6px] animate-pulse" />
                    </div>
                  </div>

                  <div className="pt-2 text-left">
                    <div className="h-4 w-1/3 bg-gray-100 dark:bg-zinc-900/50 rounded-[6px] animate-pulse" />
                  </div>
                </div>
              ))
            ) : (
              displayRecentWorks.map((post, idx) => (
                <motion.a 
                  key={idx}
                  href={post.url || "https://pagea.uk/ui-ux-rahul"}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={carouselCardReveal}
                  whileHover="hover"
                  className="w-[320px] sm:w-[440px] md:w-[480px] min-w-[320px] sm:min-w-[440px] md:min-w-[480px] flex-shrink-0 snap-start flex flex-col justify-between group cursor-pointer block"
                >
                  <div>
                    {/* Thumbnail with rounded corners and scale on hover */}
                    <div className="w-full relative aspect-[1.4] bg-[#E8EAED] dark:bg-zinc-800 rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-sm border border-zinc-200/60 dark:border-zinc-800/40 select-none">
                      <img 
                        src={post.image} 
                        alt={post.imageAlt || post.title} 
                        className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    {/* Text Details with clean margin */}
                    <div className="pt-5 pb-2 text-center sm:text-left">
                      <motion.h3 
                        variants={springTitleVariants}
                        className="font-sans text-xl sm:text-2xl font-medium leading-[1.25] text-black dark:text-white tracking-tight group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors text-center sm:text-left"
                      >
                        {post.title}
                      </motion.h3>
                      <motion.div 
                        variants={springDescVariants}
                        className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-zinc-400 font-sans flex flex-wrap items-center justify-center sm:justify-start gap-2"
                      >
                        <span>{post.date}</span>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1 ml-1">
                            {post.tags.map((tag, tagIdx) => (
                              <span 
                                key={tagIdx} 
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-sans font-semibold bg-zinc-100/40 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-800/40 backdrop-blur-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>

                  <motion.div variants={springButtonVariants} className="pt-2 text-center sm:text-left">
                    <span className="inline-flex items-center text-sm sm:text-base text-gray-600 dark:text-zinc-450 hover:text-black dark:hover:text-white font-sans transition-colors cursor-pointer font-medium">
                      View project{" "}
                      <motion.span variants={arrowVariants} className="inline-block ml-0.5">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </motion.span>
                    </span>
                  </motion.div>
                </motion.a>
              ))
            )}
          </div>
        </motion.div>

        {/* Centered Navigation Buttons (Main Website Button Style) */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex gap-4 justify-center">
            <button 
              onClick={scrollLeft}
              className="inline-flex items-center gap-2 px-7 py-3 fluid-btn-secondary text-xs font-bold font-sans tracking-tight cursor-pointer"
              title="Previous"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button 
              onClick={scrollRight}
              className="inline-flex items-center gap-2 px-7 py-3 fluid-btn-secondary text-xs font-bold font-sans tracking-tight cursor-pointer"
              title="Next"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.section>

      {/* 1.9 What I Do - Redesigned Services Section (Seamless transition with no top border or top header bar, fully customized Bento Grid) */}
      <motion.section 
        id="services" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={staggerContainer}
        className="py-14 sm:py-24 bg-transparent text-black dark:text-white relative overflow-hidden select-none transition-colors duration-300 z-10"
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="w-full flex flex-col">
            <div className="w-full text-center lg:text-left">
              {/* Badge */}
              <motion.div variants={kineticReveal} className="w-full flex justify-center mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-[11px] font-semibold text-black dark:text-white tracking-wide uppercase">
                  <span>{siteConfig?.servicesBadge || "My Expertise"}</span>
                </div>
              </motion.div>
              <ScrollHighlightText 
                textTop={siteConfig?.servicesHeading || "Services"}
                textBottom={siteConfig?.servicesSubheading || "(and how I help)"}
                className="font-sans flex flex-col gap-3 sm:gap-4 select-none text-center lg:text-left"
              />
            </div>

            <div className="w-full my-10" />

            <div className="flex justify-center lg:justify-end w-full">
              <motion.div variants={kineticReveal} className="w-full lg:max-w-md text-center lg:text-left">
                <TypewriterDescription
                  className="text-gray-600 dark:text-zinc-400 text-lg sm:text-[20px] font-normal leading-relaxed font-sans text-center lg:text-left"
                  text={siteConfig?.servicesDescription || "I build digital products that balance bold art direction with flawless usability, crafting memorable experiences that elevate your brand."}
                />
              </motion.div>
            </div>
          </div>

          <div className="w-full my-16 sm:my-20" />

          {/* Redesigned Premium Bento Grid of Services */}
          <motion.div 
            ref={servicesSectionRef}
            style={{ scale: servicesScale, y: servicesY, opacity: servicesOpacity }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {(services && services.length > 0 ? services : servicesData).map((service, index) => {
              const IconComponent = typeof service.icon === "string" ? (iconMap[service.icon] || Lightbulb) : (service.icon || Lightbulb);
              return (
                <ScrollParallaxCard key={index} intensity={0.5}>
                  <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 150, 
                      damping: 20, 
                      delay: index * 0.18 
                    }}
                    className="backdrop-blur-md bg-white/70 dark:bg-[#0E0D0C]/60 border border-zinc-200/60 dark:border-zinc-800/40 rounded-[32px] p-8 sm:p-10 text-center sm:text-left flex flex-col justify-between overflow-hidden relative group shadow-[0_8px_30px_rgba(0,0,0,0.01)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.15)] cursor-pointer h-full transition-all duration-500 ease-out hover:bg-white/95 dark:hover:bg-[#121110]/90 hover:border-black/20 dark:hover:border-zinc-700/60 hover:shadow-[0_24px_50px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_24px_50px_rgba(0,0,0,0.25)]"
                  >
                    <div>
                      {/* Top Row: Icon & Circular Step Badge with mobile specific layout */}
                      {/* For Desktop/Tablet */}
                      <div className="hidden sm:flex flex-row items-center justify-between w-full mb-12">
                        <div className="text-black dark:text-white transition-transform duration-500 ease-out group-hover:scale-110">
                          <IconComponent className="w-8 h-8 text-black dark:text-white" strokeWidth={1.5} />
                        </div>
                        <div className="w-9 h-9 rounded-full border border-zinc-200/60 dark:border-zinc-800/40 flex items-center justify-center text-sm font-mono font-medium text-gray-500 dark:text-zinc-400 select-none transition-all duration-500 group-hover:border-black/20 dark:group-hover:border-zinc-700/60">
                          {service.step}
                        </div>
                      </div>

                      {/* For Mobile Only */}
                      <div className="flex sm:hidden flex-col items-center gap-4 w-full mb-6">
                        <div className="w-9 h-9 rounded-full border border-zinc-200/60 dark:border-zinc-800/40 flex items-center justify-center text-xs font-mono font-medium text-gray-500 dark:text-zinc-400 select-none">
                          {service.step}
                        </div>
                        <div className="text-black dark:text-white transition-transform duration-500 ease-out group-hover:scale-110">
                          <IconComponent className="w-7 h-7 text-black dark:text-white" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Middle Row: Title */}
                      <h3 className="font-sans text-2xl sm:text-[28px] md:text-[32px] font-normal leading-[1.1] tracking-tight text-black dark:text-white mb-6 text-center sm:text-left">
                        {service.title}
                      </h3>

                      {/* Divider Line */}
                      <div className="w-full border-t border-gray-200 dark:border-zinc-800/60 mb-6" />

                      {/* Bottom Row: Description */}
                      <p className="text-gray-600 dark:text-zinc-400 text-sm sm:text-base font-normal leading-relaxed font-sans text-center sm:text-left">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                </ScrollParallaxCard>
              );
            })}
          </motion.div>

        </div>
      </motion.section>
      {/* 5. Two-column Split CTA ("For developers" / "For organizations" side-by-side, separated by a thin hairline vertical divider - Now Swapped to be below Writing) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={revealVariants}
        className="py-14 sm:py-24 bg-transparent relative overflow-hidden transition-colors duration-300 z-10"
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-0 relative text-black dark:text-white">
            
            {/* Vertical Split Line */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gray-200 dark:bg-zinc-800" />             {/* Left Column: Developers */}
            <div className="md:pr-16 flex flex-col justify-between items-center md:items-start text-center md:text-left">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  {siteConfig?.ctaDevLabel || "01 / OPEN SOURCE CODE"}
                </span>
                <h3 className="font-sans text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-white mt-4 mb-4 text-center md:text-left">
                  {siteConfig?.ctaDevTitle || "For Developers"}
                </h3>
                <p className="text-[#5F6368] dark:text-zinc-400 text-sm leading-relaxed mb-8 text-center md:text-left font-sans">
                  {siteConfig?.ctaDevDesc || "Get started with our lightweight Go compiler, spin up multi-agent networks in minutes, and trace prompts with real-time telemetry logs cleanly."}
                </p>
              </div>
              {(siteConfig?.ctaDevBtnUrl || "contact").startsWith("http") ? (
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={siteConfig?.ctaDevBtnUrl || "contact"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#000000] dark:bg-white text-white dark:text-black text-xs font-bold tracking-wider uppercase hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors inline-block"
                >
                  {siteConfig?.ctaDevBtnText || "Download CLI Node"} &rarr;
                </motion.a>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const url = siteConfig?.ctaDevBtnUrl || "contact";
                    onNavigate(url);
                  }}
                  className="px-6 py-3 rounded-full bg-[#000000] dark:bg-white text-white dark:text-black text-xs font-bold tracking-wider uppercase hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                >
                  {siteConfig?.ctaDevBtnText || "Download CLI Node"} &rarr;
                </motion.button>
              )}
            </div>

            {/* Right Column: Organizations */}
            <div className="md:pl-16 flex flex-col justify-between items-center md:items-start text-center md:text-left">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  {siteConfig?.ctaOrgLabel || "02 / SECURED PIPELINE"}
                </span>
                <h3 className="font-sans text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-white mt-4 mb-4 text-center md:text-left">
                  {siteConfig?.ctaOrgTitle || "For Organizations"}
                </h3>
                <p className="text-[#5F6368] dark:text-zinc-400 text-sm leading-relaxed mb-8 text-center md:text-left font-sans">
                  {siteConfig?.ctaOrgDesc || "Deploy secure, sandboxed sub-agents at scale. Integrate Gemini 2.5 Flash context caches, multi-user sync protocols, and enterprise security standards."}
                </p>
              </div>
              {(siteConfig?.ctaOrgBtnUrl || "contact").startsWith("http") ? (
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={siteConfig?.ctaOrgBtnUrl || "contact"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-gray-300 dark:border-zinc-700 text-xs font-bold tracking-wider uppercase text-[#1A1A1A] dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors inline-block"
                >
                  {siteConfig?.ctaOrgBtnText || "Request Enterprise Access"} &rarr;
                </motion.a>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const url = siteConfig?.ctaOrgBtnUrl || "contact";
                    onNavigate(url);
                  }}
                  className="px-6 py-3 rounded-full border border-gray-300 dark:border-zinc-700 text-xs font-bold tracking-wider uppercase text-[#1A1A1A] dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  {siteConfig?.ctaOrgBtnText || "Request Enterprise Access"} &rarr;
                </motion.button>
              )}
            </div>

          </div>
        </div>
      </motion.section>

      {/* 7. Redesigned Testimonials Section (White theme style in light mode, auto-scrolling horizontal marquee with pause-on-hover & client statistics) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={staggerContainer}
        className="py-14 sm:py-24 bg-transparent text-black dark:text-white relative overflow-hidden select-none transition-colors duration-300 z-10"
      >
        <div className="max-w-[1920px] mx-auto px-4 mb-16">
          <div className="w-full flex flex-col">
            <div className="w-full text-center lg:text-left">
              {/* Badge */}
              <motion.div variants={kineticReveal} className="w-full flex justify-center mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-[11px] font-semibold text-black dark:text-white tracking-wide uppercase">
                  {siteConfig?.reviewsBadge || "Reviews"}
                </div>
              </motion.div>
              <ScrollHighlightText 
                textTop={siteConfig?.reviewsHeading || "What clients"}
                textBottom={siteConfig?.reviewsSubheading || "say about me"}
                className="font-sans flex flex-col gap-3 sm:gap-4 select-none text-center lg:text-left"
              />
            </div>

            <div className="w-full my-10" />

            <div className="flex justify-center lg:justify-end w-full">
              <motion.div variants={kineticReveal} className="w-full lg:max-w-md text-center lg:text-right">
                <TypewriterDescription
                  className="text-gray-600 dark:text-zinc-400 text-lg sm:text-[20px] font-normal leading-relaxed font-sans text-center lg:text-right"
                  text={siteConfig?.reviewsDescription || "Honest feedback from people I've partnered with to design, build, and deploy custom digital experiences."}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Endless Horizontal Marquee Slider */}
        <motion.div 
          variants={scrollRevealSmooth} 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="w-full overflow-hidden relative py-4 pause-marquee"
        >
          {isLoading ? (
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory carousel-padding">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-[230px] min-w-[230px] sm:w-[320px] sm:min-w-[320px] md:w-[380px] md:min-w-[380px] p-4 sm:p-7 md:p-8 rounded-[20px] sm:rounded-[28px] bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200/40 dark:border-zinc-800/50 flex flex-col justify-between mr-5 sm:mr-6 shadow-[0_4px_16px_rgba(0,0,0,0.01)] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-150/40 dark:via-zinc-800/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  <div>
                    {/* Avatar Skeleton */}
                    <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full border border-zinc-200 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-800 mb-2.5 sm:mb-3.5 md:mb-4 animate-pulse" />

                    {/* Name & Role Skeleton */}
                    <div className="mb-3 sm:mb-3.5 md:mb-4 space-y-1.5">
                      <div className="h-4 w-1/2 bg-gray-200 dark:bg-zinc-850 rounded-[6px] animate-pulse" />
                      <div className="h-3 w-1/3 bg-gray-150 dark:bg-zinc-900 rounded-[4px] animate-pulse" />
                    </div>

                    {/* Divider Line */}
                    <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800/80 my-2.5 sm:my-3.5 md:my-4" />

                    {/* Testimonial text Skeleton */}
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-gray-100 dark:bg-zinc-900 rounded-[4px] animate-pulse" />
                      <div className="h-3 w-11/12 bg-gray-100 dark:bg-zinc-900 rounded-[4px] animate-pulse" />
                      <div className="h-3 w-4/5 bg-gray-100 dark:bg-zinc-900/50 rounded-[4px] animate-pulse" />
                    </div>
                  </div>

                  {/* Rating Footer Skeleton */}
                  <div className="flex items-center gap-1.5 mt-5 sm:mt-6 border-t border-zinc-200 dark:border-zinc-800/80 pt-3.5 sm:pt-4">
                    <div className="h-4 w-10 bg-gray-200 dark:bg-zinc-800 rounded-[4px] animate-pulse" />
                    <div className="h-3 w-20 bg-gray-150 dark:bg-zinc-850 rounded-[4px] animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="animate-marquee gap-6">
              {(() => {
                const baseTestimonials = testimonials && testimonials.length > 0 ? testimonials : [
                  {
                    id: "fallback-1",
                    name: "Larry Bruggman",
                    role: "CEO, GuardVision",
                    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
                    text: "Very reliable designer with excellent communication and modern UI skills.",
                    rating: 5
                  },
                  {
                    id: "fallback-2",
                    name: "Sofia Toms",
                    role: "Founder at GreenK Studios",
                    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
                    text: "Very reliable designer with excellent communication and modern UI skills.",
                    rating: 5
                  },
                  {
                    id: "fallback-3",
                    name: "Shaista Web",
                    role: "Shopify Developer",
                    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
                    text: "I had the pleasure of working with Rahul, and I can confidently say he is a talented and dedicated UI/UX Designer. He consistently delivered clean, user-centered designs and showed strong attention to detail in every project...",
                    rating: 5
                  }
                ];
                const repeatedTestimonials = [...baseTestimonials, ...baseTestimonials, ...baseTestimonials, ...baseTestimonials];
                return repeatedTestimonials.map((review, idx) => (
                  <div
                    key={`${review.id || idx}-${idx}`}
                    className="w-[230px] min-w-[230px] sm:w-[320px] sm:min-w-[320px] md:w-[380px] md:min-w-[380px] p-4 sm:p-7 md:p-8 rounded-[20px] sm:rounded-[28px] backdrop-blur-md bg-white/60 dark:bg-[#0E0D0C]/60 border border-zinc-200/60 dark:border-zinc-800/40 flex flex-col justify-between mr-5 sm:mr-6 shadow-[0_8px_32px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-300"
                  >
                    <div>
                      {/* Avatar */}
                      <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 mb-2.5 sm:mb-3.5 md:mb-4">
                        <img
                          src={review.avatar}
                          alt={review.avatarAlt || review.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Name & Role */}
                      <div className="mb-3 sm:mb-3.5 md:mb-4">
                        <h4 className="font-sans text-sm sm:text-base md:text-lg font-bold text-black dark:text-white tracking-tight">
                          {review.name}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-[#5F6368] dark:text-zinc-400 font-sans mt-0.5">
                          {review.role}
                        </p>
                      </div>

                      {/* Divider Line */}
                      <div className="w-full border-t border-zinc-200/60 dark:border-zinc-800/40 my-2.5 sm:my-3.5 md:my-4" />

                      {/* Testimonial text */}
                      <p className="text-[#3C4043] dark:text-zinc-300 text-[11px] sm:text-xs md:text-sm leading-relaxed font-sans font-normal line-clamp-5 sm:line-clamp-none">
                        &ldquo;{review.text}&rdquo;
                      </p>
                    </div>

                    {/* Rating Footer */}
                    <div className="flex items-center gap-1.5 mt-5 sm:mt-6 border-t border-zinc-200 dark:border-zinc-800/80 pt-3.5 sm:pt-4">
                      <span className="text-xs sm:text-sm font-bold text-black dark:text-white">{Number(review.rating || 5).toFixed(1)}</span>
                      <div className="flex text-amber-500 text-[10px] sm:text-xs">
                        {"★".repeat(Math.round(Number(review.rating || 5)) || 5)}
                      </div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          )}
        </motion.div>

        {/* Dynamic Statistics Block */}
        <motion.div variants={kineticReveal} className="max-w-[1920px] mx-auto px-4 mt-10 sm:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/40 border border-gray-200/40 dark:border-zinc-800/45 rounded-[28px] p-8 sm:p-10 text-center shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.25)] transition-all duration-300">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center md:border-r border-zinc-200 dark:border-zinc-800 px-4">
              <span className="text-3xl sm:text-4xl font-sans font-bold text-black dark:text-white">
                <AnimatedCounter value={siteConfig?.reviewsStat1Number || "100+"} />
              </span>
              <span className="text-[11px] sm:text-xs text-[#5F6368] dark:text-zinc-400 font-sans tracking-wide mt-2">
                {siteConfig?.reviewsStat1Label || "design projects completed."}
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center md:border-r border-zinc-200 dark:border-zinc-800 px-4">
              <span className="text-3xl sm:text-4xl font-sans font-bold text-black dark:text-white">
                <AnimatedCounter value={siteConfig?.reviewsStat2Number || "100%"} />
              </span>
              <span className="text-[11px] sm:text-xs text-[#5F6368] dark:text-zinc-400 font-sans tracking-wide mt-2">
                {siteConfig?.reviewsStat2Label || "Client satisfaction rate."}
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center px-4">
              <span className="text-3xl sm:text-4xl font-sans font-bold text-black dark:text-white">
                <AnimatedCounter value={siteConfig?.reviewsStat3Number || "40+"} />
              </span>
              <span className="text-[11px] sm:text-xs text-[#5F6368] dark:text-zinc-400 font-sans tracking-wide mt-2">
                {siteConfig?.reviewsStat3Label || "Happy Clients"}
              </span>
            </div>

          </div>
        </motion.div>
      </motion.section>

      {/* 8. Available For Work / Bookend Bottom CTA with Scroll-Driven Parallax and Scale Grow */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={staggerContainer}
        ref={ctaRef}
        className="py-14 sm:py-24 bg-transparent relative overflow-hidden transition-colors duration-300 z-10"
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            style={{ scale: ctaScale, y: ctaY, opacity: ctaOpacity }}
            className="relative backdrop-blur-xl bg-white/70 dark:bg-zinc-900/40 rounded-[28px] md:rounded-[36px] overflow-hidden p-8 sm:p-12 md:p-20 min-h-[460px] flex flex-col justify-center items-center lg:items-start text-center lg:text-left border border-gray-200/40 dark:border-zinc-800/45 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.25)]"
          >
            
            {/* Dynamic, scroll-twisted vector tick background field */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
              <div className="absolute right-[-200px] sm:right-[-100px] md:right-[-50px] lg:right-0 top-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] md:w-[900px] h-[500px] pointer-events-none">
                <motion.svg 
                  className="w-full h-full"
                  viewBox="0 0 1000 500" 
                  preserveAspectRatio="xMidYMid slice"
                  style={{ transformOrigin: "550px 250px", opacity: ctaTicksOpacity }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  {generateTicks().map((tick) => (
                    <motion.line
                      key={tick.id}
                      x1={tick.x1}
                      y1={tick.y1}
                      x2={tick.x2}
                      y2={tick.y2}
                      stroke={tick.color}
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      style={{ opacity: tick.opacity }}
                      animate={{
                        opacity: [tick.opacity * 0.7, tick.opacity * 1.3, tick.opacity * 0.7],
                      }}
                      transition={{
                        duration: 3 + (tick.ring % 4),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: (tick.ring * 0.1) + (tick.index * 0.02)
                      }}
                    />
                  ))}
                </motion.svg>
              </div>
            </div>
 
            {/* Content section */}
            <motion.div variants={kineticReveal} className="relative z-10 max-w-[550px] flex flex-col items-center lg:items-start justify-center h-full w-full">
              <h2 className="font-sans text-3xl sm:text-4xl md:text-[44px] font-medium leading-[1.15] text-black dark:text-white tracking-tight mb-8 text-center lg:text-left">
                {siteConfig?.bottomCtaHeading ? (
                  <span className="whitespace-pre-line">{siteConfig.bottomCtaHeading}</span>
                ) : (
                  <>
                    Let's build <br className="hidden sm:inline" />
                    something incredible <br className="hidden sm:inline" />
                    together
                  </>
                )}
                <span className="inline-block w-[3px] h-[0.9em] bg-black dark:bg-white ml-2 animate-pulse align-middle" style={{ verticalAlign: 'middle', marginTop: '-4px' }} />
              </h2>
 
              <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto justify-center lg:justify-start items-center mt-2">
                {!onOpenBooking && !(window as any).Cal && (siteConfig?.bottomCtaPrimaryBtnUrl || "contact").startsWith("http") ? (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={siteConfig?.bottomCtaPrimaryBtnUrl || "contact"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-7 py-3.5 sm:px-6 sm:py-3 rounded-full bg-black text-white hover:bg-zinc-800 border border-transparent dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-[13px] font-semibold tracking-tight cursor-pointer text-center block"
                  >
                    {siteConfig?.bottomCtaPrimaryBtnText || "Contact Rahul"}
                  </motion.a>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (onOpenBooking) {
                        onOpenBooking();
                      } else if (!(window as any).Cal) {
                        const url = siteConfig?.bottomCtaPrimaryBtnUrl || "contact";
                        if (url.startsWith("http")) {
                          window.open(url, "_blank");
                        } else {
                          onNavigate(url);
                        }
                      }
                    }}
                    className="w-full sm:w-auto px-7 py-3.5 sm:px-6 sm:py-3 rounded-full bg-black text-white hover:bg-zinc-800 border border-transparent dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-[13px] font-semibold tracking-tight cursor-pointer text-center"
                  >
                    {siteConfig?.bottomCtaPrimaryBtnText || "Contact Rahul"}
                  </motion.button>
                )}
                {(siteConfig?.bottomCtaSecondaryBtnUrl || "projects").startsWith("http") ? (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={siteConfig?.bottomCtaSecondaryBtnUrl || "projects"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-7 py-3.5 sm:px-6 sm:py-3 rounded-full bg-transparent border border-black/20 text-black hover:bg-black/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10 transition-all duration-300 text-sm sm:text-[13px] font-semibold tracking-tight cursor-pointer text-center block"
                  >
                    {siteConfig?.bottomCtaSecondaryBtnText || "View Solutions"}
                  </motion.a>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const url = siteConfig?.bottomCtaSecondaryBtnUrl || "projects";
                      onNavigate(url);
                    }}
                    className="w-full sm:w-auto px-7 py-3.5 sm:px-6 sm:py-3 rounded-full bg-transparent border border-black/20 text-black hover:bg-black/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10 transition-all duration-300 text-sm sm:text-[13px] font-semibold tracking-tight cursor-pointer text-center"
                  >
                    {siteConfig?.bottomCtaSecondaryBtnText || "View Solutions"}
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

    </div>
  );
}
