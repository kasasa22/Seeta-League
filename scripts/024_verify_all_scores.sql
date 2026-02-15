-- Verify all match scores are correct
-- This script checks all completed matches for accuracy

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
  m.is_completed,
  case 
    when m.is_completed and m.home_score is not null and m.away_score is not null then '✓ Complete'
    when m.is_completed and (m.home_score is null or m.away_score is null) then '⚠ Missing Scores'
    else '✗ Not Completed'
  end as status
from public.matches m
join public.teams ht on m.home_team_id = ht.id
join public.teams at on m.away_team_id = at.id
where m.match_day = 1
  and m.match_date = '2025-11-16'
order by m.match_time, m.venue;

-- Summary statistics
select 
  count(*) as total_matches,
  count(*) filter (where is_completed = true) as completed_matches,
  count(*) filter (where is_completed = false) as pending_matches,
  count(*) filter (where is_completed = true and home_score is not null and away_score is not null) as matches_with_scores,
  count(*) filter (where is_completed = true and (home_score is null or away_score is null)) as completed_but_missing_scores
from public.matches
where match_day = 1
  and match_date = '2025-11-16';

