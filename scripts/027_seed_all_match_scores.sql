-- Seed all match scores from handwritten results
-- This script updates all Match Day 1 fixtures with their final scores
-- Based on handwritten images documentation from script 026

BEGIN;

-- Update all matches with their scores based on team matchups
-- The script handles home/away team order variations

-- Image 1: Titans 1 vs Super Strikers 3
UPDATE public.matches m
SET
  home_score = CASE WHEN ht.name = 'Titans' THEN 1 ELSE 3 END,
  away_score = CASE WHEN ht.name = 'Titans' THEN 3 ELSE 1 END,
  is_completed = true
FROM public.teams ht, public.teams at
WHERE m.home_team_id = ht.id
  AND m.away_team_id = at.id
  AND m.match_day = 1
  AND m.match_date = '2025-11-16'
  AND ((ht.name = 'Titans' AND at.name = 'Super Strikers')
    OR (ht.name = 'Super Strikers' AND at.name = 'Titans'));

-- Image 2: Godfather's 0 vs Raptors 0
UPDATE public.matches m
SET
  home_score = 0,
  away_score = 0,
  is_completed = true
FROM public.teams ht, public.teams at
WHERE m.home_team_id = ht.id
  AND m.away_team_id = at.id
  AND m.match_day = 1
  AND m.match_date = '2025-11-16'
  AND ((ht.name = 'Godfather''s' AND at.name = 'Raptors')
    OR (ht.name = 'Raptors' AND at.name = 'Godfather''s'));

-- Image 2: The Brotherhood 1 vs COVID Boys 2
UPDATE public.matches m
SET
  home_score = CASE WHEN ht.name = 'The Brotherhood' THEN 1 ELSE 2 END,
  away_score = CASE WHEN ht.name = 'The Brotherhood' THEN 2 ELSE 1 END,
  is_completed = true
FROM public.teams ht, public.teams at
WHERE m.home_team_id = ht.id
  AND m.away_team_id = at.id
  AND m.match_day = 1
  AND m.match_date = '2025-11-16'
  AND ((ht.name = 'The Brotherhood' AND at.name = 'COVID Boys')
    OR (ht.name = 'COVID Boys' AND at.name = 'The Brotherhood'));

-- Image 2: Pundits 0 vs Losti City 5
UPDATE public.matches m
SET
  home_score = CASE WHEN ht.name = 'Pundits' THEN 0 ELSE 5 END,
  away_score = CASE WHEN ht.name = 'Pundits' THEN 5 ELSE 0 END,
  is_completed = true
FROM public.teams ht, public.teams at
WHERE m.home_team_id = ht.id
  AND m.away_team_id = at.id
  AND m.match_day = 1
  AND m.match_date = '2025-11-16'
  AND ((ht.name = 'Pundits' AND at.name = 'Losti City')
    OR (ht.name = 'Losti City' AND at.name = 'Pundits'));

-- Image 3: Club de Chege 3 vs The Brotherhood 0
UPDATE public.matches m
SET
  home_score = CASE WHEN ht.name = 'Club de Chege' THEN 3 ELSE 0 END,
  away_score = CASE WHEN ht.name = 'Club de Chege' THEN 0 ELSE 3 END,
  is_completed = true
FROM public.teams ht, public.teams at
WHERE m.home_team_id = ht.id
  AND m.away_team_id = at.id
  AND m.match_day = 1
  AND m.match_date = '2025-11-16'
  AND ((ht.name = 'Club de Chege' AND at.name = 'The Brotherhood')
    OR (ht.name = 'The Brotherhood' AND at.name = 'Club de Chege'));

-- Image 3: Finest Brothers 3 vs Ronavics 1
UPDATE public.matches m
SET
  home_score = CASE WHEN ht.name = 'Finest Brothers' THEN 3 ELSE 1 END,
  away_score = CASE WHEN ht.name = 'Finest Brothers' THEN 1 ELSE 3 END,
  is_completed = true
FROM public.teams ht, public.teams at
WHERE m.home_team_id = ht.id
  AND m.away_team_id = at.id
  AND m.match_day = 1
  AND m.match_date = '2025-11-16'
  AND ((ht.name = 'Finest Brothers' AND at.name = 'Ronavics')
    OR (ht.name = 'Ronavics' AND at.name = 'Finest Brothers'));

