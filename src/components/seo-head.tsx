import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { pageview } from "@/lib/gtag";

export interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  ogImage?: string;
  type?: "website" | "article";
  structuredData?: object | object[];
}

const DEFAULT_TITLE = "Prowexa Technologies | Software Development Company Pune | Build Fast. Scale Smart.";
const DEFAULT_DESCRIPTION =
  "Prowexa Technologies Pvt. Ltd. is a top software development company in Pune, India. We build scalable products, React & Flutter mobile apps, AI solutions, and custom ERP/CRM software.";
const DEFAULT_KEYWORDS =
  "Prowexa Technologies, Software Development Company Pune, IT Company Pune, Website Development Pune, Mobile App Development, Flutter Development, React Development, AI Development, ERP Development, CRM Development, Cloud Solutions, Custom Software Development India";
const SITE_URL = "https://prowexa.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/favicon.png`;

export function SEOHead({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalPath,
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
  structuredData,
}: SEOHeadProps) {
  const location = useLocation();
  const currentPath = canonicalPath || location.pathname;
  const fullCanonicalUrl = `${SITE_URL}${currentPath === "/" ? "" : currentPath}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Helper to set or update meta tag
    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Standard Meta Tags
    setMetaTag('meta[name="description"]', "name", "description", description);
    setMetaTag('meta[name="keywords"]', "name", "keywords", keywords);
    setMetaTag('meta[name="robots"]', "name", "robots", "index, follow");
    setMetaTag('meta[name="author"]', "name", "author", "Prowexa Technologies Pvt. Ltd.");

    // Open Graph Tags
    setMetaTag('meta[property="og:title"]', "property", "og:title", title);
    setMetaTag('meta[property="og:description"]', "property", "og:description", description);
    setMetaTag('meta[property="og:url"]', "property", "og:url", fullCanonicalUrl);
    setMetaTag('meta[property="og:type"]', "property", "og:type", type);
    setMetaTag('meta[property="og:site_name"]', "property", "og:site_name", "Prowexa Technologies");
    setMetaTag('meta[property="og:image"]', "property", "og:image", ogImage);

    // Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMetaTag('meta[name="twitter:image"]', "name", "twitter:image", ogImage);

    // Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", fullCanonicalUrl);

    // GA4 Pageview tracking on route change
    pageview(currentPath);

    // Structured Data JSON-LD
    const existingScript = document.getElementById("json-ld-structured-data");
    if (existingScript) {
      existingScript.remove();
    }

    if (structuredData) {
      const script = document.createElement("script");
      script.id = "json-ld-structured-data";
      script.type = "application/ld+json";
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, fullCanonicalUrl, currentPath, ogImage, type, structuredData]);

  return null;
}

// Pre-packaged Schema Generators
export const defaultOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Prowexa Technologies Pvt. Ltd.",
  "url": "https://prowexa.com",
  "logo": "https://prowexa.com/favicon.png",
  "description": "Next-generation product development solutions from MVP to scale. React, Flutter, AI, and Cloud solutions.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Survey No 44 H. No. 8/1 (P, Plot A, opp. Bhartiya Vidyapeeth School, Balewadi",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "postalCode": "411045",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-7030347209",
    "contactType": "customer service",
    "email": "info@prowexa.com",
    "availableLanguage": ["English", "Hindi", "Marathi"]
  },
  "sameAs": [
    "https://prowexa.com"
  ]
};

export const defaultLocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Prowexa Technologies",
  "image": "https://prowexa.com/favicon.png",
  "@id": "https://prowexa.com/#organization",
  "url": "https://prowexa.com",
  "telephone": "+917030347209",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Survey No 44 H. No. 8/1 (P, Plot A, opp. Bhartiya Vidyapeeth School, Balewadi",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "postalCode": "411045",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 18.5793,
    "longitude": 73.7712
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "19:00"
  }
};
