/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import dotenv from "dotenv";
dotenv.config({ override: true });
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import { initialProjects, initialTestimonials, initialBlogPosts, initialFeaturedProjects, initialRecentWorks, initialServices, initialSiteConfig } from "./src/initialData.js";
import { getMongoData, saveMongoData, connectToDatabase } from "./src/db/mongodb.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// Configure Cloudinary using user credentials with fallbacks
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "hssgxjlo",
  api_key: process.env.CLOUDINARY_API_KEY || "536377478922966",
  api_secret: process.env.CLOUDINARY_API_SECRET || "FUgVAhFZoUnr6CHjax-WQkjLcl0",
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IS_VERCEL = !!process.env.VERCEL;
const DATA_DIR = IS_VERCEL ? path.join("/tmp", "data") : path.join(process.cwd(), "data");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const FEATURED_PROJECTS_FILE = path.join(DATA_DIR, "featuredProjects.json");
const RECENT_WORKS_FILE = path.join(DATA_DIR, "recentWorks.json");
const TESTIMONIALS_FILE = path.join(DATA_DIR, "testimonials.json");
const BLOG_FILE = path.join(DATA_DIR, "blogPosts.json");
const SITECONFIG_FILE = path.join(DATA_DIR, "siteConfig.json");
const TIMELINE_SECTIONS_FILE = path.join(DATA_DIR, "timelineSections.json");
const SERVICES_FILE = path.join(DATA_DIR, "services.json");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");
const USERS_FILE = path.join(DATA_DIR, "users.json");

const initialTimelineSections = [
  {
    id: "sec-experience",
    title: "EXPERIENCE",
    icon: "Briefcase",
    items: [
      {
        id: "exp-care-guide",
        title: "Product Designer (UI/UX)",
        subtitle: "Care Guide",
        date: "04/2026 – Present",
        details: [
          "Redesigned a legacy 2016 healthcare portal into a custom 2026 system, benchmarking visual layouts against industry leaders like Bayada and Mayo Clinic for development readiness.",
          "Built and scaled a Figma design system with precise variable tokens and adaptive components, drastically streamlining cross-functional developer collaboration and handoff."
        ]
      },
      {
        id: "exp-freelance",
        title: "User-Centered Product Designer",
        subtitle: "Freelance & Contract",
        date: "05/2023 – Present",
        details: [
          "Shipped 17+ high-impact digital products, translating complex SaaS & fintech business requirements into highly intuitive, user-centric responsive wireframes and layouts.",
          "Delivered complete design specifications, modular Figma libraries, and brand style guides, ensuring absolute 1:1 development implementation and execution accuracy."
        ]
      },
      {
        id: "exp-host-website",
        title: "Product & Interaction Designer",
        subtitle: "Host The Website",
        date: "11/2024 – 11/2025",
        details: [
          "Owned the visual design for 13+ responsive sites, mapping layouts from wireframe to Figma deliverables with pixel-perfect accuracy for direct, frictionless developer handoff.",
          "Defined motion specs and custom hover states for 1:1 Webflow developer execution."
        ]
      }
    ]
  },
  {
    id: "sec-education",
    title: "EDUCATION",
    icon: "GraduationCap",
    items: [
      {
        id: "edu-cse",
        title: "B.Sc. in Computer Science & Engineering (CSE)",
        subtitle: "Daffodil International University (DIU)",
        date: "2019 – 2023",
        details: ["CGPA: 3.17"]
      },
      {
        id: "edu-diploma",
        title: "Diploma in Computer Technology",
        subtitle: "Khanjahan Ali College of Science & Technology",
        date: "2014 – 2018",
        details: ["CGPA: 3.19"]
      }
    ]
  },
  {
    id: "sec-certifications",
    title: "CERTIFICATIONS",
    icon: "Award",
    items: [
      {
        id: "cert-claude",
        title: "Claude 101",
        subtitle: "Anthropic",
        date: "05/2026",
        details: []
      },
      {
        id: "cert-excel",
        title: "Excel Essentials",
        subtitle: "UNICEF / Generation Unlimited",
        date: "05/2026",
        details: []
      },
      {
        id: "cert-adv-ux",
        title: "Advanced UX/UI & Product Design (Coursework)",
        subtitle: "Creative IT Institute",
        date: "03/2025",
        details: []
      },
      {
        id: "cert-proj-ux",
        title: "Project Based Professional UI/UX Design",
        subtitle: "MSB Academy",
        date: "02/2024",
        details: []
      },
      {
        id: "cert-web-design",
        title: "Professional Web Design",
        subtitle: "Future IT Park | ITES Web Design - BCC-LICT (Ernst & Young)",
        date: "04/2018",
        details: []
      }
    ]
  }
];

const defaultSiteConfig = initialSiteConfig;