-- Image 3: Titans 1 vs Pundits 2
UPDATE public.matches m
SET
  home_score = CASE WHEN ht.name = 'Titans' THEN 1 ELSE 2 END,
  away_score = CASE WHEN ht.name = 'Titans' THEN 2 ELSE 1 END,
  is_completed = true
FROM public.teams ht, public.teams at
WHERE m.home_team_id = ht.id
  AND m.away_team_id = at.id
  AND m.match_day = 1
  AND m.match_date = '2025-11-16'
  AND ((ht.name = 'Titans' AND at.name = 'Pundits')
    OR (ht.name = 'Pundits' AND at.name = 'Titans'));

-- Image 3: Club de Chege 0 vs Losti City 1
UPDATE public.matches m
SET
  home_score = CASE WHEN ht.name = 'Club de Chege' THEN 0 ELSE 1 END,
  away_score = CASE WHEN ht.name = 'Club de Chege' THEN 1 ELSE 0 END,
  is_completed = true
FROM public.teams ht, public.teams at
WHERE m.home_team_id = ht.id
  AND m.away_team_id = at.id
  AND m.match_day = 1
  AND m.match_date = '2025-11-16'
  AND ((ht.name = 'Club de Chege' AND at.name = 'Losti City')
    OR (ht.name = 'Losti City' AND at.name = 'Club de Chege'));

-- Image 3: Ronavics 5 vs Raptors 0
UPDATE public.matches m
SET
  home_score = CASE WHEN ht.name = 'Ronavics' THEN 5 ELSE 0 END,
  away_score = CASE WHEN ht.name = 'Ronavics' THEN 0 ELSE 5 END,
  is_completed = true
FROM public.teams ht, public.teams at
WHERE m.home_team_id = ht.id
  AND m.away_team_id = at.id
  AND m.match_day = 1
  AND m.match_date = '2025-11-16'
  AND ((ht.name = 'Ronavics' AND at.name = 'Raptors')
    OR (ht.name = 'Raptors' AND at.name = 'Ronavics'));

-- Image 3: Finest Brothers 2 vs COVID Boys 1
UPDATE public.matches m
SET
  home_score = CASE WHEN ht.name = 'Finest Brothers' THEN 2 ELSE 1 END,
  away_score = CASE WHEN ht.name = 'Finest Brothers' THEN 1 ELSE 2 END,
  is_completed = true
FROM public.teams ht, public.teams at
WHERE m.home_team_id = ht.id
  AND m.away_team_id = at.id
  AND m.match_day = 1
  AND m.match_date = '2025-11-16'
  AND ((ht.name = 'Finest Brothers' AND at.name = 'COVID Boys')
    OR (ht.name = 'COVID Boys' AND at.name = 'Finest Brothers'));

-- Image 4: Top Bins 1 vs Super Strikers 4
UPDATE public.matches m
SET
  home_score = CASE WHEN ht.name = 'Top Bins' THEN 1 ELSE 4 END,
  away_score = CASE WHEN ht.name = 'Top Bins' THEN 4 ELSE 1 END,
  is_completed = true
FROM public.teams ht, public.teams at
WHERE m.home_team_id = ht.id
  AND m.away_team_id = at.id
  AND m.match_day = 1
  AND m.match_date = '2025-11-16'
  AND ((ht.name = 'Top Bins' AND at.name = 'Super Strikers')
    OR (ht.name = 'Super Strikers' AND at.name = 'Top Bins'));

-- Image 4: Godfather's 1 vs COVID Boys 3
UPDATE public.matches m
SET
  home_score = CASE WHEN ht.name = 'Godfather''s' THEN 1 ELSE 3 END,
  away_score = CASE WHEN ht.name = 'Godfather''s' THEN 3 ELSE 1 END,
  is_completed = true
FROM public.teams ht, public.teams at
WHERE m.home_team_id = ht.id
  AND m.away_team_id = at.id
  AND m.match_day = 1
  AND m.match_date = '2025-11-16'
  AND ((ht.name = 'Godfather''s' AND at.name = 'COVID Boys')
    OR (ht.name = 'COVID Boys' AND at.name = 'Godfather''s'));

