/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Project, Testimonial, BlogPost, SiteConfig, FeaturedProject, RecentWork, TimelineSection, TimelineCard, ServiceItem } from "../types";
import { motion } from "motion/react";

interface CloudinaryUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  id: string;
  altValue?: string;
  onAltChange?: (alt: string) => void;
  altPlaceholder?: string;
}

const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({ value, onChange, label, id, altValue, onAltChange, altPlaceholder }) => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Authorization": "session-token-rahuldutta-2026"
        },
        body: formData
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Upload failed");
      }

      const data = await res.json();
      onChange(data.url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const isCloudinary = value && value.includes("cloudinary.com");

  return (
    <div className="space-y-2">
      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1.5">
        {label}
      </label>
      <div className="flex flex-col gap-3 bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-transparent dark:border-transparent">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden border border-transparent dark:border-transparent shrink-0 flex items-center justify-center">
            {value ? (
              <img 
                src={value} 
                alt="Preview" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=200";
                }}
              />
            ) : (
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">No Image</span>
            )}
            {isUploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="w-5 h-5 border-2 border-transparent border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-1.5">
            <div className="flex flex-wrap gap-2">
              <label className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold bg-[#1A1A1A] text-white hover:opacity-90 rounded-full cursor-pointer transition-opacity disabled:opacity-50 dark:bg-white dark:text-black">
                <Upload className="w-3.5 h-3.5" /> 
                {isUploading ? "Uploading..." : "Upload File"}
                <input 
                  id={id}
                  type="file" 
                  accept="image/*" 
                  onChange={handleUpload} 
                  className="hidden" 
                  disabled={isUploading}
                />
              </label>
              
              {value && (
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold bg-rose-50 hover:bg-rose-100 border border-transparent text-rose-600 rounded-full cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              )}
            </div>
            {error ? (
              <p className="text-[10px] text-rose-500 font-medium">{error}</p>
            ) : value ? (
              <p className={`text-[9px] font-medium truncate max-w-[150px] sm:max-w-xs md:max-w-md ${isCloudinary ? "text-emerald-600" : "text-amber-600"}`}>
                {isCloudinary ? "Stored in Cloudinary" : "External URL Linked"}
              </p>
            ) : (
              <p className="text-[10px] text-zinc-400">PNG, JPG, or WEBP up to 10MB</p>
            )}
          </div>
        </div>

        {/* Custom URL Input block */}
        <div className="pt-2.5 border-t border-transparent dark:border-transparent">
          <label className="block text-[9px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
            Or Use Pinterest / Direct Image URL Address
          </label>
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. https://i.pinimg.com/... or https://example.com/pic.jpg"
            className="w-full px-3 py-1.5 font-mono text-[11px] rounded-lg border border-transparent dark:border-transparent bg-transparent text-black dark:text-white placeholder-zinc-400 focus:outline-none focus:border-transparent dark:focus:border-transparent transition-colors"
          />
        </div>

        {onAltChange && (
          <div className="pt-2.5 border-t border-transparent dark:border-transparent">
            <label className="block text-[9px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
              Image Accessibility Alt Text
            </label>
            <input
              type="text"
              value={altValue || ""}
              onChange={(e) => onAltChange(e.target.value)}
              placeholder={altPlaceholder || "Describe what's in the image..."}
              className="w-full px-3 py-1.5 text-[11px] rounded-lg border border-transparent dark:border-transparent bg-transparent text-black dark:text-white placeholder-zinc-400 focus:outline-none focus:border-transparent dark:focus:border-transparent transition-colors"
            />
          </div>
        )}
      </div>
    </div>
  );
};

import { 
  Folder, 
  MessageSquare, 
  BookOpen, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  AlertCircle, 
  Save, 
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Settings,
  Briefcase,
  Upload,
  Crop,
  X,
  Image,
  GraduationCap,
  Award,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash,
  Layers,
  Activity,
  Calendar,
  Shield,
  Lightbulb,
  Cpu,
  Brain,
  Code,
  Globe,
  Search,
  CheckCircle
} from "lucide-react";

interface AdminDashboardProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  featuredProjects: FeaturedProject[];
  setFeaturedProjects: (projects: FeaturedProject[]) => void;
  recentWorks: RecentWork[];
  setRecentWorks: (works: RecentWork[]) => void;
  testimonials: Testimonial[];
  setTestimonials: (testimonials: Testimonial[]) => void;
  blogPosts: BlogPost[];
  setBlogPosts: (posts: BlogPost[]) => void;
  siteConfig: SiteConfig | null;
  setSiteConfig: (config: SiteConfig) => void;
  token: string;
  timelineSections?: TimelineSection[];
  setTimelineSections?: (sections: TimelineSection[]) => void;
  services?: ServiceItem[];
  setServices?: (services: ServiceItem[]) => void;
}

type TabType = "site-config" | "projects" | "testimonials" | "blog" | "featured" | "recent-work" | "timeline" | "services" | "bookings" | "seo";

