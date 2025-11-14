-- Sync players for Titans team with jersey numbers and positions
-- This script inserts or updates players for the Titans team
-- If a player with the same name already exists for this team, they will be updated to be active
-- If a player doesn't exist, they will be inserted

BEGIN;

DO $$
DECLARE
  titans_team_id UUID;
  player_name TEXT;
  player_jersey INT;
  player_position TEXT;
  -- Player names array
  player_names TEXT[] := ARRAY[
    'Duch Rumanzi',
    'Alvin Mugabi',
    'Alvin Rubagumya',
    'Achidri Joshua',
    'Mujuni Nevin',
    'OB',
    'Bbosa',
    'Omah',
    'Vunni B',
    'Ocaya',
    'Ssuubi J',
    'Tyrese',
    'ruhweza Solomon',
    'Jerry Mwesigwa Messi',
    'shedricks',
    'Kasakya Denis Nicholas',
    'Abel Obura'
  ];
  -- Jersey numbers array (order must match player_names array above)
  jersey_numbers INT[] := ARRAY[
    19,  -- Duch Rumanzi
    29,  -- Alvin Mugabi
    66,  -- Alvin Rubagumya
    33,  -- Achidri Joshua
    2,   -- Mujuni Nevin
    4,   -- OB
    10,  -- Bbosa
    5,   -- Omah
    88,  -- Vunni B
    6,   -- Ocaya
    8,   -- Ssuubi J
    7,   -- Tyrese
    14,  -- ruhweza Solomon
    39,  -- Jerry Mwesigwa Messi
    18,  -- shedricks
    9,   -- Kasakya Denis Nicholas
    11   -- Abel Obura
  ];
  -- Positions array (order must match player_names array above)
  player_positions TEXT[] := ARRAY[
    'Goalkeeper',  -- Duch Rumanzi
    'Goalkeeper',  -- Alvin Mugabi
    'Defender',    -- Alvin Rubagumya
    'Defender',    -- Achidri Joshua
    'Defender',    -- Mujuni Nevin
    'Defender',    -- OB
    'Defender',    -- Bbosa
    'Midfielder',  -- Omah
    'Midfielder',  -- Vunni B
    'Midfielder',  -- Ocaya
    'Midfielder',  -- Ssuubi J
    'Midfielder',  -- Tyrese
    'Forward',     -- ruhweza Solomon
    'Forward',     -- Jerry Mwesigwa Messi
    'Forward',     -- shedricks
    'Forward',     -- Kasakya Denis Nicholas
    'Forward'      -- Abel Obura
  ];
  i INT;
  updated_count INT := 0;
  inserted_count INT := 0;
  used_jerseys INT[];
  available_jerseys INT[];
  random_jersey INT;
  jersey_idx INT;
