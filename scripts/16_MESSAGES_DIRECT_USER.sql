BEGIN;

ALTER TABLE messages ADD COLUMN IF NOT EXISTS to_user_id uuid REFERENCES profiles(id);

CREATE OR REPLACE FUNCTION public.role_directory()
RETURNS TABLE(role_key text, user_id uuid, display_name text)
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT r.key, p.id, COALESCE(NULLIF(p.full_name, ''), 'User ' || left(p.id::text, 8))
  FROM user_roles ur
  JOIN roles r ON r.id = ur.role_id
  JOIN profiles p ON p.id = ur.user_id
  WHERE p.status = 'approved';
$$;

GRANT EXECUTE ON FUNCTION public.role_directory() TO authenticated;

DROP POLICY IF EXISTS messages_read ON messages;
CREATE POLICY messages_read ON messages FOR SELECT TO authenticated
  USING (
    from_user_id = auth.uid()
    OR public.is_super_admin(auth.uid())
    OR (to_user_id IS NOT NULL AND to_user_id = auth.uid())
    OR (to_user_id IS NULL AND public.has_role(auth.uid(), to_role))
  );

DROP POLICY IF EXISTS messages_update ON messages;
CREATE POLICY messages_update ON messages FOR UPDATE TO authenticated
  USING (
    public.is_super_admin(auth.uid())
    OR (to_user_id IS NOT NULL AND to_user_id = auth.uid())
    OR (to_user_id IS NULL AND public.has_role(auth.uid(), to_role))
  );

DROP POLICY IF EXISTS replies_read ON message_replies;
CREATE POLICY replies_read ON message_replies FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM messages m WHERE m.id = message_replies.message_id
    AND (
      m.from_user_id = auth.uid()
      OR public.is_super_admin(auth.uid())
      OR (m.to_user_id IS NOT NULL AND m.to_user_id = auth.uid())
      OR (m.to_user_id IS NULL AND public.has_role(auth.uid(), m.to_role))
    )
  ));

DROP POLICY IF EXISTS replies_insert ON message_replies;
CREATE POLICY replies_insert ON message_replies FOR INSERT TO authenticated
  WITH CHECK (
    author_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM messages m WHERE m.id = message_replies.message_id
      AND (
        m.from_user_id = auth.uid()
        OR public.is_super_admin(auth.uid())
        OR (m.to_user_id IS NOT NULL AND m.to_user_id = auth.uid())
        OR (m.to_user_id IS NULL AND public.has_role(auth.uid(), m.to_role))
      )
    )
  );

COMMIT;
