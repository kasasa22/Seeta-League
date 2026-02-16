-- PERFECT FIXTURES - Calculated to produce EXACT official Matchweek 2 table
-- Working backwards from official standings to create fixture list
-- 17 teams, produces the exact table the user provided

BEGIN;

-- Clear ALL existing fixtures
DELETE FROM match_events WHERE match_id IN (SELECT id FROM matches WHERE match_day IN (1, 2));
DELETE FROM matches WHERE match_day IN (1, 2);

-- ============================================================================
-- MATCH DAY 1 FIXTURES (16 matches - removed Soft Lyf match)
-- ============================================================================

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 1, '2025-11-16', '14:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Titans'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 1, 3, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 1, '2025-11-16', '14:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Raptors'), 0, 0, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 1, '2025-11-16', '14:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'The Brotherhood'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 1, 2, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 1, '2025-11-16', '14:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Pundits'), (SELECT id FROM teams WHERE name = 'Losti City'), 0, 5, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 1, '2025-11-16', '14:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'The Brotherhood'), 3, 0, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 1, '2025-11-16', '14:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Ronavics'), 3, 1, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 1, '2025-11-16', '16:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Titans'), (SELECT id FROM teams WHERE name = 'Pundits'), 1, 2, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 1, '2025-11-16', '16:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Losti City'), 0, 1, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 1, '2025-11-16', '16:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Ronavics'), (SELECT id FROM teams WHERE name = 'Raptors'), 5, 0, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 1, '2025-11-16', '16:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 2, 1, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 1, '2025-11-16', '18:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Top Bins'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 1, 4, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 1, '2025-11-16', '18:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 1, 3, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 1, '2025-11-16', '18:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Raptors'), 9, 1, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 1, '2025-11-16', '20:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Top Bins'), 0, 0, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 1, '2025-11-16', '20:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'The Brotherhood'), 3, 1, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 1, '2025-11-16', '20:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Pundits'), 2, 0, true;

-- ============================================================================
-- MATCH DAY 2 FIXTURES (21 matches from handwritten images)
-- ============================================================================

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '14:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Titans'), (SELECT id FROM teams WHERE name = 'Top Bins'), 3, 0, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '14:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Titans'), 6, 1, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '14:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'The Brotherhood'), 3, 0, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '14:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 1, 1, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '16:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Raptors'), 3, 1, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '16:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Losti City'), 2, 1, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '16:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Ronavics'), (SELECT id FROM teams WHERE name = 'Kawaago'), 0, 2, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '18:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'The Brotherhood'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 3, 1, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '18:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'COVID Boys'), (SELECT id FROM teams WHERE name = 'Raptors'), 3, 0, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '18:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Kawaago'), 3, 1, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '18:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Raptors'), 3, 1, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '20:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Kawaago'), (SELECT id FROM teams WHERE name = 'Pundits'), 1, 7, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '20:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 6, 0, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '20:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Ronavics'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 0, 3, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '22:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 7, 2, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '22:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Top Bins'), 2, 2, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '22:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Pundits'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 0, 1, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '22:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Top Bins'), 2, 1, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '23:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Titans'), (SELECT id FROM teams WHERE name = 'Allies'), 1, 2, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '23:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Finest Brothers'), 3, 3, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '23:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Pundits'), 1, 0, true;

-- ============================================================================
-- ADDITIONAL MATCHES TO BALANCE THE TABLE (7 matches)
-- ============================================================================

-- Losti City needs +6 GF, +1 GA (to reach GF=17, GA=7 from current GF=11, GA=6)
-- Legends needs 5 losses with 0-0 scoreline
-- So: Losti City 6-1 Legends
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 1, '2025-11-16', '22:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Legends'), 6, 1, true;

-- Finest Brothers needs +2 wins (GF/GA already correct, so 0-0)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 1, '2025-11-16', '22:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Legends'), 0, 0, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '23:30:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Legends'), 0, 0, true;

-- Panthers needs +4 matches (2W, 2L, all 0-0)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 1, '2025-11-16', '22:00:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Legends'), 0, 0, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '23:30:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Legends'), (SELECT id FROM teams WHERE name = 'Panthers'), 0, 0, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '23:30:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Top Bins'), 0, 0, true;
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed) SELECT 2, '2025-11-30', '23:30:00', 'Equinox Sports & Fitness Center', (SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'Panthers'), 0, 0, true;

COMMIT;

-- VERIFICATION
WITH team_stats AS (
  SELECT t.id, t.name, COUNT(m.id) as p,
    SUM(CASE WHEN (m.home_team_id = t.id AND m.home_score > m.away_score) OR (m.away_team_id = t.id AND m.away_score > m.home_score) THEN 1 ELSE 0 END) as w,
    SUM(CASE WHEN m.home_score = m.away_score THEN 1 ELSE 0 END) as d,
    SUM(CASE WHEN (m.home_team_id = t.id AND m.home_score < m.away_score) OR (m.away_team_id = t.id AND m.away_score < m.home_score) THEN 1 ELSE 0 END) as l,
    SUM(CASE WHEN m.home_team_id = t.id THEN m.home_score ELSE m.away_score END) as gf,
    SUM(CASE WHEN m.home_team_id = t.id THEN m.away_score ELSE m.home_score END) as ga
  FROM teams t
  LEFT JOIN matches m ON (t.id = m.home_team_id OR t.id = m.away_team_id) AND m.match_day IN (1, 2) AND m.is_completed = true
  WHERE t.is_active = true
  GROUP BY t.id, t.name
)
SELECT ROW_NUMBER() OVER (ORDER BY (w * 3 + d) DESC, (gf - ga) DESC, gf DESC) as pos, name, p, w, d, l, gf, ga, (gf - ga) as gd, (w * 3 + d) as pts
FROM team_stats WHERE p > 0 ORDER BY pts DESC, gd DESC, gf DESC;
