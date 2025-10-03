import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Calendar, Trophy, TrendingUp, ArrowRight, Home, UserCircle } from "lucide-react"
import { AdminAuthWrapper } from "@/components/admin/admin-auth-wrapper"
import type { LeagueStanding } from "@/lib/types"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch dashboard stats with error handling
  let teams = null
  let matches = null
  let completedMatches = null
  let upcomingMatches = null

  try {
    const { data: teamsData } = await supabase.from("teams").select("*", { count: "exact" })
    teams = teamsData
  } catch (error) {
    console.error("Error fetching teams:", error)
    teams = []
  }

  try {
    const { data: matchesData } = await supabase.from("matches").select("*", { count: "exact" })
    matches = matchesData
  } catch (error) {
    console.error("Error fetching matches:", error)
    matches = []
  }

  try {
    const { data: completedData } = await supabase
      .from("matches")
      .select("*", { count: "exact" })
      .eq("is_completed", true)
    completedMatches = completedData
  } catch (error) {
    console.error("Error fetching completed matches:", error)
    completedMatches = []
  }

  try {
    const { data: upcomingData } = await supabase
      .from("matches")
      .select("*, home_team:teams!matches_home_team_id_fkey(name), away_team:teams!matches_away_team_id_fkey(name)")
      .eq("is_completed", false)
      .order("match_date", { ascending: true })
      .limit(1)
      .single()
    upcomingMatches = upcomingData
  } catch (error) {
    console.error("Error fetching upcoming matches:", error)
    upcomingMatches = null
  }

  // Get top teams from standings or fallback to basic teams
  let displayTeams = null
  let players = null

  try {
    const { data: topTeams } = await supabase
      .from("league_standings")
      .select("*")
      .order("points", { ascending: false })
      .limit(7)

    displayTeams = topTeams

    // If no standings data, get basic teams info
    if (!topTeams || topTeams.length === 0) {
      const { data: basicTeams } = await supabase
        .from("teams")
        .select("*")
        .eq("is_active", true)
        .limit(7)

      if (basicTeams && basicTeams.length > 0) {
        displayTeams = basicTeams.map((team, index) => ({
          id: team.id,
          team_name: team.name,
          played: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          goal_difference: 0,
          points: 0
        }))
      }
    }
  } catch (error) {
    console.error("Error fetching league standings:", error)
    displayTeams = []
  }

  try {
    const { data: playersData } = await supabase.from("players").select("*", { count: "exact" })
    players = playersData
  } catch (error) {
    console.error("Error fetching players:", error)
    players = []
  }

  // Get top scorers and assists (with error handling for missing views)
  let topScorers = null
  let topAssists = null

  try {
    const { data: scorersData } = await supabase
      .from("top_scorers")
      .select("*")
      .limit(5)
    topScorers = scorersData
  } catch (error) {
    console.log("Top scorers view not available yet")
  }

  try {
    const { data: assistsData } = await supabase
      .from("top_assists")
      .select("*")
      .limit(5)
    topAssists = assistsData
  } catch (error) {
    console.log("Top assists view not available yet")
  }

  const totalTeams = teams?.length || 0
  const totalMatches = matches?.length || 0
  const completed = completedMatches?.length || 0
  const scheduled = totalMatches - completed
  const totalPlayers = players?.length || 0

  return (
    <AdminAuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-3 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6 md:space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500 p-2">
                <Trophy className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <p className="text-slate-300 text-sm md:text-lg">Manage Seeta League</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="gap-2 border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700 w-full sm:w-auto">
              <Home className="h-4 w-4" />
              <span className="sm:inline">View Public Site</span>
            </Button>
          </Link>
        </div>

        <div className="grid gap-3 grid-cols-2 md:gap-6 md:grid-cols-3 lg:grid-cols-5">
          <Card className="border-slate-700 bg-gradient-to-br from-blue-900/40 to-blue-950/40 backdrop-blur">
            <CardHeader className="pb-2 md:pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-xs md:text-sm text-blue-200">Total Teams</CardDescription>
                <Users className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
              </div>
              <CardTitle className="text-2xl md:text-3xl lg:text-5xl font-bold text-white">{totalTeams}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs md:text-sm text-blue-300">Registered teams</p>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-gradient-to-br from-cyan-900/40 to-cyan-950/40 backdrop-blur">
            <CardHeader className="pb-2 md:pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-xs md:text-sm text-cyan-200">Total Players</CardDescription>
                <UserCircle className="h-4 w-4 md:h-5 md:w-5 text-cyan-400" />
              </div>
              <CardTitle className="text-2xl md:text-3xl lg:text-5xl font-bold text-white">{totalPlayers}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs md:text-sm text-cyan-300">Registered players</p>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-gradient-to-br from-amber-900/40 to-amber-950/40 backdrop-blur">
            <CardHeader className="pb-2 md:pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-xs md:text-sm text-amber-200">Scheduled</CardDescription>
                <Calendar className="h-4 w-4 md:h-5 md:w-5 text-amber-400" />
              </div>
              <CardTitle className="text-2xl md:text-3xl lg:text-5xl font-bold text-white">{scheduled}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs md:text-sm text-amber-300">Upcoming matches</p>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-gradient-to-br from-emerald-900/40 to-emerald-950/40 backdrop-blur">
            <CardHeader className="pb-2 md:pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-xs md:text-sm text-emerald-200">Completed</CardDescription>
                <Trophy className="h-4 w-4 md:h-5 md:w-5 text-emerald-400" />
              </div>
              <CardTitle className="text-2xl md:text-3xl lg:text-5xl font-bold text-white">{completed}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs md:text-sm text-emerald-300">Finished matches</p>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-gradient-to-br from-purple-900/40 to-purple-950/40 backdrop-blur lg:col-span-1 md:col-span-3 col-span-2">
            <CardHeader className="pb-2 md:pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-xs md:text-sm text-purple-200">Total Matches</CardDescription>
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-purple-400" />
              </div>
              <CardTitle className="text-2xl md:text-3xl lg:text-5xl font-bold text-white">{totalMatches}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs md:text-sm text-purple-300">All fixtures</p>
            </CardContent>
          </Card>
        </div>

        {displayTeams && displayTeams.length > 0 && (
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-emerald-400" />
                  <CardTitle className="text-white">League Table - Top 7</CardTitle>
                </div>
                <Link href="/table">
                  <Button
                    variant="outline"
                    className="gap-2 border-slate-700 bg-slate-900/50 text-white hover:bg-slate-700"
                  >
                    View Full Table
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-3 md:p-6">
              <div className="overflow-x-auto -mx-3 md:mx-0">
                <div className="min-w-[600px]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="py-3 text-left text-sm font-semibold text-slate-400">Pos</th>
                      <th className="py-3 text-left text-sm font-semibold text-slate-400">Team</th>
                      <th className="py-3 text-center text-sm font-semibold text-slate-400">P</th>
                      <th className="py-3 text-center text-sm font-semibold text-slate-400">W</th>
                      <th className="py-3 text-center text-sm font-semibold text-slate-400">D</th>
                      <th className="py-3 text-center text-sm font-semibold text-slate-400">L</th>
                      <th className="py-3 text-center text-sm font-semibold text-slate-400">GD</th>
                      <th className="py-3 text-center text-sm font-semibold text-slate-400">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayTeams.map((team: LeagueStanding, index: number) => (
                      <tr key={team.id} className="border-b border-slate-800 hover:bg-slate-900/50">
                        <td className="py-4 text-left">
                          <span
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                              index === 0
                                ? "bg-yellow-500/20 text-yellow-400"
                                : index === 1
                                  ? "bg-slate-500/20 text-slate-300"
                                  : index === 2
                                    ? "bg-amber-700/20 text-amber-600"
                                    : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-4 text-left">
                          <span className="font-semibold text-white">{team.team_name}</span>
                        </td>
                        <td className="py-4 text-center text-slate-300">{team.played}</td>
                        <td className="py-4 text-center text-emerald-400">{team.won}</td>
                        <td className="py-4 text-center text-slate-400">{team.drawn}</td>
                        <td className="py-4 text-center text-red-400">{team.lost}</td>
                        <td className="py-4 text-center">
                          <span
                            className={
                              team.goal_difference > 0
                                ? "text-emerald-400"
                                : team.goal_difference < 0
                                  ? "text-red-400"
                                  : "text-slate-400"
                            }
                          >
                            {team.goal_difference > 0 ? "+" : ""}
                            {team.goal_difference}
                          </span>
                        </td>
                        <td className="py-4 text-center">
                          <span className="font-bold text-white">{team.points}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {upcomingMatches && (
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-400" />
                <CardTitle className="text-white">Next Match</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-3 md:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg bg-slate-900/50 p-4 md:p-6">
                <div className="space-y-2">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                    {upcomingMatches.home_team?.name} vs {upcomingMatches.away_team?.name}
                  </p>
                  <p className="text-slate-400">
                    {new Date(upcomingMatches.match_date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at {upcomingMatches.match_time || "TBD"}
                  </p>
                </div>
                <ArrowRight className="h-8 w-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Player Statistics */}
        {(topScorers && topScorers.length > 0) || (topAssists && topAssists.length > 0) ? (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Top Scorers */}
            {topScorers && topScorers.length > 0 && (
              <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-emerald-400" />
                    <CardTitle className="text-white">Top Scorers</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topScorers.map((scorer, index) => (
                      <div key={scorer.id} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                            index === 0 ? "bg-emerald-500/20 text-emerald-400" :
                            index === 1 ? "bg-slate-500/20 text-slate-300" :
                            index === 2 ? "bg-amber-700/20 text-amber-600" :
                            "bg-slate-800 text-slate-400"
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {scorer.player_name}
                              {scorer.jersey_number && <span className="text-slate-400 ml-1">#{scorer.jersey_number}</span>}
                            </p>
                            <p className="text-sm text-slate-400">{scorer.team_name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-emerald-400">{scorer.goals}</p>
                          <p className="text-xs text-slate-400">goals</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Top Assists */}
            {topAssists && topAssists.length > 0 && (
              <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-400" />
                    <CardTitle className="text-white">Top Assists</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topAssists.map((assist, index) => (
                      <div key={assist.id} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                            index === 0 ? "bg-blue-500/20 text-blue-400" :
                            index === 1 ? "bg-slate-500/20 text-slate-300" :
                            index === 2 ? "bg-amber-700/20 text-amber-600" :
                            "bg-slate-800 text-slate-400"
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {assist.player_name}
                              {assist.jersey_number && <span className="text-slate-400 ml-1">#{assist.jersey_number}</span>}
                            </p>
                            <p className="text-sm text-slate-400">{assist.team_name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-400">{assist.assists}</p>
                          <p className="text-xs text-slate-400">assists</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : null}

        <div>
          <h2 className="mb-4 text-xl md:text-2xl font-bold text-white">Quick Actions</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/admin/teams" className="group">
              <Card className="cursor-pointer border-slate-700 bg-slate-800/50 backdrop-blur transition-all hover:scale-105 hover:border-blue-500 hover:bg-slate-800">
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="rounded-lg bg-blue-500/20 p-3 group-hover:bg-blue-500/30">
                      <Users className="h-6 w-6 text-blue-400" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-600 transition-colors group-hover:text-blue-400" />
                  </div>
                  <CardTitle className="text-white">Manage Teams</CardTitle>
                  <CardDescription className="text-slate-400">Register and manage teams</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/admin/players" className="group">
              <Card className="cursor-pointer border-slate-700 bg-slate-800/50 backdrop-blur transition-all hover:scale-105 hover:border-cyan-500 hover:bg-slate-800">
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="rounded-lg bg-cyan-500/20 p-3 group-hover:bg-cyan-500/30">
                      <UserCircle className="h-6 w-6 text-cyan-400" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-600 transition-colors group-hover:text-cyan-400" />
                  </div>
                  <CardTitle className="text-white">Manage Players</CardTitle>
                  <CardDescription className="text-slate-400">Register and manage players</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/admin/matches" className="group">
              <Card className="cursor-pointer border-slate-700 bg-slate-800/50 backdrop-blur transition-all hover:scale-105 hover:border-amber-500 hover:bg-slate-800">
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="rounded-lg bg-amber-500/20 p-3 group-hover:bg-amber-500/30">
                      <Calendar className="h-6 w-6 text-amber-400" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-600 transition-colors group-hover:text-amber-400" />
                  </div>
                  <CardTitle className="text-white">Schedule Matches</CardTitle>
                  <CardDescription className="text-slate-400">Create and manage fixtures</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/admin/scores" className="group">
              <Card className="cursor-pointer border-slate-700 bg-slate-800/50 backdrop-blur transition-all hover:scale-105 hover:border-emerald-500 hover:bg-slate-800">
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="rounded-lg bg-emerald-500/20 p-3 group-hover:bg-emerald-500/30">
                      <Trophy className="h-6 w-6 text-emerald-400" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-600 transition-colors group-hover:text-emerald-400" />
                  </div>
                  <CardTitle className="text-white">Enter Scores</CardTitle>
                  <CardDescription className="text-slate-400">Update match results</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </AdminAuthWrapper>
  )
}
