import { createClient } from "@supabase/supabase-js";

// Read Supabase environment variables across all potential naming conventions
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  "";

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[Supabase Initialization Warning]: Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables in Vercel settings."
  );
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export { supabaseUrl, supabaseAnonKey };
