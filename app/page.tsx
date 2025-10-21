import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Trophy, Calendar, Users, ArrowRight, TrendingUp, Target, Award, Newspaper, Bell, AlertCircle, CheckCircle, MapPin, DollarSign } from "lucide-react"
import Image from "next/image"

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
      <div className="relative h-[500px] sm:h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
          <img
            src="/aerial-football-stadium.png"
            alt="Stadium"
            className="h-full w-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 text-center text-white">
          <div className="mb-4 sm:mb-6">
            <Image 
              src="/logo.jpg" 
              alt="Seeta League Logo" 
              width={150} 
              height={150}
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto drop-shadow-2xl rounded-full"
              priority
            />
          </div>
          <Badge className="mb-3 sm:mb-4 bg-accent text-accent-foreground px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold">Season 2025</Badge>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-balance">SEETA LEAGUE</h1>
          <p className="mt-2 sm:mt-4 text-base sm:text-xl md:text-2xl font-medium text-white/90">Alumni Football Championship</p>
          <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-accent">{teams?.length || 0}</p>
              <p className="mt-1 text-xs sm:text-sm font-medium uppercase tracking-wide text-white/80">Teams</p>
            </div>
            <div className="hidden sm:block h-8 sm:h-12 w-px bg-white/30" />
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-accent">{matches?.length || 0}</p>
              <p className="mt-1 text-xs sm:text-sm font-medium uppercase tracking-wide text-white/80">Matches</p>
            </div>
            <div className="hidden sm:block h-8 sm:h-12 w-px bg-white/30" />
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-accent">{totalGoals}</p>
              <p className="mt-1 text-xs sm:text-sm font-medium uppercase tracking-wide text-white/80">Goals</p>
            </div>
          </div>
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full max-w-md sm:max-w-none px-4 sm:px-0">
            <Link href="/table" className="flex-1 sm:flex-none">
              <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                <Trophy className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                <span className="text-sm sm:text-base">View League Table</span>
              </Button>
            </Link>
            <Link href="/fixtures" className="flex-1 sm:flex-none">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/30 bg-white/10 text-white hover:bg-white/20 font-semibold"
              >
                <Calendar className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                <span className="text-sm sm:text-base">Fixtures & Results</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <nav className="flex items-center justify-between py-3 sm:py-4">
            <div className="flex gap-1 sm:gap-2">
              <Link href="/table">
                <Button variant="ghost" size="sm" className="font-semibold hover:bg-accent/20 hover:text-accent px-2 sm:px-4">
                  <Trophy className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Table</span>
                </Button>
              </Link>
              <Link href="/fixtures">
                <Button variant="ghost" size="sm" className="font-semibold hover:bg-accent/20 hover:text-accent px-2 sm:px-4">
                  <Calendar className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Fixtures</span>
                </Button>
              </Link>
              <Link href="/teams">
                <Button variant="ghost" size="sm" className="font-semibold hover:bg-accent/20 hover:text-accent px-2 sm:px-4">
                  <Users className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Teams</span>
                </Button>
              </Link>
            </div>
            <Link href="/admin">
              <Button
                variant="outline"
                size="sm"
                className="font-semibold border-accent/30 hover:bg-accent/10 bg-transparent text-xs sm:text-sm px-2 sm:px-4"
              >
                <span className="hidden sm:inline">Admin Portal</span>
                <span className="sm:hidden">Admin</span>
              </Button>
            </Link>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Important Announcements */}
        <div className="mb-12 sm:mb-16">
          <div className="mb-6 sm:mb-8 flex items-center gap-3">
            <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-accent animate-pulse" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Important Announcements</h2>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground">League updates and key information</p>
            </div>
          </div>
          
          <div className="grid gap-4 sm:gap-6">
            {/* First Match Day Notice */}
            <Card className="border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="rounded-full bg-accent/20 p-2 sm:p-3">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg sm:text-xl font-black">Season Opening Match Day</h3>
                      <Badge className="bg-accent text-accent-foreground self-start">16 Nov 2025</Badge>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground mb-3">
                      The first outing of Seeta League 2025 kicks off on <strong>16th November 2025</strong>
                    </p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Equinox Sports & Fitness Center, Kulambiro</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Registration Deadline */}
            <Card className="border-destructive/30 bg-gradient-to-br from-destructive/10 to-destructive/5">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="rounded-full bg-destructive/20 p-2 sm:p-3">
                    <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg sm:text-xl font-black">Registration Deadline</h3>
                      <Badge variant="destructive" className="self-start">16 Oct 2025</Badge>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      All teams must complete registration by <strong>16th October 2025</strong> to participate in the league
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fees & Payments */}
            <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="rounded-full bg-blue-500/20 p-2 sm:p-3">
                    <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-black mb-3">Fees & Payments</h3>
                    <div className="space-y-2 text-sm sm:text-base">
                      <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                        <span className="text-muted-foreground">Player Fee (per game day)</span>
                        <span className="font-bold text-blue-400">UGX 8,000</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                        <span className="text-muted-foreground">Team Commitment Fee</span>
                        <span className="font-bold text-blue-400">UGX 50,000</span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                        *Team commitment fee must be paid before fixtures are released
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* League Rules Summary */}
            <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="rounded-full bg-emerald-500/20 p-2 sm:p-3">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-black mb-3">Key Registration Rules</h3>
                    <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span><strong>Eligibility:</strong> Only Seeta High School alumni (+ 2 foreign players allowed per team)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span><strong>Team Size:</strong> Minimum 8 players, maximum 20 players per season</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span><strong>Player Album:</strong> Full team roster with passport photos, years & campus required</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span><strong>Match Frequency:</strong> Games played once a month initially</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span><strong>No Current Students:</strong> Only alumni can participate</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-6 sm:mb-8">League Statistics</h2>
          <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Teams</CardTitle>
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="text-2xl sm:text-3xl font-black text-accent">{teams?.length || 0}</div>
                <p className="text-xs text-muted-foreground mt-1 hidden sm:block">Active in competition</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border-emerald-500/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Matches</CardTitle>
                <Target className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400" />
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">{matches?.length || 0}</div>
                <p className="text-xs text-muted-foreground mt-1 hidden sm:block">Completed fixtures</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-500/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Goals</CardTitle>
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="text-2xl sm:text-3xl font-black text-blue-400">{totalGoals}</div>
                <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
                  {matches?.length ? (totalGoals / matches.length).toFixed(1) : 0} per match
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-500/20 to-amber-500/5 border-amber-500/30 col-span-2 md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">League Leader</CardTitle>
                <Award className="h-3 w-3 sm:h-4 sm:w-4 text-amber-400" />
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="text-lg sm:text-xl font-black text-amber-400 truncate">{topScorer?.team_name || "TBD"}</div>
                <p className="text-xs text-muted-foreground mt-1">{topScorer?.points || 0} points</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* League Table Preview */}
        {standings && standings.length > 0 && (
          <div className="mb-12 sm:mb-16">
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">League Standings</h2>
                <p className="mt-1 text-sm sm:text-base text-muted-foreground">Top 7 teams in the competition</p>
              </div>
              <Link href="/table">
                <Button variant="ghost" size="sm" className="font-semibold hover:bg-accent/20 hover:text-accent self-start">
                  <span className="text-sm">View Full Table</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <Card className="overflow-hidden border-accent/30">
              <CardContent className="p-0">
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-black">Pos</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-black">Team</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-black">P</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-black">W</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-black">D</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-black">L</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-black">GD</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-black">Pts</th>
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
                          <td className="px-2 sm:px-4 py-2 sm:py-3 font-black text-sm">
                            <div className="flex items-center gap-1 sm:gap-2">
                              {index + 1}
                              {index === 0 && <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />}
                            </div>
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 font-bold text-sm">{team.team_name}</td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold text-sm">{team.played}</td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold text-accent text-sm">{team.won}</td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold text-sm">{team.drawn}</td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold text-sm">{team.lost}</td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold text-sm">{team.goal_difference}</td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                            <Badge
                              className={`font-black text-xs sm:text-sm ${index === 0 ? "bg-accent text-accent-foreground" : "bg-muted"}`}
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
        <div className="mb-12 sm:mb-16">
          <div className="mb-6 sm:mb-8 flex items-center gap-3">
            <Newspaper className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Latest News</h2>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground">Updates from the league</p>
            </div>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group overflow-hidden transition-all hover:shadow-lg hover:border-accent/50">
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5">
                <img
                  src="/football-match-action.png"
                  alt="News"
                  className="h-full w-full object-cover opacity-60 transition-transform group-hover:scale-105"
                />
                <Badge className="absolute right-4 top-4 bg-accent text-accent-foreground">Latest</Badge>
              </div>
              <CardContent className="p-4 sm:p-6">
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                  {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
                <h3 className="text-lg sm:text-xl font-black mb-2">Season 2025 Kicks Off</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
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
              <CardContent className="p-4 sm:p-6">
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                  {new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h3 className="text-lg sm:text-xl font-black mb-2">New Teams Join Competition</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
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
              <CardContent className="p-4 sm:p-6">
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                  {new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h3 className="text-lg sm:text-xl font-black mb-2">Championship Format Announced</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  The league has announced the tournament format with round-robin matches leading to an exciting playoff
                  stage for the top teams.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Latest Results */}
        <div className="mb-12 sm:mb-16">
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Latest Results</h2>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground">Recent match outcomes</p>
            </div>
            <Link href="/fixtures">
              <Button variant="ghost" size="sm" className="font-semibold hover:bg-accent/20 hover:text-accent self-start">
                <span className="text-sm">All Results</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {latestResults && latestResults.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  <CardContent className="p-4 sm:p-6">
                    <p className="mb-4 text-xs sm:text-sm font-medium text-muted-foreground">
                      {new Date(match.match_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <div className="flex items-center justify-between gap-2 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-lg font-bold truncate">{match.home_team?.name}</p>
                      </div>
                      <div className="px-2 sm:px-6 text-center flex-shrink-0">
                        <p className="text-2xl sm:text-3xl font-black text-accent whitespace-nowrap">
                          {match.home_score} - {match.away_score}
                        </p>
                      </div>
                      <div className="flex-1 text-right min-w-0">
                        <p className="text-sm sm:text-lg font-bold truncate">{match.away_team?.name}</p>
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
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Upcoming Fixtures</h2>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground">Next scheduled matches</p>
            </div>
            <Link href="/fixtures">
              <Button variant="ghost" size="sm" className="font-semibold hover:bg-accent/20 hover:text-accent self-start">
                <span className="text-sm">All Fixtures</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {upcomingFixtures && upcomingFixtures.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  <CardContent className="p-4 sm:p-6">
                    <p className="mb-4 text-xs sm:text-sm font-medium text-muted-foreground">
                      {new Date(match.match_date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      • {match.match_time || "TBD"}
                    </p>
                    <div className="flex items-center justify-between gap-2 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-lg font-bold truncate">{match.home_team?.name}</p>
                      </div>
                      <div className="px-2 sm:px-6 text-center flex-shrink-0">
                        <p className="text-xl sm:text-2xl font-black text-muted-foreground">VS</p>
                      </div>
                      <div className="flex-1 text-right min-w-0">
                        <p className="text-sm sm:text-lg font-bold truncate">{match.away_team?.name}</p>
                      </div>
                    </div>
                    {match.venue && (
                      <p className="mt-4 text-xs sm:text-sm text-muted-foreground">
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
