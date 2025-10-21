-- Delete All Data Script
-- WARNING: This will permanently delete all data from the database
-- Run this script carefully!

-- Delete data from tables (in order to respect foreign key constraints)
-- Delete match_events first (has foreign keys to matches and players)
DELETE FROM match_events;

-- Delete matches (has foreign keys to teams)
DELETE FROM matches;

-- Delete players (has foreign key to teams)
DELETE FROM players;

-- Delete teams (parent table)
DELETE FROM teams;

-- Verify deletion
SELECT 'Teams remaining: ' || COUNT(*) FROM teams;
SELECT 'Players remaining: ' || COUNT(*) FROM players;
SELECT 'Matches remaining: ' || COUNT(*) FROM matches;
SELECT 'Match events remaining: ' || COUNT(*) FROM match_events;

-- Success message
SELECT 'All data has been successfully deleted!' as status;