// Ensure data directory and files exist, seed them if necessary
function initializeDatabase() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(PROJECTS_FILE)) {
      fs.writeFileSync(PROJECTS_FILE, JSON.stringify(initialProjects, null, 2), "utf-8");
      console.log("Seeded projects.json");
    }

    if (!fs.existsSync(FEATURED_PROJECTS_FILE)) {
      fs.writeFileSync(FEATURED_PROJECTS_FILE, JSON.stringify(initialFeaturedProjects, null, 2), "utf-8");
      console.log("Seeded featuredProjects.json");
    }

    if (!fs.existsSync(RECENT_WORKS_FILE)) {
      fs.writeFileSync(RECENT_WORKS_FILE, JSON.stringify(initialRecentWorks, null, 2), "utf-8");
      console.log("Seeded recentWorks.json");
    }

    if (!fs.existsSync(TESTIMONIALS_FILE)) {
      fs.writeFileSync(TESTIMONIALS_FILE, JSON.stringify(initialTestimonials, null, 2), "utf-8");
      console.log("Seeded testimonials.json");
    }

    if (!fs.existsSync(BLOG_FILE)) {
      fs.writeFileSync(BLOG_FILE, JSON.stringify(initialBlogPosts, null, 2), "utf-8");
      console.log("Seeded blogPosts.json");
    }

    if (!fs.existsSync(SITECONFIG_FILE)) {
      fs.writeFileSync(SITECONFIG_FILE, JSON.stringify(defaultSiteConfig, null, 2), "utf-8");
      console.log("Seeded siteConfig.json");
    }

    if (!fs.existsSync(TIMELINE_SECTIONS_FILE)) {
      fs.writeFileSync(TIMELINE_SECTIONS_FILE, JSON.stringify(initialTimelineSections, null, 2), "utf-8");
      console.log("Seeded timelineSections.json");
    }

    if (!fs.existsSync(SERVICES_FILE)) {
      fs.writeFileSync(SERVICES_FILE, JSON.stringify(initialServices, null, 2), "utf-8");
      console.log("Seeded services.json");
    }

    if (!fs.existsSync(BOOKINGS_FILE)) {
      fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2), "utf-8");
      console.log("Seeded bookings.json");
    }

    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify(initialUsers, null, 2), "utf-8");
      console.log("Seeded users.json");
    }
  } catch (error) {
    console.error("Error initializing JSON database, falling back to memory:", error);
  }
}

const initialUsers = [
  {
    id: "user-rahul",
    email: "workprofile.uiux@gmail.com",
    password: "Rahul258",
    name: "Rahul Dutta",
    role: "admin"
  }
];

async function getUsersData() {
  const mongoData = await getMongoData("users", initialUsers);
  if (mongoData !== null) return mongoData;

  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = await fs.promises.readFile(USERS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Read users.json error, using memory:", e);
  }
  return initialUsers;
}

