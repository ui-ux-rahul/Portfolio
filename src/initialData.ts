/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Testimonial, BlogPost, Experience, Education, Certification, SkillGroup, FeaturedProject, RecentWork, ServiceItem, SiteConfig } from './types';

export const initialProjects: Project[] = [
  {
    id: "vault-pro",
    title: "Vault Pro (Financial OS)",
    category: "Financial OS",
    description: "Designed an Apple-style, highly intuitive local-first financial OS, engineering proprietary 'Triple-Link ID' and 'Atomic Batch Law' protocols to sync background data with MongoDB on reconnect with zero conflict rates.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1000",
    liveLink: "https://pagea.uk/ui-ux-rahul",
    tags: ["UI/UX Design", "Next.js", "Dexie.js", "Zustand", "MongoDB"],
    featured: true
  },
  {
    id: "chat-box",
    title: "Chat Box (Messaging OS)",
    category: "Messaging OS",
    description: "Designed and hand-coded a real-time messaging application, structuring a three-column desktop workspace with shared media sidebars that intelligently collapse into a native bottom-tab mobile layout for users.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=1000",
    liveLink: "https://pagea.uk/ui-ux-rahul",
    tags: ["UI/UX Design", "React", "Node.js", "Express", "Socket.io", "MongoDB"],
    featured: true
  },
  {
    id: "care-guide-project",
    title: "Care Guide Redesign",
    category: "Healthcare SaaS",
    description: "Redesigned a legacy 2016 healthcare portal into a custom 2026 system, benchmarking visual layouts against industry leaders like Bayada and Mayo Clinic for development readiness. Scaled a Figma design system with precise tokens.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000",
    liveLink: "https://pagea.uk/ui-ux-rahul",
    tags: ["UI/UX Design", "Figma Variables", "Component Library", "Healthcare UI"],
    featured: true
  },
  {
    id: "host-the-website-project",
    title: "Host The Website Platform",
    category: "Hosting & Deployment",
    description: "Owned the visual design for 13+ responsive sites, mapping layouts from wireframe to Figma deliverables with pixel-perfect accuracy for frictionless developer handoff. Defined motion specs and custom hover states.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    liveLink: "https://pagea.uk/ui-ux-rahul",
    tags: ["Wireframing", "Figma", "Webflow Specs", "Motion Design"],
    featured: false
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Dr. Sarah Jenkins",
    role: "Lead Agentic Architect, DeepMind",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    text: "Rahul delivered pixel-perfect developer tooling and interfaces that completely transformed our workflow. His background in both product design and frontend tech makes cross-functional collaboration absolutely seamless.",
    rating: 5
  },
  {
    id: "t2",
    name: "Marcus Chen",
    role: "Engineering Director, Care Guide Systems",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    text: "His deep focus on user experience and structured Figma handoffs streamlined our development processes by 50%. Truly a designer built with engineering empathy!",
    rating: 5
  },
  {
    id: "t3",
    name: "David Miller",
    role: "Principal Developer, Host The Website",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    text: "Excellent attention to detail and pixel-perfect design assets. The custom motion curves and interactive states Rahul defines make implementing his interfaces an absolute pleasure.",
    rating: 5
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "ui-ux-transition",
    title: "Bridging the Gap: How My Engineering Roots Fuel Figma Workflows",
    excerpt: "Transitioning from frontend code to product design in 2020 allowed me to use my developer mindset to build ultra-clean, scalable Figma systems.",
    content: "### Designing with Code in Mind\n\nHaving coded layouts since 2015, transitioning into UI/UX Design in 2020 changed how I approach Figma. I don't just draw blocks; I build structured layout rules.\n\n1. **Design Tokens & Variables**: Creating layout systems that represent CSS variables natively. This ensures a 1:1 translation to CSS.\n2. **Adaptive Components**: Using Figma's auto-layout to mimic Flexbox and CSS Grid parameters precisely.\n3. **Frictionless Handoff**: Providing layout-ready design files, defined motion curves, and semantic variable tokens to developers to eliminate guess-work.",
    date: "2026-07-07",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    tags: ["UI/UX Design", "Figma Systems", "Design Tokens", "Career Transition"]
  },
  {
    id: "local-first-design",
    title: "How We Designed UI States for Offline-Resilient Apps (Vault Pro)",
    excerpt: "A study on designing intuitive user states and conflict indicators for local-first systems like financial and communication applications.",
    content: "### Local-First Persistence Design Challenges\n\nWhen we worked on the Vault Pro Financial OS UI, the challenge was clear: how to design non-intrusive status indicators for offline persistence.\n\n### The Three Core States\n\n- **Synced**: A peaceful green indicator.\n- **Syncing (Atomic Batch Law)**: A gentle pulsing cyan rotation showing background data update streams.\n- **Offline**: Highly visible warnings with clear actions to preserve changes without causing alarm.",
    date: "2026-06-20",
    coverImage: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800",
    tags: ["Fintech OS", "Local First Design", "Data States", "UI Patterns"]
  }
];

