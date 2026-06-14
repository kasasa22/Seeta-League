import { createClient } from "@/lib/supabase/server"

export type FormResult = "W" | "D" | "L"

export interface PlayerStatRow {
  id: string
  player_id: string
  player_name: string
  jersey_number: number | null
  photo_url: string | null
  team_id: string | null
  team_name: string | null
  value: number
  rank: number
}

export interface TeamStatRow {
  team_id: string
  team_name: string
  played: number
  goals_for: number
  goals_against: number
  goal_difference: number
  points: number
  clean_sheets: number
  form: FormResult[]
  rank: number
}

export interface MatchdayGoals {
  match_day: number
  goals: number
  matches: number
}

export interface PointsProgression {
  matchdays: number[]
  series: { team_id: string; team_name: string; points: number[] }[]
}

export interface PlayerCompareRow {
  id: string
  name: string
  photo_url: string | null
  team_name: string | null
  goals: number
  assists: number
  involvements: number
  motm: number
  outstanding: number
}

export interface StatsCentreData {
  topScorers: PlayerStatRow[]
  topAssists: PlayerStatRow[]
  goalInvolvements: PlayerStatRow[]
  motm: PlayerStatRow[]
  outstanding: PlayerStatRow[]
  cleanSheets: TeamStatRow[]
  bestAttack: TeamStatRow[]
  bestDefence: TeamStatRow[]
  formGuide: TeamStatRow[]
  goalsByMatchday: MatchdayGoals[]
  pointsProgression: PointsProgression
  comparePlayers: PlayerCompareRow[]
  availableMatchdays: number[]
  selectedMatchday: number | null
  totals: {
    teams: number
    players: number
    matchesPlayed: number
    totalGoals: number
    totalAssists: number
    goalsPerMatch: number
    cleanSheets: number
  }
}

function rankPlayers(rows: PlayerStatRow[]): PlayerStatRow[] {
  const sorted = [...rows].sort((a, b) =>
    b.value !== a.value ? b.value - a.value : a.player_name.localeCompare(b.player_name)
  )
  let rank = 0
  let prev: number | null = null
  sorted.forEach((row, i) => {
    if (prev === null || row.value !== prev) {
      rank = i + 1
      prev = row.value
    }
    row.rank = rank
  })
  return sorted
}

function rankTeams(
  rows: TeamStatRow[],
  getValue: (t: TeamStatRow) => number,
  dir: "desc" | "asc" = "desc"
): TeamStatRow[] {
  const sorted = [...rows].sort((a, b) => {
    const diff = getValue(a) - getValue(b)
    const primary = dir === "desc" ? -diff : diff
    return primary !== 0 ? primary : a.team_name.localeCompare(b.team_name)
  })
  let rank = 0
  let prev: number | null = null
  sorted.forEach((row, i) => {
    const v = getValue(row)
    if (prev === null || v !== prev) {
      rank = i + 1
      prev = v
    }
    row.rank = rank
  })
  return sorted
}

const pointsFor = (r: FormResult) => (r === "W" ? 3 : r === "D" ? 1 : 0)

