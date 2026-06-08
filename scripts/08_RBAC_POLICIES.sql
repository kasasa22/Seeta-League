CREATE OR REPLACE FUNCTION public.is_super_admin(uid uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN roles r ON r.id = ur.role_id
    WHERE ur.user_id = uid AND r.key = 'super_admin'
  );
$$;

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS profiles_read ON profiles;
CREATE POLICY profiles_read ON profiles FOR SELECT
  USING (auth.uid() = id OR public.is_super_admin(auth.uid()));
DROP POLICY IF EXISTS profiles_insert ON profiles;
CREATE POLICY profiles_insert ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id OR public.is_super_admin(auth.uid()));
DROP POLICY IF EXISTS profiles_update ON profiles;
CREATE POLICY profiles_update ON profiles FOR UPDATE
  USING (public.is_super_admin(auth.uid()));

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS roles_read ON roles;
CREATE POLICY roles_read ON roles FOR SELECT USING (true);
DROP POLICY IF EXISTS roles_write ON roles;
CREATE POLICY roles_write ON roles FOR ALL
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));

ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS permissions_read ON permissions;
CREATE POLICY permissions_read ON permissions FOR SELECT USING (true);

ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS role_permissions_read ON role_permissions;
CREATE POLICY role_permissions_read ON role_permissions FOR SELECT USING (true);
DROP POLICY IF EXISTS role_permissions_write ON role_permissions;
CREATE POLICY role_permissions_write ON role_permissions FOR ALL
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS user_roles_read ON user_roles;
CREATE POLICY user_roles_read ON user_roles FOR SELECT
  USING (user_id = auth.uid() OR public.is_super_admin(auth.uid()));
DROP POLICY IF EXISTS user_roles_write ON user_roles;
CREATE POLICY user_roles_write ON user_roles FOR ALL
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));
