-- Prowexa Technologies Complete Enterprise Database Schema (Supabase / PostgreSQL)
-- Executable in Supabase SQL Editor or standard PostgreSQL

-- 1. Contact Inquiries & General Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT NOT NULL DEFAULT 'custom-software',
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'archived'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Job Applications Table (Dedicated Candidate Recruitment Portal)
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_name TEXT NOT NULL,
  candidate_email TEXT NOT NULL,
  candidate_phone TEXT,
  role_title TEXT NOT NULL,
  experience_level TEXT,
  portfolio_url TEXT,
  cover_note TEXT,
  status TEXT NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'rejected', 'hired'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Case Studies Table (Enterprise Solutions Showcase)
CREATE TABLE IF NOT EXISTS public.case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  client TEXT NOT NULL,
  industry TEXT NOT NULL,
  summary TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  results TEXT[] DEFAULT '{}',
  tech_stack TEXT[] DEFAULT '{}',
  metrics JSONB DEFAULT '{}',
  cover_image TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Testimonials & Client Reviews Table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'client', -- 'client' or 'academy'
  quote TEXT NOT NULL,
  company_or_course TEXT,
  rating INT DEFAULT 5,
  avatar_url TEXT,
  is_published BOOLEAN DEFAULT false, -- Requires admin approval
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Blogs & Articles Table
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT DEFAULT 'Prowexa Engineering Team',
  is_published BOOLEAN DEFAULT false, -- Requires admin approval
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Email Settings & Multi-Alias Signatures Table
CREATE TABLE IF NOT EXISTS public.email_settings (
  id INT PRIMARY KEY DEFAULT 1,
  email_logo_url TEXT DEFAULT 'https://www.prowexa.com/assets/prowexa-logo.webp',
  hr_sender_name TEXT DEFAULT 'Prowexa Talent Acquisition',
  hr_sender_email TEXT DEFAULT 'hr@prowexa.com',
  hr_signature_name TEXT DEFAULT 'Team Talent Acquisition',
  hr_signature_designation TEXT DEFAULT 'Human Resources & Hiring | Prowexa Technologies',
  business_sender_name TEXT DEFAULT 'Prowexa Technologies',
  business_sender_email TEXT DEFAULT 'connect@prowexa.com',
  business_signature_name TEXT DEFAULT 'Enterprise Client Solutions Team',
  business_signature_designation TEXT DEFAULT 'Software Engineering & Digital Transformation | Prowexa Technologies',
  company_address TEXT DEFAULT 'Survey No 44, Plot A, Opp. Bhartiya Vidyapeeth School, Balewadi, Pune - 411045',
  company_phone TEXT DEFAULT '+91 7030347209',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- 7. Admin Security Email OTP Sessions Table
CREATE TABLE IF NOT EXISTS public.admin_otps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_email TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  is_used BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) across all tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_otps ENABLE ROW LEVEL SECURITY;

-- Grant API Table Access
GRANT ALL ON TABLE public.leads TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.job_applications TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.case_studies TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.testimonials TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.blogs TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.email_settings TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.admin_otps TO anon, authenticated, service_role;

-- Public RLS Policies
DROP POLICY IF EXISTS "Allow public insert for leads" ON public.leads;
CREATE POLICY "Allow public insert for leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public insert for job_applications" ON public.job_applications;
CREATE POLICY "Allow public insert for job_applications" ON public.job_applications FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read for case_studies" ON public.case_studies;
CREATE POLICY "Allow public read for case_studies" ON public.case_studies FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow public read for testimonials" ON public.testimonials;
CREATE POLICY "Allow public read for testimonials" ON public.testimonials FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow public read for blogs" ON public.blogs;
CREATE POLICY "Allow public read for blogs" ON public.blogs FOR SELECT TO anon, authenticated USING (true);
