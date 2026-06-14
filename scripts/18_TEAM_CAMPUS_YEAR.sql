BEGIN;

ALTER TABLE teams ADD COLUMN IF NOT EXISTS campus text;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS year integer;

ALTER TABLE players ADD COLUMN IF NOT EXISTS year integer;

CREATE INDEX IF NOT EXISTS idx_teams_campus ON teams(campus);
CREATE INDEX IF NOT EXISTS idx_teams_year ON teams(year);
CREATE INDEX IF NOT EXISTS idx_players_year ON players(year);

COMMIT;
