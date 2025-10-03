import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Users, Trophy } from "lucide-react"

export default async function TeamsPage() {
  const supabase = await createClient()

  const { data: teams } = await supabase.from("teams").select("*").eq("is_active", true).order("name")

  // Get stats for each team
  const { data: standings } = await supabase.from("league_standings").select("*")

  const teamsWithStats = teams?.map((team) => {
    const stats = standings?.find((s) => s.id === team.id)
    return { ...team, stats }
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
          <img
            src="/football-teams-lineup-group.jpg"
            alt="Teams"
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
              <Users className="h-10 w-10 text-accent" />
              <div>
                <h1 className="text-5xl font-black tracking-tight">Teams</h1>
                <p className="mt-1 text-lg text-white/90">{teamsWithStats?.length || 0} registered teams</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {teamsWithStats && teamsWithStats.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teamsWithStats.map((team, index) => (
              <Card
                key={team.id}
                className="group overflow-hidden transition-all hover:shadow-lg hover:border-accent/50"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5">
                  <img
                    src={`/football-team-.jpg?key=pqr40&height=300&width=400&query=football+team+${team.name}+players`}
                    alt={team.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  {team.stats && (
                    <Badge className="absolute right-4 top-4 bg-card text-card-foreground font-bold">
                      #{standings?.findIndex((s) => s.id === team.id)! + 1}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-2xl font-black">{team.name}</h3>
                  {team.stats ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-lg bg-accent/20 p-3">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-accent" />
                          <span className="font-semibold">Points</span>
                        </div>
                        <span className="text-2xl font-black text-accent">{team.stats.points}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-lg bg-muted p-2">
                          <p className="text-2xl font-black text-accent">{team.stats.won}</p>
                          <p className="text-xs text-muted-foreground">Won</p>
                        </div>
                        <div className="rounded-lg bg-muted p-2">
                          <p className="text-2xl font-black">{team.stats.drawn}</p>
                          <p className="text-xs text-muted-foreground">Drawn</p>
                        </div>
                        <div className="rounded-lg bg-muted p-2">
                          <p className="text-2xl font-black">{team.stats.lost}</p>
                          <p className="text-xs text-muted-foreground">Lost</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Goals Scored</span>
                        <span className="font-bold">{team.stats.goals_for}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Goal Difference</span>
                        <span
                          className={`font-bold ${team.stats.goal_difference > 0 ? "text-accent" : team.stats.goal_difference < 0 ? "text-destructive" : ""}`}
                        >
                          {team.stats.goal_difference > 0 ? "+" : ""}
                          {team.stats.goal_difference}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-32 items-center justify-center rounded-lg bg-muted">
                      <p className="text-sm text-muted-foreground">No matches played yet</p>
                    </div>
                  )}
                  {team.representative_name && (
                    <div className="mt-4 border-t border-border pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Representative
                      </p>
                      <p className="mt-1 font-semibold">{team.representative_name}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex h-64 items-center justify-center text-muted-foreground">
              No teams registered yet
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
