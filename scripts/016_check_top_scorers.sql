-- Check top scorers directly from match_events
select 
  me.description as player_name,
  t.name as team_name,
  count(*) as goals
from public.match_events me
join public.teams t on me.team_id = t.id
where me.event_type = 'goal'
  and me.description is not null
  and me.description != ''
group by me.description, t.name
order by goals desc, me.description
limit 10;

-- Check top assists directly from match_events
select 
  me.description as player_name,
  t.name as team_name,
  count(*) as assists
from public.match_events me
join public.teams t on me.team_id = t.id
where me.event_type = 'assist'
  and me.description is not null
  and me.description != ''
group by me.description, t.name
order by assists desc, me.description
limit 10;

-- Check the top_scorers view
select * from public.top_scorers
limit 10;

-- Check the top_assists view
select * from public.top_assists
limit 10;