async function saveUsersData(data: any) {
  const success = await saveMongoData("users", data);
  if (success) return true;

  try {
    await fs.promises.writeFile(USERS_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (e) {
    console.error("Save users.json error:", e);
    return false;
  }
}

initializeDatabase();

// In-memory fallbacks if file read fails
let memoryProjects = [...initialProjects];
let memoryTestimonials = [...initialTestimonials];
let memoryBlogPosts = [...initialBlogPosts];

async function getProjectsData() {
  const mongoData = await getMongoData("projects", initialProjects);
  if (mongoData !== null) return mongoData;

  try {
    if (fs.existsSync(PROJECTS_FILE)) {
      const data = await fs.promises.readFile(PROJECTS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Read projects.json error, using memory:", e);
  }
  return memoryProjects;
}

async function saveProjectsData(data: any) {
  memoryProjects = data;
  const mongoSaved = await saveMongoData("projects", data);
  if (!mongoSaved) {
    console.error("Failed to save projects to MongoDB. Returning update failed.");
    return false;
  }
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    await fs.promises.writeFile(PROJECTS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Write projects.json error:", e);
  }
  return true;
}

let memoryFeaturedProjects = [...initialFeaturedProjects];
let memoryRecentWorks = [...initialRecentWorks];

async function getFeaturedProjectsData() {
  const mongoData = await getMongoData("featuredProjects", initialFeaturedProjects);
  if (mongoData !== null) return mongoData;

  try {
    if (fs.existsSync(FEATURED_PROJECTS_FILE)) {
      const data = await fs.promises.readFile(FEATURED_PROJECTS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Read featuredProjects.json error, using memory:", e);
  }
  return memoryFeaturedProjects;
}

async function saveFeaturedProjectsData(data: any) {
  memoryFeaturedProjects = data;
  const mongoSaved = await saveMongoData("featuredProjects", data);
  if (!mongoSaved) {
    console.error("Failed to save featuredProjects to MongoDB. Returning update failed.");
    return false;
  }
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    await fs.promises.writeFile(FEATURED_PROJECTS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Write featuredProjects.json error:", e);
  }
  return true;
}

async function getRecentWorksData() {
  const mongoData = await getMongoData("recentWorks", initialRecentWorks);
  if (mongoData !== null) return mongoData;

  try {
    if (fs.existsSync(RECENT_WORKS_FILE)) {
      const data = await fs.promises.readFile(RECENT_WORKS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Read recentWorks.json error, using memory:", e);
  }
  return memoryRecentWorks;
}

async function saveRecentWorksData(data: any) {
  memoryRecentWorks = data;
  const mongoSaved = await saveMongoData("recentWorks", data);
  if (!mongoSaved) {
    console.error("Failed to save recentWorks to MongoDB. Returning update failed.");
    return false;
  }
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    await fs.promises.writeFile(RECENT_WORKS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Write recentWorks.json error:", e);
  }
  return true;
}

async function getTestimonialsData() {
  const mongoData = await getMongoData("testimonials", initialTestimonials);
  if (mongoData !== null) return mongoData;

  try {
    if (fs.existsSync(TESTIMONIALS_FILE)) {
      const data = await fs.promises.readFile(TESTIMONIALS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Read testimonials.json error, using memory:", e);
  }
  return memoryTestimonials;
}

async function saveTestimonialsData(data: any) {
  memoryTestimonials = data;
  const mongoSaved = await saveMongoData("testimonials", data);
  if (!mongoSaved) {
    console.error("Failed to save testimonials to MongoDB. Returning update failed.");
    return false;
  }
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    await fs.promises.writeFile(TESTIMONIALS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Write testimonials.json error:", e);
  }
  return true;
}

async function getBlogData() {
  const mongoData = await getMongoData("blogPosts", initialBlogPosts);
  if (mongoData !== null) return mongoData;

  try {
    if (fs.existsSync(BLOG_FILE)) {
      const data = await fs.promises.readFile(BLOG_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Read blogPosts.json error, using memory:", e);
  }
  return memoryBlogPosts;
}

async function saveBlogData(data: any) {
  memoryBlogPosts = data;
  const mongoSaved = await saveMongoData("blogPosts", data);
  if (!mongoSaved) {
    console.error("Failed to save blogPosts to MongoDB. Returning update failed.");
    return false;
  }
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    await fs.promises.writeFile(BLOG_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Write blogPosts.json error:", e);
  }
  return true;
}

let memorySiteConfig = { ...defaultSiteConfig };

async function getSiteConfigData() {
  const mongoData = await getMongoData("siteConfig", defaultSiteConfig);
  if (mongoData !== null) return { ...defaultSiteConfig, ...mongoData };

  try {
    if (fs.existsSync(SITECONFIG_FILE)) {
      const data = await fs.promises.readFile(SITECONFIG_FILE, "utf-8");
      return { ...defaultSiteConfig, ...JSON.parse(data) };
    }
  } catch (e) {
    console.error("Read siteConfig.json error, using memory:", e);
  }
  return { ...defaultSiteConfig, ...memorySiteConfig };
}

async function saveSiteConfigData(data: any) {
  memorySiteConfig = data;
  const mongoSaved = await saveMongoData("siteConfig", data);
  if (!mongoSaved) {
    console.error("Failed to save siteConfig to MongoDB. Returning update failed.");
    return false;
  }
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    await fs.promises.writeFile(SITECONFIG_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Write siteConfig.json error:", e);
  }
  return true;
}

let memoryTimelineSections = [...initialTimelineSections];

async function getTimelineSectionsData() {
  const mongoData = await getMongoData("timelineSections", initialTimelineSections);
  if (mongoData !== null) return mongoData;

  try {
    if (fs.existsSync(TIMELINE_SECTIONS_FILE)) {
      const data = await fs.promises.readFile(TIMELINE_SECTIONS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Read timelineSections.json error, using memory:", e);
  }
  return memoryTimelineSections;
}

async function saveTimelineSectionsData(data: any) {
  memoryTimelineSections = data;
  const mongoSaved = await saveMongoData("timelineSections", data);
  if (!mongoSaved) {
    console.error("Failed to save timelineSections to MongoDB. Returning update failed.");
    return false;
  }
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    await fs.promises.writeFile(TIMELINE_SECTIONS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Write timelineSections.json error:", e);
  }
  return true;
}

let memoryServices = [...initialServices];

async function getServicesData() {
  const mongoData = await getMongoData("services", initialServices);
  if (mongoData !== null) return mongoData;

  try {
    if (fs.existsSync(SERVICES_FILE)) {
      const data = await fs.promises.readFile(SERVICES_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Read services.json error, using memory:", e);
  }
  return memoryServices;
}

async function saveServicesData(data: any) {
  memoryServices = data;
  const mongoSaved = await saveMongoData("services", data);
  if (!mongoSaved) {
    console.error("Failed to save services to MongoDB. Returning update failed.");
    return false;
  }
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    await fs.promises.writeFile(SERVICES_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Write services.json error:", e);
  }
  return true;
}

let memoryBookings: any[] = [];

async function getBookingsData() {
  const mongoData = await getMongoData("bookings", []);
  if (mongoData !== null) return mongoData;

  try {
    if (fs.existsSync(BOOKINGS_FILE)) {
      const data = await fs.promises.readFile(BOOKINGS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Read bookings.json error, using memory:", e);
  }
  return memoryBookings;
}

async function saveBookingsData(data: any) {
  memoryBookings = data;
  const mongoSaved = await saveMongoData("bookings", data);
  let fileSaved = false;
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    await fs.promises.writeFile(BOOKINGS_FILE, JSON.stringify(data, null, 2), "utf-8");
    fileSaved = true;
  } catch (e) {
    console.error("Write bookings.json error:", e);
  }
  return mongoSaved || fileSaved;
}

async function getAllDatabaseData() {
  try {
    const [
      projects,
      featuredProjects,
      recentWorks,
      testimonials,
      blogPosts,
      siteConfig,
      timelineSections,
      services
    ] = await Promise.all([
      getProjectsData(),
      getFeaturedProjectsData(),
      getRecentWorksData(),
      getTestimonialsData(),
      getBlogData(),
      getSiteConfigData(),
      getTimelineSectionsData(),
      getServicesData()
    ]);

    return {
      projects,
      featuredProjects,
      recentWorks,
      testimonials,
      blogPosts,
      siteConfig,
      timelineSections,
      services
    };
  } catch (err) {
    console.error("Error fetching all database data for initial state:", err);
    return {
      projects: memoryProjects,
      featuredProjects: memoryFeaturedProjects,
      recentWorks: memoryRecentWorks,
      testimonials: memoryTestimonials,
      blogPosts: memoryBlogPosts,
      siteConfig: memorySiteConfig,
      timelineSections: memoryTimelineSections,
      services: memoryServices
    };
  }
}

// Lazy-loaded SMTP transporter
let smtpTransporter: any = null;

function getSMTPTransporter() {
  if (!smtpTransporter) {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (host && user && pass) {
      smtpTransporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass }
      });
      console.log("Nodemailer SMTP transporter configured successfully.");
    } else {
      console.warn("SMTP credentials (SMTP_HOST, SMTP_USER, SMTP_PASS) are missing. Email notifications will be logged to server console and recorded in MongoDB instead.");
    }
  }
  return smtpTransporter;
}

async function sendBookingEmails(booking: { name: string; email: string; date: string; timeSlot: string; notes?: string }, adminEmail: string) {
  const adminSubject = `New Consultation Booked: ${booking.name}`;
  const adminText = `
Hello Rahul,

A new consultation session has been booked:
Client Name: ${booking.name}
Client Email: ${booking.email}
Scheduled Date: ${booking.date}
Scheduled Time Slot: ${booking.timeSlot}
Additional Notes: ${booking.notes || "None"}

You can view and manage all bookings in your admin dashboard.
  `;

  const clientSubject = `Booking Confirmation: Consultation with Rahul Dutta`;
  const clientText = `
Hi ${booking.name},

Thank you for booking a consultation session!
Here are your booking details:
Designer: Rahul Dutta (Product Designer)
Scheduled Date: ${booking.date}
Scheduled Time Slot: ${booking.timeSlot}
Additional Notes: ${booking.notes || "None"}

If you need to change or cancel your session, please contact ${adminEmail || "workprofile.uiux@gmail.com"}.

Best regards,
Rahul Dutta Portfolio Team
  `;

  const transporter = getSMTPTransporter();
  if (transporter) {
    try {
      // Send to Admin
      await transporter.sendMail({
        from: `"${booking.name} via Portfolio" <${process.env.SMTP_USER}>`,
        to: adminEmail || "workprofile.uiux@gmail.com",
        subject: adminSubject,
        text: adminText,
      });

      // Send to Client
      await transporter.sendMail({
        from: `"Rahul Dutta" <${process.env.SMTP_USER}>`,
        to: booking.email,
        subject: clientSubject,
        text: clientText,
      });
      console.log(`Emails successfully sent to admin (${adminEmail}) and client (${booking.email}).`);
    } catch (err) {
      console.error("Nodemailer sendMail failed:", err);
    }
  } else {
    console.log("============= SIMULATED EMAIL DELIVERY =============");
    console.log(`To Admin (${adminEmail || "workprofile.uiux@gmail.com"}):`);
    console.log(`Subject: ${adminSubject}`);
    console.log(adminText);
    console.log("----------------------------------------------------");
    console.log(`To Client (${booking.email}):`);
    console.log(`Subject: ${clientSubject}`);
    console.log(clientText);
    console.log("====================================================");
  }
}

const app = express();

// Body parsers with increased limits for large Base64 images
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

// API - Secure Cloudinary Upload Endpoint
app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token !== "session-token-rahuldutta-2026") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Convert memory buffer to base64 Data URI
    const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    
    // Upload base64 image data to Cloudinary under folder 'portfolio_assets'
    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: "portfolio_assets"
    });

    return res.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error: any) {
    console.error("Cloudinary upload error in server:", error);
    return res.status(500).json({ success: false, message: error.message || "Upload failed" });
  }
});

// GET - Download Rahul_Dutta_Resume.pdf directly from main domain URL
app.get("/robots.txt", (req, res) => {
  const content = `User-agent: *\nAllow: /\nSitemap: https://ui-ux-rahul.vercel.app/sitemap.xml\n`;
  res.header("Content-Type", "text/plain");
  return res.status(200).send(content);
});

app.get("/sitemap.xml", async (req, res) => {
  try {
    const dbData = await getAllDatabaseData();
    const domain = "https://ui-ux-rahul.vercel.app";
    
    // Static main paths
    const paths = [
      { loc: "/", changefreq: "daily", priority: "1.0" },
      { loc: "/style-guide", changefreq: "monthly", priority: "0.2" },
    ];

    // Dynamic menu item paths
    const siteConfig = dbData.siteConfig || {};
    const slug1 = siteConfig.navItem1Text ? siteConfig.navItem1Text.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "expertise";
    const slug2 = siteConfig.navItem2Text ? siteConfig.navItem2Text.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "case-studies";
    const slug3 = siteConfig.navItem3Text ? siteConfig.navItem3Text.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "testimonials";

    paths.push({ loc: `/${slug1}`, changefreq: "weekly", priority: "0.8" });
    paths.push({ loc: `/${slug2}`, changefreq: "weekly", priority: "0.8" });
    paths.push({ loc: `/${slug3}`, changefreq: "weekly", priority: "0.7" });

    // Dynamic project paths
    const featuredProjects = dbData.featuredProjects || [];
    featuredProjects.forEach((p: any) => {
      if (p.title) {
        const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        paths.push({ loc: `/${slug}`, changefreq: "weekly", priority: "0.9" });
      }
    });

    const projects = dbData.projects || [];
    projects.forEach((p: any) => {
      if (p.title) {
        const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        paths.push({ loc: `/${slug}`, changefreq: "weekly", priority: "0.7" });
      }
    });

    // Build XML response
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    paths.forEach((p) => {
      xml += `  <url>\n`;
      xml += `    <loc>${domain}${p.loc}</loc>\n`;
      xml += `    <changefreq>${p.changefreq}</changefreq>\n`;
      xml += `    <priority>${p.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    res.header("Content-Type", "application/xml");
    return res.status(200).send(xml);
  } catch (err) {
    console.error("Error generating sitemap:", err);
    return res.status(500).send("Error generating sitemap");
  }
});

app.get(["/Rahul_Dutta_Resume.pdf", "/api/download-resume"], async (req, res) => {
  const localPath = path.join(DATA_DIR, "Rahul_Dutta_Resume.pdf");
  
  // Set headers to trigger direct attachment download instead of in-browser rendering
  res.setHeader("Content-Disposition", "attachment; filename=\"Rahul_Dutta_Resume.pdf\"");
  res.setHeader("Content-Type", "application/pdf");

  // Check if file is stored locally
  try {
    if (fs.existsSync(localPath)) {
      // res.download guarantees that attachment headers are set correctly and browser downloads directly
      return res.download(localPath, "Rahul_Dutta_Resume.pdf");
    }
  } catch (fsCheckErr) {
    console.warn("Local filesystem check failed (non-blocking):", fsCheckErr);
  }

  // If local file doesn't exist, retrieve from MongoDB and cache/serve it
  try {
    const { db } = await connectToDatabase();
    if (db) {
      const doc = await db.collection("resume").findOne({ _id: "main_data" as any });
      if (doc && doc.pdfBase64) {
        const buffer = Buffer.from(doc.pdfBase64, "base64");
        
        // Write locally so subsequent downloads are extremely fast and don't hit DB
        try {
          if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
          }
          fs.writeFileSync(localPath, buffer);
        } catch (cacheErr) {
          console.warn("Failed to write resume cache to local disk (non-blocking):", cacheErr);
        }
        
        return res.send(buffer);
      }
    }
  } catch (error) {
    console.error("Error fetching resume from database:", error);
  }

  // Final fallback if no resume has been uploaded yet
  res.removeHeader("Content-Disposition");
  res.removeHeader("Content-Type");
  return res.status(404).send("Rahul_Dutta_Resume.pdf is not available. Please upload it first from the admin panel.");
});

// POST - Secure Resume Upload Endpoint (Saves to MongoDB and caches to local disk)
app.post("/api/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token !== "session-token-rahuldutta-2026") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ success: false, message: "Only PDF files are allowed" });
    }

    const pdfBase64 = req.file.buffer.toString("base64");
    const localPath = path.join(DATA_DIR, "Rahul_Dutta_Resume.pdf");

    // Save locally (wrap in try-catch to be fully robust on Vercel)
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(localPath, req.file.buffer);
    } catch (cacheErr) {
      console.warn("Failed to write resume to local disk cache (non-blocking):", cacheErr);
    }

    // Save to MongoDB collection 'resume', replacing existing (so max 1 entry)
    const { db } = await connectToDatabase();
    if (db) {
      await db.collection("resume").updateOne(
        { _id: "main_data" as any },
        { $set: { pdfBase64, updatedAt: new Date().toISOString() } },
        { upsert: true }
      );
    }

    return res.json({
      success: true,
      message: "Resume uploaded successfully and renamed to Rahul_Dutta_Resume.pdf",
      url: "/Rahul_Dutta_Resume.pdf"
    });
  } catch (error: any) {
    console.error("Resume upload error in server:", error);
    return res.status(500).json({ success: false, message: error.message || "Upload failed" });
  }
});

// API - Auth Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const users = await getUsersData();
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      return res.json({
        success: true,
        token: "session-token-rahuldutta-2026",
        user: {
          id: user.id || "user-rahul",
          email: user.email,
          name: user.name || "Rahul Dutta",
          role: user.role || "admin"
        }
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid email or password. Please verify your credentials and try again."
    });
  } catch (error: any) {
    console.error("Login error on server:", error);
    return res.status(500).json({ success: false, message: "Internal server error during login." });
  }
});

// API - User Management Endpoints (for future scalability to add multiple users)
app.get("/api/users", async (req, res) => {
  const token = req.headers.authorization;
  if (token !== "session-token-rahuldutta-2026") {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
  try {
    const users = await getUsersData();
    // Return users list with passwords hidden or visible as needed for admin UI
    const safeUsers = users.map(({ password, ...u }: any) => u);
    res.json(safeUsers);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/api/users", async (req, res) => {
  const token = req.headers.authorization;
  if (token !== "session-token-rahuldutta-2026") {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    const users = await getUsersData();
    if (users.some((u: any) => u.email === email)) {
      return res.status(400).json({ success: false, message: "User with this email already exists" });
    }
    const newUser = {
      id: "user-" + Math.random().toString(36).substr(2, 9),
      email,
      password,
      name: name || "Team Member",
      role: role || "admin"
    };
    users.push(newUser);
    await saveUsersData(users);
    res.json({ success: true, user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// API - Projects
app.get("/api/projects", async (req, res) => {
  const projects = await getProjectsData();
  res.json(projects);
});

app.post("/api/projects", async (req, res) => {
  const token = req.headers.authorization;
  if (token !== "session-token-rahuldutta-2026") {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
  const projects = req.body;
  if (Array.isArray(projects)) {
    const saved = await saveProjectsData(projects);
    return res.json({ success: saved, data: projects });
  }
  return res.status(400).json({ success: false, message: "Invalid projects data" });
});

// API - Featured Projects (Dynamic CMS)
app.get("/api/featured-projects", async (req, res) => {
  const featuredProjects = await getFeaturedProjectsData();
  res.json(featuredProjects);
});

app.post("/api/featured-projects", async (req, res) => {
  const token = req.headers.authorization;
  if (token !== "session-token-rahuldutta-2026") {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
  const featuredProjects = req.body;
  if (Array.isArray(featuredProjects)) {
    const saved = await saveFeaturedProjectsData(featuredProjects);
    return res.json({ success: saved, data: featuredProjects });
  }
  return res.status(400).json({ success: false, message: "Invalid featured projects data" });
});

// API - Recent Works (Dynamic CMS)
app.get("/api/recent-works", async (req, res) => {
  const recentWorks = await getRecentWorksData();
  res.json(recentWorks);
});

app.post("/api/recent-works", async (req, res) => {
  const token = req.headers.authorization;
  if (token !== "session-token-rahuldutta-2026") {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
  const recentWorks = req.body;
  if (Array.isArray(recentWorks)) {
    const saved = await saveRecentWorksData(recentWorks);
    return res.json({ success: saved, data: recentWorks });
  }
  return res.status(400).json({ success: false, message: "Invalid recent works data" });
});

// API - Testimonials
app.get("/api/testimonials", async (req, res) => {
  const testimonials = await getTestimonialsData();
  res.json(testimonials);
});

app.post("/api/testimonials", async (req, res) => {
  const token = req.headers.authorization;
  if (token !== "session-token-rahuldutta-2026") {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
  const testimonials = req.body;
  if (Array.isArray(testimonials)) {
    const saved = await saveTestimonialsData(testimonials);
    return res.json({ success: saved, data: testimonials });
  }
  return res.status(400).json({ success: false, message: "Invalid testimonials data" });
});

// API - Blog Posts
app.get("/api/blog", async (req, res) => {
  const blogs = await getBlogData();
  res.json(blogs);
});

app.post("/api/blog", async (req, res) => {
  const token = req.headers.authorization;
  if (token !== "session-token-rahuldutta-2026") {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
  const blogs = req.body;
  if (Array.isArray(blogs)) {
    const saved = await saveBlogData(blogs);
    return res.json({ success: saved, data: blogs });
  }
  return res.status(400).json({ success: false, message: "Invalid blogs data" });
});

// API - Site Config
app.get("/api/site-config", async (req, res) => {
  const config = await getSiteConfigData();
  res.json(config);
});

app.post("/api/site-config", async (req, res) => {
  const token = req.headers.authorization;
  if (token !== "session-token-rahuldutta-2026") {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
  const config = req.body;
  if (config && typeof config === "object") {
    const saved = await saveSiteConfigData(config);
    return res.json({ success: saved, data: config });
  }
  return res.status(400).json({ success: false, message: "Invalid site config data" });
});

// API - Timeline Sections
app.get("/api/timeline-sections", async (req, res) => {
  const sections = await getTimelineSectionsData();
  res.json(sections);
});

app.post("/api/timeline-sections", async (req, res) => {
  const token = req.headers.authorization;
  if (token !== "session-token-rahuldutta-2026") {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
  const sections = req.body;
  if (Array.isArray(sections)) {
    const saved = await saveTimelineSectionsData(sections);
    return res.json({ success: saved, data: sections });
  }
  return res.status(400).json({ success: false, message: "Invalid timeline sections data" });
});

// API - Services (My Expertise)
app.get("/api/services", async (req, res) => {
  const services = await getServicesData();
  res.json(services);
});

app.post("/api/services", async (req, res) => {
  const token = req.headers.authorization;
  if (token !== "session-token-rahuldutta-2026") {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
  const services = req.body;
  if (Array.isArray(services)) {
    const saved = await saveServicesData(services);
    return res.json({ success: saved, data: services });
  }
  return res.status(400).json({ success: false, message: "Invalid services data" });
});

// API - Bookings
app.get("/api/bookings", async (req, res) => {
  const bookings = await getBookingsData();
  res.json(bookings);
});

app.post("/api/bookings", async (req, res) => {
  const booking = req.body;
  if (booking && typeof booking === "object") {
    const bookings = await getBookingsData();
    const email = (booking.email || "").trim().toLowerCase();
    const todayStr = new Date().toISOString().split("T")[0];

    // Load configuration to check limits
    const config = await getSiteConfigData();
    const limit = parseInt(config.bookingLimitPerEmail || "1", 10);
    const adminEmail = config.bookingNotificationEmail || "workprofile.uiux@gmail.com";

    // Active bookings must be on or after today (non-expired)
    const activeBookings = bookings.filter(
      (b: any) => b.email && b.email.toLowerCase() === email && b.date >= todayStr
    );

    if (activeBookings.length >= limit) {
      return res.status(400).json({
        success: false,
        message: `This email address has already reached the maximum booking limit of ${limit} active meeting(s). You cannot schedule another consultation until existing bookings expire.`
      });
    }

    // Inject ID, status, and timestamp if not present
    const newBooking = {
      id: booking.id || "bk-" + Date.now(),
      name: booking.name,
      email: booking.email,
      date: booking.date,
      timeSlot: booking.timeSlot,
      notes: booking.notes || "",
      adminNotes: booking.adminNotes || "",
      status: booking.status || "Pending",
      createdAt: booking.createdAt || new Date().toISOString()
    };

    bookings.push(newBooking);
    const saved = await saveBookingsData(bookings);

    if (saved) {
      // Trigger background email delivery safely without blocking response
      sendBookingEmails(newBooking, adminEmail).catch((err) => {
        console.error("Background booking email transmission failed:", err);
      });
    }

    return res.json({ success: saved, data: newBooking });
  }
  return res.status(400).json({ success: false, message: "Invalid booking data" });
});

app.post("/api/bookings/save-all", async (req, res) => {
  const token = req.headers.authorization;
  if (token !== "session-token-rahuldutta-2026") {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
  const bookings = req.body;
  if (Array.isArray(bookings)) {
    const saved = await saveBookingsData(bookings);
    return res.json({ success: saved, data: bookings });
  }
  return res.status(400).json({ success: false, message: "Invalid bookings data" });
});

// Contact API handler (Zod validation fallback or simple mock delivery success)
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Please fill out all required fields." });
  }
  console.log(`Received contact form from ${name} (${email}): Subject: ${subject}, Message: ${message}`);
  return res.json({ success: true, message: "Your message has been successfully logged! We will reach out shortly." });
});

// Serve static assets in production; run Vite dev server in development
async function handleHtmlInjection(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.method !== "GET" || !req.headers.accept?.includes("text/html")) {
    return next();
  }

  try {
    const url = req.originalUrl;
    let templatePath = "";
    if (process.env.NODE_ENV !== "production") {
      templatePath = path.join(process.cwd(), "index.html");
    } else {
      templatePath = path.join(process.cwd(), "dist", "index.html");
    }

    if (!fs.existsSync(templatePath)) {
      return next();
    }

    let html = await fs.promises.readFile(templatePath, "utf-8");

    // Fetch all MongoDB/JSON data
    const dbData = await getAllDatabaseData();

    // 100% Dynamic Title and Description Injection for SEO & Social Cards
    const siteTitle = dbData.siteConfig?.seoDefaultTitle || dbData.siteConfig?.siteTitle || "Rahul Dutta | Product Designer & Frontend Technologist";
    const siteDesc = dbData.siteConfig?.seoDefaultDescription || dbData.siteConfig?.siteDescription || "Official Portfolio of Rahul Dutta — Independent Product Designer & Frontend Engineer specializing in high-fidelity UI/UX design systems, SaaS landing pages, custom web architectures, and interactive React platforms.";
    const siteKeywords = dbData.siteConfig?.seoKeywords || "Rahul Dutta, Product Designer, UI/UX Designer, SaaS Landing Page, Figma Design Systems, Frontend Developer, React Engineer, Web Designer, Portfolio, Interaction Design, Freelance Designer, High Fidelity UI";
    const siteImage = dbData.siteConfig?.seoOgImage || dbData.siteConfig?.editorialProfilePic || "/assets/images/saas-landing-page-ui-ux-designer-background.webp";

    // Replace the title tag
    html = html.replace(/<title>.*?<\/title>/, `<title>${siteTitle}</title>`);

    // Replace or inject meta description
    if (html.includes('<meta name="description"')) {
      html = html.replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${siteDesc}" />`);
    } else {
      html = html.replace("</head>", `  <meta name="description" content="${siteDesc}" />\n</head>`);
    }

    // Replace or inject meta keywords
    if (html.includes('<meta name="keywords"')) {
      html = html.replace(/<meta name="keywords" content=".*?"\s*\/?>/, `<meta name="keywords" content="${siteKeywords}" />`);
    } else {
      html = html.replace("</head>", `  <meta name="keywords" content="${siteKeywords}" />\n</head>`);
    }

    // Build JSON-LD Structured Schema for 2026 AI Search Engine Indexing (Google, Bing, Perplexity, Claude)
    const jsonLdSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "https://rahuldutta.design/#person",
          "name": "Rahul Dutta",
          "jobTitle": dbData.siteConfig?.heroHeadline || "Product Designer & Frontend Technologist",
          "description": siteDesc,
          "image": siteImage,
          "url": "https://rahuldutta.design/",
          "knowsAbout": [
            "UI/UX Design Systems",
            "SaaS Landing Page Design",
            "High Fidelity Prototyping",
            "Frontend React Architecture",
            "TypeScript",
            "Figma Component Architecture"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://rahuldutta.design/#website",
          "url": "https://rahuldutta.design/",
          "name": siteTitle,
          "description": siteDesc,
          "publisher": { "@id": "https://rahuldutta.design/#person" }
        },
        {
          "@type": "ProfessionalService",
          "@id": "https://rahuldutta.design/#service",
          "name": "Rahul Dutta — UI/UX Design & Frontend Engineering",
          "description": siteDesc,
          "provider": { "@id": "https://rahuldutta.design/#person" },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Design & Development Services",
            "itemListElement": (dbData.services || []).map((s: any, idx: number) => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": s.title || `Service ${idx + 1}`,
                "description": s.description || ""
              }
            }))
          }
        }
      ]
    };

    const schemaScript = `
    <script type="application/ld+json">
      ${JSON.stringify(jsonLdSchema)}
    </script>
    `;

    // Ensure we inject Meta tags and Schema inside <head>
    const metaTags = `
    <meta property="og:title" content="${siteTitle}" />
    <meta property="og:description" content="${siteDesc}" />
    <meta property="og:image" content="${siteImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${siteTitle}" />
    <meta name="twitter:description" content="${siteDesc}" />
    <meta name="twitter:image" content="${siteImage}" />
    ${schemaScript}
    `;

    html = html.replace("</head>", `${metaTags}\n</head>`);

    // Inject state script
    const stateScript = `
    <script id="__INITIAL_STATE__">
      window.__INITIAL_DATA__ = ${JSON.stringify(dbData)};
    </script>
    `;
    html = html.replace("</head>", `${stateScript}\n</head>`);

    // Pre-render semantic static content inside <div id="root"> for 100% crawlability before hydration
    const preRenderedContent = `
    <div id="root">
      <div style="max-width:1200px;margin:0 auto;padding:2rem;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#18181b;">
        <header>
          <h1 style="font-size:2.25rem;font-weight:700;letter-spacing:-0.025em;margin-bottom:0.75rem;">${siteTitle}</h1>
          <p style="font-size:1.125rem;line-height:1.65;color:#52525b;max-width:48rem;">${siteDesc}</p>
        </header>
        <main style="margin-top:2.5rem;">
          <section>
            <h2 style="font-size:1.5rem;font-weight:600;margin-bottom:1rem;">Selected Works & Case Studies</h2>
            <ul style="list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem;">
              ${(dbData.recentWorks || []).slice(0, 6).map((w: any) => `
                <li style="border:1px solid #e4e4e7;border-radius:0.75rem;padding:1.25rem;">
                  <h3 style="font-size:1.125rem;font-weight:600;margin-bottom:0.5rem;">${w.title || ''}</h3>
                  <p style="font-size:0.875rem;color:#71717a;line-height:1.5;">${w.description || ''}</p>
                </li>
              `).join('')}
            </ul>
          </section>
        </main>
      </div>
    </div>
    `;

    html = html.replace(/<div id="root"><\/div>/, preRenderedContent);

    const vite = app.get("vite");
    if (process.env.NODE_ENV !== "production" && vite) {
      html = await vite.transformIndexHtml(url, html);
    }

    // Compute simple ETag version hash based on injected database payload
    const dataString = JSON.stringify(dbData);
    let hash = 0;
    for (let i = 0; i < dataString.length; i++) {
      hash = (hash << 5) - hash + dataString.charCodeAt(i);
      hash |= 0;
    }
    const etag = `W/"v1-${Math.abs(hash).toString(36)}"`;

    if (req.headers["if-none-match"] === etag) {
      return res.status(304).end();
    }

    res.status(200).set({
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache, must-revalidate",
      "ETag": etag,
    }).end(html);
  } catch (err) {
    console.error("HTML injection error:", err);
    next(err);
  }
}

if (!process.env.VERCEL) {
  async function startStandalone() {
    console.log("Checking database connection on startup...");
    try {
      const { db } = await connectToDatabase();
      if (!db) {
        console.error("=================================================");
        console.error("CRITICAL ERROR: Failed to connect to MongoDB Atlas on startup!");
        console.error("Please verify your MONGODB_URI or network connection.");
        console.error("=================================================");
      } else {
        console.log("Successfully verified stable connection to MongoDB Atlas!");
      }
    } catch (err) {
      console.error("=================================================");
      console.error("CRITICAL ERROR: Exception occurred during startup database connection check:", err);
      console.error("=================================================");
    }

    if (process.env.NODE_ENV !== "production") {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.set("vite", vite);
      
      // Mount HTML injection middleware before vite middlewares
      app.use(handleHtmlInjection);
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), "dist");
      // Mount HTML injection middleware first so GET requests for pages receive injected database state instantly
      app.use(handleHtmlInjection);
      app.use(express.static(distPath));
      app.get("*", handleHtmlInjection);
    }

    const PORT = 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
  startStandalone();
}

export default app;
