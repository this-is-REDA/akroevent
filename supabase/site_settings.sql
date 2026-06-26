-- À exécuter si vous avez déjà créé la table devis
-- Supabase → SQL Editor → New query

CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  whatsapp_phone TEXT NOT NULL DEFAULT '212663218522',
  phone_display TEXT NOT NULL DEFAULT '+212 (0)6 63 21 85 22',
  email TEXT NOT NULL DEFAULT 'Contact@akroevent.com',
  facebook_url TEXT NOT NULL DEFAULT 'https://www.facebook.com/share/1E4yBi7wyu/',
  instagram_url TEXT NOT NULL DEFAULT 'https://www.instagram.com/akro_event/',
  linkedin_url TEXT NOT NULL DEFAULT 'https://www.linkedin.com/company/111628813/',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO site_settings (id) VALUES (1)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin update site settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
