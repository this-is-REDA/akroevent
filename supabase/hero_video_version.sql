-- Vidéo Hero — à exécuter dans Supabase → SQL Editor
ALTER TABLE site_settings
  ADD COLUMN IF NOT EXISTS hero_video_version TEXT NOT NULL DEFAULT '';
