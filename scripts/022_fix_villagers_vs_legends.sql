-- Fix The Villagers vs Raptors match - should be vs Legends
-- Match ID: c2a22498-75ac-42f6-85bd-06ab1bbb881a
-- Score: The Villagers 9 vs Legends 1 (not Raptors)

-- First, verify current state
select 
  m.id,
  m.match_date,
  m.match_time,
  m.venue,
  ht.name as home_team,
  m.home_score,
  m.away_score,
  at.name as away_team,
  m.is_completed
from public.matches m
join public.teams ht on m.home_team_id = ht.id
join public.teams at on m.away_team_id = at.id
where m.id = 'c2a22498-75ac-42f6-85bd-06ab1bbb881a';

-- Get team IDs for reference
do $$
declare
  legends_id uuid;
  raptors_id uuid;
  match_uuid uuid := 'c2a22498-75ac-42f6-85bd-06ab1bbb881a';
begin
  select id into legends_id from public.teams where name = 'Legends' limit 1;
  select id into raptors_id from public.teams where name = 'Raptors' limit 1;
  
  if legends_id is null then
    raise notice 'Legends team not found. Available teams:';
    perform 1 from public.teams where name ilike '%legend%';
  end if;
  
  if legends_id is not null then
    -- Update the match away_team_id
    update public.matches
    set away_team_id = legends_id
    where id = match_uuid;
    
    -- Update any match_events (goals/assists) that were recorded for Raptors in this match
    -- to be associated with Legends instead
    if raptors_id is not null then
      update public.match_events
      set team_id = legends_id
      where match_id = match_uuid
        and team_id = raptors_id;
    end if;
    
    raise notice 'Match updated successfully';
  else
    raise notice 'Cannot update - Legends team not found';
  end if;
end $$;

-- Verify the fix
select 
  m.id,
  m.match_date,
  m.match_time,
  m.venue,
  ht.name as home_team,
  m.home_score,
  m.away_score,
  at.name as away_team,
  m.is_completed
from public.matches m
join public.teams ht on m.home_team_id = ht.id
join public.teams at on m.away_team_id = at.id
where m.id = 'c2a22498-75ac-42f6-85bd-06ab1bbb881a';

