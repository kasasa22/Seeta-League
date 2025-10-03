-- Create match_events table to track goals and assists
create table if not exists public.match_events (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  player_id uuid not null references public.players(id) on delete cascade,
  team_id uuid not null references public.teams(id) on delete cascade,
  event_type text not null check (event_type in ('goal', 'assist')),
  minute integer check (minute >= 0 and minute <= 120),
  description text,
  created_at timestamp with time zone default now()
);

-- Create player_statistics view for aggregated stats
create or replace view public.player_statistics as
select
  p.id,
  p.name as player_name,
  p.jersey_number,
  p.position,
  t.name as team_name,
  t.id as team_id,
  coalesce(goals.goal_count, 0) as goals,
  coalesce(assists.assist_count, 0) as assists,
  coalesce(goals.goal_count, 0) + coalesce(assists.assist_count, 0) as total_contributions
from public.players p
join public.teams t on p.team_id = t.id
left join (
  select
    player_id,
    count(*) as goal_count
  from public.match_events
  where event_type = 'goal'
  group by player_id
) goals on p.id = goals.player_id
left join (
  select
    player_id,
    count(*) as assist_count
  from public.match_events
  where event_type = 'assist'
  group by player_id
) assists on p.id = assists.player_id
where p.is_active = true
order by goals desc, assists desc, p.name;

-- Create top_scorers view
create or replace view public.top_scorers as
select
  p.id,
  p.name as player_name,
  p.jersey_number,
  p.position,
  t.name as team_name,
  coalesce(count(me.id), 0) as goals
from public.players p
join public.teams t on p.team_id = t.id
left join public.match_events me on p.id = me.player_id and me.event_type = 'goal'
where p.is_active = true
group by p.id, p.name, p.jersey_number, p.position, t.name
order by goals desc, p.name
limit 10;

-- Create top_assists view
create or replace view public.top_assists as
select
  p.id,
  p.name as player_name,
  p.jersey_number,
  p.position,
  t.name as team_name,
  coalesce(count(me.id), 0) as assists
from public.players p
join public.teams t on p.team_id = t.id
left join public.match_events me on p.id = me.player_id and me.event_type = 'assist'
where p.is_active = true
group by p.id, p.name, p.jersey_number, p.position, t.name
order by assists desc, p.name
limit 10;

-- Enable Row Level Security
alter table public.match_events enable row level security;

-- Public read access for match_events (anyone can view)
create policy "match_events_public_read"
  on public.match_events for select
  using (true);

-- Admin write access for match_events
create policy "match_events_admin_insert"
  on public.match_events for insert
  with check (true);

create policy "match_events_admin_update"
  on public.match_events for update
  using (true);

create policy "match_events_admin_delete"
  on public.match_events for delete
  using (true);

-- Create indexes for better performance
create index if not exists idx_match_events_match on public.match_events(match_id);
create index if not exists idx_match_events_player on public.match_events(player_id);
create index if not exists idx_match_events_team on public.match_events(team_id);
create index if not exists idx_match_events_type on public.match_events(event_type);