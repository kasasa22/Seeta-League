-- Verify fixtures are correct (team matchups)
-- This checks that the right teams are playing each other, ignoring home/away order

-- Show all fixtures with both team names (sorted alphabetically for comparison)
select 
  m.id as match_id,
  m.match_day,
  m.match_date,
  m.match_time,
  m.venue,
  case 
    when ht.name < at.name then ht.name || ' vs ' || at.name
    else at.name || ' vs ' || ht.name
  end as teams_matchup,
  ht.name as home_team,
  at.name as away_team,
  m.home_score,
  m.away_score,
  m.is_completed
from public.matches m
join public.teams ht on m.home_team_id = ht.id
join public.teams at on m.away_team_id = at.id
where m.match_day = 1
  and m.match_date = '2025-11-16'
order by m.match_time, m.venue;

-- Check for duplicate matchups (same teams playing twice on same day)
select 
  case 
    when ht1.name < at1.name then ht1.name || ' vs ' || at1.name
    else at1.name || ' vs ' || ht1.name
  end as teams_matchup,
  count(*) as occurrence_count,
  string_agg(m1.match_time::text || ' ' || m1.venue, ', ' order by m1.match_time) as times_and_venues
from public.matches m1
join public.teams ht1 on m1.home_team_id = ht1.id
join public.teams at1 on m1.away_team_id = at1.id
where m1.match_day = 1
  and m1.match_date = '2025-11-16'
group by 
  case 
    when ht1.name < at1.name then ht1.name || ' vs ' || at1.name
    else at1.name || ' vs ' || ht1.name
  end
having count(*) > 1
order by occurrence_count desc;

-- Summary: Total unique team matchups
select 
  count(distinct 
    case 
      when ht.name < at.name then ht.name || '|' || at.name
      else at.name || '|' || ht.name
    end
  ) as unique_matchups,
  count(*) as total_matches
from public.matches m
join public.teams ht on m.home_team_id = ht.id
join public.teams at on m.away_team_id = at.id
where m.match_day = 1
  and m.match_date = '2025-11-16';

