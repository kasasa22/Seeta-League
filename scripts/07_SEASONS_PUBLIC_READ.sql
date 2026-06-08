ALTER TABLE seasons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS seasons_public_read ON seasons;
CREATE POLICY seasons_public_read ON seasons
  FOR SELECT
  TO anon, authenticated
  USING (true);

GRANT SELECT ON seasons TO anon, authenticated;

SELECT policyname, roles, cmd
FROM pg_policies
WHERE tablename = 'seasons';
