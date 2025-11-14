-- Diagnostic script to check match_events data

-- Check all match_events (with and without descriptions)
select 
  id,
  match_id,
  event_type,
  description,
  team_id,
  player_id,
  created_at
from public.match_events
order by created_at desc
limit 20;

-- Count events by type
select 
  event_type,
  count(*) as total_count,
  count(description) as with_description,
  count(*) - count(description) as without_description
from public.match_events
group by event_type;

-- Check if there are any completed matches
select 
  id,
  home_team_id,
  away_team_id,
  home_score,
  away_score,
  is_completed,
  match_date
from public.matches
where is_completed = true
order by match_date desc
limit 10;

