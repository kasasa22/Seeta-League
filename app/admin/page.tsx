import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Calendar, Trophy, TrendingUp, ArrowRight, Home, UserCircle } from "lucide-react"
import { AdminAuthWrapper } from "@/components/admin/admin-auth-wrapper"
import type { LeagueStanding } from "@/lib/types"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch dashboard stats
  const { data: teams } = await supabase.from("teams").select("*", { count: "exact" })

  const { data: matches } = await supabase.from("matches").select("*", { count: "exact" })

  const { data: completedMatches } = await supabase
    .from("matches")
    .select("*", { count: "exact" })
    .eq("is_completed", true)

  const { data: upcomingMatches } = await supabase
    .from("matches")
    .select("*, home_team:teams!matches_home_team_id_fkey(name), away_team:teams!matches_away_team_id_fkey(name)")
    .eq("is_completed", false)
    .order("match_date", { ascending: true })
    .limit(1)
    .single()

  const { data: topTeams } = await supabase.from("league_standings").select("*").limit(7)

  const { data: players } = await supabase.from("players").select("*", { count: "exact" })

  const totalTeams = teams?.length || 0
  const totalMatches = matches?.length || 0
  const completed = completedMatches?.length || 0
  const scheduled = totalMatches - completed
  const totalPlayers = players?.length || 0

  return (
    <AdminAuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500 p-2">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <p className="text-slate-300 text-lg">Manage Seeta League</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="gap-2 border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700">
              <Home className="h-4 w-4" />
              View Public Site
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <Card className="border-slate-700 bg-gradient-to-br from-blue-900/40 to-blue-950/40 backdrop-blur">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-blue-200">Total Teams</CardDescription>
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <CardTitle className="text-5xl font-bold text-white">{totalTeams}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-300">Registered teams</p>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-gradient-to-br from-cyan-900/40 to-cyan-950/40 backdrop-blur">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-cyan-200">Total Players</CardDescription>
                <UserCircle className="h-5 w-5 text-cyan-400" />
              </div>
              <CardTitle className="text-5xl font-bold text-white">{totalPlayers}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-cyan-300">Registered players</p>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-gradient-to-br from-amber-900/40 to-amber-950/40 backdrop-blur">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-amber-200">Scheduled</CardDescription>
                <Calendar className="h-5 w-5 text-amber-400" />
              </div>
              <CardTitle className="text-5xl font-bold text-white">{scheduled}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-amber-300">Upcoming matches</p>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-gradient-to-br from-emerald-900/40 to-emerald-950/40 backdrop-blur">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-emerald-200">Completed</CardDescription>
                <Trophy className="h-5 w-5 text-emerald-400" />
              </div>
              <CardTitle className="text-5xl font-bold text-white">{completed}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-emerald-300">Finished matches</p>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-gradient-to-br from-purple-900/40 to-purple-950/40 backdrop-blur">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-purple-200">Total Matches</CardDescription>
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
              <CardTitle className="text-5xl font-bold text-white">{totalMatches}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-300">All fixtures</p>
            </CardContent>
          </Card>
        </div>

        {topTeams && topTeams.length > 0 && (
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
            <CardContent>
              <div className="overflow-x-auto">
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
                    {topTeams.map((team: LeagueStanding, index: number) => (
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
            <CardContent>
              <div className="flex items-center justify-between rounded-lg bg-slate-900/50 p-6">
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">
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

        <div>
          <h2 className="mb-4 text-2xl font-bold text-white">Quick Actions</h2>
          <div className="grid gap-6 md:grid-cols-4">
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
