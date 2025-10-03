import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Trophy, Calendar, Users, ArrowRight, TrendingUp, Target, Award, Newspaper } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch latest results
  const { data: latestResults } = await supabase
    .from("matches")
    .select("*, home_team:teams!matches_home_team_id_fkey(name), away_team:teams!matches_away_team_id_fkey(name)")
    .eq("is_completed", true)
    .order("match_date", { ascending: false })
    .limit(3)

  // Fetch upcoming fixtures
  const { data: upcomingFixtures } = await supabase
    .from("matches")
    .select("*, home_team:teams!matches_home_team_id_fkey(name), away_team:teams!matches_away_team_id_fkey(name)")
    .eq("is_completed", false)
    .order("match_date", { ascending: true })
    .limit(3)

  // Fetch league leader
  const { data: standings } = await supabase.from("league_standings").select("*").limit(7)

  // Fetch stats
  const { data: teams } = await supabase.from("teams").select("*", { count: "exact" })
  const { data: matches } = await supabase.from("matches").select("*", { count: "exact" }).eq("is_completed", true)

  // Calculate total goals
  const { data: allMatches } = await supabase.from("matches").select("home_score, away_score").eq("is_completed", true)
  const totalGoals = allMatches?.reduce((sum, match) => sum + (match.home_score || 0) + (match.away_score || 0), 0) || 0

  // Get top scorer
  const topScorer = standings?.[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
          <img
            src="/aerial-football-stadium.png"
            alt="Stadium"
            className="h-full w-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <Badge className="mb-4 bg-accent text-accent-foreground px-4 py-1.5 text-sm font-semibold">Season 2025</Badge>
          <h1 className="text-6xl font-black tracking-tight md:text-7xl lg:text-8xl text-balance">SEETA LEAGUE</h1>
          <p className="mt-4 text-xl font-medium text-white/90 md:text-2xl">School Football Championship</p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white">
            <div className="text-center">
              <p className="text-5xl font-black text-accent">{teams?.length || 0}</p>
              <p className="mt-1 text-sm font-medium uppercase tracking-wide text-white/80">Teams</p>
            </div>
            <div className="h-12 w-px bg-white/30" />
            <div className="text-center">
              <p className="text-5xl font-black text-accent">{matches?.length || 0}</p>
              <p className="mt-1 text-sm font-medium uppercase tracking-wide text-white/80">Matches Played</p>
            </div>
            <div className="h-12 w-px bg-white/30" />
            <div className="text-center">
              <p className="text-5xl font-black text-accent">{totalGoals}</p>
              <p className="mt-1 text-sm font-medium uppercase tracking-wide text-white/80">Total Goals</p>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/table">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                <Trophy className="mr-2 h-5 w-5" />
                View League Table
              </Button>
            </Link>
            <Link href="/fixtures">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 font-semibold"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Fixtures & Results
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex items-center justify-between py-4">
            <div className="flex gap-2">
              <Link href="/table">
                <Button variant="ghost" className="font-semibold hover:bg-accent/20 hover:text-accent">
                  <Trophy className="mr-2 h-4 w-4" />
                  Table
                </Button>
              </Link>
              <Link href="/fixtures">
                <Button variant="ghost" className="font-semibold hover:bg-accent/20 hover:text-accent">
                  <Calendar className="mr-2 h-4 w-4" />
                  Fixtures
                </Button>
              </Link>
              <Link href="/teams">
                <Button variant="ghost" className="font-semibold hover:bg-accent/20 hover:text-accent">
                  <Users className="mr-2 h-4 w-4" />
                  Teams
                </Button>
              </Link>
            </div>
            <Link href="/admin">
              <Button
                variant="outline"
                size="sm"
                className="font-semibold border-accent/30 hover:bg-accent/10 bg-transparent"
              >
                Admin Portal
              </Button>
            </Link>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Stats Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-black tracking-tight mb-8">League Statistics</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Teams</CardTitle>
                <Users className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-accent">{teams?.length || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Active in competition</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border-emerald-500/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Matches Played</CardTitle>
                <Target className="h-4 w-4 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-emerald-400">{matches?.length || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Completed fixtures</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-500/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Goals</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-blue-400">{totalGoals}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {matches?.length ? (totalGoals / matches.length).toFixed(1) : 0} per match
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-500/20 to-amber-500/5 border-amber-500/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">League Leader</CardTitle>
                <Award className="h-4 w-4 text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-black text-amber-400 truncate">{topScorer?.team_name || "TBD"}</div>
                <p className="text-xs text-muted-foreground mt-1">{topScorer?.points || 0} points</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* League Table Preview */}
        {standings && standings.length > 0 && (
          <div className="mb-16">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black tracking-tight">League Standings</h2>
                <p className="mt-1 text-muted-foreground">Top 7 teams in the competition</p>
              </div>
              <Link href="/table">
                <Button variant="ghost" className="font-semibold hover:bg-accent/20 hover:text-accent">
                  View Full Table
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <Card className="overflow-hidden border-accent/30">
              <CardContent className="p-0">
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
                        <th className="px-4 py-3 text-center text-sm font-black">GD</th>
                        <th className="px-4 py-3 text-center text-sm font-black">Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((team, index) => (
                        <tr
                          key={team.id}
                          className={`border-b border-border/50 transition-colors hover:bg-accent/10 ${
                            index === 0 ? "bg-accent/20" : ""
                          }`}
                        >
                          <td className="px-4 py-3 font-black">
                            <div className="flex items-center gap-2">
                              {index + 1}
                              {index === 0 && <Trophy className="h-4 w-4 text-accent" />}
                            </div>
                          </td>
                          <td className="px-4 py-3 font-bold">{team.team_name}</td>
                          <td className="px-4 py-3 text-center font-semibold">{team.played}</td>
                          <td className="px-4 py-3 text-center font-semibold text-accent">{team.won}</td>
                          <td className="px-4 py-3 text-center font-semibold">{team.drawn}</td>
                          <td className="px-4 py-3 text-center font-semibold">{team.lost}</td>
                          <td className="px-4 py-3 text-center font-semibold">{team.goal_difference}</td>
                          <td className="px-4 py-3 text-center">
                            <Badge
                              className={`font-black ${index === 0 ? "bg-accent text-accent-foreground" : "bg-muted"}`}
                            >
                              {team.points}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* News Section */}
        <div className="mb-16">
          <div className="mb-8 flex items-center gap-3">
            <Newspaper className="h-8 w-8 text-accent" />
            <div>
              <h2 className="text-3xl font-black tracking-tight">Latest News</h2>
              <p className="mt-1 text-muted-foreground">Updates from the league</p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group overflow-hidden transition-all hover:shadow-lg hover:border-accent/50">
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5">
                <img
                  src="/football-match-action.png"
                  alt="News"
                  className="h-full w-full object-cover opacity-60 transition-transform group-hover:scale-105"
                />
                <Badge className="absolute right-4 top-4 bg-accent text-accent-foreground">Latest</Badge>
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">
                  {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
                <h3 className="text-xl font-black mb-2">Season 2025 Kicks Off</h3>
                <p className="text-sm text-muted-foreground">
                  The Seeta League 2025 season has officially begun with exciting matches and fierce competition among
                  all participating teams.
                </p>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden transition-all hover:shadow-lg hover:border-accent/50">
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-500/20 to-emerald-500/5">
                <img
                  src="/football-stadium-pitch.jpg"
                  alt="News"
                  className="h-full w-full object-cover opacity-60 transition-transform group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">
                  {new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h3 className="text-xl font-black mb-2">New Teams Join Competition</h3>
                <p className="text-sm text-muted-foreground">
                  Several new teams have registered for this season, bringing fresh talent and increasing the level of
                  competition in the league.
                </p>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden transition-all hover:shadow-lg hover:border-accent/50">
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500/20 to-blue-500/5">
                <img
                  src="/football-league-table-trophy.jpg"
                  alt="News"
                  className="h-full w-full object-cover opacity-60 transition-transform group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">
                  {new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h3 className="text-xl font-black mb-2">Championship Format Announced</h3>
                <p className="text-sm text-muted-foreground">
                  The league has announced the tournament format with round-robin matches leading to an exciting playoff
                  stage for the top teams.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Latest Results */}
        <div className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Latest Results</h2>
              <p className="mt-1 text-muted-foreground">Recent match outcomes</p>
            </div>
            <Link href="/fixtures">
              <Button variant="ghost" className="font-semibold hover:bg-accent/20 hover:text-accent">
                All Results
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {latestResults && latestResults.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestResults.map((match) => (
                <Card
                  key={match.id}
                  className="group overflow-hidden transition-all hover:shadow-lg hover:border-accent/50"
                >
                  <div className="relative h-32 overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5">
                    <img
                      src="/football-match-action.png"
                      alt="Match"
                      className="h-full w-full object-cover opacity-40 transition-transform group-hover:scale-105"
                    />
                    <Badge className="absolute right-4 top-4 bg-card text-card-foreground">MD {match.match_day}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <p className="mb-4 text-sm font-medium text-muted-foreground">
                      {new Date(match.match_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-lg font-bold">{match.home_team?.name}</p>
                      </div>
                      <div className="px-6 text-center">
                        <p className="text-3xl font-black text-accent">
                          {match.home_score} - {match.away_score}
                        </p>
                      </div>
                      <div className="flex-1 text-right">
                        <p className="text-lg font-bold">{match.away_team?.name}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex h-40 items-center justify-center text-muted-foreground">
                No results yet
              </CardContent>
            </Card>
          )}
        </div>

        {/* Upcoming Fixtures */}
        <div>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Upcoming Fixtures</h2>
              <p className="mt-1 text-muted-foreground">Next scheduled matches</p>
            </div>
            <Link href="/fixtures">
              <Button variant="ghost" className="font-semibold hover:bg-accent/20 hover:text-accent">
                All Fixtures
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {upcomingFixtures && upcomingFixtures.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingFixtures.map((match) => (
                <Card
                  key={match.id}
                  className="group overflow-hidden transition-all hover:shadow-lg hover:border-accent/50"
                >
                  <div className="relative h-32 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                    <img
                      src="/football-stadium-pitch.jpg"
                      alt="Stadium"
                      className="h-full w-full object-cover opacity-50 transition-transform group-hover:scale-105"
                    />
                    <Badge className="absolute right-4 top-4 bg-accent text-accent-foreground">
                      MD {match.match_day}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <p className="mb-4 text-sm font-medium text-muted-foreground">
                      {new Date(match.match_date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      • {match.match_time || "TBD"}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-lg font-bold">{match.home_team?.name}</p>
                      </div>
                      <div className="px-6 text-center">
                        <p className="text-2xl font-black text-muted-foreground">VS</p>
                      </div>
                      <div className="flex-1 text-right">
                        <p className="text-lg font-bold">{match.away_team?.name}</p>
                      </div>
                    </div>
                    {match.venue && (
                      <p className="mt-4 text-sm text-muted-foreground">
                        <span className="font-medium">Venue:</span> {match.venue}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex h-40 items-center justify-center text-muted-foreground">
                No upcoming fixtures
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
