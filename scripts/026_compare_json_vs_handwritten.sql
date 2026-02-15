-- Compare JSON data vs Handwritten images for 100% score accuracy
-- This script verifies all scores match exactly

-- HANDWRITTEN SCORES FROM IMAGES:
-- Image 1 (Pitch B): Titans 1 vs Super Strikers 3
-- Image 2 (Pitch B): Godfathers 0 vs Raptors 0, Brotherhood 1 vs COVID Boys 2, Panthers 0 vs Losti City 5
-- Image 3 (Pitch A): Club de Shege 3 vs Brotherhood 0, Finest Brothers 3 vs Ronavics 1, Titans 1 vs Panthers 2, 
--                    Club de Shege 0 vs Losti City 1, Ronavics 5 vs Raptors 0, Finest Brothers 2 vs COVID Boys 1
-- Image 4 (Pitch B): Top Bins 1 vs Super Strikers 4, Godfathers 1 vs COVID Boys 3, The Villagers 9 vs Legends 1,
--                    Godfathers 0 vs Top Bins 0, Super Strikers 3 vs Brotherhood 1, Losti City 6 vs Legends 1,
--                    The Villagers 2 vs Panthers 0

-- COMPARISON CHECK:
-- For each match, check if scores match (ignoring home/away order)

select 
  m.id as match_id,
  m.match_time,
  m.venue,
  ht.name as home_team,
  m.home_score as json_home_score,
  m.away_score as json_away_score,
  at.name as away_team,
  m.is_completed,
  case 
    -- Titans vs Super Strikers (Image 1)
    when (ht.name = 'Titans' and at.name = 'Super Strikers') or (ht.name = 'Super Strikers' and at.name = 'Titans') then
      case when (m.home_score = 1 and m.away_score = 3) or (m.home_score = 3 and m.away_score = 1) then '✓ Match'
           else '✗ Mismatch: Expected 1-3 or 3-1'
      end
    -- Godfathers vs Raptors 0-0 (Image 2)
    when (ht.name = 'Godfathers' and at.name = 'Raptors') or (ht.name = 'Raptors' and at.name = 'Godfathers') then
      case when m.home_score = 0 and m.away_score = 0 then '✓ Match'
           else '✗ Mismatch: Expected 0-0'
      end
    -- Brotherhood vs COVID Boys 1-2 (Image 2)
    when ((ht.name = 'Brotherhood' or ht.name = 'The Brotherhood') and at.name = 'COVID Boys') or 
         (ht.name = 'COVID Boys' and (at.name = 'Brotherhood' or at.name = 'The Brotherhood')) then
      case when (m.home_score = 1 and m.away_score = 2) or (m.home_score = 2 and m.away_score = 1) then '✓ Match'
           else '✗ Mismatch: Expected 1-2 or 2-1'
      end
    -- Panthers vs Losti City 0-5 (Image 2)
    when (ht.name = 'Panthers' and at.name = 'Losti City') or (ht.name = 'Losti City' and at.name = 'Panthers') then
      case when (m.home_score = 0 and m.away_score = 5) or (m.home_score = 5 and m.away_score = 0) then '✓ Match'
           else '✗ Mismatch: Expected 0-5 or 5-0'
      end
    -- Club de Shege vs Brotherhood 3-0 (Image 3)
    when (ht.name = 'Club de Shege' and (at.name = 'Brotherhood' or at.name = 'The Brotherhood')) or 
         ((ht.name = 'Brotherhood' or ht.name = 'The Brotherhood') and at.name = 'Club de Shege') then
      case when (m.home_score = 3 and m.away_score = 0) or (m.home_score = 0 and m.away_score = 3) then '✓ Match'
           else '✗ Mismatch: Expected 3-0 or 0-3'
      end
    -- Finest Brothers vs Ronavics 3-1 (Image 3)
    when (ht.name = 'Finest Brothers' and at.name = 'Ronavics') or (ht.name = 'Ronavics' and at.name = 'Finest Brothers') then
      case when (m.home_score = 3 and m.away_score = 1) or (m.home_score = 1 and m.away_score = 3) then '✓ Match'
           else '✗ Mismatch: Expected 3-1 or 1-3'
      end
    -- Titans vs Panthers 1-2 (Image 3)
    when (ht.name = 'Titans' and at.name = 'Panthers') or (ht.name = 'Panthers' and at.name = 'Titans') then
      case when (m.home_score = 1 and m.away_score = 2) or (m.home_score = 2 and m.away_score = 1) then '✓ Match'
           else '✗ Mismatch: Expected 1-2 or 2-1'
      end
    -- Club de Shege vs Losti City 0-1 (Image 3)
    when (ht.name = 'Club de Shege' and at.name = 'Losti City') or (ht.name = 'Losti City' and at.name = 'Club de Shege') then
      case when (m.home_score = 0 and m.away_score = 1) or (m.home_score = 1 and m.away_score = 0) then '✓ Match'
           else '✗ Mismatch: Expected 0-1 or 1-0'
      end
    -- Ronavics vs Raptors 5-0 (Image 3)
    when (ht.name = 'Ronavics' and at.name = 'Raptors') or (ht.name = 'Raptors' and at.name = 'Ronavics') then
      case when (m.home_score = 5 and m.away_score = 0) or (m.home_score = 0 and m.away_score = 5) then '✓ Match'
           else '✗ Mismatch: Expected 5-0 or 0-5'
      end
    -- Finest Brothers vs COVID Boys 2-1 (Image 3)
    when (ht.name = 'Finest Brothers' and at.name = 'COVID Boys') or (ht.name = 'COVID Boys' and at.name = 'Finest Brothers') then
      case when (m.home_score = 2 and m.away_score = 1) or (m.home_score = 1 and m.away_score = 2) then '✓ Match'
           else '✗ Mismatch: Expected 2-1 or 1-2'
      end
    -- Top Bins vs Super Strikers 1-4 (Image 4)
    when (ht.name = 'Top Bins' and at.name = 'Super Strikers') or (ht.name = 'Super Strikers' and at.name = 'Top Bins') then
      case when (m.home_score = 1 and m.away_score = 4) or (m.home_score = 4 and m.away_score = 1) then '✓ Match'
           else '✗ Mismatch: Expected 1-4 or 4-1'
      end
    -- Godfathers vs COVID Boys 1-3 (Image 4)
    when (ht.name = 'Godfathers' and at.name = 'COVID Boys') or (ht.name = 'COVID Boys' and at.name = 'Godfathers') then
      case when (m.home_score = 1 and m.away_score = 3) or (m.home_score = 3 and m.away_score = 1) then '✓ Match'
           else '✗ Mismatch: Expected 1-3 or 3-1'
      end
    -- The Villagers vs Legends 9-1 (Image 4)
    when (ht.name = 'The Villagers' and at.name = 'Legends') or (ht.name = 'Legends' and at.name = 'The Villagers') then
      case when (m.home_score = 9 and m.away_score = 1) or (m.home_score = 1 and m.away_score = 9) then '✓ Match'
           else '✗ Mismatch: Expected 9-1 or 1-9'
      end
    -- Godfathers vs Top Bins 0-0 (Image 4)
    when (ht.name = 'Godfathers' and at.name = 'Top Bins') or (ht.name = 'Top Bins' and at.name = 'Godfathers') then
      case when m.home_score = 0 and m.away_score = 0 then '✓ Match'
           else '✗ Mismatch: Expected 0-0'
      end
    -- Super Strikers vs Brotherhood 3-1 (Image 4)
    when ((ht.name = 'Super Strikers' and (at.name = 'Brotherhood' or at.name = 'The Brotherhood')) or 
          ((ht.name = 'Brotherhood' or ht.name = 'The Brotherhood') and at.name = 'Super Strikers')) then
      case when (m.home_score = 3 and m.away_score = 1) or (m.home_score = 1 and m.away_score = 3) then '✓ Match'
           else '✗ Mismatch: Expected 3-1 or 1-3'
      end
    -- Losti City vs Legends 6-1 (Image 4)
    when (ht.name = 'Losti City' and at.name = 'Legends') or (ht.name = 'Legends' and at.name = 'Losti City') then
      case when (m.home_score = 6 and m.away_score = 1) or (m.home_score = 1 and m.away_score = 6) then '✓ Match'
           else '✗ Mismatch: Expected 6-1 or 1-6'
      end
    -- The Villagers vs Panthers 2-0 (Image 4)
    when (ht.name = 'The Villagers' and at.name = 'Panthers') or (ht.name = 'Panthers' and at.name = 'The Villagers') then
      case when (m.home_score = 2 and m.away_score = 0) or (m.home_score = 0 and m.away_score = 2) then '✓ Match'
           else '✗ Mismatch: Expected 2-0 or 0-2'
      end
    -- Super Strikers vs Titans 3-1 (from JSON, not in images shown)
    when (ht.name = 'Super Strikers' and at.name = 'Titans') or (ht.name = 'Titans' and at.name = 'Super Strikers') then
      case when (m.home_score = 3 and m.away_score = 1) or (m.home_score = 1 and m.away_score = 3) then '✓ Match (JSON only)'
           else '✗ Mismatch'
      end
    else '? Not in handwritten images'
  end as verification_status
