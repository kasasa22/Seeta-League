'use client'

import { useState, useTransition } from 'react'
import { Star, Award } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { setManOfTheMatch } from '@/app/admin/records/actions'

interface MatchRow {
  id: string
  match_day: number
  home_team_id: string
  away_team_id: string
  home_score: number | null
  away_score: number | null
  home_team: { name: string } | null
  away_team: { name: string } | null
}
interface PlayerRow { id: string; name: string; team_id: string }
interface MotmRow { match_id: string; player_id: string }
interface OutstandingRow { match_day: number; points: number; player: { name: string } | null }

interface Props {
  seasonId: string | null
  matches: MatchRow[]
  players: PlayerRow[]
  motm: MotmRow[]
  outstanding: OutstandingRow[]
  canManage?: boolean
}

export function RecordsManager({ seasonId, matches, players, motm, outstanding, canManage = true }: Props) {
  const [isPending, startTransition] = useTransition()
  const [picks, setPicks] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {}
    motm.forEach((m) => { init[m.match_id] = m.player_id })
    return init
  })

  const playersFor = (teamA: string, teamB: string) =>
    players.filter((p) => p.team_id === teamA || p.team_id === teamB)

  const save = (matchId: string) =>
    startTransition(async () => {
      const res = await setManOfTheMatch(matchId, picks[matchId] ?? '', seasonId)
      if (res?.ok) toast.success('Man of the Match saved')
    })

  const byDay = outstanding.slice().sort((a, b) => a.match_day - b.match_day)

  return (
    <div className="space-y-6">
      <Card className="border-slate-700 bg-slate-800/50">
        <CardContent className="p-5">
          <h2 className="mb-4 flex items-center gap-2 font-bold text-white">
            <Award className="h-5 w-5 text-amber-400" /> Outstanding Player of the Match Day
          </h2>
          <p className="mb-3 text-xs text-slate-400">Auto-calculated from goals (×2) + assists per match day.</p>
          {byDay.length === 0 ? (
            <p className="text-slate-400 text-sm">No data yet — enter match scorers first.</p>
          ) : (
            <div className="space-y-2">
              {byDay.map((o) => (
                <div key={o.match_day} className="flex items-center justify-between rounded-md bg-slate-700/40 px-3 py-2 text-sm">
                  <span className="text-slate-300">Match Day {o.match_day}</span>
                  <span className="font-semibold text-white">{o.player?.name ?? '—'}</span>
                  <Badge className="bg-amber-500/20 text-amber-400">{o.points} pts</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-slate-700 bg-slate-800/50">
        <CardContent className="p-5">
          <h2 className="mb-4 flex items-center gap-2 font-bold text-white">
            <Star className="h-5 w-5 text-emerald-400" /> Man of the Match
          </h2>
          {matches.length === 0 ? (
            <p className="text-slate-400 text-sm">No completed matches yet.</p>
          ) : (
            <div className="space-y-3">
              {matches.map((m) => {
                const opts = playersFor(m.home_team_id, m.away_team_id)
                return (
                  <div key={m.id} className="rounded-lg bg-slate-700/40 p-3">
                    <p className="text-sm font-semibold text-white">
                      {m.home_team?.name} {m.home_score}–{m.away_score} {m.away_team?.name}
                      <span className="ml-2 text-xs text-slate-400">MD {m.match_day}</span>
                    </p>
                    {canManage ? (
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <select
                          value={picks[m.id] ?? ''}
                          onChange={(e) => setPicks((p) => ({ ...p, [m.id]: e.target.value }))}
                          className="h-9 flex-1 min-w-[180px] rounded-md border border-slate-600 bg-slate-700/50 px-2 text-sm text-white"
                        >
                          <option value="">— No MOTM —</option>
                          {opts.map((pl) => (
                            <option key={pl.id} value={pl.id}>{pl.name}</option>
                          ))}
                        </select>
                        <Button size="sm" onClick={() => save(m.id)} disabled={isPending} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                          Save
                        </Button>
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-slate-300">
                        Man of the Match: <span className="font-semibold text-white">{opts.find((pl) => pl.id === picks[m.id])?.name ?? '—'}</span>
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
