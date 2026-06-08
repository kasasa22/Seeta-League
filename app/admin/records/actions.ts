'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requireAnyPermission } from '@/lib/rbac'

export async function setManOfTheMatch(matchId: string, playerId: string, seasonId: string | null) {
  await requireAnyPermission(['enter_scores', 'edit_records'])
  const supabase = await createClient()

  if (!playerId) {
    await supabase.from('man_of_the_match').delete().eq('match_id', matchId)
  } else {
    await supabase
      .from('man_of_the_match')
      .upsert({ match_id: matchId, player_id: playerId, season_id: seasonId }, { onConflict: 'match_id' })
  }
  revalidatePath('/admin/records')
  return { ok: true }
}