-- Image 4: The Villagers 9 vs Raptors 1
UPDATE public.matches m
SET
  home_score = CASE WHEN ht.name = 'The Villagers' THEN 9 ELSE 1 END,
  away_score = CASE WHEN ht.name = 'The Villagers' THEN 1 ELSE 9 END,
  is_completed = true
FROM public.teams ht, public.teams at
WHERE m.home_team_id = ht.id
  AND m.away_team_id = at.id
  AND m.match_day = 1
  AND m.match_date = '2025-11-16'
  AND ((ht.name = 'The Villagers' AND at.name = 'Raptors')
    OR (ht.name = 'Raptors' AND at.name = 'The Villagers'));

-- Image 4: Godfather's 0 vs Top Bins 0
UPDATE public.matches m
SET
  home_score = 0,
  away_score = 0,
  is_completed = true
FROM public.teams ht, public.teams at
WHERE m.home_team_id = ht.id
  AND m.away_team_id = at.id
  AND m.match_day = 1
  AND m.match_date = '2025-11-16'
  AND ((ht.name = 'Godfather''s' AND at.name = 'Top Bins')
    OR (ht.name = 'Top Bins' AND at.name = 'Godfather''s'));

-- Image 4: Super Strikers 3 vs The Brotherhood 1
UPDATE public.matches m
SET
  home_score = CASE WHEN ht.name = 'Super Strikers' THEN 3 ELSE 1 END,
  away_score = CASE WHEN ht.name = 'Super Strikers' THEN 1 ELSE 3 END,
  is_completed = true
FROM public.teams ht, public.teams at
WHERE m.home_team_id = ht.id
  AND m.away_team_id = at.id
  AND m.match_day = 1
  AND m.match_date = '2025-11-16'
  AND ((ht.name = 'Super Strikers' AND at.name = 'The Brotherhood')
    OR (ht.name = 'The Brotherhood' AND at.name = 'Super Strikers'));

-- Image 4: Losti City 6 vs Soft Lyf 1
UPDATE public.matches m
SET
  home_score = CASE WHEN ht.name = 'Losti City' THEN 6 ELSE 1 END,
  away_score = CASE WHEN ht.name = 'Losti City' THEN 1 ELSE 6 END,
  is_completed = true
FROM public.teams ht, public.teams at
WHERE m.home_team_id = ht.id
  AND m.away_team_id = at.id
  AND m.match_day = 1
  AND m.match_date = '2025-11-16'
  AND ((ht.name = 'Losti City' AND at.name = 'Soft Lyf')
    OR (ht.name = 'Soft Lyf' AND at.name = 'Losti City'));

-- Image 4: The Villagers 2 vs Pundits 0
UPDATE public.matches m
SET
  home_score = CASE WHEN ht.name = 'The Villagers' THEN 2 ELSE 0 END,
  away_score = CASE WHEN ht.name = 'The Villagers' THEN 0 ELSE 2 END,
  is_completed = true
FROM public.teams ht, public.teams at
WHERE m.home_team_id = ht.id
  AND m.away_team_id = at.id
  AND m.match_day = 1
  AND m.match_date = '2025-11-16'
  AND ((ht.name = 'The Villagers' AND at.name = 'Pundits')
    OR (ht.name = 'Pundits' AND at.name = 'The Villagers'));

COMMIT;

-- Verification: Show all completed matches with scores
SELECT
  m.id as match_id,
  m.match_day,
  m.match_date,
  m.match_time,
  m.venue,
  ht.name as home_team,
  m.home_score,
  m.away_score,
  at.name as away_team,
  m.is_completed,
  CASE
    WHEN m.is_completed THEN '✓'
    ELSE '✗'
  END as status
FROM public.matches m
JOIN public.teams ht ON m.home_team_id = ht.id
JOIN public.teams at ON m.away_team_id = at.id
WHERE m.match_day = 1
  AND m.match_date = '2025-11-16'
ORDER BY m.match_time, m.venue, ht.name;

-- Summary stats
SELECT
  COUNT(*) as total_matches,
  COUNT(*) FILTER (WHERE is_completed = true) as completed_matches,
  COUNT(*) FILTER (WHERE is_completed = false) as pending_matches,
  SUM(home_score) FILTER (WHERE is_completed = true) as total_home_goals,
  SUM(away_score) FILTER (WHERE is_completed = true) as total_away_goals
FROM public.matches
WHERE match_day = 1
  AND match_date = '2025-11-16';
