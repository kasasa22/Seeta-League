import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Trophy, TrendingUp, TrendingDown, Medal, Target, Users } from "lucide-react"

export default async function TablePage() {
  const supabase = await createClient()

  // Try to get standings from the view first
  const { data: standings, error: standingsError } = await supabase
    .from("league_standings")
    .select("*")
    .order("points", { ascending: false })

  // If no standings data, get teams and create basic standings
  let displayData = standings

  if (!standings || standings.length === 0) {
    const { data: teams, error: teamsError } = await supabase
      .from("teams")
      .select("*")
      .eq("is_active", true)

    if (teams && teams.length > 0) {
      // Create basic standings structure for teams without match data
      displayData = teams.map((team, index) => ({
        id: team.id,
        team_name: team.name,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goals_for: 0,
        goals_against: 0,
        goal_difference: 0,
        points: 0,
        position: index + 1
      }))
    }
  }

  // Get top scorers and assists (with error handling for missing views)
  let topScorers = null
  let topAssists = null

  try {
    const { data: scorersData } = await supabase
      .from("top_scorers")
      .select("*")
      .limit(10)
    topScorers = scorersData
  } catch (error) {
    console.log("Top scorers view not available yet")
  }

  try {
    const { data: assistsData } = await supabase
      .from("top_assists")
      .select("*")
      .limit(10)
    topAssists = assistsData
  } catch (error) {
    console.log("Top assists view not available yet")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
          <img
            src="/football-league-table-trophy.jpg"
            alt="Trophy"
            className="h-full w-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-8 text-white">
          <div className="mx-auto w-full max-w-7xl">
            <Link href="/">
              <Button variant="ghost" className="mb-4 text-white hover:bg-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Trophy className="h-10 w-10 text-accent" />
              <div>
                <h1 className="text-5xl font-black tracking-tight">League Table</h1>
                <p className="mt-1 text-lg text-white/90">Current standings - Season 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <Card className="overflow-hidden border-accent/30">
          <CardContent className="p-0">
            {displayData && displayData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-black">Pos</th>
                      <th className="px-4 py-3 text-left text-sm font-black">Team</th>
                      <th className="px-4 py-3 text-center text-sm font-black">P</th>
                      <th className="px-4 py-3 text-center text-sm font-black">W</th>
                      <th className="px-4 py-3 text-center text-sm font-black">D</th>
                      <th className="px-4 py-3 text-center text-sm font-black">L</th>
                      <th className="px-4 py-3 text-center text-sm font-black">GF</th>
                      <th className="px-4 py-3 text-center text-sm font-black">GA</th>
                      <th className="px-4 py-3 text-center text-sm font-black">GD</th>
                      <th className="px-4 py-3 text-center text-sm font-black">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayData.map((team, index) => (
                      <tr
                        key={team.id}
                        className={`border-b border-border/50 transition-colors hover:bg-accent/10 ${
                          index === 0 ? "bg-accent/20" : index < 3 ? "bg-accent/10" : ""
                        }`}
                      >
                        <td className="px-4 py-3 font-black">
                          <div className="flex items-center gap-2">
                            {index + 1}
                            {index === 0 && <Trophy className="h-4 w-4 text-accent" />}
                            {index === 1 && <Medal className="h-4 w-4 text-slate-400" />}
                            {index === 2 && <Medal className="h-4 w-4 text-amber-600" />}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 overflow-hidden rounded-md bg-muted">
                              <img
                                src={`/football-team-logo-.jpg?height=40&width=40&query=football+team+logo+${team.team_name}`}
                                alt={team.team_name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span className="font-bold">{team.team_name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center font-semibold">{team.played}</td>
                        <td className="px-4 py-3 text-center font-semibold text-accent">{team.won}</td>
                        <td className="px-4 py-3 text-center font-semibold">{team.drawn}</td>
                        <td className="px-4 py-3 text-center font-semibold">{team.lost}</td>
                        <td className="px-4 py-3 text-center font-semibold">{team.goals_for}</td>
                        <td className="px-4 py-3 text-center font-semibold">{team.goals_against}</td>
                        <td className="px-4 py-3 text-center font-semibold">
                          <div className="flex items-center justify-center gap-1">
                            {team.goal_difference > 0 && <TrendingUp className="h-3 w-3 text-accent" />}
                            {team.goal_difference < 0 && <TrendingDown className="h-3 w-3 text-destructive" />}
                            <span
                              className={
                                team.goal_difference > 0
                                  ? "text-accent"
                                  : team.goal_difference < 0
                                    ? "text-destructive"
                                    : ""
                              }
                            >
                              {team.goal_difference > 0 ? "+" : ""}
                              {team.goal_difference}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Badge
                            className={`text-base font-black ${
                              index === 0
                                ? "bg-accent text-accent-foreground"
                                : index < 3
                                  ? "bg-accent/50 text-accent-foreground"
                                  : "bg-muted"
                            }`}
                          >
                            {team.points}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-semibold mb-2">No teams registered yet</h3>
                  <p>Teams will appear here once they are registered in the system.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {displayData && displayData.length > 0 && !standings && (
          <div className="mt-6 rounded-lg bg-blue-500/10 border border-blue-500/30 p-4">
            <div className="flex items-center gap-2 text-blue-400">
              <Trophy className="h-5 w-5" />
              <p className="font-semibold">League Starting Soon!</p>
            </div>
            <p className="text-sm text-blue-300 mt-1">
              Teams are registered but no matches have been completed yet. Standings will update automatically as match results are recorded.
            </p>
          </div>
        )}

        <div className="mt-8 rounded-lg bg-card border border-accent/30 p-6">
          <h3 className="mb-3 font-bold text-lg">Table Key</h3>
          <div className="grid gap-3 text-sm md:grid-cols-2">
            <div>
              <p className="mb-2">
                <strong>P</strong> = Played • <strong>W</strong> = Won • <strong>D</strong> = Drawn • <strong>L</strong>{" "}
                = Lost
              </p>
              <p>
                <strong>GF</strong> = Goals For • <strong>GA</strong> = Goals Against • <strong>GD</strong> = Goal
                Difference • <strong>Pts</strong> = Points
              </p>
            </div>
            <div>
              <p className="mb-2 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-accent" /> = League Leader
              </p>
              <p className="flex items-center gap-2">
                <Medal className="h-4 w-4 text-slate-400" /> <Medal className="h-4 w-4 text-amber-600" /> = Top 3
                positions
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Teams are ranked by points. If teams are level on points, they are separated by goal difference, then goals
            scored.
          </p>
        </div>

        {/* Player Statistics */}
        {(topScorers && topScorers.length > 0 && topScorers.some(s => s.goals > 0)) || (topAssists && topAssists.length > 0 && topAssists.some(a => a.assists > 0)) ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Top Scorers */}
            {topScorers && topScorers.length > 0 && topScorers.some(s => s.goals > 0) && (
              <Card className="overflow-hidden border-accent/30">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-white" />
                      <h3 className="text-xl font-bold text-white">Top Scorers</h3>
                    </div>
                    <p className="text-emerald-100 text-sm mt-1">Leading goal scorers this season</p>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      {topScorers.filter(s => s.goals > 0).map((scorer, index) => (
                        <div key={scorer.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                              index === 0 ? "bg-emerald-500/20 text-emerald-600" :
                              index === 1 ? "bg-slate-500/20 text-slate-600" :
                              index === 2 ? "bg-amber-700/20 text-amber-700" :
                              "bg-muted text-muted-foreground"
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-semibold">
                                {scorer.player_name}
                                {scorer.jersey_number && <span className="text-muted-foreground ml-1">#{scorer.jersey_number}</span>}
                              </p>
                              <p className="text-sm text-muted-foreground">{scorer.team_name}</p>
                              {scorer.position && <p className="text-xs text-muted-foreground">{scorer.position}</p>}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-emerald-600 text-lg">{scorer.goals}</p>
                            <p className="text-xs text-muted-foreground">goals</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Top Assists */}
            {topAssists && topAssists.length > 0 && topAssists.some(a => a.assists > 0) && (
              <Card className="overflow-hidden border-accent/30">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-white" />
                      <h3 className="text-xl font-bold text-white">Top Assists</h3>
                    </div>
                    <p className="text-blue-100 text-sm mt-1">Leading assist providers this season</p>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      {topAssists.filter(a => a.assists > 0).map((assist, index) => (
                        <div key={assist.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                              index === 0 ? "bg-blue-500/20 text-blue-600" :
                              index === 1 ? "bg-slate-500/20 text-slate-600" :
                              index === 2 ? "bg-amber-700/20 text-amber-700" :
                              "bg-muted text-muted-foreground"
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-semibold">
                                {assist.player_name}
                                {assist.jersey_number && <span className="text-muted-foreground ml-1">#{assist.jersey_number}</span>}
                              </p>
                              <p className="text-sm text-muted-foreground">{assist.team_name}</p>
                              {assist.position && <p className="text-xs text-muted-foreground">{assist.position}</p>}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-600 text-lg">{assist.assists}</p>
                            <p className="text-xs text-muted-foreground">assists</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}
