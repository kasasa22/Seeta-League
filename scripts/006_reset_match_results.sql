-- Reset all recorded match results
-- This script clears scores and marks every match as not completed.

-- Optional: remove detailed match events such as goals/assists
DELETE FROM match_events;

-- Remove all fixtures entirely
DELETE FROM matches;

-- Verification queries
SELECT 'Matches remaining: ' || COUNT(*) FROM matches;
SELECT 'Match events remaining: ' || COUNT(*) FROM match_events;

