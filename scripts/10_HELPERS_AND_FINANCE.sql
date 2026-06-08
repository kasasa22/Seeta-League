BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE OR REPLACE FUNCTION public.is_super_admin(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles ur JOIN roles r ON r.id = ur.role_id
    WHERE ur.user_id = uid AND r.key = 'super_admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.has_perm(uid uuid, perm text)
RETURNS boolean LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT public.is_super_admin(uid) OR EXISTS (
    SELECT 1 FROM user_roles ur JOIN role_permissions rp ON rp.role_id = ur.role_id
    WHERE ur.user_id = uid AND rp.permission_key = perm
  );
$$;

CREATE OR REPLACE FUNCTION public.has_role(uid uuid, rkey text)
RETURNS boolean LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles ur JOIN roles r ON r.id = ur.role_id
    WHERE ur.user_id = uid AND r.key = rkey
  );
$$;

CREATE TABLE IF NOT EXISTS finance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id uuid REFERENCES seasons(id),
  type text NOT NULL,
  category text,
  team_id uuid REFERENCES teams(id),
  amount numeric NOT NULL,
  description text,
  occurred_on date NOT NULL DEFAULT current_date,
  recorded_by uuid REFERENCES profiles(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_finance_season ON finance_records(season_id);
CREATE INDEX IF NOT EXISTS idx_finance_team ON finance_records(team_id);

ALTER TABLE finance_records ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS finance_read ON finance_records;
CREATE POLICY finance_read ON finance_records FOR SELECT TO authenticated
  USING (
    public.has_perm(auth.uid(), 'view_finance')
    OR public.has_perm(auth.uid(), 'manage_finance')
    OR public.has_perm(auth.uid(), 'view_all')
  );
DROP POLICY IF EXISTS finance_write ON finance_records;
CREATE POLICY finance_write ON finance_records FOR ALL TO authenticated
  USING (public.has_perm(auth.uid(), 'manage_finance'))
  WITH CHECK (public.has_perm(auth.uid(), 'manage_finance'));

GRANT SELECT, INSERT, UPDATE, DELETE ON finance_records TO authenticated;

COMMIT;
