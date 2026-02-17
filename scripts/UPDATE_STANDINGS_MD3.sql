-- ============================================================================
-- UPDATE STANDINGS WITH MATCHDAY 3 RESULTS
-- Adds MD3 results to current standings
-- ============================================================================

BEGIN;

-- 1. Allies 3:4 Club de Chege (Club de Chege wins)
UPDATE league_standings SET played = played + 1, lost = lost + 1, goals_for = goals_for + 3, goals_against = goals_against + 4, goal_difference = goal_difference - 1 WHERE team_name = 'Allies';
UPDATE league_standings SET played = played + 1, won = won + 1, goals_for = goals_for + 4, goals_against = goals_against + 3, goal_difference = goal_difference + 1, points = points + 3 WHERE team_name = 'Club de Chege';

-- 2. The Villagers 3:6 Super Strikers (Super Strikers wins)
UPDATE league_standings SET played = played + 1, lost = lost + 1, goals_for = goals_for + 3, goals_against = goals_against + 6, goal_difference = goal_difference - 3 WHERE team_name = 'The Villagers';
UPDATE league_standings SET played = played + 1, won = won + 1, goals_for = goals_for + 6, goals_against = goals_against + 3, goal_difference = goal_difference + 3, points = points + 3 WHERE team_name = 'Super Strikers';

-- 3. Raptors 0:4 Panthers (Panthers wins)
UPDATE league_standings SET played = played + 1, lost = lost + 1, goals_for = goals_for + 0, goals_against = goals_against + 4, goal_difference = goal_difference - 4 WHERE team_name = 'Raptors';
UPDATE league_standings SET played = played + 1, won = won + 1, goals_for = goals_for + 4, goals_against = goals_against + 0, goal_difference = goal_difference + 4, points = points + 3 WHERE team_name = 'Panthers';

-- 4. Allies 2:1 Super Strikers (Allies wins)
UPDATE league_standings SET played = played + 1, won = won + 1, goals_for = goals_for + 2, goals_against = goals_against + 1, goal_difference = goal_difference + 1, points = points + 3 WHERE team_name = 'Allies';
UPDATE league_standings SET played = played + 1, lost = lost + 1, goals_for = goals_for + 1, goals_against = goals_against + 2, goal_difference = goal_difference - 1 WHERE team_name = 'Super Strikers';

-- 5. The Villagers 4:1 Kawaago (The Villagers wins)
UPDATE league_standings SET played = played + 1, won = won + 1, goals_for = goals_for + 4, goals_against = goals_against + 1, goal_difference = goal_difference + 3, points = points + 3 WHERE team_name = 'The Villagers';
UPDATE league_standings SET played = played + 1, lost = lost + 1, goals_for = goals_for + 1, goals_against = goals_against + 4, goal_difference = goal_difference - 3 WHERE team_name = 'Kawaago';

-- 6. Godfather's 4:0 Club de Chege (Godfather's wins)
UPDATE league_standings SET played = played + 1, won = won + 1, goals_for = goals_for + 4, goals_against = goals_against + 0, goal_difference = goal_difference + 4, points = points + 3 WHERE team_name = 'Godfather''s';
UPDATE league_standings SET played = played + 1, lost = lost + 1, goals_for = goals_for + 0, goals_against = goals_against + 4, goal_difference = goal_difference - 4 WHERE team_name = 'Club de Chege';

-- 7. Finest Brothers 5:3 Allies (Finest Brothers wins)
UPDATE league_standings SET played = played + 1, won = won + 1, goals_for = goals_for + 5, goals_against = goals_against + 3, goal_difference = goal_difference + 2, points = points + 3 WHERE team_name = 'Finest Brothers';
UPDATE league_standings SET played = played + 1, lost = lost + 1, goals_for = goals_for + 3, goals_against = goals_against + 5, goal_difference = goal_difference - 2 WHERE team_name = 'Allies';

