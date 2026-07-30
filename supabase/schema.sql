-- Prowexa Technologies Database Schema (Supabase / PostgreSQL)

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
  is_published BOOLEAN DEFAULT true,
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
  is_published BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous inserts for leads/contact form
CREATE POLICY "Allow public insert for leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Allow public read access for published testimonials and blogs
CREATE POLICY "Allow public read for testimonials" ON public.testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read for blogs" ON public.blogs FOR SELECT USING (is_published = true);
