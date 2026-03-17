import { notFound } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Trophy,
  Users,
  Calendar,
  Goal,
  BarChart,
  Clock,
  MapPin,
} from "lucide-react"

type MatchWithTeams = {
  id: string
  match_day: number
  match_date: string
  match_time: string | null
  venue: string | null
  home_team_id: string
  away_team_id: string
  home_score: number | null
  away_score: number | null
  is_completed: boolean | null
  home_team: { name: string }
  away_team: { name: string }
}

export default async function TeamDetailsPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const { data: team } = await supabase
    .from("teams")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!team) {
    notFound()
  }

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
    .select(
      "*, home_team:teams!matches_home_team_id_fkey(name), away_team:teams!matches_away_team_id_fkey(name)"
    )
    .or(`home_team_id.eq.${team.id},away_team_id.eq.${team.id}`)
    .order("match_date", { ascending: false })

  const pastMatches = matches?.filter((match) => match.is_completed) as MatchWithTeams[] | undefined
  const upcomingMatches = matches?.filter((match) => !match.is_completed) as MatchWithTeams[] | undefined

  const stats = standing || {
    won: 0,
    drawn: 0,
    lost: 0,
    goals_for: 0,
    goals_against: 0,
    goal_difference: 0,
    points: 0,
    played: 0,
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const getResultLabel = (match: MatchWithTeams) => {
    if (!match.is_completed) return "Scheduled"
    if (match.home_score === null || match.away_score === null) return "Completed"

    const isHome = match.home_team_id === team.id
    const teamScore = isHome ? match.home_score : match.away_score
    const opponentScore = isHome ? match.away_score : match.home_score

    if (teamScore > opponentScore) return "Win"
    if (teamScore === opponentScore) return "Draw"
    return "Loss"
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case "Win":
        return "bg-emerald-500/10 text-emerald-500"
      case "Draw":
        return "bg-muted text-muted-foreground"
      case "Loss":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-accent/10 text-accent"
    }
  }

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

  const heroImage = teamImages[team.name.toLowerCase()] || `/football-team-.jpg?height=400&width=800&query=football+team+${encodeURIComponent(team.name)}+celebration`

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[220px] sm:h-[280px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
          <img
            src={heroImage}
            alt={team.name}
            className="h-full w-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-end px-4 sm:px-6 pb-6 sm:pb-8 text-white">
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
                  <Link href="/teams" className="inline-flex items-center gap-1 hover:text-accent">
                    <ArrowLeft className="h-4 w-4" /> Back to Teams
                  </Link>
                  {standing && (
                    <>
                      <span>•</span>
                      <span>League Position: {standing.position ?? "-"}</span>
                    </>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">{team.name}</h1>
                {team.representative_name && (
                  <p className="mt-2 text-sm sm:text-base text-white/90">{team.representative_name}</p>
                )}
              </div>
              {stats.points !== undefined && (
                <div className="flex items-center gap-3">
                  <Badge className="bg-accent text-accent-foreground px-3 py-1 text-sm sm:text-base">
                    {stats.points} pts
                  </Badge>
                  <Badge className="bg-white/20 text-white px-3 py-1 text-sm sm:text-base">
                    {stats.played} matches
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        <section className="grid gap-4 sm:gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-accent" />
                <CardTitle className="text-base sm:text-lg">Overall Record</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Wins</span>
                <span className="text-xl font-bold text-accent">{stats.won ?? stats.wins ?? 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Draws</span>
                <span className="text-xl font-bold">{stats.drawn ?? stats.draws ?? 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Losses</span>
                <span className="text-xl font-bold">{stats.lost ?? stats.losses ?? 0}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Goal className="h-5 w-5 text-accent" />
                <CardTitle className="text-base sm:text-lg">Goals</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Goals For</span>
                <span className="text-xl font-bold">{stats.goals_for ?? 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Goals Against</span>
                <span className="text-xl font-bold">{stats.goals_against ?? 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Goal Difference</span>
                <span
                  className={`text-xl font-bold ${
                    (stats.goal_difference ?? 0) > 0
                      ? "text-emerald-500"
                      : (stats.goal_difference ?? 0) < 0
                        ? "text-destructive"
                        : ""
                  }`}
                >
                  {stats.goal_difference ?? 0 > 0 ? "+" : ""}
                  {stats.goal_difference ?? 0}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-accent" />
                <CardTitle className="text-base sm:text-lg">Quick Stats</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm sm:text-base text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">Points:</span> {stats.points ?? 0}
              </p>
              <p>
                <span className="font-semibold text-foreground">Matches Played:</span> {stats.played ?? 0}
              </p>
              <p>
                <span className="font-semibold text-foreground">Win Rate:</span> {stats.played ? Math.round(((stats.won ?? stats.wins ?? 0) / stats.played) * 100) : 0}%
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" /> Squad
            </h2>
            <Badge variant="outline">{players?.length || 0} players</Badge>
          </div>
          <Card>
            <CardContent className="p-4 sm:p-6">
              {players && players.length > 0 ? (
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  {players.map((player) => (
                    <div key={player.id} className="rounded-lg border border-border p-3 sm:p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-base sm:text-lg font-semibold">{player.name}</p>
                          {player.position && (
                            <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">
                              {player.position}
                            </p>
                          )}
                        </div>
                        {player.jersey_number && (
                          <Badge className="bg-accent text-accent-foreground">#{player.jersey_number}</Badge>
                        )}
                      </div>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground">
                        {player.date_of_birth && (
                          <p>
                            <span className="font-medium text-foreground">DOB:</span> {player.date_of_birth}
                          </p>
                        )}
                        {player.contact_phone && (
                          <p>
                            <span className="font-medium text-foreground">Phone:</span> {player.contact_phone}
                          </p>
                        )}
                        {player.contact_email && (
                          <p>
                            <span className="font-medium text-foreground">Email:</span> {player.contact_email}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm sm:text-base text-muted-foreground">No players registered for this team yet.</p>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" /> Upcoming Matches
            </h2>
            <Badge variant="outline">{upcomingMatches?.length || 0}</Badge>
          </div>
          <Card>
            <CardContent className="p-4 sm:p-6">
              {upcomingMatches && upcomingMatches.length > 0 ? (
                <div className="space-y-4">
                  {upcomingMatches.map((match) => {
                    const formattedDate = formatter.format(new Date(match.match_date))

                    return (
                      <div key={match.id} className="rounded-lg border border-border p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Match Day {match.match_day}</p>
                            <p className="text-lg font-semibold">
                              {match.home_team.name} vs {match.away_team.name}
                            </p>
                          </div>
                          <Badge className="bg-accent/10 text-accent">Scheduled</Badge>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-4 w-4" /> {formattedDate}
                          </span>
                          {match.match_time && (
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-4 w-4" /> {match.match_time}
                            </span>
                          )}
                          {match.venue && (
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-4 w-4" /> {match.venue}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm sm:text-base text-muted-foreground">No upcoming matches scheduled.</p>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" /> Past Matches
            </h2>
            <Badge variant="outline">{pastMatches?.length || 0}</Badge>
          </div>
          <Card>
            <CardContent className="p-4 sm:p-6">
              {pastMatches && pastMatches.length > 0 ? (
                <div className="space-y-4">
                  {pastMatches.map((match) => {
                    const formattedDate = formatter.format(new Date(match.match_date))
                    const result = getResultLabel(match)
                    const isHome = match.home_team_id === team.id

                    return (
                      <div key={match.id} className="rounded-lg border border-border p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Match Day {match.match_day}</p>
                            <p className="text-lg font-semibold">
                              {match.home_team.name} {match.home_score ?? "-"} - {match.away_score ?? "-"} {match.away_team.name}
                            </p>
                          </div>
                          <Badge className={getResultColor(result)}>{result}</Badge>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-4 w-4" /> {formattedDate}
                          </span>
                          {match.match_time && (
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-4 w-4" /> {match.match_time}
                            </span>
                          )}
                          {match.venue && (
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-4 w-4" /> {match.venue}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1">
                            <Users className="h-4 w-4" /> {isHome ? "Home" : "Away"}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm sm:text-base text-muted-foreground">No past matches recorded.</p>
              )}
            </CardContent>
          </Card>
        </section>

        <div className="flex justify-center">
          <Link href="/teams">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Teams
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

