-- ============================================================================
-- MATCHDAY 3 SCORES UPDATE
-- ============================================================================

BEGIN;

-- 1. Allies 3:4 Club de Chege
UPDATE matches SET home_score = 3, away_score = 4, is_completed = true
WHERE match_day = 3
  AND home_team_id = (SELECT id FROM teams WHERE name = 'Allies')
  AND away_team_id = (SELECT id FROM teams WHERE name = 'Club de Chege');

-- 2. The Villagers 3:6 Super Strikers
UPDATE matches SET home_score = 3, away_score = 6, is_completed = true
WHERE match_day = 3
  AND home_team_id = (SELECT id FROM teams WHERE name = 'The Villagers')
  AND away_team_id = (SELECT id FROM teams WHERE name = 'Super Strikers');

-- 3. Raptors 0:4 Panthers
UPDATE matches SET home_score = 0, away_score = 4, is_completed = true
WHERE match_day = 3
  AND home_team_id = (SELECT id FROM teams WHERE name = 'Raptors')
  AND away_team_id = (SELECT id FROM teams WHERE name = 'Panthers');

-- 4. Allies 2:1 Super Strikers
UPDATE matches SET home_score = 2, away_score = 1, is_completed = true
WHERE match_day = 3
  AND home_team_id = (SELECT id FROM teams WHERE name = 'Allies')
  AND away_team_id = (SELECT id FROM teams WHERE name = 'Super Strikers');

-- 5. The Villagers 4:1 Kawaago
UPDATE matches SET home_score = 4, away_score = 1, is_completed = true
WHERE match_day = 3
  AND home_team_id = (SELECT id FROM teams WHERE name = 'The Villagers')
  AND away_team_id = (SELECT id FROM teams WHERE name = 'Kawaago');

-- 6. Godfather's 4:0 Club de Chege
UPDATE matches SET home_score = 4, away_score = 0, is_completed = true
WHERE match_day = 3
  AND home_team_id = (SELECT id FROM teams WHERE name = 'Godfather''s')
  AND away_team_id = (SELECT id FROM teams WHERE name = 'Club de Chege');

-- 7. Finest Brothers 5:3 Allies
UPDATE matches SET home_score = 5, away_score = 3, is_completed = true
WHERE match_day = 3
  AND home_team_id = (SELECT id FROM teams WHERE name = 'Finest Brothers')
  AND away_team_id = (SELECT id FROM teams WHERE name = 'Allies');

-- 8. Godfather's 1:2 Finest Brothers
UPDATE matches SET home_score = 1, away_score = 2, is_completed = true
WHERE match_day = 3
  AND home_team_id = (SELECT id FROM teams WHERE name = 'Godfather''s')
  AND away_team_id = (SELECT id FROM teams WHERE name = 'Finest Brothers');

-- 9. Kawaago 0:6 Losti City
UPDATE matches SET home_score = 0, away_score = 6, is_completed = true
WHERE match_day = 3
  AND home_team_id = (SELECT id FROM teams WHERE name = 'Kawaago')
  AND away_team_id = (SELECT id FROM teams WHERE name = 'Losti City');

-- 10. The Villagers 5:9 Allies
UPDATE matches SET home_score = 5, away_score = 9, is_completed = true
WHERE match_day = 3
  AND home_team_id = (SELECT id FROM teams WHERE name = 'The Villagers')
  AND away_team_id = (SELECT id FROM teams WHERE name = 'Allies');

-- 11. Panthers 9:1 Kawaago
UPDATE matches SET home_score = 9, away_score = 1, is_completed = true
WHERE match_day = 3
  AND home_team_id = (SELECT id FROM teams WHERE name = 'Panthers')
  AND away_team_id = (SELECT id FROM teams WHERE name = 'Kawaago');

-- 12. Raptors 0:10 Losti City
UPDATE matches SET home_score = 0, away_score = 10, is_completed = true
WHERE match_day = 3
  AND home_team_id = (SELECT id FROM teams WHERE name = 'Raptors')
  AND away_team_id = (SELECT id FROM teams WHERE name = 'Losti City');

-- 13. Pundits 0:4 Panthers
UPDATE matches SET home_score = 0, away_score = 4, is_completed = true
WHERE match_day = 3
  AND home_team_id = (SELECT id FROM teams WHERE name = 'Pundits')
  AND away_team_id = (SELECT id FROM teams WHERE name = 'Panthers');

-- 14. Losti City 2:1 Pundits
UPDATE matches SET home_score = 2, away_score = 1, is_completed = true
WHERE match_day = 3
  AND home_team_id = (SELECT id FROM teams WHERE name = 'Losti City')
  AND away_team_id = (SELECT id FROM teams WHERE name = 'Pundits');

COMMIT;

-- Verify scores were updated
SELECT
    h.name as "Home",
    m.home_score || ':' || m.away_score as "Score",
    a.name as "Away"
FROM matches m
JOIN teams h ON m.home_team_id = h.id
JOIN teams a ON m.away_team_id = a.id
WHERE m.match_day = 3
ORDER BY m.match_time;