export const experienceData: Experience[] = [
  {
    id: "exp-care-guide",
    company: "Care Guide",
    role: "Product Designer (UI/UX)",
    duration: "04/2026 – Present",
    location: "Dhaka, Bangladesh",
    details: [
      "Redesigned a legacy 2016 healthcare portal into a custom 2026 system, benchmarking visual layouts against industry leaders like Bayada and Mayo Clinic for development readiness.",
      "Built and scaled a Figma design system with precise variable tokens and adaptive components, drastically streamlining cross-functional developer collaboration and handoff."
    ]
  },
  {
    id: "exp-freelance",
    company: "Freelance & Contract",
    role: "User-Centered Product Designer",
    duration: "05/2023 – Present",
    location: "Remote & Local",
    details: [
      "Shipped 17+ high-impact digital products, translating complex SaaS & fintech business requirements into highly intuitive, user-centric responsive wireframes and layouts.",
      "Delivered complete design specifications, modular Figma libraries, and brand style guides, ensuring absolute 1:1 development implementation and execution accuracy."
    ]
  },
  {
    id: "exp-host-website",
    company: "Host The Website",
    role: "Product & Interaction Designer",
    duration: "11/2024 – 11/2025",
    location: "Khulna, Bangladesh",
    details: [
      "Owned the visual design for 13+ responsive sites, mapping layouts from wireframe to Figma deliverables with pixel-perfect accuracy for direct, frictionless developer handoff.",
      "Defined motion specs and custom hover states for 1:1 Webflow developer execution."
    ]
  }
];

export const educationData: Education[] = [
  {
    id: "edu-cse",
    institution: "Daffodil International University (DIU)",
    degree: "B.Sc. in Computer Science & Engineering (CSE)",
    duration: "2019 – 2023",
    cgpa: "CGPA: 3.17"
  },
  {
    id: "edu-diploma",
    institution: "Khanjahan Ali College of Science & Technology",
    degree: "Diploma in Computer Technology",
    duration: "2014 – 2018",
    cgpa: "CGPA: 3.19"
  }
];

export const certificationData: Certification[] = [
  {
    id: "cert-claude",
    name: "Claude 101",
    issuer: "Anthropic",
    date: "05/2026"
  },
  {
    id: "cert-excel",
    name: "Excel Essentials",
    issuer: "UNICEF / Generation Unlimited",
    date: "05/2026"
  },
  {
    id: "cert-adv-ux",
    name: "Advanced UX/UI & Product Design (Coursework)",
    issuer: "Creative IT Institute",
    date: "03/2025"
  },
  {
    id: "cert-proj-ux",
    name: "Project Based Professional UI/UX Design",
    issuer: "MSB Academy",
    date: "02/2024"
  },
  {
    id: "cert-web-design",
    name: "Professional Web Design",
    issuer: "Future IT Park | ITES Web Design - BCC-LICT (Ernst & Young)",
    date: "04/2018"
  }
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Design & Strategy",
    items: [
      "Figma (Expert)", "UI/UX Design", "Interaction", "Wireframing", 
      "Prototyping", "Design Systems", "Handoff Optimization", 
      "User Research", "Information Architecture", "Accessibility", 
      "Usability Testing", "Visual Hierarchy"
    ]
  },
  {
    category: "Frontend Technologies",
    items: [
      "React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", 
      "Framer Motion", "Responsive Layouts"
    ]
  },
  {
    category: "Backend & Architecture (Basic)",
    items: [
      "Node.js", "Express", "MongoDB", "Dexie.js (Local-First DB)", "Zustand"
    ]
  },
  {
    category: "AI-Powered Workflow",
    items: [
      "Claude 3.5", "Lovable", "Cursor", "GitHub Copilot", "Generative UI", "Midjourney"
    ]
  }
];

