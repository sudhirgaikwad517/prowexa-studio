-- Prowexa Technologies Complete Database Schema (Supabase / PostgreSQL)

-- 1. Leads & Contact Form Submissions Table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT NOT NULL DEFAULT 'custom-software',
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'client', -- 'client' or 'academy'
  quote TEXT NOT NULL,
  company_or_course TEXT,
  rating INT DEFAULT 5,
  avatar_url TEXT,
  is_published BOOLEAN DEFAULT false, -- Requires admin approval by default
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Blogs & Articles Table
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT DEFAULT 'Prowexa Engineering Team',
  is_published BOOLEAN DEFAULT false, -- Requires admin approval by default
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Case Studies Table
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

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Table Grants
GRANT ALL ON TABLE public.leads TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.testimonials TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.blogs TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.case_studies TO anon, authenticated, service_role;

-- Policies for public lead generation
DROP POLICY IF EXISTS "Allow public insert for leads" ON public.leads;
CREATE POLICY "Allow public insert for leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Policies for public testimonials
DROP POLICY IF EXISTS "Allow public read for testimonials" ON public.testimonials;
CREATE POLICY "Allow public read for testimonials" ON public.testimonials FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow public insert for testimonials" ON public.testimonials;
CREATE POLICY "Allow public insert for testimonials" ON public.testimonials FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Policies for public blogs
DROP POLICY IF EXISTS "Allow public read for blogs" ON public.blogs;
CREATE POLICY "Allow public read for blogs" ON public.blogs FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Allow public insert for blogs" ON public.blogs;
CREATE POLICY "Allow public insert for blogs" ON public.blogs FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Policies for public case studies
DROP POLICY IF EXISTS "Allow public read for case studies" ON public.case_studies;
CREATE POLICY "Allow public read for case studies" ON public.case_studies FOR SELECT USING (is_published = true);
