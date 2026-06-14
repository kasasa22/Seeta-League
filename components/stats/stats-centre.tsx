'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Target,
  Users,
  ShieldCheck,
  Goal,
  TrendingUp,
  BarChart3,
  Zap,
  Award,
  Sparkles,
  GitCompare,
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type {
  FormResult,
  PlayerCompareRow,
  PlayerStatRow,
  PointsProgression,
  StatsCentreData,
  TeamStatRow,
} from '@/lib/stats'

const teamImages: Record<string, string> = {
  "godfather's": '/teams/godfathers.png',
  titans: '/teams/titans.png',
  'finest brothers': '/teams/finest.png',
  raptors: '/teams/raptors.png',
  'covid boys': '/teams/covid_boys.png',
  'top bins': '/teams/topbins.png',
  'super strikers': '/teams/superstrikers.png',
  'losti city': '/teams/losti_city.png',
  'club de chege': '/teams/club_de_shege.png',
  allies: '/teams/allies.png',
  kawaago: '/teams/kawaago.png',
  panthers: '/teams/panthers.png',
  pundits: '/teams/pundits.png',
  'the villagers': '/teams/villagers.png',
}

function getTeamImage(name: string | null) {
  if (!name) return '/football-team-logo-.jpg'
  return (
    teamImages[name.toLowerCase()] ||
    `/football-team-logo-.jpg?height=40&width=40&query=${encodeURIComponent(name)}+football+logo`
  )
}

function rankClass(rank: number) {
  if (rank === 1) return 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
  if (rank === 2) return 'bg-slate-400/20 text-slate-500 dark:text-slate-300'
  if (rank === 3) return 'bg-amber-700/20 text-amber-700 dark:text-amber-500'
  return 'bg-muted text-muted-foreground'
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function PlayerAvatar({ name, src }: { name: string; src: string | null }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted ring-1 ring-border">
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span className="text-xs font-bold text-muted-foreground">{initials(name)}</span>
      )}
    </div>
  )
}