BEGIN
  -- Get the Titans team ID
  SELECT id INTO titans_team_id
  FROM teams
  WHERE name = 'Titans'
  LIMIT 1;

  IF titans_team_id IS NULL THEN
    RAISE EXCEPTION 'Team "Titans" not found. Please ensure the team exists in the teams table.';
  END IF;

  -- Get list of used jersey numbers for this team
  SELECT array_agg(jersey_number) INTO used_jerseys
  FROM players
  WHERE team_id = titans_team_id AND jersey_number IS NOT NULL;

  IF used_jerseys IS NULL THEN
    used_jerseys := ARRAY[]::INT[];
  END IF;

  -- Add specified jersey numbers to used list to avoid conflicts
  -- Track which jerseys are already assigned in this batch
  FOR i IN 1..array_length(jersey_numbers, 1) LOOP
    IF jersey_numbers[i] IS NOT NULL THEN
      -- Check if this jersey is already used by another player in this batch
      FOR jersey_idx IN 1..(i-1) LOOP
        IF jersey_numbers[jersey_idx] = jersey_numbers[i] THEN
          -- Conflict detected - set to NULL to assign random
          jersey_numbers[i] := NULL;
          EXIT;
        END IF;
      END LOOP;
      -- Add to used list if not NULL
      IF jersey_numbers[i] IS NOT NULL THEN
        IF NOT (jersey_numbers[i] = ANY(used_jerseys)) THEN
          used_jerseys := used_jerseys || jersey_numbers[i];
        END IF;
      END IF;
    END IF;
  END LOOP;

  -- Generate available jersey numbers (1-99, excluding used ones)
  FOR i IN 1..99 LOOP
    IF NOT (i = ANY(used_jerseys)) THEN
      available_jerseys := available_jerseys || i;
    END IF;
  END LOOP;

  -- Loop through each player and insert/update
  FOR i IN 1..array_length(player_names, 1) LOOP
    player_name := player_names[i];
    player_jersey := jersey_numbers[i];
    player_position := player_positions[i];
    
    -- If no jersey number specified, assign a random available one
    IF player_jersey IS NULL THEN
      IF array_length(available_jerseys, 1) > 0 THEN
        -- Pick a random available jersey
        jersey_idx := 1 + floor(random() * array_length(available_jerseys, 1))::int;
        player_jersey := available_jerseys[jersey_idx];
        -- Remove from available list
        available_jerseys := array_remove(available_jerseys, player_jersey);
        used_jerseys := used_jerseys || player_jersey;
      ELSE
        -- Fallback: use a high number if all are taken
        player_jersey := 100 + i;
      END IF;
    END IF;
    
    -- Check if jersey is already taken by another player on this team
    WHILE EXISTS (
      SELECT 1 FROM players 
      WHERE team_id = titans_team_id 
        AND jersey_number = player_jersey
        AND LOWER(TRIM(name)) != LOWER(TRIM(player_name))
    ) LOOP
      -- Jersey conflict - assign a random available one
      IF array_length(available_jerseys, 1) > 0 THEN
        jersey_idx := 1 + floor(random() * array_length(available_jerseys, 1))::int;
        player_jersey := available_jerseys[jersey_idx];
        available_jerseys := array_remove(available_jerseys, player_jersey);
        used_jerseys := used_jerseys || player_jersey;
      ELSE
        -- Fallback: use a high number if all are taken
        player_jersey := 100 + i;
      END IF;
    END LOOP;
    
    -- Try to update existing player first
    UPDATE players
    SET is_active = true,
        team_id = titans_team_id,
        jersey_number = player_jersey,
        position = player_position
    WHERE LOWER(TRIM(name)) = LOWER(TRIM(player_name))
      AND team_id = titans_team_id;
    
    IF FOUND THEN
      updated_count := updated_count + 1;
      -- Add to used list
      IF NOT (player_jersey = ANY(used_jerseys)) THEN
        used_jerseys := used_jerseys || player_jersey;
      END IF;
    ELSE
      -- Player doesn't exist, insert new one
      INSERT INTO players (name, team_id, jersey_number, position, is_active)
      VALUES (player_name, titans_team_id, player_jersey, player_position, true);
      inserted_count := inserted_count + 1;
      -- Add to used list
      IF NOT (player_jersey = ANY(used_jerseys)) THEN
        used_jerseys := used_jerseys || player_jersey;
      END IF;
    END IF;
  END LOOP;

  RAISE NOTICE 'Successfully synced % players for Titans team (Updated: %, Inserted: %)', 
    array_length(player_names, 1), updated_count, inserted_count;
END $$;

-- Display the synced players grouped by position
SELECT 
  p.position AS "Position",
  p.jersey_number AS "Jersey #",
  p.name AS "Player Name",
  t.name AS "Team Name",
  p.is_active AS "Active"
FROM players p
JOIN teams t ON p.team_id = t.id
WHERE t.name = 'Titans'
ORDER BY 
  CASE p.position
    WHEN 'Goalkeeper' THEN 1
    WHEN 'Defender' THEN 2
    WHEN 'Midfielder' THEN 3
    WHEN 'Forward' THEN 4
    ELSE 5
  END,
  p.jersey_number NULLS LAST,
  p.name;

COMMIT;

