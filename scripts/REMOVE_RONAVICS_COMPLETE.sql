-- ============================================================================
-- COMPLETE REMOVAL OF RONAVICS
-- Removes Ronavics team and all their matches completely
-- Recalculates standings for all remaining teams
-- ============================================================================

BEGIN;

-- ============================================================================
-- STEP 1: COMPLETE CLEANUP - Remove all data
-- ============================================================================

DELETE FROM matches;
DELETE FROM league_standings;
DELETE FROM teams;

-- ============================================================================
-- STEP 2: CREATE ALL 13 TEAMS (NO RONAVICS)
-- ============================================================================

INSERT INTO teams (name, is_active) VALUES
('Finest Brothers', true),
('Losti City', true),
('Panthers', true),
('The Villagers', true),
('Allies', true),
('Super Strikers', true),
('Godfather''s', true),
('Club de Chege', true),
('COVID Boys', true),
('Pundits', true),
('Top Bins', true),
('Raptors', true),
('Kawaago', true);

-- ============================================================================
-- STEP 3: CREATE LEAGUE STANDINGS FOR ALL TEAMS
-- ============================================================================

INSERT INTO league_standings (team_id, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position)
SELECT id, name, 0, 0, 0, 0, 0, 0, 0, 0, 0
FROM teams
WHERE is_active = true;

-- ============================================================================
-- STEP 4: SEED ALL MATCH RESULTS (EXCLUDING RONAVICS GAMES)
-- ============================================================================

-- FINEST BROTHERS MATCHES (5 games - removed Ronavics match)
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Allies'), 5, 3, true, '2025-12-07', 1, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Raptors'), (SELECT id FROM teams WHERE name = 'Finest Brothers'), 0, 5, true, '2025-12-07', 1, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Finest Brothers'), 1, 2, true, '2025-12-07', 2, 'Equinox', '18:00'),
((SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Top Bins'), 2, 0, true, '2025-12-14', 2, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Finest Brothers'), 3, 3, true, '2025-12-21', 3, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 2, 1, true, '2025-12-21', 3, 'Equinox', '16:00');

-- LOSTI CITY MATCHES (8 games)
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'Raptors'), (SELECT id FROM teams WHERE name = 'Losti City'), 0, 10, true, '2025-12-07', 1, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Pundits'), 2, 1, true, '2025-12-07', 1, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'Kawaago'), (SELECT id FROM teams WHERE name = 'Losti City'), 0, 4, true, '2025-12-14', 2, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Losti City'), 0, 1, true, '2025-12-14', 2, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Losti City'), 2, 1, true, '2025-12-21', 3, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 1, 1, true, '2025-12-21', 3, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Losti City'), 0, 5, true, '2025-12-28', 4, 'Equinox', '14:00');

-- PANTHERS MATCHES (7 games - one duplicate removed)
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'Raptors'), (SELECT id FROM teams WHERE name = 'Panthers'), 0, 4, true, '2025-12-07', 1, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Kawaago'), 9, 1, true, '2025-12-07', 1, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'Pundits'), (SELECT id FROM teams WHERE name = 'Panthers'), 0, 4, true, '2025-12-14', 2, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Panthers'), 2, 0, true, '2025-12-14', 2, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Top Bins'), 2, 1, true, '2025-12-21', 3, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 6, 0, true, '2025-12-21', 3, 'Equinox', '16:00');

-- THE VILLAGERS MATCHES (7 games)
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Kawaago'), 7, 2, true, '2025-12-07', 1, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 3, 6, true, '2025-12-07', 1, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Allies'), 5, 8, true, '2025-12-14', 2, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 7, 2, true, '2025-12-14', 2, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Raptors'), 3, 1, true, '2025-12-21', 3, 'Equinox', '14:00');

-- ALLIES MATCHES (6 games)
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 2, 1, true, '2025-12-07', 1, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Club de Chege'), 3, 4, true, '2025-12-07', 1, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Kawaago'), 3, 1, true, '2025-12-14', 2, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Raptors'), 3, 1, true, '2025-12-14', 2, 'Equinox', '16:00');

-- SUPER STRIKERS MATCHES (5 games)
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'Top Bins'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 1, 4, true, '2025-12-07', 1, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Pundits'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 0, 1, true, '2025-12-07', 1, 'Equinox', '16:00');

-- GODFATHERS MATCHES (4 games - removed Ronavics match)
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Club de Chege'), 4, 0, true, '2025-12-07', 1, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Top Bins'), 0, 0, true, '2025-12-07', 1, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Raptors'), 0, 0, true, '2025-12-14', 2, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'COVID Boys'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 3, 1, true, '2025-12-21', 3, 'Equinox', '14:00');

-- CLUB DE CHEGE MATCHES (5 games)
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Pundits'), 1, 0, true, '2025-12-07', 1, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Top Bins'), 2, 2, true, '2025-12-07', 1, 'Equinox', '16:00');

-- COVID BOYS MATCHES (4 games)
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'COVID Boys'), (SELECT id FROM teams WHERE name = 'Raptors'), 3, 0, true, '2025-12-07', 1, 'Equinox', '14:00');

-- PUNDITS MATCHES (5 games)
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'Kawaago'), (SELECT id FROM teams WHERE name = 'Pundits'), 1, 7, true, '2025-12-07', 1, 'Equinox', '14:00');

-- RAPTORS MATCHES (6 games - removed Ronavics match)
-- All matches already included above

