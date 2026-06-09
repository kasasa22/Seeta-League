import { createClient } from "@/lib/supabase/server"

async function safeCount(query: any): Promise<number> {
  try {
    const { count } = await query
    return count ?? 0
  } catch {
    return 0
  }
}

export interface PlayerDetail {
  player: any
  team: { id: string; name: string; logo_url: string | null } | null
  goals: number
  assists: number
  motm: number
  outstanding: number
  appearances: number
  cleanSheets: number
}

export async function getPlayerDetail(id: string): Promise<PlayerDetail | null> {
  const supabase = await createClient()

  const { data: player } = await supabase
    .from("players")
    .select("*, team:teams(id, name, logo_url)")
    .eq("id", id)
    .single()

  if (!player) return null

  const goals = await safeCount(
    supabase.from("match_events").select("id", { count: "exact", head: true }).eq("player_id", id).eq("event_type", "goal")
  )
  const assists = await safeCount(
    supabase.from("match_events").select("id", { count: "exact", head: true }).eq("player_id", id).eq("event_type", "assist")
  )
  const motm = await safeCount(
    supabase.from("man_of_the_match").select("id", { count: "exact", head: true }).eq("player_id", id)
  )
  const outstanding = await safeCount(
    supabase.from("matchday_outstanding").select("id", { count: "exact", head: true }).eq("player_id", id)
  )

  let appearances = 0
  try {
    const { data: evs } = await supabase.from("match_events").select("match_id").eq("player_id", id)
    appearances = new Set((evs ?? []).map((e: any) => e.match_id)).size
  } catch {
    appearances = 0
  }

  let cleanSheets = 0
  if (player.team_id) {
    let csQuery = supabase
      .from("matches")
      .select("id", { count: "exact", head: true })
      .eq("is_completed", true)
      .or(`and(home_team_id.eq.${player.team_id},away_score.eq.0),and(away_team_id.eq.${player.team_id},home_score.eq.0)`)
    if (player.season_id) csQuery = csQuery.eq("season_id", player.season_id)
    cleanSheets = await safeCount(csQuery)
  }

  return { player, team: (player as any).team ?? null, goals, assists, motm, outstanding, appearances, cleanSheets }
}

export interface TeamDetail {
  team: any
  standing: any
  players: any[]
  pastMatches: any[]
  upcomingMatches: any[]
}

export async function getTeamDetail(id: string): Promise<TeamDetail | null> {
  const supabase = await createClient()

  const { data: team } = await supabase.from("teams").select("*").eq("id", id).single()
  if (!team) return null

  const { data: standing } = await supabase
    .from("league_standings")
    .select("*")
    .eq("team_id", team.id)
    .maybeSingle()

  const { data: players } = await supabase
    .from("players")
    .select("*")
    .eq("team_id", team.id)
    .order("name", { ascending: true })

  const { data: matches } = await supabase
    .from("matches")
    .select("*, home_team:teams!matches_home_team_id_fkey(name), away_team:teams!matches_away_team_id_fkey(name)")
    .or(`home_team_id.eq.${team.id},away_team_id.eq.${team.id}`)
    .order("match_date", { ascending: false })

  const pastMatches = (matches ?? []).filter((m: any) => m.is_completed)
  const upcomingMatches = (matches ?? []).filter((m: any) => !m.is_completed)

  return { team, standing, players: players ?? [], pastMatches, upcomingMatches }
}
