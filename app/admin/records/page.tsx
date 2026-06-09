import Link from 'next/link'
import { Award } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { requireAnyPermission, userHasPermission } from '@/lib/rbac'
import { getSelectedSeason } from '@/lib/seasons'
import { RecordsManager } from '@/components/records/records-manager'

export default async function RecordsPage() {
  const me = await requireAnyPermission(['enter_scores', 'edit_records', 'view_records'])
  const canManage = userHasPermission(me, 'enter_scores') || userHasPermission(me, 'edit_records')
  const supabase = await createClient()

  const season = await getSelectedSeason()

  let matches: any[] = []
  let players: any[] = []
  let motm: any[] = []
  let outstanding: any[] = []

  if (season) {
    const [m, p, mm, o] = await Promise.all([
      supabase
        .from('matches')
        .select('id, match_day, home_team_id, away_team_id, home_score, away_score, home_team:teams!matches_home_team_id_fkey(name), away_team:teams!matches_away_team_id_fkey(name)')
        .eq('season_id', season.id)
        .eq('is_completed', true)
        .order('match_day', { ascending: true }),
      supabase.from('players').select('id, name, team_id').eq('season_id', season.id),
      supabase.from('man_of_the_match').select('match_id, player_id').eq('season_id', season.id),
      supabase
        .from('matchday_outstanding')
        .select('match_day, points, player:players(name)')
        .eq('season_id', season.id)
        .order('match_day', { ascending: true }),
    ])
    matches = m.data ?? []
    players = p.data ?? []
    motm = mm.data ?? []
    outstanding = o.data ?? []
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="">
        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-lg bg-emerald-500 p-2">
            <Award className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Records</h1>
            <p className="text-slate-400 text-sm">{season ? season.name : 'No active season'} · Man of the Match &amp; outstanding players</p>
          </div>
        </div>

        <div className="mb-6">
          <Link href="/admin/scores" className="text-sm text-emerald-400 hover:underline">
            → Enter match scores &amp; goal scorers
          </Link>
        </div>

        <RecordsManager
          seasonId={season?.id ?? null}
          matches={matches}
          players={players}
          motm={motm}
          outstanding={outstanding as any}
          canManage={canManage}
        />
      </div>
    </div>
  )
}
