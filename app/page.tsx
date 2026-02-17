import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import {
  Trophy,
  Calendar,
  Users,
  ArrowRight,
  TrendingUp,
  Target,
  Award,
  Newspaper,
} from "lucide-react"
import { MatchTicker } from "@/components/match-ticker"
import { FeaturedMatch } from "@/components/featured-match"
import { MatchCenter } from "@/components/match-center"
import { TeamsCarousel } from "@/components/teams-carousel"

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch all recent matches for ticker (both completed and upcoming)
  const { data: tickerMatches } = await supabase
    .from("matches")
    .select(
      "*, home_team:teams!matches_home_team_id_fkey(name), away_team:teams!matches_away_team_id_fkey(name)"
    )
    .order("match_date", { ascending: false })
    .limit(10)

  // Fetch latest results
  const { data: latestResults } = await supabase
    .from("matches")
    .select(
      "*, home_team:teams!matches_home_team_id_fkey(name), away_team:teams!matches_away_team_id_fkey(name)"
    )
    .eq("is_completed", true)
    .order("match_date", { ascending: false })
    .limit(6)

  // Fetch upcoming fixtures
  const { data: upcomingFixtures } = await supabase
    .from("matches")
    .select(
      "*, home_team:teams!matches_home_team_id_fkey(name), away_team:teams!matches_away_team_id_fkey(name)"
    )
    .eq("is_completed", false)
    .order("match_date", { ascending: true })
    .limit(6)

  // Fetch league standings
  const { data: standings } = await supabase
    .from("league_standings")
    .select("*")
    .limit(5)

  // Fetch all teams
  const { data: teams } = await supabase.from("teams").select("*")

  // Fetch stats
  const { data: matches } = await supabase
    .from("matches")
    .select("*", { count: "exact" })
    .eq("is_completed", true)

  // Calculate total goals
  const { data: allMatches } = await supabase
    .from("matches")
    .select("home_score, away_score")
    .eq("is_completed", true)
  const totalGoals =
    allMatches?.reduce(
      (sum, match) => sum + (match.home_score || 0) + (match.away_score || 0),
      0
    ) || 0

  // Get top scorer
  const topTeam = standings?.[0]

  // Get featured match (next upcoming or latest result)
  const featuredUpcoming = upcomingFixtures?.[0] || null
  const featuredResult = latestResults?.[0] || null

  // Get top scorers
  let topScorers = null
  try {
    const { data: scorersData } = await supabase
      .from("top_scorers")
      .select("*")
      .limit(5)
    topScorers = scorersData
  } catch {
    // View not available
  }

  // Fetch latest news/blogs
  const { data: latestNews } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(3)

  const teamImages: Record<string, string> = {
    "godfather's": "/teams/godfathers.png",
    titans: "/teams/titans.png",
    "finest brothers": "/teams/finest.png",
    raptors: "/teams/raptors.png",
    "covid boys": "/teams/covid_boys.png",
    "top bins": "/teams/topbins.png",
    ronavics: "/teams/ronavics.png",
    "super strikers": "/teams/superstrikers.png",
    "losti city": "/teams/losti_city.png",
    "club de chege": "/teams/club_de_shege.png",
  }

  const getTeamImage = (name: string) => {
    const key = name.toLowerCase()
    return teamImages[key] || `/placeholder.svg?height=40&width=40`
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Match Ticker */}
      <MatchTicker matches={tickerMatches || []} />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
          <img
            src="/aerial-football-stadium.png"
            alt="Stadium"
            className="h-full w-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left: Branding */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-6 flex justify-center lg:justify-start">
                <Image
                  src="/logo.jpg"
                  alt="Seeta League Logo"
                  width={120}
                  height={120}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-2xl ring-4 ring-white/20"
                  priority
                />
              </div>
              <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                Season 2025
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
                SEETA LEAGUE
              </h1>
              <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-md mx-auto lg:mx-0">
                Alumni Football Championship - Where legends reunite on the
                pitch
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-8">
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-black text-emerald-400">
                    {teams?.length || 0}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-white/60">
                    Teams
                  </p>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-black text-emerald-400">
                    {matches?.length || 0}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-white/60">
                    Matches
                  </p>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-black text-emerald-400">
                    {totalGoals}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-white/60">
                    Goals
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link href="/table">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
                  >
                    <Trophy className="mr-2 h-5 w-5" />
                    View Standings
                  </Button>
                </Link>
                <Link href="/fixtures">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white/30 bg-white/10 text-white hover:bg-white/20 font-semibold"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    All Fixtures
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Featured Match */}
            <div className="flex-1 w-full max-w-lg">
              <FeaturedMatch
                match={featuredUpcoming || featuredResult}
                type={featuredUpcoming ? "upcoming" : "result"}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Match Center */}
        <section>
          <MatchCenter
            fixtures={upcomingFixtures || []}
            results={latestResults || []}
          />
        </section>

        {/* League Table & Stats */}
        <section className="grid gap-8 lg:grid-cols-3">
          {/* League Table */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500" />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                    Standings
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Top 5 teams
                  </p>
                </div>
              </div>
              <Link href="/table">
                <Button variant="ghost" size="sm" className="font-semibold">
                  Full Table
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {standings && standings.length > 0 ? (
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full min-w-[500px]">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-bold w-10">
                            #
                          </th>
                          <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-bold">
                            Team
                          </th>
                          <th className="px-2 sm:px-4 py-3 text-center text-xs sm:text-sm font-bold w-8">
                            P
                          </th>
                          <th className="px-2 sm:px-4 py-3 text-center text-xs sm:text-sm font-bold w-8">
                            W
                          </th>
                          <th className="px-2 sm:px-4 py-3 text-center text-xs sm:text-sm font-bold w-8">
                            D
                          </th>
                          <th className="px-2 sm:px-4 py-3 text-center text-xs sm:text-sm font-bold w-8">
                            L
                          </th>
                          <th className="px-2 sm:px-4 py-3 text-center text-xs sm:text-sm font-bold w-10">
                            GD
                          </th>
                          <th className="px-2 sm:px-4 py-3 text-center text-xs sm:text-sm font-bold w-12">
                            Pts
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {standings.map((team, index) => (
                          <tr
                            key={team.id}
                            className={`border-b transition-colors hover:bg-muted/30 ${
                              index === 0 ? "bg-emerald-500/10" : ""
                            }`}
                          >
                            <td className="px-2 sm:px-4 py-3 font-bold">
                              <div className="flex items-center gap-1 sm:gap-2">
                                {index + 1}
                                {index === 0 && (
                                  <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" />
                                )}
                              </div>
                            </td>
                            <td className="px-2 sm:px-4 py-3">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <img
                                  src={getTeamImage(team.team_name)}
                                  alt={team.team_name}
                                  className="h-6 w-6 sm:h-8 sm:w-8 rounded-full object-cover flex-shrink-0"
                                />
                                <span className="font-semibold text-sm sm:text-base truncate max-w-[100px] sm:max-w-none">
                                  {team.team_name}
                                </span>
                              </div>
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-center text-sm">
                              {team.played}
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-center text-emerald-500 font-semibold text-sm">
                              {team.won}
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-center text-sm">
                              {team.drawn}
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-center text-sm">
                              {team.lost}
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-center text-sm">
                              {team.goal_difference}
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-center">
                              <Badge
                                className={`text-xs sm:text-sm ${
                                  index === 0
                                    ? "bg-emerald-500 text-white"
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
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex h-40 items-center justify-center text-muted-foreground">
                  No standings data yet
                </CardContent>
              </Card>
            )}
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats Cards */}
            <Card className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border-emerald-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Award className="h-4 w-4 text-emerald-500" />
                  League Leader
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  {topTeam && (
                    <>
                      <img
                        src={getTeamImage(topTeam.team_name)}
                        alt={topTeam.team_name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold text-lg">{topTeam.team_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {topTeam.points} points
                        </p>
                      </div>
                    </>
                  )}
                  {!topTeam && (
                    <p className="text-muted-foreground">TBD</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Season Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Matches</span>
                  <span className="font-bold">{matches?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Goals</span>
                  <span className="font-bold">{totalGoals}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Goals/Match</span>
                  <span className="font-bold">
                    {matches?.length
                      ? (totalGoals / matches.length).toFixed(1)
                      : 0}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Top Scorers */}
            {topScorers && topScorers.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Target className="h-4 w-4 text-emerald-500" />
                    Top Scorers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topScorers.slice(0, 3).map((scorer, index) => (
                      <div
                        key={scorer.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                              index === 0
                                ? "bg-emerald-500/20 text-emerald-500"
                                : "bg-muted"
                            }`}
                          >
                            {index + 1}
                          </span>
                          <div>
                            <p className="text-sm font-semibold">
                              {scorer.player_name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {scorer.team_name}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-emerald-500">
                          {scorer.goals}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Latest News */}
        {latestNews && latestNews.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Newspaper className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500" />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                    Latest News
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Match reports and updates
                  </p>
                </div>
              </div>
              <Link href="/news">
                <Button variant="ghost" size="sm" className="font-semibold">
                  All News
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestNews.map((news: any, index: number) => (
                <Link key={news.id} href={`/news/${news.id}`}>
                  <Card className="group overflow-hidden h-full hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={news.image_url || "/football-match-action.png"}
                        alt={news.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {index === 0 && (
                        <Badge className="absolute top-3 right-3 bg-emerald-500 text-white">
                          Latest
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground mb-2">
                        {new Date(news.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <h3 className="font-bold line-clamp-2 group-hover:text-emerald-500 transition-colors mb-2">
                        {news.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {news.body.replace(/<[^>]*>/g, "").substring(0, 100)}...
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Teams Carousel */}
        <section>
          <TeamsCarousel teams={teams || []} />
        </section>
      </div>
    </div>
  )
}
