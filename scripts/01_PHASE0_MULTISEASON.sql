BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS seasons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  year integer,
  kickoff_date date,
  registration_deadline date,
  venue text,
  registration_fee numeric,
  status text NOT NULL DEFAULT 'upcoming',
  is_current boolean NOT NULL DEFAULT false,
  champion_team_id uuid REFERENCES teams(id),
  runner_up_team_id uuid REFERENCES teams(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE teams ADD COLUMN IF NOT EXISTS season_id uuid REFERENCES seasons(id);
ALTER TABLE players ADD COLUMN IF NOT EXISTS season_id uuid REFERENCES seasons(id);
ALTER TABLE matches ADD COLUMN IF NOT EXISTS season_id uuid REFERENCES seasons(id);
ALTER TABLE league_standings ADD COLUMN IF NOT EXISTS season_id uuid REFERENCES seasons(id);
ALTER TABLE match_events ADD COLUMN IF NOT EXISTS season_id uuid REFERENCES seasons(id);

INSERT INTO seasons (name, slug, year, kickoff_date, venue, status, is_current)
SELECT 'Season 1', 'season-1', 2025, DATE '2025-12-07',
       'Equinox Sports & Fitness Center, Kulambiro', 'completed', false
WHERE NOT EXISTS (SELECT 1 FROM seasons WHERE slug = 'season-1');

INSERT INTO seasons (name, slug, year, kickoff_date, registration_deadline, venue, registration_fee, status, is_current)
SELECT 'Season 2', 'season-2', 2026, DATE '2026-08-30', DATE '2026-08-15',
       'Arches Gardens, Kisasi', 1500000, 'upcoming', true
WHERE NOT EXISTS (SELECT 1 FROM seasons WHERE slug = 'season-2');

UPDATE teams SET season_id = (SELECT id FROM seasons WHERE slug = 'season-1') WHERE season_id IS NULL;
UPDATE players SET season_id = (SELECT id FROM seasons WHERE slug = 'season-1') WHERE season_id IS NULL;
UPDATE matches SET season_id = (SELECT id FROM seasons WHERE slug = 'season-1') WHERE season_id IS NULL;
UPDATE league_standings SET season_id = (SELECT id FROM seasons WHERE slug = 'season-1') WHERE season_id IS NULL;
UPDATE match_events SET season_id = (SELECT id FROM seasons WHERE slug = 'season-1') WHERE season_id IS NULL;

UPDATE seasons s SET
  champion_team_id = (SELECT id FROM teams WHERE name = 'Allies' AND season_id = s.id LIMIT 1),
  runner_up_team_id = (SELECT id FROM teams WHERE name = 'Club de Chege' AND season_id = s.id LIMIT 1)
WHERE s.slug = 'season-1';

UPDATE seasons SET is_current = (slug = 'season-2');

CREATE INDEX IF NOT EXISTS idx_teams_season ON teams(season_id);
CREATE INDEX IF NOT EXISTS idx_players_season ON players(season_id);
CREATE INDEX IF NOT EXISTS idx_matches_season ON matches(season_id);
CREATE INDEX IF NOT EXISTS idx_standings_season ON league_standings(season_id);
CREATE INDEX IF NOT EXISTS idx_match_events_season ON match_events(season_id);

COMMIT;
