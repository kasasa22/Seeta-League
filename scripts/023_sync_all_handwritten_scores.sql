-- Sync all scores to match handwritten results 100%
-- This script ensures complete accuracy with handwritten match results
-- Note: Only fixes scores, not home/away team positions

BEGIN;

-- FIX 1: Super Strikers vs Brotherhood - scores missing
-- Handwritten: Super Strikers 3 vs Brotherhood 1
-- Match ID: e5ba9258-e28c-4277-92a3-bde673a52590
update public.matches
set 
  home_score = 3,
  away_score = 1,
  is_completed = true
where id = 'e5ba9258-e28c-4277-92a3-bde673a52590';

-- FIX 2: Losti City vs Legends - ensure scores match
-- Handwritten: Losti City 6 vs Legends 1
-- JSON shows: Legends 1 vs Losti City 6 (scores already correct, just team order different)
-- Match ID: 082a274d-cb0f-42ef-8c6b-22d47a337c45
-- Status: Scores already match (1-6), no change needed

-- FIX 3: Brotherhood vs COVID Boys - ensure scores match
-- Handwritten: Brotherhood 1 vs COVID Boys 2
-- JSON shows: COVID Boys 2 vs Brotherhood 1 (scores already correct, just team order different)
-- Match ID: 51e6138c-c264-43df-9254-be82711bd51a
-- Status: Scores already match (2-1), no change needed

COMMIT;

-- Verification query - show all completed matches to verify
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
    when m.is_completed then '✓'
    else '✗'
  end as status
from public.matches m
join public.teams ht on m.home_team_id = ht.id
join public.teams at on m.away_team_id = at.id
where m.match_day = 1
  and m.match_date = '2025-11-16'
order by m.match_time, m.venue;

