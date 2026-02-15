-- Comparison of handwritten results vs JSON data
-- This script identifies and fixes discrepancies

-- DISCREPANCIES FOUND:

-- 1. Titans vs Super Strikers (Image 1 - Pitch B)
--    Handwritten: Titans 1 vs Super Strikers 3
--    JSON: Titans 1 vs Panthers 2 (match_id: 3470687c-cdf8-4e74-9385-395f4bca15c8)
--    NOTE: This appears to be a different match - Titans vs Panthers in JSON

-- 2. Godfathers vs Raptors (Image 2 - Pitch B)
--    Handwritten: Godfathers 0 vs Raptors 0
--    JSON: Godfathers 3 vs Raptors 1 (match_id: 711ced78-a84e-4cd4-b82c-9dd3ccb693a8)
--    ACTION: Update to 0-0 (already done in 019_edit_match_score.sql)

-- 3. Brotherhood vs COVID Boys (Image 2 - Pitch B)
--    Handwritten: Brotherhood 1 vs COVID Boys 2
--    JSON: COVID Boys 2 vs Brotherhood 1 (match_id: 51e6138c-c264-43df-9254-be82711bd51a)
--    NOTE: Teams reversed (home/away), but scores match - VERIFY

-- 4. Panthers vs Losti City (Image 2 - Pitch B)
--    Handwritten: Panthers 0 vs Losti City 5
--    JSON: Panthers 0 vs Losti City 5 (match_id: cb8588de-2e41-48bc-8735-642062c08229)
--    STATUS: MATCHES ✓

-- 5. Club de Shege vs Brotherhood (Image 3 - Pitch A)
--    Handwritten: Club de Shege 3 vs Brotherhood 0
--    JSON: Club de Shege 3 vs Brotherhood 0 (match_id: 975f0899-bf28-45a3-86be-a854579e7f71)
--    STATUS: MATCHES ✓

-- 6. Finest Brothers vs Ronavics (Image 3 - Pitch A)
--    Handwritten: Finest Brothers 3 vs Ronavics 1
--    JSON: Finest Brothers 3 vs Ronavics 1 (match_id: 82e91af0-0f3b-4fb2-a007-ac3f5f41071b)
--    STATUS: MATCHES ✓

-- 7. Titans vs Panthers (Image 3 - Pitch A)
--    Handwritten: Titans 1 vs Panthers 2
--    JSON: Titans 1 vs Panthers 2 (match_id: 3470687c-cdf8-4e74-9385-395f4bca15c8)
--    STATUS: MATCHES ✓

-- 8. Club de Shege vs Losti City (Image 3 - Pitch A)
--    Handwritten: Club de Shege 0 vs Losti City 1
--    JSON: Club de Shege 0 vs Losti City 1 (match_id: e06515ae-a571-43b7-8577-a81e6be0910c)
--    STATUS: MATCHES ✓

-- 9. Ronavics vs Raptors (Image 3 - Pitch A)
--    Handwritten: Ronavics 5 vs Raptors 0
--    JSON: Ronavics 5 vs Raptors 0 (match_id: 8195ba44-cb61-4a06-b2a4-3e339f1e7a90)
--    STATUS: MATCHES ✓

-- 10. Finest Brothers vs COVID Boys (Image 3 - Pitch A)
--     Handwritten: Finest Brothers 2 vs COVID Boys 1
--     JSON: Finest Brothers 2 vs COVID Boys 1 (match_id: 5a014246-a7c6-4411-9a2c-479b26108510)
--     STATUS: MATCHES ✓

-- 11. Top Bins vs Super Strikers (Image 4 - Pitch B)
--     Handwritten: Top Bins 1 vs Super Strikers 4
--     JSON: Top Bins 1 vs Super Strikers 4 (match_id: 841dca51-d983-4571-b625-f35013a41726)
--     STATUS: MATCHES ✓

-- 12. Godfathers vs COVID Boys (Image 4 - Pitch B)
--     Handwritten: Godfathers 1 vs COVID Boys 3
--     JSON: Godfathers 1 vs COVID Boys 3 (match_id: e39f7e38-1621-4aea-93ff-67caa2ed10c9)
--     STATUS: MATCHES ✓

-- 13. The Villagers vs Legends (Image 4 - Pitch B)
--     Handwritten: The Villagers 9 vs Legends 1
--     JSON: The Villagers 9 vs Raptors 1 (match_id: c2a22498-75ac-42f6-85bd-06ab1bbb881a)
--     DISCREPANCY: Away team is Raptors in JSON, but Legends in handwritten
--     NOTE: Need to verify which is correct

-- 14. Godfathers vs Top Bins (Image 4 - Pitch B)
--     Handwritten: Godfathers 0 vs Top Bins 0
--     JSON: Godfathers 0 vs Top Bins 0 (match_id: e69b42a8-a158-4a52-af41-6d84f1145db6)
--     STATUS: MATCHES ✓

-- 15. Super Strikers vs Brotherhood (Image 4 - Pitch B)
--     Handwritten: Super Strikers 3 vs Brotherhood 1
--     JSON: Super Strikers vs Brotherhood (null scores, not completed)
--     DISCREPANCY: Scores missing in JSON, should be 3-1
--     ACTION NEEDED: Update match_id: e5ba9258-e28c-4277-92a3-bde673a52590

-- 16. Losti City vs Legends (Image 4 - Pitch B)
--     Handwritten: Losti City 6 vs Legends 1
--     JSON: Legends 1 vs Losti City 6 (match_id: 082a274d-cb0f-42ef-8c6b-22d47a337c45)
--     NOTE: Teams reversed (home/away), but scores match - VERIFY

-- 17. The Villagers vs Panthers (Image 4 - Pitch B)
--     Handwritten: The Villagers 2 vs Panthers 0
--     JSON: The Villagers 2 vs Panthers 0 (match_id: d103a6dc-5f2e-4500-9845-aa2573197c61)
--     STATUS: MATCHES ✓

-- FIXES NEEDED:

-- Fix 1: Update Super Strikers vs Brotherhood scores
update public.matches
set 
  home_score = 3,
  away_score = 1,
  is_completed = true
where id = 'e5ba9258-e28c-4277-92a3-bde673a52590';

-- Verify all fixes
select 
  m.id,
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
where m.id in (
  '711ced78-a84e-4cd4-b82c-9dd3ccb693a8',
  'e5ba9258-e28c-4277-92a3-bde673a52590'
)
order by m.match_date, m.match_time;

