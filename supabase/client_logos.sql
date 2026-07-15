-- Logos clients / Nos Références (gérés depuis /admin/references)
CREATE TABLE IF NOT EXISTS client_logos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  src TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS client_logos_sort_idx ON client_logos (sort_order ASC, created_at DESC);

ALTER TABLE client_logos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published client logos"
  ON client_logos FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Admin read all client logos"
  ON client_logos FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin insert client logos"
  ON client_logos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update client logos"
  ON client_logos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete client logos"
  ON client_logos FOR DELETE
  TO authenticated
  USING (true);
