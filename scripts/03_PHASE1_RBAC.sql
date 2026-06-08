BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  phone text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  is_system boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS permissions (
  key text PRIMARY KEY,
  label text NOT NULL,
  category text
);

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
  permission_key text REFERENCES permissions(key) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_key)
);

CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
  team_id uuid REFERENCES teams(id),
  season_id uuid REFERENCES seasons(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS uniq_user_role_global
  ON user_roles (user_id, role_id) WHERE season_id IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS uniq_user_role_season
  ON user_roles (user_id, role_id, season_id) WHERE season_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_user_roles_user ON user_roles (user_id);

INSERT INTO permissions (key, label, category) VALUES
  ('view_admin', 'Access the admin area', 'general'),
  ('manage_roles', 'Create roles and set their permissions', 'administration'),
  ('manage_users', 'Approve users and assign roles', 'administration'),
  ('approve_captains', 'Approve captain registrations', 'administration'),
  ('manage_seasons', 'Create and edit seasons', 'administration'),
  ('manage_teams', 'Manage all teams', 'teams'),
  ('register_team', 'Register own team', 'captain'),
  ('register_players', 'Register players', 'captain'),
  ('manage_players', 'Manage all players', 'players'),
  ('manage_matches', 'Schedule and edit matches', 'records'),
  ('enter_scores', 'Enter match scores', 'records'),
  ('edit_records', 'Edit match records', 'records'),
  ('manage_finance', 'Record payments and expenses', 'finance'),
  ('view_finance', 'View finance records', 'finance'),
  ('post_news', 'Post news and activities', 'coordinator'),
  ('manage_news', 'Manage all news', 'coordinator'),
  ('send_rfc', 'Send RFCs to officials', 'messaging'),
  ('respond_rfc', 'Respond to RFCs', 'messaging'),
  ('view_all', 'Read-only visibility of everything', 'president')
ON CONFLICT (key) DO NOTHING;

INSERT INTO roles (key, name, description, is_system) VALUES
  ('super_admin', 'Super Admin', 'Full control; defines roles and permissions', true),
  ('captain', 'Captain', 'Registers their team and players; sends RFCs', true),
  ('records', 'Records Officer', 'Enters and edits match records', true),
  ('finance', 'Finance Officer', 'Oversees payments and expenses', true),
  ('coordinator', 'Coordinator', 'Posts news and activities', true),
  ('president', 'President', 'Read-only visibility of everything', true)
ON CONFLICT (key) DO NOTHING;

INSERT INTO role_permissions (role_id, permission_key)
SELECT r.id, p.key FROM roles r CROSS JOIN permissions p
WHERE r.key = 'super_admin'
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_key)
SELECT r.id, x.key FROM roles r
JOIN (VALUES ('view_admin'), ('register_team'), ('register_players'), ('send_rfc')) AS x(key) ON true
WHERE r.key = 'captain'
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_key)
SELECT r.id, x.key FROM roles r
JOIN (VALUES ('view_admin'), ('manage_matches'), ('enter_scores'), ('edit_records'), ('respond_rfc')) AS x(key) ON true
WHERE r.key = 'records'
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_key)
SELECT r.id, x.key FROM roles r
JOIN (VALUES ('view_admin'), ('manage_finance'), ('view_finance'), ('respond_rfc')) AS x(key) ON true
WHERE r.key = 'finance'
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_key)
SELECT r.id, x.key FROM roles r
JOIN (VALUES ('view_admin'), ('post_news'), ('manage_news'), ('respond_rfc')) AS x(key) ON true
WHERE r.key = 'coordinator'
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_key)
SELECT r.id, x.key FROM roles r
JOIN (VALUES ('view_admin'), ('view_all'), ('respond_rfc')) AS x(key) ON true
WHERE r.key = 'president'
ON CONFLICT DO NOTHING;

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    'pending'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();

COMMIT;
