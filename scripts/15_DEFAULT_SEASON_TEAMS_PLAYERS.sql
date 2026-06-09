BEGIN;

CREATE OR REPLACE FUNCTION public.set_team_season()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.season_id IS NULL THEN
    SELECT id INTO NEW.season_id FROM seasons WHERE is_current = true LIMIT 1;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS teams_set_season ON teams;
CREATE TRIGGER teams_set_season
BEFORE INSERT ON teams
FOR EACH ROW EXECUTE FUNCTION public.set_team_season();

CREATE OR REPLACE FUNCTION public.set_player_season()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.season_id IS NULL THEN
    SELECT season_id INTO NEW.season_id FROM teams WHERE id = NEW.team_id;
  END IF;
  IF NEW.season_id IS NULL THEN
    SELECT id INTO NEW.season_id FROM seasons WHERE is_current = true LIMIT 1;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS players_set_season ON players;
CREATE TRIGGER players_set_season
BEFORE INSERT ON players
FOR EACH ROW EXECUTE FUNCTION public.set_player_season();

COMMIT;
