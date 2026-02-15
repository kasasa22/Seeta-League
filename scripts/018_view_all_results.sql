-- View all match results
-- Returns all matches with team names and scores

select 
  m.id as match_id,
  m.match_day,
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
order by m.match_date, m.match_time, m.match_day;

