BEGIN;

CREATE TABLE IF NOT EXISTS site_settings (
  key text PRIMARY KEY,
  value jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON site_settings TO anon, authenticated;

COMMIT;
