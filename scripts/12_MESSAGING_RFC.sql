BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id uuid REFERENCES seasons(id),
  from_user_id uuid REFERENCES profiles(id),
  to_role text NOT NULL,
  subject text NOT NULL,
  body text,
  status text NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS message_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid REFERENCES messages(id) ON DELETE CASCADE,
  author_id uuid REFERENCES profiles(id),
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_messages_to_role ON messages(to_role);
CREATE INDEX IF NOT EXISTS idx_messages_from ON messages(from_user_id);
CREATE INDEX IF NOT EXISTS idx_replies_message ON message_replies(message_id);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS messages_read ON messages;
CREATE POLICY messages_read ON messages FOR SELECT TO authenticated
  USING (from_user_id = auth.uid() OR public.has_role(auth.uid(), to_role) OR public.is_super_admin(auth.uid()));
DROP POLICY IF EXISTS messages_insert ON messages;
CREATE POLICY messages_insert ON messages FOR INSERT TO authenticated
  WITH CHECK (
    from_user_id = auth.uid()
    AND (public.has_perm(auth.uid(), 'send_rfc') OR public.has_perm(auth.uid(), 'respond_rfc'))
  );
DROP POLICY IF EXISTS messages_update ON messages;
CREATE POLICY messages_update ON messages FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), to_role) OR public.is_super_admin(auth.uid()));

ALTER TABLE message_replies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS replies_read ON message_replies;
CREATE POLICY replies_read ON message_replies FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM messages m WHERE m.id = message_replies.message_id
    AND (m.from_user_id = auth.uid() OR public.has_role(auth.uid(), m.to_role) OR public.is_super_admin(auth.uid()))
  ));
DROP POLICY IF EXISTS replies_insert ON message_replies;
CREATE POLICY replies_insert ON message_replies FOR INSERT TO authenticated
  WITH CHECK (
    author_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM messages m WHERE m.id = message_replies.message_id
      AND (m.from_user_id = auth.uid() OR public.has_role(auth.uid(), m.to_role) OR public.is_super_admin(auth.uid()))
    )
  );

GRANT SELECT, INSERT, UPDATE, DELETE ON messages TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON message_replies TO authenticated;

COMMIT;
