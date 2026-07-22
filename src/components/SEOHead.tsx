/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { SiteConfig } from "../types";

interface SEOHeadProps {
  currentPage: string;
  projectTitle?: string;
  projectDescription?: string;
  brandName?: string;
  siteConfig?: SiteConfig;
}

export default function SEOHead({ currentPage, projectTitle, projectDescription, brandName = "Rahul", siteConfig }: SEOHeadProps) {
  useEffect(() => {
    // 1. Determine Title & Meta Description based on siteConfig inputs or defaults
    const defaultTitle = siteConfig?.seoDefaultTitle || `${brandName} | Product Designer & Frontend Engineer`;
    const defaultDesc = siteConfig?.seoDefaultDescription || "Rahul is a multidisciplinary Product Designer and Frontend Engineer who designs and crafts high-fidelity digital interfaces and fluid modern user experiences.";

    let title = defaultTitle;
    let description = defaultDesc;

    switch (currentPage) {
      case "home":
        title = defaultTitle;
        description = defaultDesc;
        break;
      case "projects":
        title = `Projects | ${brandName} Portfolio`;
        description = "A curated display of premium responsive platforms, custom full-stack software, and high-fidelity design systems built with absolute focus.";
        break;
      case "about":
        title = `About | ${brandName}'s Journey`;
        description = "Learn more about Rahul's journey from engineering to product design, design philosophy, credentials, and work history.";
        break;
      case "testimonials":
        title = `Testimonials | Client Reviews`;
        description = "Read honest reviews and feedback from founders, CEOs, and developers who have partnered with Rahul to build high-performance products.";
        break;
      case "blog":
        title = `Blog & Industry Insights | ${brandName}`;
        description = "Read Rahul's insights on design engineering, product strategy, high-fidelity UI layout, and scalable web solutions.";
        break;
      case "contact":
        title = `Contact & Slot Booking | ${brandName}`;
        description = "Get in touch or book an executive 15-minute consultation slot directly with Rahul.";
        break;
      case "project-detail":
        title = projectTitle ? `${projectTitle} Case Study | ${brandName}` : `Project Details | ${brandName}`;
        description = projectDescription || `Detailed view of ${projectTitle || "featured design project"} covering architecture, Figma frameworks, and engineering outcomes.`;
        break;
      case "admin":
        title = `Admin Control Console | ${brandName}`;
        description = "Secure management system to edit site configurations, project cards, and testimonials.";
        break;
      default:
        break;
    }

    // 2. Set document title
    document.title = title;

    // 3. Update meta description dynamically
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // 4. Update Meta Keywords dynamically
    if (siteConfig?.seoKeywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", siteConfig.seoKeywords);
    }

    // 5. Update Google Verification tag dynamically
    if (siteConfig?.seoGoogleVerification) {
      let metaVerify = document.querySelector('meta[name="google-site-verification"]');
      if (!metaVerify) {
        metaVerify = document.createElement("meta");
        metaVerify.setAttribute("name", "google-site-verification");
        document.head.appendChild(metaVerify);
      }
      metaVerify.setAttribute("content", siteConfig.seoGoogleVerification);
    }

    // 6. Update Author tag dynamically
    let metaAuthor = document.querySelector('meta[name="author"]');
    if (!metaAuthor) {
      metaAuthor = document.createElement("meta");
      metaAuthor.setAttribute("name", "author");
      document.head.appendChild(metaAuthor);
    }
    metaAuthor.setAttribute("content", siteConfig?.seoAuthorName || "Rahul Dutta");

    // 7. Update OpenGraph and Twitter Meta Tags
    const updateMetaTag = (attr: string, value: string, propValue: string) => {
      let el = document.querySelector(`meta[${attr}="${propValue}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, propValue);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    updateMetaTag("property", title, "og:title");
    updateMetaTag("property", description, "og:description");
    updateMetaTag("property", "website", "og:type");
    updateMetaTag("property", window.location.href, "og:url");

    const defaultOgImage = siteConfig?.seoOgImage || siteConfig?.editorialProfilePic || "/assets/images/saas-landing-page-ui-ux-designer-background.webp";
    updateMetaTag("property", defaultOgImage, "og:image");
    updateMetaTag("name", defaultOgImage, "twitter:image");

    updateMetaTag("name", "summary_large_image", "twitter:card");
    updateMetaTag("name", title, "twitter:title");
    updateMetaTag("name", description, "twitter:description");

    // 8. Dynamic Google Analytics tracking snippet injection
    const gaId = siteConfig?.seoAnalyticsId;
    if (gaId && gaId !== "G-MEASUREMENTID") {
      // Remove old tags if any
      const existingScript = document.getElementById("google-analytics-script");
      const existingInjected = document.getElementById("google-analytics-injected");
      if (existingScript) existingScript.remove();
      if (existingInjected) existingInjected.remove();

      // Script 1: Load gtag
      const script1 = document.createElement("script");
      script1.id = "google-analytics-script";
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script1);

      // Script 2: Init code
      const script2 = document.createElement("script");
      script2.id = "google-analytics-injected";
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}', { page_path: window.location.pathname });
      `;
      document.head.appendChild(script2);
    }

    // 9. Structured Rich Results (JSON-LD Schema Markup)
    let schemaScript = document.getElementById("seo-schema-jsonld");
    if (schemaScript) schemaScript.remove();

    schemaScript = document.createElement("script");
    schemaScript.id = "seo-schema-jsonld";
    schemaScript.setAttribute("type", "application/ld+json");

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": siteConfig?.seoAuthorName || "Rahul Dutta",
      "jobTitle": siteConfig?.seoAuthorJobTitle || "Independent Product Designer & Frontend Engineer",
      "url": window.location.origin,
      "image": siteConfig?.seoOgImage || "",
      "sameAs": siteConfig?.seoAuthorSameAs 
        ? siteConfig.seoAuthorSameAs.split(",").map(url => url.trim()).filter(Boolean) 
        : ["https://linkedin.com/in/ui-ux-rahul", "https://www.behance.net/ui-ux-rahul", "https://www.fiverr.com/s/akRBXg8"]
    };

    schemaScript.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(schemaScript);

    // 10. Canonical URL & Robots Meta
    if (siteConfig?.seoCanonicalUrl) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute("href", siteConfig.seoCanonicalUrl);
    }

    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute("content", siteConfig?.seoNoIndex ? "noindex, nofollow" : "index, follow");

  }, [currentPage, projectTitle, projectDescription, brandName, siteConfig]);

  // Dynamic component renders nothing visible
  return null;
}
