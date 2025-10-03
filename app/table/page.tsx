import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Trophy, TrendingUp, TrendingDown, Medal } from "lucide-react"

export default async function TablePage() {
  const supabase = await createClient()

  const { data: standings } = await supabase.from("league_standings").select("*").order("position")

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
            {standings && standings.length > 0 ? (
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
                    {standings.map((team, index) => (
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
                No standings available yet
              </div>
            )}
          </CardContent>
        </Card>

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
      </div>
    </div>
  )
}
