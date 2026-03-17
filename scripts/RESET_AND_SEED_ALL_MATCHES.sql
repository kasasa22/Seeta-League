-- ============================================================================
-- RESET AND SEED ALL MATCH RESULTS
-- Deletes all existing match data and reseeds with complete results
-- ============================================================================

BEGIN;

-- Step 1: Delete all existing matches first (no foreign key dependencies)
DELETE FROM matches;

-- Step 2: Delete league standings for teams not in the active list
DELETE FROM league_standings WHERE team_name NOT IN (
  'Finest Brothers',
  'Losti City',
  'Panthers',
  'The Villagers',
  'Allies',
  'Super Strikers',
  'Godfather''s',
  'Club de Chege',
  'COVID Boys',
  'Pundits',
  'Ronavics',
  'Kawaago',
  'Top Bins',
  'Raptors'
);

-- Step 3: Now delete teams not in the active list (after standings are cleaned)
DELETE FROM teams WHERE name NOT IN (
  'Finest Brothers',
  'Losti City',
  'Panthers',
  'The Villagers',
  'Allies',
  'Super Strikers',
  'Godfather''s',
  'Club de Chege',
  'COVID Boys',
  'Pundits',
  'Ronavics',
  'Kawaago',
  'Top Bins',
  'Raptors'
);

-- Step 4: Reset league standings to zero
UPDATE league_standings SET
  played = 0,
  won = 0,
  drawn = 0,
  lost = 0,
  goals_for = 0,
  goals_against = 0,
  goal_difference = 0,
  points = 0;

-- Step 5: Insert all matches with results
-- FINEST BROTHERS MATCHES
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Allies'), 5, 3, true, '2025-12-07', 1, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Raptors'), (SELECT id FROM teams WHERE name = 'Finest Brothers'), 0, 5, true, '2025-12-07', 1, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Finest Brothers'), 1, 2, true, '2025-12-07', 2, 'Equinox', '18:00'),
((SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Top Bins'), 2, 0, true, '2025-12-14', 2, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Ronavics'), 3, 1, true, '2025-12-14', 2, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Finest Brothers'), 3, 3, true, '2025-12-21', 3, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 2, 1, true, '2025-12-21', 3, 'Equinox', '16:00');

-- LOSTI CITY MATCHES
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'Raptors'), (SELECT id FROM teams WHERE name = 'Losti City'), 0, 10, true, '2025-12-07', 1, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Pundits'), 2, 1, true, '2025-12-07', 1, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'Kawaago'), (SELECT id FROM teams WHERE name = 'Losti City'), 0, 4, true, '2025-12-14', 2, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Losti City'), 0, 1, true, '2025-12-14', 2, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Losti City'), 2, 1, true, '2025-12-21', 3, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 1, 1, true, '2025-12-21', 3, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Losti City'), 0, 5, true, '2025-12-28', 4, 'Equinox', '14:00');

-- PANTHERS MATCHES
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'Raptors'), (SELECT id FROM teams WHERE name = 'Panthers'), 0, 4, true, '2025-12-07', 1, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Kawaago'), 9, 1, true, '2025-12-07', 1, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'Pundits'), (SELECT id FROM teams WHERE name = 'Panthers'), 0, 4, true, '2025-12-14', 2, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Panthers'), 2, 0, true, '2025-12-14', 2, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Top Bins'), 2, 1, true, '2025-12-21', 3, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'COVID Boys'), 6, 0, true, '2025-12-21', 3, 'Equinox', '16:00');

-- VILLAGERS MATCHES
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Kawaago'), 7, 2, true, '2025-12-07', 1, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 3, 6, true, '2025-12-07', 1, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Allies'), 5, 8, true, '2025-12-14', 2, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 7, 2, true, '2025-12-14', 2, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Raptors'), 3, 1, true, '2025-12-21', 3, 'Equinox', '14:00');

-- ALLIES MATCHES
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 2, 1, true, '2025-12-07', 1, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Club de Chege'), 3, 4, true, '2025-12-07', 1, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Kawaago'), 3, 1, true, '2025-12-14', 2, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Raptors'), 3, 1, true, '2025-12-14', 2, 'Equinox', '16:00');

-- SUPER STRIKERS MATCHES
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'Top Bins'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 1, 4, true, '2025-12-07', 1, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Pundits'), (SELECT id FROM teams WHERE name = 'Super Strikers'), 0, 1, true, '2025-12-07', 1, 'Equinox', '16:00');

-- GODFATHERS MATCHES
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Club de Chege'), 4, 0, true, '2025-12-07', 1, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Top Bins'), 0, 0, true, '2025-12-07', 1, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Raptors'), 0, 0, true, '2025-12-14', 2, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Ronavics'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 0, 3, true, '2025-12-14', 2, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'COVID Boys'), (SELECT id FROM teams WHERE name = 'Godfather''s'), 3, 1, true, '2025-12-21', 3, 'Equinox', '14:00');

-- CLUB DE CHEGE MATCHES
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Pundits'), 1, 0, true, '2025-12-07', 1, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Top Bins'), 2, 2, true, '2025-12-07', 1, 'Equinox', '16:00');

