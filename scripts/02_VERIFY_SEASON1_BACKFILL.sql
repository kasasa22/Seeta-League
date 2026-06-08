BEGIN;

UPDATE teams SET season_id = (SELECT id FROM seasons WHERE slug = 'season-1') WHERE season_id IS NULL;
UPDATE players SET season_id = (SELECT id FROM seasons WHERE slug = 'season-1') WHERE season_id IS NULL;
UPDATE matches SET season_id = (SELECT id FROM seasons WHERE slug = 'season-1') WHERE season_id IS NULL;
UPDATE league_standings SET season_id = (SELECT id FROM seasons WHERE slug = 'season-1') WHERE season_id IS NULL;
UPDATE match_events SET season_id = (SELECT id FROM seasons WHERE slug = 'season-1') WHERE season_id IS NULL;

UPDATE seasons s SET
  champion_team_id = (SELECT id FROM teams WHERE name = 'Allies' AND season_id = s.id LIMIT 1),
  runner_up_team_id = (SELECT id FROM teams WHERE name = 'Club de Chege' AND season_id = s.id LIMIT 1)
WHERE s.slug = 'season-1';

COMMIT;

SELECT t.table_name,
       t.total,
       t.in_season_1,
       t.without_season AS still_unassigned
FROM (
  SELECT 'teams' AS table_name,
         count(*) AS total,
         count(*) FILTER (WHERE season_id = (SELECT id FROM seasons WHERE slug = 'season-1')) AS in_season_1,
         count(*) FILTER (WHERE season_id IS NULL) AS without_season
  FROM teams
  UNION ALL
  SELECT 'players', count(*),
         count(*) FILTER (WHERE season_id = (SELECT id FROM seasons WHERE slug = 'season-1')),
         count(*) FILTER (WHERE season_id IS NULL)
  FROM players
  UNION ALL
  SELECT 'matches', count(*),
         count(*) FILTER (WHERE season_id = (SELECT id FROM seasons WHERE slug = 'season-1')),
         count(*) FILTER (WHERE season_id IS NULL)
  FROM matches
  UNION ALL
  SELECT 'league_standings', count(*),
         count(*) FILTER (WHERE season_id = (SELECT id FROM seasons WHERE slug = 'season-1')),
         count(*) FILTER (WHERE season_id IS NULL)
  FROM league_standings
  UNION ALL
  SELECT 'match_events', count(*),
         count(*) FILTER (WHERE season_id = (SELECT id FROM seasons WHERE slug = 'season-1')),
         count(*) FILTER (WHERE season_id IS NULL)
  FROM match_events
) t
ORDER BY t.table_name;
