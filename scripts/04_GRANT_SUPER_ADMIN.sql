UPDATE profiles
SET status = 'approved',
    full_name = COALESCE(NULLIF(full_name, ''), 'Kasasa Trevor')
WHERE email = 'kasasatrevor25@gmail.com';

INSERT INTO user_roles (user_id, role_id)
SELECT p.id, r.id
FROM profiles p
CROSS JOIN roles r
WHERE p.email = 'kasasatrevor25@gmail.com'
  AND r.key = 'super_admin'
  AND NOT EXISTS (
    SELECT 1 FROM user_roles ur
    WHERE ur.user_id = p.id AND ur.role_id = r.id AND ur.season_id IS NULL
  );

SELECT p.email, p.status, r.key AS role
FROM profiles p
JOIN user_roles ur ON ur.user_id = p.id
JOIN roles r ON r.id = ur.role_id
WHERE p.email = 'kasasatrevor25@gmail.com';
