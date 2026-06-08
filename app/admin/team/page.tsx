import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { requirePermission } from '@/lib/rbac'
import { CaptainPortal } from '@/components/captain/captain-portal'

export default async function CaptainTeamPage() {
  const user = await requirePermission('register_team')
  const supabase = await createClient()

  const { data: season } = await supabase
    .from('seasons')
    .select('id, name, registration_deadline, kickoff_date, venue')
    .eq('is_current', true)
    .maybeSingle()

  let team = null
  let players: any[] = []

  if (season) {
    const { data: t } = await supabase
      .from('teams')
      .select('*')
      .eq('captain_id', user.id)
      .eq('season_id', season.id)
      .maybeSingle()
    team = t

    if (team) {
      const { data: p } = await supabase
        .from('players')
        .select('*')
        .eq('team_id', team.id)
        .order('jersey_number', { ascending: true, nullsFirst: false })
      players = p ?? []
    }
  }

  const deadlinePassed = season?.registration_deadline
    ? new Date() > new Date(season.registration_deadline)
    : false

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-4 sm:p-6 pt-20">
      <div className="mx-auto max-w-4xl">
        <Link href="/admin" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Admin
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-lg bg-emerald-500 p-2">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">My Team</h1>
            <p className="text-slate-400 text-sm">{season ? season.name : 'No active season'}</p>
          </div>
        </div>

        {season ? (
          <CaptainPortal
            season={season}
            team={team}
            players={players}
            deadlinePassed={deadlinePassed}
          />
        ) : (
          <p className="text-slate-400">There is no active season open for registration yet.</p>
        )}
      </div>
    </div>
  )
}
