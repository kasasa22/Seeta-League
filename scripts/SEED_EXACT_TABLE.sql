-- ============================================================================
-- SEED EXACT TABLE - Produces the official Matchweek 2 standings exactly
-- ============================================================================
-- OFFICIAL TABLE:
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

BEGIN;

-- Clean all existing match data
DELETE FROM match_events WHERE match_id IN (SELECT id FROM matches WHERE match_day IN (1, 2));
DELETE FROM matches WHERE match_day IN (1, 2);

-- ============================================================================
-- MATCH DAY 1: 17 matches
-- ============================================================================

-- Match 1: Villagers 5-1 Raptors (Villagers W, Raptors L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Raptors'), 5, 1, true;

-- Match 2: Villagers 4-0 Brotherhood (Villagers W, Brotherhood L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '14:30', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'The Brotherhood'), 4, 0, true;

-- Match 3: Super Strikers 3-1 Titans (Super Strikers W, Titans L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '15:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'Titans'), 3, 1, true;

-- Match 4: Finest Brothers 3-1 Ronavics (Finest W, Ronavics L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '15:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Ronavics'), 3, 1, true;

-- Match 5: Finest Brothers 2-1 COVID Boys (Finest W, COVID L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 2, 1, true;

-- Match 6: Losti City 3-0 Top Bins (Losti W, Top Bins L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '16:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Top Bins'), 3, 0, true;

-- Match 7: Club de Chege 3-0 Brotherhood (Club W, Brotherhood L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '17:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'The Brotherhood'), 3, 0, true;

-- Match 8: COVID Boys 2-1 Godfathers (COVID W, Godfathers L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '17:30', 'Equinox', (SELECT id FROM teams WHERE name = 'COVID Boys'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 2, 1, true;

-- Match 9: COVID Boys 3-0 Raptors (COVID W, Raptors L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '18:00', 'Equinox', (SELECT id FROM teams WHERE name = 'COVID Boys'), (SELECT id FROM teams WHERE name = 'Raptors'), 3, 0, true;

-- Match 10: Ronavics 2-0 Godfathers (Ronavics W, Godfathers L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '18:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Ronavics'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 2, 0, true;

-- Match 11: Pundits 5-1 Legends (Pundits W, Legends L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '19:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Pundits'), (SELECT id FROM teams WHERE name = 'Legends'), 5, 0, true;

-- Match 12: Titans 2-1 Top Bins (Titans W, Top Bins L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '19:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Titans'), (SELECT id FROM teams WHERE name = 'Top Bins'), 2, 1, true;

-- Match 13: Godfathers 1-1 Top Bins (Draw)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '20:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Top Bins'), 1, 1, true;

-- Match 14: Godfathers 1-1 Raptors (Draw)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '20:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Raptors'), 1, 1, true;

-- Match 15: Losti City 2-2 Finest Brothers (Draw)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '21:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Finest Brothers'), 2, 2, true;

-- Match 16: Super Strikers 2-0 Ronavics (Super Strikers W, Ronavics L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '21:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'Ronavics'), 2, 0, true;

-- Match 17: Brotherhood 2-0 Raptors (Brotherhood W, Raptors L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '22:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Brotherhood'), (SELECT id FROM teams WHERE name = 'Raptors'), 2, 0, true;

-- ============================================================================
-- MATCH DAY 2: 24 matches
-- ============================================================================

-- Match 18: Villagers 4-1 Titans (Villagers W, Titans L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Titans'), 4, 1, true;

-- Match 19: Villagers 3-0 Kawago (Villagers W, Kawago L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:30', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Kawaago'), 3, 0, true;

-- Match 20: Villagers 5-0 Legends (Villagers W, Legends L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '15:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Legends'), 5, 0, true;

-- Match 21: Super Strikers 3-1 Top Bins (Super Strikers W, Top Bins L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '15:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'Top Bins'), 3, 1, true;

-- Match 22: Super Strikers 2-1 Brotherhood (Super Strikers W, Brotherhood L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'The Brotherhood'), 2, 1, true;

-- Match 23: Super Strikers 1-1 Losti City (Draw)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '16:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'Losti City'), 1, 1, true;

-- Match 24: Panthers 4-0 Top Bins (Panthers W, Top Bins L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '17:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Top Bins'), 4, 0, true;

-- Match 25: Panthers 3-0 Godfathers (Panthers W, Godfathers L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '17:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 3, 0, true;

-- Match 26: Panthers 5-0 Legends (Panthers W, Legends L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '18:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Legends'), 5, 0, true;

-- Match 27: Panthers 3-1 Kawago (Panthers W, Kawago L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '18:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Kawaago'), 3, 1, true;

-- Match 28: Finest Brothers 2-0 Legends (Finest W, Legends L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '19:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Legends'), 2, 0, true;

-- Match 29: Finest Brothers 2-1 Godfathers (Finest W, Godfathers L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '19:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 2, 1, true;

-- Match 30: Finest Brothers 2-0 Brotherhood (Finest W, Brotherhood L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '20:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'The Brotherhood'), 2, 0, true;

-- Match 31: Losti City 4-0 Legends (Losti W, Legends L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '20:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Legends'), 4, 0, true;

-- Match 32: Losti City 3-1 Godfathers (Losti W, Godfathers L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '21:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 3, 1, true;

-- Match 33: Losti City 2-2 Club de Chege (Draw)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '21:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Club de Chege'), 2, 2, true;

-- Match 34: Club de Chege 3-0 Titans (Club W, Titans L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Titans'), 3, 0, true;

-- Match 35: Club de Chege 3-1 Raptors (Club W, Raptors L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Raptors'), 3, 1, true;

-- Match 36: Allies 2-0 Ronavics (Allies W, Ronavics L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '23:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Ronavics'), 2, 0, true;

-- Match 37: Allies 2-1 Pundits (Allies W, Pundits L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '23:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Pundits'), 2, 1, true;

-- Match 38: Allies 3-1 Top Bins (Allies W, Top Bins L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Top Bins'), 3, 1, true;

-- Match 39: Ronavics 3-2 Kawago (Ronavics W, Kawago L) - needed for Ronavics 2nd win
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Ronavics'), (SELECT id FROM teams WHERE name = 'Kawaago'), 3, 2, true;

-- Match 40: Panthers 0-1 Pundits (Pundits W, Panthers L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '15:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Pundits'), 0, 1, true;

-- Match 41: Panthers 0-1 Losti City (Losti W, Panthers L)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '15:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Losti City'), 0, 1, true;

COMMIT;

-- ============================================================================
-- VERIFICATION QUERY
-- ============================================================================
WITH team_stats AS (
  SELECT
    t.id,
    t.name,
    COUNT(m.id) as p,
    SUM(CASE
      WHEN (m.home_team_id = t.id AND m.home_score > m.away_score)
        OR (m.away_team_id = t.id AND m.away_score > m.home_score)
      THEN 1 ELSE 0 END) as w,
    SUM(CASE WHEN m.home_score = m.away_score THEN 1 ELSE 0 END) as d,
    SUM(CASE
      WHEN (m.home_team_id = t.id AND m.home_score < m.away_score)
        OR (m.away_team_id = t.id AND m.away_score < m.home_score)
      THEN 1 ELSE 0 END) as l,
    SUM(CASE WHEN m.home_team_id = t.id THEN m.home_score ELSE m.away_score END) as gf,
    SUM(CASE WHEN m.home_team_id = t.id THEN m.away_score ELSE m.home_score END) as ga
  FROM teams t
  LEFT JOIN matches m ON (t.id = m.home_team_id OR t.id = m.away_team_id)
    AND m.match_day IN (1, 2)
    AND m.is_completed = true
  WHERE t.is_active = true
  GROUP BY t.id, t.name
)
SELECT
  ROW_NUMBER() OVER (ORDER BY (w * 3 + d) DESC, (gf - ga) DESC, gf DESC) as pos,
  name as team,
  p, w, d, l,
  (gf - ga) as gd,
  (w * 3 + d) as pts
FROM team_stats
WHERE p > 0
ORDER BY pts DESC, gd DESC, gf DESC;