export async function getStatsCentreData(
  seasonId: string | null,
  matchDay: number | null = null
): Promise<StatsCentreData> {
  const supabase = await createClient()
  const withSeason = (q: any) => (seasonId ? q.eq("season_id", seasonId) : q)

  // Base rosters — every real player and team, so 0-stat entries still show.
  let players: any[] = []
  try {
    const { data } = await withSeason(
      supabase
        .from("players")
        .select("id, name, jersey_number, photo_url, team_id, team:teams(id, name)")
        .order("name", { ascending: true })
    )
    players = data ?? []
  } catch {}

  let teams: any[] = []
  try {
    let teamsQuery = supabase.from("teams").select("id, name").eq("is_active", true)
    if (seasonId) teamsQuery = teamsQuery.eq("season_id", seasonId)
    const { data } = await teamsQuery.order("name", { ascending: true })
    teams = data ?? []
  } catch {}

  // Completed matches — power matchday list, team aggregates, form and progression.
  let matches: any[] = []
  try {
    const { data } = await withSeason(
      supabase
        .from("matches")
        .select("id, home_team_id, away_team_id, home_score, away_score, match_day, match_date")
        .eq("is_completed", true)
    )
    matches = data ?? []
  } catch {}

  const availableMatchdays = Array.from(
    new Set(matches.map((m) => Number(m.match_day) || 0).filter((d) => d > 0))
  ).sort((a, b) => a - b)
  const selectedMatchday = matchDay && availableMatchdays.includes(matchDay) ? matchDay : null

  const matchById = new Map<string, any>()
  for (const m of matches) matchById.set(m.id, m)
  const inScope = (matchId: string) => {
    if (!selectedMatchday) return true
    return (Number(matchById.get(matchId)?.match_day) || 0) === selectedMatchday
  }
  const scopedMatches = selectedMatchday
    ? matches.filter((m) => Number(m.match_day) === selectedMatchday)
    : matches

  // Per-player goals/assists from raw events (scoped to the selected matchday).
  const goalsByPlayer = new Map<string, number>()
  const assistsByPlayer = new Map<string, number>()
  try {
    const { data } = await withSeason(supabase.from("match_events").select("player_id, event_type, match_id"))
    for (const e of data ?? []) {
      if (!inScope(e.match_id)) continue
      if (e.event_type === "goal") goalsByPlayer.set(e.player_id, (goalsByPlayer.get(e.player_id) ?? 0) + 1)
      else if (e.event_type === "assist")
        assistsByPlayer.set(e.player_id, (assistsByPlayer.get(e.player_id) ?? 0) + 1)
    }
  } catch {}

  const motmByPlayer = new Map<string, number>()
  try {
    const { data } = await withSeason(supabase.from("man_of_the_match").select("player_id, match_id"))
    for (const r of data ?? []) {
      if (!inScope(r.match_id)) continue
      motmByPlayer.set(r.player_id, (motmByPlayer.get(r.player_id) ?? 0) + 1)
    }
  } catch {}

  const outstandingByPlayer = new Map<string, number>()
  try {
    const { data } = await withSeason(supabase.from("matchday_outstanding").select("player_id, match_day"))
    for (const r of data ?? []) {
      if (selectedMatchday && Number(r.match_day) !== selectedMatchday) continue
      outstandingByPlayer.set(r.player_id, (outstandingByPlayer.get(r.player_id) ?? 0) + 1)
    }
  } catch {}

  // Team aggregates for the selected scope (goals for/against, clean sheets).
  const scoped = new Map<string, { played: number; gf: number; ga: number; cs: number; points: number }>()
  const ensureScoped = (id: string) => {
    if (!scoped.has(id)) scoped.set(id, { played: 0, gf: 0, ga: 0, cs: 0, points: 0 })
    return scoped.get(id)!
  }
  let totalGoals = 0
  for (const m of scopedMatches) {
    const home = Number(m.home_score) || 0
    const away = Number(m.away_score) || 0
    totalGoals += home + away
    const homeRes: FormResult = home > away ? "W" : home < away ? "L" : "D"
    const awayRes: FormResult = away > home ? "W" : away < home ? "L" : "D"
    if (m.home_team_id) {
      const a = ensureScoped(m.home_team_id)
      a.played++
      a.gf += home
      a.ga += away
      if (away === 0) a.cs++
      a.points += pointsFor(homeRes)
    }
    if (m.away_team_id) {
      const a = ensureScoped(m.away_team_id)
      a.played++
      a.gf += away
      a.ga += home
      if (home === 0) a.cs++
      a.points += pointsFor(awayRes)
    }
  }

  // Overall (season-wide) team data for form guide and points progression.
  const overall = new Map<
    string,
    { points: number; gf: number; ga: number; cs: number; form: { day: number; date: string | null; result: FormResult }[] }
  >()
  const ensureOverall = (id: string) => {
    if (!overall.has(id)) overall.set(id, { points: 0, gf: 0, ga: 0, cs: 0, form: [] })
    return overall.get(id)!
  }
  const pointsByTeamDay = new Map<string, Map<number, number>>()
  const matchdayMap = new Map<number, { goals: number; matches: number }>()
  const award = (teamId: string, day: number, pts: number) => {
    if (!pointsByTeamDay.has(teamId)) pointsByTeamDay.set(teamId, new Map())
    const m = pointsByTeamDay.get(teamId)!
    m.set(day, (m.get(day) ?? 0) + pts)
  }
  for (const m of matches) {
    const home = Number(m.home_score) || 0
    const away = Number(m.away_score) || 0
    const day = Number(m.match_day) || 0
    const date = m.match_date ?? null
    if (day > 0) {
      const entry = matchdayMap.get(day) ?? { goals: 0, matches: 0 }
      entry.goals += home + away
      entry.matches += 1
      matchdayMap.set(day, entry)
    }
    const homeRes: FormResult = home > away ? "W" : home < away ? "L" : "D"
    const awayRes: FormResult = away > home ? "W" : away < home ? "L" : "D"
    if (m.home_team_id) {
      const a = ensureOverall(m.home_team_id)
      a.points += pointsFor(homeRes)
      a.gf += home
      a.ga += away
      if (away === 0) a.cs++
      a.form.push({ day, date, result: homeRes })
      if (day > 0) award(m.home_team_id, day, pointsFor(homeRes))
    }
    if (m.away_team_id) {
      const a = ensureOverall(m.away_team_id)
      a.points += pointsFor(awayRes)
      a.gf += away
      a.ga += home
      if (home === 0) a.cs++
      a.form.push({ day, date, result: awayRes })
      if (day > 0) award(m.away_team_id, day, pointsFor(awayRes))
    }
  }

  // Player leaderboards from the full roster.
  const makePlayerRow = (p: any, value: number): PlayerStatRow => ({
    id: p.id,
    player_id: p.id,
    player_name: p.name,
    jersey_number: p.jersey_number ?? null,
    photo_url: p.photo_url ?? null,
    team_id: p.team?.id ?? p.team_id ?? null,
    team_name: p.team?.name ?? null,
    value,
    rank: 0,
  })

  const topScorers = rankPlayers(players.map((p) => makePlayerRow(p, goalsByPlayer.get(p.id) ?? 0))).slice(0, 15)
  const topAssists = rankPlayers(players.map((p) => makePlayerRow(p, assistsByPlayer.get(p.id) ?? 0))).slice(0, 15)
  const goalInvolvements = rankPlayers(
    players.map((p) => makePlayerRow(p, (goalsByPlayer.get(p.id) ?? 0) + (assistsByPlayer.get(p.id) ?? 0)))
  ).slice(0, 15)
  const motm = rankPlayers(players.map((p) => makePlayerRow(p, motmByPlayer.get(p.id) ?? 0))).slice(0, 15)
  const outstanding = rankPlayers(
    players.map((p) => makePlayerRow(p, outstandingByPlayer.get(p.id) ?? 0))
  ).slice(0, 15)

  const comparePlayers: PlayerCompareRow[] = players
    .map((p) => {
      const goals = goalsByPlayer.get(p.id) ?? 0
      const assists = assistsByPlayer.get(p.id) ?? 0
      return {
        id: p.id,
        name: p.name,
        photo_url: p.photo_url ?? null,
        team_name: p.team?.name ?? null,
        goals,
        assists,
        involvements: goals + assists,
        motm: motmByPlayer.get(p.id) ?? 0,
        outstanding: outstandingByPlayer.get(p.id) ?? 0,
      }
    })
    .sort((a, b) => b.involvements - a.involvements || a.name.localeCompare(b.name))

  // Scoped team boards (best attack / defence / clean sheets).
  const scopedTeamRows: TeamStatRow[] = teams.map((t) => {
    const s = scoped.get(t.id)
    const gf = s?.gf ?? 0
    const ga = s?.ga ?? 0
    return {
      team_id: t.id,
      team_name: t.name,
      played: s?.played ?? 0,
      goals_for: gf,
      goals_against: ga,
      goal_difference: gf - ga,
      points: s?.points ?? 0,
      clean_sheets: s?.cs ?? 0,
      form: [],
      rank: 0,
    }
  })
  const cleanSheets = rankTeams(scopedTeamRows, (t) => t.clean_sheets, "desc")
  const bestAttack = rankTeams(scopedTeamRows, (t) => t.goals_for, "desc").slice(0, 10)
  const bestDefence = rankTeams(scopedTeamRows, (t) => t.goals_against, "asc").slice(0, 10)

  // Overall form guide (always season-wide — form is a recent-trend view).
  const formGuide: TeamStatRow[] = teams
    .map((t) => {
      const o = overall.get(t.id)
      const fixtures = (o?.form ?? [])
        .slice()
        .sort((a, b) => (a.date ?? "").localeCompare(b.date ?? "") || a.day - b.day)
      const gf = o?.gf ?? 0
      const ga = o?.ga ?? 0
      return {
        team_id: t.id,
        team_name: t.name,
        played: fixtures.length,
        goals_for: gf,
        goals_against: ga,
        goal_difference: gf - ga,
        points: o?.points ?? 0,
        clean_sheets: o?.cs ?? 0,
        form: fixtures.slice(-5).map((f) => f.result),
        rank: 0,
      }
    })
    .sort(
      (a, b) => b.points - a.points || b.goal_difference - a.goal_difference || a.team_name.localeCompare(b.team_name)
    )

  // Cumulative points progression for the top clubs (always season-wide).
  const allMatchdays = Array.from(matchdayMap.keys()).sort((a, b) => a - b)
  const progressionSeries = teams
    .map((t) => {
      const dayMap = pointsByTeamDay.get(t.id)
      let running = 0
      const points = allMatchdays.map((d) => {
        running += dayMap?.get(d) ?? 0
        return running
      })
      return { team_id: t.id, team_name: t.name, points, final: running }
    })
    .sort((a, b) => b.final - a.final || a.team_name.localeCompare(b.team_name))
    .slice(0, 6)
    .map(({ team_id, team_name, points }) => ({ team_id, team_name, points }))

  const goalsByMatchday = Array.from(matchdayMap.entries())
    .map(([match_day, v]) => ({ match_day, goals: v.goals, matches: v.matches }))
    .sort((a, b) => a.match_day - b.match_day)

  return {
    topScorers,
    topAssists,
    goalInvolvements,
    motm,
    outstanding,
    cleanSheets,
    bestAttack,
    bestDefence,
    formGuide,
    goalsByMatchday,
    pointsProgression: { matchdays: allMatchdays, series: progressionSeries },
    comparePlayers,
    availableMatchdays,
    selectedMatchday,
    totals: {
      teams: teams.length,
      players: players.length,
      matchesPlayed: scopedMatches.length,
      totalGoals,
      totalAssists: Array.from(assistsByPlayer.values()).reduce((a, b) => a + b, 0),
      goalsPerMatch:
        scopedMatches.length > 0 ? Math.round((totalGoals / scopedMatches.length) * 10) / 10 : 0,
      cleanSheets: scopedTeamRows.reduce((sum, t) => sum + t.clean_sheets, 0),
    },
  }
}
