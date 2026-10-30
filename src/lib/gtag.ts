// Google Analytics 4 (GA4) Utility Library

// Set VITE_GA_MEASUREMENT_ID (e.g. G-XXXXXXXXXX) in the environment to enable tracking.
export const GA_TRACKING_ID: string = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Load the GA4 script once, only when a measurement ID is configured
export const initAnalytics = () => {
  if (typeof window === "undefined" || !GA_TRACKING_ID || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_TRACKING_ID);
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);
};

// Track page view
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Generic event tracking
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Specific Conversion Trackers
export const trackContactFormSubmit = (service?: string) => {
  event({
    action: "submit_form",
    category: "Contact",
    label: service || "General Inquiry",
  });
};

export const trackWhatsAppClick = () => {
  event({
    action: "whatsapp_chat_click",
    category: "Engagement",
    label: "WhatsApp Floating Button",
  });
};

export const trackPhoneClick = () => {
  event({
    action: "phone_call_click",
    category: "Contact",
    label: "+91 7030347209",
  });
};

export const trackEmailClick = () => {
  event({
    action: "email_click",
    category: "Contact",
    label: "info@prowexa.com",
  });
};

export const trackCTAClick = (ctaName: string) => {
  event({
    action: "cta_click",
    category: "Navigation",
    label: ctaName,
  });
};