-- 8. Godfather's 1:2 Finest Brothers (Finest Brothers wins)
UPDATE league_standings SET played = played + 1, lost = lost + 1, goals_for = goals_for + 1, goals_against = goals_against + 2, goal_difference = goal_difference - 1 WHERE team_name = 'Godfather''s';
UPDATE league_standings SET played = played + 1, won = won + 1, goals_for = goals_for + 2, goals_against = goals_against + 1, goal_difference = goal_difference + 1, points = points + 3 WHERE team_name = 'Finest Brothers';

-- 9. Kawaago 0:6 Losti City (Losti City wins)
UPDATE league_standings SET played = played + 1, lost = lost + 1, goals_for = goals_for + 0, goals_against = goals_against + 6, goal_difference = goal_difference - 6 WHERE team_name = 'Kawaago';
UPDATE league_standings SET played = played + 1, won = won + 1, goals_for = goals_for + 6, goals_against = goals_against + 0, goal_difference = goal_difference + 6, points = points + 3 WHERE team_name = 'Losti City';

-- 10. The Villagers 5:9 Allies (Allies wins)
UPDATE league_standings SET played = played + 1, lost = lost + 1, goals_for = goals_for + 5, goals_against = goals_against + 9, goal_difference = goal_difference - 4 WHERE team_name = 'The Villagers';
UPDATE league_standings SET played = played + 1, won = won + 1, goals_for = goals_for + 9, goals_against = goals_against + 5, goal_difference = goal_difference + 4, points = points + 3 WHERE team_name = 'Allies';

-- 11. Panthers 9:1 Kawaago (Panthers wins)
UPDATE league_standings SET played = played + 1, won = won + 1, goals_for = goals_for + 9, goals_against = goals_against + 1, goal_difference = goal_difference + 8, points = points + 3 WHERE team_name = 'Panthers';
UPDATE league_standings SET played = played + 1, lost = lost + 1, goals_for = goals_for + 1, goals_against = goals_against + 9, goal_difference = goal_difference - 8 WHERE team_name = 'Kawaago';

-- 12. Raptors 0:10 Losti City (Losti City wins)
UPDATE league_standings SET played = played + 1, lost = lost + 1, goals_for = goals_for + 0, goals_against = goals_against + 10, goal_difference = goal_difference - 10 WHERE team_name = 'Raptors';
UPDATE league_standings SET played = played + 1, won = won + 1, goals_for = goals_for + 10, goals_against = goals_against + 0, goal_difference = goal_difference + 10, points = points + 3 WHERE team_name = 'Losti City';

-- 13. Pundits 0:4 Panthers (Panthers wins)
UPDATE league_standings SET played = played + 1, lost = lost + 1, goals_for = goals_for + 0, goals_against = goals_against + 4, goal_difference = goal_difference - 4 WHERE team_name = 'Pundits';
UPDATE league_standings SET played = played + 1, won = won + 1, goals_for = goals_for + 4, goals_against = goals_against + 0, goal_difference = goal_difference + 4, points = points + 3 WHERE team_name = 'Panthers';

-- 14. Losti City 2:1 Pundits (Losti City wins)
UPDATE league_standings SET played = played + 1, won = won + 1, goals_for = goals_for + 2, goals_against = goals_against + 1, goal_difference = goal_difference + 1, points = points + 3 WHERE team_name = 'Losti City';
UPDATE league_standings SET played = played + 1, lost = lost + 1, goals_for = goals_for + 1, goals_against = goals_against + 2, goal_difference = goal_difference - 1 WHERE team_name = 'Pundits';

-- Update positions based on new points
WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY points DESC, goal_difference DESC, goals_for DESC) as new_position
  FROM league_standings
)
UPDATE league_standings SET position = ranked.new_position
FROM ranked WHERE league_standings.id = ranked.id;

COMMIT;

-- View updated standings
SELECT
    position as "Pos",
    team_name as "Team",
    played as "P",
    won as "W",
    drawn as "D",
    lost as "L",
    goal_difference as "GD",
    points as "Pts"
FROM league_standings
ORDER BY position;
