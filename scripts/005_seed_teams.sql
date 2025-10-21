-- Seed Teams for Seeta League
-- Insert all 17 registered teams

INSERT INTO teams (name, representative_name, is_active) VALUES
  ('Godfather''s', '2016 Nama', true),
  ('Titans', '2022 Nama', true),
  ('Finest Brothers', '2018 Nama', true),
  ('Raptors', '2017 Main', true),
  ('COVID Boys', '2020 Main', true),
  ('Top Bins', '2017 Nama', true),
  ('Ronavics', '2023 Main', true),
  ('The Brotherhood', '2016 Main', true),
  ('Kawagoo FC', '2023 A Campus', true),
  ('Soft Lyf', '2019 Nama', true),
  ('Losti City', '2023 Green', true),
  ('Backline FC', '2023 Nama', true),
  ('Pundits', '2016 Green', true),
  ('The Villagers', '2016 S.4 Green', true),
  ('The Imperials', '2020 Nama', true),
  ('Super Strikers', '2015 Nama', true),
  ('Club de Chege', '2024 Nama', true)
ON CONFLICT (name) DO NOTHING;

-- Verify insertion
SELECT 'Total teams inserted: ' || COUNT(*) FROM teams;

-- Display all teams
SELECT 
  name as "Team Name", 
  representative_name as "Year & Campus",
  is_active as "Active"
FROM teams
ORDER BY name;

