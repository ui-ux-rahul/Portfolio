import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { DeviceFrameCanvas } from "../components/DeviceFrameCanvas";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import { DesignTokenInspector } from "../components/DesignTokenInspector";
import {
  ArrowLeft,
  CheckCircle,
  Lightbulb,
  Users,
  Shield,
  Cpu,
  Layers,
  Sparkles,
  TrendingUp,
  Compass,
  Zap,
  Globe,
  Terminal,
  Sliders,
  Layout,
  Smartphone,
  Database,
  Code,
  Workflow,
  Activity,
  Eye,
  Settings,
  Command,
  Share2,
  PenTool,
  Server,
  Box,
  Lock
} from "lucide-react";

const renderFeatureIcon = (iconName: string | undefined, idx: number) => {
  const props = { className: "w-5 h-5 stroke-[1.8]" };
  switch (iconName) {
    case "Zap": return <Zap {...props} />;
    case "Cpu": return <Cpu {...props} />;
    case "Layers": return <Layers {...props} />;
    case "Sparkles": return <Sparkles {...props} />;
    case "Shield": return <Shield {...props} />;
    case "Globe": return <Globe {...props} />;
    case "Terminal": return <Terminal {...props} />;
    case "Sliders": return <Sliders {...props} />;
    case "Layout": return <Layout {...props} />;
    case "Smartphone": return <Smartphone {...props} />;
    case "Database": return <Database {...props} />;
    case "Code": return <Code {...props} />;
    case "Workflow": return <Workflow {...props} />;
    case "Activity": return <Activity {...props} />;
    case "Eye": return <Eye {...props} />;
    case "Settings": return <Settings {...props} />;
    case "Command": return <Command {...props} />;
    case "Share2": return <Share2 {...props} />;
    case "CheckCircle": return <CheckCircle {...props} />;
    case "TrendingUp": return <TrendingUp {...props} />;
    case "PenTool": return <PenTool {...props} />;
    case "Server": return <Server {...props} />;
    case "Box": return <Box {...props} />;
    case "Lock": return <Lock {...props} />;
    default:
      if (idx === 0) return <Cpu {...props} />;
      if (idx === 1) return <Layers {...props} />;
      return <TrendingUp {...props} />;
  }
};
import { SiteConfig } from "../types";
import FAQSection from "../components/FAQSection";
import BottomCTASection from "../components/BottomCTASection";
import ScrollHighlightText from "../components/ScrollHighlightText";
import TypewriterDescription from "../components/TypewriterDescription";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

const kineticReveal = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

interface ProjectDetailsProps {
  project: {
    title: string;
    category: string;
    image: string;
    imageAlt?: string;
  };
  onNavigate: (page: string) => void;
  onOpenBooking?: () => void;
  siteConfig: SiteConfig | null;
}

