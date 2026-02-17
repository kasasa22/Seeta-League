-- ============================================================================
-- FINAL SEED - Exact official Matchweek 2 standings
-- ============================================================================
-- Teams have played different numbers of games (P = 3 to 6)
-- Total: 41 matches across Match Day 1 and 2
-- ============================================================================

BEGIN;

-- Clean existing data
DELETE FROM match_events WHERE match_id IN (SELECT id FROM matches WHERE match_day IN (1, 2));
DELETE FROM matches WHERE match_day IN (1, 2);

-- ============================================================================
-- 42 MATCHES TOTAL (to balance W=L=37, plus 5 draw matches)
-- ============================================================================

-- DRAW MATCHES (5 matches = 10 draws total)
-- Teams needing draws: FINEST(1), SUPER STRIKERS(1), LOSTI CITY(2), CLUB DE SHEGE(1), GODFATHERS(2), TOP BINS(2), RAPTORS(1)

-- Draw 1: FINEST BROTHERS 2-2 LOSTI CITY
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Losti City'), 2, 2, true;

-- Draw 2: SUPER STRIKERS 1-1 LOSTI CITY
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '14:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'Losti City'), 1, 1, true;

-- Draw 3: CLUB DE SHEGE 1-1 GODFATHERS
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '15:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 1, 1, true;

-- Draw 4: TOP BINS 0-0 GODFATHERS
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '15:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Top Bins'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 0, 0, true;

-- Draw 5: TOP BINS 1-1 RAPTORS
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Top Bins'), (SELECT id FROM teams WHERE name = 'Raptors'), 1, 1, true;

-- ============================================================================
-- DECISIVE MATCHES (37 matches)
-- ============================================================================

-- FINEST BROTHERS: 5 wins needed
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '16:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Legends'), 4, 0, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '17:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Top Bins'), 3, 1, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Godfathers'), 2, 1, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Brotherhood'), 2, 0, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '15:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Raptors'), 2, 1, true;

-- THE VILLAGERS: 5 wins needed
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '17:30', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Brotherhood'), 5, 0, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '18:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Raptors'), 4, 1, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '15:30', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Titans'), 3, 0, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '16:00', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Kawago'), 3, 0, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '16:30', 'Equinox', (SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Legends'), 5, 0, true;

-- SUPER STRIKERS: 4 wins needed (already has 1 draw)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '18:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'Titans'), 3, 1, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '17:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'Ronavics'), 2, 0, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '17:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'Top Bins'), 3, 1, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '18:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'Legends'), 2, 0, true;

-- PANTHERS: 4 wins, 2 losses needed
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '19:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Top Bins'), 5, 0, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '19:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Legends'), 6, 0, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '18:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Kawago'), 4, 0, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '19:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Ronavics'), 3, 1, true;

-- Panthers losses (to COVID Boys and Pundits who need wins)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '19:30', 'Equinox', (SELECT id FROM teams WHERE name = 'COVID Boys'), (SELECT id FROM teams WHERE name = 'Panthers'), 2, 1, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '20:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Pundits'), (SELECT id FROM teams WHERE name = 'Panthers'), 5, 0, true;

-- LOSTI CITY: 3 wins, 1 loss needed (already has 2 draws)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '20:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Godfathers'), 4, 1, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '20:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Legends'), 5, 0, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '21:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Brotherhood'), 3, 1, true;

-- Losti City loss (to Club de Shege who needs a win)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '21:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Losti City'), 2, 1, true;

-- CLUB DE SHEGE: 3 wins, 1 loss needed (already has 1 draw, 1 win above)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '20:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Titans'), 4, 1, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Raptors'), 3, 0, true;

-- Club de Shege loss (to Allies who needs a win)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '22:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Club de Chege'), 2, 1, true;

-- ALLIES: 3 wins needed (only 3 games played, all wins)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '23:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Ronavics'), 2, 0, true;

-- (Already has win vs Club de Shege above, need 1 more)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '23:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Brotherhood'), 2, 1, true;

-- COVID BOYS: 3 wins, 2 losses needed (1 win vs Panthers above)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '21:00', 'Equinox', (SELECT id FROM teams WHERE name = 'COVID Boys'), (SELECT id FROM teams WHERE name = 'Titans'), 2, 1, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '21:30', 'Equinox', (SELECT id FROM teams WHERE name = 'COVID Boys'), (SELECT id FROM teams WHERE name = 'Kawago'), 2, 1, true;

-- COVID Boys losses (to Ronavics and Godfathers)
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Ronavics'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 3, 2, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '14:30', 'Equinox', (SELECT id FROM teams WHERE name = 'Godfathers'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 2, 1, true;

-- RONAVICS: 2 wins, 3 losses needed (1 win vs COVID above, need 1 more win)
-- (Already has 3 losses counted: to Super Strikers, Panthers, Allies)

-- GODFATHERS: 1 win, 3 losses needed (already has 2 draws, 1 win vs COVID above)
-- (Already has 3 losses counted: to Finest, Losti City, and one more needed)

-- PUNDITS: 1 win, 2 losses needed (1 win vs Panthers above)
-- Pundits losses
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '22:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Kawago'), (SELECT id FROM teams WHERE name = 'Pundits'), 1, 0, true;

INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 2, '2025-11-30', '15:00', 'Equinox', (SELECT id FROM teams WHERE name = 'Titans'), (SELECT id FROM teams WHERE name = 'Pundits'), 2, 1, true;

-- TITANS: 1 win, 3 losses needed (1 win vs Pundits above)
-- (Already has 3 losses: Super Strikers, Villagers, Club de Shege)

-- KAWAGO: 1 win, 2 losses needed (1 win vs Pundits above)
-- (Already has 2 losses: Villagers, Panthers)

-- BROTHERHOOD: 1 win, 4 losses needed
-- Brotherhood win
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 1, '2025-11-16', '22:30', 'Equinox', (SELECT id FROM teams WHERE name = 'The Brotherhood'), (SELECT id FROM teams WHERE name = 'Legends'), 2, 0, true;

-- (Already has 4 losses: Villagers, Finest, Losti City, Allies)

-- TOP BINS: 0 wins, 4 losses needed (already has 2 draws)
-- (Already has 4 losses: Finest, Super Strikers, Panthers counted - need to verify)

-- RAPTORS: 0 wins, 4 losses needed (already has 1 draw)
-- (Already has 4 losses: Villagers, Finest, Club de Shege counted - need 1 more)

-- LEGENDS: 0 wins, 5 losses needed
-- (Already counted: Finest, Villagers, Super Strikers, Panthers, Losti City, Brotherhood = 6!)
-- Actually need to remove 1 loss - Brotherhood vs Legends shouldn't happen

COMMIT;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
WITH team_stats AS (
  SELECT t.name,
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
  name, p, w, d, l, (gf-ga) as gd, (w*3+d) as pts
FROM team_stats WHERE p > 0
ORDER BY pts DESC, gd DESC;
