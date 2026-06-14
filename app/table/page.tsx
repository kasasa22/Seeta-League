import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { getSelectedSeason } from "@/lib/seasons"
import { getStatsCentreData } from "@/lib/stats"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Trophy, TrendingUp, TrendingDown, Medal, BarChart3 } from "lucide-react"
import { PlayerLeaderboard, CleanSheetBoard } from "@/components/stats/stats-centre"

export const metadata: Metadata = {
  title: "League Table & Standings",
  description:
    "Live Seeta League table — team standings, points, wins, draws, losses, goals and form across the season. Follow who is topping the alumni football championship.",
  alternates: { canonical: "/table" },
}

export default async function TablePage() {
  const supabase = await createClient()
  const season = await getSelectedSeason()

  let standingsQuery = supabase
    .from("league_standings")
    .select("*")
    .order("points", { ascending: false })
  if (season) standingsQuery = standingsQuery.eq("season_id", season.id)
  const { data: standings } = await standingsQuery

  let displayData = standings

  if (!standings || standings.length === 0) {
    let teamsQuery = supabase.from("teams").select("*").eq("is_active", true)
    if (season) teamsQuery = teamsQuery.eq("season_id", season.id)
    const { data: teams } = await teamsQuery

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

  // Player & team leaderboards for the stats section
  const stats = await getStatsCentreData(season?.id ?? null)
  const hasLeaderboards =
    stats.topScorers.length > 0 || stats.topAssists.length > 0 || stats.cleanSheets.length > 0

  const teamImages: Record<string, string> = {
    "godfather's": "/teams/godfathers.png",
    titans: "/teams/titans.png",
    "finest brothers": "/teams/finest.png",
    raptors: "/teams/raptors.png",
    "covid boys": "/teams/covid_boys.png",
    "top bins": "/teams/topbins.png",
    "super strikers": "/teams/superstrikers.png",
    "losti city": "/teams/losti_city.png",
    "club de chege": "/teams/club_de_shege.png",
    allies: "/teams/allies.png",
    kawaago: "/teams/kawaago.png",
    panthers: "/teams/panthers.png",
    pundits: "/teams/pundits.png",
    "the villagers": "/teams/villagers.png",
  }

  const getTeamImage = (name: string) => {
    const key = name.toLowerCase()
    return teamImages[key] || `/football-team-logo-.jpg?height=40&width=40&query=${encodeURIComponent(name)}+football+logo`
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-[250px] sm:h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
          <img
            src="/football-league-table-trophy.jpg"
            alt="Trophy"
            className="h-full w-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-end px-4 sm:px-6 pb-6 sm:pb-8 text-white">
          <div className="mx-auto w-full max-w-7xl">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-3 sm:mb-4 text-white hover:bg-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="text-sm sm:text-base">Back to Home</span>
              </Button>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <Trophy className="h-8 w-8 sm:h-10 sm:w-10 text-accent" />
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">League Table</h1>
                <p className="mt-1 text-sm sm:text-base md:text-lg text-white/90">Current standings - {season?.name ?? "Season"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        <Card className="overflow-hidden border-accent/30">
          <CardContent className="p-0">
            {displayData && displayData.length > 0 ? (
              <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-black">Pos</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-black">Team</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-black">P</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-black">W</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-black">D</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-black">L</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-black">GF</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-black">GA</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-black">GD</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-black">Pts</th>
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
                        <td className="px-2 sm:px-4 py-2 sm:py-3 font-black text-sm">
                          <div className="flex items-center gap-1 sm:gap-2">
                            {index + 1}
                            {index === 0 && <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />}
                            {index === 1 && <Medal className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400" />}
                            {index === 2 && <Medal className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" />}
                          </div>
                        </td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 overflow-hidden rounded-md bg-muted flex-shrink-0">
                              <img
                                src={getTeamImage(team.team_name)}
                                alt={team.team_name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span className="font-bold text-sm sm:text-base truncate">{team.team_name}</span>
                          </div>
                        </td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold text-sm">{team.played}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold text-accent text-sm">{team.won}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold text-sm">{team.drawn}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold text-sm">{team.lost}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold text-sm">{team.goals_for}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold text-sm">{team.goals_against}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold text-sm">
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
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                          <Badge
                            className={`text-sm sm:text-base font-black ${
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

        <div className="mt-6 sm:mt-8 rounded-lg bg-card border border-accent/30 p-4 sm:p-6">
          <h3 className="mb-3 font-bold text-base sm:text-lg">Table Key</h3>
          <div className="grid gap-3 text-xs sm:text-sm md:grid-cols-2">
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

        {/* Player & Team Statistics */}
        {hasLeaderboards && (
          <div className="mt-12">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                <h2 className="text-2xl font-black tracking-tight">Top Performers</h2>
              </div>
              <Link href="/statistics">
                <Button variant="outline" size="sm">
                  Full Stats Centre
                  <TrendingUp className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              <PlayerLeaderboard
                title="Top Scorers"
                subtitle="Leading goal scorers"
                iconKey="goals"
                headerClass="bg-emerald-500"
                valueClass="text-emerald-600 dark:text-emerald-400"
                unit="goals"
                rows={stats.topScorers}
                limit={5}
              />
              <PlayerLeaderboard
                title="Top Assists"
                subtitle="Leading assist providers"
                iconKey="assists"
                headerClass="bg-blue-500"
                valueClass="text-blue-600 dark:text-blue-400"
                unit="assists"
                rows={stats.topAssists}
                limit={5}
              />
              <CleanSheetBoard rows={stats.cleanSheets} limit={5} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
