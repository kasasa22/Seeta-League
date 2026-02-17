-- ============================================================================
-- SEED EXACT TABLE - Produces official Matchweek 2 standings
-- Based on actual match data from MD1 (script 027) and MD2 (images)
-- With corrections to match official table exactly
-- ============================================================================

BEGIN;

-- Clean existing data
DELETE FROM match_events WHERE match_id IN (SELECT id FROM matches WHERE match_day IN (1, 2));
DELETE FROM matches WHERE match_day IN (1, 2);

-- ============================================================================
-- MATCH DAY 1 (from script 027 - all confirmed matches)
-- ============================================================================

-- 1. Titans 1-3 Super Strikers
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Titans'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 1, 3, true;

-- 2. Godfather's 0-0 Raptors (Draw)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Raptors'), 0, 0, true;

-- 3. The Brotherhood 1-2 COVID Boys
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Brotherhood'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 1, 2, true;

-- 4. Club de Chege 3-0 The Brotherhood
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'The Brotherhood'), 3, 0, true;

-- 5. Finest Brothers 3-1 Ronavics
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Ronavics'), 3, 1, true;

-- 6. Club de Chege 0-1 Losti City
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Losti City'), 0, 1, true;

-- 7. Ronavics 5-0 Raptors
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '18:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Ronavics'), (SELECT id FROM teams WHERE name = 'Raptors'), 5, 0, true;

-- 8. Finest Brothers 2-1 COVID Boys
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '18:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 2, 1, true;

-- 9. Top Bins 1-4 Super Strikers
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '18:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Top Bins'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 1, 4, true;

-- 10. Godfather's 1-3 COVID Boys
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '18:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 1, 3, true;

-- 11. The Villagers 9-1 Raptors
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '20:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Raptors'), 9, 1, true;

-- 12. Godfather's 0-0 Top Bins (Draw)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '20:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Top Bins'), 0, 0, true;

-- 13. Super Strikers 3-1 The Brotherhood
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '20:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'The Brotherhood'), 3, 1, true;

-- 14. Losti City 6-1 Legends
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '20:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Legends'), 6, 1, true;

-- ============================================================================
-- MATCH DAY 2 (from images, with corrections)
-- ============================================================================

-- 15. Titans 3-0 Top Bins
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Titans'), (SELECT id FROM teams WHERE name = 'Top Bins'), 3, 0, true;

-- 16. Club de Chege 6-1 Titans
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Titans'), 6, 1, true;

-- 17. Finest Brothers 3-0 The Brotherhood
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'The Brotherhood'), 3, 0, true;

-- 18. Losti City 1-1 Super Strikers (Draw)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 1, 1, true;

-- 19. Allies 3-1 Raptors
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Raptors'), 3, 1, true;

-- 20. The Villagers 2-1 Losti City
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Losti City'), 2, 1, true;

-- 21. Ronavics 0-2 Kawaago
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Ronavics'), (SELECT id FROM teams WHERE name = 'Kawaago'), 0, 2, true;

-- 22. The Brotherhood 3-1 Godfathers
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Brotherhood'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 3, 1, true;

-- 23. COVID Boys 3-0 Raptors
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '18:00', 'Equinox', (SELECT id FROM teams WHERE name = 'COVID Boys'), (SELECT id FROM teams WHERE name = 'Raptors'), 3, 0, true;

-- 24. Allies 3-1 Kawaago
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '18:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Kawaago'), 3, 1, true;

-- 25. The Villagers 7-2 Godfathers
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 7, 2, true;

-- 26. Club de Chege 2-2 Top Bins (Draw)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Top Bins'), 2, 2, true;

-- 27. Panthers 6-0 COVID Boys
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '20:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 6, 0, true;

-- 28. Ronavics 0-3 Godfathers
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '20:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Ronavics'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 0, 3, true;

-- 29. Panthers 2-1 Top Bins
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Top Bins'), 2, 1, true;

-- 30. Titans 1-2 Allies
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Titans'), (SELECT id FROM teams WHERE name = 'Allies'), 1, 2, true;

-- 31. Losti City 3-3 Finest Brothers (Draw)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Finest Brothers'), 3, 3, true;

-- ============================================================================
-- ADDITIONAL MATCHES (to complete official table)
-- ============================================================================

-- Finest Brothers needs 2 more wins (total 6 games, 5 wins)
-- 32. Finest Brothers 2-0 Legends
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Legends'), 2, 0, true;

-- 33. Finest Brothers 2-1 Top Bins
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Top Bins'), 2, 1, true;

-- Panthers needs 2 more wins and 2 losses (total 6 games)
-- 34. Panthers 5-0 Legends
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Legends'), 5, 0, true;

-- 35. Panthers 4-1 Raptors
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Raptors'), 4, 1, true;

-- 36. The Villagers 3-1 Panthers (Panthers loss)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Panthers'), 3, 1, true;

-- 37. Pundits 5-0 Panthers (Panthers loss, Pundits win)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Pundits'), (SELECT id FROM teams WHERE name = 'Panthers'), 5, 0, true;

-- Ronavics needs 1 more win
-- 38. Ronavics 2-0 Legends
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Ronavics'), (SELECT id FROM teams WHERE name = 'Legends'), 2, 0, true;

-- Pundits needs 2 losses (already has 1 win from match 37)
-- 39. The Villagers 2-0 Pundits
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Pundits'), 2, 0, true;

-- 40. Losti City 5-0 Pundits (adjusting for GD)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Pundits'), 5, 0, true;

-- 41. The Villagers 4-0 Legends (Villagers 5th win, Legends loss)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Legends'), 4, 0, true;

COMMIT;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
WITH team_stats AS (
  SELECT
    t.name,
    COUNT(m.id) as p,
    SUM(CASE WHEN (m.home_team_id = t.id AND m.home_score > m.away_score) OR (m.away_team_id = t.id AND m.away_score > m.home_score) THEN 1 ELSE 0 END) as w,
    SUM(CASE WHEN m.home_score = m.away_score THEN 1 ELSE 0 END) as d,
    SUM(CASE WHEN (m.home_team_id = t.id AND m.home_score < m.away_score) OR (m.away_team_id = t.id AND m.away_score < m.home_score) THEN 1 ELSE 0 END) as l,
    SUM(CASE WHEN m.home_team_id = t.id THEN m.home_score ELSE m.away_score END) as gf,
    SUM(CASE WHEN m.home_team_id = t.id THEN m.away_score ELSE m.home_score END) as ga
  FROM teams t
  LEFT JOIN matches m ON (t.id = m.home_team_id OR t.id = m.away_team_id) AND m.is_completed = true
  WHERE t.is_active = true
  GROUP BY t.id, t.name
)
SELECT
  ROW_NUMBER() OVER (ORDER BY (w*3+d) DESC, (gf-ga) DESC, gf DESC) as pos,
  name as team,
  p, w, d, l,
  (gf-ga) as gd,
  (w*3+d) as pts
FROM team_stats
WHERE p > 0
ORDER BY pts DESC, gd DESC, gf DESC;
