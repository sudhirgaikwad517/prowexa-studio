-- Prowexa Technologies database schema (PostgreSQL 13+)
-- Run with: npm run db:migrate   (uses DATABASE_URL)
-- Safe to re-run: every statement is idempotent.

-- 1. Contact inquiries, academy enquiries and job applications
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT NOT NULL DEFAULT 'custom-software',
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);

-- 2. Case studies
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  client TEXT NOT NULL,
  industry TEXT NOT NULL,
  summary TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  results TEXT[] NOT NULL DEFAULT '{}',
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  metrics JSONB NOT NULL DEFAULT '{}',
  cover_image TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Testimonials (submissions stay hidden until an admin approves them)
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'client' CHECK (type IN ('client', 'academy')),
  quote TEXT NOT NULL,
  company_or_course TEXT,
  rating INT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  avatar_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Blogs (submissions stay hidden until an admin approves them)
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT NOT NULL DEFAULT 'Prowexa Engineering Team',
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Admin email OTPs (only a SHA-256 hash of the code is stored)
CREATE TABLE IF NOT EXISTS admin_otps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_email TEXT NOT NULL,
  otp_hash TEXT NOT NULL,
  attempts INT NOT NULL DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  is_used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS admin_otps_email_idx ON admin_otps (admin_email, created_at DESC);

-- 6. Admin sessions (cookie holds a random token; only its SHA-256 hash is stored)
CREATE TABLE IF NOT EXISTS admin_sessions (
  token_hash TEXT PRIMARY KEY,
  admin_email TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