export const initialFeaturedProjects: FeaturedProject[] = [
  {
    id: "fp-1",
    title: "Upshop",
    category: "SaaS, Food, B2B",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    aspectClass: "aspect-square",
    tags: ["Figma File", "Live Link"]
  },
  {
    id: "fp-2",
    title: "TinyFish",
    category: "A.I., SaaS",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800",
    aspectClass: "aspect-[1.15]",
    tags: ["Figma File", "Webflow"]
  },
  {
    id: "fp-3",
    title: "Barrow Street Nursery School",
    category: "Education",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800",
    aspectClass: "aspect-[1.35]",
    tags: ["Live Link", "Prototype"]
  },
  {
    id: "fp-4",
    title: "Prosupps",
    category: "E-Commerce, B2C",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
    aspectClass: "aspect-[1.35]",
    tags: ["Figma File", "Webflow"]
  },
  {
    id: "fp-5",
    title: "Suzy Welch",
    category: "Education, B2C, B2B",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    aspectClass: "aspect-[1.15]",
    tags: ["Published", "Figma File"]
  },
  {
    id: "fp-6",
    title: "New Engen",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    aspectClass: "aspect-square",
    tags: ["Live Link"]
  }
];

export const initialRecentWorks: RecentWork[] = [
  {
    id: "rw-1",
    title: "FinTech Platform & Financial OS",
    date: "May 2026",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    url: "https://pagea.uk/ui-ux-rahul",
    tags: ["LinkedIn", "Pinterest"]
  },
  {
    id: "rw-2",
    title: "Interactive Communication Ecosystem",
    date: "April 2026",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    url: "https://pagea.uk/ui-ux-rahul",
    tags: ["Behance", "LinkedIn"]
  },
  {
    id: "rw-3",
    title: "Care Guide Healthcare SaaS Redesign",
    date: "March 2026",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    url: "https://pagea.uk/ui-ux-rahul",
    tags: ["Pinterest", "Behance"]
  },
  {
    id: "rw-4",
    title: "Host The Website Hosting Platform",
    date: "January 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    url: "https://pagea.uk/ui-ux-rahul",
    tags: ["LinkedIn"]
  },
  {
    id: "rw-5",
    title: "Apple-Style Local-First Vault OS",
    date: "November 2025",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
    url: "https://pagea.uk/ui-ux-rahul",
    tags: ["Behance"]
  },
  {
    id: "rw-6",
    title: "Scalable Design System Components",
    date: "September 2025",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    url: "https://pagea.uk/ui-ux-rahul",
    tags: ["Pinterest"]
  }
];

export const initialServices: ServiceItem[] = [
  {
    id: "ser-1",
    step: "1",
    title: "Discover & Define",
    description: "Understanding business goals, user needs, and the problem we are solving.",
    icon: "Lightbulb"
  },
  {
    id: "ser-2",
    step: "2",
    title: "Ideate & Wireframe",
    description: "Creating logical user flows, site architectures, and low-fidelity structural blueprints.",
    icon: "Layers"
  },
  {
    id: "ser-3",
    step: "3",
    title: "High-Fidelity UI/UX",
    description: "Crafting polished, high-fidelity interface systems with scalable, responsive Figma libraries.",
    icon: "PenTool"
  },
  {
    id: "ser-4",
    step: "4",
    title: "Interactive Development",
    description: "Engineering production-ready frontend layouts using modern React and interactive Framer architectures.",
    icon: "Code"
  }
];

