-- Table des demandes de devis
CREATE TABLE IF NOT EXISTS devis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'nouveau'
    CHECK (status IN ('nouveau', 'en_cours', 'traite', 'archive')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour tri et filtres
CREATE INDEX IF NOT EXISTS devis_created_at_idx ON devis (created_at DESC);
CREATE INDEX IF NOT EXISTS devis_status_idx ON devis (status);

-- Activer Row Level Security
ALTER TABLE devis ENABLE ROW LEVEL SECURITY;

-- Le public peut soumettre un devis (formulaire site)
CREATE POLICY "Public insert devis"
  ON devis FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Seuls les admins connectés peuvent lire
CREATE POLICY "Admin read devis"
  ON devis FOR SELECT
  TO authenticated
  USING (true);

-- Seuls les admins connectés peuvent modifier
CREATE POLICY "Admin update devis"
  ON devis FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Seuls les admins connectés peuvent supprimer
CREATE POLICY "Admin delete devis"
  ON devis FOR DELETE
  TO authenticated
  USING (true);

-- Paramètres du site (WhatsApp, réseaux sociaux, contact)
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
