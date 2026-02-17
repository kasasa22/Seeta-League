-- ============================================================================
-- MATCHDAY 3 FIXTURES (No scores - just scheduled matches)
-- ============================================================================

BEGIN;

-- Insert Matchday 3 fixtures (is_completed = false, no scores)

-- 1. Allies vs Club de Chege
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 3, '2025-12-07', '14:00', 'Equinox',
    (SELECT id FROM teams WHERE name = 'Allies'),
    (SELECT id FROM teams WHERE name = 'Club de Chege'),
    NULL, NULL, false;

-- 2. The Villagers vs Super Strikers
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 3, '2025-12-07', '14:30', 'Equinox',
    (SELECT id FROM teams WHERE name = 'The Villagers'),
    (SELECT id FROM teams WHERE name = 'Super Strikers'),
    NULL, NULL, false;

-- 3. Raptors vs Panthers
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 3, '2025-12-07', '15:00', 'Equinox',
    (SELECT id FROM teams WHERE name = 'Raptors'),
    (SELECT id FROM teams WHERE name = 'Panthers'),
    NULL, NULL, false;

-- 4. Allies vs Super Strikers
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 3, '2025-12-07', '15:30', 'Equinox',
    (SELECT id FROM teams WHERE name = 'Allies'),
    (SELECT id FROM teams WHERE name = 'Super Strikers'),
    NULL, NULL, false;

-- 5. The Villagers vs Kawaago
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 3, '2025-12-07', '16:00', 'Equinox',
    (SELECT id FROM teams WHERE name = 'The Villagers'),
    (SELECT id FROM teams WHERE name = 'Kawaago'),
    NULL, NULL, false;

-- 6. Godfather's vs Club de Chege
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 3, '2025-12-07', '16:30', 'Equinox',
    (SELECT id FROM teams WHERE name = 'Godfather''s'),
    (SELECT id FROM teams WHERE name = 'Club de Chege'),
    NULL, NULL, false;

-- 7. Finest Brothers vs Allies
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 3, '2025-12-07', '17:00', 'Equinox',
    (SELECT id FROM teams WHERE name = 'Finest Brothers'),
    (SELECT id FROM teams WHERE name = 'Allies'),
    NULL, NULL, false;

-- 8. Godfather's vs Finest Brothers
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 3, '2025-12-07', '17:30', 'Equinox',
    (SELECT id FROM teams WHERE name = 'Godfather''s'),
    (SELECT id FROM teams WHERE name = 'Finest Brothers'),
    NULL, NULL, false;

-- 9. Kawaago vs Losti City
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 3, '2025-12-07', '18:00', 'Equinox',
    (SELECT id FROM teams WHERE name = 'Kawaago'),
    (SELECT id FROM teams WHERE name = 'Losti City'),
    NULL, NULL, false;

-- 10. The Villagers vs Allies
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 3, '2025-12-07', '18:30', 'Equinox',
    (SELECT id FROM teams WHERE name = 'The Villagers'),
    (SELECT id FROM teams WHERE name = 'Allies'),
    NULL, NULL, false;

-- 11. Panthers vs Kawaago
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 3, '2025-12-07', '19:00', 'Equinox',
    (SELECT id FROM teams WHERE name = 'Panthers'),
    (SELECT id FROM teams WHERE name = 'Kawaago'),
    NULL, NULL, false;

-- 12. Raptors vs Losti City
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 3, '2025-12-07', '19:30', 'Equinox',
    (SELECT id FROM teams WHERE name = 'Raptors'),
    (SELECT id FROM teams WHERE name = 'Losti City'),
    NULL, NULL, false;

-- 13. Pundits vs Panthers
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 3, '2025-12-07', '20:00', 'Equinox',
    (SELECT id FROM teams WHERE name = 'Pundits'),
    (SELECT id FROM teams WHERE name = 'Panthers'),
    NULL, NULL, false;

-- 14. Losti City vs Pundits
INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)
SELECT 3, '2025-12-07', '20:30', 'Equinox',
    (SELECT id FROM teams WHERE name = 'Losti City'),
    (SELECT id FROM teams WHERE name = 'Pundits'),
    NULL, NULL, false;

COMMIT;

-- Verify fixtures were created
SELECT
    m.match_day as "MD",
    h.name as "Home",
    a.name as "Away",
    m.match_time as "Time"
FROM matches m
JOIN teams h ON m.home_team_id = h.id
JOIN teams a ON m.away_team_id = a.id
WHERE m.match_day = 3
ORDER BY m.match_time;
