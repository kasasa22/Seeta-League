-- Update top_scorers view to use description field (player names) directly
create or replace view public.top_scorers as
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

-- Update top_assists view to use description field (player names) directly
create or replace view public.top_assists as
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

