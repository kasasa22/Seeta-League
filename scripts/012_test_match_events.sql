-- Test script to check if match_events are being stored correctly

-- Check if match_events have description field populated
select 
  id,
  match_id,
  player_id,
  team_id,
  event_type,
  description,
  created_at
from public.match_events
order by created_at desc
limit 20;

-- Check top_scorers view
select * from public.top_scorers
limit 10;

-- Check top_assists view
select * from public.top_assists
limit 10;

