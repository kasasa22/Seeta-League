-- Seed fixtures for Match Day 1 and Match Day 2
-- Ensures each active team plays once per match day (one team may have a bye because the count is odd)
-- Matches are paired by sorting teams by their representative year for fair distribution

BEGIN;

-- Remove any previously generated fixtures for the first two match days
DELETE FROM match_events WHERE match_id IN (SELECT id FROM matches WHERE match_day IN (1, 2));
DELETE FROM matches WHERE match_day IN (1, 2);

DO $$
DECLARE
  team_ids UUID[];
  team_names TEXT[];
  team_years INT[];
  working_ids UUID[];
  n INT;
  match_day INT;
  game_index INT;
  double_idx INT;
  double_team UUID;
  remaining_ids UUID[];
  first_opponent UUID;
  second_opponent UUID;
  left_idx INT;
  right_idx INT;
  home_id UUID;
  away_id UUID;
  fixture_date DATE;
BEGIN
  -- Gather up to 11 active teams ordered by representative year (falls back to 9999 when missing)
  SELECT array_agg(id ORDER BY parsed_year, name),
         array_agg(name ORDER BY parsed_year, name),
         array_agg(parsed_year ORDER BY parsed_year, name)
  INTO team_ids, team_names, team_years
  FROM (
    SELECT id,
           name,
           COALESCE(NULLIF(regexp_replace(COALESCE(representative_name, ''), '[^0-9]', '', 'g'), ''), '9999')::INT AS parsed_year
    FROM teams
    WHERE is_active
    ORDER BY parsed_year, name
    LIMIT 11
  ) t;

  n := array_length(team_ids, 1);

  IF n IS NULL OR n < 2 THEN
    RAISE NOTICE 'Not enough active teams to create fixtures.';
    RETURN;
  END IF;

  -- If we have an odd number, append a virtual bye slot
  working_ids := team_ids;

  IF n % 2 = 1 THEN
    working_ids := working_ids || NULL;
    n := n + 1;
  END IF;

  FOR match_day IN 1..2 LOOP
    fixture_date := DATE '2025-11-16' + (match_day - 1) * INTERVAL '14 days';

    -- Determine the team that will play twice this match day
    double_idx := 1;
    double_team := working_ids[double_idx];

    IF double_team IS NULL THEN
      CONTINUE;
    END IF;

    -- Build remaining list without the double team
    remaining_ids := ARRAY[]::UUID[];
    FOR game_index IN 2..n LOOP
      IF working_ids[game_index] IS NOT NULL THEN
        remaining_ids := remaining_ids || working_ids[game_index];
      END IF;
    END LOOP;

    IF array_length(remaining_ids, 1) < 2 THEN
      CONTINUE;
    END IF;

    -- Select two opponents for the double team (closest by order)
    first_opponent := remaining_ids[1];
    second_opponent := remaining_ids[array_length(remaining_ids, 1)];

    -- Remove chosen opponents
    IF array_length(remaining_ids, 1) > 2 THEN
      remaining_ids := remaining_ids[2:array_length(remaining_ids, 1)-1];
    ELSE
      remaining_ids := ARRAY[]::UUID[];
    END IF;

    -- Double team plays two matches (home then away for fairness)
    INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, is_completed)
    VALUES (match_day, fixture_date, '14:00:00', 'Equinox Sports & Fitness Center', double_team, first_opponent, FALSE);

    INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, is_completed)
    VALUES (match_day, fixture_date, '16:00:00', 'Equinox Sports & Fitness Center', second_opponent, double_team, FALSE);

    -- Pair remaining teams from both ends towards the middle
    left_idx := 1;
    right_idx := array_length(remaining_ids, 1);

    WHILE left_idx < right_idx LOOP
      home_id := remaining_ids[left_idx];
      away_id := remaining_ids[right_idx];

      INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, is_completed)
      VALUES (match_day, fixture_date, '14:00:00', 'Equinox Sports & Fitness Center', home_id, away_id, FALSE);

      left_idx := left_idx + 1;
      right_idx := right_idx - 1;
    END LOOP;

    -- rotate working_ids for next match day (exclude null placeholder)
    working_ids := working_ids[2:n] || working_ids[1];
  END LOOP;
END $$;

COMMIT;

-- Preview fixtures that were created
SELECT
  match_day,
  match_date,
  venue,
  home_team.name AS home_team,
  away_team.name AS away_team
FROM matches
JOIN teams AS home_team ON matches.home_team_id = home_team.id
JOIN teams AS away_team ON matches.away_team_id = away_team.id
WHERE match_day IN (1, 2)
ORDER BY match_day, match_time;

