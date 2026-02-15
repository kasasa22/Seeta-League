-- Seed Match Day 2 fixtures with scores from handwritten results
-- Based on Matchweek 2 results images (21 matches total)

BEGIN;

-- Clear Match Day 2 fixtures if they exist
DELETE FROM match_events WHERE match_id IN (SELECT id FROM matches WHERE match_day = 2);
DELETE FROM matches WHERE match_day = 2;

-- Insert all Match Day 2 fixtures with their final scores
-- Date: November 30, 2025 (placeholder - adjust as needed)

-- FIRST IMAGE - 11 MATCHES

-- Match 1: Titans vs Top Bins (3-0)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Titans'),
  (SELECT id FROM teams WHERE name = 'Top Bins'),
  3, 0, true;

-- Match 2: Club de Chege vs Titans (6-1)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Club de Chege'),
  (SELECT id FROM teams WHERE name = 'Titans'),
  6, 1, true;

-- Match 3: Finest Brothers vs The Brotherhood (3-0)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Finest Brothers'),
  (SELECT id FROM teams WHERE name = 'The Brotherhood'),
  3, 0, true;

-- Match 4: Losti City vs Super Strikers (1-1)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Losti City'),
  (SELECT id FROM teams WHERE name = 'Super Strikers'),
  1, 1, true;

-- Match 5: Allies vs Raptors (3-1)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '16:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Allies'),
  (SELECT id FROM teams WHERE name = 'Raptors'),
  3, 1, true;

-- Match 6: The Villagers vs Losti City (2-1)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '16:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'The Villagers'),
  (SELECT id FROM teams WHERE name = 'Losti City'),
  2, 1, true;

-- Match 7: Ronavics vs Kawaago (0-2)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '16:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Ronavics'),
  (SELECT id FROM teams WHERE name = 'Kawaago'),
  0, 2, true;

-- Match 8: The Brotherhood vs Godfather's (3-1)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '18:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'The Brotherhood'),
  (SELECT id FROM teams WHERE name = 'Godfather''s'),
  3, 1, true;

-- Match 9: COVID Boys vs Raptors (3-0)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '18:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'COVID Boys'),
  (SELECT id FROM teams WHERE name = 'Raptors'),
  3, 0, true;

-- Match 10: Allies vs Kawaago (3-1)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '18:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Allies'),
  (SELECT id FROM teams WHERE name = 'Kawaago'),
  3, 1, true;

-- Match 11: The Villagers vs Raptors (3-1)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '18:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'The Villagers'),
  (SELECT id FROM teams WHERE name = 'Raptors'),
  3, 1, true;

-- SECOND IMAGE - 10 MATCHES

-- Match 12: Kawaago vs Pundits (1-7)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '20:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Kawaago'),
  (SELECT id FROM teams WHERE name = 'Pundits'),
  1, 7, true;

-- Match 13: Panthers vs COVID Boys (6-0)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '20:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Panthers'),
  (SELECT id FROM teams WHERE name = 'COVID Boys'),
  6, 0, true;

-- Match 14: Ronavics vs Godfather's (0-3)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '20:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Ronavics'),
  (SELECT id FROM teams WHERE name = 'Godfather''s'),
  0, 3, true;

-- Match 15: The Villagers vs Godfather's (7-2)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'The Villagers'),
  (SELECT id FROM teams WHERE name = 'Godfather''s'),
  7, 2, true;

-- Match 16: Club de Chege vs Top Bins (2-2)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Club de Chege'),
  (SELECT id FROM teams WHERE name = 'Top Bins'),
  2, 2, true;

-- Match 17: Pundits vs Super Strikers (0-1)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Pundits'),
  (SELECT id FROM teams WHERE name = 'Super Strikers'),
  0, 1, true;

-- Match 18: Panthers vs Top Bins (2-1)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Panthers'),
  (SELECT id FROM teams WHERE name = 'Top Bins'),
  2, 1, true;

-- Match 19: Titans vs Allies (1-2)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '23:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Titans'),
  (SELECT id FROM teams WHERE name = 'Allies'),
  1, 2, true;

-- Match 20: Losti City vs Finest Brothers (3-3)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '23:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Losti City'),
  (SELECT id FROM teams WHERE name = 'Finest Brothers'),
  3, 3, true;

-- Match 21: Club de Chege vs Pundits (1-0)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '23:00:00', 'Equinox Sports & Fitness Center',
  (SELECT id FROM teams WHERE name = 'Club de Chege'),
  (SELECT id FROM teams WHERE name = 'Pundits'),
  1, 0, true;

COMMIT;

-- Verification: Show all Match Day 2 matches with scores
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
WHERE m.match_day = 2
ORDER BY m.match_time, ht.name;

-- Summary stats for Match Day 2
SELECT
  COUNT(*) as total_matches,
  COUNT(*) FILTER (WHERE is_completed = true) as completed_matches,
  COUNT(*) FILTER (WHERE is_completed = false) as pending_matches,
  SUM(home_score) FILTER (WHERE is_completed = true) as total_home_goals,
  SUM(away_score) FILTER (WHERE is_completed = true) as total_away_goals,
  SUM(home_score + away_score) FILTER (WHERE is_completed = true) as total_goals
FROM public.matches
WHERE match_day = 2;
