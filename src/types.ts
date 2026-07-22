/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt?: string;
  liveLink: string;
  tags: string[];
  featured: boolean;
}

export interface FeaturedProject {
  id: string;
  title: string;
  category: string;
  image: string;
  imageAlt?: string;
  aspectClass?: string;
  tags?: string[];

  // Custom CMS Case Study Details
  tagline?: string;
  role?: string;
  timeline?: string;
  impact?: string;
  stack?: string[];
  challenge?: string;
  solution?: string;
  researchInsights?: string[];
  userPersonaName?: string;
  userPersonaRole?: string;
  userPersonaQuote?: string;
  userPersonaNeeds?: string[];
  designSystemTypography?: string;
  designSystemSpacing?: string;
  designSystemColors?: { name: string; hex: string }[];
  features?: { title: string; description: string; metric?: string }[];
  takeaways?: string[];

  // Custom live & figma button configs
  viewLiveEnabled?: boolean;
  viewLiveActionType?: "modal" | "url";
  viewLiveUrl?: string;
  viewLiveText?: string;
  viewFigmaEnabled?: boolean;
  viewFigmaActionType?: "modal" | "url";
  viewFigmaUrl?: string;
  viewFigmaText?: string;

  // JUMP 1: Interactive Device Frame Toggle
  showInteractiveDeviceFrame?: boolean;
  interactiveIframeUrl?: string;
  deviceDesktopImage?: string;
  deviceTabletImage?: string;
  deviceMobileImage?: string;

  // JUMP 1: Before / After UX Slider
  showBeforeAfterSlider?: boolean;
  beforeImage?: string;
  beforeTitle?: string;
  beforeDescription?: string;
  afterImage?: string;
  afterTitle?: string;
  afterDescription?: string;

  // JUMP 1: Live Design Token Inspector
  showDesignTokenInspector?: boolean;
  tokenTypographyFont?: string;
  tokenTypographyScale?: { level: string; size: string; weight: string }[];
  tokenSpacingScale?: { name: string; px: string }[];
}

export interface RecentWork {
  id: string;
  title: string;
  date: string;
  image: string;
  imageAlt?: string;
  url: string;
  tags?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  avatarAlt?: string;
  text: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  coverImage: string;
  coverImageAlt?: string;
  tags?: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  details: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  cgpa?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface SiteConfig {
  brandName: string;
  navCtaText: string;
  navCtaLink: string;
  navCtaActionType?: "modal" | "url";
  navItem1Text?: string;
  navItem2Text?: string;
  navItem3Text?: string;

  // Hero Section
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  heroButtonText: string;
  heroButtonActionType?: "modal" | "url";
  heroButtonUrl?: string;

  // Editorial Hero Section
  editorialBadge?: string;
  editorialRole: string;
  editorialHeading: string;
  editorialStatExperience: string;
  editorialStatDescription: string;
  editorialTagsTop?: string[];
  editorialTagsBottom?: string[];
  editorialProfilePic?: string;
  editorialProfilePicAlt?: string;
  editorialEmail?: string;
  editorialEmailSubject?: string;
  editorialEmailBody?: string;
  editorialLocationUrl?: string;
  editorialLocationText?: string;

  // Future Projects Section
  futureProjectsBadge: string;
  futureProjectsHeading: string;
  futureProjectsSubheading: string;
  futureProjectsDescription: string;
  futureProjectsButtonText: string;
  futureProjectsButtonLink?: string;

  // Disciplines Section
  disciplinesBadge: string;
  disciplinesHeading: string;
  disciplinesSubheading: string;
  disciplinesDescription: string;
  disciplinesTagsTop?: string[];
  disciplinesTagsBottom?: string[];

  // Credentials Section
  credentialsBadge: string;
  credentialsHeading: string;
  credentialsSubheading?: string;
  credentialsDescription: string;

  // Recent Work Section
  recentWorkBadge: string;
  recentWorkHeading: string;
  recentWorkSubheading: string;
  recentWorkDescription: string;

  // Services/Expertise Section
  servicesBadge: string;
  servicesHeading: string;
  servicesSubheading: string;
  servicesDescription: string;

  // Reviews/Testimonials Section
  reviewsBadge: string;
  reviewsHeading: string;
  reviewsSubheading: string;
  reviewsDescription: string;

  // Open Source & Secured Pipeline Section
  ctaDevLabel?: string;
  ctaDevTitle?: string;
  ctaDevDesc?: string;
  ctaDevBtnText?: string;
  ctaDevBtnUrl?: string;
  ctaOrgLabel?: string;
  ctaOrgTitle?: string;
  ctaOrgDesc?: string;
  ctaOrgBtnText?: string;
  ctaOrgBtnUrl?: string;

  // Client Reviews Stats Box (Under Testimonials Headers)
  reviewsStat1Number?: string;
  reviewsStat1Label?: string;
  reviewsStat2Number?: string;
  reviewsStat2Label?: string;
  reviewsStat3Number?: string;
  reviewsStat3Label?: string;

  // Bottom CTA Section
  bottomCtaHeading?: string;
  bottomCtaPrimaryBtnText?: string;
  bottomCtaPrimaryBtnUrl?: string;
  bottomCtaSecondaryBtnText?: string;
  bottomCtaSecondaryBtnUrl?: string;

  // Footer Section
  footerHeading?: string;
  footerWordmark?: string;
  footerDescription?: string;
  footerCol1Links?: { label: string; url: string }[];
  footerCol2Links?: { label: string; url: string }[];
  footerCol3Links?: { label: string; url: string }[];
  footerSocialLinks?: { label: string; url: string }[];

  // Booking Safeguards Config
  bookingNotificationEmail?: string;
  bookingLimitPerEmail?: string;

  // Dynamic SEO & Google Ranking Strategy Config
  seoDefaultTitle?: string;
  seoDefaultDescription?: string;
  seoKeywords?: string;
  seoGoogleVerification?: string;
  seoAnalyticsId?: string;
  seoOgImage?: string;
  seoAuthorName?: string;
  seoAuthorJobTitle?: string;
  seoAuthorSameAs?: string;
  seoCanonicalUrl?: string;
  seoNoIndex?: boolean;
}

export interface ServiceItem {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: string; // lucide icon name like "Lightbulb", "Layers", "PenTool", "Code", etc.
}

export interface TimelineCard {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  details: string[];
}

export interface TimelineSection {
  id: string;
  title: string;
  icon: string; // lucide icon name like "Briefcase", "GraduationCap", "Award", "BookOpen", "Code", "Zap" etc.
  items: TimelineCard[];
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  date: string;
  timeSlot: string;
  notes?: string;
  adminNotes?: string;
  status?: "Pending" | "Contacted" | "Scheduled" | "Completed" | "Archived";
  createdAt: string;
}

