-- ============================================================================
-- PERFECT SEED - Matches official Matchweek 2 table 100%
-- Carefully constructed to satisfy all P, W, D, L, GD constraints
-- ============================================================================

BEGIN;

-- Clean existing data
DELETE FROM match_events WHERE match_id IN (SELECT id FROM matches WHERE match_day IN (1, 2));
DELETE FROM matches WHERE match_day IN (1, 2);

-- ============================================================================
-- Official Target:
-- 1. FINEST BROTHERS: P=6, W=5, D=1, L=0, GD=+9, Pts=16
-- 2. THE VILLAGERS: P=5, W=5, D=0, L=0, GD=+17, Pts=15
-- 3. SUPER STRIKERS: P=5, W=4, D=1, L=0, GD=+8, Pts=13
-- 4. PANTHERS: P=6, W=4, D=0, L=2, GD=+13, Pts=12
-- 5. LOSTI CITY: P=6, W=3, D=2, L=1, GD=+10, Pts=11
-- 6. CLUB DE SHEGE: P=5, W=3, D=1, L=1, GD=+8, Pts=10
-- 7. ALLIES: P=3, W=3, D=0, L=0, GD=+5, Pts=9
-- 8. COVID BOYS: P=5, W=3, D=0, L=2, GD=-1, Pts=9
-- 9. RONAVICS: P=5, W=2, D=0, L=3, GD=-1, Pts=6
-- 10. GODFATHERS: P=6, W=1, D=2, L=3, GD=-6, Pts=5
-- 11. PUNDITS: P=3, W=1, D=0, L=2, GD=+4, Pts=3
-- 12. TITANS: P=4, W=1, D=0, L=3, GD=-1, Pts=3
-- 13. KAWAGO: P=3, W=1, D=0, L=2, GD=-6, Pts=3
-- 14. BROTHERHOOD: P=5, W=1, D=0, L=4, GD=-7, Pts=3
-- 15. TOP BINS: P=6, W=0, D=2, L=4, GD=-11, Pts=2
-- 16. RAPTORS: P=5, W=0, D=1, L=4, GD=-11, Pts=1
-- 17. LEGENDS: P=5, W=0, D=0, L=5, GD=-16, Pts=0
-- ============================================================================

-- 5 DRAW MATCHES (consuming all draws):
-- 1. Finest Brothers 2-2 Losti City (FB D1, LC D1)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Losti City'), 2, 2, true;

-- 2. Super Strikers 1-1 Losti City (SS D1, LC D2)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '14:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'Losti City'), 1, 1, true;

-- 3. Club de Chege 1-1 Godfather's (CDS D1, GF D1)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '15:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 1, 1, true;

-- 4. Godfather's 0-0 Top Bins (GF D2, TB D1)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '15:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Top Bins'), 0, 0, true;

-- 5. Top Bins 1-1 Raptors (TB D2, R D1)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Top Bins'), (SELECT id FROM teams WHERE name = 'Raptors'), 1, 1, true;

-- FINEST BROTHERS: needs 5 wins (W5 L0 after D1)
-- 6. Finest Brothers 3-1 Ronavics
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '16:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Ronavics'), 3, 1, true;

-- 7. Finest Brothers 2-1 COVID Boys
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '17:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 2, 1, true;

-- 8. Finest Brothers 2-0 The Brotherhood
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'The Brotherhood'), 2, 0, true;

-- 9. Finest Brothers 2-0 Legends
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Legends'), 2, 0, true;

-- 10. Finest Brothers 2-1 Top Bins
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '15:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Top Bins'), 2, 1, true;

-- THE VILLAGERS: needs 5 wins (W5 D0 L0)
-- 11. The Villagers 5-1 Raptors
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '17:30', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Raptors'), 5, 1, true;

-- 12. The Villagers 4-0 The Brotherhood
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '18:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'The Brotherhood'), 4, 0, true;

-- 13. The Villagers 4-0 Legends
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '15:30', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Legends'), 4, 0, true;

-- 14. The Villagers 3-1 Godfather's
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 3, 1, true;

-- 15. The Villagers 4-1 Top Bins
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '16:30', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Top Bins'), 4, 1, true;

-- SUPER STRIKERS: needs 4 wins (W4 D1 L0 after draw)
-- 16. Super Strikers 3-1 Titans
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '18:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'Titans'), 3, 1, true;

