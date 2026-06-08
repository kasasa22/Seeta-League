BEGIN;

ALTER TABLE teams ADD COLUMN IF NOT EXISTS logo_url text;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS captain_id uuid REFERENCES profiles(id);
ALTER TABLE players ADD COLUMN IF NOT EXISTS photo_url text;

CREATE INDEX IF NOT EXISTS idx_teams_captain ON teams(captain_id);

COMMIT;
