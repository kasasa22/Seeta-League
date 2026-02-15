-- Seed exact Match Day 1 fixtures with scores from handwritten results
-- This script clears auto-generated fixtures and creates exact matches with scores

BEGIN;

-- Clear Match Day 1 fixtures
DELETE FROM match_events WHERE match_id IN (SELECT id FROM matches WHERE match_day = 1);
DELETE FROM matches WHERE match_day = 1;

-- Insert all Match Day 1 fixtures with their final scores
-- Based on handwritten images from November 16, 2025

-- Match 1: Titans vs Super Strikers (1-3)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '14:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Titans'),
  (SELECT id FROM teams WHERE name = 'Super Strikers'),
  1, 3, true;

-- Match 2: Godfather's vs Raptors (0-0)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '14:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Godfather''s'),
  (SELECT id FROM teams WHERE name = 'Raptors'),
  0, 0, true;

-- Match 3: The Brotherhood vs COVID Boys (1-2)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '14:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'The Brotherhood'),
  (SELECT id FROM teams WHERE name = 'COVID Boys'),
  1, 2, true;

-- Match 4: Pundits vs Losti City (0-5)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '14:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Pundits'),
  (SELECT id FROM teams WHERE name = 'Losti City'),
  0, 5, true;

-- Match 5: Club de Chege vs The Brotherhood (3-0)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '14:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Club de Chege'),
  (SELECT id FROM teams WHERE name = 'The Brotherhood'),
  3, 0, true;

-- Match 6: Finest Brothers vs Ronavics (3-1)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '14:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Finest Brothers'),
  (SELECT id FROM teams WHERE name = 'Ronavics'),
  3, 1, true;

-- Match 7: Titans vs Pundits (1-2)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '16:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Titans'),
  (SELECT id FROM teams WHERE name = 'Pundits'),
  1, 2, true;

-- Match 8: Club de Chege vs Losti City (0-1)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '16:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Club de Chege'),
  (SELECT id FROM teams WHERE name = 'Losti City'),
  0, 1, true;

-- Match 9: Ronavics vs Raptors (5-0)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '16:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Ronavics'),
  (SELECT id FROM teams WHERE name = 'Raptors'),
  5, 0, true;

-- Match 10: Finest Brothers vs COVID Boys (2-1)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '16:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Finest Brothers'),
  (SELECT id FROM teams WHERE name = 'COVID Boys'),
  2, 1, true;

-- Match 11: Top Bins vs Super Strikers (1-4)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '18:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Top Bins'),
  (SELECT id FROM teams WHERE name = 'Super Strikers'),
  1, 4, true;

-- Match 12: Godfather's vs COVID Boys (1-3)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '18:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Godfather''s'),
  (SELECT id FROM teams WHERE name = 'COVID Boys'),
  1, 3, true;

-- Match 13: The Villagers vs Raptors (9-1)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '18:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'The Villagers'),
  (SELECT id FROM teams WHERE name = 'Raptors'),
  9, 1, true;

-- Match 14: Godfather's vs Top Bins (0-0)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '20:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Godfather''s'),
  (SELECT id FROM teams WHERE name = 'Top Bins'),
  0, 0, true;

-- Match 15: Super Strikers vs The Brotherhood (3-1)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '20:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Super Strikers'),
  (SELECT id FROM teams WHERE name = 'The Brotherhood'),
  3, 1, true;

-- Match 16: Losti City vs Soft Lyf (6-1)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '20:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Losti City'),
  (SELECT id FROM teams WHERE name = 'Soft Lyf'),
  6, 1, true;

-- Match 17: The Villagers vs Pundits (2-0)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '20:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'The Villagers'),
  (SELECT id FROM teams WHERE name = 'Pundits'),
  2, 0, true;

COMMIT;

-- Verification: Show all completed matches with scores
SELECT
  m.id as match_id,
  m.match_day,
  m.match_date,
  m.match_time,
  ht.name as home_team,
  m.home_score,
  '-' as separator,
  m.away_score,
  at.name as away_team,
  m.is_completed
FROM public.matches m
JOIN public.teams ht ON m.home_team_id = ht.id
JOIN public.teams at ON m.away_team_id = at.id
WHERE m.match_day = 1
  AND m.match_date = '2025-11-16'
ORDER BY m.match_time, ht.name;

-- Summary stats
SELECT
  COUNT(*) as total_matches,
  COUNT(*) FILTER (WHERE is_completed = true) as completed_matches,
  COUNT(*) FILTER (WHERE is_completed = false) as pending_matches,
  SUM(home_score) FILTER (WHERE is_completed = true) as total_home_goals,
  SUM(away_score) FILTER (WHERE is_completed = true) as total_away_goals,
  SUM(home_score + away_score) FILTER (WHERE is_completed = true) as total_goals
FROM public.matches
WHERE match_day = 1
  AND match_date = '2025-11-16';
