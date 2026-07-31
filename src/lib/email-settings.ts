export interface EmailConfigSettings {
  emailLogoUrl: string;
  hrSenderName: string;
  hrSenderEmail: string;
  hrSignatureName: string;
  hrSignatureDesignation: string;
  businessSenderName: string;
  businessSenderEmail: string;
  businessSignatureName: string;
  businessSignatureDesignation: string;
  companyAddress: string;
  companyPhone: string;
}

export const defaultEmailSettings: EmailConfigSettings = {
  emailLogoUrl: "https://www.prowexa.com/assets/prowexa-logo.webp",
  hrSenderName: "Prowexa Talent Acquisition",
  hrSenderEmail: "hr@prowexa.com",
  hrSignatureName: "Team Talent Acquisition",
  hrSignatureDesignation: "Human Resources & Hiring | Prowexa Technologies",
  businessSenderName: "Prowexa Technologies",
  businessSenderEmail: "connect@prowexa.com",
  businessSignatureName: "Enterprise Client Solutions Team",
  businessSignatureDesignation: "Software Engineering & Digital Transformation | Prowexa Technologies",
  companyAddress: "Survey No 44, Plot A, Opp. Bhartiya Vidyapeeth School, Balewadi, Pune - 411045",
  companyPhone: "+91 7030347209",
};

export function getEmailSettings(): EmailConfigSettings {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("prowexa_email_settings");
    if (saved) {
      try {
        return { ...defaultEmailSettings, ...JSON.parse(saved) };
      } catch (e) {
        // fallback
      }
    }
  }
  return defaultEmailSettings;
}

export function saveEmailSettings(settings: EmailConfigSettings) {
  if (typeof window !== "undefined") {
    localStorage.setItem("prowexa_email_settings", JSON.stringify(settings));
  }
}
