DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'seasons', 'profiles', 'roles', 'permissions', 'role_permissions', 'user_roles'
  ]
  LOOP
    IF to_regclass('public.' || t) IS NOT NULL THEN
      EXECUTE format('ALTER TABLE public.%I DISABLE ROW LEVEL SECURITY', t);
    END IF;
  END LOOP;
END $$;

SELECT relname AS table_name, relrowsecurity AS rls_enabled
FROM pg_class
WHERE relnamespace = 'public'::regnamespace
  AND relname IN ('seasons', 'profiles', 'roles', 'permissions', 'role_permissions', 'user_roles')
ORDER BY relname;
