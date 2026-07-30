// Prowexa Technologies Supabase Configuration

const rawUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.SUPABASE_URL ||
  "";

// Clean and sanitize Supabase base URL (strips unwanted /rest/v1 suffixes)
export const SUPABASE_URL = rawUrl
  .trim()
  .replace(/\/rest\/v1\/?$/i, "")
  .replace(/\/+$/, "");

export const SUPABASE_ANON_KEY = (
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.SUPABASE_ANON_KEY ||
  ""
).trim();
