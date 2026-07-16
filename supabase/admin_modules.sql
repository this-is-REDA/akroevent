-- Modules admin Akro Event (exécuter dans Supabase SQL Editor)
-- FAQ, Univers, Blog, Témoignages, Médias, Messages, Redirections, Profils, Analytics/Notifications

-- ========== FAQ ==========
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS faqs_sort_idx ON faqs (sort_order ASC, created_at DESC);
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published faqs" ON faqs;
CREATE POLICY "Public read published faqs" ON faqs FOR SELECT TO anon, authenticated USING (is_published = true);
DROP POLICY IF EXISTS "Admin all faqs" ON faqs;
CREATE POLICY "Admin all faqs" ON faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ========== UNIVERS ==========
CREATE TABLE IF NOT EXISTS univers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL DEFAULT '',
  caption TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  image_alt TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  details JSONB NOT NULL DEFAULT '[]'::jsonb,
  categories JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS univers_sort_idx ON univers (sort_order ASC);
ALTER TABLE univers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published univers" ON univers;
CREATE POLICY "Public read published univers" ON univers FOR SELECT TO anon, authenticated USING (is_published = true);
DROP POLICY IF EXISTS "Admin all univers" ON univers;
CREATE POLICY "Admin all univers" ON univers FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ========== BLOG ==========
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT NOT NULL DEFAULT '',
  cover_image_alt TEXT NOT NULL DEFAULT '',
  seo_title TEXT NOT NULL DEFAULT '',
  seo_description TEXT NOT NULL DEFAULT '',
  published_at TIMESTAMPTZ,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS blog_posts_public_idx ON blog_posts (published_at DESC) WHERE is_published = true;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published blog" ON blog_posts;
CREATE POLICY "Public read published blog" ON blog_posts FOR SELECT TO anon, authenticated USING (is_published = true);
DROP POLICY IF EXISTS "Admin all blog" ON blog_posts;
CREATE POLICY "Admin all blog" ON blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ========== TEMOIGNAGES ==========
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  company_name TEXT NOT NULL DEFAULT '',
  role_title TEXT NOT NULL DEFAULT '',
  quote TEXT NOT NULL,
  rating SMALLINT CHECK (rating IS NULL OR (rating BETWEEN 1 AND 5)),
  avatar_url TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS testimonials_sort_idx ON testimonials (sort_order ASC);
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published testimonials" ON testimonials;
CREATE POLICY "Public read published testimonials" ON testimonials FOR SELECT TO anon, authenticated USING (is_published = true);
DROP POLICY IF EXISTS "Admin all testimonials" ON testimonials;
CREATE POLICY "Admin all testimonials" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ========== MEDIAS ==========
CREATE TABLE IF NOT EXISTS media_assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT NOT NULL DEFAULT '',
  label TEXT NOT NULL DEFAULT '',
  mime_type TEXT NOT NULL DEFAULT '',
  file_size INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read media" ON media_assets;
CREATE POLICY "Public read media" ON media_assets FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Admin all media" ON media_assets;
CREATE POLICY "Admin all media" ON media_assets FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ========== MESSAGES CONTACT ==========
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'nouveau' CHECK (status IN ('nouveau', 'en_cours', 'traite', 'archive')),
  source TEXT NOT NULL DEFAULT 'contact',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS contact_messages_created_idx ON contact_messages (created_at DESC);
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public insert contact messages" ON contact_messages;
CREATE POLICY "Public insert contact messages" ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Admin read contact messages" ON contact_messages;
CREATE POLICY "Admin read contact messages" ON contact_messages FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Admin update contact messages" ON contact_messages;
CREATE POLICY "Admin update contact messages" ON contact_messages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Admin delete contact messages" ON contact_messages;
CREATE POLICY "Admin delete contact messages" ON contact_messages FOR DELETE TO authenticated USING (true);

-- ========== REDIRECTIONS ==========
CREATE TABLE IF NOT EXISTS redirects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_path TEXT NOT NULL UNIQUE,
  to_path TEXT NOT NULL,
  status_code INT NOT NULL DEFAULT 301 CHECK (status_code IN (301, 302, 307, 308)),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read active redirects" ON redirects;
CREATE POLICY "Public read active redirects" ON redirects FOR SELECT TO anon, authenticated USING (is_active = true);
DROP POLICY IF EXISTS "Admin all redirects" ON redirects;
CREATE POLICY "Admin all redirects" ON redirects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ========== PROFILS / ROLES ==========
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users read own profile" ON profiles;
CREATE POLICY "Users read own profile" ON profiles FOR SELECT TO authenticated USING (auth.uid() = id OR true);
DROP POLICY IF EXISTS "Admin update profiles" ON profiles;
CREATE POLICY "Admin update profiles" ON profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ========== SETTINGS: analytics + notifications ==========
ALTER TABLE site_settings
  ADD COLUMN IF NOT EXISTS ga_measurement_id TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS gtm_id TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS notify_email TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS notify_on_devis BOOLEAN NOT NULL DEFAULT true;