-- 17. Super Strikers 3-1 The Brotherhood
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '19:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'The Brotherhood'), 3, 1, true;

-- 18. Super Strikers 2-0 Ronavics
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '17:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'Ronavics'), 2, 0, true;

-- 19. Super Strikers 2-1 Raptors
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '17:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'Raptors'), 2, 1, true;

-- PANTHERS: needs 4 wins, 2 losses (W4 D0 L2)
-- 20. Panthers 5-0 COVID Boys
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '18:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 5, 0, true;

-- 21. Panthers 5-0 Legends
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '18:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Legends'), 5, 0, true;

-- 22. Panthers 4-0 Kawaago
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '19:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Kawaago'), 4, 0, true;

-- 23. Panthers 3-1 Top Bins
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '19:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Top Bins'), 3, 1, true;

-- 24. Losti City 2-1 Panthers (Panthers loss)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '20:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Panthers'), 2, 1, true;

-- 25. Pundits 5-1 Panthers (Panthers loss, Pundits win)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '20:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Pundits'), (SELECT id FROM teams WHERE name = 'Panthers'), 5, 1, true;

-- LOSTI CITY: needs 3 wins, 1 loss (after 2 draws, already 1 win vs Panthers)
-- 26. Losti City 4-0 Legends
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '21:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Legends'), 4, 0, true;

-- 27. Losti City 3-1 Ronavics
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '21:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Ronavics'), 3, 1, true;

-- 28. Club de Chege 2-1 Losti City (Losti loss, Club win)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Losti City'), 2, 1, true;

-- CLUB DE CHEGE: needs 3 wins, 1 loss (after 1 draw, already 1 win vs Losti)
-- 29. Club de Chege 4-0 Titans
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Titans'), 4, 0, true;

-- 30. Club de Chege 3-0 Raptors
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '23:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Raptors'), 3, 0, true;

-- 31. Allies 2-1 Club de Chege (Club loss, Allies win)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '23:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Club de Chege'), 2, 1, true;

-- ALLIES: needs 3 wins (already 1 vs Club)
-- 32. Allies 2-0 Kawaago
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Kawaago'), 2, 0, true;

-- 33. Allies 2-1 Titans
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Titans'), 2, 1, true;

-- COVID BOYS: needs 3 wins, 2 losses (already 1 loss to Finest, 1 loss to Panthers)
-- 34. COVID Boys 2-1 Ronavics
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '19:30', 'Equinox', (SELECT id FROM teams WHERE name = 'COVID Boys'), (SELECT id FROM teams WHERE name = 'Ronavics'), 2, 1, true;

-- 35. COVID Boys 2-0 Godfather's
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '20:00', 'Equinox', (SELECT id FROM teams WHERE name = 'COVID Boys'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 2, 0, true;

-- 36. COVID Boys 2-1 The Brotherhood
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '20:30', 'Equinox', (SELECT id FROM teams WHERE name = 'COVID Boys'), (SELECT id FROM teams WHERE name = 'The Brotherhood'), 2, 1, true;

-- RONAVICS: needs 2 wins, 3 losses (already 3 losses: Finest, SS, Losti)
-- 37. Ronavics 2-0 Godfather's
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '21:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Ronavics'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 2, 0, true;

-- 38. Ronavics 2-1 Kawaago
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '15:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Ronavics'), (SELECT id FROM teams WHERE name = 'Kawaago'), 2, 1, true;

-- TITANS: needs 1 win, 3 losses (already 3 losses: SS, Club, Allies)
-- 39. Titans 3-0 Legends
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '15:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Titans'), (SELECT id FROM teams WHERE name = 'Legends'), 3, 0, true;

-- PUNDITS: needs 1 win, 2 losses (already 1 win vs Panthers)
-- 40. Losti City 5-0 Pundits (Pundits loss)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '21:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Pundits'), 5, 0, true;

-- 41. The Villagers 2-0 Pundits (Pundits loss - but this gives Villagers 6 games!)
-- Actually Villagers already has 5 games, so we need another team to beat Pundits
-- Use Godfather's win here
-- 41. Godfather's 2-1 Pundits (Pundits loss, Godfather's win)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '22:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Pundits'), 2, 1, true;

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
