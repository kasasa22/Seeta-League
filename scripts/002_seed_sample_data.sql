-- Insert sample teams
insert into public.teams (name, representative_name, contact_email, is_active) values
  ('Eagles FC', 'John Smith', 'eagles@school.com', true),
  ('Lions United', 'Sarah Johnson', 'lions@school.com', true),
  ('Tigers Athletic', 'Mike Brown', 'tigers@school.com', true),
  ('Panthers FC', 'Emma Davis', 'panthers@school.com', true),
  ('Wolves FC', 'David Wilson', 'wolves@school.com', true),
  ('Hawks United', 'Lisa Anderson', 'hawks@school.com', true)
on conflict (name) do nothing;

-- Insert sample matches (upcoming fixtures)
insert into public.matches (match_day, home_team_id, away_team_id, match_date, match_time, venue, is_completed)
select 
  1,
  (select id from public.teams where name = 'Eagles FC'),
  (select id from public.teams where name = 'Lions United'),
  current_date + interval '3 days',
  '14:00:00',
  'Main Field',
  false
where exists (select 1 from public.teams where name = 'Eagles FC')
  and exists (select 1 from public.teams where name = 'Lions United');

insert into public.matches (match_day, home_team_id, away_team_id, match_date, match_time, venue, is_completed)
select 
  1,
  (select id from public.teams where name = 'Tigers Athletic'),
  (select id from public.teams where name = 'Panthers FC'),
  current_date + interval '3 days',
  '16:00:00',
  'Main Field',
  false
where exists (select 1 from public.teams where name = 'Tigers Athletic')
  and exists (select 1 from public.teams where name = 'Panthers FC');

-- Insert sample completed matches with scores
insert into public.matches (match_day, home_team_id, away_team_id, match_date, match_time, venue, home_score, away_score, is_completed)
select 
  1,
  (select id from public.teams where name = 'Wolves FC'),
  (select id from public.teams where name = 'Hawks United'),
  current_date - interval '2 days',
  '14:00:00',
  'Main Field',
  3,
  1,
  true
where exists (select 1 from public.teams where name = 'Wolves FC')
  and exists (select 1 from public.teams where name = 'Hawks United');
