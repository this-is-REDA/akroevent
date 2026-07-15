-- Galerie photos (gérée depuis /admin/galerie)
CREATE TABLE IF NOT EXISTS gallery_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT NOT NULL DEFAULT '',
  caption TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS gallery_photos_sort_idx ON gallery_photos (sort_order ASC, created_at DESC);

ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published gallery"
  ON gallery_photos FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Admin read all gallery"
  ON gallery_photos FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin insert gallery"
  ON gallery_photos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update gallery"
  ON gallery_photos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete gallery"
  ON gallery_photos FOR DELETE
  TO authenticated
  USING (true);
