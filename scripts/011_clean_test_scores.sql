-- Clean up test scores and match events

-- Delete all match events (goals and assists)
delete from public.match_events;

-- Reset all match scores to null and mark as not completed
update public.matches
set 
  home_score = null,
  away_score = null,
  is_completed = false;

