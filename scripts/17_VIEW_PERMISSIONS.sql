BEGIN;

INSERT INTO permissions (key, label, category) VALUES
  ('view_users', 'View users (read-only)', 'administration'),
  ('view_roles', 'View roles (read-only)', 'administration'),
  ('view_teams', 'View teams (read-only)', 'teams'),
  ('view_players', 'View players (read-only)', 'players'),
  ('view_matches', 'View matches (read-only)', 'records'),
  ('view_records', 'View records & scores (read-only)', 'records'),
  ('view_news', 'View news & notices (read-only)', 'coordinator')
ON CONFLICT (key) DO NOTHING;

INSERT INTO role_permissions (role_id, permission_key)
SELECT r.id, p.key
FROM roles r
CROSS JOIN permissions p
WHERE r.key <> 'super_admin'
  AND p.key IN ('view_teams', 'view_players', 'view_matches', 'view_records', 'view_news')
ON CONFLICT DO NOTHING;

COMMIT;
