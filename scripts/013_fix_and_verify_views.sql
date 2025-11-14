-- Drop and recreate views to ensure they're using description field

-- Drop existing views
drop view if exists public.top_scorers;
drop view if exists public.top_assists;

-- Create top_scorers view using description field (player names)
create view public.top_scorers as
select
  gen_random_uuid() as id,
  me.description as player_name,
  null::integer as jersey_number,
  null::text as position,
  t.name as team_name,
  count(me.id) as goals
from public.match_events me
join public.teams t on me.team_id = t.id
where me.event_type = 'goal'
  and me.description is not null
  and me.description != ''
group by me.description, t.name
order by goals desc, me.description
limit 10;

-- Create top_assists view using description field (player names)
create view public.top_assists as
select
  gen_random_uuid() as id,
  me.description as player_name,
  null::integer as jersey_number,
  null::text as position,
  t.name as team_name,
  count(me.id) as assists
from public.match_events me
join public.teams t on me.team_id = t.id
where me.event_type = 'assist'
  and me.description is not null
  and me.description != ''
group by me.description, t.name
order by assists desc, me.description
limit 10;

-- Verify the views work
select 'Top Scorers:' as check_type;
select * from public.top_scorers;

select 'Top Assists:' as check_type;
select * from public.top_assists;

-- Check raw match_events data
select 'Match Events Sample:' as check_type;
select 
  event_type,
  description,
  team_id,
  count(*) as count
from public.match_events
where description is not null
group by event_type, description, team_id
order by count desc
limit 10;