-- COVID BOYS MATCHES
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'COVID Boys'), (SELECT id FROM teams WHERE name = 'Raptors'), 3, 0, true, '2025-12-07', 1, 'Equinox', '14:00');

-- PUNDITS MATCHES
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'Kawaago'), (SELECT id FROM teams WHERE name = 'Pundits'), 1, 7, true, '2025-12-07', 1, 'Equinox', '14:00');

-- RONAVICS MATCHES
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
((SELECT id FROM teams WHERE name = 'Ronavics'), (SELECT id FROM teams WHERE name = 'Raptors'), 5, 0, true, '2025-12-07', 1, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Ronavics'), (SELECT id FROM teams WHERE name = 'Kawaago'), 0, 2, true, '2025-12-07', 1, 'Equinox', '16:00');

-- Step 6: Update league standings based on all matches
-- FINEST BROTHERS (7 games: 6W, 1D, 0L)
UPDATE league_standings SET
  played = 7, won = 6, drawn = 1, lost = 0,
  goals_for = 20, goals_against = 9, goal_difference = 11,
  points = 19
WHERE team_name = 'Finest Brothers';

-- LOSTI CITY (8 games: 5W, 2D, 1L)
UPDATE league_standings SET
  played = 8, won = 5, drawn = 2, lost = 1,
  goals_for = 27, goals_against = 7, goal_difference = 20,
  points = 17
WHERE team_name = 'Losti City';

-- PANTHERS (7 games: 5W, 0D, 2L)
UPDATE league_standings SET
  played = 7, won = 5, drawn = 0, lost = 2,
  goals_for = 25, goals_against = 9, goal_difference = 16,
  points = 15
WHERE team_name = 'Panthers';

-- THE VILLAGERS (7 games: 5W, 0D, 2L)
UPDATE league_standings SET
  played = 7, won = 5, drawn = 0, lost = 2,
  goals_for = 29, goals_against = 20, goal_difference = 9,
  points = 15
WHERE team_name = 'The Villagers';

-- ALLIES (6 games: 4W, 0D, 2L)
UPDATE league_standings SET
  played = 6, won = 4, drawn = 0, lost = 2,
  goals_for = 22, goals_against = 17, goal_difference = 5,
  points = 12
WHERE team_name = 'Allies';

-- SUPER STRIKERS (5 games: 3W, 1D, 1L)
UPDATE league_standings SET
  played = 5, won = 3, drawn = 1, lost = 1,
  goals_for = 13, goals_against = 7, goal_difference = 6,
  points = 10
WHERE team_name = 'Super Strikers';

-- GODFATHERS (7 games: 2W, 2D, 3L)
UPDATE league_standings SET
  played = 7, won = 2, drawn = 2, lost = 3,
  goals_for = 11, goals_against = 12, goal_difference = -1,
  points = 8
WHERE team_name = 'Godfather''s';

-- CLUB DE CHEGE (5 games: 2W, 1D, 2L)
UPDATE league_standings SET
  played = 5, won = 2, drawn = 1, lost = 2,
  goals_for = 7, goals_against = 10, goal_difference = -3,
  points = 7
WHERE team_name = 'Club de Chege';

-- COVID BOYS (4 games: 2W, 0D, 2L)
UPDATE league_standings SET
  played = 4, won = 2, drawn = 0, lost = 2,
  goals_for = 7, goals_against = 9, goal_difference = -2,
  points = 6
WHERE team_name = 'COVID Boys';

-- PUNDITS (5 games: 1W, 0D, 4L)
UPDATE league_standings SET
  played = 5, won = 1, drawn = 0, lost = 4,
  goals_for = 8, goals_against = 9, goal_difference = -1,
  points = 3
WHERE team_name = 'Pundits';

-- RONAVICS (4 games: 1W, 0D, 3L)
UPDATE league_standings SET
  played = 4, won = 1, drawn = 0, lost = 3,
  goals_for = 6, goals_against = 8, goal_difference = -2,
  points = 3
WHERE team_name = 'Ronavics';

-- KAWAAGO (6 games: 1W, 0D, 5L)
UPDATE league_standings SET
  played = 6, won = 1, drawn = 0, lost = 5,
  goals_for = 5, goals_against = 30, goal_difference = -25,
  points = 3
WHERE team_name = 'Kawaago';

-- TOP BINS (5 games: 0W, 2D, 3L)
UPDATE league_standings SET
  played = 5, won = 0, drawn = 2, lost = 3,
  goals_for = 4, goals_against = 10, goal_difference = -6,
  points = 2
WHERE team_name = 'Top Bins';

-- RAPTORS (8 games: 0W, 1D, 7L)
UPDATE league_standings SET
  played = 8, won = 0, drawn = 1, lost = 7,
  goals_for = 2, goals_against = 33, goal_difference = -31,
  points = 1
WHERE team_name = 'Raptors';

-- Step 7: Update positions based on points, GD, and GF
WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY points DESC, goal_difference DESC, goals_for DESC) as new_position
  FROM league_standings
)
UPDATE league_standings SET position = ranked.new_position
FROM ranked WHERE league_standings.id = ranked.id;

COMMIT;

-- View final standings
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
