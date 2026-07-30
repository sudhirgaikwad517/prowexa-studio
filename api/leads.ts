import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseKey =
  process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, email, company, service, budget, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields (name, email, message)" });
    }

    const leadData = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      company: company ? String(company).trim() : null,
      service: service ? String(service).trim() : "custom-software",
      budget: budget ? String(budget).trim() : null,
      message: String(message).trim(),
      status: "new",
      created_at: new Date().toISOString(),
    };

    if (supabase) {
      const { data, error } = await supabase.from("leads").insert([leadData]).select();

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(201).json({ success: true, data: data ? data[0] : leadData });
    }

    return res.status(201).json({ success: true, data: leadData, mock: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return res.status(500).json({ error: msg });
  }
}