export const initialSiteConfig: SiteConfig = {
  brandName: "Rahul",
  navCtaText: "Get started",
  navCtaLink: "contact",
  navItem1Text: "Featured Projects",
  navItem2Text: "Recent Work",
  navItem3Text: "Testimonials",
  heroBadge: "Portfolio & Creative Showcase",
  heroHeading: "Hi, I'm Rahul Dutta.\nDesigning the future of web.",
  heroSubheading: "Rahul is a multidisciplinary Product Designer and Frontend Engineer who designs and crafts high-fidelity digital interfaces, persistent design systems, and fluid modern user experiences.",
  heroButtonText: "Get in touch",
  editorialBadge: "Who I Am",
  editorialRole: "Independent Product Designer",
  editorialHeading: "Crafting digital experiences with ultimate precision.",
  editorialStatExperience: "4+ Years of Industry Experience",
  editorialStatDescription: "Over 17+ projects designed, hand-coded, and launched globally since 2020.",
  editorialTagsTop: ["UX Research", "UI Design", "Mobile Application", "MVP Design"],
  editorialTagsBottom: ["Figma", "React", "Tailwind CSS", "Framer Motion"],
  editorialProfilePic: "",
  futureProjectsBadge: "Featured Projects",
  futureProjectsHeading: "Featured Projects",
  futureProjectsSubheading: "(Concepts & Vision)",
  futureProjectsDescription: "A curated collection of featured platforms, intuitive communication tools, and local-first software concepts that bridge the gap between design and high-performance frontend engineering.",
  futureProjectsButtonText: "View all work",
  futureProjectsButtonLink: "projects",
  disciplinesBadge: "Disciplines",
  disciplinesHeading: "What I do?",
  disciplinesSubheading: "Core Capabilities",
  disciplinesDescription: "A breakdown of my engineering-rooted product design methodology, blending visual clarity with systematic code execution.",
  disciplinesTagsTop: ["Illustration", "Presentation", "Typography", "Branding"],
  disciplinesTagsBottom: ["Art Direction", "Layout", "Logo Design", "UI Design"],
  credentialsBadge: "Credentials",
  credentialsHeading: "Where",
  credentialsSubheading: "I've worked",
  credentialsDescription: "A chronological timeline of my design and development journey, academic highlights, and verified industry credentials.",
  recentWorkBadge: "Recent Work",
  recentWorkHeading: "Selected Works",
  recentWorkSubheading: "Interactive Projects",
  recentWorkDescription: "I help founders ship faster — intuitive SaaS dashboards, web apps, mobile MVPs. Faster validation, clear onboarding, scalable builds ready to launch in 30 days.",
  servicesBadge: "My Expertise",
  servicesHeading: "Services",
  servicesSubheading: "What I Offer",
  servicesDescription: "Tailored visual design, scalable interface engineering, and interactive prototype delivery.",
  reviewsBadge: "Reviews",
  reviewsHeading: "What clients say",
  reviewsSubheading: "Kind Words",
  reviewsDescription: "Direct testimonials from engineering directors, principal developers, and agency stakeholders.",
  ctaDevLabel: "01 / OPEN SOURCE CODE",
  ctaDevTitle: "For Developers",
  ctaDevDesc: "Get started with our lightweight Go compiler, spin up multi-agent networks in minutes, and trace prompts with real-time telemetry logs cleanly.",
  ctaDevBtnText: "Download CLI Node",
  ctaDevBtnUrl: "contact",
  ctaOrgLabel: "02 / SECURED PIPELINE",
  ctaOrgTitle: "For Organizations",
  ctaOrgDesc: "Deploy secure, sandboxed sub-agents at scale. Integrate Gemini 2.5 Flash context caches, multi-user sync protocols, and enterprise security standards.",
  ctaOrgBtnText: "Request Enterprise Access",
  ctaOrgBtnUrl: "contact",
  reviewsStat1Number: "100+",
  reviewsStat1Label: "design projects completed.",
  reviewsStat2Number: "100%",
  reviewsStat2Label: "Client satisfaction rate.",
  reviewsStat3Number: "40+",
  reviewsStat3Label: "Happy Clients",
  bottomCtaHeading: "Let's build \nsomething incredible \ntogether",
  bottomCtaPrimaryBtnText: "Contact Rahul",
  bottomCtaPrimaryBtnUrl: "contact",
  bottomCtaSecondaryBtnText: "View Solutions",
  bottomCtaSecondaryBtnUrl: "projects",
  footerHeading: "Experience liftoff",
  footerWordmark: "Rahul Dutta",
  footerDescription: "UI/UX Product Designer & Frontend Technologist",
  footerCol1Links: [
    { "label": "Download", "url": "#" },
    { "label": "Product", "url": "#" },
    { "label": "Docs", "url": "#" },
    { "label": "Changelog", "url": "#" },
    { "label": "Press", "url": "#" },
    { "label": "Releases", "url": "#" }
  ],
  footerCol2Links: [
    { "label": "Blog", "url": "blog" },
    { "label": "Pricing", "url": "#" },
    { "label": "Style Guide", "url": "style-guide" }
  ],
  footerCol3Links: [
    { "label": "Security", "url": "#" },
    { "label": "Status", "url": "#" },
    { "label": "Terms", "url": "#" },
    { "label": "Privacy", "url": "#" }
  ],
  footerSocialLinks: [
    { "label": "About Rahul", "url": "#editorial-hero" },
    { "label": "Fiverr", "url": "https://www.fiverr.com/s/akRBXg8" },
    { "label": "Behance", "url": "https://www.behance.net/ui-ux-rahul" },
    { "label": "Linkedin", "url": "https://www.linkedin.com/in/ui-ux-rahul/" }
  ],
  bookingNotificationEmail: "workprofile.uiux@gmail.com",
  bookingLimitPerEmail: "1"
};
