// Prowexa Technologies Supabase Configuration

const rawUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.SUPABASE_URL ||
  "https://yqsctsifrdooaepmycby.supabase.co";

// Clean and sanitize Supabase base URL (strips unwanted /rest/v1 suffixes)
export const SUPABASE_URL = rawUrl
  .trim()
  .replace(/\/rest\/v1\/?$/i, "")
  .replace(/\/+$/, "");

export const SUPABASE_ANON_KEY = (
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlxc2N0c2lmcmRvb2FlcG15Y2J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0MTk3MjgsImV4cCI6MjEwMDk5NTcyOH0.J5lJtwz7v8xHStNEkK3xOmHGa87lV0cP7I-yJv7pxi8"
).trim();
