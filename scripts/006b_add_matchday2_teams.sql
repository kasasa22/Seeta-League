-- Add teams that joined for Match Day 2
-- These teams were not present in Match Day 1 but joined later

INSERT INTO teams (name, representative_name, is_active) VALUES
  ('Panthers', 'TBD', true),
  ('Allies', 'TBD', true),
  ('Kawaago', 'TBD', true),
  ('Legends', 'TBD', true),
  ('Kawaago FC', 'TBD', true),
  ('Backline FC', 'TBD', true),
  ('The Imperials', 'TBD', true)
ON CONFLICT (name) DO NOTHING;

-- Verify insertion
SELECT
  name as "Team Name",
  representative_name as "Year & Campus",
  is_active as "Active",
  created_at as "Joined Date"
FROM teams
WHERE name IN ('Panthers', 'Allies', 'Kawaago', 'Legends', 'Kawaago FC', 'Backline FC', 'The Imperials')
ORDER BY name;

-- Show total team count
SELECT 'Total teams now: ' || COUNT(*) as status FROM teams WHERE is_active = true;
