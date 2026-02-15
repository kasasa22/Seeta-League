-- Edit scores for Godfathers vs Raptors match
-- Setting to 0-0 draw

update public.matches
set 
  home_score = 0,
  away_score = 0,
  is_completed = true
where id = '711ced78-a84e-4cd4-b82c-9dd3ccb693a8';

-- Verify the update
select 
  m.id,
  ht.name as home_team,
  m.home_score,
  m.away_score,
  at.name as away_team,
  m.is_completed
from public.matches m
join public.teams ht on m.home_team_id = ht.id
join public.teams at on m.away_team_id = at.id
where m.id = '711ced78-a84e-4cd4-b82c-9dd3ccb693a8';