function useCountUp(target: number, decimals = 0, duration = 900) {
  const [value, setValue] = React.useState(0)
  React.useEffect(() => {
    if (target === 0) {
      setValue(0)
      return
    }
    let raf = 0
    let start: number | null = null
    const step = (ts: number) => {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return value.toFixed(decimals)
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  decimals = 0,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  decimals?: number
  accent: string
}) {
  const display = useCountUp(value, decimals)
  return (
    <Card className="border-accent/30">
      <CardContent className="flex items-center gap-3 p-4">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-black leading-none tabular-nums">{display}</p>
          <p className="mt-1 text-xs font-medium text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

const leaderboardIcons = {
  goals: Target,
  assists: Users,
  involvements: Zap,
  motm: Award,
  outstanding: Sparkles,
} as const

export function PlayerLeaderboard({
  title,
  subtitle,
  iconKey,
  headerClass,
  valueClass,
  unit,
  rows,
  limit,
}: {
  title: string
  subtitle: string
  iconKey: keyof typeof leaderboardIcons
  headerClass: string
  valueClass: string
  unit: string
  rows: PlayerStatRow[]
  limit?: number
}) {
  const Icon = leaderboardIcons[iconKey]
  const data = limit ? rows.slice(0, limit) : rows
  return (
    <Card className="overflow-hidden border-accent/30">
      <CardContent className="p-0">
        <div className={`flex items-center gap-2 p-4 ${headerClass}`}>
          <Icon className="h-5 w-5 text-white" />
          <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-xs text-white/80">{subtitle}</p>
          </div>
        </div>
        <div className="p-2 sm:p-4">
          {data.length === 0 ? (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">No data yet this season.</p>
          ) : (
            <div className="divide-y divide-border/50">
              {data.map((row) => (
                <Link
                  key={row.id}
                  href={`/players/${row.player_id}`}
                  className="flex items-center justify-between rounded-md px-2 py-2.5 transition-colors hover:bg-accent/10"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${rankClass(
                        row.rank
                      )}`}
                    >
                      {row.rank}
                    </div>
                    <PlayerAvatar name={row.player_name} src={row.photo_url} />
                    <div className="min-w-0">
                      <p className="truncate font-semibold">
                        {row.player_name}
                        {row.jersey_number != null && (
                          <span className="ml-1 text-muted-foreground">#{row.jersey_number}</span>
                        )}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">{row.team_name ?? 'Free agent'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-black ${valueClass}`}>{row.value}</p>
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{unit}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function CleanSheetBoard({ rows, limit }: { rows: TeamStatRow[]; limit?: number }) {
  const data = limit ? rows.slice(0, limit) : rows
  return (
    <Card className="overflow-hidden border-accent/30">
      <CardContent className="p-0">
        <div className="flex items-center gap-2 bg-violet-600 p-4">
          <ShieldCheck className="h-5 w-5 text-white" />
          <div>
            <h3 className="text-lg font-bold text-white">Clean Sheets</h3>
            <p className="text-xs text-white/80">Tightest defences this season</p>
          </div>
        </div>
        <div className="p-2 sm:p-4">
          {data.length === 0 ? (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">No clean sheets recorded yet.</p>
          ) : (
            <div className="divide-y divide-border/50">
              {data.map((row) => (
                <Link
                  key={row.team_id}
                  href={`/teams/${row.team_id}`}
                  className="flex items-center justify-between rounded-md px-2 py-2.5 transition-colors hover:bg-accent/10"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${rankClass(
                        row.rank
                      )}`}
                    >
                      {row.rank}
                    </div>
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-md bg-muted">
                      <img src={getTeamImage(row.team_name)} alt={row.team_name} className="h-full w-full object-cover" />
                    </div>
                    <span className="truncate font-semibold">{row.team_name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-violet-600 dark:text-violet-400">{row.clean_sheets}</p>
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">CS</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function TeamStatBoard({
  title,
  subtitle,
  icon: Icon,
  headerClass,
  valueClass,
  unit,
  rows,
  valueKey,
  limit,
}: {
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  headerClass: string
  valueClass: string
  unit: string
  rows: TeamStatRow[]
  valueKey: 'goals_for' | 'goals_against' | 'clean_sheets'
  limit?: number
}) {
  const data = limit ? rows.slice(0, limit) : rows
  return (
    <Card className="overflow-hidden border-accent/30">
      <CardContent className="p-0">
        <div className={`flex items-center gap-2 p-4 ${headerClass}`}>
          <Icon className="h-5 w-5 text-white" />
          <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-xs text-white/80">{subtitle}</p>
          </div>
        </div>
        <div className="p-2 sm:p-4">
          {data.length === 0 ? (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">No team data yet.</p>
          ) : (
            <div className="divide-y divide-border/50">
              {data.map((row) => (
                <Link
                  key={row.team_id}
                  href={`/teams/${row.team_id}`}
                  className="flex items-center justify-between rounded-md px-2 py-2.5 transition-colors hover:bg-accent/10"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${rankClass(
                        row.rank
                      )}`}
                    >
                      {row.rank}
                    </div>
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-md bg-muted">
                      <img src={getTeamImage(row.team_name)} alt={row.team_name} className="h-full w-full object-cover" />
                    </div>
                    <span className="truncate font-semibold">{row.team_name}</span>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-black ${valueClass}`}>{row[valueKey]}</p>
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{unit}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const chartTooltip = {
  contentStyle: {
    background: 'hsl(var(--popover))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '0.5rem',
    fontSize: '12px',
  },
  labelStyle: { color: 'hsl(var(--foreground))', fontWeight: 600 },
}

function GoalsByMatchdayChart({ data }: { data: StatsCentreData['goalsByMatchday'] }) {
  if (data.length === 0) {
    return (
      <Card className="border-accent/30">
        <CardContent className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          Goals per matchday will appear once results are recorded.
        </CardContent>
      </Card>
    )
  }
  const chartData = data.map((d) => ({ name: `MD${d.match_day}`, goals: d.goals }))
  return (
    <Card className="border-accent/30">
      <CardContent className="p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Goal className="h-5 w-5 text-emerald-500" />
          <h3 className="text-lg font-bold">Goals per Matchday</h3>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: 'hsl(var(--accent) / 0.15)' }} {...chartTooltip} />
              <Bar dataKey="goals" radius={[4, 4, 0, 0]} fill="hsl(var(--accent))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

function TeamBarChart({
  title,
  icon: Icon,
  iconClass,
  rows,
  dataKey,
  color,
  unit,
}: {
  title: string
  icon: React.ComponentType<{ className?: string }>
  iconClass: string
  rows: TeamStatRow[]
  dataKey: 'goals_for' | 'goals_against'
  color: string
  unit: string
}) {
  if (rows.length === 0) {
    return (
      <Card className="border-accent/30">
        <CardContent className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          No team data yet.
        </CardContent>
      </Card>
    )
  }
  const chartData = rows.map((r) => ({
    name: r.team_name.length > 10 ? `${r.team_name.slice(0, 10)}…` : r.team_name,
    value: r[dataKey],
  }))
  return (
    <Card className="border-accent/30">
      <CardContent className="p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Icon className={`h-5 w-5 ${iconClass}`} />
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" width={88} tick={{ fontSize: 11, fill: 'hsl(var(--foreground))' }} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: 'hsl(var(--accent) / 0.15)' }} formatter={(v: number) => [v, unit]} {...chartTooltip} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={color} fillOpacity={1 - i * 0.08} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

const formStyles: Record<FormResult, string> = {
  W: 'bg-emerald-500 text-white',
  D: 'bg-slate-400 text-white',
  L: 'bg-rose-500 text-white',
}

function FormPills({ form }: { form: FormResult[] }) {
  if (form.length === 0) {
    return <span className="text-xs text-muted-foreground">No matches yet</span>
  }
  return (
    <div className="flex items-center gap-1">
      {form.map((r, i) => (
        <span
          key={i}
          className={`flex h-6 w-6 items-center justify-center rounded-md text-xs font-black ${formStyles[r]}`}
        >
          {r}
        </span>
      ))}
    </div>
  )
}

function FormGuide({ rows }: { rows: TeamStatRow[] }) {
  return (
    <Card className="overflow-hidden border-accent/30">
      <CardContent className="p-0">
        <div className="flex items-center gap-2 bg-slate-800 p-4">
          <TrendingUp className="h-5 w-5 text-white" />
          <div>
            <h3 className="text-lg font-bold text-white">Form Guide</h3>
            <p className="text-xs text-white/80">Last 5 results — most recent on the right</p>
          </div>
        </div>
        <div className="p-2 sm:p-4">
          {rows.length === 0 ? (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">No teams yet.</p>
          ) : (
            <div className="divide-y divide-border/50">
              {rows.map((row, index) => (
                <Link
                  key={row.team_id}
                  href={`/teams/${row.team_id}`}
                  className="flex items-center justify-between gap-3 rounded-md px-2 py-2.5 transition-colors hover:bg-accent/10"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="w-5 shrink-0 text-center text-sm font-bold text-muted-foreground">{index + 1}</span>
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-md bg-muted">
                      <img src={getTeamImage(row.team_name)} alt={row.team_name} className="h-full w-full object-cover" />
                    </div>
                    <span className="truncate font-semibold">{row.team_name}</span>
                  </div>
                  <FormPills form={row.form} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const LINE_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4']

function PointsProgressionChart({ data }: { data: PointsProgression }) {
  if (data.matchdays.length === 0 || data.series.length === 0) {
    return (
      <Card className="border-accent/30">
        <CardContent className="flex h-72 items-center justify-center text-sm text-muted-foreground">
          Points progression will chart here once matchdays are played.
        </CardContent>
      </Card>
    )
  }
  const chartData = data.matchdays.map((d, i) => {
    const row: Record<string, number | string> = { name: `MD${d}` }
    data.series.forEach((s) => {
      row[s.team_name] = s.points[i]
    })
    return row
  })
  return (
    <Card className="border-accent/30">
      <CardContent className="p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-500" />
          <h3 className="text-lg font-bold">Points Progression</h3>
          <span className="text-xs text-muted-foreground">— top clubs</span>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 4, right: 12, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} />
              <Tooltip {...chartTooltip} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {data.series.map((s, i) => (
                <Line
                  key={s.team_id}
                  type="monotone"
                  dataKey={s.team_name}
                  stroke={LINE_COLORS[i % LINE_COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

const COMPARE_METRICS: { key: keyof Pick<PlayerCompareRow, 'goals' | 'assists' | 'involvements' | 'motm' | 'outstanding'>; label: string }[] = [
  { key: 'goals', label: 'Goals' },
  { key: 'assists', label: 'Assists' },
  { key: 'involvements', label: 'Goal Involvements' },
  { key: 'motm', label: 'Man of the Match' },
  { key: 'outstanding', label: 'Outstanding' },
]

function CompareColumn({ player }: { player: PlayerCompareRow | null }) {
  if (!player) {
    return (
      <div className="flex flex-col items-center gap-2 py-4 text-center text-sm text-muted-foreground">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">?</div>
        <span>Select a player</span>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center gap-2 py-2 text-center">
      <PlayerAvatar name={player.name} src={player.photo_url} />
      <div>
        <p className="font-bold leading-tight">{player.name}</p>
        <p className="text-xs text-muted-foreground">{player.team_name ?? 'Free agent'}</p>
      </div>
    </div>
  )
}

function PlayerComparison({ players }: { players: PlayerCompareRow[] }) {
  const [leftId, setLeftId] = React.useState<string>(players[0]?.id ?? '')
  const [rightId, setRightId] = React.useState<string>(players[1]?.id ?? players[0]?.id ?? '')
  const left = players.find((p) => p.id === leftId) ?? null
  const right = players.find((p) => p.id === rightId) ?? null

  if (players.length === 0) return null

  return (
    <Card className="overflow-hidden border-accent/30">
      <CardContent className="p-0">
        <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-indigo-600 p-4">
          <GitCompare className="h-5 w-5 text-white" />
          <div>
            <h3 className="text-lg font-bold text-white">Player Comparison</h3>
            <p className="text-xs text-white/80">Compare any two players head-to-head</p>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            <div className="space-y-3">
              <Select value={leftId} onValueChange={setLeftId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select player" />
                </SelectTrigger>
                <SelectContent>
                  {players.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <CompareColumn player={left} />
            </div>
            <div className="space-y-3">
              <Select value={rightId} onValueChange={setRightId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select player" />
                </SelectTrigger>
                <SelectContent>
                  {players.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <CompareColumn player={right} />
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {COMPARE_METRICS.map((metric) => {
              const lv = left?.[metric.key] ?? 0
              const rv = right?.[metric.key] ?? 0
              const max = Math.max(lv, rv, 1)
              return (
                <div key={metric.key}>
                  <div className="mb-1 flex items-center justify-between text-xs font-medium">
                    <span className={lv >= rv && lv > 0 ? 'font-black text-emerald-600 dark:text-emerald-400' : ''}>{lv}</span>
                    <span className="text-muted-foreground">{metric.label}</span>
                    <span className={rv >= lv && rv > 0 ? 'font-black text-indigo-600 dark:text-indigo-400' : ''}>{rv}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex h-2 flex-1 justify-end overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(lv / max) * 100}%` }} />
                    </div>
                    <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-indigo-500" style={{ width: `${(rv / max) * 100}%` }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function MatchdayFilter({
  available,
  selected,
}: {
  available: number[]
  selected: number | null
}) {
  const router = useRouter()
  const value = selected ? String(selected) : 'all'
  const disabled = available.length === 0
  const onChange = (v: string) => {
    router.push(v === 'all' ? '/statistics' : `/statistics?md=${v}`, { scroll: false })
  }
  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm font-medium text-muted-foreground sm:inline">View</span>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Overall season</SelectItem>
          {available.map((d) => (
            <SelectItem key={d} value={String(d)}>
              Matchday {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {disabled && (
        <span className="hidden text-xs text-muted-foreground md:inline">No matchdays played yet</span>
      )}
    </div>
  )
}

export function StatsCentre({ data, seasonName }: { data: StatsCentreData; seasonName: string }) {
  const { totals } = data
  const scopeLabel = data.selectedMatchday ? `Matchday ${data.selectedMatchday}` : 'Overall season'
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="clubs">Clubs</TabsTrigger>
        </TabsList>
        <MatchdayFilter available={data.availableMatchdays} selected={data.selectedMatchday} />
      </div>

      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <BarChart3 className="h-4 w-4 text-accent" />
        <span>
          Showing <span className="font-semibold text-foreground">{scopeLabel}</span>
          {' · '}
          {seasonName}
        </span>
      </div>

      <TabsContent value="dashboard" className="space-y-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <SummaryCard icon={BarChart3} label="Matches Played" value={totals.matchesPlayed} accent="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" />
          <SummaryCard icon={Goal} label="Total Goals" value={totals.totalGoals} accent="bg-blue-500/15 text-blue-600 dark:text-blue-400" />
          <SummaryCard icon={TrendingUp} label="Goals / Match" value={totals.goalsPerMatch} decimals={1} accent="bg-amber-500/15 text-amber-600 dark:text-amber-400" />
          <SummaryCard icon={ShieldCheck} label="Clean Sheets" value={totals.cleanSheets} accent="bg-violet-500/15 text-violet-600 dark:text-violet-400" />
        </div>

        <div>
          <h2 className="mb-4 text-lg font-black tracking-tight text-muted-foreground">Top 5 Players</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <PlayerLeaderboard title="Goals" subtitle="Leading scorers" iconKey="goals" headerClass="bg-emerald-500" valueClass="text-emerald-600 dark:text-emerald-400" unit="goals" rows={data.topScorers} limit={5} />
            <PlayerLeaderboard title="Assists" subtitle="Top providers" iconKey="assists" headerClass="bg-blue-500" valueClass="text-blue-600 dark:text-blue-400" unit="assists" rows={data.topAssists} limit={5} />
            <PlayerLeaderboard title="Goal Involvements" subtitle="Goals + assists" iconKey="involvements" headerClass="bg-amber-500" valueClass="text-amber-600 dark:text-amber-400" unit="G+A" rows={data.goalInvolvements} limit={5} />
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-black tracking-tight text-muted-foreground">Top 5 Clubs</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <TeamStatBoard title="Best Attack" subtitle="Most goals scored" icon={Goal} headerClass="bg-emerald-600" valueClass="text-emerald-600 dark:text-emerald-400" unit="for" rows={data.bestAttack} valueKey="goals_for" limit={5} />
            <TeamStatBoard title="Best Defence" subtitle="Fewest conceded" icon={ShieldCheck} headerClass="bg-indigo-600" valueClass="text-indigo-600 dark:text-indigo-400" unit="against" rows={data.bestDefence} valueKey="goals_against" limit={5} />
            <CleanSheetBoard rows={data.cleanSheets} limit={5} />
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-black tracking-tight text-muted-foreground">Recognition</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <PlayerLeaderboard title="Man of the Match" subtitle="Most MOTM awards" iconKey="motm" headerClass="bg-rose-500" valueClass="text-rose-600 dark:text-rose-400" unit="awards" rows={data.motm} limit={5} />
            <PlayerLeaderboard title="Outstanding" subtitle="Matchday standouts" iconKey="outstanding" headerClass="bg-fuchsia-500" valueClass="text-fuchsia-600 dark:text-fuchsia-400" unit="times" rows={data.outstanding} limit={5} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <FormGuide rows={data.formGuide} />
          <GoalsByMatchdayChart data={data.goalsByMatchday} />
        </div>

        <PointsProgressionChart data={data.pointsProgression} />

        <PlayerComparison players={data.comparePlayers} />
      </TabsContent>

      <TabsContent value="players" className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <PlayerLeaderboard title="Top Scorers" subtitle={`Most goals — ${seasonName}`} iconKey="goals" headerClass="bg-emerald-500" valueClass="text-emerald-600 dark:text-emerald-400" unit="goals" rows={data.topScorers} />
          <PlayerLeaderboard title="Top Assists" subtitle={`Most assists — ${seasonName}`} iconKey="assists" headerClass="bg-blue-500" valueClass="text-blue-600 dark:text-blue-400" unit="assists" rows={data.topAssists} />
        </div>
      </TabsContent>

      <TabsContent value="clubs" className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <TeamBarChart title="Best Attack" icon={Goal} iconClass="text-emerald-500" rows={data.bestAttack} dataKey="goals_for" color="hsl(var(--accent))" unit="goals for" />
          <TeamBarChart title="Best Defence" icon={ShieldCheck} iconClass="text-violet-500" rows={data.bestDefence} dataKey="goals_against" color="#8b5cf6" unit="goals against" />
        </div>
        <CleanSheetBoard rows={data.cleanSheets} />
      </TabsContent>
    </Tabs>
  )
}