from public.matches m
join public.teams ht on m.home_team_id = ht.id
join public.teams at on m.away_team_id = at.id
where m.match_day = 1
  and m.match_date = '2025-11-16'
  and m.is_completed = true
order by m.match_time, m.venue;

-- Summary of verification
select 
  count(*) filter (where verification_status like '✓%') as matches_verified,
  count(*) filter (where verification_status like '✗%') as matches_mismatched,
  count(*) filter (where verification_status = '? Not in handwritten images') as matches_not_in_images,
  count(*) as total_completed_matches
from (
  select 
    m.id,
    case 
      when (ht.name = 'Titans' and at.name = 'Super Strikers') or (ht.name = 'Super Strikers' and at.name = 'Titans') then
        case when (m.home_score = 1 and m.away_score = 3) or (m.home_score = 3 and m.away_score = 1) then '✓ Match' else '✗ Mismatch' end
      when (ht.name = 'Godfathers' and at.name = 'Raptors') or (ht.name = 'Raptors' and at.name = 'Godfathers') then
        case when m.home_score = 0 and m.away_score = 0 then '✓ Match' else '✗ Mismatch' end
      when ((ht.name = 'Brotherhood' or ht.name = 'The Brotherhood') and at.name = 'COVID Boys') or 
           (ht.name = 'COVID Boys' and (at.name = 'Brotherhood' or at.name = 'The Brotherhood')) then
        case when (m.home_score = 1 and m.away_score = 2) or (m.home_score = 2 and m.away_score = 1) then '✓ Match' else '✗ Mismatch' end
      when (ht.name = 'Panthers' and at.name = 'Losti City') or (ht.name = 'Losti City' and at.name = 'Panthers') then
        case when (m.home_score = 0 and m.away_score = 5) or (m.home_score = 5 and m.away_score = 0) then '✓ Match' else '✗ Mismatch' end
      when (ht.name = 'Club de Shege' and (at.name = 'Brotherhood' or at.name = 'The Brotherhood')) or 
           ((ht.name = 'Brotherhood' or ht.name = 'The Brotherhood') and at.name = 'Club de Shege') then
        case when (m.home_score = 3 and m.away_score = 0) or (m.home_score = 0 and m.away_score = 3) then '✓ Match' else '✗ Mismatch' end
      when (ht.name = 'Finest Brothers' and at.name = 'Ronavics') or (ht.name = 'Ronavics' and at.name = 'Finest Brothers') then
        case when (m.home_score = 3 and m.away_score = 1) or (m.home_score = 1 and m.away_score = 3) then '✓ Match' else '✗ Mismatch' end
      when (ht.name = 'Titans' and at.name = 'Panthers') or (ht.name = 'Panthers' and at.name = 'Titans') then
        case when (m.home_score = 1 and m.away_score = 2) or (m.home_score = 2 and m.away_score = 1) then '✓ Match' else '✗ Mismatch' end
      when (ht.name = 'Club de Shege' and at.name = 'Losti City') or (ht.name = 'Losti City' and at.name = 'Club de Shege') then
        case when (m.home_score = 0 and m.away_score = 1) or (m.home_score = 1 and m.away_score = 0) then '✓ Match' else '✗ Mismatch' end
      when (ht.name = 'Ronavics' and at.name = 'Raptors') or (ht.name = 'Raptors' and at.name = 'Ronavics') then
        case when (m.home_score = 5 and m.away_score = 0) or (m.home_score = 0 and m.away_score = 5) then '✓ Match' else '✗ Mismatch' end
      when (ht.name = 'Finest Brothers' and at.name = 'COVID Boys') or (ht.name = 'COVID Boys' and at.name = 'Finest Brothers') then
        case when (m.home_score = 2 and m.away_score = 1) or (m.home_score = 1 and m.away_score = 2) then '✓ Match' else '✗ Mismatch' end
      when (ht.name = 'Top Bins' and at.name = 'Super Strikers') or (ht.name = 'Super Strikers' and at.name = 'Top Bins') then
        case when (m.home_score = 1 and m.away_score = 4) or (m.home_score = 4 and m.away_score = 1) then '✓ Match' else '✗ Mismatch' end
      when (ht.name = 'Godfathers' and at.name = 'COVID Boys') or (ht.name = 'COVID Boys' and at.name = 'Godfathers') then
        case when (m.home_score = 1 and m.away_score = 3) or (m.home_score = 3 and m.away_score = 1) then '✓ Match' else '✗ Mismatch' end
      when (ht.name = 'The Villagers' and at.name = 'Legends') or (ht.name = 'Legends' and at.name = 'The Villagers') then
        case when (m.home_score = 9 and m.away_score = 1) or (m.home_score = 1 and m.away_score = 9) then '✓ Match' else '✗ Mismatch' end
      when (ht.name = 'Godfathers' and at.name = 'Top Bins') or (ht.name = 'Top Bins' and at.name = 'Godfathers') then
        case when m.home_score = 0 and m.away_score = 0 then '✓ Match' else '✗ Mismatch' end
      when ((ht.name = 'Super Strikers' and (at.name = 'Brotherhood' or at.name = 'The Brotherhood')) or 
            ((ht.name = 'Brotherhood' or ht.name = 'The Brotherhood') and at.name = 'Super Strikers')) then
        case when (m.home_score = 3 and m.away_score = 1) or (m.home_score = 1 and m.away_score = 3) then '✓ Match' else '✗ Mismatch' end
      when (ht.name = 'Losti City' and at.name = 'Legends') or (ht.name = 'Legends' and at.name = 'Losti City') then
        case when (m.home_score = 6 and m.away_score = 1) or (m.home_score = 1 and m.away_score = 6) then '✓ Match' else '✗ Mismatch' end
      when (ht.name = 'The Villagers' and at.name = 'Panthers') or (ht.name = 'Panthers' and at.name = 'The Villagers') then
        case when (m.home_score = 2 and m.away_score = 0) or (m.home_score = 0 and m.away_score = 2) then '✓ Match' else '✗ Mismatch' end
      when (ht.name = 'Super Strikers' and at.name = 'Titans') or (ht.name = 'Titans' and at.name = 'Super Strikers') then
        case when (m.home_score = 3 and m.away_score = 1) or (m.home_score = 1 and m.away_score = 3) then '✓ Match (JSON only)' else '✗ Mismatch' end
      else '? Not in handwritten images'
    end as verification_status
  from public.matches m
  join public.teams ht on m.home_team_id = ht.id
  join public.teams at on m.away_team_id = at.id
  where m.match_day = 1
    and m.match_date = '2025-11-16'
    and m.is_completed = true
) verification;

