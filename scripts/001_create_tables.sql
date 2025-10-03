-- Create teams table
create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  representative_name text,
  contact_phone text,
  contact_email text,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- Create matches table
create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  match_day integer not null,
  home_team_id uuid not null references public.teams(id) on delete cascade,
  away_team_id uuid not null references public.teams(id) on delete cascade,
  match_date date not null,
  match_time time,
  venue text,
  home_score integer,
  away_score integer,
  is_completed boolean default false,
  created_at timestamp with time zone default now(),
  constraint different_teams check (home_team_id != away_team_id)
);

-- Create league_standings view (automatically calculated)
create or replace view public.league_standings as
select 
  t.id,
  t.name as team_name,
  count(m.id) as played,
  sum(case 
    when m.is_completed and ((m.home_team_id = t.id and m.home_score > m.away_score) or 
                              (m.away_team_id = t.id and m.away_score > m.home_score))
    then 1 else 0 
  end) as won,
  sum(case 
    when m.is_completed and m.home_score = m.away_score
    then 1 else 0 
  end) as drawn,
  sum(case 
    when m.is_completed and ((m.home_team_id = t.id and m.home_score < m.away_score) or 
                              (m.away_team_id = t.id and m.away_score < m.home_score))
    then 1 else 0 
  end) as lost,
  sum(case 
    when m.home_team_id = t.id then coalesce(m.home_score, 0)
    when m.away_team_id = t.id then coalesce(m.away_score, 0)
    else 0
  end) as goals_for,
  sum(case 
    when m.home_team_id = t.id then coalesce(m.away_score, 0)
    when m.away_team_id = t.id then coalesce(m.home_score, 0)
    else 0
  end) as goals_against,
  sum(case 
    when m.home_team_id = t.id then coalesce(m.home_score, 0) - coalesce(m.away_score, 0)
    when m.away_team_id = t.id then coalesce(m.away_score, 0) - coalesce(m.home_score, 0)
    else 0
  end) as goal_difference,
  sum(case 
    when m.is_completed and ((m.home_team_id = t.id and m.home_score > m.away_score) or 
                              (m.away_team_id = t.id and m.away_score > m.home_score))
    then 3
    when m.is_completed and m.home_score = m.away_score
    then 1
    else 0 
  end) as points
from public.teams t
left join public.matches m on (m.home_team_id = t.id or m.away_team_id = t.id) and m.is_completed = true
where t.is_active = true
group by t.id, t.name
order by points desc, goal_difference desc, goals_for desc;

-- Enable Row Level Security
alter table public.teams enable row level security;
alter table public.matches enable row level security;

-- Public read access for teams (anyone can view)
create policy "teams_public_read"
  on public.teams for select
  using (true);

-- Public read access for matches (anyone can view)
create policy "matches_public_read"
  on public.matches for select
  using (true);

-- Admin write access for teams (for now, allow all authenticated users to manage)
-- In production, you'd want to add an admin role check
create policy "teams_admin_insert"
  on public.teams for insert
  with check (true);

create policy "teams_admin_update"
  on public.teams for update
  using (true);

create policy "teams_admin_delete"
  on public.teams for delete
  using (true);

-- Admin write access for matches
create policy "matches_admin_insert"
  on public.matches for insert
  with check (true);

create policy "matches_admin_update"
  on public.matches for update
  using (true);

create policy "matches_admin_delete"
  on public.matches for delete
  using (true);

-- Create indexes for better performance
create index if not exists idx_matches_home_team on public.matches(home_team_id);
create index if not exists idx_matches_away_team on public.matches(away_team_id);
create index if not exists idx_matches_date on public.matches(match_date);
create index if not exists idx_matches_completed on public.matches(is_completed);
