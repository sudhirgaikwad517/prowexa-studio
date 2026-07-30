import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// Initialize Supabase Client
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseKey =
  process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

// 1. Healthcheck Route
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Prowexa Technologies Express API",
    hasDatabase: Boolean(supabase),
    timestamp: new Date().toISOString(),
  });
});

// 2. Submit Lead / Contact Form Route
app.post(["/api/leads", "/api/contact"], async (req, res) => {
  try {
    const { name, email, company, service, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields (name, email, message)",
      });
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
        console.error("Supabase insert error:", error);
        return res.status(500).json({
          success: false,
          error: error.message || "Failed to save lead in database",
        });
      }

      return res.status(201).json({
        success: true,
        message: "Inquiry submitted successfully",
        data: data ? data[0] : leadData,
      });
    }

    // Fallback mode if Supabase keys are not yet configured in environment
    console.log("[Express API - Mock Lead Received]:", leadData);
    return res.status(201).json({
      success: true,
      message: "Inquiry received (Mock Mode - set Supabase env keys to save to DB)",
      data: leadData,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Express API error:", errorMessage);
    return res.status(500).json({ success: false, error: errorMessage });
  }
});

// 3. Get Testimonials Route
app.get("/api/testimonials", async (_req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return res.json({ success: true, data });
      }
    }

    return res.json({
      success: true,
      source: "fallback",
      data: [
        {
          name: "Siddharth Mehta",
          role: "CTO, CapitalVibe Inc.",
          type: "client",
          quote:
            "Prowexa Technologies helped us completely re-architect our monolithic backend. Their engineers integrated seamlessly with our core team.",
          company_or_course: "CapitalVibe",
        },
        {
          name: "Sanjana Sharma",
          role: "Founder, DocuMind Legal",
          type: "client",
          quote:
            "We partnered with Prowexa to build our core Generative AI legal analysis tool. Shipped a fully functional beta within 3 months.",
          company_or_course: "DocuMind",
        },
      ],
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return res.status(500).json({ success: false, error: errorMessage });
  }
});

// 4. Get Blogs Route
app.get("/api/blogs", async (_req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (!error && data) {
        return res.json({ success: true, data });
      }
    }

    return res.json({
      success: true,
      source: "fallback",
      data: [],
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return res.status(500).json({ success: false, error: errorMessage });
  }
});

export default app;
