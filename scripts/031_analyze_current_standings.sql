-- Temporary analysis script to calculate standings from scripts 028 and 029
-- This will help identify what matches are missing to match the official table

-- First, let's see what we have from Match Day 1 (script 028):
-- 17 matches total

WITH match_day_1_results AS (
  SELECT 'Titans' as team, 1 as played, 0 as won, 0 as drawn, 1 as lost, 1 as gf, 3 as ga FROM (VALUES(1)) v UNION ALL
  SELECT 'Super Strikers', 1, 1, 0, 0, 3, 1 UNION ALL
  SELECT 'Godfather''s', 1, 0, 1, 0, 0, 0 UNION ALL
  SELECT 'Raptors', 1, 0, 1, 0, 0, 0 UNION ALL
  SELECT 'The Brotherhood', 1, 0, 0, 1, 1, 2 UNION ALL
  SELECT 'COVID Boys', 1, 1, 0, 0, 2, 1 UNION ALL
  SELECT 'Pundits', 1, 0, 0, 1, 0, 5 UNION ALL
  SELECT 'Losti City', 1, 1, 0, 0, 5, 0 UNION ALL
  SELECT 'Club de Chege', 1, 1, 0, 0, 3, 0 UNION ALL
  SELECT 'Finest Brothers', 1, 1, 0, 0, 3, 1 UNION ALL
  SELECT 'Ronavics', 1, 0, 0, 1, 1, 3 UNION ALL
  -- Match 7
  SELECT 'Titans', 1, 0, 0, 1, 1, 2 UNION ALL
  SELECT 'Pundits', 1, 1, 0, 0, 2, 1 UNION ALL
  -- Match 8
  SELECT 'Club de Chege', 1, 0, 0, 1, 0, 1 UNION ALL
  SELECT 'Losti City', 1, 1, 0, 0, 1, 0 UNION ALL
  -- Match 9
  SELECT 'Ronavics', 1, 1, 0, 0, 5, 0 UNION ALL
  SELECT 'Raptors', 1, 0, 0, 1, 0, 5 UNION ALL
  -- Match 10
  SELECT 'Finest Brothers', 1, 1, 0, 0, 2, 1 UNION ALL
  SELECT 'COVID Boys', 1, 0, 0, 1, 1, 2 UNION ALL
  -- Match 11
  SELECT 'Top Bins', 1, 0, 0, 1, 1, 4 UNION ALL
  SELECT 'Super Strikers', 1, 1, 0, 0, 4, 1 UNION ALL
  -- Match 12
  SELECT 'Godfather''s', 1, 0, 0, 1, 1, 3 UNION ALL
  SELECT 'COVID Boys', 1, 1, 0, 0, 3, 1 UNION ALL
  -- Match 13
  SELECT 'The Villagers', 1, 1, 0, 0, 9, 1 UNION ALL
  SELECT 'Raptors', 1, 0, 0, 1, 1, 9 UNION ALL
  -- Match 14
  SELECT 'Godfather''s', 1, 0, 1, 0, 0, 0 UNION ALL
  SELECT 'Top Bins', 1, 0, 1, 0, 0, 0 UNION ALL
  -- Match 15
  SELECT 'Super Strikers', 1, 1, 0, 0, 3, 1 UNION ALL
  SELECT 'The Brotherhood', 1, 0, 0, 1, 1, 3 UNION ALL
  -- Match 16
  SELECT 'Losti City', 1, 1, 0, 0, 6, 1 UNION ALL
  SELECT 'Soft Lyf', 1, 0, 0, 1, 1, 6 UNION ALL
  -- Match 17
  SELECT 'The Villagers', 1, 1, 0, 0, 2, 0 UNION ALL
  SELECT 'Pundits', 1, 0, 0, 1, 0, 2
),
md1_summary AS (
  SELECT
    team,
    SUM(played) as p,
    SUM(won) as w,
    SUM(drawn) as d,
    SUM(lost) as l,
    SUM(gf) as gf,
    SUM(ga) as ga,
    (SUM(won) * 3 + SUM(drawn)) as pts
  FROM match_day_1_results
  GROUP BY team
)
SELECT * FROM md1_summary ORDER BY pts DESC, (gf - ga) DESC, gf DESC;