export default function AdminDashboard({
  projects,
  setProjects,
  featuredProjects = [],
  setFeaturedProjects,
  recentWorks = [],
  setRecentWorks,
  testimonials,
  setTestimonials,
  blogPosts,
  setBlogPosts,
  siteConfig,
  setSiteConfig,
  token,
  timelineSections = [],
  setTimelineSections,
  services = [],
  setServices
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("site-config");
  const [timelineSubTab, setTimelineSubTab] = useState<"headers" | "matrix">("headers");
  const [saveStatus, setSaveStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [isProfileUploading, setIsProfileUploading] = useState(false);

  // Resume PDF Upload States
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUploadStatus, setResumeUploadStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [resumeUploading, setResumeUploading] = useState(false);

  // My Expertise (Services) state
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<Omit<ServiceItem, "id">>({
    step: "",
    title: "",
    description: "",
    icon: "Layers"
  });

  // Edit/Add Forms States
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Omit<Project, "id">>({
    title: "",
    category: "",
    description: "",
    image: "",
    liveLink: "",
    tags: [],
    featured: false
  });
  const [projectTagString, setProjectTagString] = useState("");

  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<Omit<Testimonial, "id">>({
    name: "",
    role: "",
    avatar: "",
    text: "",
    rating: 5
  });

  const [editingBlogPostId, setEditingBlogPostId] = useState<string | null>(null);
  const [blogPostForm, setBlogPostForm] = useState<Omit<BlogPost, "id">>({
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    coverImage: "",
    tags: []
  });
  const [blogTagString, setBlogTagString] = useState("");

  // --- Featured Projects States ---
  const [editingFeaturedProjectId, setEditingFeaturedProjectId] = useState<string | null>(null);
  const [featuredForm, setFeaturedForm] = useState<Omit<FeaturedProject, "id">>({
    title: "",
    category: "",
    image: "",
    aspectClass: "aspect-square",
    tagline: "",
    role: "",
    timeline: "",
    impact: "",
    stack: [],
    challenge: "",
    solution: "",
    researchInsights: [],
    userPersonaName: "",
    userPersonaRole: "",
    userPersonaQuote: "",
    userPersonaNeeds: [],
    designSystemTypography: "",
    designSystemSpacing: "",
    designSystemColors: [
      { name: "Accent Blue", hex: "#4285F4" },
      { name: "Primary", hex: "#1E293B" },
      { name: "Background", hex: "#F8FAFC" }
    ],
    features: [
      { title: "", description: "", metric: "" },
      { title: "", description: "", metric: "" }
    ],
    takeaways: [],
    tags: []
  });

  // --- Recent Works States ---
  const [editingRecentWorkId, setEditingRecentWorkId] = useState<string | null>(null);
  const [recentWorkForm, setRecentWorkForm] = useState<Omit<RecentWork, "id">>({
    title: "",
    date: "",
    image: "",
    url: "https://pagea.uk/ui-ux-rahul",
    tags: []
  });

  const [siteConfigForm, setSiteConfigForm] = useState<SiteConfig>({
    brandName: "",
    navCtaText: "",
    navCtaLink: "",
    navItem1Text: "",
    navItem2Text: "",
    navItem3Text: "",
    heroBadge: "",
    heroHeading: "",
    heroSubheading: "",
    heroButtonText: "",
    editorialBadge: "",
    editorialRole: "",
    editorialHeading: "",
    editorialStatExperience: "",
    editorialStatDescription: "",
    editorialTagsTop: [],
    editorialTagsBottom: [],
    editorialProfilePic: "",
    editorialEmail: "",
    editorialEmailSubject: "",
    editorialEmailBody: "",
    editorialLocationUrl: "",
    editorialLocationText: "",
    futureProjectsBadge: "",
    futureProjectsHeading: "",
    futureProjectsSubheading: "",
    futureProjectsDescription: "",
    futureProjectsButtonText: "",
    futureProjectsButtonLink: "",
    disciplinesBadge: "",
    disciplinesHeading: "",
    disciplinesSubheading: "",
    disciplinesDescription: "",
    credentialsBadge: "",
    credentialsHeading: "",
    credentialsSubheading: "",
    credentialsDescription: "",
    recentWorkBadge: "",
    recentWorkHeading: "",
    recentWorkSubheading: "",
    recentWorkDescription: "",
    servicesBadge: "",
    servicesHeading: "",
    servicesSubheading: "",
    servicesDescription: "",
    reviewsBadge: "",
    reviewsHeading: "",
    reviewsSubheading: "",
    reviewsDescription: "",
    ctaDevLabel: "",
    ctaDevTitle: "",
    ctaDevDesc: "",
    ctaDevBtnText: "",
    ctaDevBtnUrl: "",
    ctaOrgLabel: "",
    ctaOrgTitle: "",
    ctaOrgDesc: "",
    ctaOrgBtnText: "",
    ctaOrgBtnUrl: "",
    reviewsStat1Number: "",
    reviewsStat1Label: "",
    reviewsStat2Number: "",
    reviewsStat2Label: "",
    reviewsStat3Number: "",
    reviewsStat3Label: "",
    bottomCtaHeading: "",
    bottomCtaPrimaryBtnText: "",
    bottomCtaPrimaryBtnUrl: "",
    bottomCtaSecondaryBtnText: "",
    bottomCtaSecondaryBtnUrl: "",
    footerHeading: "",
    footerWordmark: "",
    footerDescription: "",
    footerCol1Links: [],
    footerCol2Links: [],
    footerSocialLinks: [],
    bookingNotificationEmail: "",
    bookingLimitPerEmail: "1"
  });

  // --- Profile Picture Cropping & Tag Helper States ---
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [cropZoom, setCropZoom] = useState<number>(1);
  const [cropX, setCropX] = useState<number>(0);
  const [cropY, setCropY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showCropModal, setShowCropModal] = useState<boolean>(false);

  // Individual tag input fields
  const [topTagInput, setTopTagInput] = useState<string>("");
  const [bottomTagInput, setBottomTagInput] = useState<string>("");
  const [discTopTagInput, setDiscTopTagInput] = useState<string>("");
  const [discBottomTagInput, setDiscBottomTagInput] = useState<string>("");

  // Footer links helper inputs
  const [footerCol1Input, setFooterCol1Input] = useState("");
  const [footerCol2Input, setFooterCol2Input] = useState("");
  const [footerCol3Input, setFooterCol3Input] = useState("");
  const [footerSocialInput, setFooterSocialInput] = useState("");

  // Timeline database configuration states
  const [localTimelineSections, setLocalTimelineSections] = useState<TimelineSection[]>([]);
  
  // Section edit modals/forms
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null); // section ID or 'new'
  const [sectionTitleInput, setSectionTitleInput] = useState<string>("");
  const [sectionIconInput, setSectionIconInput] = useState<string>("Briefcase");

  // Card edit modals/forms
  const [editingCardId, setEditingCardId] = useState<string | null>(null); // card ID or 'new'
  const [editingCardSectionId, setEditingCardSectionId] = useState<string | null>(null);
  const [cardTitleInput, setCardTitleInput] = useState<string>("");
  const [cardSubtitleInput, setCardSubtitleInput] = useState<string>("");
  const [cardDateInput, setCardDateInput] = useState<string>("");
  const [cardDetailsInput, setCardDetailsInput] = useState<string>(""); // newline-separated for bullets

  // Helper to deserialize Label | URL lines to array
  const deserializeLinks = (text: string): { label: string; url: string }[] => {
    return text
      .split("\n")
      .map(line => {
        const parts = line.split("|");
        const label = parts[0]?.trim() || "";
        const url = parts[1]?.trim() || "";
        return { label, url };
      })
      .filter(link => link.label.length > 0);
  };

  React.useEffect(() => {
    if (siteConfig) {
      setSiteConfigForm({
        editorialTagsTop: [],
        editorialTagsBottom: [],
        editorialProfilePic: "",
        disciplinesTagsTop: [],
        disciplinesTagsBottom: [],
        ...siteConfig
      });

      // Serialize footer links to "Label | URL" textareas
      const serializeLinks = (links?: { label: string; url: string }[]) => {
        if (!links) return "";
        return links.map(link => `${link.label} | ${link.url}`).join("\n");
      };

      setFooterCol1Input(serializeLinks(siteConfig.footerCol1Links));
      setFooterCol2Input(serializeLinks(siteConfig.footerCol2Links));
      setFooterCol3Input(serializeLinks(siteConfig.footerCol3Links));
      setFooterSocialInput(serializeLinks(siteConfig.footerSocialLinks));
    }
  }, [siteConfig]);

  React.useEffect(() => {
    if (timelineSections && timelineSections.length > 0) {
      setLocalTimelineSections(timelineSections);
    }
  }, [timelineSections]);

  const [localBookings, setLocalBookings] = useState<any[]>([]);

  React.useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
        if (res.ok) {
          const data = await res.json();
          setLocalBookings(data);
        }
      } catch (e) {
        console.error("Fetch bookings error:", e);
      }
    };
    fetchBookings();
  }, [activeTab]);

  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to cancel and delete this client booking?")) return;
    const updated = localBookings.filter(b => b.id !== id);
    try {
      const res = await fetch("/api/bookings/save-all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "session-token-rahuldutta-2026"
        },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        setLocalBookings(updated);
        setSaveStatus({ success: true, message: "Booking successfully cancelled." });
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus({ success: false, message: "Failed to update bookings on cloud server." });
      }
    } catch (e) {
      console.error(e);
      setSaveStatus({ success: false, message: "Server connection failed." });
    }
  };

  // --- CRM Booking Management State & Handlers ---
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>("All");
  const [bookingSearchQuery, setBookingSearchQuery] = useState<string>("");
  const [editingNotesBookingId, setEditingNotesBookingId] = useState<string | null>(null);
  const [tempAdminNotes, setTempAdminNotes] = useState<string>("");

  const handleUpdateBookingStatus = async (bookingId: string, newStatus: string) => {
    const updated = localBookings.map((b) =>
      b.id === bookingId ? { ...b, status: newStatus } : b
    );
    setLocalBookings(updated);
    try {
      await fetch("/api/bookings/save-all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "session-token-rahuldutta-2026"
        },
        body: JSON.stringify(updated)
      });
      setSaveStatus({ success: true, message: `Booking status updated to ${newStatus}` });
      setTimeout(() => setSaveStatus(null), 2500);
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  const handleSaveAdminNotes = async (bookingId: string) => {
    const updated = localBookings.map((b) =>
      b.id === bookingId ? { ...b, adminNotes: tempAdminNotes } : b
    );
    setLocalBookings(updated);
    setEditingNotesBookingId(null);
    try {
      await fetch("/api/bookings/save-all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "session-token-rahuldutta-2026"
        },
        body: JSON.stringify(updated)
      });
      setSaveStatus({ success: true, message: "Admin notes saved successfully" });
      setTimeout(() => setSaveStatus(null), 2500);
    } catch (e) {
      console.error("Failed to save admin notes", e);
    }
  };

  // --- Editorial Profile Pic & Tags Helpers ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCropImageSrc(event.target.result as string);
          setCropZoom(1);
          setCropX(0);
          setCropY(0);
          setShowCropModal(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyCrop = () => {
    if (!cropImageSrc) return;
    const img = new window.Image();
    img.src = cropImageSrc;
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      const size = 400; // Output cropped image resolution
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, size, size);

        const containerSize = 280;
        const ratio = size / containerSize;

        ctx.save();
        ctx.translate(size / 2, size / 2);
        ctx.scale(cropZoom, cropZoom);
        ctx.translate(cropX * ratio / cropZoom, cropY * ratio / cropZoom);

        let drawW = size;
        let drawH = size;
        const imgAspect = img.width / img.height;
        if (imgAspect > 1) {
          drawW = size * imgAspect;
        } else {
          drawH = size / imgAspect;
        }

        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.restore();

        const croppedBase64 = canvas.toDataURL("image/jpeg", 0.9);
        setIsProfileUploading(true);
        setShowCropModal(false);

        try {
          const formData = new FormData();
          const response = await fetch(croppedBase64);
          const blob = await response.blob();
          formData.append("image", blob, "cropped_profile.jpg");

          const res = await fetch("/api/upload", {
            method: "POST",
            headers: {
              "Authorization": "session-token-rahuldutta-2026"
            },
            body: formData
          });

          if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || "Upload failed");
          }

          const data = await res.json();
          setSiteConfigForm(prev => ({
            ...prev,
            editorialProfilePic: data.url
          }));
        } catch (error: any) {
          console.error("Cloudinary profile photo upload failed:", error);
          alert("Profile photo upload failed: " + (error.message || error));
        } finally {
          setIsProfileUploading(false);
        }
      }
    };
  };

  const handleAddTopTag = (e: React.FormEvent) => {
    e.preventDefault();
    const tag = topTagInput.trim();
    if (tag) {
      const current = siteConfigForm.editorialTagsTop || [];
      if (!current.includes(tag)) {
        setSiteConfigForm({
          ...siteConfigForm,
          editorialTagsTop: [...current, tag]
        });
      }
      setTopTagInput("");
    }
  };

  const handleRemoveTopTag = (tagToRemove: string) => {
    const current = siteConfigForm.editorialTagsTop || [];
    setSiteConfigForm({
      ...siteConfigForm,
      editorialTagsTop: current.filter(t => t !== tagToRemove)
    });
  };

  const handleAddBottomTag = (e: React.FormEvent) => {
    e.preventDefault();
    const tag = bottomTagInput.trim();
    if (tag) {
      const current = siteConfigForm.editorialTagsBottom || [];
      if (!current.includes(tag)) {
        setSiteConfigForm({
          ...siteConfigForm,
          editorialTagsBottom: [...current, tag]
        });
      }
      setBottomTagInput("");
    }
  };

  const handleRemoveBottomTag = (tagToRemove: string) => {
    const current = siteConfigForm.editorialTagsBottom || [];
    setSiteConfigForm({
      ...siteConfigForm,
      editorialTagsBottom: current.filter(t => t !== tagToRemove)
    });
  };

  const handleAddDiscTopTag = (e: React.FormEvent) => {
    e.preventDefault();
    const tag = discTopTagInput.trim();
    if (tag) {
      const current = siteConfigForm.disciplinesTagsTop || [];
      if (!current.includes(tag)) {
        setSiteConfigForm({
          ...siteConfigForm,
          disciplinesTagsTop: [...current, tag]
        });
      }
      setDiscTopTagInput("");
    }
  };

  const handleRemoveDiscTopTag = (tagToRemove: string) => {
    const current = siteConfigForm.disciplinesTagsTop || [];
    setSiteConfigForm({
      ...siteConfigForm,
      disciplinesTagsTop: current.filter(t => t !== tagToRemove)
    });
  };

  const handleAddDiscBottomTag = (e: React.FormEvent) => {
    e.preventDefault();
    const tag = discBottomTagInput.trim();
    if (tag) {
      const current = siteConfigForm.disciplinesTagsBottom || [];
      if (!current.includes(tag)) {
        setSiteConfigForm({
          ...siteConfigForm,
          disciplinesTagsBottom: [...current, tag]
        });
      }
      setDiscBottomTagInput("");
    }
  };

  const handleRemoveDiscBottomTag = (tagToRemove: string) => {
    const current = siteConfigForm.disciplinesTagsBottom || [];
    setSiteConfigForm({
      ...siteConfigForm,
      disciplinesTagsBottom: current.filter(t => t !== tagToRemove)
    });
  };

  // --- Timeline Dynamic Sections CRUD ---
  const handleSaveSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectionTitleInput.trim()) return;

    let updated: TimelineSection[];
    if (editingSectionId === "new") {
      const newSection: TimelineSection = {
        id: "sec-" + Date.now().toString(),
        title: sectionTitleInput.trim(),
        icon: sectionIconInput,
        items: []
      };
      updated = [...localTimelineSections, newSection];
    } else {
      updated = localTimelineSections.map(sec => 
        sec.id === editingSectionId 
          ? { ...sec, title: sectionTitleInput.trim(), icon: sectionIconInput }
          : sec
      );
    }

    const ok = await persistData("timeline-sections", updated);
    if (ok) {
      setLocalTimelineSections(updated);
      if (setTimelineSections) setTimelineSections(updated);
      setEditingSectionId(null);
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!confirm("Are you sure you want to permanently delete this Entire Section and all its cards?")) return;
    const updated = localTimelineSections.filter(sec => sec.id !== sectionId);
    const ok = await persistData("timeline-sections", updated);
    if (ok) {
      setLocalTimelineSections(updated);
      if (setTimelineSections) setTimelineSections(updated);
    }
  };

  const handleSaveCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCardSectionId || !cardTitleInput.trim()) return;

    const detailsArray = cardDetailsInput
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const updated = localTimelineSections.map(sec => {
      if (sec.id !== editingCardSectionId) return sec;

      let updatedItems: TimelineCard[];
      if (editingCardId === "new") {
        const newCard: TimelineCard = {
          id: "card-" + Date.now().toString(),
          title: cardTitleInput.trim(),
          subtitle: cardSubtitleInput.trim(),
          date: cardDateInput.trim(),
          details: detailsArray
        };
        updatedItems = [...sec.items, newCard];
      } else {
        updatedItems = sec.items.map(item => 
          item.id === editingCardId 
            ? {
                ...item,
                title: cardTitleInput.trim(),
                subtitle: cardSubtitleInput.trim(),
                date: cardDateInput.trim(),
                details: detailsArray
              }
            : item
        );
      }

      return { ...sec, items: updatedItems };
    });

    const ok = await persistData("timeline-sections", updated);
    if (ok) {
      setLocalTimelineSections(updated);
      if (setTimelineSections) setTimelineSections(updated);
      setEditingCardId(null);
      setEditingCardSectionId(null);
    }
  };

  const handleDeleteCard = async (sectionId: string, cardId: string) => {
    if (!confirm("Are you sure you want to permanently delete this timeline card?")) return;
    const updated = localTimelineSections.map(sec => {
      if (sec.id !== sectionId) return sec;
      return { ...sec, items: sec.items.filter(item => item.id !== cardId) };
    });

    const ok = await persistData("timeline-sections", updated);
    if (ok) {
      setLocalTimelineSections(updated);
      if (setTimelineSections) setTimelineSections(updated);
    }
  };

  const handleMoveSection = async (index: number, direction: "up" | "down") => {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= localTimelineSections.length) return;

    const updated = [...localTimelineSections];
    const temp = updated[index];
    updated[index] = updated[nextIndex];
    updated[nextIndex] = temp;

    const ok = await persistData("timeline-sections", updated);
    if (ok) {
      setLocalTimelineSections(updated);
      if (setTimelineSections) setTimelineSections(updated);
    }
  };

  const handleSaveSiteConfig = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalConfig: SiteConfig = {
      ...siteConfigForm,
      footerCol1Links: deserializeLinks(footerCol1Input),
      footerCol2Links: deserializeLinks(footerCol2Input),
      footerCol3Links: deserializeLinks(footerCol3Input),
      footerSocialLinks: deserializeLinks(footerSocialInput)
    };
    const ok = await persistData("site-config", finalConfig);
    if (ok) {
      setSiteConfig(finalConfig);
    }
  };

  const handleSaveSubSection = async (sectionName: string) => {
    const finalConfig: SiteConfig = {
      ...siteConfigForm,
      footerCol1Links: deserializeLinks(footerCol1Input),
      footerCol2Links: deserializeLinks(footerCol2Input),
      footerCol3Links: deserializeLinks(footerCol3Input),
      footerSocialLinks: deserializeLinks(footerSocialInput)
    };
    const ok = await persistData("site-config", finalConfig);
    if (ok) {
      setSiteConfig(finalConfig);
      setSaveStatus({ success: true, message: `Successfully saved changes for: ${sectionName}` });
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  // API Call helper
  const persistData = async (endpoint: string, payload: any) => {
    setLoading(true);
    setSaveStatus(null);
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setSaveStatus({ success: true, message: "Telemetry node configuration updated successfully!" });
        setTimeout(() => setSaveStatus(null), 3000);
        return true;
      } else {
        setSaveStatus({ success: false, message: result.message || "Could not persist node update." });
        return false;
      }
    } catch (e) {
      console.error(e);
      setSaveStatus({ success: false, message: "Platform API connection timed out." });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // --- Services (My Expertise) Editor Actions ---
  const handleEditService = (service: ServiceItem) => {
    setEditingServiceId(service.id);
    setServiceForm({
      step: service.step,
      title: service.title,
      description: service.description,
      icon: service.icon
    });
  };

  const handleNewService = () => {
    setEditingServiceId("new");
    setServiceForm({
      step: "0" + (services.length + 1) + " /",
      title: "",
      description: "",
      icon: "Layers"
    });
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedServices: ServiceItem[] = [];

    if (editingServiceId === "new") {
      const newService: ServiceItem = {
        ...serviceForm,
        id: "serv-" + Date.now().toString()
      };
      updatedServices = [...services, newService];
    } else {
      updatedServices = services.map((s) =>
        s.id === editingServiceId ? { ...s, ...serviceForm } : s
      );
    }

    const ok = await persistData("services", updatedServices);
    if (ok) {
      if (setServices) setServices(updatedServices);
      setEditingServiceId(null);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this Expertise service?")) return;
    const updatedServices = services.filter((s) => s.id !== id);
    const ok = await persistData("services", updatedServices);
    if (ok) {
      if (setServices) setServices(updatedServices);
    }
  };

  // --- Projects Editor Actions ---
  const handleEditProject = (project: Project) => {
    setEditingProjectId(project.id);
    setProjectForm({
      title: project.title,
      category: project.category,
      description: project.description,
      image: project.image,
      liveLink: project.liveLink,
      tags: project.tags,
      featured: project.featured
    });
    setProjectTagString(project.tags.join(", "));
  };

  const handleNewProject = () => {
    setEditingProjectId("new");
    setProjectForm({
      title: "",
      category: "System Core",
      description: "",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      liveLink: "https://ai.studio/build",
      tags: [],
      featured: false
    });
    setProjectTagString("");
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = projectTagString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const updatedForm = { ...projectForm, tags: tagsArray };
    let updatedProjects: Project[] = [];

    if (editingProjectId === "new") {
      const newProject: Project = {
        ...updatedForm,
        id: "proj-" + Date.now().toString()
      };
      updatedProjects = [...projects, newProject];
    } else if (editingProjectId) {
      updatedProjects = projects.map((p) => 
        p.id === editingProjectId ? { ...updatedForm, id: editingProjectId } : p
      );
    }

    const ok = await persistData("projects", updatedProjects);
    if (ok) {
      setProjects(updatedProjects);
      setEditingProjectId(null);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this project?")) return;
    const updatedProjects = projects.filter((p) => p.id !== id);
    const ok = await persistData("projects", updatedProjects);
    if (ok) {
      setProjects(updatedProjects);
    }
  };

  // --- Featured Projects Editor Actions ---
  const handleEditFeaturedProject = (fp: FeaturedProject) => {
    setEditingFeaturedProjectId(fp.id);
    setFeaturedForm({
      title: fp.title,
      category: fp.category,
      image: fp.image,
      aspectClass: fp.aspectClass || "aspect-square",
      tagline: fp.tagline || "",
      role: fp.role || "",
      timeline: fp.timeline || "",
      impact: fp.impact || "",
      stack: fp.stack || [],
      challenge: fp.challenge || "",
      solution: fp.solution || "",
      researchInsights: fp.researchInsights || [],
      userPersonaName: fp.userPersonaName || "",
      userPersonaRole: fp.userPersonaRole || "",
      userPersonaQuote: fp.userPersonaQuote || "",
      userPersonaNeeds: fp.userPersonaNeeds || [],
      designSystemTypography: fp.designSystemTypography || "",
      designSystemSpacing: fp.designSystemSpacing || "",
      designSystemColors: fp.designSystemColors || [
        { name: "Accent Blue", hex: "#4285F4" },
        { name: "Primary", hex: "#1E293B" },
        { name: "Background", hex: "#F8FAFC" }
      ],
      features: fp.features || [
        { title: "", description: "", metric: "" },
        { title: "", description: "", metric: "" }
      ],
      takeaways: fp.takeaways || [],
      viewLiveEnabled: fp.viewLiveEnabled ?? false,
      viewLiveActionType: fp.viewLiveActionType || "url",
      viewLiveUrl: fp.viewLiveUrl || "",
      viewLiveText: fp.viewLiveText || "View Live",
      viewFigmaEnabled: fp.viewFigmaEnabled ?? false,
      viewFigmaActionType: fp.viewFigmaActionType || "url",
      viewFigmaUrl: fp.viewFigmaUrl || "",
      viewFigmaText: fp.viewFigmaText || "View Figma",
      tags: fp.tags || []
    });
  };

  const handleNewFeaturedProject = () => {
    setEditingFeaturedProjectId("new");
    setFeaturedForm({
      title: "",
      category: "",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
      aspectClass: "aspect-square",
      tagline: "",
      role: "",
      timeline: "",
      impact: "",
      stack: [],
      challenge: "",
      solution: "",
      researchInsights: [],
      userPersonaName: "",
      userPersonaRole: "",
      userPersonaQuote: "",
      userPersonaNeeds: [],
      designSystemTypography: "",
      designSystemSpacing: "",
      designSystemColors: [
        { name: "Accent Blue", hex: "#4285F4" },
        { name: "Primary", hex: "#1E293B" },
        { name: "Background", hex: "#F8FAFC" }
      ],
      features: [
        { title: "", description: "", metric: "" },
        { title: "", description: "", metric: "" }
      ],
      takeaways: [],
      viewLiveEnabled: false,
      viewLiveActionType: "url",
      viewLiveUrl: "",
      viewLiveText: "View Live",
      viewFigmaEnabled: false,
      viewFigmaActionType: "url",
      viewFigmaUrl: "",
      viewFigmaText: "View Figma",
      tags: []
    });
  };

  const handleSaveFeaturedProject = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedFeatured: FeaturedProject[] = [];

    if (editingFeaturedProjectId === "new") {
      const newFp: FeaturedProject = {
        ...featuredForm,
        id: "fp-" + Date.now().toString()
      };
      updatedFeatured = [...featuredProjects, newFp];
    } else if (editingFeaturedProjectId) {
      updatedFeatured = featuredProjects.map((fp) =>
        fp.id === editingFeaturedProjectId ? { ...featuredForm, id: editingFeaturedProjectId } : fp
      );
    }

    const ok = await persistData("featured-projects", updatedFeatured);
    if (ok) {
      setFeaturedProjects(updatedFeatured);
      setEditingFeaturedProjectId(null);
    }
  };

  const handleDeleteFeaturedProject = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this featured project?")) return;
    const updatedFeatured = featuredProjects.filter((fp) => fp.id !== id);
    const ok = await persistData("featured-projects", updatedFeatured);
    if (ok) {
      setFeaturedProjects(updatedFeatured);
    }
  };

  // --- Recent Works Editor Actions ---
  const handleEditRecentWork = (rw: RecentWork) => {
    setEditingRecentWorkId(rw.id);
    setRecentWorkForm({
      title: rw.title,
      date: rw.date,
      image: rw.image,
      url: rw.url || "https://pagea.uk/ui-ux-rahul",
      tags: rw.tags || []
    });
  };

  const handleNewRecentWork = () => {
    setEditingRecentWorkId("new");
    setRecentWorkForm({
      title: "",
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      url: "https://pagea.uk/ui-ux-rahul",
      tags: []
    });
  };

  const handleSaveRecentWork = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedRecent: RecentWork[] = [];

    if (editingRecentWorkId === "new") {
      const newRw: RecentWork = {
        ...recentWorkForm,
        id: "rw-" + Date.now().toString()
      };
      updatedRecent = [...recentWorks, newRw];
    } else if (editingRecentWorkId) {
      updatedRecent = recentWorks.map((rw) =>
        rw.id === editingRecentWorkId ? { ...recentWorkForm, id: editingRecentWorkId } : rw
      );
    }

    const ok = await persistData("recent-works", updatedRecent);
    if (ok) {
      setRecentWorks(updatedRecent);
      setEditingRecentWorkId(null);
    }
  };

  const handleDeleteRecentWork = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this recent work item?")) return;
    const updatedRecent = recentWorks.filter((rw) => rw.id !== id);
    const ok = await persistData("recent-works", updatedRecent);
    if (ok) {
      setRecentWorks(updatedRecent);
    }
  };

  const handleResumeUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setResumeUploadStatus({ success: false, message: "Please select a PDF file first." });
      return;
    }

    if (resumeFile.type !== "application/pdf" && !resumeFile.name.endsWith(".pdf")) {
      setResumeUploadStatus({ success: false, message: "Only PDF files are allowed." });
      return;
    }

    setResumeUploading(true);
    setResumeUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const res = await fetch("/api/upload-resume", {
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("session-token") || "session-token-rahuldutta-2026"
        },
        body: formData
      });

      const data = await res.json();
      if (data.success) {
        setResumeUploadStatus({ success: true, message: data.message || "Resume uploaded and saved successfully!" });
        setResumeFile(null);
        const fileInput = document.getElementById("resume-input-file") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        setResumeUploadStatus({ success: false, message: data.message || "Upload failed." });
      }
    } catch (err: any) {
      console.error("Resume upload error:", err);
      setResumeUploadStatus({ success: false, message: err.message || "An error occurred during upload." });
    } finally {
      setResumeUploading(false);
    }
  };

  // --- Testimonials Editor Actions ---
  const handleEditTestimonial = (test: Testimonial) => {
    setEditingTestimonialId(test.id);
    setTestimonialForm({
      name: test.name,
      role: test.role,
      avatar: test.avatar,
      text: test.text,
      rating: test.rating
    });
  };

  const handleNewTestimonial = () => {
    setEditingTestimonialId("new");
    setTestimonialForm({
      name: "",
      role: "Lead Security Integrator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      text: "",
      rating: 5
    });
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedTestimonials: Testimonial[] = [];

    if (editingTestimonialId === "new") {
      const newTest: Testimonial = {
        ...testimonialForm,
        id: "test-" + Date.now().toString()
      };
      updatedTestimonials = [...testimonials, newTest];
    } else if (editingTestimonialId) {
      updatedTestimonials = testimonials.map((t) => 
        t.id === editingTestimonialId ? { ...testimonialForm, id: editingTestimonialId } : t
      );
    }

    const ok = await persistData("testimonials", updatedTestimonials);
    if (ok) {
      setTestimonials(updatedTestimonials);
      setEditingTestimonialId(null);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this review?")) return;
    const updatedTestimonials = testimonials.filter((t) => t.id !== id);
    const ok = await persistData("testimonials", updatedTestimonials);
    if (ok) {
      setTestimonials(updatedTestimonials);
    }
  };

  // --- Blog Posts Editor Actions ---
  const handleEditBlogPost = (post: BlogPost) => {
    setEditingBlogPostId(post.id);
    setBlogPostForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      date: post.date,
      coverImage: post.coverImage,
      tags: post.tags || []
    });
    setBlogTagString((post.tags || []).join(", "));
  };

  const handleNewBlogPost = () => {
    setEditingBlogPostId("new");
    setBlogPostForm({
      title: "",
      excerpt: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
      coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800",
      tags: []
    });
    setBlogTagString("");
  };

  const handleSaveBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = blogTagString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const updatedForm = { ...blogPostForm, tags: tagsArray };
    let updatedBlogPosts: BlogPost[] = [];

    if (editingBlogPostId === "new") {
      const newPost: BlogPost = {
        ...updatedForm,
        id: "blog-" + Date.now().toString()
      };
      updatedBlogPosts = [...blogPosts, newPost];
    } else if (editingBlogPostId) {
      updatedBlogPosts = blogPosts.map((p) => 
        p.id === editingBlogPostId ? { ...updatedForm, id: editingBlogPostId } : p
      );
    }

    const ok = await persistData("blog", updatedBlogPosts);
    if (ok) {
      setBlogPosts(updatedBlogPosts);
      setEditingBlogPostId(null);
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this article?")) return;
    const updatedBlogPosts = blogPosts.filter((b) => b.id !== id);
    const ok = await persistData("blog", updatedBlogPosts);
    if (ok) {
      setBlogPosts(updatedBlogPosts);
    }
  };

  return (
    <div className="admin-dashboard-container relative z-10 pt-28 md:pt-32 pb-12 bg-white dark:bg-[#0E0D0C] min-h-screen text-black dark:text-white dark:text-[#F5F5F5] transition-colors duration-500">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-transparent dark:border-transparent pb-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-50 dark:bg-zinc-900 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 font-mono mb-2 border border-transparent dark:border-transparent/60">
              CLOUD ENVIRONMENT SYNCHRONIZED
            </div>
            <h1 className="font-sans text-3xl font-bold text-black dark:text-white dark:text-white tracking-tight">
              Control Center
            </h1>
          </div>
 
          {/* Sub Navigation Toggles */}
          <div className="flex flex-wrap bg-zinc-50 dark:bg-zinc-900/50 p-1.5 rounded-2xl border border-transparent dark:border-transparent/80 gap-1 md:gap-1.5">
            <button
              onClick={() => { setActiveTab("site-config"); }}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "site-config"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 dark:text-[#9F9F9F] hover:text-black dark:hover:text-white"
              }`}
            >
              <Settings className="w-3.5 h-3.5" /> Site Content
            </button>
            <button
              onClick={() => { setActiveTab("featured"); setEditingFeaturedProjectId(null); }}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "featured"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 dark:text-[#9F9F9F] hover:text-black dark:hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F4B400]" /> Featured Projects
            </button>
            <button
              onClick={() => { setActiveTab("recent-work"); setEditingRecentWorkId(null); }}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "recent-work"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 dark:text-[#9F9F9F] hover:text-black dark:hover:text-white"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-[#4285F4]" /> Recent Works
            </button>
            <button
              onClick={() => { setActiveTab("testimonials"); setEditingTestimonialId(null); }}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "testimonials"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 dark:text-[#9F9F9F] hover:text-black dark:hover:text-white"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-rose-500" /> Reviews
            </button>
            <button
              onClick={() => { setActiveTab("timeline"); setEditingSectionId(null); setEditingCardId(null); }}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "timeline"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 dark:text-[#9F9F9F] hover:text-black dark:hover:text-white"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-purple-500" /> Timeline / Credentials
            </button>
            <button
              onClick={() => { setActiveTab("services"); setEditingServiceId(null); }}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "services"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 dark:text-[#9F9F9F] hover:text-black dark:hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-500" /> My Expertise
            </button>
            <button
              onClick={() => { setActiveTab("bookings"); }}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "bookings"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 dark:text-[#9F9F9F] hover:text-black dark:hover:text-white"
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-[#4285F4]" /> Client Bookings
            </button>
            <button
              onClick={() => { setActiveTab("seo"); }}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "seo"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 dark:text-[#9F9F9F] hover:text-black dark:hover:text-white"
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-[#34A853]" /> SEO & Google Ranking
            </button>
          </div>
        </div>
 
        {/* Global Save Status Alerts */}
        {saveStatus && (
          <div className={`p-4 rounded-xl flex items-start gap-3 text-xs mb-6 leading-relaxed border ${
            saveStatus.success 
              ? "bg-emerald-50 border-transparent text-emerald-800" 
              : "bg-rose-50 border-transparent text-rose-800"
          }`}>
            {saveStatus.success ? <Check className="w-4 h-4 text-emerald-500 mt-0.5" /> : <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5" />}
            <span>{saveStatus.message}</span>
          </div>
        )}
 
        {/* ==================== SITE CONTENT CONFIG TAB ==================== */}
        {activeTab === "site-config" && (
          <div className="space-y-8 ">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                  Global Site Configuration & Copy Editor
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  Modify any heading, bio, badge, or link on the live website. Changes persist permanently.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Section 1: Brand & Global Navigation */}
              <div className="bg-[#F5F5F1] dark:bg-[#0C0C0D] border border-transparent/50 dark:border-transparent/80 rounded-[32px] p-8 sm:p-10 space-y-6">
                <div className="border-b border-transparent dark:border-transparent/60 pb-4">
                  <h3 className="font-sans text-lg font-bold text-black dark:text-white uppercase tracking-tight">
                    01. Brand & Global Navigation
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Configure global branding and header actions.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Brand Name (Logo Text)</label>
                    <input
                      type="text"
                      required
                      value={siteConfigForm.brandName}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, brandName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      placeholder="e.g. Rahul"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Navigation CTA Text</label>
                    <input
                      type="text"
                      required
                      value={siteConfigForm.navCtaText}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, navCtaText: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      placeholder="e.g. Get started"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Navigation CTA Link (Page Target or URL)</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={siteConfigForm.navCtaLink || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, navCtaLink: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. contact or https://..."
                      />
                      <div className="mt-2 flex flex-wrap gap-1">
                        {["contact", "home", "projects", "about", "blog"].map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setSiteConfigForm({ ...siteConfigForm, navCtaLink: opt })}
                            className={`px-2 py-0.5 rounded text-[10px] border cursor-pointer ${siteConfigForm.navCtaLink === opt ? 'bg-zinc-800 text-white border-transparent dark:bg-white dark:text-black dark:border-transparent' : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border-transparent dark:bg-zinc-900 dark:text-zinc-400 dark:border-transparent'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Navigation CTA Action Type</label>
                    <select
                      value={siteConfigForm.navCtaActionType || "modal"}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, navCtaActionType: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent dark:border-transparent bg-white dark:bg-zinc-950 text-black dark:text-white focus:outline-none focus:border-transparent transition-colors text-xs"
                    >
                      <option value="modal">Open Booking Modal</option>
                      <option value="url">Redirect / Navigate to URL</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4 border-t border-transparent/60 dark:border-transparent/40">
                  <h4 className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-3">Custom Navigation Link Texts (Routes to corresponding showcase pages)</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Nav Item 1 (Default: Expertise)</label>
                      <input
                        type="text"
                        value={siteConfigForm.navItem1Text || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, navItem1Text: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="Expertise"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Nav Item 2 (Default: Case Studies)</label>
                      <input
                        type="text"
                        value={siteConfigForm.navItem2Text || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, navItem2Text: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="Case Studies"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Nav Item 3 (Default: Testimonials)</label>
                      <input
                        type="text"
                        value={siteConfigForm.navItem3Text || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, navItem3Text: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="Testimonials"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-transparent/60 dark:border-transparent/40 flex justify-end">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSaveSubSection("01. Brand & Global Navigation")}
                    className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-[11px] font-bold tracking-tight shadow-sm cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Brand & Navigation
                  </button>
                </div>
              </div>

              {/* Section 2: Hero Section */}
              <div className="bg-[#F5F5F1] dark:bg-[#0C0C0D] border border-transparent/50 dark:border-transparent/80 rounded-[32px] p-8 sm:p-10 space-y-6">
                <div className="border-b border-transparent dark:border-transparent/60 pb-4">
                  <h3 className="font-sans text-lg font-bold text-black dark:text-white uppercase tracking-tight">
                    02. Hero Section (Sylvan Layout)
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Configure the main above-the-fold display content.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Hero Pill Badge</label>
                    <input
                      type="text"
                      required
                      value={siteConfigForm.heroBadge}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, heroBadge: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Hero CTA Button Text</label>
                    <input
                      type="text"
                      required
                      value={siteConfigForm.heroButtonText}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, heroButtonText: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-transparent/40">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Hero CTA Action Type</label>
                    <select
                      value={siteConfigForm.heroButtonActionType || "url"}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, heroButtonActionType: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent dark:border-transparent bg-white dark:bg-zinc-950 text-black dark:text-white focus:outline-none focus:border-transparent transition-colors text-xs"
                    >
                      <option value="modal">Open Booking Modal</option>
                      <option value="url">Redirect / Navigate to URL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Hero CTA URL or Page Target</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={siteConfigForm.heroButtonUrl || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, heroButtonUrl: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. https://fiverr.com/s/akRBXg8 or contact"
                      />
                      <div className="mt-2 flex flex-wrap gap-1">
                        {["contact", "projects", "blog", "https://www.fiverr.com/s/akRBXg8"].map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setSiteConfigForm({ ...siteConfigForm, heroButtonUrl: opt })}
                            className={`px-2 py-0.5 rounded text-[10px] border cursor-pointer ${siteConfigForm.heroButtonUrl === opt ? 'bg-zinc-800 text-white border-transparent dark:bg-white dark:text-black dark:border-transparent' : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border-transparent dark:bg-zinc-900 dark:text-zinc-400 dark:border-transparent'}`}
                          >
                            {opt.length > 25 ? opt.substring(0, 22) + "..." : opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Hero Big Heading (Supports multi-line via Enter)</label>
                  <textarea
                    required
                    rows={2}
                    value={siteConfigForm.heroHeading}
                    onChange={(e) => setSiteConfigForm({ ...siteConfigForm, heroHeading: e.target.value })}
                    className="w-full px-5 py-3 rounded-[24px] border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Hero Subheading description</label>
                  <textarea
                    required
                    rows={3}
                    value={siteConfigForm.heroSubheading}
                    onChange={(e) => setSiteConfigForm({ ...siteConfigForm, heroSubheading: e.target.value })}
                    className="w-full px-5 py-3 rounded-[24px] border border-transparent dark:border-transparent bg-white dark:bg-zinc-950 text-black dark:text-white focus:outline-none focus:border-transparent transition-colors text-xs"
                  />
                </div>
                <div className="pt-4 border-t border-transparent/60 dark:border-transparent/40 flex justify-end">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSaveSubSection("02. Immersive Hero Section")}
                    className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-[11px] font-bold tracking-tight shadow-sm cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Hero Section
                  </button>
                </div>
              </div>

              {/* Section 3: Editorial Bio Section */}
              <div className="bg-[#F5F5F1] dark:bg-[#0C0C0D] border border-transparent/50 dark:border-transparent/80 rounded-[32px] p-8 sm:p-10 space-y-6">
                <div className="border-b border-transparent dark:border-transparent/60 pb-4">
                  <h3 className="font-sans text-lg font-bold text-black dark:text-white uppercase tracking-tight">
                    03. Editorial Bio Section
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Configure your profile introduction details, profile image, and tag rows.</p>
                </div>
                {/* Profile Picture Management (Reordered to the top) */}
                <div className="pb-2">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-3">
                    Editorial Profile Picture
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-[#080809] p-6 rounded-[28px] border border-transparent dark:border-transparent">
                    <div className="relative w-28 h-28 rounded-[24px] bg-[#2E0B2B] dark:bg-[#1C061A] flex items-center justify-center overflow-hidden border border-transparent shadow-sm shrink-0">
                      {isProfileUploading ? (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-1.5">
                          <span className="w-5 h-5 border-2 border-transparent border-t-transparent rounded-full animate-spin" />
                          <span className="text-[8px] font-bold text-white uppercase tracking-wider">Uploading...</span>
                        </div>
                      ) : siteConfigForm.editorialProfilePic ? (
                        <img 
                          src={siteConfigForm.editorialProfilePic} 
                          alt="Cropped profile preview" 
                          className="w-full h-full object-cover rounded-[20px]" 
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="text-center p-2">
                          <span className="text-[10px] font-bold text-purple-200/80 uppercase tracking-widest">Default SVG</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-3 w-full">
                      <div className="text-xs text-zinc-500">
                        {isProfileUploading ? (
                          <span className="text-amber-600 font-bold flex items-center gap-1 animate-pulse">
                            Saving photo to Cloudinary secure cloud...
                          </span>
                        ) : siteConfigForm.editorialProfilePic ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Custom profile picture active
                          </span>
                        ) : (
                          <span>Using the original vector abstract portrait illustration. Upload a photo below to customize.</span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2.5">
                        <label className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-[#000000] text-white rounded-full hover:opacity-90 cursor-pointer transition-opacity ${isProfileUploading ? "opacity-50 pointer-events-none" : ""}`}>
                          <Upload className="w-3.5 h-3.5" /> {isProfileUploading ? "Uploading..." : "Upload Photo"}
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                            className="hidden" 
                            disabled={isProfileUploading}
                          />
                        </label>
                        
                        {siteConfigForm.editorialProfilePic && (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setCropImageSrc(siteConfigForm.editorialProfilePic || null);
                                setCropZoom(1);
                                setCropX(0);
                                setCropY(0);
                                setShowCropModal(true);
                              }}
                              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-white hover:bg-zinc-50 border border-transparent text-zinc-700 rounded-full cursor-pointer transition-colors"
                            >
                              <Crop className="w-3.5 h-3.5" /> Edit & Crop
                            </button>
                            
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm("Remove custom profile picture and revert to the default illustration?")) {
                                  setSiteConfigForm({ ...siteConfigForm, editorialProfilePic: "" });
                                }
                              }}
                              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-rose-50 hover:bg-rose-100/80 border border-transparent text-rose-600 rounded-full cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remove Picture
                            </button>
                          </>
                        )}
                      </div>

                      <div className="pt-3 border-t border-transparent dark:border-transparent/40 mt-3 w-full">
                        <label className="block text-[9px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
                          Profile Picture Accessibility Alt Text
                        </label>
                        <input
                          type="text"
                          value={siteConfigForm.editorialProfilePicAlt || ""}
                          onChange={(e) => setSiteConfigForm({ ...siteConfigForm, editorialProfilePicAlt: e.target.value })}
                          placeholder="Describe your profile picture (e.g. Rahul Dutta smiling in a black shirt)..."
                          className="w-full px-3 py-1.5 text-xs rounded-full border border-transparent dark:border-transparent bg-white dark:bg-[#0c0c0d] text-black dark:text-white placeholder-zinc-400 focus:outline-none focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-transparent dark:border-transparent/60 pt-6">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Section Pill Badge</label>
                  <input
                    type="text"
                    required
                    value={siteConfigForm.editorialBadge || ""}
                    onChange={(e) => setSiteConfigForm({ ...siteConfigForm, editorialBadge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    placeholder="e.g. Who I Am"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Profile Intro Greeting</label>
                  <input
                    type="text"
                    required
                    value={siteConfigForm.editorialRole}
                    onChange={(e) => setSiteConfigForm({ ...siteConfigForm, editorialRole: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    placeholder="e.g. Hello!"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Profile Intro Subheading / Name line</label>
                  <input
                    type="text"
                    required
                    value={siteConfigForm.editorialHeading}
                    onChange={(e) => setSiteConfigForm({ ...siteConfigForm, editorialHeading: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    placeholder="e.g. I'm Rahul Dutta"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Editorial Description bio</label>
                  <textarea
                    required
                    rows={4}
                    value={siteConfigForm.editorialStatDescription}
                    onChange={(e) => setSiteConfigForm({ ...siteConfigForm, editorialStatDescription: e.target.value })}
                    className="w-full px-5 py-3 rounded-[24px] border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                  />
                </div>

                {/* Tags Management */}
                <div className="border-t border-transparent dark:border-transparent/60 pt-6 space-y-6">
                  {/* Top Line Tags */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-2">
                      Top Line Tags (Editorial Row 1)
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2 p-3 bg-white dark:bg-[#080809] rounded-2xl border border-transparent dark:border-transparent min-h-[46px]">
                        {(!siteConfigForm.editorialTagsTop || (siteConfigForm.editorialTagsTop || []).length === 0) ? (
                          <span className="text-zinc-400 text-xs italic">No tags. Add some below.</span>
                        ) : (
                          (Array.isArray(siteConfigForm.editorialTagsTop) ? siteConfigForm.editorialTagsTop : []).map((tag) => (
                            <span 
                              key={tag} 
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-900 border border-transparent dark:border-transparent text-zinc-800 dark:text-zinc-200 rounded-full text-xs font-medium"
                            >
                              <span>{tag}</span>
                              <button 
                                type="button" 
                                onClick={() => handleRemoveTopTag(tag)}
                                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 p-0.5 rounded-full cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={topTagInput}
                          onChange={(e) => setTopTagInput(e.target.value)}
                          placeholder="Type a new tag (e.g. Interaction Design)..."
                          className="flex-1 px-4 py-2 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTopTag(e); } }}
                        />
                        <button
                          type="button"
                          onClick={(e) => handleAddTopTag(e)}
                          className="px-4 py-2 bg-black text-white hover:opacity-90 rounded-full text-xs font-bold cursor-pointer transition-opacity shrink-0"
                        >
                          Add Tag
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Line Tags */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-2">
                      Bottom Line Tags (Editorial Row 2)
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2 p-3 bg-white dark:bg-[#080809] rounded-2xl border border-transparent dark:border-transparent min-h-[46px]">
                        {(!siteConfigForm.editorialTagsBottom || (siteConfigForm.editorialTagsBottom || []).length === 0) ? (
                          <span className="text-zinc-400 text-xs italic">No tags. Add some below.</span>
                        ) : (
                          (Array.isArray(siteConfigForm.editorialTagsBottom) ? siteConfigForm.editorialTagsBottom : []).map((tag) => (
                            <span 
                              key={tag} 
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-900 border border-transparent dark:border-transparent text-zinc-800 dark:text-zinc-200 rounded-full text-xs font-medium"
                            >
                              <span>{tag}</span>
                              <button 
                                type="button" 
                                onClick={() => handleRemoveBottomTag(tag)}
                                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 p-0.5 rounded-full cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={bottomTagInput}
                          onChange={(e) => setBottomTagInput(e.target.value)}
                          placeholder="Type a new tag (e.g. Framer)..."
                          className="flex-1 px-4 py-2 rounded-full border border-transparent dark:border-transparent bg-white dark:bg-zinc-950 text-black dark:text-white focus:outline-none focus:border-transparent transition-colors text-xs"
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddBottomTag(e); } }}
                        />
                        <button
                          type="button"
                          onClick={(e) => handleAddBottomTag(e)}
                          className="px-4 py-2 bg-black text-white hover:opacity-90 rounded-full text-xs font-bold cursor-pointer transition-opacity shrink-0"
                        >
                          Add Tag
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Email & Location Settings (Issue 3 / Editorial Bio updates) */}
                <div className="border-t border-transparent dark:border-transparent/60 pt-6 space-y-6">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-black dark:text-white">Custom Bio Email & Map Location</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Contact Email Address</label>
                      <input
                        type="email"
                        value={siteConfigForm.editorialEmail || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, editorialEmail: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. workprofile.uiux@gmail.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Map Location Text</label>
                      <input
                        type="text"
                        value={siteConfigForm.editorialLocationText || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, editorialLocationText: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. Dhaka, Bangladesh"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Prefilled Email Subject Line</label>
                      <input
                        type="text"
                        value={siteConfigForm.editorialEmailSubject || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, editorialEmailSubject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. Project Inquiry"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Google Maps URL</label>
                      <input
                        type="url"
                        value={siteConfigForm.editorialLocationUrl || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, editorialLocationUrl: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. https://maps.google.com/..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Prefilled Email Body template</label>
                    <textarea
                      rows={3}
                      value={siteConfigForm.editorialEmailBody || ""}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, editorialEmailBody: e.target.value })}
                      className="w-full px-5 py-3 rounded-[24px] border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      placeholder="Type the message body that will pre-populate the user's Gmail composer..."
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-transparent/60 dark:border-transparent/40 flex justify-end">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSaveSubSection("03. Editorial Bio Section")}
                    className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-[11px] font-bold tracking-tight shadow-sm cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Bio Section
                  </button>
                </div>
              </div>

              {/* Section 4: Future Projects Section */}
              <div className="bg-[#F5F5F1] dark:bg-[#0C0C0D] border border-transparent/50 dark:border-transparent/80 rounded-[32px] p-8 sm:p-10 space-y-6">
                <div className="border-b border-transparent dark:border-transparent/60 pb-4">
                  <h3 className="font-sans text-lg font-bold text-black dark:text-white uppercase tracking-tight">
                    04. Future Projects Headers
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Update the descriptive text for the Concepts & Vision section.</p>
                </div>
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Badge</label>
                    <input
                      type="text"
                      required
                      value={siteConfigForm.futureProjectsBadge}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, futureProjectsBadge: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Heading</label>
                    <input
                      type="text"
                      required
                      value={siteConfigForm.futureProjectsHeading}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, futureProjectsHeading: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Action Button Text</label>
                    <input
                      type="text"
                      required
                      value={siteConfigForm.futureProjectsButtonText}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, futureProjectsButtonText: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
                  <div className="space-y-3 col-span-1">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Button Destination Page</label>
                      <select
                        value={
                          ["solutions", "architecture", "reviews", "blog", "contact", "admin", "style-guide"].includes(siteConfigForm.futureProjectsButtonLink || "")
                            ? (siteConfigForm.futureProjectsButtonLink || "")
                            : "custom"
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "custom") {
                            setSiteConfigForm({ ...siteConfigForm, futureProjectsButtonLink: "/featured-projects" });
                          } else {
                            setSiteConfigForm({ ...siteConfigForm, futureProjectsButtonLink: val });
                          }
                        }}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors cursor-pointer"
                      >
                        <option value="solutions">Solutions (Dynamic tab 1)</option>
                        <option value="architecture">Architecture (Dynamic tab 2)</option>
                        <option value="reviews">Reviews (Dynamic tab 3)</option>
                        <option value="blog">Blog Main Page</option>
                        <option value="contact">Contact Modal Dialog</option>
                        <option value="admin">Admin Dashboard</option>
                        <option value="style-guide">Style Guide</option>
                        <option value="custom">Custom URL / Manual Link (Input below)</option>
                      </select>
                    </div>

                    {(!["solutions", "architecture", "reviews", "blog", "contact", "admin", "style-guide"].includes(siteConfigForm.futureProjectsButtonLink || "")) && (
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Custom URL / Link</label>
                        <input
                          type="text"
                          required
                          value={siteConfigForm.futureProjectsButtonLink || ""}
                          onChange={(e) => setSiteConfigForm({ ...siteConfigForm, futureProjectsButtonLink: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                          placeholder="/featured-projects or https://..."
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Subheading (Vision tags)</label>
                  <input
                    type="text"
                    required
                    value={siteConfigForm.futureProjectsSubheading}
                    onChange={(e) => setSiteConfigForm({ ...siteConfigForm, futureProjectsSubheading: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Section Description Copy</label>
                  <textarea
                    required
                    rows={3}
                    value={siteConfigForm.futureProjectsDescription}
                    onChange={(e) => setSiteConfigForm({ ...siteConfigForm, futureProjectsDescription: e.target.value })}
                    className="w-full px-5 py-3 rounded-[24px] border border-transparent dark:border-transparent bg-white dark:bg-zinc-950 text-black dark:text-white focus:outline-none focus:border-transparent transition-colors text-xs"
                  />
                </div>
                <div className="pt-4 border-t border-transparent/60 dark:border-transparent/40 flex justify-end">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSaveSubSection("04. Future Projects Headers")}
                    className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-[11px] font-bold tracking-tight shadow-sm cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Future Projects Headers
                  </button>
                </div>
              </div>

              {/* Section 5: Disciplines Section */}
              <div className="bg-[#F5F5F1] dark:bg-[#0C0C0D] border border-transparent/50 dark:border-transparent/80 rounded-[32px] p-8 sm:p-10 space-y-6">
                <div className="border-b border-transparent dark:border-transparent/60 pb-4">
                  <h3 className="font-sans text-lg font-bold text-black dark:text-white uppercase tracking-tight">
                    05. Disciplines Section
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Configure headers and dynamic sliding ticker tags for the disciplines section.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Disciplines Pill Badge</label>
                    <input
                      type="text"
                      required
                      value={siteConfigForm.disciplinesBadge || ""}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, disciplinesBadge: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Section Title Heading</label>
                    <input
                      type="text"
                      required
                      value={siteConfigForm.disciplinesHeading || ""}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, disciplinesHeading: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Section Subheading</label>
                    <input
                      type="text"
                      required
                      value={siteConfigForm.disciplinesSubheading || ""}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, disciplinesSubheading: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Disciplines Section Description</label>
                  <textarea
                    required
                    rows={3}
                    value={siteConfigForm.disciplinesDescription || ""}
                    onChange={(e) => setSiteConfigForm({ ...siteConfigForm, disciplinesDescription: e.target.value })}
                    className="w-full px-5 py-3 rounded-[24px] border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                  />
                </div>

                {/* Dynamic Disciplines Tags Row 1 and Row 2 */}
                <div className="border-t border-transparent dark:border-transparent/60 pt-6 space-y-6">
                  {/* Row 1 Tags */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-2">
                      Disciplines Row 1 Ticker Tags (Scrolling Line 1)
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2 p-3 bg-white dark:bg-[#080809] rounded-2xl border border-transparent dark:border-transparent min-h-[46px]">
                        {(!siteConfigForm.disciplinesTagsTop || (siteConfigForm.disciplinesTagsTop || []).length === 0) ? (
                          <span className="text-zinc-400 text-xs italic">No tags. Add some below.</span>
                        ) : (
                          (Array.isArray(siteConfigForm.disciplinesTagsTop) ? siteConfigForm.disciplinesTagsTop : []).map((tag) => (
                            <span 
                              key={tag} 
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-900 border border-transparent dark:border-transparent text-zinc-800 dark:text-zinc-200 rounded-full text-xs font-medium"
                            >
                              <span>{tag}</span>
                              <button 
                                type="button" 
                                onClick={() => handleRemoveDiscTopTag(tag)}
                                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 p-0.5 rounded-full cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={discTopTagInput}
                          onChange={(e) => setDiscTopTagInput(e.target.value)}
                          placeholder="Type a new tag (e.g. Interaction Design)..."
                          className="flex-1 px-4 py-2 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddDiscTopTag(e); } }}
                        />
                        <button
                          type="button"
                          onClick={(e) => handleAddDiscTopTag(e)}
                          className="px-4 py-2 bg-black text-white hover:opacity-90 rounded-full text-xs font-bold cursor-pointer transition-opacity shrink-0"
                        >
                          Add Tag
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Row 2 Tags */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-2">
                      Disciplines Row 2 Ticker Tags (Scrolling Line 2)
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2 p-3 bg-white dark:bg-[#080809] rounded-2xl border border-transparent dark:border-transparent min-h-[46px]">
                        {(!siteConfigForm.disciplinesTagsBottom || (siteConfigForm.disciplinesTagsBottom || []).length === 0) ? (
                          <span className="text-zinc-400 text-xs italic">No tags. Add some below.</span>
                        ) : (
                          (Array.isArray(siteConfigForm.disciplinesTagsBottom) ? siteConfigForm.disciplinesTagsBottom : []).map((tag) => (
                            <span 
                              key={tag} 
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-900 border border-transparent dark:border-transparent text-zinc-800 dark:text-zinc-200 rounded-full text-xs font-medium"
                            >
                              <span>{tag}</span>
                              <button 
                                type="button" 
                                onClick={() => handleRemoveDiscBottomTag(tag)}
                                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 p-0.5 rounded-full cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={discBottomTagInput}
                          onChange={(e) => setDiscBottomTagInput(e.target.value)}
                          placeholder="Type a new tag (e.g. Framer)..."
                          className="flex-1 px-4 py-2 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddDiscBottomTag(e); } }}
                        />
                        <button
                          type="button"
                          onClick={(e) => handleAddDiscBottomTag(e)}
                          className="px-4 py-2 bg-black text-white hover:opacity-90 rounded-full text-xs font-bold cursor-pointer transition-opacity shrink-0"
                        >
                          Add Tag
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-transparent/60 dark:border-transparent/40 flex justify-end">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSaveSubSection("05. Disciplines Section")}
                    className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-[11px] font-bold tracking-tight shadow-sm cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Disciplines Section
                  </button>
                </div>
              </div>

              {/* Section 7: Selected Recent Works */}
              <div className="bg-[#F5F5F1] dark:bg-[#0C0C0D] border border-transparent/50 dark:border-transparent/80 rounded-[32px] p-8 sm:p-10 space-y-6">
                <div className="border-b border-transparent dark:border-transparent/60 pb-4">
                  <h3 className="font-sans text-lg font-bold text-black dark:text-white uppercase tracking-tight">
                    07. Selected Recent Works
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Configure headers for the client projects carousel section.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Recent Work Pill Badge</label>
                    <input
                      type="text"
                      required
                      value={siteConfigForm.recentWorkBadge}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, recentWorkBadge: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Recent Work Display Title</label>
                    <input
                      type="text"
                      required
                      value={siteConfigForm.recentWorkHeading}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, recentWorkHeading: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Recent Work Display Subtitle</label>
                    <input
                      type="text"
                      required
                      value={siteConfigForm.recentWorkSubheading || ""}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, recentWorkSubheading: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Recent Work Section Description</label>
                  <textarea
                    required
                    rows={3}
                    value={siteConfigForm.recentWorkDescription}
                    onChange={(e) => setSiteConfigForm({ ...siteConfigForm, recentWorkDescription: e.target.value })}
                    className="w-full px-5 py-3 rounded-[24px] border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                  />
                </div>
                <div className="pt-4 border-t border-transparent/60 dark:border-transparent/40 flex justify-end">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSaveSubSection("07. Selected Recent Works")}
                    className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-[11px] font-bold tracking-tight shadow-sm cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Recent Works Headers
                  </button>
                </div>
              </div>

              {/* Section 8: My Services & Expertise Headers */}
              <div className="bg-[#F5F5F1] dark:bg-[#0C0C0D] border border-transparent/50 dark:border-transparent/80 rounded-[32px] p-8 sm:p-10 space-y-6">
                <div className="border-b border-transparent dark:border-transparent/60 pb-4">
                  <h3 className="font-sans text-lg font-bold text-black dark:text-white uppercase tracking-tight">
                    08. My Services &amp; Expertise Headers
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Configure headings for the bento service matrix grids.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Expertise Pill Badge</label>
                    <input
                      type="text"
                      required
                      value={siteConfigForm.servicesBadge}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, servicesBadge: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Display Title</label>
                    <input
                      type="text"
                      required
                      value={siteConfigForm.servicesHeading}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, servicesHeading: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Display Subtitle</label>
                    <input
                      type="text"
                      required
                      value={siteConfigForm.servicesSubheading}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, servicesSubheading: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Services Section Intro Description</label>
                  <textarea
                    required
                    rows={3}
                    value={siteConfigForm.servicesDescription}
                    onChange={(e) => setSiteConfigForm({ ...siteConfigForm, servicesDescription: e.target.value })}
                    className="w-full px-5 py-3 rounded-[24px] border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                  />
                </div>
                <div className="pt-4 border-t border-transparent/60 dark:border-transparent/40 flex justify-end">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSaveSubSection("08. My Services & Expertise Headers")}
                    className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-[11px] font-bold tracking-tight shadow-sm cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Services Headers
                  </button>
                </div>
              </div>

              {/* Section 9: Client Reviews & Testimonials Headers */}
              <div className="bg-[#F5F5F1] dark:bg-[#0C0C0D] border border-transparent/50 dark:border-transparent/80 rounded-[32px] p-8 sm:p-10 space-y-6">
                <div className="border-b border-transparent dark:border-transparent/60 pb-4">
                  <h3 className="font-sans text-lg font-bold text-black dark:text-white uppercase tracking-tight">
                    09. Client Reviews &amp; Testimonials Headers
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Modify headers for the endless scrolling reviews slider.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Reviews Pill Badge</label>
                    <input
                      type="text"
                      required
                      value={siteConfigForm.reviewsBadge}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, reviewsBadge: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Reviews Display Title</label>
                    <input
                      type="text"
                      required
                      value={siteConfigForm.reviewsHeading}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, reviewsHeading: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Reviews Display Subtitle</label>
                    <input
                      type="text"
                      required
                      value={siteConfigForm.reviewsSubheading || ""}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, reviewsSubheading: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Reviews Section Subheading Copy</label>
                  <textarea
                    required
                    rows={3}
                    value={siteConfigForm.reviewsDescription}
                    onChange={(e) => setSiteConfigForm({ ...siteConfigForm, reviewsDescription: e.target.value })}
                    className="w-full px-5 py-3 rounded-[24px] border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                  />
                </div>
                <div className="pt-4 border-t border-transparent/60 dark:border-transparent/40 flex justify-end">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSaveSubSection("09. Client Reviews & Testimonials Headers")}
                    className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-[11px] font-bold tracking-tight shadow-sm cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Reviews Headers
                  </button>
                </div>
              </div>

              {/* Section 9b: Client Reviews Stats Box */}
              <div className="bg-[#F5F5F1] dark:bg-[#0C0C0D] border border-transparent/50 dark:border-transparent/80 rounded-[32px] p-8 sm:p-10 space-y-6">
                <div className="border-b border-transparent dark:border-transparent/60 pb-4">
                  <h3 className="font-sans text-lg font-bold text-black dark:text-white uppercase tracking-tight">
                    09b. Client Reviews Stats Box
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Configure numbers and descriptive labels for the three status metrics below the reviews.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Stat 1 */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white dark:text-white border-b border-transparent/60 pb-1">Stat Metric 01</h4>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Number Value</label>
                      <input
                        type="text"
                        value={siteConfigForm.reviewsStat1Number || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, reviewsStat1Number: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. 100+"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Label Text</label>
                      <input
                        type="text"
                        value={siteConfigForm.reviewsStat1Label || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, reviewsStat1Label: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. design projects completed."
                      />
                    </div>
                  </div>
                  {/* Stat 2 */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white dark:text-white border-b border-transparent/60 pb-1">Stat Metric 02</h4>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Number Value</label>
                      <input
                        type="text"
                        value={siteConfigForm.reviewsStat2Number || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, reviewsStat2Number: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. 100%"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Label Text</label>
                      <input
                        type="text"
                        value={siteConfigForm.reviewsStat2Label || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, reviewsStat2Label: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. Client satisfaction rate."
                      />
                    </div>
                  </div>
                  {/* Stat 3 */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white dark:text-white border-b border-transparent/60 pb-1">Stat Metric 03</h4>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Number Value</label>
                      <input
                        type="text"
                        value={siteConfigForm.reviewsStat3Number || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, reviewsStat3Number: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. 40+"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Label Text</label>
                      <input
                        type="text"
                        value={siteConfigForm.reviewsStat3Label || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, reviewsStat3Label: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. Happy Clients"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-transparent/60 dark:border-transparent/40 flex justify-end">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSaveSubSection("09b. Client Reviews Stats Box")}
                    className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-[11px] font-bold tracking-tight shadow-sm cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Reviews Stats
                  </button>
                </div>
              </div>

              {/* Section 10: Developers & Organizations Pipelines */}
              <div className="bg-[#F5F5F1] dark:bg-[#0C0C0D] border border-transparent/50 dark:border-transparent/80 rounded-[32px] p-8 sm:p-10 space-y-6">
                <div className="border-b border-transparent dark:border-transparent/60 pb-4">
                  <h3 className="font-sans text-lg font-bold text-black dark:text-white uppercase tracking-tight">
                    10. Developers &amp; Organizations Pipelines
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Configure titles, descriptions, buttons, and action links for both focus pipelines.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Developers Pipeline Column */}
                  <div className="space-y-4 bg-white dark:bg-[#080809] p-6 rounded-[28px] border border-transparent dark:border-transparent">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white dark:text-white border-b border-transparent pb-2">For Developers (Pipeline 01)</h4>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Top Mini-Badge Label</label>
                      <input
                        type="text"
                        value={siteConfigForm.ctaDevLabel || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, ctaDevLabel: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. 01 / OPEN SOURCE CODE"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Pipeline Title</label>
                      <input
                        type="text"
                        value={siteConfigForm.ctaDevTitle || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, ctaDevTitle: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. For Developers"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Description Text</label>
                      <textarea
                        rows={3}
                        value={siteConfigForm.ctaDevDesc || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, ctaDevDesc: e.target.value })}
                        className="w-full px-5 py-3 rounded-[24px] border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="Describe developer offerings..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Button Text</label>
                        <input
                          type="text"
                          value={siteConfigForm.ctaDevBtnText || ""}
                          onChange={(e) => setSiteConfigForm({ ...siteConfigForm, ctaDevBtnText: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                          placeholder="e.g. Download CLI Node"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Button URL (Page or Link)</label>
                        <input
                          type="text"
                          value={siteConfigForm.ctaDevBtnUrl || ""}
                          onChange={(e) => setSiteConfigForm({ ...siteConfigForm, ctaDevBtnUrl: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                          placeholder="e.g. contact or https://..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Organizations Pipeline Column */}
                  <div className="space-y-4 bg-white dark:bg-[#080809] p-6 rounded-[28px] border border-transparent dark:border-transparent">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white dark:text-white border-b border-transparent pb-2">For Organizations (Pipeline 02)</h4>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Top Mini-Badge Label</label>
                      <input
                        type="text"
                        value={siteConfigForm.ctaOrgLabel || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, ctaOrgLabel: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. 02 / SECURED PIPELINE"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Pipeline Title</label>
                      <input
                        type="text"
                        value={siteConfigForm.ctaOrgTitle || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, ctaOrgTitle: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. For Organizations"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Description Text</label>
                      <textarea
                        rows={3}
                        value={siteConfigForm.ctaOrgDesc || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, ctaOrgDesc: e.target.value })}
                        className="w-full px-5 py-3 rounded-[24px] border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="Describe enterprise offerings..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Button Text</label>
                        <input
                          type="text"
                          value={siteConfigForm.ctaOrgBtnText || ""}
                          onChange={(e) => setSiteConfigForm({ ...siteConfigForm, ctaOrgBtnText: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                          placeholder="e.g. Request Enterprise Access"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Button URL (Page or Link)</label>
                        <input
                          type="text"
                          value={siteConfigForm.ctaOrgBtnUrl || ""}
                          onChange={(e) => setSiteConfigForm({ ...siteConfigForm, ctaOrgBtnUrl: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                          placeholder="e.g. contact or https://..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-transparent/60 dark:border-transparent/40 flex justify-end">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSaveSubSection("10. Developers & Organizations Pipelines")}
                    className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-[11px] font-bold tracking-tight shadow-sm cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Pipelines
                  </button>
                </div>
              </div>

              {/* Section 11: Bottom Call-To-Action */}
              <div className="bg-[#F5F5F1] dark:bg-[#0C0C0D] border border-transparent/50 dark:border-transparent/80 rounded-[32px] p-8 sm:p-10 space-y-6">
                <div className="border-b border-transparent dark:border-transparent/60 pb-4">
                  <h3 className="font-sans text-lg font-bold text-black dark:text-white uppercase tracking-tight">
                    11. Bottom Call-To-Action
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Configure the large display heading and interactive buttons at the bottom of the home page.</p>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Large Heading Copy (Use Enter for line breaks)</label>
                  <textarea
                    rows={3}
                    value={siteConfigForm.bottomCtaHeading || ""}
                    onChange={(e) => setSiteConfigForm({ ...siteConfigForm, bottomCtaHeading: e.target.value })}
                    className="w-full px-5 py-3 rounded-[24px] border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    placeholder={`Let's build\nsomething incredible\ntogether`}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Primary CTA Button */}
                  <div className="space-y-4 bg-white dark:bg-[#080809] p-5 rounded-[24px] border border-transparent dark:border-transparent">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 pb-1">Primary CTA Button</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Button Text</label>
                        <input
                          type="text"
                          value={siteConfigForm.bottomCtaPrimaryBtnText || ""}
                          onChange={(e) => setSiteConfigForm({ ...siteConfigForm, bottomCtaPrimaryBtnText: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                          placeholder="e.g. Contact Rahul"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Link URL or Page Target</label>
                        <input
                          type="text"
                          value={siteConfigForm.bottomCtaPrimaryBtnUrl || ""}
                          onChange={(e) => setSiteConfigForm({ ...siteConfigForm, bottomCtaPrimaryBtnUrl: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                          placeholder="e.g. contact"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Secondary CTA Button */}
                  <div className="space-y-4 bg-white dark:bg-[#080809] p-5 rounded-[24px] border border-transparent dark:border-transparent">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 pb-1">Secondary CTA Button</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Button Text</label>
                        <input
                          type="text"
                          value={siteConfigForm.bottomCtaSecondaryBtnText || ""}
                          onChange={(e) => setSiteConfigForm({ ...siteConfigForm, bottomCtaSecondaryBtnText: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                          placeholder="e.g. View Solutions"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Link URL or Page Target</label>
                        <input
                          type="text"
                          value={siteConfigForm.bottomCtaSecondaryBtnUrl || ""}
                          onChange={(e) => setSiteConfigForm({ ...siteConfigForm, bottomCtaSecondaryBtnUrl: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                          placeholder="e.g. projects"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-transparent/60 dark:border-transparent/40 flex justify-end">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSaveSubSection("11. Bottom Call-To-Action")}
                    className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-[11px] font-bold tracking-tight shadow-sm cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Bottom Call-To-Action
                  </button>
                </div>
              </div>

              {/* Section 12: Footer Configuration */}
              <div className="bg-[#F5F5F1] dark:bg-[#0C0C0D] border border-transparent/50 dark:border-transparent/80 rounded-[32px] p-8 sm:p-10 space-y-6">
                <div className="border-b border-transparent dark:border-transparent/60 pb-4">
                  <h3 className="font-sans text-lg font-bold text-black dark:text-white uppercase tracking-tight">
                    12. Footer Configuration &amp; All Links
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Update all footer headings, giant graphic display wordmarks, and direct redirection hyperlinks.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Footer Large Heading</label>
                    <input
                      type="text"
                      value={siteConfigForm.footerHeading || ""}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, footerHeading: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      placeholder="e.g. Experience liftoff"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Footer Giant Wordmark (Full Name)</label>
                    <input
                      type="text"
                      value={siteConfigForm.footerWordmark || ""}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, footerWordmark: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      placeholder="e.g. Rahul Dutta"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Footer Brand Description</label>
                    <input
                      type="text"
                      value={siteConfigForm.footerDescription || ""}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, footerDescription: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      placeholder="e.g. UI/UX Product Designer &amp; Frontend Technologist"
                    />
                  </div>
                </div>

                <div className="border-t border-transparent dark:border-transparent/60 pt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white mb-4">Footer Link Columns Copy Editor</h4>
                  <p className="text-xs text-zinc-500 mb-4">
                    Type each link on a new line using the format: <code className="bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded font-mono text-[10px] text-zinc-700">Link Label | PageName or URL</code>
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Link Col 1 */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Column 1 Links</label>
                      <textarea
                        rows={6}
                        value={footerCol1Input}
                        onChange={(e) => setFooterCol1Input(e.target.value)}
                        className="w-full px-4 py-3 rounded-[20px] border border-transparent bg-white text-xs font-mono text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder={`Download | #\nProduct | #\nDocs | #`}
                      />
                    </div>

                    {/* Link Col 2 */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Column 2 Links</label>
                      <textarea
                        rows={6}
                        value={footerCol2Input}
                        onChange={(e) => setFooterCol2Input(e.target.value)}
                        className="w-full px-4 py-3 rounded-[20px] border border-transparent bg-white text-xs font-mono text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder={`Blog | blog\nPricing | #\nStyle Guide | style-guide`}
                      />
                    </div>

                    {/* Link Col 3 */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Column 3 Links</label>
                      <textarea
                        rows={6}
                        value={footerCol3Input}
                        onChange={(e) => setFooterCol3Input(e.target.value)}
                        className="w-full px-4 py-3 rounded-[20px] border border-transparent bg-white text-xs font-mono text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder={`Security | #\nStatus | #\nTerms | #`}
                      />
                    </div>

                    {/* Social links / Bottom row */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Bottom &amp; Social Links</label>
                      <textarea
                        rows={6}
                        value={footerSocialInput}
                        onChange={(e) => setFooterSocialInput(e.target.value)}
                        className="w-full px-4 py-3 rounded-[20px] border border-transparent bg-white text-xs font-mono text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder={`About Rahul | #editorial-hero\nFiverr | https://fiverr.com/...\nBehance | https://behance.net/...`}
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-transparent/60 dark:border-transparent/40 flex justify-end">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSaveSubSection("12. Footer Configuration & All Links")}
                    className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-[11px] font-bold tracking-tight shadow-sm cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Footer & Links
                  </button>
                </div>
              </div>

              {/* Section 13: Resume/CV PDF Manager */}
              <div className="bg-[#F5F5F1] dark:bg-[#0C0C0D] border border-transparent/50 dark:border-transparent/80 rounded-[32px] p-8 sm:p-10 space-y-6">
                <div className="border-b border-transparent dark:border-transparent/60 pb-4">
                  <h3 className="font-sans text-lg font-bold text-black dark:text-white uppercase tracking-tight">
                    13. Resume / CV PDF Manager
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    Upload your latest CV. The file will automatically be saved as <code className="bg-zinc-200 dark:bg-zinc-900 px-1.5 py-0.5 rounded text-black dark:text-zinc-300 font-mono text-[10px]">Rahul_Dutta_Resume.pdf</code> and replace any previous uploads to prevent database bloating.
                  </p>
                </div>

                <div className="bg-white dark:bg-[#111112] border border-transparent dark:border-transparent rounded-2xl p-6">
                  <form onSubmit={handleResumeUpload} className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">Direct Download Link</span>
                        <a 
                          href="/api/download-resume" 
                          target="_blank" 
                          download="Rahul_Dutta_Resume.pdf"
                          className="font-mono text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                        >
                          /api/download-resume
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        </a>
                        <p className="text-[11px] text-zinc-400 mt-1 font-sans">
                          Clicking this link anywhere on the site will instantly download your CV without navigating away.
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400">Select PDF File</label>
                        <input
                          id="resume-input-file"
                          type="file"
                          accept=".pdf,application/pdf"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setResumeFile(e.target.files[0]);
                            }
                          }}
                          className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[11px] file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 dark:file:bg-zinc-900 dark:file:text-zinc-300 cursor-pointer text-zinc-600 dark:text-zinc-400"
                        />
                      </div>
                    </div>

                    {resumeUploadStatus && (
                      <div className={`text-xs px-4 py-2.5 rounded-lg font-sans ${resumeUploadStatus.success ? "bg-emerald-50 text-emerald-700 border border-transparent" : "bg-rose-50 text-rose-700 border border-transparent"}`}>
                        {resumeUploadStatus.message}
                      </div>
                    )}

                    <div className="pt-2 border-t border-transparent dark:border-transparent/60 flex justify-end">
                      <button
                        type="submit"
                        disabled={resumeUploading || !resumeFile}
                        className={`px-5 py-2 rounded-full font-bold tracking-tight shadow-sm text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer ${
                          resumeUploading || !resumeFile 
                            ? "bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-600 cursor-not-allowed" 
                            : "bg-black dark:bg-white text-white dark:text-black hover:opacity-90"
                        }`}
                      >
                        {resumeUploading ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-transparent border-transparent rounded-full animate-spin"></span>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            Upload CV File
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==================== TIMELINE / CREDENTIALS EDITOR TAB ==================== */}
        {activeTab === "timeline" && (
          <div className="space-y-8 ">
            {/* Tab Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-transparent pb-5">
              <div>
                <h2 className="text-xl font-bold text-black dark:text-white dark:text-white uppercase tracking-tight font-sans">
                  Timeline & Credentials Studio
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  Manage your academic milestones, professional experience, certificates, and sticky titles in clear, easy steps.
                </p>
              </div>
            </div>

            {/* Stepped UX Navigation (Sub-tabs) */}
            <div className="flex bg-zinc-50 dark:bg-zinc-900/50 p-1 rounded-2xl border border-transparent dark:border-transparent/80 max-w-md">
              <button
                type="button"
                onClick={() => setTimelineSubTab("headers")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  timelineSubTab === "headers"
                    ? "bg-[#000000] text-white shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:text-white"
                }`}
              >
                <Settings className="w-3.5 h-3.5" /> Step 1: Configure Headers
              </button>
              <button
                type="button"
                onClick={() => setTimelineSubTab("matrix")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  timelineSubTab === "matrix"
                    ? "bg-[#000000] text-white shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> Step 2: Groups & Cards Matrix
              </button>
            </div>

            {/* Step 1 Content: Configure Headers */}
            {timelineSubTab === "headers" && (
              <div className="bg-[#F5F5F1] dark:bg-[#0C0C0D] border border-transparent/50 dark:border-transparent/80 rounded-[32px] p-8 sm:p-10 space-y-6 ">
                <div className="border-b border-transparent dark:border-transparent/60 pb-4">
                  <h3 className="font-sans text-base font-bold text-black dark:text-white uppercase tracking-tight">
                    Timeline Section Header Customization
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Configure how the timeline displays on the landing page.</p>
                </div>

                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const ok = await persistData("site-config", siteConfigForm);
                  if (ok) {
                    setSiteConfig(siteConfigForm);
                  }
                }} className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Credentials Pill Badge</label>
                      <input
                        type="text"
                        required
                        value={siteConfigForm.credentialsBadge}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, credentialsBadge: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Credentials Display Title</label>
                      <input
                        type="text"
                        required
                        value={siteConfigForm.credentialsHeading}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, credentialsHeading: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Credentials Display Subtitle</label>
                      <input
                        type="text"
                        required
                        value={siteConfigForm.credentialsSubheading || ""}
                        onChange={(e) => setSiteConfigForm({ ...siteConfigForm, credentialsSubheading: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Timeline Intro Description</label>
                    <textarea
                      required
                      rows={3}
                      value={siteConfigForm.credentialsDescription}
                      onChange={(e) => setSiteConfigForm({ ...siteConfigForm, credentialsDescription: e.target.value })}
                      className="w-full px-5 py-3 rounded-[24px] border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-transparent dark:border-transparent/60 flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2.5 bg-black hover:bg-zinc-800 text-white rounded-full flex items-center gap-2 text-xs font-bold cursor-pointer transition-colors shadow-sm disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" /> Save Headers Configuration
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2 Content: Groups & Cards Matrix */}
            {timelineSubTab === "matrix" && (
              <div className="space-y-6 ">
                
                {/* Inline Section Add/Edit Form */}
                {editingSectionId && (
                  <div className="p-6 bg-white dark:bg-[#080809] border border-transparent dark:border-transparent rounded-2xl space-y-4 shadow-sm ">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                      {editingSectionId === "new" ? "Add New Section Group" : "Edit Section Group"}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Section Group Title</label>
                        <input 
                          type="text" 
                          value={sectionTitleInput} 
                          onChange={(e) => setSectionTitleInput(e.target.value)}
                          placeholder="e.g. EXPERIENCE"
                          className="w-full px-4 py-2 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Section Icon</label>
                        <select 
                          value={sectionIconInput} 
                          onChange={(e) => setSectionIconInput(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none"
                        >
                          <option value="Briefcase">Briefcase (Portfolio / Work)</option>
                          <option value="GraduationCap">Graduation Cap (Education)</option>
                          <option value="Award">Award (Certifications / Medals)</option>
                          <option value="BookOpen">Book Open (Academics / Writing)</option>
                          <option value="Code">Code (Development / Engineering)</option>
                          <option value="Zap">Zap (Skills / Fast Tracks)</option>
                          <option value="Activity">Activity (Metrics / Health)</option>
                          <option value="Layers">Layers (Design / Stack)</option>
                          <option value="Sparkles">Sparkles (Features / Honors)</option>
                          <option value="Lightbulb">Lightbulb (Research / Concepts)</option>
                          <option value="Heart">Heart (Community / Core)</option>
                          <option value="Trophy">Trophy (Achievements)</option>
                          <option value="Laptop">Laptop (Workstations)</option>
                          <option value="Star">Star (Ratings / Feature)</option>
                          <option value="Globe">Globe (Websites / International)</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end pt-2">
                      <button 
                        type="button" 
                        onClick={() => setEditingSectionId(null)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-zinc-800 rounded-full text-xs font-bold cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="button" 
                        onClick={handleSaveSection}
                        className="px-4 py-2 bg-black text-white hover:opacity-90 rounded-full text-xs font-bold cursor-pointer transition-opacity"
                      >
                        Save Group
                      </button>
                    </div>
                  </div>
                )}

                {/* Inline Card Add/Edit Form */}
                {editingCardId && (
                  <div className="p-6 bg-white dark:bg-[#080809] border border-transparent dark:border-transparent rounded-2xl space-y-4 my-4 shadow-sm ">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                      {editingCardId === "new" ? "Add New Timeline Card" : "Edit Timeline Card"}
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Title (Role, Degree, etc.)</label>
                        <input 
                          type="text" 
                          value={cardTitleInput} 
                          onChange={(e) => setCardTitleInput(e.target.value)}
                          placeholder="e.g. Lead Product Designer"
                          className="w-full px-4 py-2 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Subtitle (Company, School, etc.)</label>
                        <input 
                          type="text" 
                          value={cardSubtitleInput} 
                          onChange={(e) => setCardSubtitleInput(e.target.value)}
                          placeholder="e.g. Google"
                          className="w-full px-4 py-2 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Duration / Date</label>
                        <input 
                          type="text" 
                          value={cardDateInput} 
                          onChange={(e) => setCardDateInput(e.target.value)}
                          placeholder="e.g. 2024 - Present"
                          className="w-full px-4 py-2 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Bullet details (One per line)</label>
                      <textarea 
                        rows={3}
                        value={cardDetailsInput} 
                        onChange={(e) => setCardDetailsInput(e.target.value)}
                        placeholder="Bullet point 1&#10;Bullet point 2&#10;For CGPA, type 'CGPA: 3.90' or similar..."
                        className="w-full px-5 py-3 rounded-2xl border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button 
                        type="button" 
                        onClick={() => { setEditingCardId(null); setEditingCardSectionId(null); }}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-zinc-800 rounded-full text-xs font-bold cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="button" 
                        onClick={handleSaveCard}
                        className="px-4 py-2 bg-black text-white hover:opacity-90 rounded-full text-xs font-bold cursor-pointer transition-opacity"
                      >
                        Save Card
                      </button>
                    </div>
                  </div>
                )}

                {/* Timeline Interactive Listing */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-transparent dark:border-transparent pb-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Groups &amp; Cards Matrix Builder</h4>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSectionId("new");
                        setSectionTitleInput("");
                        setSectionIconInput("Briefcase");
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-black text-white rounded-full cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Section Group
                    </button>
                  </div>

                  <div className="space-y-6">
                    {localTimelineSections.map((sec, secIdx) => (
                      <div key={sec.id} className="bg-white dark:bg-[#080809] rounded-[24px] border border-transparent dark:border-transparent/80 p-5 sm:p-6 space-y-4 shadow-sm">
                        <div className="flex items-center justify-between border-b border-transparent dark:border-transparent pb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase text-black dark:text-white tracking-wide">{sec.title}</span>
                            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-50 dark:bg-zinc-900 border border-transparent dark:border-transparent px-2 py-0.5 rounded-full">({sec.icon})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={secIdx === 0}
                              onClick={() => handleMoveSection(secIdx, "up")}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full disabled:opacity-30 cursor-pointer"
                              title="Move Up"
                            >
                              <ChevronUp className="w-4 h-4 text-zinc-500" />
                            </button>
                            <button
                              type="button"
                              disabled={secIdx === localTimelineSections.length - 1}
                              onClick={() => handleMoveSection(secIdx, "down")}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full disabled:opacity-30 cursor-pointer"
                              title="Move Down"
                            >
                              <ChevronDown className="w-4 h-4 text-zinc-500" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingSectionId(sec.id);
                                setSectionTitleInput(sec.title);
                                setSectionIconInput(sec.icon);
                              }}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400 cursor-pointer"
                              title="Edit Section Settings"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteSection(sec.id)}
                              className="p-1 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500 rounded-full cursor-pointer"
                              title="Delete Section Group"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Cards list in this section */}
                        <div className="space-y-2">
                          {sec.items.length === 0 ? (
                            <p className="text-zinc-400 text-xs italic">No items in this group. Add some below.</p>
                          ) : (
                            sec.items.map((item) => (
                              <div key={item.id} className="bg-zinc-50/50 dark:bg-[#0D0D0E] border border-transparent dark:border-transparent rounded-xl p-4 flex justify-between items-start gap-4">
                                <div className="space-y-1">
                                  <div className="flex flex-wrap items-baseline gap-2">
                                    <span className="text-xs font-bold text-black dark:text-white">{item.title}</span>
                                    {item.subtitle && <span className="text-[10px] text-zinc-500 font-medium">@ {item.subtitle}</span>}
                                  </div>
                                  <div className="text-[9px] font-mono text-zinc-500">{item.date}</div>
                                  {item.details && item.details.length > 0 && (
                                    <ul className="list-disc pl-4 text-[11px] text-zinc-500 space-y-0.5 mt-1.5">
                                      {(Array.isArray(item.details) ? item.details : []).map((det, dIdx) => (
                                        <li key={dIdx}>{det}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingCardId(item.id);
                                      setEditingCardSectionId(sec.id);
                                      setCardTitleInput(item.title);
                                      setCardSubtitleInput(item.subtitle || "");
                                      setCardDateInput(item.date || "");
                                      setCardDetailsInput(item.details ? item.details.join("\n") : "");
                                    }}
                                    className="p-1 text-zinc-400 hover:text-zinc-600 hover:bg-gray-150 dark:hover:bg-zinc-800 rounded-full cursor-pointer"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteCard(sec.id, item.id)}
                                    className="p-1 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/10 rounded-full cursor-pointer"
                                  >
                                    <Trash className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        {/* Add Card Button for this section group */}
                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingCardId("new");
                              setEditingCardSectionId(sec.id);
                              setCardTitleInput("");
                              setCardSubtitleInput("");
                              setCardDateInput("");
                              setCardDetailsInput("");
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-900 border border-transparent dark:border-transparent text-zinc-700 dark:text-zinc-300 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-850 transition-colors"
                          >
                            <Plus className="w-3 h-3" /> Add Card to {sec.title}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== PROJECTS EDITOR TAB ==================== */}
        {activeTab === "projects" && (
          <div>
            {!editingProjectId ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                    Deployment Instances ({projects.length})
                  </h2>
                  <button
                    onClick={handleNewProject}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold bg-[#000000] text-white rounded-full cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <Plus className="w-4 h-4" /> Deploy New Node
                  </button>
                </div>
 
                <div className="bg-white rounded-[28px] overflow-hidden border border-transparent shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 text-zinc-500 border-b border-transparent">
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Node Identifier</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Ecosystem Category</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Core System</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {projects.map((proj) => (
                        <tr key={proj.id} className="hover:bg-zinc-50/50">
                          <td className="p-4 font-bold text-black dark:text-white">{proj.title}</td>
                          <td className="p-4 text-zinc-600 dark:text-zinc-400 font-mono text-[11px]">{proj.category}</td>
                          <td className="p-4">
                            {proj.featured ? (
                              <span className="px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase bg-[#4285F4]/10 text-[#4285F4] rounded-full border border-[#4285F4]/20">Yes</span>
                            ) : (
                              <span className="text-zinc-400 text-[10px]">No</span>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => handleEditProject(proj)}
                                className="p-2 bg-white hover:bg-zinc-50 border border-transparent text-zinc-600 rounded-full cursor-pointer"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(proj.id)}
                                className="p-2 bg-white hover:bg-rose-50 border border-transparent text-rose-500 rounded-full cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-[28px] border border-transparent shadow-sm">
                <h3 className="font-display font-bold text-black dark:text-white text-lg mb-6">
                  {editingProjectId === "new" ? "Provision New Node" : "Edit Node Parameters"}
                </h3>
                <form onSubmit={handleSaveProject} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Node Title</label>
                      <input
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Ecosystem Category</label>
                      <input
                        type="text"
                        required
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="Core System, Agent Module, UI Engine, etc."
                      />
                    </div>
                  </div>
 
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Technical Specification Description</label>
                    <textarea
                      required
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      rows={3}
                      className="w-full px-5 py-3 rounded-[24px] border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
 
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <CloudinaryUpload
                        id="project-image-upload"
                        label="Asset Visual Image (Cloudinary)"
                        value={projectForm.image}
                        onChange={(url) => setProjectForm({ ...projectForm, image: url })}
                        altValue={projectForm.imageAlt || ""}
                        onAltChange={(alt) => setProjectForm({ ...projectForm, imageAlt: alt })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Sandbox Case Link</label>
                      <input
                        type="url"
                        required
                        value={projectForm.liveLink}
                        onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>
 
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Node Tags (separated by comma)</label>
                    <input
                      type="text"
                      value={projectTagString}
                      onChange={(e) => setProjectTagString(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      placeholder="e.g. LLM routing, low-latency, WebSocket"
                    />
                  </div>
 
                  <div className="flex items-center gap-2.5 py-2">
                    <button
                      type="button"
                      onClick={() => setProjectForm({ ...projectForm, featured: !projectForm.featured })}
                      className="text-gray-500 hover:text-[#4285F4] focus:outline-none cursor-pointer"
                    >
                      {projectForm.featured ? (
                        <ToggleRight className="w-8 h-8 text-[#4285F4]" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-zinc-300" />
                      )}
                    </button>
                    <span className="text-xs font-bold text-zinc-500">Show as Core System on live listings</span>
                  </div>
 
                  <div className="pt-4 border-t border-transparent flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingProjectId(null)}
                      className="px-5 py-2.5 text-xs font-bold border border-transparent text-zinc-600 rounded-full cursor-pointer hover:bg-zinc-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-5 py-2.5 text-xs font-bold bg-[#000000] text-white rounded-full flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Configuration
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
 
        {/* ==================== TESTIMONIALS EDITOR TAB ==================== */}
        {activeTab === "testimonials" && (
          <div>
            {!editingTestimonialId ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
                    Telemetry Evaluations ({testimonials.length})
                  </h2>
                  <button
                    onClick={handleNewTestimonial}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold bg-[#000000] text-white rounded-full hover:opacity-90 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Evaluation Log
                  </button>
                </div>
 
                <div className="bg-white rounded-[28px] overflow-hidden border border-transparent shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 text-zinc-500 border-b border-transparent">
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Client Engineer</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Role / Organization</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Score</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {testimonials.map((test) => (
                        <tr key={test.id} className="hover:bg-zinc-50/50">
                          <td className="p-4 font-bold text-black dark:text-white">{test.name}</td>
                          <td className="p-4 text-zinc-600 dark:text-zinc-400 font-semibold">{test.role}</td>
                          <td className="p-4 text-[#FBBC04] font-bold font-mono">{test.rating} ★</td>
                          <td className="p-4 text-right">
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => handleEditTestimonial(test)}
                                className="p-2 bg-white hover:bg-zinc-50 border border-transparent text-zinc-600 rounded-full cursor-pointer"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteTestimonial(test.id)}
                                className="p-2 bg-white hover:bg-rose-50 border border-transparent text-rose-500 rounded-full cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-[28px] border border-transparent shadow-sm">
                <h3 className="font-display font-bold text-black dark:text-white text-lg mb-6">
                  {editingTestimonialId === "new" ? "Log New Evaluation" : "Modify Evaluation details"}
                </h3>
                <form onSubmit={handleSaveTestimonial} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Integrator Name</label>
                      <input
                        type="text"
                        required
                        value={testimonialForm.name}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Role &amp; Enterprise Node</label>
                      <input
                        type="text"
                        required
                        value={testimonialForm.role}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. Lead Devops, Google"
                      />
                    </div>
                  </div>
 
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <CloudinaryUpload
                        id="testimonial-avatar-upload"
                        label="Avatar Image (Cloudinary)"
                        value={testimonialForm.avatar}
                        onChange={(url) => setTestimonialForm({ ...testimonialForm, avatar: url })}
                        altValue={testimonialForm.avatarAlt || ""}
                        onAltChange={(alt) => setTestimonialForm({ ...testimonialForm, avatarAlt: alt })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Evaluation Score (1-5)</label>
                      <select
                        value={testimonialForm.rating}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      >
                        {[5, 4, 3, 2, 1].map((val) => (
                          <option key={val} value={val}>{val} Stars</option>
                        ))}
                      </select>
                    </div>
                  </div>
 
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Evaluation Content</label>
                    <textarea
                      required
                      value={testimonialForm.text}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                      rows={4}
                      className="w-full px-5 py-3 rounded-[24px] border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>
 
                  <div className="pt-4 border-t border-transparent flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingTestimonialId(null)}
                      className="px-5 py-2.5 text-xs font-bold border border-transparent text-zinc-600 rounded-full cursor-pointer hover:bg-zinc-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-5 py-2.5 text-xs font-bold bg-[#000000] text-white rounded-full flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Evaluation
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
 
        {/* ==================== BLOG EDITOR TAB ==================== */}
        {activeTab === "blog" && (
          <div>
            {!editingBlogPostId ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
                    Insight Logs ({blogPosts.length})
                  </h2>
                  <button
                    onClick={handleNewBlogPost}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold bg-[#000000] text-white rounded-full hover:opacity-90 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Insight Log
                  </button>
                </div>
 
                <div className="bg-white rounded-[28px] overflow-hidden border border-transparent shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 text-zinc-500 border-b border-transparent">
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Article Title</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Log Date</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {blogPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-zinc-50/50">
                          <td className="p-4 font-bold text-black dark:text-white">{post.title}</td>
                          <td className="p-4 text-zinc-600 dark:text-zinc-400 font-mono text-[11px]">{post.date}</td>
                          <td className="p-4 text-right">
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => handleEditBlogPost(post)}
                                className="p-2 bg-white hover:bg-zinc-50 border border-transparent text-zinc-600 rounded-full cursor-pointer"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteBlogPost(post.id)}
                                className="p-2 bg-white hover:bg-rose-50 border border-transparent text-rose-500 rounded-full cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-[28px] border border-transparent shadow-sm">
                <h3 className="font-display font-bold text-black dark:text-white text-lg mb-6">
                  {editingBlogPostId === "new" ? "Write Insight Log" : "Modify Insight Log parameters"}
                </h3>
                <form onSubmit={handleSaveBlogPost} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Article Title</label>
                      <input
                        type="text"
                        required
                        value={blogPostForm.title}
                        onChange={(e) => setBlogPostForm({ ...blogPostForm, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Publish Date</label>
                      <input
                        type="date"
                        required
                        value={blogPostForm.date}
                        onChange={(e) => setBlogPostForm({ ...blogPostForm, date: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>
 
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Brief Excerpt</label>
                    <input
                      type="text"
                      required
                      value={blogPostForm.excerpt}
                      onChange={(e) => setBlogPostForm({ ...blogPostForm, excerpt: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      placeholder="Brief introductory summary..."
                    />
                  </div>
 
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <CloudinaryUpload
                        id="blog-cover-upload"
                        label="Cover Image (Cloudinary)"
                        value={blogPostForm.coverImage}
                        onChange={(url) => setBlogPostForm({ ...blogPostForm, coverImage: url })}
                        altValue={blogPostForm.coverImageAlt || ""}
                        onAltChange={(alt) => setBlogPostForm({ ...blogPostForm, coverImageAlt: alt })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-600 dark:text-zinc-400 mb-1.5">Tags (separated by comma)</label>
                      <input
                        type="text"
                        value={blogTagString}
                        onChange={(e) => setBlogTagString(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="UX Design, Figma, Tailwind, Technology"
                      />
                    </div>
                  </div>
 
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Article Content (supports Markdown)</label>
                    <textarea
                      required
                      value={blogPostForm.content}
                      onChange={(e) => setBlogPostForm({ ...blogPostForm, content: e.target.value })}
                      rows={12}
                      className="w-full px-5 py-3 rounded-[24px] border border-transparent bg-zinc-50 text-xs font-mono text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      placeholder="## Heading&#10;Body content here...&#10;- Bullet item"
                    />
                  </div>
 
                  <div className="pt-4 border-t border-transparent flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingBlogPostId(null)}
                      className="px-5 py-2.5 text-xs font-bold border border-transparent text-zinc-600 rounded-full cursor-pointer hover:bg-zinc-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-5 py-2.5 text-xs font-bold bg-[#000000] text-white rounded-full flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Article
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ==================== FEATURED PROJECTS TAB ==================== */}
        {activeTab === "featured" && (
          <div>
            {!editingFeaturedProjectId ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
                    Featured Projects (Concepts & Vision) ({featuredProjects.length})
                  </h2>
                  <button
                    onClick={handleNewFeaturedProject}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold bg-[#000000] text-white rounded-full hover:opacity-90 cursor-pointer "
                  >
                    <Plus className="w-4 h-4" /> Add Featured Concept
                  </button>
                </div>

                <div className="bg-white rounded-[28px] overflow-hidden border border-transparent shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 text-zinc-500 border-b border-transparent">
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Preview</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Title</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Category / Industry</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Aspect Ratio Class</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {featuredProjects.map((fp) => (
                        <tr key={fp.id} className="hover:bg-zinc-50/50">
                          <td className="p-4">
                            <img src={fp.image} alt={fp.title} className="w-12 h-12 object-cover rounded-xl border border-transparent" referrerPolicy="no-referrer" />
                          </td>
                          <td className="p-4 font-bold text-black dark:text-white">{fp.title}</td>
                          <td className="p-4 text-zinc-600 dark:text-zinc-400 font-mono text-[11px]">{fp.category}</td>
                          <td className="p-4 text-zinc-600 dark:text-zinc-400 font-mono text-[11px]">{fp.aspectClass || "aspect-square"}</td>
                          <td className="p-4 text-right">
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => handleEditFeaturedProject(fp)}
                                className="p-2 bg-white hover:bg-zinc-50 border border-transparent text-zinc-600 rounded-full cursor-pointer"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteFeaturedProject(fp.id)}
                                className="p-2 bg-white hover:bg-rose-50 border border-transparent text-rose-500 rounded-full cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-[28px] border border-transparent shadow-sm ">
                <h3 className="font-display font-bold text-black dark:text-white text-lg mb-6">
                  {editingFeaturedProjectId === "new" ? "Add Featured Concept" : "Modify Featured Concept"}
                </h3>
                <form onSubmit={handleSaveFeaturedProject} className="space-y-8">
                  
                  {/* SECTION 1: Main Platform Listing Info */}
                  <div className="bg-[#F9F9F6] dark:bg-[#0E0E0F] border border-transparent/60 dark:border-transparent rounded-[28px] p-6 space-y-4">
                    <div className="border-b border-transparent dark:border-transparent/60 pb-3">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#4285F4] dark:text-[#8ab4f8]">
                        Section A: Platform Showcase Card Details
                      </h4>
                      <p className="text-[11px] text-zinc-500 mt-0.5">Configure the visual appearance of the project card on the homepage grid.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1.5">Project Title</label>
                        <input
                          type="text"
                          required
                          value={featuredForm.title}
                          onChange={(e) => setFeaturedForm({ ...featuredForm, title: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                          placeholder="e.g. Upshop"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Category / Industry Tags</label>
                        <input
                          type="text"
                          required
                          value={featuredForm.category}
                          onChange={(e) => setFeaturedForm({ ...featuredForm, category: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                          placeholder="e.g. SaaS, Food, B2B"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Custom Pills / Tags (separated by commas)</label>
                      <input
                        type="text"
                        value={(featuredForm.tags || []).join(", ")}
                        onChange={(e) => {
                          const splitTags = e.target.value.split(",").map(tag => tag.trim()).filter(Boolean);
                          setFeaturedForm({ ...featuredForm, tags: splitTags });
                        }}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. Figma File, Webflow, Published"
                      />
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {(featuredForm.tags || []).map((tag, idx) => (
                          <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50/70 text-blue-600 border border-blue-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <CloudinaryUpload
                          id="featured-cover-upload"
                          label="Cover Image (Cloudinary)"
                          value={featuredForm.image}
                          onChange={(url) => setFeaturedForm({ ...featuredForm, image: url })}
                          altValue={featuredForm.imageAlt || ""}
                          onAltChange={(alt) => setFeaturedForm({ ...featuredForm, imageAlt: alt })}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Visual Aspect Ratio Class</label>
                        <select
                          value={featuredForm.aspectClass}
                          onChange={(e) => setFeaturedForm({ ...featuredForm, aspectClass: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        >
                          <option value="aspect-square">Square (1:1)</option>
                          <option value="aspect-[1.15]">Slight Landscape (1.15:1)</option>
                          <option value="aspect-[1.35]">Wide Landscape (1.35:1)</option>
                          <option value="aspect-[1.5]">Standard Landscape (3:2)</option>
                          <option value="aspect-[0.8]">Portrait (4:5)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: Case Study Hero & Overview */}
                  <div className="bg-[#F9F9F6] dark:bg-[#0E0E0F] border border-transparent/60 dark:border-transparent rounded-[28px] p-6 space-y-4">
                    <div className="border-b border-transparent dark:border-transparent/60 pb-3">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#34A853] dark:text-[#34A853]">
                        Section B: Case Study Header & Specifications
                      </h4>
                      <p className="text-[11px] text-zinc-500 mt-0.5">Define core deliverables, timeline, role, and direct project impact.</p>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Case Study Hero Tagline</label>
                      <input
                        type="text"
                        value={featuredForm.tagline}
                        onChange={(e) => setFeaturedForm({ ...featuredForm, tagline: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. Designing high-fidelity, user-centered solutions for complex digital experiences."
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Project Role</label>
                        <input
                          type="text"
                          value={featuredForm.role}
                          onChange={(e) => setFeaturedForm({ ...featuredForm, role: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                          placeholder="e.g. Lead UI/UX Designer & Researcher"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Timeline duration</label>
                        <input
                          type="text"
                          value={featuredForm.timeline}
                          onChange={(e) => setFeaturedForm({ ...featuredForm, timeline: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                          placeholder="e.g. 4 Months (2026)"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Stack & Tools (comma-separated)</label>
                        <input
                          type="text"
                          value={(featuredForm.stack || []).join(", ")}
                          onChange={(e) => setFeaturedForm({ ...featuredForm, stack: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                          placeholder="Figma, React, Tailwind CSS"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Overall Metric or Business Impact Statement</label>
                      <textarea
                        value={featuredForm.impact}
                        onChange={(e) => setFeaturedForm({ ...featuredForm, impact: e.target.value })}
                        rows={2}
                        className="w-full px-5 py-3 rounded-[24px] border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. Significantly improved core user metrics, workflow speed, and design systems consistency."
                      />
                    </div>
                  </div>

                  {/* SECTION 3: Strategic Problem Space */}
                  <div className="bg-[#F9F9F6] dark:bg-[#0E0E0F] border border-transparent/60 dark:border-transparent rounded-[28px] p-6 space-y-4">
                    <div className="border-b border-transparent dark:border-transparent/60 pb-3">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#EA4335] dark:text-[#EA4335]">
                        Section C: Problem Space (Challenge vs Solution)
                      </h4>
                      <p className="text-[11px] text-zinc-500 mt-0.5">Detail the core friction of the challenge and your creative, visual solution.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">The Challenge (The Friction)</label>
                        <textarea
                          value={featuredForm.challenge}
                          onChange={(e) => setFeaturedForm({ ...featuredForm, challenge: e.target.value })}
                          rows={4}
                          className="w-full px-5 py-3 rounded-[24px] border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                          placeholder="State the core user pain points and complexity..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">The Solution (The Platform Resolution)</label>
                        <textarea
                          value={featuredForm.solution}
                          onChange={(e) => setFeaturedForm({ ...featuredForm, solution: e.target.value })}
                          rows={4}
                          className="w-full px-5 py-3 rounded-[24px] border border-transparent bg-white text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                          placeholder="Explain how your design automated or resolved these issues..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4: Research Insights */}
                  <div className="bg-[#F9F9F6] dark:bg-[#0E0E0F] border border-transparent/60 dark:border-transparent rounded-[28px] p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-transparent dark:border-transparent/60 pb-3">
                      <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                          Section D: Research Insights Cards
                        </h4>
                        <p className="text-[11px] text-zinc-500 mt-0.5">Add, edit, or remove research insight cards derived from qualitative/quantitative research.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const arr = [...(featuredForm.researchInsights || [])];
                          arr.push("");
                          setFeaturedForm({ ...featuredForm, researchInsights: arr });
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 text-white text-[11px] font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Insight Card
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(featuredForm.researchInsights || []).map((insight, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-white dark:bg-[#121213] p-3 rounded-2xl border border-transparent">
                          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </span>
                          <input
                            type="text"
                            value={insight}
                            onChange={(e) => {
                              const arr = [...(featuredForm.researchInsights || [])];
                              arr[idx] = e.target.value;
                              setFeaturedForm({ ...featuredForm, researchInsights: arr });
                            }}
                            className="flex-1 px-4 py-2 rounded-full border border-transparent bg-zinc-50 dark:bg-zinc-900 text-xs text-black dark:text-white focus:outline-none"
                            placeholder={`e.g. Research insight #${idx + 1}...`}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const arr = (featuredForm.researchInsights || []).filter((_, i) => i !== idx);
                              setFeaturedForm({ ...featuredForm, researchInsights: arr });
                            }}
                            className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-full transition-colors cursor-pointer"
                            title="Remove Insight Card"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {(!featuredForm.researchInsights || featuredForm.researchInsights.length === 0) && (
                        <p className="text-xs text-zinc-400 italic py-2">No research insights cards added yet. Click &quot;Add Insight Card&quot; above.</p>
                      )}
                    </div>
                  </div>

                  {/* SECTION 5: Ideal User Persona */}
                  <div className="bg-[#F9F9F6] dark:bg-[#0E0E0F] border border-transparent/60 dark:border-transparent rounded-[28px] p-6 space-y-4">
                    <div className="border-b border-transparent dark:border-transparent/60 pb-3">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                        Section E: User Persona Details
                      </h4>
                      <p className="text-[11px] text-zinc-500 mt-0.5">Profile the target user cohort, their quotes, and high-priority core daily needs.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Persona Name</label>
                        <input
                          type="text"
                          value={featuredForm.userPersonaName || ""}
                          onChange={(e) => setFeaturedForm({ ...featuredForm, userPersonaName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white dark:bg-[#121213] text-xs text-black dark:text-white focus:outline-none transition-colors"
                          placeholder="e.g. Taylor Reed"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Persona Role / Archetype</label>
                        <input
                          type="text"
                          value={featuredForm.userPersonaRole || ""}
                          onChange={(e) => setFeaturedForm({ ...featuredForm, userPersonaRole: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white dark:bg-[#121213] text-xs text-black dark:text-white focus:outline-none transition-colors"
                          placeholder="e.g. Operations Director"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">User Quote</label>
                      <input
                        type="text"
                        value={featuredForm.userPersonaQuote || ""}
                        onChange={(e) => setFeaturedForm({ ...featuredForm, userPersonaQuote: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white dark:bg-[#121213] text-xs text-black dark:text-white focus:outline-none transition-colors"
                        placeholder="e.g. I need simple digital dashboards that help me make key decisions without unnecessary clicks."
                      />
                    </div>

                    {/* Dynamic Core Daily Needs List */}
                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500">Core Daily Needs Items</label>
                        <button
                          type="button"
                          onClick={() => {
                            const arr = [...(featuredForm.userPersonaNeeds || [])];
                            arr.push("");
                            setFeaturedForm({ ...featuredForm, userPersonaNeeds: arr });
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-600 text-white text-[11px] font-semibold hover:bg-purple-700 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Core Need
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(featuredForm.userPersonaNeeds || []).map((need, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-white dark:bg-[#121213] p-2.5 rounded-2xl border border-transparent">
                            <CheckCircle className="w-4 h-4 text-purple-500 shrink-0" />
                            <input
                              type="text"
                              value={need}
                              onChange={(e) => {
                                const arr = [...(featuredForm.userPersonaNeeds || [])];
                                arr[idx] = e.target.value;
                                setFeaturedForm({ ...featuredForm, userPersonaNeeds: arr });
                              }}
                              className="flex-1 px-3 py-1.5 rounded-full border border-transparent bg-zinc-50 dark:bg-zinc-900 text-xs text-black dark:text-white focus:outline-none"
                              placeholder={`Need item #${idx + 1}...`}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const arr = (featuredForm.userPersonaNeeds || []).filter((_, i) => i !== idx);
                                setFeaturedForm({ ...featuredForm, userPersonaNeeds: arr });
                              }}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-full transition-colors cursor-pointer"
                              title="Remove Need"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        {(!featuredForm.userPersonaNeeds || featuredForm.userPersonaNeeds.length === 0) && (
                          <p className="text-xs text-zinc-400 italic py-1">No persona needs added yet. Click &quot;Add Core Need&quot; above.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 6: Design System Details */}
                  <div className="bg-[#F9F9F6] dark:bg-[#0E0E0F] border border-transparent/60 dark:border-transparent rounded-[28px] p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-transparent dark:border-transparent/60 pb-3">
                      <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400">
                          Section F: Visual Language & Brand Colors
                        </h4>
                        <p className="text-[11px] text-zinc-500 mt-0.5">Specify typography pairing, layout spacing, and dynamic color swatch cards.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const arr = [...(featuredForm.designSystemColors || [])];
                          arr.push({ name: "Brand Accent", hex: "#000000" });
                          setFeaturedForm({ ...featuredForm, designSystemColors: arr });
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600 text-white text-[11px] font-semibold hover:bg-rose-700 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Color Swatch Card
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Typography Language Pairing</label>
                        <input
                          type="text"
                          value={featuredForm.designSystemTypography || ""}
                          onChange={(e) => setFeaturedForm({ ...featuredForm, designSystemTypography: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white dark:bg-[#121213] text-xs text-black dark:text-white focus:outline-none transition-colors"
                          placeholder="e.g. Space Grotesk paired with Inter for classic tech authority."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Layout Spacing Strategy</label>
                        <input
                          type="text"
                          value={featuredForm.designSystemSpacing || ""}
                          onChange={(e) => setFeaturedForm({ ...featuredForm, designSystemSpacing: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent bg-white dark:bg-[#121213] text-xs text-black dark:text-white focus:outline-none transition-colors"
                          placeholder="e.g. Dense, modular grids styled with consistent spacing."
                        />
                      </div>
                    </div>

                    {/* Dynamic Color Cards Grid */}
                    <div className="space-y-3 pt-2">
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500">Brand Color Swatches Cards</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {(featuredForm.designSystemColors || []).map((colorObj, idx) => {
                          const hexVal = colorObj.hex ? (colorObj.hex.startsWith('#') ? colorObj.hex : `#${colorObj.hex}`) : '#cccccc';
                          return (
                            <div key={idx} className="bg-white dark:bg-[#121213] p-3.5 rounded-2xl border border-transparent space-y-2 relative">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-lg shadow-inner border border-black/10 dark:border-white/10" style={{ backgroundColor: hexVal }} />
                                  <span className="text-[10px] uppercase font-bold text-zinc-400">Swatch #{idx + 1}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = (featuredForm.designSystemColors || []).filter((_, i) => i !== idx);
                                    setFeaturedForm({ ...featuredForm, designSystemColors: arr });
                                  }}
                                  className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-full transition-colors cursor-pointer"
                                  title="Remove Color Card"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <input
                                type="text"
                                value={colorObj.name}
                                onChange={(e) => {
                                  const arr = [...(featuredForm.designSystemColors || [])];
                                  arr[idx] = { ...arr[idx], name: e.target.value };
                                  setFeaturedForm({ ...featuredForm, designSystemColors: arr });
                                }}
                                className="w-full px-3 py-1.5 rounded-full border border-transparent bg-zinc-50 dark:bg-zinc-900 text-xs text-black dark:text-white focus:outline-none"
                                placeholder="Color Name (e.g. Onyx Black)"
                              />
                              <div className="flex gap-2 items-center">
                                <input
                                  type="color"
                                  value={hexVal.length === 7 ? hexVal : '#000000'}
                                  onChange={(e) => {
                                    const arr = [...(featuredForm.designSystemColors || [])];
                                    arr[idx] = { ...arr[idx], hex: e.target.value };
                                    setFeaturedForm({ ...featuredForm, designSystemColors: arr });
                                  }}
                                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                                />
                                <input
                                  type="text"
                                  value={colorObj.hex}
                                  onChange={(e) => {
                                    const arr = [...(featuredForm.designSystemColors || [])];
                                    arr[idx] = { ...arr[idx], hex: e.target.value };
                                    setFeaturedForm({ ...featuredForm, designSystemColors: arr });
                                  }}
                                  className="flex-1 px-3 py-1.5 rounded-full border border-transparent bg-zinc-50 dark:bg-zinc-900 font-mono text-xs text-black dark:text-white focus:outline-none"
                                  placeholder="#HEX Code"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {(!featuredForm.designSystemColors || featuredForm.designSystemColors.length === 0) && (
                        <p className="text-xs text-zinc-400 italic py-1">No color swatches added yet. Click &quot;Add Color Swatch Card&quot; above.</p>
                      )}
                    </div>
                  </div>

                  {/* SECTION 7: Core Platform Features */}
                  <div className="bg-[#F9F9F6] dark:bg-[#0E0E0F] border border-transparent/60 dark:border-transparent rounded-[28px] p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-transparent dark:border-transparent/60 pb-3">
                      <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                          Section G: Dynamic Platform Features
                        </h4>
                        <p className="text-[11px] text-zinc-500 mt-0.5">Create, edit, or remove interactive capability cards with relevant Lucide icons.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const arr = [...(featuredForm.features || [])];
                          arr.push({ title: "", description: "", metric: "", icon: "Zap" });
                          setFeaturedForm({ ...featuredForm, features: arr });
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-600 text-white text-[11px] font-semibold hover:bg-teal-700 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Feature Card
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(featuredForm.features || []).map((feat, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#121213] p-4 rounded-2xl border border-transparent space-y-3 relative">
                          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                            <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase">
                              Feature Card #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const arr = (featuredForm.features || []).filter((_, i) => i !== idx);
                                setFeaturedForm({ ...featuredForm, features: arr });
                              }}
                              className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-full transition-colors cursor-pointer"
                              title="Remove Feature Card"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Icon Selector */}
                          <div>
                            <label className="block text-[9px] uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                              Card Icon (Select Relevant Icon)
                            </label>
                            <select
                              value={feat.icon || "Zap"}
                              onChange={(e) => {
                                const arr = [...(featuredForm.features || [])];
                                arr[idx] = { ...arr[idx], icon: e.target.value };
                                setFeaturedForm({ ...featuredForm, features: arr });
                              }}
                              className="w-full px-3 py-2 rounded-full border border-transparent bg-zinc-50 dark:bg-zinc-900 text-xs text-black dark:text-white focus:outline-none"
                            >
                              <option value="Zap">⚡ Zap (Lightning / Speed)</option>
                              <option value="Cpu">💻 Cpu (Core System / AI)</option>
                              <option value="Layers">🥞 Layers (Design System / Architecture)</option>
                              <option value="Sparkles">✨ Sparkles (AI / Magic / Polish)</option>
                              <option value="Shield">🛡️ Shield (Security / Authentication)</option>
                              <option value="Globe">🌐 Globe (Web / Networking / Edge)</option>
                              <option value="Terminal">🖥️ Terminal (Dev / Command Line)</option>
                              <option value="Sliders">🎛️ Sliders (Controls / Customization)</option>
                              <option value="Layout">📐 Layout (UI Framework / Grid)</option>
                              <option value="Smartphone">📱 Smartphone (Mobile / Responsive)</option>
                              <option value="Database">🗄️ Database (Data Store / Storage)</option>
                              <option value="Code">💻 Code (Engineering / TypeScript)</option>
                              <option value="Workflow">🔄 Workflow (Automation / Pipelines)</option>
                              <option value="Activity">📊 Activity (Analytics / Monitoring)</option>
                              <option value="Eye">👁️ Eye (Visual Design / Preview)</option>
                              <option value="Settings">⚙️ Settings (Configuration / Admin)</option>
                              <option value="Command">⌘ Command (Keyboard / Power Tools)</option>
                              <option value="Share2">🔗 Share (Collaboration / Export)</option>
                              <option value="CheckCircle">✅ CheckCircle (Quality / Testing)</option>
                              <option value="TrendingUp">📈 TrendingUp (Performance / Growth)</option>
                              <option value="PenTool">✒️ PenTool (UI/UX Design / Vectors)</option>
                              <option value="Server">🖥️ Server (Backend / Cloud Run)</option>
                              <option value="Box">📦 Box (Modular / Container)</option>
                              <option value="Lock">🔒 Lock (Privacy / Auth)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase tracking-wider font-semibold text-zinc-400 mb-1">Feature Title</label>
                            <input
                              type="text"
                              value={feat.title}
                              onChange={(e) => {
                                const arr = [...(featuredForm.features || [])];
                                arr[idx] = { ...arr[idx], title: e.target.value };
                                setFeaturedForm({ ...featuredForm, features: arr });
                              }}
                              className="w-full px-3 py-2 rounded-full border border-transparent bg-zinc-50 dark:bg-zinc-900 text-xs text-black dark:text-white focus:outline-none"
                              placeholder="e.g. Intelligent Dashboard Hub"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase tracking-wider font-semibold text-zinc-400 mb-1">Feature Description</label>
                            <textarea
                              value={feat.description}
                              onChange={(e) => {
                                const arr = [...(featuredForm.features || [])];
                                arr[idx] = { ...arr[idx], description: e.target.value };
                                setFeaturedForm({ ...featuredForm, features: arr });
                              }}
                              rows={2}
                              className="w-full px-4 py-2 rounded-2xl border border-transparent bg-zinc-50 dark:bg-zinc-900 text-xs text-black dark:text-white focus:outline-none"
                              placeholder="Describe feature capability..."
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase tracking-wider font-semibold text-zinc-400 mb-1">Feature Metric / Badge (Optional)</label>
                            <input
                              type="text"
                              value={feat.metric || ""}
                              onChange={(e) => {
                                const arr = [...(featuredForm.features || [])];
                                arr[idx] = { ...arr[idx], metric: e.target.value };
                                setFeaturedForm({ ...featuredForm, features: arr });
                              }}
                              className="w-full px-3 py-2 rounded-full border border-transparent bg-zinc-50 dark:bg-zinc-900 text-xs text-black dark:text-white focus:outline-none"
                              placeholder="e.g. 100% pixel-perfect"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {(!featuredForm.features || featuredForm.features.length === 0) && (
                      <p className="text-xs text-zinc-400 italic py-1">No feature cards added yet. Click &quot;Add Feature Card&quot; above.</p>
                    )}
                  </div>

                  {/* SECTION 8: Strategic Takeaways */}
                  <div className="bg-[#F9F9F6] dark:bg-[#0E0E0F] border border-transparent/60 dark:border-transparent rounded-[28px] p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-transparent dark:border-transparent/60 pb-3">
                      <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                          Section H: Key Takeaways & Lessons
                        </h4>
                        <p className="text-[11px] text-zinc-500 mt-0.5">Write up strategic takeaways and lessons summarizing design intelligence.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const arr = [...(featuredForm.takeaways || [])];
                          arr.push("");
                          setFeaturedForm({ ...featuredForm, takeaways: arr });
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600 text-white text-[11px] font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Takeaway Card
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(featuredForm.takeaways || []).map((takeaway, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#121213] p-3.5 rounded-2xl border border-transparent space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                              Lesson 0{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const arr = (featuredForm.takeaways || []).filter((_, i) => i !== idx);
                                setFeaturedForm({ ...featuredForm, takeaways: arr });
                              }}
                              className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-full transition-colors cursor-pointer"
                              title="Remove Takeaway"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <textarea
                            value={takeaway}
                            onChange={(e) => {
                              const arr = [...(featuredForm.takeaways || [])];
                              arr[idx] = e.target.value;
                              setFeaturedForm({ ...featuredForm, takeaways: arr });
                            }}
                            rows={2}
                            className="w-full px-4 py-2.5 rounded-2xl border border-transparent bg-zinc-50 dark:bg-zinc-900 text-xs text-black dark:text-white focus:outline-none transition-colors"
                            placeholder="e.g. User agency is paramount. Designing explicit approvals is key..."
                          />
                        </div>
                      ))}
                      {(!featuredForm.takeaways || featuredForm.takeaways.length === 0) && (
                        <p className="text-xs text-zinc-400 italic py-1">No takeaway cards added yet. Click &quot;Add Takeaway Card&quot; above.</p>
                      )}
                    </div>
                  </div>

                  {/* SECTION 9: Custom Case Study CTA Buttons */}
                  <div className="bg-[#F9F9F6] dark:bg-[#0E0E0F] border border-transparent/60 dark:border-transparent rounded-[28px] p-6 space-y-4">
                    <div className="border-b border-transparent dark:border-transparent/60 pb-3">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                        Section I: Custom Case Study CTA Buttons
                      </h4>
                      <p className="text-[11px] text-zinc-500 mt-0.5">Configure up to 2 persistent quick actions (View Live & View Figma) below the case study image.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* View Live Button Config */}
                      <div className="bg-white dark:bg-[#121213] border border-transparent dark:border-transparent p-5 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-black dark:text-white uppercase">Button 1: View Live</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={featuredForm.viewLiveEnabled || false}
                              onChange={(e) => setFeaturedForm({ ...featuredForm, viewLiveEnabled: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-zinc-200 dark:bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-500"></div>
                            <span className="ml-2 text-[10px] font-semibold text-zinc-600 dark:text-zinc-400">Enabled</span>
                          </label>
                        </div>

                        {featuredForm.viewLiveEnabled && (
                          <div className="space-y-3 ">
                            <div>
                              <label className="block text-[9px] uppercase tracking-wider font-semibold text-zinc-500 mb-1">Button Text</label>
                              <input
                                type="text"
                                value={featuredForm.viewLiveText || ""}
                                onChange={(e) => setFeaturedForm({ ...featuredForm, viewLiveText: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-full border border-transparent bg-zinc-50 text-xs focus:outline-none"
                                placeholder="View Live"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] uppercase tracking-wider font-semibold text-zinc-500 mb-1">Action Type</label>
                              <select
                                value={featuredForm.viewLiveActionType || "url"}
                                onChange={(e) => setFeaturedForm({ ...featuredForm, viewLiveActionType: e.target.value as any })}
                                className="w-full px-3 py-1.5 rounded-full border border-transparent bg-zinc-50 text-xs focus:outline-none"
                              >
                                <option value="url">Redirect / Navigate to URL</option>
                                <option value="modal">Open Booking Modal</option>
                              </select>
                            </div>
                            {featuredForm.viewLiveActionType !== "modal" && (
                              <div>
                                <label className="block text-[9px] uppercase tracking-wider font-semibold text-zinc-500 mb-1">Target URL or Page Route</label>
                                <input
                                  type="text"
                                  value={featuredForm.viewLiveUrl || ""}
                                  onChange={(e) => setFeaturedForm({ ...featuredForm, viewLiveUrl: e.target.value })}
                                  className="w-full px-3 py-1.5 rounded-full border border-transparent bg-zinc-50 text-xs focus:outline-none"
                                  placeholder="e.g. https://pagea.uk/ui-ux-rahul or contact"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* View Figma Button Config */}
                      <div className="bg-white dark:bg-[#121213] border border-transparent dark:border-transparent p-5 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-black dark:text-white uppercase">Button 2: View Figma</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={featuredForm.viewFigmaEnabled || false}
                              onChange={(e) => setFeaturedForm({ ...featuredForm, viewFigmaEnabled: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-zinc-200 dark:bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-500"></div>
                            <span className="ml-2 text-[10px] font-semibold text-zinc-600 dark:text-zinc-400">Enabled</span>
                          </label>
                        </div>

                        {featuredForm.viewFigmaEnabled && (
                          <div className="space-y-3 ">
                            <div>
                              <label className="block text-[9px] uppercase tracking-wider font-semibold text-zinc-500 mb-1">Button Text</label>
                              <input
                                type="text"
                                value={featuredForm.viewFigmaText || ""}
                                onChange={(e) => setFeaturedForm({ ...featuredForm, viewFigmaText: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-full border border-transparent bg-zinc-50 text-xs focus:outline-none"
                                placeholder="View Figma"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] uppercase tracking-wider font-semibold text-zinc-500 mb-1">Action Type</label>
                              <select
                                value={featuredForm.viewFigmaActionType || "url"}
                                onChange={(e) => setFeaturedForm({ ...featuredForm, viewFigmaActionType: e.target.value as any })}
                                className="w-full px-3 py-1.5 rounded-full border border-transparent bg-zinc-50 text-xs focus:outline-none"
                              >
                                <option value="url">Redirect / Navigate to URL</option>
                                <option value="modal">Open Booking Modal</option>
                              </select>
                            </div>
                            {featuredForm.viewFigmaActionType !== "modal" && (
                              <div>
                                <label className="block text-[9px] uppercase tracking-wider font-semibold text-zinc-500 mb-1">Target URL or Page Route</label>
                                <input
                                  type="text"
                                  value={featuredForm.viewFigmaUrl || ""}
                                  onChange={(e) => setFeaturedForm({ ...featuredForm, viewFigmaUrl: e.target.value })}
                                  className="w-full px-3 py-1.5 rounded-full border border-transparent bg-zinc-50 text-xs focus:outline-none"
                                  placeholder="e.g. https://figma.com/... or contact"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 10: Interactive Playground & Design Canvas Controls (JUMP 1) */}
                  <div className="bg-[#F9F9F6] dark:bg-[#0E0E0F] border border-transparent/60 dark:border-transparent rounded-[28px] p-6 space-y-6">
                    <div className="border-b border-transparent dark:border-transparent/60 pb-3">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        Section J: Interactive Canvas & Playground Controls (JUMP 1)
                      </h4>
                      <p className="text-[11px] text-zinc-500 mt-0.5">Toggle live prototype stages, before/after comparison sliders, and design token inspection tools for this case study. Any section can be shown or hidden.</p>
                    </div>

                    <div className="space-y-6">
                      {/* 1. Device Frame Canvas Settings */}
                      <div className="bg-white dark:bg-[#121213] p-5 rounded-2xl border border-transparent space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-xs font-bold text-black dark:text-white uppercase">1. Interactive Device Frame Canvas</h5>
                            <p className="text-[10px] text-zinc-500">Live desktop/tablet/mobile viewport preview switcher.</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={featuredForm.showInteractiveDeviceFrame !== false}
                              onChange={(e) => setFeaturedForm({ ...featuredForm, showInteractiveDeviceFrame: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-zinc-200 dark:bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                            <span className="ml-2 text-[10px] font-semibold text-zinc-600 dark:text-zinc-400">Visible</span>
                          </label>
                        </div>

                        {featuredForm.showInteractiveDeviceFrame !== false && (
                          <div className="grid md:grid-cols-2 gap-4 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                            <div>
                              <label className="block text-[9px] uppercase tracking-wider font-semibold text-zinc-500 mb-1">Live Iframe / App URL (Optional)</label>
                              <input
                                type="text"
                                value={featuredForm.interactiveIframeUrl || ""}
                                onChange={(e) => setFeaturedForm({ ...featuredForm, interactiveIframeUrl: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-full border border-transparent bg-zinc-50 dark:bg-zinc-900 text-xs text-black dark:text-white focus:outline-none"
                                placeholder="https://example.com or embed URL"
                              />
                            </div>
                            <div>
                              <CloudinaryUpload
                                id="device-desktop-upload"
                                label="Desktop View Image"
                                value={featuredForm.deviceDesktopImage || ""}
                                onChange={(url) => setFeaturedForm({ ...featuredForm, deviceDesktopImage: url })}
                              />
                            </div>
                            <div>
                              <CloudinaryUpload
                                id="device-tablet-upload"
                                label="Tablet View Image"
                                value={featuredForm.deviceTabletImage || ""}
                                onChange={(url) => setFeaturedForm({ ...featuredForm, deviceTabletImage: url })}
                              />
                            </div>
                            <div>
                              <CloudinaryUpload
                                id="device-mobile-upload"
                                label="Mobile View Image"
                                value={featuredForm.deviceMobileImage || ""}
                                onChange={(url) => setFeaturedForm({ ...featuredForm, deviceMobileImage: url })}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 2. Before / After Slider Settings */}
                      <div className="bg-white dark:bg-[#121213] p-5 rounded-2xl border border-transparent space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-xs font-bold text-black dark:text-white uppercase">2. Before / After UX Comparison Slider</h5>
                            <p className="text-[10px] text-zinc-500">Interactive slider comparing legacy design vs. new redesign.</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={featuredForm.showBeforeAfterSlider !== false}
                              onChange={(e) => setFeaturedForm({ ...featuredForm, showBeforeAfterSlider: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-zinc-200 dark:bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                            <span className="ml-2 text-[10px] font-semibold text-zinc-600 dark:text-zinc-400">Visible</span>
                          </label>
                        </div>

                        {featuredForm.showBeforeAfterSlider !== false && (
                          <div className="grid md:grid-cols-2 gap-4 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                            <div className="space-y-3">
                              <h6 className="text-[10px] font-bold text-rose-500 uppercase">Legacy / Before State</h6>
                              <CloudinaryUpload
                                id="before-image-upload"
                                label="Before Image"
                                value={featuredForm.beforeImage || ""}
                                onChange={(url) => setFeaturedForm({ ...featuredForm, beforeImage: url })}
                              />
                              <div>
                                <label className="block text-[9px] uppercase tracking-wider font-semibold text-zinc-500 mb-1">Before Title</label>
                                <input
                                  type="text"
                                  value={featuredForm.beforeTitle || ""}
                                  onChange={(e) => setFeaturedForm({ ...featuredForm, beforeTitle: e.target.value })}
                                  className="w-full px-3 py-1.5 rounded-full border border-transparent bg-zinc-50 dark:bg-zinc-900 text-xs text-black dark:text-white focus:outline-none"
                                  placeholder="e.g. Legacy Dashboard v1"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] uppercase tracking-wider font-semibold text-zinc-500 mb-1">Before Description</label>
                                <textarea
                                  value={featuredForm.beforeDescription || ""}
                                  onChange={(e) => setFeaturedForm({ ...featuredForm, beforeDescription: e.target.value })}
                                  rows={2}
                                  className="w-full px-3 py-1.5 rounded-2xl border border-transparent bg-zinc-50 dark:bg-zinc-900 text-xs text-black dark:text-white focus:outline-none"
                                  placeholder="High cognitive load and cluttered navigation."
                                />
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h6 className="text-[10px] font-bold text-emerald-500 uppercase">Redesign / After State</h6>
                              <CloudinaryUpload
                                id="after-image-upload"
                                label="After Image (Defaults to Main Cover)"
                                value={featuredForm.afterImage || ""}
                                onChange={(url) => setFeaturedForm({ ...featuredForm, afterImage: url })}
                              />
                              <div>
                                <label className="block text-[9px] uppercase tracking-wider font-semibold text-zinc-500 mb-1">After Title</label>
                                <input
                                  type="text"
                                  value={featuredForm.afterTitle || ""}
                                  onChange={(e) => setFeaturedForm({ ...featuredForm, afterTitle: e.target.value })}
                                  className="w-full px-3 py-1.5 rounded-full border border-transparent bg-zinc-50 dark:bg-zinc-900 text-xs text-black dark:text-white focus:outline-none"
                                  placeholder="e.g. Modernized Platform v2"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] uppercase tracking-wider font-semibold text-zinc-500 mb-1">After Description</label>
                                <textarea
                                  value={featuredForm.afterDescription || ""}
                                  onChange={(e) => setFeaturedForm({ ...featuredForm, afterDescription: e.target.value })}
                                  rows={2}
                                  className="w-full px-3 py-1.5 rounded-2xl border border-transparent bg-zinc-50 dark:bg-zinc-900 text-xs text-black dark:text-white focus:outline-none"
                                  placeholder="Streamlined workflows and responsive grid layouts."
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 3. Live Design Token Inspector Settings */}
                      <div className="bg-white dark:bg-[#121213] p-5 rounded-2xl border border-transparent space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-xs font-bold text-black dark:text-white uppercase">3. Live Design Token Inspector</h5>
                            <p className="text-[10px] text-zinc-500">Interactive viewer for typography, color swatches, and spacing scales.</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={featuredForm.showDesignTokenInspector !== false}
                              onChange={(e) => setFeaturedForm({ ...featuredForm, showDesignTokenInspector: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-zinc-200 dark:bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                            <span className="ml-2 text-[10px] font-semibold text-zinc-600 dark:text-zinc-400">Visible</span>
                          </label>
                        </div>

                        {featuredForm.showDesignTokenInspector !== false && (
                          <div className="grid md:grid-cols-2 gap-4 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                            <div>
                              <label className="block text-[9px] uppercase tracking-wider font-semibold text-zinc-500 mb-1">Font Family Spec</label>
                              <input
                                type="text"
                                value={featuredForm.tokenTypographyFont || ""}
                                onChange={(e) => setFeaturedForm({ ...featuredForm, tokenTypographyFont: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-full border border-transparent bg-zinc-50 dark:bg-zinc-900 text-xs text-black dark:text-white focus:outline-none"
                                placeholder="e.g. Plus Jakarta Sans + Playfair Display"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] uppercase tracking-wider font-semibold text-zinc-500 mb-1">Typography Scale Spec</label>
                              <input
                                type="text"
                                value={featuredForm.tokenTypographyScale || ""}
                                onChange={(e) => setFeaturedForm({ ...featuredForm, tokenTypographyScale: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-full border border-transparent bg-zinc-50 dark:bg-zinc-900 text-xs text-black dark:text-white focus:outline-none"
                                placeholder="e.g. Major Third (1.250 ratio scale)"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] uppercase tracking-wider font-semibold text-zinc-500 mb-1">Spacing Scale Spec</label>
                              <input
                                type="text"
                                value={featuredForm.tokenSpacingScale || ""}
                                onChange={(e) => setFeaturedForm({ ...featuredForm, tokenSpacingScale: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-full border border-transparent bg-zinc-50 dark:bg-zinc-900 text-xs text-black dark:text-white focus:outline-none"
                                placeholder="e.g. 8-Point Rhythmic Layout Grid"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* Form Actions footer */}
                  <div className="pt-6 border-t border-transparent flex justify-end gap-3 sticky bottom-0 bg-white py-4 z-10">
                    <button
                      type="button"
                      onClick={() => setEditingFeaturedProjectId(null)}
                      className="px-5 py-2.5 text-xs font-bold border border-transparent text-zinc-600 rounded-full cursor-pointer hover:bg-zinc-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-5 py-2.5 text-xs font-bold bg-[#000000] text-white rounded-full flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Concept & Case Study
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ==================== RECENT WORKS TAB ==================== */}
        {activeTab === "recent-work" && (
          <div>
            {!editingRecentWorkId ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
                    Recent Works (Direct Redirect Cards) ({recentWorks.length})
                  </h2>
                  <button
                    onClick={handleNewRecentWork}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold bg-[#000000] text-white rounded-full hover:opacity-90 cursor-pointer "
                  >
                    <Plus className="w-4 h-4" /> Add Recent Work
                  </button>
                </div>

                <div className="bg-white rounded-[28px] overflow-hidden border border-transparent shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 text-zinc-500 border-b border-transparent">
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Preview</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Title</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Release Date</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Redirect Destination (URL)</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {recentWorks.map((rw) => (
                        <tr key={rw.id} className="hover:bg-zinc-50/50">
                          <td className="p-4">
                            <img src={rw.image} alt={rw.title} className="w-12 h-12 object-cover rounded-xl border border-transparent" referrerPolicy="no-referrer" />
                          </td>
                          <td className="p-4 font-bold text-black dark:text-white">{rw.title}</td>
                          <td className="p-4 text-zinc-600 dark:text-zinc-400 font-mono text-[11px]">{rw.date}</td>
                          <td className="p-4 text-blue-600 font-mono text-[11px] truncate max-w-[200px]">
                            <a href={rw.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{rw.url}</a>
                          </td>
                          <td className="p-4 text-right">
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => handleEditRecentWork(rw)}
                                className="p-2 bg-white hover:bg-zinc-50 border border-transparent text-zinc-600 rounded-full cursor-pointer"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteRecentWork(rw.id)}
                                className="p-2 bg-white hover:bg-rose-50 border border-transparent text-rose-500 rounded-full cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-[28px] border border-transparent shadow-sm ">
                <h3 className="font-display font-bold text-black dark:text-white text-lg mb-6">
                  {editingRecentWorkId === "new" ? "Add Recent Work" : "Modify Recent Work"}
                </h3>
                <form onSubmit={handleSaveRecentWork} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Project Title</label>
                      <input
                        type="text"
                        required
                        value={recentWorkForm.title}
                        onChange={(e) => setRecentWorkForm({ ...recentWorkForm, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. Fintech OS Redesign"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Date (e.g. May 2026)</label>
                      <input
                        type="text"
                        required
                        value={recentWorkForm.date}
                        onChange={(e) => setRecentWorkForm({ ...recentWorkForm, date: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. May 2026"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <CloudinaryUpload
                        id="recent-work-cover-upload"
                        label="Cover Image (Cloudinary)"
                        value={recentWorkForm.image}
                        onChange={(url) => setRecentWorkForm({ ...recentWorkForm, image: url })}
                        altValue={recentWorkForm.imageAlt || ""}
                        onAltChange={(alt) => setRecentWorkForm({ ...recentWorkForm, imageAlt: alt })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Direct Redirect URL (View Project)</label>
                      <input
                        type="url"
                        required
                        value={recentWorkForm.url}
                        onChange={(e) => setRecentWorkForm({ ...recentWorkForm, url: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Custom Pills / Tags (separated by commas)</label>
                    <input
                      type="text"
                      value={(recentWorkForm.tags || []).join(", ")}
                      onChange={(e) => {
                        const splitTags = e.target.value.split(",").map(tag => tag.trim()).filter(Boolean);
                        setRecentWorkForm({ ...recentWorkForm, tags: splitTags });
                      }}
                      className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      placeholder="e.g. LinkedIn, Behance, Pinterest"
                    />
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {(recentWorkForm.tags || []).map((tag, idx) => (
                        <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50/70 text-blue-600 border border-blue-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-transparent flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingRecentWorkId(null)}
                      className="px-5 py-2.5 text-xs font-bold border border-transparent text-zinc-600 rounded-full cursor-pointer hover:bg-zinc-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-5 py-2.5 text-xs font-bold bg-[#000000] text-white rounded-full flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Work
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ==================== SERVICES / MY EXPERTISE TAB ==================== */}
        {/* ==================== CLIENT BOOKINGS TAB ==================== */}
        {activeTab === "bookings" && (
          <div className="space-y-6 ">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-transparent dark:border-transparent pb-4 gap-4">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Secured Client Consultations ({localBookings.length})
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Real-time calendar logs synchronized from the live built-in React scheduling system.
                </p>
              </div>
            </div>

            {/* Real-time booking constraints & notifications configuration */}
            <div className="bg-[#F5F5F1] dark:bg-[#0C0C0D] border border-transparent/50 dark:border-transparent/80 rounded-[32px] p-6 sm:p-8 space-y-4">
              <div>
                <h3 className="font-sans text-xs font-bold text-black dark:text-white uppercase tracking-wider">
                  Booking Safeguards & Email Rules
                </h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  Control notification emails and configure duplicate booking limits stored in MongoDB.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 dark:text-zinc-500 mb-1.5">
                    Notification Destination Email
                  </label>
                  <input
                    type="email"
                    required
                    value={siteConfigForm.bookingNotificationEmail || ""}
                    onChange={(e) => setSiteConfigForm({ ...siteConfigForm, bookingNotificationEmail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full border border-transparent dark:border-transparent bg-white dark:bg-zinc-950 text-xs text-black dark:text-white dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    placeholder="workprofile.uiux@gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 dark:text-zinc-500 mb-1.5">
                    Max Active Bookings Per Email
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={siteConfigForm.bookingLimitPerEmail || "1"}
                    onChange={(e) => setSiteConfigForm({ ...siteConfigForm, bookingLimitPerEmail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full border border-transparent dark:border-transparent bg-white dark:bg-zinc-950 text-xs text-black dark:text-white dark:text-white focus:outline-none focus:border-transparent transition-colors"
                    placeholder="1"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-transparent/40 dark:border-transparent/40">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleSaveSubSection("Booking Rules Setup")}
                  className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-[11px] font-bold tracking-tight shadow-sm cursor-pointer transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" /> Save Booking Rules
                </button>
              </div>
            </div>

            {/* ==================== INQUIRY & BOOKING CRM STATS & TOOLBAR ==================== */}
            <div className="space-y-6">
              {/* Metric Counters Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[#F5F5F1] dark:bg-[#0C0C0D] p-4 sm:p-5 rounded-2xl border border-transparent/40 dark:border-zinc-800/80">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Total Inquiries</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-black dark:text-white mt-1 font-mono">
                    {localBookings.length}
                  </div>
                </div>
                <div className="bg-amber-500/10 dark:bg-amber-500/10 p-4 sm:p-5 rounded-2xl border border-amber-500/20">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">Pending Review</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1 font-mono">
                    {localBookings.filter(b => (b.status || "Pending") === "Pending").length}
                  </div>
                </div>
                <div className="bg-blue-500/10 dark:bg-blue-500/10 p-4 sm:p-5 rounded-2xl border border-blue-500/20">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-blue-700 dark:text-blue-400">Contacted</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1 font-mono">
                    {localBookings.filter(b => b.status === "Contacted").length}
                  </div>
                </div>
                <div className="bg-emerald-500/10 dark:bg-emerald-500/10 p-4 sm:p-5 rounded-2xl border border-emerald-500/20">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 dark:text-emerald-400">Scheduled Sessions</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                    {localBookings.filter(b => b.status === "Scheduled").length}
                  </div>
                </div>
              </div>

              {/* Status Filter Tabs & Search Input */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#F5F5F1] dark:bg-[#0C0C0D] p-3 rounded-2xl border border-transparent/40 dark:border-zinc-800/80">
                {/* Status Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  {["All", "Pending", "Contacted", "Scheduled", "Completed", "Archived"].map((st) => {
                    const count = st === "All" 
                      ? localBookings.length 
                      : localBookings.filter(b => (b.status || "Pending") === st).length;
                    const isActive = bookingStatusFilter === st;
                    return (
                      <button
                        key={st}
                        onClick={() => setBookingStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                          isActive
                            ? "bg-black dark:bg-white text-white dark:text-black shadow-2xs"
                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60"
                        }`}
                      >
                        <span>{st}</span>
                        <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                          isActive ? "bg-white/20 dark:bg-black/20" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Search Bar */}
                <div className="relative min-w-[220px]">
                  <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={bookingSearchQuery}
                    onChange={(e) => setBookingSearchQuery(e.target.value)}
                    placeholder="Filter client, email..."
                    className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-black dark:text-white placeholder-zinc-400 focus:outline-none"
                  />
                  {bookingSearchQuery && (
                    <button
                      onClick={() => setBookingSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* CRM Bookings List */}
              {(() => {
                const filteredBookings = localBookings.filter((b) => {
                  const currentStatus = b.status || "Pending";
                  if (bookingStatusFilter !== "All" && currentStatus !== bookingStatusFilter) {
                    return false;
                  }
                  if (bookingSearchQuery.trim()) {
                    const q = bookingSearchQuery.toLowerCase().trim();
                    return (
                      (b.name || "").toLowerCase().includes(q) ||
                      (b.email || "").toLowerCase().includes(q) ||
                      (b.date || "").toLowerCase().includes(q) ||
                      (b.notes || "").toLowerCase().includes(q) ||
                      (b.adminNotes || "").toLowerCase().includes(q)
                    );
                  }
                  return true;
                });

                if (filteredBookings.length === 0) {
                  return (
                    <div className="border border-dashed border-zinc-200 dark:border-zinc-800 rounded-[28px] p-12 text-center text-zinc-500 text-xs">
                      No client bookings match the selected status ("{bookingStatusFilter}") or search criteria.
                    </div>
                  );
                }

                return (
                  <div className="bg-white dark:bg-[#0E0D0C] border border-zinc-200/80 dark:border-zinc-800/80 rounded-[28px] overflow-hidden shadow-sm">
                    {/* Desktop Table View (sm and up) */}
                    <div className="hidden sm:block overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800">
                            <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Status</th>
                            <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Client / Contact</th>
                            <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Date Scheduled</th>
                            <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Time Slot</th>
                            <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Client Brief</th>
                            <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Admin Notes</th>
                            <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-right">Operations</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800/60">
                          {filteredBookings.map((bk) => {
                            const status = bk.status || "Pending";
                            const statusColors: Record<string, string> = {
                              Pending: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/60",
                              Contacted: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/60",
                              Scheduled: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60",
                              Completed: "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800/60",
                              Archived: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
                            };

                            return (
                              <tr key={bk.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                                <td className="p-4">
                                  <select
                                    value={status}
                                    onChange={(e) => handleUpdateBookingStatus(bk.id, e.target.value)}
                                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-colors cursor-pointer focus:outline-none ${
                                      statusColors[status] || statusColors.Pending
                                    }`}
                                  >
                                    <option value="Pending" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Pending</option>
                                    <option value="Contacted" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Contacted</option>
                                    <option value="Scheduled" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Scheduled</option>
                                    <option value="Completed" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Completed</option>
                                    <option value="Archived" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Archived</option>
                                  </select>
                                </td>
                                <td className="p-4">
                                  <div className="font-bold text-black dark:text-white">{bk.name}</div>
                                  <a href={`mailto:${bk.email}`} className="text-zinc-500 hover:text-blue-500 text-[10px] font-mono mt-0.5 block truncate max-w-[180px]">
                                    {bk.email}
                                  </a>
                                </td>
                                <td className="p-4 font-bold text-black dark:text-white font-mono">{bk.date}</td>
                                <td className="p-4">
                                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                                    {bk.timeSlot}
                                  </span>
                                </td>
                                <td className="p-4 text-zinc-600 dark:text-zinc-400 max-w-xs truncate" title={bk.notes}>
                                  {bk.notes || <span className="text-zinc-400 italic">None provided</span>}
                                </td>
                                <td className="p-4 max-w-xs">
                                  {editingNotesBookingId === bk.id ? (
                                    <div className="flex items-center gap-1.5">
                                      <input
                                        type="text"
                                        value={tempAdminNotes}
                                        onChange={(e) => setTempAdminNotes(e.target.value)}
                                        placeholder="Add private note..."
                                        className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 text-xs border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none w-full"
                                      />
                                      <button
                                        onClick={() => handleSaveAdminNotes(bk.id)}
                                        className="px-2 py-1 bg-emerald-500 text-white font-bold text-[10px] rounded-lg hover:bg-emerald-600 cursor-pointer shrink-0"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={() => setEditingNotesBookingId(null)}
                                        className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold text-[10px] rounded-lg hover:bg-zinc-300 cursor-pointer shrink-0"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() => {
                                        setEditingNotesBookingId(bk.id);
                                        setTempAdminNotes(bk.adminNotes || "");
                                      }}
                                      className="cursor-pointer group flex items-center gap-1 text-[11px] text-zinc-500 hover:text-black dark:hover:text-white"
                                    >
                                      <span className="truncate max-w-[140px] italic">
                                        {bk.adminNotes ? bk.adminNotes : "Click to add note"}
                                      </span>
                                    </div>
                                  )}
                                </td>
                                <td className="p-4 text-right">
                                  <button
                                    onClick={() => handleDeleteBooking(bk.id)}
                                    className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer border border-transparent transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card View (<sm) */}
                    <div className="block sm:hidden divide-y divide-zinc-100 dark:divide-zinc-800">
                      {filteredBookings.map((bk) => {
                        const status = bk.status || "Pending";
                        return (
                          <div key={bk.id} className="p-4 space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <div className="font-bold text-sm text-black dark:text-white">{bk.name}</div>
                                <div className="text-zinc-500 text-[11px] font-mono">{bk.email}</div>
                              </div>
                              <select
                                value={status}
                                onChange={(e) => handleUpdateBookingStatus(bk.id, e.target.value)}
                                className="px-3 py-1.5 rounded-full text-xs font-bold border bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white cursor-pointer"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Completed">Completed</option>
                                <option value="Archived">Archived</option>
                              </select>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                              <span className="font-bold text-black dark:text-white">{bk.date}</span>
                              <span>•</span>
                              <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-bold">{bk.timeSlot}</span>
                            </div>

                            {bk.notes && (
                              <div className="text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                <span className="font-bold text-[10px] uppercase block text-zinc-400 mb-0.5">Client Brief:</span>
                                {bk.notes}
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-1">
                              <button
                                onClick={() => {
                                  setEditingNotesBookingId(bk.id);
                                  setTempAdminNotes(bk.adminNotes || "");
                                }}
                                className="text-xs font-semibold text-blue-500 hover:underline cursor-pointer"
                              >
                                {bk.adminNotes ? `Note: ${bk.adminNotes}` : "+ Add Admin Note"}
                              </button>

                              <button
                                onClick={() => handleDeleteBooking(bk.id)}
                                className="px-3 py-1 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 rounded-full text-[10px] font-bold uppercase cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ==================== SEO & GOOGLE RANKING TAB ==================== */}
        {activeTab === "seo" && (
          <div className="space-y-8 ">
            {/* Header */}
            <div>
              <h2 className="text-xl font-bold text-black dark:text-white dark:text-white uppercase tracking-tight font-sans">
                Dynamic SEO Studio & Google Ranking Manager
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Configure meta tags, OpenGraph previews, JSON-LD Schema markup, and Google Analytics tracking.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left Column: Form Editor */}
              <div className="lg:col-span-7 space-y-6">
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const ok = await persistData("site-config", siteConfigForm);
                  if (ok) {
                    setSiteConfig(siteConfigForm);
                  }
                }} className="space-y-6">
                  {/* Card 1: Google SERP Metadata */}
                  <div className="bg-[#F5F5F1] dark:bg-[#0C0C0D] border border-transparent/50 dark:border-transparent/80 rounded-[32px] p-6 sm:p-8 space-y-6">
                    <div className="border-b border-transparent dark:border-transparent pb-3 flex items-center gap-2">
                      <Search className="w-4 h-4 text-[#4285F4]" />
                      <h3 className="font-sans text-sm font-bold text-black dark:text-white uppercase tracking-tight">
                        Google Indexing Metadata
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1.5">
                          SEO Meta Title
                        </label>
                        <input
                          type="text"
                          required
                          value={siteConfigForm.seoDefaultTitle || ""}
                          onChange={(e) => setSiteConfigForm({ ...siteConfigForm, seoDefaultTitle: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent dark:border-transparent bg-white dark:bg-zinc-950 text-black dark:text-white focus:outline-none focus:border-transparent text-xs transition-colors"
                          placeholder="e.g. Rahul Dutta | Principal Product Designer"
                        />
                        <div className="flex justify-between text-[10px] text-zinc-500 mt-1 px-1">
                          <span>Recommended: 50-60 characters</span>
                          <span className={(siteConfigForm.seoDefaultTitle?.length || 0) > 60 ? "text-rose-500" : "text-emerald-500"}>
                            {siteConfigForm.seoDefaultTitle?.length || 0} / 60
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1.5">
                          SEO Meta Description
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={siteConfigForm.seoDefaultDescription || ""}
                          onChange={(e) => setSiteConfigForm({ ...siteConfigForm, seoDefaultDescription: e.target.value })}
                          className="w-full px-5 py-3 rounded-[24px] border border-transparent dark:border-transparent bg-white dark:bg-zinc-950 text-black dark:text-white focus:outline-none focus:border-transparent text-xs transition-colors"
                          placeholder="Type description snippet shown in Google results..."
                        />
                        <div className="flex justify-between text-[10px] text-zinc-500 mt-1 px-1">
                          <span>Recommended: 120-160 characters</span>
                          <span className={(siteConfigForm.seoDefaultDescription?.length || 0) > 160 ? "text-rose-500" : "text-emerald-500"}>
                            {siteConfigForm.seoDefaultDescription?.length || 0} / 160
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1.5">
                          Focus Keywords (Comma-separated)
                        </label>
                        <input
                          type="text"
                          value={siteConfigForm.seoKeywords || ""}
                          onChange={(e) => setSiteConfigForm({ ...siteConfigForm, seoKeywords: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent dark:border-transparent bg-white dark:bg-zinc-950 text-black dark:text-white focus:outline-none focus:border-transparent text-xs transition-colors"
                          placeholder="e.g. Product Designer, React, UI/UX"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Google Verification & Analytics */}
                  <div className="bg-[#F5F5F1] dark:bg-[#0C0C0D] border border-transparent/50 dark:border-transparent/80 rounded-[32px] p-6 sm:p-8 space-y-6">
                    <div className="border-b border-transparent dark:border-transparent pb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-500" />
                      <h3 className="font-sans text-sm font-bold text-black dark:text-white uppercase tracking-tight">
                        Integrations & Tracking
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1.5">
                          Google Search Console HTML Meta Verification Key
                        </label>
                        <input
                          type="text"
                          value={siteConfigForm.seoGoogleVerification || ""}
                          onChange={(e) => setSiteConfigForm({ ...siteConfigForm, seoGoogleVerification: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent dark:border-transparent bg-white dark:bg-zinc-950 text-black dark:text-white focus:outline-none focus:border-transparent text-xs transition-colors"
                          placeholder="e.g. google-site-verification key..."
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1.5">
                          Google Analytics ID (G-XXXXXX)
                        </label>
                        <input
                          type="text"
                          value={siteConfigForm.seoAnalyticsId || ""}
                          onChange={(e) => setSiteConfigForm({ ...siteConfigForm, seoAnalyticsId: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent dark:border-transparent bg-white dark:bg-zinc-950 text-black dark:text-white focus:outline-none focus:border-transparent text-xs transition-colors"
                          placeholder="G-MEASUREMENTID"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Share Previews & Rich Snippets */}
                  <div className="bg-[#F5F5F1] dark:bg-[#0C0C0D] border border-transparent/50 dark:border-transparent/80 rounded-[32px] p-6 sm:p-8 space-y-6">
                    <div className="border-b border-transparent dark:border-transparent pb-3 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#4285F4]" />
                      <h3 className="font-sans text-sm font-bold text-black dark:text-white uppercase tracking-tight">
                        Social Open Graph & Schema
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1.5">
                          OpenGraph Card Image URL
                        </label>
                        <input
                          type="text"
                          value={siteConfigForm.seoOgImage || ""}
                          onChange={(e) => setSiteConfigForm({ ...siteConfigForm, seoOgImage: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent dark:border-transparent bg-white dark:bg-zinc-950 text-black dark:text-white focus:outline-none focus:border-transparent text-xs transition-colors"
                          placeholder="https://images.unsplash.com/..."
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1.5">
                            Author/Brand Owner Name
                          </label>
                          <input
                            type="text"
                            value={siteConfigForm.seoAuthorName || ""}
                            onChange={(e) => setSiteConfigForm({ ...siteConfigForm, seoAuthorName: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-full border border-transparent dark:border-transparent bg-white dark:bg-zinc-950 text-black dark:text-white focus:outline-none focus:border-transparent text-xs transition-colors"
                            placeholder="e.g. Rahul Dutta"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1.5">
                            Author Job Title
                          </label>
                          <input
                            type="text"
                            value={siteConfigForm.seoAuthorJobTitle || ""}
                            onChange={(e) => setSiteConfigForm({ ...siteConfigForm, seoAuthorJobTitle: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-full border border-transparent dark:border-transparent bg-white dark:bg-zinc-950 text-black dark:text-white focus:outline-none focus:border-transparent text-xs transition-colors"
                            placeholder="Independent Product Designer"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1.5">
                          Social Profile SameAs Connections (Comma-separated)
                        </label>
                        <input
                          type="text"
                          value={siteConfigForm.seoAuthorSameAs || ""}
                          onChange={(e) => setSiteConfigForm({ ...siteConfigForm, seoAuthorSameAs: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-full border border-transparent dark:border-transparent bg-white dark:bg-zinc-950 text-black dark:text-white focus:outline-none focus:border-transparent text-xs transition-colors"
                          placeholder="https://linkedin.com/..., https://github.com/..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Trigger */}
                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 bg-[#34A853] hover:bg-[#2D8E47] text-white rounded-full flex items-center gap-2 text-xs font-bold cursor-pointer transition-colors shadow-sm disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" /> Save SEO Settings & Strategy
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Real-time Live Google Search Engine Mockup Preview */}
              <div className="lg:col-span-5 space-y-6">
                <div className="sticky top-32 space-y-6">
                  {/* Google Mockup Card */}
                  <div className="bg-white dark:bg-[#0C0C0D] border border-transparent dark:border-transparent/80 rounded-[32px] p-6 shadow-sm">
                    <div className="flex items-center justify-between border-b border-transparent dark:border-transparent pb-3 mb-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-rose-400" />
                        <div className="w-2 h-2 rounded-full bg-amber-400" />
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider font-bold uppercase text-zinc-500">
                        Live Google SERP Simulator
                      </span>
                    </div>

                    {/* Google Result Frame */}
                    <div className="space-y-4 p-5 bg-zinc-50 dark:bg-zinc-950/60 rounded-[24px] border border-transparent dark:border-transparent/50">
                      <div className="flex items-center gap-2 text-xs">
                        {/* Mock Logo / Favicon */}
                        <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-650 dark:text-zinc-350">
                          {siteConfigForm.brandName ? siteConfigForm.brandName.substring(0, 1) : "R"}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] leading-tight text-zinc-850 dark:text-zinc-150 font-sans font-semibold">
                            {siteConfigForm.brandName || "Rahul"} Dutta
                          </span>
                          <span className="text-[9px] leading-tight text-zinc-500 font-mono">
                            https://{siteConfigForm.brandName ? siteConfigForm.brandName.toLowerCase() : "rahuldutta"}.design/
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="text-sm font-sans font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-tight">
                          {siteConfigForm.seoDefaultTitle || "Rahul Dutta | Independent Product Designer & Frontend Technologist"}
                        </h4>
                        <p className="text-[11px] leading-relaxed text-[#4d5156] dark:text-[#bdc1c6] font-sans">
                          {siteConfigForm.seoDefaultDescription || "Explore Rahul Dutta's portfolio. Specializing in high-fidelity UI/UX product design, interactive React development, Figma design systems, and SEO engineering."}
                        </p>
                      </div>
                    </div>

                    {/* SEO Health Analysis */}
                    <div className="mt-6 space-y-4">
                      <h4 className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 font-sans border-b border-transparent dark:border-transparent pb-2">
                        SEO Quality Metrics Checklist
                      </h4>
                      <div className="space-y-3">
                        {/* Title check */}
                        <div className="flex items-start gap-2 text-[11px]">
                          <div className={`mt-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0 ${
                            (siteConfigForm.seoDefaultTitle?.length || 0) >= 50 && (siteConfigForm.seoDefaultTitle?.length || 0) <= 60
                              ? "bg-emerald-500"
                              : "bg-amber-400"
                          }`}>
                            {(siteConfigForm.seoDefaultTitle?.length || 0) >= 50 && (siteConfigForm.seoDefaultTitle?.length || 0) <= 60 ? "✓" : "!"}
                          </div>
                          <div>
                            <span className="font-bold text-zinc-700 dark:text-zinc-200">Page Title Optimization:</span>
                            <p className="text-zinc-500 text-[10px] mt-0.5">
                              {(siteConfigForm.seoDefaultTitle?.length || 0) < 50 
                                ? "Current length is too short for search results optimization. Try to expand to 50-60 characters." 
                                : (siteConfigForm.seoDefaultTitle?.length || 0) > 60 
                                ? "Your title exceeds 60 characters. Search engines like Google will truncate the overflow." 
                                : "Excellent! Title length fits perfectly within search snippet layouts."}
                            </p>
                          </div>
                        </div>

                        {/* Description check */}
                        <div className="flex items-start gap-2 text-[11px]">
                          <div className={`mt-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0 ${
                            (siteConfigForm.seoDefaultDescription?.length || 0) >= 120 && (siteConfigForm.seoDefaultDescription?.length || 0) <= 160
                              ? "bg-emerald-500"
                              : "bg-amber-400"
                          }`}>
                            {(siteConfigForm.seoDefaultDescription?.length || 0) >= 120 && (siteConfigForm.seoDefaultDescription?.length || 0) <= 160 ? "✓" : "!"}
                          </div>
                          <div>
                            <span className="font-bold text-zinc-700 dark:text-zinc-200">Snippet Snippet Optimization:</span>
                            <p className="text-zinc-500 text-[10px] mt-0.5">
                              {(siteConfigForm.seoDefaultDescription?.length || 0) < 120 
                                ? "Current description is too short. Search engines display up to 160 characters. Expand to capture searcher intent." 
                                : (siteConfigForm.seoDefaultDescription?.length || 0) > 160 
                                ? "Your description is too long (over 160 characters). Google will truncate the text." 
                                : "Excellent! Description length is fully optimized for snippet clicks."}
                            </p>
                          </div>
                        </div>

                        {/* Keywords check */}
                        <div className="flex items-start gap-2 text-[11px]">
                          <div className={`mt-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0 ${
                            siteConfigForm.seoKeywords ? "bg-emerald-500" : "bg-rose-500"
                          }`}>
                            {siteConfigForm.seoKeywords ? "✓" : "×"}
                          </div>
                          <div>
                            <span className="font-bold text-zinc-700 dark:text-zinc-200">Meta Keywords:</span>
                            <p className="text-zinc-500 text-[10px] mt-0.5">
                              {siteConfigForm.seoKeywords 
                                ? "Focus keywords configured successfully. Helps build directory semantic graphs."
                                : "No meta keywords defined. Add some relevant keywords to bootstrap page queries."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "services" && (
          <div>
            {!editingServiceId ? (
              <div className="space-y-6 ">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
                      My Expertise / Services ({services.length})
                    </h2>
                    <p className="text-xs text-zinc-500 mt-1">
                      Manage each step card shown in the "My Expertise" grid section on the home page.
                    </p>
                  </div>
                  <button
                    onClick={handleNewService}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold bg-[#000000] text-white rounded-full hover:opacity-90 cursor-pointer "
                  >
                    <Plus className="w-4 h-4" /> Add Expertise Card
                  </button>
                </div>

                <div className="bg-white rounded-[28px] overflow-hidden border border-transparent shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 text-zinc-500 border-b border-transparent">
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Icon Symbol</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Step Label</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Title</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Description Preview</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {services.map((s) => (
                        <tr key={s.id} className="hover:bg-zinc-50/50">
                          <td className="p-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 font-mono text-[10px]">
                              {s.icon}
                            </span>
                          </td>
                          <td className="p-4 text-zinc-600 dark:text-zinc-400 font-mono font-medium text-[11px]">{s.step}</td>
                          <td className="p-4 font-bold text-black dark:text-white">{s.title}</td>
                          <td className="p-4 text-zinc-500 max-w-[350px] truncate">{s.description}</td>
                          <td className="p-4 text-right">
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => handleEditService(s)}
                                className="p-2 bg-white hover:bg-zinc-50 border border-transparent text-zinc-600 rounded-full cursor-pointer"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteService(s.id)}
                                className="p-2 bg-white hover:bg-rose-50 border border-transparent text-rose-500 rounded-full cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-[28px] border border-transparent shadow-sm ">
                <h3 className="font-display font-bold text-black dark:text-white text-lg mb-6">
                  {editingServiceId === "new" ? "Add Expertise Service" : "Modify Expertise Service"}
                </h3>
                <form onSubmit={handleSaveService} className="space-y-5">
                  <div className="grid md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Step Index (e.g. 01 /)</label>
                      <input
                        type="text"
                        required
                        value={serviceForm.step}
                        onChange={(e) => setServiceForm({ ...serviceForm, step: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. 01 /"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Service Title</label>
                      <input
                        type="text"
                        required
                        value={serviceForm.title}
                        onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                        placeholder="e.g. Core System Architectures"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Aesthetic Icon Symbol</label>
                      <select
                        value={serviceForm.icon}
                        onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-full border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      >
                        <option value="Layers">Layers (Stacked modules)</option>
                        <option value="Code">Code (Markup and syntax)</option>
                        <option value="Brain">Brain (Artificial intelligence)</option>
                        <option value="Cpu">Cpu (Processors and hardware)</option>
                        <option value="Terminal">Terminal (Command prompt)</option>
                        <option value="Zap">Zap (Lightning fast energy)</option>
                        <option value="Activity">Activity (Pulses and analytics)</option>
                        <option value="Shield">Shield (Information security)</option>
                        <option value="Lightbulb">Lightbulb (Product strategy)</option>
                        <option value="Sparkles">Sparkles (Aesthetic finish)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5">Detailed Description</label>
                    <textarea
                      required
                      rows={3}
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      className="w-full px-5 py-3 rounded-[24px] border border-transparent bg-zinc-50 text-xs text-black dark:text-white focus:outline-none focus:border-transparent transition-colors"
                      placeholder="Explain what technologies, methodologies, or frameworks you excel in for this specific layer..."
                    />
                  </div>

                  <div className="pt-4 border-t border-transparent flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingServiceId(null)}
                      className="px-5 py-2.5 text-xs font-bold border border-transparent text-zinc-600 rounded-full cursor-pointer hover:bg-zinc-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-5 py-2.5 text-xs font-bold bg-[#000000] text-white rounded-full flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Service Card
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
 
      </div>

      {/* Premium Profile Image Crop Modal */}
      {showCropModal && cropImageSrc && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0C0C0D] border border-transparent dark:border-transparent rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-6">
            <div className="flex items-center justify-between border-b border-transparent dark:border-transparent pb-4">
              <h4 className="font-sans text-base font-bold text-black dark:text-white flex items-center gap-2">
                <Crop className="w-5 h-5 text-purple-600" />
                Crop Profile Picture
              </h4>
              <button
                type="button"
                onClick={() => setShowCropModal(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 p-1.5 rounded-full cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Visual crop preview area */}
            <div className="space-y-4">
              <div 
                className="relative w-[280px] h-[280px] mx-auto rounded-[36px] overflow-hidden bg-zinc-950 border border-transparent dark:border-transparent flex items-center justify-center cursor-move shadow-inner select-none touch-none"
                onPointerDown={(e) => {
                  setIsDragging(true);
                  setDragStart({ x: e.clientX - cropX, y: e.clientY - cropY });
                  e.currentTarget.setPointerCapture(e.pointerId);
                }}
                onPointerMove={(e) => {
                  if (isDragging) {
                    setCropX(e.clientX - dragStart.x);
                    setCropY(e.clientY - dragStart.y);
                  }
                }}
                onPointerUp={(e) => {
                  setIsDragging(false);
                  e.currentTarget.releasePointerCapture(e.pointerId);
                }}
              >
                <img
                  src={cropImageSrc}
                  alt="Source preview"
                  className="max-w-none pointer-events-none select-none"
                  style={{
                    transform: `translate(${cropX}px, ${cropY}px) scale(${cropZoom})`,
                    transformOrigin: 'center center',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Circle overlay helper representing the cropped bounds */}
                <div className="absolute inset-0 border-4 border-transparent pointer-events-none rounded-[36px] flex items-center justify-center">
                  <div className="w-[264px] h-[264px] rounded-[30px] border border-dashed border-transparent" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold text-zinc-500">
                  <span>Zoom Level</span>
                  <span>{Math.round(cropZoom * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.05"
                  value={cropZoom}
                  onChange={(e) => setCropZoom(parseFloat(e.target.value))}
                  className="w-full accent-black cursor-pointer bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none h-1.5"
                />
              </div>

              <p className="text-[11px] text-zinc-400 text-center leading-relaxed">
                Drag the image to adjust position inside the rounded container, and use the slider to scale.
              </p>
            </div>

            <div className="pt-4 border-t border-transparent dark:border-transparent flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCropModal(false)}
                className="px-5 py-2.5 text-xs font-bold border border-transparent text-zinc-600 rounded-full cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyCrop}
                className="px-5 py-2.5 text-xs font-bold bg-[#000000] text-white rounded-full flex items-center gap-1.5 cursor-pointer hover:opacity-90 transition-opacity"
              >
                <Check className="w-3.5 h-3.5" /> Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
