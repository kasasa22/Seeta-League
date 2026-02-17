-- ============================================================================
-- SEED STANDINGS DIRECTLY (without match scores)
-- Creates/updates league_standings table with official Matchweek 2 data
-- ============================================================================

BEGIN;

-- First, check if league_standings is a view or table
-- If it's a view, we need to drop it and create a table instead

-- Drop the view if it exists
DROP VIEW IF EXISTS league_standings CASCADE;

-- Create the league_standings table if it doesn't exist
CREATE TABLE IF NOT EXISTS league_standings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id UUID REFERENCES teams(id),
    team_name TEXT NOT NULL,
    played INTEGER DEFAULT 0,
    won INTEGER DEFAULT 0,
    drawn INTEGER DEFAULT 0,
    lost INTEGER DEFAULT 0,
    goals_for INTEGER DEFAULT 0,
    goals_against INTEGER DEFAULT 0,
    goal_difference INTEGER DEFAULT 0,
    points INTEGER DEFAULT 0,
    position INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clear existing standings
DELETE FROM league_standings;

-- Insert official Matchweek 2 standings
-- 1. FINEST BROTHERS: P=6, W=5, D=1, L=0, GD=+9, Pts=16
INSERT INTO league_standings (team_id, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position)
SELECT id, 'Finest Brothers', 6, 5, 1, 0, 14, 5, 9, 16, 1 FROM teams WHERE name = 'Finest Brothers';

-- 2. THE VILLAGERS: P=5, W=5, D=0, L=0, GD=+17, Pts=15
INSERT INTO league_standings (team_id, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position)
SELECT id, 'The Villagers', 5, 5, 0, 0, 21, 4, 17, 15, 2 FROM teams WHERE name = 'The Villagers';

-- 3. SUPER STRIKERS: P=5, W=4, D=1, L=0, GD=+8, Pts=13
INSERT INTO league_standings (team_id, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position)
SELECT id, 'Super Strikers', 5, 4, 1, 0, 12, 4, 8, 13, 3 FROM teams WHERE name = 'Super Strikers';

-- 4. PANTHERS: P=6, W=4, D=0, L=2, GD=+13, Pts=12
INSERT INTO league_standings (team_id, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position)
SELECT id, 'Panthers', 6, 4, 0, 2, 19, 6, 13, 12, 4 FROM teams WHERE name = 'Panthers';

-- 5. LOSTI CITY: P=6, W=3, D=2, L=1, GD=+10, Pts=11
INSERT INTO league_standings (team_id, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position)
SELECT id, 'Losti City', 6, 3, 2, 1, 15, 5, 10, 11, 5 FROM teams WHERE name = 'Losti City';

-- 6. CLUB DE SHEGE: P=5, W=3, D=1, L=1, GD=+8, Pts=10
INSERT INTO league_standings (team_id, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position)
SELECT id, 'Club de Chege', 5, 3, 1, 1, 12, 4, 8, 10, 6 FROM teams WHERE name = 'Club de Chege';

-- 7. ALLIES: P=3, W=3, D=0, L=0, GD=+5, Pts=9
INSERT INTO league_standings (team_id, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position)
SELECT id, 'Allies', 3, 3, 0, 0, 7, 2, 5, 9, 7 FROM teams WHERE name = 'Allies';

-- 8. COVID BOYS: P=5, W=3, D=0, L=2, GD=-1, Pts=9
INSERT INTO league_standings (team_id, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position)
SELECT id, 'COVID Boys', 5, 3, 0, 2, 7, 8, -1, 9, 8 FROM teams WHERE name = 'COVID Boys';

-- 9. RONAVICS: P=5, W=2, D=0, L=3, GD=-1, Pts=6
INSERT INTO league_standings (team_id, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position)
SELECT id, 'Ronavics', 5, 2, 0, 3, 6, 7, -1, 6, 9 FROM teams WHERE name = 'Ronavics';

-- 10. GODFATHERS: P=6, W=1, D=2, L=3, GD=-6, Pts=5
INSERT INTO league_standings (team_id, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position)
SELECT id, 'Godfather''s', 6, 1, 2, 3, 5, 11, -6, 5, 10 FROM teams WHERE name = 'Godfather''s';

-- 11. PUNDITS: P=3, W=1, D=0, L=2, GD=+4, Pts=3
INSERT INTO league_standings (team_id, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position)
SELECT id, 'Pundits', 3, 1, 0, 2, 8, 4, 4, 3, 11 FROM teams WHERE name = 'Pundits';

-- 12. TITANS: P=4, W=1, D=0, L=3, GD=-1, Pts=3
INSERT INTO league_standings (team_id, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position)
SELECT id, 'Titans', 4, 1, 0, 3, 6, 7, -1, 3, 12 FROM teams WHERE name = 'Titans';

-- 13. KAWAGO: P=3, W=1, D=0, L=2, GD=-6, Pts=3
INSERT INTO league_standings (team_id, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position)
SELECT id, 'Kawaago', 3, 1, 0, 2, 2, 8, -6, 3, 13 FROM teams WHERE name = 'Kawaago';

-- 14. BROTHERHOOD: P=5, W=1, D=0, L=4, GD=-7, Pts=3
INSERT INTO league_standings (team_id, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position)
SELECT id, 'The Brotherhood', 5, 1, 0, 4, 4, 11, -7, 3, 14 FROM teams WHERE name = 'The Brotherhood';

-- 15. TOP BINS: P=6, W=0, D=2, L=4, GD=-11, Pts=2
INSERT INTO league_standings (team_id, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position)
SELECT id, 'Top Bins', 6, 0, 2, 4, 3, 14, -11, 2, 15 FROM teams WHERE name = 'Top Bins';

-- 16. RAPTORS: P=5, W=0, D=1, L=4, GD=-11, Pts=1
INSERT INTO league_standings (team_id, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position)
SELECT id, 'Raptors', 5, 0, 1, 4, 4, 15, -11, 1, 16 FROM teams WHERE name = 'Raptors';

-- 17. LEGENDS: P=5, W=0, D=0, L=5, GD=-16, Pts=0
INSERT INTO league_standings (team_id, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position)
SELECT id, 'Legends', 5, 0, 0, 5, 1, 17, -16, 0, 17 FROM teams WHERE name = 'Legends';

COMMIT;

-- Verify the standings
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
