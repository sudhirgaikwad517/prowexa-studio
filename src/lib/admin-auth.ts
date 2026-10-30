import { apiFetch, jsonBody } from "./http";

type AuthResult = { success: boolean; message: string };

// All checks happen on the server (/api/auth); the session lives in an HttpOnly cookie.
export async function requestAdminOTP(email: string): Promise<AuthResult> {
  const result = await apiFetch("/api/auth", { method: "POST", body: jsonBody({ action: "request", email }) });
  return {
    success: result.success,
    message: result.success ? String(result.message || "Security OTP sent.") : result.error || "Could not send OTP.",
  };
}

export async function verifyAdminOTP(email: string, otp: string): Promise<AuthResult> {
  const result = await apiFetch("/api/auth", { method: "POST", body: jsonBody({ action: "verify", email, otp }) });
  return {
    success: result.success,
    message: result.success ? String(result.message || "Verified.") : result.error || "Invalid OTP code.",
  };
}

export async function getAdminSession(): Promise<{ authenticated: boolean; email: string | null }> {
  const result = await apiFetch("/api/auth");
  return { authenticated: Boolean(result.authenticated), email: (result.email as string) || null };
}

export async function logoutAdmin() {
  await apiFetch("/api/auth", { method: "POST", body: jsonBody({ action: "logout" }) });
}
