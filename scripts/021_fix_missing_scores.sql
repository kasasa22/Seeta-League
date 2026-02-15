-- Quick fix for missing/incomplete scores from handwritten results

-- Fix 1: Super Strikers vs Brotherhood - scores missing in JSON
-- Handwritten shows: Super Strikers 3 vs Brotherhood 1
update public.matches
set 
  home_score = 3,
  away_score = 1,
  is_completed = true
where id = 'e5ba9258-e28c-4277-92a3-bde673a52590';

-- Note: Godfathers vs Raptors (0-0) already fixed in script 019

