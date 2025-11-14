-- Check the actual structure of match_events table
select 
  column_name,
  data_type,
  is_nullable,
  column_default
from information_schema.columns
where table_schema = 'public' 
  and table_name = 'match_events'
order by ordinal_position;

-- Delete the bad data with wrong types
delete from public.match_events
where team_id::text not similar to '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
   or event_type not in ('goal', 'assist')
   or description is null
   or description::text = 'true'
   or description::text = 'false';

-- Verify clean data
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
limit 10;