-- KAWAAGO MATCHES (4 games - removed Ronavics match)
-- All matches already included above

-- ============================================================================
-- STEP 5: UPDATE LEAGUE STANDINGS - RECALCULATED WITHOUT RONAVICS
-- ============================================================================

-- 1. LOSTI CITY (8 games: 5W, 2D, 1L) - 17 points (unchanged)
UPDATE league_standings SET
  played = 8, won = 5, drawn = 2, lost = 1,
  goals_for = 27, goals_against = 7, goal_difference = 20,
  points = 17
WHERE team_name = 'Losti City';

-- 2. FINEST BROTHERS (6 games: 5W, 1D, 0L) - 16 points (was 7 games with Ronavics)
UPDATE league_standings SET
  played = 6, won = 5, drawn = 1, lost = 0,
  goals_for = 17, goals_against = 8, goal_difference = 9,
  points = 16
WHERE team_name = 'Finest Brothers';

-- 3. PANTHERS (7 games: 5W, 0D, 2L) - 15 points (unchanged)
UPDATE league_standings SET
  played = 7, won = 5, drawn = 0, lost = 2,
  goals_for = 25, goals_against = 9, goal_difference = 16,
  points = 15
WHERE team_name = 'Panthers';

-- 4. VILLAGERS (7 games: 5W, 0D, 2L) - 15 points (unchanged)
UPDATE league_standings SET
  played = 7, won = 5, drawn = 0, lost = 2,
  goals_for = 29, goals_against = 20, goal_difference = 9,
  points = 15
WHERE team_name = 'The Villagers';

-- 5. ALLIES (6 games: 4W, 0D, 2L) - 12 points (unchanged)
UPDATE league_standings SET
  played = 6, won = 4, drawn = 0, lost = 2,
  goals_for = 22, goals_against = 17, goal_difference = 5,
  points = 12
WHERE team_name = 'Allies';

-- 6. SUPER STRIKERS (5 games: 3W, 1D, 1L) - 10 points (unchanged)
UPDATE league_standings SET
  played = 5, won = 3, drawn = 1, lost = 1,
  goals_for = 13, goals_against = 7, goal_difference = 6,
  points = 10
WHERE team_name = 'Super Strikers';

-- 7. CLUB DE CHEGE (5 games: 2W, 1D, 2L) - 7 points (unchanged)
UPDATE league_standings SET
  played = 5, won = 2, drawn = 1, lost = 2,
  goals_for = 7, goals_against = 10, goal_difference = -3,
  points = 7
WHERE team_name = 'Club de Chege';

-- 8. COVID BOYS (4 games: 2W, 0D, 2L) - 6 points (unchanged)
UPDATE league_standings SET
  played = 4, won = 2, drawn = 0, lost = 2,
  goals_for = 7, goals_against = 9, goal_difference = -2,
  points = 6
WHERE team_name = 'COVID Boys';

-- 9. GODFATHERS (4 games: 1W, 2D, 1L) - 5 points (was 6 games with Ronavics)
UPDATE league_standings SET
  played = 4, won = 1, drawn = 2, lost = 1,
  goals_for = 5, goals_against = 9, goal_difference = -4,
  points = 5
WHERE team_name = 'Godfather''s';

-- 10. PUNDITS (5 games: 1W, 0D, 4L) - 3 points (unchanged)
UPDATE league_standings SET
  played = 5, won = 1, drawn = 0, lost = 4,
  goals_for = 8, goals_against = 9, goal_difference = -1,
  points = 3
WHERE team_name = 'Pundits';

-- 11. TOP BINS (5 games: 0W, 2D, 3L) - 2 points (unchanged)
UPDATE league_standings SET
  played = 5, won = 0, drawn = 2, lost = 3,
  goals_for = 4, goals_against = 10, goal_difference = -6,
  points = 2
WHERE team_name = 'Top Bins';

-- 12. RAPTORS (6 games: 0W, 1D, 5L) - 1 point (was 7 games with Ronavics)
UPDATE league_standings SET
  played = 6, won = 0, drawn = 1, lost = 5,
  goals_for = 2, goals_against = 23, goal_difference = -21,
  points = 1
WHERE team_name = 'Raptors';

-- 13. KAWAAGO (4 games: 0W, 0D, 4L) - 0 points (was 5 games with Ronavics)
UPDATE league_standings SET
  played = 4, won = 0, drawn = 0, lost = 4,
  goals_for = 3, goals_against = 28, goal_difference = -25,
  points = 0
WHERE team_name = 'Kawaago';

-- ============================================================================
-- STEP 6: UPDATE POSITIONS BASED ON POINTS, GOAL DIFFERENCE, AND GOALS FOR
-- ============================================================================

WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY points DESC, goal_difference DESC, goals_for DESC) as new_position
  FROM league_standings
)
UPDATE league_standings SET position = ranked.new_position
FROM ranked WHERE league_standings.id = ranked.id;

COMMIT;

-- ============================================================================
-- FINAL STANDINGS VIEW (13 TEAMS - NO RONAVICS)
-- ============================================================================

SELECT
    position as "Pos",
    team_name as "Team",
    played as "P",
    won as "W",
    drawn as "D",
    lost as "L",
    goals_for as "GF",
    goals_against as "GA",
    goal_difference as "GD",
    points as "Pts"
FROM league_standings
ORDER BY position;
