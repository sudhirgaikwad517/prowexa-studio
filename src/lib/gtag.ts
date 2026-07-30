// Google Analytics 4 (GA4) Utility Library

export const GA_TRACKING_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-PROWEXA2026";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

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
