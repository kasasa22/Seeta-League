BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

UPDATE match_events me
SET season_id = m.season_id
FROM matches m
WHERE me.match_id = m.id AND me.season_id IS NULL;

CREATE OR REPLACE FUNCTION public.set_match_event_season()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.season_id IS NULL THEN
    SELECT season_id INTO NEW.season_id FROM matches WHERE id = NEW.match_id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS match_events_set_season ON match_events;
CREATE TRIGGER match_events_set_season
BEFORE INSERT OR UPDATE ON match_events
FOR EACH ROW EXECUTE FUNCTION public.set_match_event_season();

CREATE OR REPLACE FUNCTION public.set_match_season()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.season_id IS NULL THEN
    SELECT id INTO NEW.season_id FROM seasons WHERE is_current = true LIMIT 1;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS matches_set_season ON matches;
CREATE TRIGGER matches_set_season
BEFORE INSERT ON matches
FOR EACH ROW EXECUTE FUNCTION public.set_match_season();

CREATE OR REPLACE FUNCTION public.recalc_season_standings(p_season uuid)
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  DELETE FROM league_standings WHERE season_id = p_season;

  INSERT INTO league_standings
    (team_id, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position, season_id)
  WITH per AS (
    SELECT home_team_id AS team_id, home_score AS gf, away_score AS ga
    FROM matches WHERE season_id = p_season AND is_completed
    UNION ALL
    SELECT away_team_id, away_score, home_score
    FROM matches WHERE season_id = p_season AND is_completed
  ),
  agg AS (
    SELECT team_id,
      COUNT(*) AS played,
      COUNT(*) FILTER (WHERE gf > ga) AS won,
      COUNT(*) FILTER (WHERE gf = ga) AS drawn,
      COUNT(*) FILTER (WHERE gf < ga) AS lost,
      COALESCE(SUM(gf), 0) AS goals_for,
      COALESCE(SUM(ga), 0) AS goals_against
    FROM per
    GROUP BY team_id
  )
  SELECT t.id, t.name,
    COALESCE(a.played, 0), COALESCE(a.won, 0), COALESCE(a.drawn, 0), COALESCE(a.lost, 0),
    COALESCE(a.goals_for, 0), COALESCE(a.goals_against, 0),
    COALESCE(a.goals_for, 0) - COALESCE(a.goals_against, 0),
    COALESCE(a.won, 0) * 3 + COALESCE(a.drawn, 0),
    0, p_season
  FROM teams t
  LEFT JOIN agg a ON a.team_id = t.id
  WHERE t.season_id = p_season;

  WITH ranked AS (
    SELECT id, ROW_NUMBER() OVER (ORDER BY points DESC, goal_difference DESC, goals_for DESC) AS rn
    FROM league_standings WHERE season_id = p_season
  )
  UPDATE league_standings ls SET position = r.rn
  FROM ranked r WHERE ls.id = r.id;
END;
$$;

CREATE OR REPLACE FUNCTION public.trg_match_standings()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE s uuid;
BEGIN
  IF TG_OP = 'DELETE' THEN s := OLD.season_id; ELSE s := NEW.season_id; END IF;
  IF s IS NOT NULL THEN PERFORM public.recalc_season_standings(s); END IF;
  IF TG_OP = 'UPDATE' AND OLD.season_id IS DISTINCT FROM NEW.season_id AND OLD.season_id IS NOT NULL THEN
    PERFORM public.recalc_season_standings(OLD.season_id);
  END IF;
  RETURN NULL;
END;
$$;

DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT t.tgname FROM pg_trigger t
    JOIN pg_proc p ON p.oid = t.tgfoid
    WHERE t.tgrelid = 'public.matches'::regclass
      AND NOT t.tgisinternal
      AND p.prosrc ILIKE '%league_standings%'
  LOOP
    EXECUTE format('DROP TRIGGER %I ON public.matches', r.tgname);
  END LOOP;
END $$;

DROP TRIGGER IF EXISTS match_standings_recalc ON matches;
CREATE TRIGGER match_standings_recalc
AFTER INSERT OR UPDATE OR DELETE ON matches
FOR EACH ROW EXECUTE FUNCTION public.trg_match_standings();

