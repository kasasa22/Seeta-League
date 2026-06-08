import Link from 'next/link'
import { ArrowLeft, Eye, Users, UserCircle, Wallet, MessagesSquare, Trophy } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { requireAnyPermission } from '@/lib/rbac'
import { Card, CardContent } from '@/components/ui/card'

const ugx = (n: number) => 'UGX ' + new Intl.NumberFormat('en-US').format(n)

export default async function OverviewPage() {
  await requireAnyPermission(['view_all'])
  const supabase = await createClient()

  const { data: season } = await supabase
    .from('seasons')
    .select('id, name')
    .eq('is_current', true)
    .maybeSingle()

  const sid = season?.id ?? null
  const seasonEq = <T,>(q: T): T => (sid ? (q as any).eq('season_id', sid) : q)

  const [{ count: teamCount }, { count: playerCount }, { data: standings }, { data: finance }, { count: messageCount }] =
    await Promise.all([
      seasonEq(supabase.from('teams').select('id', { count: 'exact', head: true })),
      seasonEq(supabase.from('players').select('id', { count: 'exact', head: true })),
      seasonEq(supabase.from('league_standings').select('team_name, played, points').order('points', { ascending: false }).limit(5)),
      seasonEq(supabase.from('finance_records').select('type, amount')),
      seasonEq(supabase.from('messages').select('id', { count: 'exact', head: true })),
    ])

  const paid = (finance ?? []).filter((r: any) => r.type === 'payment').reduce((s: number, r: any) => s + Number(r.amount), 0)
  const spent = (finance ?? []).filter((r: any) => r.type === 'expense').reduce((s: number, r: any) => s + Number(r.amount), 0)

  const stats = [
    { label: 'Teams', value: teamCount ?? 0, icon: Users },
    { label: 'Players', value: playerCount ?? 0, icon: UserCircle },
    { label: 'Collected', value: ugx(paid), icon: Wallet },
    { label: 'Expenses', value: ugx(spent), icon: Wallet },
    { label: 'Messages', value: messageCount ?? 0, icon: MessagesSquare },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-4 sm:p-6 pt-20">
      <div className="mx-auto max-w-5xl">
        <Link href="/admin" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Admin
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-lg bg-emerald-500 p-2">
            <Eye className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">President Overview</h1>
            <p className="text-slate-400 text-sm">{season ? season.name : 'No active season'} · read-only</p>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-6">
          {stats.map((s) => (
            <Card key={s.label} className="border-slate-700 bg-slate-800/50">
              <CardContent className="p-4">
                <s.icon className="h-5 w-5 text-emerald-400 mb-2" />
                <p className="text-xs text-slate-400">{s.label}</p>
                <p className="text-lg font-black text-white">{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-slate-700 bg-slate-800/50">
          <CardContent className="p-5">
            <h2 className="mb-4 flex items-center gap-2 font-bold text-white">
              <Trophy className="h-5 w-5 text-amber-400" /> Top of the table
            </h2>
            {standings && standings.length > 0 ? (
              <div className="space-y-2">
                {standings.map((t: any, i: number) => (
                  <div key={i} className="flex items-center justify-between rounded-md bg-slate-700/40 px-3 py-2 text-sm">
                    <span className="text-white">{i + 1}. {t.team_name}</span>
                    <span className="text-slate-300">{t.played} played · <span className="font-bold text-emerald-400">{t.points} pts</span></span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm">No standings yet for this season.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
