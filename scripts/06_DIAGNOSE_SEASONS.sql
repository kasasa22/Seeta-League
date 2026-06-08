SELECT 'seasons_row_count' AS fact, count(*)::text AS value FROM seasons
UNION ALL
SELECT 'seasons_rls_enabled',
       (SELECT relrowsecurity::text FROM pg_class WHERE oid = 'public.seasons'::regclass)
UNION ALL
SELECT 'teams_to_seasons_fk_exists',
       (SELECT (count(*) > 0)::text FROM pg_constraint
        WHERE conrelid = 'public.teams'::regclass AND contype = 'f'
          AND confrelid = 'public.seasons'::regclass)
UNION ALL
SELECT 'distinct_team_season_ids',
       (SELECT COALESCE(string_agg(DISTINCT season_id::text, ', '), '(none)') FROM teams)
UNION ALL
SELECT 'season_rows_detail',
       (SELECT COALESCE(string_agg(slug || '=' || id::text, ' | '), '(empty)') FROM seasons);
