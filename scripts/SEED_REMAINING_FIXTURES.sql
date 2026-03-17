-- ============================================================================
-- SEED REMAINING FIXTURES - MATCHDAYS 4, 5, 6
-- Adds 40 upcoming matches to complete the season
-- All teams will finish with 12 games each
-- ============================================================================

BEGIN;

-- ============================================================================
-- MATCHDAY 4 - 16 MATCHES
-- Date: 2026-01-04 (Next matchday)
-- ============================================================================

INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
-- Super Strikers matches
((SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'Club de Chege'), NULL, NULL, false, '2026-01-04', 4, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'COVID Boys'), NULL, NULL, false, '2026-01-04', 4, 'Equinox', '14:30'),
((SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'Kawaago'), NULL, NULL, false, '2026-01-04', 4, 'Equinox', '15:00'),

-- Club de Chege matches
((SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'COVID Boys'), NULL, NULL, false, '2026-01-04', 4, 'Equinox', '15:30'),
((SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Kawaago'), NULL, NULL, false, '2026-01-04', 4, 'Equinox', '16:00'),

-- COVID Boys matches
((SELECT id FROM teams WHERE name = 'COVID Boys'), (SELECT id FROM teams WHERE name = 'Pundits'), NULL, NULL, false, '2026-01-04', 4, 'Equinox', '16:30'),

-- Pundits matches
((SELECT id FROM teams WHERE name = 'Pundits'), (SELECT id FROM teams WHERE name = 'Top Bins'), NULL, NULL, false, '2026-01-04', 4, 'Equinox', '17:00'),

-- Finest Brothers matches
((SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Pundits'), NULL, NULL, false, '2026-01-04', 4, 'Equinox', '17:30'),
((SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'The Villagers'), NULL, NULL, false, '2026-01-04', 4, 'Equinox', '18:00'),

-- The Villagers matches
((SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Top Bins'), NULL, NULL, false, '2026-01-04', 4, 'Equinox', '18:30'),

-- Kawaago matches
((SELECT id FROM teams WHERE name = 'Kawaago'), (SELECT id FROM teams WHERE name = 'Raptors'), NULL, NULL, false, '2026-01-04', 4, 'Equinox', '19:00'),

-- Top Bins matches
((SELECT id FROM teams WHERE name = 'Top Bins'), (SELECT id FROM teams WHERE name = 'Raptors'), NULL, NULL, false, '2026-01-04', 4, 'Equinox', '19:30'),

-- Losti City matches
((SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Allies'), NULL, NULL, false, '2026-01-04', 4, 'Equinox', '20:00'),
((SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Godfather''s'), NULL, NULL, false, '2026-01-04', 4, 'Equinox', '20:30'),

-- Panthers matches
((SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Allies'), NULL, NULL, false, '2026-01-04', 4, 'Equinox', '21:00'),
((SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Godfather''s'), NULL, NULL, false, '2026-01-04', 4, 'Equinox', '21:30');

-- ============================================================================
-- MATCHDAY 5 - 13 MATCHES
-- Date: 2026-01-11 (One week after MD4)
-- ============================================================================

INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
-- The Villagers matches
((SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'COVID Boys'), NULL, NULL, false, '2026-01-11', 5, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Club de Chege'), NULL, NULL, false, '2026-01-11', 5, 'Equinox', '14:30'),

-- Allies matches
((SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'COVID Boys'), NULL, NULL, false, '2026-01-11', 5, 'Equinox', '15:00'),
((SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Godfather''s'), NULL, NULL, false, '2026-01-11', 5, 'Equinox', '15:30'),

-- COVID Boys matches
((SELECT id FROM teams WHERE name = 'COVID Boys'), (SELECT id FROM teams WHERE name = 'Kawaago'), NULL, NULL, false, '2026-01-11', 5, 'Equinox', '16:00'),

-- Finest Brothers matches
((SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Panthers'), NULL, NULL, false, '2026-01-11', 5, 'Equinox', '16:30'),
((SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Super Strikers'), NULL, NULL, false, '2026-01-11', 5, 'Equinox', '17:00'),

-- Panthers matches
((SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Super Strikers'), NULL, NULL, false, '2026-01-11', 5, 'Equinox', '17:30'),

-- Godfather's matches
((SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Pundits'), NULL, NULL, false, '2026-01-11', 5, 'Equinox', '18:00'),

-- Club de Chege matches
((SELECT id FROM teams WHERE name = 'Club de Chege'), (SELECT id FROM teams WHERE name = 'Raptors'), NULL, NULL, false, '2026-01-11', 5, 'Equinox', '18:30'),

-- Pundits matches
((SELECT id FROM teams WHERE name = 'Pundits'), (SELECT id FROM teams WHERE name = 'Raptors'), NULL, NULL, false, '2026-01-11', 5, 'Equinox', '19:00'),

-- Kawaago matches
((SELECT id FROM teams WHERE name = 'Kawaago'), (SELECT id FROM teams WHERE name = 'Top Bins'), NULL, NULL, false, '2026-01-11', 5, 'Equinox', '19:30'),

-- Losti City matches
((SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'Top Bins'), NULL, NULL, false, '2026-01-11', 5, 'Equinox', '20:00');

-- ============================================================================
-- MATCHDAY 6 - SEASON FINALE - 11 MATCHES
-- Date: 2026-01-18 (One week after MD5)
-- ============================================================================

INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, is_completed, match_date, match_day, venue, match_time) VALUES
-- Finest Brothers matches
((SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Club de Chege'), NULL, NULL, false, '2026-01-18', 6, 'Equinox', '14:00'),
((SELECT id FROM teams WHERE name = 'Finest Brothers'), (SELECT id FROM teams WHERE name = 'Kawaago'), NULL, NULL, false, '2026-01-18', 6, 'Equinox', '14:30'),

-- Allies matches
((SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Pundits'), NULL, NULL, false, '2026-01-18', 6, 'Equinox', '15:00'),
((SELECT id FROM teams WHERE name = 'Allies'), (SELECT id FROM teams WHERE name = 'Top Bins'), NULL, NULL, false, '2026-01-18', 6, 'Equinox', '15:30'),

-- Super Strikers matches
((SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'Godfather''s'), NULL, NULL, false, '2026-01-18', 6, 'Equinox', '16:00'),
((SELECT id FROM teams WHERE name = 'Super Strikers'), (SELECT id FROM teams WHERE name = 'Raptors'), NULL, NULL, false, '2026-01-18', 6, 'Equinox', '16:30'),

-- Godfather's matches
((SELECT id FROM teams WHERE name = 'Godfather''s'), (SELECT id FROM teams WHERE name = 'Kawaago'), NULL, NULL, false, '2026-01-18', 6, 'Equinox', '17:00'),

-- COVID Boys matches
((SELECT id FROM teams WHERE name = 'COVID Boys'), (SELECT id FROM teams WHERE name = 'Top Bins'), NULL, NULL, false, '2026-01-18', 6, 'Equinox', '17:30'),

-- Losti City matches
((SELECT id FROM teams WHERE name = 'Losti City'), (SELECT id FROM teams WHERE name = 'COVID Boys'), NULL, NULL, false, '2026-01-18', 6, 'Equinox', '18:00'),

-- Panthers matches
((SELECT id FROM teams WHERE name = 'Panthers'), (SELECT id FROM teams WHERE name = 'Club de Chege'), NULL, NULL, false, '2026-01-18', 6, 'Equinox', '18:30'),

-- The Villagers matches
((SELECT id FROM teams WHERE name = 'The Villagers'), (SELECT id FROM teams WHERE name = 'Pundits'), NULL, NULL, false, '2026-01-18', 6, 'Equinox', '19:00');

COMMIT;

-- ============================================================================
-- VERIFICATION QUERY - CHECK TOTAL GAMES PER TEAM
-- ============================================================================

SELECT
    t.name as "Team",
    COUNT(m.id) as "Total Games",
    SUM(CASE WHEN m.is_completed THEN 1 ELSE 0 END) as "Played",
    SUM(CASE WHEN NOT m.is_completed THEN 1 ELSE 0 END) as "Remaining"
FROM teams t
LEFT JOIN matches m ON (t.id = m.home_team_id OR t.id = m.away_team_id)
GROUP BY t.name
ORDER BY t.name;

-- ============================================================================
-- SUMMARY
-- ============================================================================
-- Matchday 4: 16 matches added
-- Matchday 5: 13 matches added
-- Matchday 6: 11 matches added
-- Total: 40 new fixtures
-- All 13 teams will have 12 games each after completion
-- ============================================================================
