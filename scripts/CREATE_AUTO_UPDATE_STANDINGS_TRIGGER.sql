-- ============================================================================
-- CREATE AUTOMATIC STANDINGS UPDATE TRIGGER
-- This will automatically update league_standings whenever match results change
-- ============================================================================

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS update_standings_on_match_change ON matches;
DROP FUNCTION IF EXISTS recalculate_standings();

-- Create function to recalculate standings for affected teams
CREATE OR REPLACE FUNCTION recalculate_standings()
RETURNS TRIGGER AS $$
DECLARE
    affected_team_ids UUID[];
BEGIN
    -- Collect all affected team IDs
    IF TG_OP = 'DELETE' THEN
        affected_team_ids := ARRAY[OLD.home_team_id, OLD.away_team_id];
    ELSIF TG_OP = 'UPDATE' THEN
        affected_team_ids := ARRAY[NEW.home_team_id, NEW.away_team_id, OLD.home_team_id, OLD.away_team_id];
    ELSE -- INSERT
        affected_team_ids := ARRAY[NEW.home_team_id, NEW.away_team_id];
    END IF;

    -- Remove duplicates
    affected_team_ids := ARRAY(SELECT DISTINCT unnest(affected_team_ids));

    -- Recalculate standings for each affected team
    FOR i IN 1..array_length(affected_team_ids, 1) LOOP
        WITH team_stats AS (
            SELECT
                affected_team_ids[i] as team_id,
                t.name as team_name,
                COUNT(*) FILTER (WHERE is_completed = true) as played,
                -- Wins
                COUNT(*) FILTER (
                    WHERE is_completed = true
                    AND ((home_team_id = affected_team_ids[i] AND home_score > away_score)
                         OR (away_team_id = affected_team_ids[i] AND away_score > home_score))
                ) as won,
                -- Draws
                COUNT(*) FILTER (
                    WHERE is_completed = true
                    AND home_score = away_score
                    AND (home_team_id = affected_team_ids[i] OR away_team_id = affected_team_ids[i])
                ) as drawn,
                -- Losses
                COUNT(*) FILTER (
                    WHERE is_completed = true
                    AND ((home_team_id = affected_team_ids[i] AND home_score < away_score)
                         OR (away_team_id = affected_team_ids[i] AND away_score < home_score))
                ) as lost,
                -- Goals For
                COALESCE(SUM(
                    CASE
                        WHEN home_team_id = affected_team_ids[i] AND is_completed = true THEN home_score
                        WHEN away_team_id = affected_team_ids[i] AND is_completed = true THEN away_score
                        ELSE 0
                    END
                ), 0) as goals_for,
                -- Goals Against
                COALESCE(SUM(
                    CASE
                        WHEN home_team_id = affected_team_ids[i] AND is_completed = true THEN away_score
                        WHEN away_team_id = affected_team_ids[i] AND is_completed = true THEN home_score
                        ELSE 0
                    END
                ), 0) as goals_against
            FROM matches m
            CROSS JOIN teams t
            WHERE t.id = affected_team_ids[i]
            AND (m.home_team_id = affected_team_ids[i] OR m.away_team_id = affected_team_ids[i])
        )
        -- Update or insert standings
        INSERT INTO league_standings (
            team_id,
            team_name,
            played,
            won,
            drawn,
            lost,
            goals_for,
            goals_against,
            goal_difference,
            points
        )
        SELECT
            team_id,
            team_name,
            played::INTEGER,
            won::INTEGER,
            drawn::INTEGER,
            lost::INTEGER,
            goals_for::INTEGER,
            goals_against::INTEGER,
            (goals_for - goals_against)::INTEGER as goal_difference,
            (won * 3 + drawn)::INTEGER as points
        FROM team_stats
        ON CONFLICT (team_id)
        DO UPDATE SET
            played = EXCLUDED.played,
            won = EXCLUDED.won,
            drawn = EXCLUDED.drawn,
            lost = EXCLUDED.lost,
            goals_for = EXCLUDED.goals_for,
            goals_against = EXCLUDED.goals_against,
            goal_difference = EXCLUDED.goal_difference,
            points = EXCLUDED.points,
            updated_at = NOW();
    END LOOP;

    -- Update positions based on points, goal difference, and goals for
    WITH ranked AS (
        SELECT
            id,
            ROW_NUMBER() OVER (
                ORDER BY points DESC, goal_difference DESC, goals_for DESC
            ) as new_position
        FROM league_standings
    )
    UPDATE league_standings
    SET position = ranked.new_position
    FROM ranked
    WHERE league_standings.id = ranked.id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger that fires after INSERT, UPDATE, or DELETE on matches
CREATE TRIGGER update_standings_on_match_change
    AFTER INSERT OR UPDATE OR DELETE ON matches
    FOR EACH ROW
    EXECUTE FUNCTION recalculate_standings();

-- Add unique constraint on team_id if not exists
ALTER TABLE league_standings
DROP CONSTRAINT IF EXISTS league_standings_team_id_key;

ALTER TABLE league_standings
ADD CONSTRAINT league_standings_team_id_key UNIQUE (team_id);

-- Show success message
DO $$
BEGIN
    RAISE NOTICE 'Auto-update standings trigger created successfully!';
    RAISE NOTICE 'Standings will now update automatically when match results change.';
END $$;
