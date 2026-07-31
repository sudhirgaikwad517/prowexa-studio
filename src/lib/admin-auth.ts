import { triggerEmailNotification } from "./email-service";

interface StoredOTP {
  email: string;
  otp: string;
  expiresAt: number;
}

// In-memory / LocalStorage OTP cache
const OTP_CACHE_KEY = "prowexa_admin_otp_pending";

export async function requestAdminOTP(email: string): Promise<{ success: boolean; message: string }> {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !cleanEmail.includes("@")) {
    return { success: false, message: "Please enter a valid admin email address." };
  }

  // Generate 6-digit cryptographic random OTP code
  const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 Minutes Expiry

  const otpPayload: StoredOTP = {
    email: cleanEmail,
    otp: generatedOTP,
    expiresAt,
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(OTP_CACHE_KEY, JSON.stringify(otpPayload));
  }

  // Trigger MNC Security OTP Email
  const res = await triggerEmailNotification({
    type: "admin_otp" as any,
    recipientEmail: cleanEmail,
    recipientName: "Prowexa Executive Admin",
    details: {
      otp: generatedOTP,
    },
  });

  if (res.success) {
    return {
      success: true,
      message: `Security OTP sent to ${cleanEmail}! Please check your email inbox.`,
    };
  }

  return {
    success: false,
    message: "Failed to send OTP email. Please check your SMTP server settings.",
  };
}

export function verifyAdminOTP(email: string, otpInput: string): { success: boolean; message: string } {
  const cleanEmail = email.trim().toLowerCase();
  const cleanOTP = otpInput.trim();

  if (typeof window === "undefined") {
    return { success: false, message: "Window context not found." };
  }

  const cachedStr = localStorage.getItem(OTP_CACHE_KEY);
  if (!cachedStr) {
    return { success: false, message: "No active OTP request found. Please request a new OTP." };
  }

  try {
    const cachedOTP: StoredOTP = JSON.parse(cachedStr);

    if (cachedOTP.email !== cleanEmail) {
      return { success: false, message: "Email mismatch. Please request OTP for this email address." };
    }

    if (Date.now() > cachedOTP.expiresAt) {
      localStorage.removeItem(OTP_CACHE_KEY);
      return { success: false, message: "OTP code has expired. Please click 'Resend OTP'." };
    }

    if (cachedOTP.otp !== cleanOTP) {
      return { success: false, message: "Invalid OTP code. Please enter the 6-digit code sent to your email." };
    }

    // OTP Verified Successfully!
    localStorage.removeItem(OTP_CACHE_KEY);
    localStorage.setItem("prowexa_admin_authed", "true");
    localStorage.setItem("prowexa_admin_email", cleanEmail);
    return { success: true, message: "Admin OTP Verified! Unlocking Executive Dashboard..." };
  } catch (e) {
    return { success: false, message: "Invalid OTP session data." };
  }
}
