-- ============================================================================
-- SEED OFFICIAL TABLE - Using actual match results from Match Day 1 & 2
-- Match Day 1: From script 027 (handwritten records)
-- Match Day 2: From official Matchweek 2 Results images
-- ============================================================================

BEGIN;

-- Clean existing match data
DELETE FROM match_events WHERE match_id IN (SELECT id FROM matches WHERE match_day IN (1, 2));
DELETE FROM matches WHERE match_day IN (1, 2);

-- ============================================================================
-- MATCH DAY 1 (17 matches from script 027)
-- ============================================================================

-- 1. Titans 1-3 Super Strikers
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Titans'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 1, 3, true;

-- 2. Godfather's 0-0 Raptors
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Raptors'), 0, 0, true;

-- 3. The Brotherhood 1-2 COVID Boys
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Brotherhood'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 1, 2, true;

-- 4. Pundits 0-5 Losti City
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Pundits'), (SELECT id FROM teams WHERE name = 'Losti City'), 0, 5, true;

-- 5. Club de Chege 3-0 The Brotherhood
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'The Brotherhood'), 3, 0, true;

-- 6. Finest Brothers 3-1 Ronavics
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Ronavics'), 3, 1, true;

-- 7. Titans 1-2 Pundits
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Titans'), (SELECT id FROM teams WHERE name = 'Pundits'), 1, 2, true;

-- 8. Club de Chege 0-1 Losti City
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Losti City'), 0, 1, true;

-- 9. Ronavics 5-0 Raptors
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '18:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Ronavics'), (SELECT id FROM teams WHERE name = 'Raptors'), 5, 0, true;

-- 10. Finest Brothers 2-1 COVID Boys
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '18:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 2, 1, true;

-- 11. Top Bins 1-4 Super Strikers
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '18:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Top Bins'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 1, 4, true;

-- 12. Godfather's 1-3 COVID Boys
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '18:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 1, 3, true;

-- 13. The Villagers 9-1 Raptors
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '20:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Raptors'), 9, 1, true;

-- 14. Godfather's 0-0 Top Bins
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '20:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Top Bins'), 0, 0, true;

-- 15. Super Strikers 3-1 The Brotherhood
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '20:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'The Brotherhood'), 3, 1, true;

-- 16. Losti City 6-1 Legends (was "Soft Lyf" in handwritten, but = Legends in official table)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '20:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Legends'), 6, 1, true;

-- 17. The Villagers 2-0 Pundits
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '22:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Pundits'), 2, 0, true;

-- ============================================================================
-- MATCH DAY 2 (21 matches from official Matchweek 2 Results images)
-- ============================================================================

-- 1. Titans 3-0 Top Bins
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Titans'), (SELECT id FROM teams WHERE name = 'Top Bins'), 3, 0, true;

-- 2. Club de Shege 6-1 Titans
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Titans'), 6, 1, true;

-- 3. Finest Brothers 3-0 Brotherhood
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'The Brotherhood'), 3, 0, true;

-- 4. Losti City 1-1 Super Strikers
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 1, 1, true;

-- 5. Allies 3-1 Raptors
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Raptors'), 3, 1, true;

-- 6. The Villagers 2-1 Losti City
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Losti City'), 2, 1, true;

-- 7. Ronavics 0-2 Kawaago
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Ronavics'), (SELECT id FROM teams WHERE name = 'Kawaago'), 0, 2, true;

-- 8. Brotherhood 3-1 Godfathers
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Brotherhood'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 3, 1, true;

-- 9. COVID Boys 3-0 Raptors
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '18:00', 'Equinox', (SELECT id FROM teams WHERE name = 'COVID Boys'), (SELECT id FROM teams WHERE name = 'Raptors'), 3, 0, true;

-- 10. Allies 3-1 Kawaago
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '18:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Kawaago'), 3, 1, true;

-- 11. The Villagers 3-1 Raptors
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '18:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Raptors'), 3, 1, true;

-- 12. Kawaago 1-7 Pundits
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '20:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Kawaago'), (SELECT id FROM teams WHERE name = 'Pundits'), 1, 7, true;

-- 13. Panthers 6-0 COVID Boys
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '20:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 6, 0, true;

-- 14. Ronavics 0-3 Godfathers
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '20:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Ronavics'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 0, 3, true;

-- 15. The Villagers 7-2 Godfathers
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 7, 2, true;

-- 16. Club de Shege 2-2 Top Bins
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Top Bins'), 2, 2, true;

-- 17. Pundits 0-1 Super Strikers
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Pundits'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 0, 1, true;

-- 18. Panthers 2-1 Top Bins
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Top Bins'), 2, 1, true;

-- 19. Titans 1-2 Allies
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Titans'), (SELECT id FROM teams WHERE name = 'Allies'), 1, 2, true;

-- 20. Losti City 3-3 Finest Brothers
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Finest Brothers'), 3, 3, true;

-- 21. Club de Shege 1-0 Pundits
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Pundits'), 1, 0, true;

COMMIT;

-- ============================================================================
-- VERIFICATION - Show standings
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
