BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id uuid REFERENCES seasons(id),
  title text NOT NULL,
  body text,
  cover_image_url text,
  author_id uuid REFERENCES profiles(id),
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS activity_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id uuid REFERENCES activities(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_activities_season ON activities(season_id);
CREATE INDEX IF NOT EXISTS idx_activity_images_activity ON activity_images(activity_id);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS activities_public_read ON activities;
CREATE POLICY activities_public_read ON activities FOR SELECT TO anon, authenticated
  USING (is_published OR public.has_perm(auth.uid(), 'post_news') OR public.has_perm(auth.uid(), 'manage_news'));
DROP POLICY IF EXISTS activities_write ON activities;
CREATE POLICY activities_write ON activities FOR ALL TO authenticated
  USING (public.has_perm(auth.uid(), 'post_news') OR public.has_perm(auth.uid(), 'manage_news'))
  WITH CHECK (public.has_perm(auth.uid(), 'post_news') OR public.has_perm(auth.uid(), 'manage_news'));

ALTER TABLE activity_images ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS activity_images_public_read ON activity_images;
CREATE POLICY activity_images_public_read ON activity_images FOR SELECT TO anon, authenticated
  USING (true);
DROP POLICY IF EXISTS activity_images_write ON activity_images;
CREATE POLICY activity_images_write ON activity_images FOR ALL TO authenticated
  USING (public.has_perm(auth.uid(), 'post_news') OR public.has_perm(auth.uid(), 'manage_news'))
  WITH CHECK (public.has_perm(auth.uid(), 'post_news') OR public.has_perm(auth.uid(), 'manage_news'));

GRANT SELECT ON activities, activity_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON activities, activity_images TO authenticated;

COMMIT;