CREATE TABLE IF NOT EXISTS man_of_the_match (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id uuid UNIQUE REFERENCES matches(id) ON DELETE CASCADE,
  player_id uuid REFERENCES players(id),
  season_id uuid REFERENCES seasons(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS matchday_outstanding (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id uuid REFERENCES seasons(id),
  match_day integer NOT NULL,
  player_id uuid REFERENCES players(id),
  points integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (season_id, match_day)
);

CREATE OR REPLACE FUNCTION public.recalc_matchday_outstanding(p_season uuid, p_day integer)
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  DELETE FROM matchday_outstanding WHERE season_id = p_season AND match_day = p_day;

  INSERT INTO matchday_outstanding (season_id, match_day, player_id, points)
  SELECT p_season, p_day, me.player_id,
    COUNT(*) FILTER (WHERE me.event_type = 'goal') * 2
    + COUNT(*) FILTER (WHERE me.event_type = 'assist')
  FROM match_events me
  JOIN matches m ON m.id = me.match_id
  WHERE m.season_id = p_season AND m.match_day = p_day
  GROUP BY me.player_id
  ORDER BY (
    COUNT(*) FILTER (WHERE me.event_type = 'goal') * 2
    + COUNT(*) FILTER (WHERE me.event_type = 'assist')
  ) DESC
  LIMIT 1;
END;
$$;

CREATE OR REPLACE FUNCTION public.trg_event_outstanding()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE v_season uuid; v_day integer; v_match uuid;
BEGIN
  v_match := COALESCE(NEW.match_id, OLD.match_id);
  SELECT season_id, match_day INTO v_season, v_day FROM matches WHERE id = v_match;
  IF v_season IS NOT NULL AND v_day IS NOT NULL THEN
    PERFORM public.recalc_matchday_outstanding(v_season, v_day);
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS match_events_outstanding ON match_events;
CREATE TRIGGER match_events_outstanding
AFTER INSERT OR UPDATE OR DELETE ON match_events
FOR EACH ROW EXECUTE FUNCTION public.trg_event_outstanding();

ALTER TABLE man_of_the_match ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS motm_public_read ON man_of_the_match;
CREATE POLICY motm_public_read ON man_of_the_match FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS motm_write ON man_of_the_match;
CREATE POLICY motm_write ON man_of_the_match FOR ALL TO authenticated
  USING (public.has_perm(auth.uid(), 'enter_scores') OR public.has_perm(auth.uid(), 'edit_records'))
  WITH CHECK (public.has_perm(auth.uid(), 'enter_scores') OR public.has_perm(auth.uid(), 'edit_records'));

ALTER TABLE matchday_outstanding ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS outstanding_public_read ON matchday_outstanding;
CREATE POLICY outstanding_public_read ON matchday_outstanding FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS outstanding_write ON matchday_outstanding;
CREATE POLICY outstanding_write ON matchday_outstanding FOR ALL TO authenticated
  USING (public.has_perm(auth.uid(), 'enter_scores') OR public.has_perm(auth.uid(), 'edit_records'))
  WITH CHECK (public.has_perm(auth.uid(), 'enter_scores') OR public.has_perm(auth.uid(), 'edit_records'));

GRANT SELECT ON man_of_the_match, matchday_outstanding TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON man_of_the_match, matchday_outstanding TO authenticated;

DROP VIEW IF EXISTS top_scorers;
CREATE VIEW top_scorers AS
SELECT p.id AS id, p.id AS player_id, p.name AS player_name, p.jersey_number,
       t.id AS team_id, t.name AS team_name, me.season_id,
       COUNT(*) AS goals
FROM match_events me
JOIN players p ON p.id = me.player_id
LEFT JOIN teams t ON t.id = me.team_id
WHERE me.event_type = 'goal'
GROUP BY p.id, p.name, p.jersey_number, t.id, t.name, me.season_id;

DROP VIEW IF EXISTS top_assists;
CREATE VIEW top_assists AS
SELECT p.id AS id, p.id AS player_id, p.name AS player_name, p.jersey_number,
       t.id AS team_id, t.name AS team_name, me.season_id,
       COUNT(*) AS assists
FROM match_events me
JOIN players p ON p.id = me.player_id
LEFT JOIN teams t ON t.id = me.team_id
WHERE me.event_type = 'assist'
GROUP BY p.id, p.name, p.jersey_number, t.id, t.name, me.season_id;

GRANT SELECT ON top_scorers, top_assists TO anon, authenticated;

COMMIT;
