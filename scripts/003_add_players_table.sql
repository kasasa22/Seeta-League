-- Create players table
create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  team_id uuid not null references public.teams(id) on delete cascade,
  jersey_number integer,
  position text,
  date_of_birth date,
  contact_phone text,
  contact_email text,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  constraint unique_jersey_per_team unique (team_id, jersey_number)
);

-- Enable Row Level Security
alter table public.players enable row level security;

-- Public read access for players (anyone can view)
create policy "players_public_read"
  on public.players for select
  using (true);

-- Admin write access for players
create policy "players_admin_insert"
  on public.players for insert
  with check (true);

create policy "players_admin_update"
  on public.players for update
  using (true);

create policy "players_admin_delete"
  on public.players for delete
  using (true);

-- Create indexes for better performance
create index if not exists idx_players_team on public.players(team_id);
create index if not exists idx_players_active on public.players(is_active);