export default function ProjectDetails({ project, onNavigate, onOpenBooking, siteConfig }: ProjectDetailsProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hardcoded highly detailed research-based case studies for all 6 future projects
  const caseStudies: Record<string, any> = {
    "Upshop": {
      tagline: "Reengineering automated inventory systems for sustainable retail grocery supply chains.",
      role: "Lead Product Designer & UX Researcher",
      timeline: "Jan - May 2026",
      impact: "34% reduction in food spoilage, 18% improvement in shelf replenishment efficiency.",
      stack: ["Figma Design Tokens", "React Workspace", "D3.js Forecasting", "Tailwind CSS"],
      challenge: "Retail grocery managers face extreme fatigue coordinating manual inventory logs, leading to massive over-ordering, high food waste, and frequent stockouts of essential items. The existing legacy dashboard felt cluttered, slow, and lacked predictive context.",
      solution: "We designed an automated replenishment workspace featuring real-time AI-driven demand forecasting. The platform aggregates inventory, sales velocity, and historical patterns, transforming tedious inventory management into a passive, click-to-approve workflow.",
      researchInsights: [
        "Store managers spend an average of 3.5 hours per day manually scanning and logging inventory.",
        "82% of spoilage occurs due to sudden local weather shifts or miscalculated promotions that weren't accounted for in old databases.",
        "Overcomplicated data displays cause cognitive overload, resulting in ordering errors on 15% of bulk items."
      ],
      userPersona: {
        name: "Marcus Vance",
        role: "Produce Department Manager",
        quote: "I just want to know what to order next Tuesday without spending hours comparing spreadsheets with weather forecasts.",
        needs: [
          "Instant recommendations with high-level confidence scores",
          "One-click batch order approvals to save time",
          "Clear visual alerts when items are approaching expiry dates"
        ]
      },
      designSystem: {
        colors: [
          { name: "Eco Green", hex: "#10B981" },
          { name: "Forest Dark", hex: "#064E3B" },
          { name: "Clean Slate", hex: "#F3F4F6" },
          { name: "Charcoal Accent", hex: "#1F2937" }
        ],
        typography: "Space Grotesk (Headings) paired with Inter (Body text) for technical clarity.",
        spacing: "Strict 8px grid system for highly dense, data-rich layouts."
      },
      features: [
        {
          title: "Predictive Ordering Engine",
          description: "Generates smart recommendation cards based on deep historical velocity, live local events, and predictive weather alerts.",
          metric: "94% Accuracy rate"
        },
        {
          title: "The One-Click Batch Sheet",
          description: "Allows department heads to approve a day's worth of fresh food orders in under 30 seconds, bypassing micro-inputs.",
          metric: "Saved 2.8 hrs daily"
        },
        {
          title: "Dynamic Expiry Heatmaps",
          description: "Highlights products on virtual shelving layouts that are nearing expiration, guiding staff to implement discount flags.",
          metric: "Minimized spoilage by 34%"
        }
      ],
      takeaways: [
        "Automation only succeeds when users have full agency. Building an explicit 'Approval' gate established deep trust with store managers.",
        "Data density must be balanced with visual hierarchy. Prioritizing high-confidence ordering recommendations over general charts reduced ordering errors significantly."
      ]
    },
    "TinyFish": {
      tagline: "Empowering developers to orchestrate, debug, and monitor complex prompt chains and AI agents.",
      role: "Lead Systems Designer & Front-End Prototyper",
      timeline: "March - June 2026",
      impact: "52% acceleration in prompt debugging speed, 99.8% conflict-free offline model execution.",
      stack: ["Figma Design Systems", "XState Machines", "React & Tailwind", "WebSockets"],
      challenge: "Prompt engineers and developers are struggling with clunky, code-heavy IDE setups to test multi-model interactions. Keeping track of variable inputs, latency bottlenecks, and nested token usage was incredibly frustrating and visually opaque.",
      solution: "We engineered a clean, local-first node workspace that visually maps multi-model prompt chains. The interface combines drag-and-drop orchestration with instant playground testing, real-time token tracking, and local-first data caching.",
      researchInsights: [
        "Prompt engineers change variables up to 80 times per session, meaning immediate playgrounds are vital.",
        "42% of execution bottlenecks occur at intermediate API steps, which are traditionally hidden from view.",
        "Developers prefer dark, minimalist, high-contrast interfaces with dense layout options for intensive multi-hour workflows."
      ],
      userPersona: {
        name: "Dr. Elena Rostova",
        role: "Senior AI Agent Architect",
        quote: "Debugging nested model calls feels like searching in the dark. I need to see token outputs, cost, and latency in a single visual timeline.",
        needs: [
          "Interactive canvas to link prompts, filters, and models",
          "Dynamic nested payload inspection at every execution step",
          "Instant offline playground mode for prompt iteration"
        ]
      },
      designSystem: {
        colors: [
          { name: "Neon Cyan", hex: "#06B6D4" },
          { name: "Deep Ink", hex: "#0E1118" },
          { name: "Space Border", hex: "#1E293B" },
          { name: "Vibrant Violet", hex: "#8B5CF6" }
        ],
        typography: "JetBrains Mono (Data/Tech UI) paired with Inter (UI controls) for precision.",
        spacing: "Dense, modular flex containers using high-precision layout tokens."
      },
      features: [
        {
          title: "Visual Agent Orchestrator",
          description: "An interactive, line-connected node canvas where users can route prompt outputs directly into secondary model inputs.",
          metric: "Zero-latency canvas"
        },
        {
          title: "Real-Time Token & Cost Tracker",
          description: "Calculates total cost, latency, and token footprint on-the-fly as developers iterate on prompt variables.",
          metric: "Precision token budget"
        },
        {
          title: "Timeline Replay Engine",
          description: "A chronological execution logs timeline that allows developers to step backward and forward through prompt states.",
          metric: "52% faster debugging"
        }
      ],
      takeaways: [
        "Local-first state management was critical. Syncing complex canvas nodes with XState created an incredibly predictable, bug-free prototyping environment.",
        "Minimalism is not empty space; it is structured density. Combining micro-indicators with clear visual labels turned chaos into a high-performance workspace."
      ]
    },
    "Barrow Street Nursery School": {
      tagline: "Reimagining the digital experience for early childhood education and parent-school engagement.",
      role: "Solo UI/UX Designer & Brand Strategist",
      timeline: "Nov 2025 - Feb 2026",
      impact: "85% reduction in parent registration times, 94% parent satisfaction rating on daily updates.",
      stack: ["Figma Editorial Kits", "React SPA", "Directus CMS", "Tailwind CSS"],
      challenge: "Barrow Street's legacy website felt cold, bureaucratic, and difficult to navigate. Parents struggled to register their children, download calendars, or view daily school updates, resulting in heavy administrative overhead for school directors.",
      solution: "We designed a warm, editorial, highly accessible parent portal. Featuring organic curves, spacious grids, and beautiful display typography, the site transforms cold administrative forms into welcoming, human registration flows and interactive daily journals.",
      researchInsights: [
        "Parents primarily access school updates during commute windows, making superb mobile optimization critical.",
        "Over 60% of registration drop-offs occurred because parents couldn't save their progress on lengthy PDF applications.",
        "Aesthetic alignment is vital—parents associate clean, warm design with institutional safety and care."
      ],
      userPersona: {
        name: "Sarah & Liam Chen",
        role: "Parents of a 3-Year-Old",
        quote: "We want to feel connected to our child's daily learning, and we need registration to be simple and reassuring.",
        needs: [
          "Seamless multi-step registration forms with auto-save",
          "Rich, interactive daily classroom journal with photos",
          "Clear calendar integration for school closure dates"
        ]
      },
      designSystem: {
        colors: [
          { name: "Warm Ochre", hex: "#D97706" },
          { name: "Sand Light", hex: "#FEF3C7" },
          { name: "Warm Charcoal", hex: "#1F2937" },
          { name: "Terracotta Accent", hex: "#DC2626" }
        ],
        typography: "Playfair Display (Serif headings) paired with Inter (Sans-serif body) for classic warmth.",
        spacing: "Generous padding, soft margins, and elegant whitespace for a relaxed editorial mood."
      },
      features: [
        {
          title: "Adaptive Application Pipeline",
          description: "A modular, multi-step application wizard that allows parents to upload child medical files and sign documents in minutes.",
          metric: "85% faster registration"
        },
        {
          title: "The Daily Classroom Journal",
          description: "An elegant, blog-style feed where teachers upload moments of learning, craft projects, and notes for parent viewing.",
          metric: "94% engagement rate"
        },
        {
          title: "Interactive School Calendar",
          description: "A highly clear, filterable event hub that seamlessly pushes reminders directly to parents' native phone calendars.",
          metric: "Zero parent miss rate"
        }
      ],
      takeaways: [
        "In education, warmth is usability. Soft colors, spacious layouts, and beautiful photography reduced registration anxiety for parents.",
        "Form optimization is king. Replacing offline paper applications with step-by-step digital fields completely eliminated processing errors."
      ]
    },
    "Prosupps": {
      tagline: "E-Commerce brand systems and custom subscription layers designed for elite athletic lifestyle brands.",
      role: "Senior UI/UX Designer & E-Commerce Consultant",
      timeline: "July - Dec 2025",
      impact: "42% boost in subscription opt-ins, 22% increase in average order value (AOV) via bento cross-sells.",
      stack: ["Figma Design Tokenry", "Shopify Plus Custom App", "React UI", "Tailwind CSS"],
      challenge: "Prosupps was suffering from high cart abandonment on subscription products. The supplement selector UI was rigid and confusing, preventing users from customizing recurring plans or creating personalized workout bundles.",
      solution: "We designed and prototyped an interactive, bento-grid product experience featuring custom subscription plans and smart checkout flows. Customers can easily swap flavors, add pre-workout supplements, and customize delivery intervals.",
      researchInsights: [
        "70% of fitness consumers swap supplement flavors monthly; rigid subscriptions cause them to cancel entirely.",
        "Interactive product bundles increase average basket sizes by 22% when shown directly during customization.",
        "High-contrast dark mode interfaces with red accents align perfectly with the physiological feeling of workout energy."
      ],
      userPersona: {
        name: "Tyler 'The Beast' Thorne",
        role: "Competitive Powerlifter",
        quote: "I need to easily customize my workout supplement stacks, choose my favorite flavors, and have them arrive right on time.",
        needs: [
          "Interactive flavor selector UI with drag-and-drop bundles",
          "Instant access to scientific ingredient profiles and reviews",
          "Frictionless subscription dashboard to delay or swap orders"
        ]
      },
      designSystem: {
        colors: [
          { name: "Pro Red", hex: "#EF4444" },
          { name: "Deep Matte Black", hex: "#0B0C0E" },
          { name: "High Contrast White", hex: "#FFFFFF" },
          { name: "Metallic Zinc", hex: "#27272A" }
        ],
        typography: "Space Grotesk (Bold, uppercase headers) paired with Inter for high-performance impact.",
        spacing: "Tight, dense, high-contrast grids with responsive cards and clean border separations."
      },
      features: [
        {
          title: "The Stack Builder Interface",
          description: "A highly interactive bento grid where athletes drag and drop complementary pre-workouts, proteins, and recovery supplements.",
          metric: "+22% Average order value"
        },
        {
          title: "Frictionless Subscriptions Hub",
          description: "An intuitive parent dashboard that lets users change flavors, add products, or adjust delivery dates with one click.",
          metric: "42% subscription boost"
        },
        {
          title: "Micro-Nutrition Specs Drawer",
          description: "Provides fully transparent, beautiful displays of clinical dosages and ingredients to establish premium brand trust.",
          metric: "98% customer trust rating"
        }
      ],
      takeaways: [
        "Flexibility cures subscription churn. Giving users easy control over flavors and schedules kept them subscribed much longer.",
        "Bold styling drives conversions. Elevating standard product lists into stylized, interactive bento systems created an active, game-like experience."
      ]
    },
    "Suzy Welch": {
      tagline: "Elevating career development and executive training through clean, premium online learning environments.",
      role: "Lead UI/UX Designer & Product Lead",
      timeline: "May - Sept 2025",
      impact: "76% completion rates on premium courses, 3x increase in weekly active executive coaching bookings.",
      stack: ["Figma Design Library", "Next.js Framework", "Node.js API", "Tailwind CSS"],
      challenge: "Executive clients looking for premium leadership advice found existing education platforms confusing, slow, and overly academic. The design lacked prestige, making it difficult to justify premium course pricing.",
      solution: "We designed a premium executive coaching and interactive video portal. Merging high-fashion editorial layouts with intuitive video players, structured goal tracking, and smooth reservation flows, the site feels like a private masterclass.",
      researchInsights: [
        "Busy managers only have 15-minute daily learning windows, requiring highly structured video modules.",
        "Interactive goal sheets with personalized checklists increase course completion rates by 76%.",
        "Classic editorial styling with ample whitespace establishes immediate professional authority and premium trust."
      ],
      userPersona: {
        name: "Diana Sterling",
        role: "VP of Product at Fintech Startup",
        quote: "I need high-impact leadership tools that I can review and apply in my active day-to-day work.",
        needs: [
          "Highly scannable executive summary notes alongside video",
          "Interactive career mapping and daily leadership checklists",
          "Seamless booking with professional coaches and experts"
        ]
      },
      designSystem: {
        colors: [
          { name: "Warm Gold Accent", hex: "#B45309" },
          { name: "Pure Sand", hex: "#FAF9F6" },
          { name: "Obsidian Black", hex: "#111111" },
          { name: "Earthy Taupe", hex: "#78716C" }
        ],
        typography: "Playfair Display (Serif) and Inter (Sans-serif) for high-end academic prestige.",
        spacing: "Generous whitespace, smooth line height, and precise typography sizing for high readability."
      },
      features: [
        {
          title: "Prestige Video Suite",
          description: "An immersive video dashboard that seamlessly matches courses with summaries, downloadable templates, and transcripts.",
          metric: "76% course completion"
        },
        {
          title: "Interactive Career Playbook",
          description: "A private digital workbook where executives write their long-term growth plans and map out key business decisions.",
          metric: "Highly rated digital asset"
        },
        {
          title: "Executive Calendar Planner",
          description: "Frictionless, clean booking interface that links clients with expert career consultants with zero scheduling conflicts.",
          metric: "3x increase in bookings"
        }
      ],
      takeaways: [
        "Executive learning must be action-oriented. Structuring micro-summary cards next to video playheads helped busy users stay focused.",
        "Minimalism reinforces luxury. Allowing elements plenty of breathing room elevated the courses and validated the premium price point."
      ]
    },
    "New Engen": {
      tagline: "Providing next-generation visual dashboards and high-speed multi-channel attribution for growth marketers.",
      role: "Lead Interface Designer & Data Visualizer",
      timeline: "Jan - May 2025",
      impact: "26% improvement in marketing budget allocation speed, 45% reduction in channel report generation times.",
      stack: ["Figma Chart Systems", "D3.js & Recharts", "React Framework", "Tailwind CSS"],
      challenge: "Performance marketing teams are overwhelmed with complex analytics spread across separate social media platforms. Existing marketing tools failed to display cross-channel performance clearly, causing slower decisions and lost revenue.",
      solution: "We designed a multi-channel performance and campaign attribution platform. Utilizing high-fidelity Recharts structures and customizable metric cards, the dashboard aggregates complex ad spend, conversion, and ROI metrics into a single screen.",
      researchInsights: [
        "Marketing teams spend 10+ hours a week exporting CSV files to create unified cross-channel performance reports.",
        "Live campaign visualizers reduce mistakes in marketing budget distribution by 26%.",
        "Clear color coordination for individual advertising channels ensures faster scannability during live team reviews."
      ],
      userPersona: {
        name: "Aris Thorne",
        role: "Director of Performance Marketing",
        quote: "I need to see exactly which ad creative is driving the highest return on ad spend (ROAS) across all social platforms.",
        needs: [
          "Unified multi-channel ROAS dashboard updated in real-time",
          "Interactive attribution model comparisons with drag handles",
          "Customizable report sheets with fast PNG and PDF export"
        ]
      },
      designSystem: {
        colors: [
          { name: "Royal Purple", hex: "#7C3AED" },
          { name: "Growth Emerald", hex: "#10B981" },
          { name: "Slate Base", hex: "#0F172A" },
          { name: "Border Indigo", hex: "#312E81" }
        ],
        typography: "Space Grotesk (Numbers and charts) paired with Inter (UI buttons) for optimal data legibility.",
        spacing: "Highly aligned bento structures optimized for responsive data dashboards and visual graphs."
      },
      features: [
        {
          title: "Unified Ad Spend Visualizer",
          description: "A customizable, interactive chart system that combines cross-platform ad spend and conversion metrics in real-time.",
          metric: "Saved 10 hrs weekly"
        },
        {
          title: "Creative Attribution Matrix",
          description: "A highly visual asset grid showing live creative assets ranked by performance, CTR, and conversion metrics.",
          metric: "26% faster allocations"
        },
        {
          title: "One-Click Report Exporter",
          description: "Enables users to customize executive slide presentations and download reports as high-fidelity PDFs in seconds.",
          metric: "45% faster reports"
        }
      ],
      takeaways: [
        "Interactive graphs must be self-explanatory. Tooltips, range handles, and simple filters help users discover key insights without tutorials.",
        "Color serves as information. Consistent color tokens across channels (e.g. green for Meta, blue for LinkedIn) improved data reading speed."
      ]
    }
  };

  const defaultStudy = caseStudies[project.title] || {
    tagline: "Designing high-fidelity, user-centered solutions for complex digital experiences.",
    role: "Lead UI/UX Designer & Researcher",
    timeline: "2026",
    impact: "Significantly improved core user metrics, workflow speed, and design systems consistency.",
    stack: ["Figma Design", "React Prototyping", "Tailwind CSS"],
    challenge: "Developing a highly usable product interface that coordinates complex user data into simple, intuitive workspaces, replacing legacy workflows with automated, modern patterns.",
    solution: "We designed a custom digital environment that automates key tasks and structures density elegantly with spacious padding and clear, responsive typography.",
    researchInsights: [
      "Users struggled with clunky administrative workflows and slow interface feedback.",
      "Clear visual indicators and localized actions reduced errors and processing overhead.",
      "Classic, high-contrast typography and subtle motion significantly improved platform trust."
    ],
    userPersona: {
      name: "Taylor Reed",
      role: "Operations Director",
      quote: "I need simple digital dashboards that help me make key decisions without unnecessary clicks.",
      needs: [
        "Streamlined navigation flows",
        "Clear metrics and visual indicators",
        "Consistent styling across screen sizes"
      ]
    },
    designSystem: {
      colors: [
        { name: "Accent Blue", hex: "#4285F4" },
        { name: "Matte Slate", hex: "#1E293B" },
        { name: "Warm White", hex: "#F8FAFC" }
      ],
      typography: "Space Grotesk paired with Inter for classic tech-forward authority.",
      spacing: "Dense, modular grids styled with consistent spacing and high visual precision."
    },
    features: [
      {
        title: "Intelligent Dashboard Hub",
        description: "Optimizes core metrics and displays actionable tasks with custom color indicators and live status updates.",
        metric: "Frictionless experience"
      },
      {
        title: "Unified Design Tokens",
        description: "Enables designers and developers to maintain brand consistency across responsive screen layouts.",
        metric: "100% pixel-perfect"
      }
    ],
    takeaways: [
      "User agency is paramount. Designing explicit approvals and clear interactive feedback is key to user confidence.",
      "Visual rhythm and layout hierarchy simplify complex digital systems, reducing cognitive fatigue."
    ]
  };

  const p = (project as any) || {};

  const study = {
    tagline: p.tagline || defaultStudy.tagline,
    role: p.role || defaultStudy.role,
    timeline: p.timeline || defaultStudy.timeline,
    impact: p.impact || defaultStudy.impact,
    stack: (Array.isArray(p.stack) && p.stack.length > 0) ? p.stack : (defaultStudy.stack || []),
    challenge: p.challenge || defaultStudy.challenge,
    solution: p.solution || defaultStudy.solution,
    researchInsights: (Array.isArray(p.researchInsights) && p.researchInsights.length > 0) ? p.researchInsights : (defaultStudy.researchInsights || []),
    userPersona: {
      name: p.userPersonaName || defaultStudy.userPersona?.name || "Target User",
      role: p.userPersonaRole || defaultStudy.userPersona?.role || "Key Stakeholder",
      quote: p.userPersonaQuote || defaultStudy.userPersona?.quote || "",
      needs: (Array.isArray(p.userPersonaNeeds) && p.userPersonaNeeds.length > 0) ? p.userPersonaNeeds : (defaultStudy.userPersona?.needs || [])
    },
    designSystem: {
      colors: (Array.isArray(p.designSystemColors) && p.designSystemColors.length > 0) ? p.designSystemColors : (defaultStudy.designSystem?.colors || []),
      typography: p.designSystemTypography || defaultStudy.designSystem?.typography || "Inter paired with system fonts.",
      spacing: p.designSystemSpacing || defaultStudy.designSystem?.spacing || "Spacious padding and clean whitespace."
    },
    features: (Array.isArray(p.features) && p.features.length > 0) ? p.features : (defaultStudy.features || []),
    takeaways: (Array.isArray(p.takeaways) && p.takeaways.length > 0) ? p.takeaways : (defaultStudy.takeaways || [])
  };  return (
    <div className="pt-[96px] md:pt-[104px] pb-24 bg-transparent text-black dark:text-white transition-colors duration-300 min-h-screen select-none">
      
      {/* 1. Sticky/Floating Navigation Back Bar */}
      <div className={`sticky top-[80px] md:top-[88px] z-40 transition-all duration-300 py-3 sm:py-4 border-none ${isSticky ? "bg-white/90 dark:bg-[#0E0D0C]/90 backdrop-blur-md" : "bg-transparent"}`}>
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <button
            onClick={() => onNavigate("home")}
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 fluid-btn-primary text-[11px] sm:text-xs font-bold uppercase tracking-wider cursor-pointer shadow-2xs shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Go Back
          </button>
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#5F6368] dark:text-zinc-500 font-bold hidden md:block truncate max-w-md">
            Case Study: {project.title}
          </div>
          <div className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1 rounded-full border border-zinc-200/60 dark:border-zinc-800/40 bg-gray-50/50 dark:bg-zinc-900/50 text-[10px] sm:text-[11px] font-semibold text-black dark:text-white tracking-wide uppercase shrink-0 truncate max-w-[140px] sm:max-w-none">
            {project.category}
          </div>
        </div>
      </div>

      {/* 2. Immersive Hero Header */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="relative overflow-hidden pt-16 pb-24 sm:pb-32"
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Core Description & Metrics */}
            <motion.div variants={kineticReveal} className="lg:col-span-6 text-left flex flex-col justify-center">
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full border border-zinc-200/60 dark:border-zinc-800/40 bg-gray-50/50 dark:bg-zinc-900/50 text-[11px] font-semibold text-black dark:text-white tracking-wide uppercase">
                  CMS CASE STUDY
                </span>
              </div>
              <ScrollHighlightText
                textTop={project.title}
                textBottom={`(${project.category})`}
                className="font-sans select-none text-left"
              />
              <TypewriterDescription
                text={study.tagline}
                className="mt-8 text-gray-600 dark:text-zinc-400 text-lg sm:text-[20px] font-normal leading-relaxed font-sans max-w-2xl"
              />

              {/* Core Metadata Metrics Grid */}
              <div className="grid grid-cols-2 gap-6 sm:gap-8 mt-12 border-t border-zinc-200/60 dark:border-zinc-800/40 pt-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                  <h4 className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#5F6368] dark:text-zinc-500 font-bold">My Role</h4>
                  <p className="text-sm sm:text-base font-semibold text-black dark:text-white mt-1 font-sans">{study.role}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                  <h4 className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#5F6368] dark:text-zinc-500 font-bold">Timeline</h4>
                  <p className="text-sm sm:text-base font-semibold text-black dark:text-white mt-1 font-sans">{study.timeline}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="col-span-2 sm:col-span-1">
                  <h4 className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#5F6368] dark:text-zinc-500 font-bold mb-3">Key Stack</h4>
                  {/* Row 1 of Key Stack */}
                  <div className="flex flex-wrap gap-2 py-1 w-full">
                    {study.stack.slice(0, Math.ceil(study.stack.length / 2)).map((item: string) => (
                      <span 
                        key={item} 
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#EFEFEA] hover:bg-[#e4e4dd] dark:bg-zinc-900 dark:hover:bg-zinc-800 text-[#3C4043] dark:text-zinc-300 rounded-full text-xs font-sans font-medium transition-all cursor-default select-none border border-transparent dark:border-zinc-800"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#757575]" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>

                  <div className="my-1" />

                  {/* Row 2 of Key Stack */}
                  <div className="flex flex-wrap gap-2 py-1 w-full">
                    {study.stack.slice(Math.ceil(study.stack.length / 2)).map((item: string) => (
                      <span 
                        key={item} 
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#EFEFEA] hover:bg-[#e4e4dd] dark:bg-zinc-900 dark:hover:bg-zinc-800 text-[#3C4043] dark:text-zinc-300 rounded-full text-xs font-sans font-medium transition-all cursor-default select-none border border-transparent dark:border-zinc-800"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#757575]" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }} className="col-span-2 sm:col-span-1">
                  <h4 className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#5F6368] dark:text-zinc-500 font-bold mb-3">Core Impact</h4>
                  <p className="text-sm sm:text-base font-semibold text-black dark:text-white mt-1 font-sans leading-relaxed">{study.impact}</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column: Hero High-Contrast Showcase Image */}
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.1 }} className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-full aspect-[1.3] rounded-[32px] sm:rounded-[40px] overflow-hidden bg-gray-50 dark:bg-zinc-950 shadow-md border border-zinc-200/60 dark:border-zinc-800/40">
                <img
                  src={project.image}
                  alt={project.imageAlt || project.title}
                  className="w-full h-full object-cover pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* View Live & View Figma Buttons */}
              <div className="flex flex-wrap gap-4 justify-center mt-6 w-full">
                {((project as any).viewLiveEnabled ?? true) && (
                  <>
                    {((project as any).viewLiveActionType || "url") === "url" && 
                    (((project as any).viewLiveUrl || "https://pagea.uk/ui-ux-rahul").startsWith("http://") || 
                     ((project as any).viewLiveUrl || "https://pagea.uk/ui-ux-rahul").startsWith("https://")) ? (
                      <a
                        href={(project as any).viewLiveUrl || "https://pagea.uk/ui-ux-rahul"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3.5 fluid-btn-primary text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 text-center inline-block"
                      >
                        {(project as any).viewLiveText || "Launch Live Prototype"}
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          const actionType = (project as any).viewLiveActionType || "url";
                          if (actionType === "modal") {
                            if (onOpenBooking) onOpenBooking();
                          } else {
                            const url = (project as any).viewLiveUrl || "https://pagea.uk/ui-ux-rahul";
                            onNavigate(url);
                          }
                        }}
                        className="px-8 py-3.5 fluid-btn-primary text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
                      >
                        {(project as any).viewLiveText || "Launch Live Prototype"}
                      </button>
                    )}
                  </>
                )}

                {((project as any).viewFigmaEnabled ?? true) && (
                  <>
                    {((project as any).viewFigmaActionType || "url") === "url" && 
                    (((project as any).viewFigmaUrl || "https://pagea.uk/ui-ux-rahul").startsWith("http://") || 
                     ((project as any).viewFigmaUrl || "https://pagea.uk/ui-ux-rahul").startsWith("https://")) ? (
                      <a
                        href={(project as any).viewFigmaUrl || "https://pagea.uk/ui-ux-rahul"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3.5 fluid-btn-secondary text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 text-center inline-block"
                      >
                        {(project as any).viewFigmaText || "Inspect Figma Canvas"}
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          const actionType = (project as any).viewFigmaActionType || "url";
                          if (actionType === "modal") {
                            if (onOpenBooking) onOpenBooking();
                          } else {
                            const url = (project as any).viewFigmaUrl || "https://pagea.uk/ui-ux-rahul";
                            onNavigate(url);
                          }
                        }}
                        className="px-8 py-3.5 fluid-btn-secondary text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
                      >
                        {(project as any).viewFigmaText || "Inspect Figma Canvas"}
                      </button>
                    )}
                  </>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* JUMP 1: Interactive Device Frame Stage */}
      {(project as any)?.showInteractiveDeviceFrame !== false && (
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-12"
        >
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <DeviceFrameCanvas
              title={project?.title || (study as any).title || "Project Case Study"}
              image={project?.image || (study as any).image || ""}
              interactiveIframeUrl={(project as any)?.interactiveIframeUrl}
              deviceDesktopImage={(project as any)?.deviceDesktopImage}
              deviceTabletImage={(project as any)?.deviceTabletImage}
              deviceMobileImage={(project as any)?.deviceMobileImage}
              liveLink={(project as any)?.liveLink || (study as any)?.liveLink}
            />
          </div>
        </motion.section>
      )}

      {/* 3. Overview, Problem & Solution (UX Case Study Structure) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-24"
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="w-full text-left mb-16">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-zinc-200/60 dark:border-zinc-800/40 bg-gray-50/50 dark:bg-zinc-900/50 text-[11px] font-semibold text-black dark:text-white tracking-wide uppercase">
                Problem &amp; Solution
              </span>
            </div>
            <ScrollHighlightText
              textTop="Strategic Blueprint &"
              textBottom="(Analytical Foundations)"
              className="font-sans select-none text-left"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Problem Statement */}
            <motion.div 
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.1 }}
              className="lg:col-span-6 text-left border-l-2 border-black dark:border-white pl-6"
            >
              <h4 className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#5F6368] dark:text-zinc-500 font-bold mb-4">01. The Challenge</h4>
              <p className="text-gray-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed font-sans font-normal">
                {study.challenge}
              </p>
            </motion.div>

            {/* Right Column: Solution Statement */}
            <motion.div 
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.22 }}
              className="lg:col-span-6 text-left border-l-2 border-zinc-200/60 dark:border-zinc-800/40 pl-6"
            >
              <h4 className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#5F6368] dark:text-zinc-500 font-bold mb-4">02. The Strategic Solution</h4>
              <p className="text-gray-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed font-sans font-normal">
                {study.solution}
              </p>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* 4. UX Research Insights & Target Persona */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-24"
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="w-full text-left mb-16">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-zinc-200/60 dark:border-zinc-800/40 bg-gray-50/50 dark:bg-zinc-900/50 text-[11px] font-semibold text-black dark:text-white tracking-wide uppercase">
                UX Research &amp; Target Persona
              </span>
            </div>
            <ScrollHighlightText
              textTop="User Analytics &"
              textBottom="(Core Empathy Mapping)"
              className="font-sans select-none text-left"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: UX Insights */}
            <div className="lg:col-span-6 text-left space-y-6">
              <h4 className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#5F6368] dark:text-zinc-500 font-bold mb-4">Research Insights</h4>
              <div className="flex flex-col gap-4">
                {study.researchInsights.map((insight: string, idx: number) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 35, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 140, damping: 20, delay: idx * 0.12 }}
                    className="flex gap-4 items-start p-6 rounded-[20px] bg-white dark:bg-[#222222] border border-zinc-200/60 dark:border-zinc-800/40 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white flex items-center justify-center font-mono text-xs font-bold shrink-0">
                      0{idx + 1}
                    </div>
                    <p className="text-gray-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed font-sans font-normal">
                      {insight}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: User Persona Card */}
            <div className="lg:col-span-6 text-left space-y-6">
              <h4 className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#5F6368] dark:text-zinc-500 font-bold mb-4">Target User Profile</h4>
              <motion.div 
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.2 }}
                className="p-8 sm:p-10 rounded-[32px] bg-white dark:bg-[#222222] border border-zinc-200/60 dark:border-zinc-800/40 shadow-sm flex flex-col justify-between h-full relative"
              >
                <div>
                  <div className="flex gap-4 items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-black dark:text-white font-bold text-sm shrink-0 font-mono">
                      {study.userPersona.name[0]}
                    </div>
                    <div>
                      <h4 className="font-sans text-lg font-bold text-black dark:text-white tracking-tight">{study.userPersona.name}</h4>
                      <p className="text-xs text-[#5F6368] dark:text-zinc-500 font-mono uppercase tracking-wider mt-0.5">{study.userPersona.role}</p>
                    </div>
                  </div>
                  
                  <div className="relative pl-6 border-l-2 border-black dark:border-white mb-8">
                    <p className="text-black dark:text-white text-base sm:text-lg italic font-normal font-sans leading-relaxed">
                      &ldquo;{study.userPersona.quote}&rdquo;
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#5F6368] dark:text-zinc-500 font-bold mb-4">Core Daily Needs</h5>
                    <div className="flex flex-col gap-3">
                      {study.userPersona.needs.map((need: string, idx: number) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.25 + idx * 0.08 }}
                          className="flex gap-2.5 items-center text-xs sm:text-sm text-gray-600 dark:text-zinc-400 font-sans font-medium"
                        >
                          <CheckCircle className="w-4 h-4 text-black dark:text-white shrink-0" />
                          <span>{need}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* 5. Key Interactive Features (Product Design Showcase) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-24"
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="w-full text-center mb-16">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-zinc-200/60 dark:border-zinc-800/40 bg-gray-50/50 dark:bg-zinc-900/50 text-[11px] font-semibold text-black dark:text-white tracking-wide uppercase">
                Interactive Engineering
              </span>
            </div>
            <ScrollHighlightText
              align="center"
              textTop="Key Interactive Features &"
              textBottom="(Core Capabilities)"
              className="font-sans select-none text-center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {study.features.map((feat: any, idx: number) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 140, damping: 20, delay: idx * 0.12 }}
                className="group p-8 rounded-[28px] bg-white dark:bg-[#222222] border border-zinc-200/60 dark:border-zinc-800/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full relative"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-black dark:text-white mb-6 transition-transform group-hover:scale-105">
                    {renderFeatureIcon(feat.icon, idx)}
                  </div>
                  <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-black dark:text-white mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-gray-650 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans font-normal">
                    {feat.description}
                  </p>
                </div>
                {feat.metric && (
                  <div className="mt-8 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/40 flex items-center justify-between text-[11px] font-mono font-bold text-[#5F6368] dark:text-zinc-500">
                    <span>PERFORMANCE METRIC</span>
                    <span className="text-black dark:text-white">{feat.metric}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 6. Visual Design System Specs */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-24"
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="w-full text-left mb-16">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-zinc-200/60 dark:border-zinc-800/40 bg-gray-50/50 dark:bg-zinc-900/50 text-[11px] font-semibold text-black dark:text-white tracking-wide uppercase">
                Visual Foundation &amp; Learnings
              </span>
            </div>
            <ScrollHighlightText
              textTop="Design System Tokenry &"
              textBottom="(Professional Reflections)"
              className="font-sans select-none text-left"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Color Palettes & Fonts */}
            <div className="lg:col-span-6 text-left space-y-8">
              <h4 className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#5F6368] dark:text-zinc-500 font-bold mb-4">Core Color Palette</h4>
              
              {/* Color chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {study.designSystem.colors.map((color: any, idx: number) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 35, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 140, damping: 20, delay: idx * 0.08 }}
                    className="flex flex-col gap-2 p-3 rounded-2xl bg-white dark:bg-[#222222] border border-zinc-200/60 dark:border-zinc-800/40 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-full aspect-square rounded-xl shadow-inner border border-black/5 dark:border-white/5" style={{ backgroundColor: color.hex }} />
                    <div className="mt-1">
                      <p className="text-[11px] font-bold text-black dark:text-white truncate font-sans">{color.name}</p>
                      <p className="text-[10px] text-gray-500 dark:text-zinc-500 font-mono mt-0.5">{color.hex}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Typography specs */}
              <motion.div 
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.3 }}
                className="p-6 rounded-2xl bg-white dark:bg-[#222222] border border-zinc-200/60 dark:border-zinc-800/40 shadow-sm"
              >
                <h5 className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#5F6368] dark:text-zinc-500 font-bold mb-2">Typography &amp; Grid Metrics</h5>
                <p className="text-sm font-semibold text-black dark:text-white font-sans">{study.designSystem.typography}</p>
                <p className="text-xs text-gray-500 dark:text-zinc-400 font-sans mt-1.5">{study.designSystem.spacing}</p>
              </motion.div>
            </div>

            {/* Right Column: Key Learnings / Reflection */}
            <div className="lg:col-span-6 text-left space-y-8">
              <h4 className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#5F6368] dark:text-zinc-500 font-bold mb-4">Reflections &amp; Key Learnings</h4>
              <div className="flex flex-col gap-6">
                {study.takeaways.map((takeaway: string, idx: number) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 35, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 140, damping: 20, delay: idx * 0.12 }}
                    className="flex gap-4 items-start border-l-2 border-black dark:border-white pl-6"
                  >
                    <div>
                      <h4 className="font-sans text-sm sm:text-base font-bold text-black dark:text-white tracking-tight mb-2">Lesson 0{idx + 1}</h4>
                      <p className="text-gray-650 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans font-normal">
                        {takeaway}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* JUMP 1: Before / After UX Comparison Slider */}
      {(project as any)?.showBeforeAfterSlider !== false && (
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-12"
        >
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <BeforeAfterSlider
              beforeImage={(project as any)?.beforeImage}
              beforeTitle={(project as any)?.beforeTitle}
              beforeDescription={(project as any)?.beforeDescription}
              afterImage={(project as any)?.afterImage || project?.image || (study as any).image || ""}
              afterTitle={(project as any)?.afterTitle}
              afterDescription={(project as any)?.afterDescription}
            />
          </div>
        </motion.section>
      )}

      {/* JUMP 1: Live Design Token Inspector */}
      {(project as any)?.showDesignTokenInspector !== false && (
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-12"
        >
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <DesignTokenInspector
              colors={study.designSystem?.colors}
              typographyFont={(project as any)?.tokenTypographyFont || study.designSystem?.typography}
              typographyScale={(project as any)?.tokenTypographyScale}
              spacingScale={(project as any)?.tokenSpacingScale}
            />
          </div>
        </motion.section>
      )}

      {/* 7. Footer Call to Action */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-24 mt-12"
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollHighlightText
            align="center"
            textTop="Let's collaborate on the next"
            textBottom="(high-fidelity layout.)"
            className="font-sans select-none text-center mb-8"
          />
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => onNavigate("home")}
              className="px-8 py-3.5 fluid-btn-primary text-xs font-bold font-sans tracking-wide uppercase cursor-pointer"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => onOpenBooking ? onOpenBooking() : onNavigate("home")}
              className="px-8 py-3.5 fluid-btn-secondary text-xs font-bold font-sans tracking-wide uppercase cursor-pointer"
            >
              Book a Meeting
            </button>
          </div>
        </div>
      </motion.section>

      {/* Bottom CTA Section before footer */}
      <div className="mt-16">
        <BottomCTASection siteConfig={siteConfig} onNavigate={onNavigate} onOpenBooking={onOpenBooking} />
      </div>

    </div>
  );
}
