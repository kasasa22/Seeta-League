-- Clear test scores and match events only
-- This does NOT affect tables, views, or schema - only data

-- Delete all match events (goals and assists)
delete from public.match_events;

-- Reset all match scores to null and mark as not completed
update public.matches
set 
  home_score = null,
  away_score = null,
  is_completed = false;

-- Optional: If you also want to delete the auto-created players from score entry
-- Uncomment the line below (be careful - this will delete players created during testing)
-- delete from public.players where created_at > now() - interval '7 days';

-- Verify the cleanup
select 'Remaining match_events:' as status, count(*) as count from public.match_events;
select 'Completed matches:' as status, count(*) as count from public.matches where is_completed = true;
select 'Matches with scores:' as status, count(*) as count from public.matches where home_score is not null or away_score is not null;

