import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"

export default async function FixturesPage() {
  const supabase = await createClient()

  const { data: fixtures } = await supabase
    .from("matches")
    .select("*, home_team:teams!matches_home_team_id_fkey(name), away_team:teams!matches_away_team_id_fkey(name)")
    .eq("is_completed", false)
    .order("match_date", { ascending: true })

  const { data: results } = await supabase
    .from("matches")
    .select("*, home_team:teams!matches_home_team_id_fkey(name), away_team:teams!matches_away_team_id_fkey(name)")
    .eq("is_completed", true)
    .order("match_date", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
          <img
            src="/football-match-calendar-schedule.jpg"
            alt="Calendar"
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
              <Calendar className="h-10 w-10 text-accent" />
              <div>
                <h1 className="text-5xl font-black tracking-tight">Fixtures & Results</h1>
                <p className="mt-1 text-lg text-white/90">Match schedule and outcomes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <Tabs defaultValue="fixtures" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="fixtures" className="font-bold">
              Upcoming Fixtures
            </TabsTrigger>
            <TabsTrigger value="results" className="font-bold">
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fixtures">
            {fixtures && fixtures.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {fixtures.map((match) => (
                  <Card
                    key={match.id}
                    className="group overflow-hidden transition-all hover:shadow-lg hover:border-accent/50"
                  >
                    <div className="relative h-40 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                      <img
                        src="/football-stadium-empty-pitch.jpg"
                        alt="Stadium"
                        className="h-full w-full object-cover opacity-60 transition-transform group-hover:scale-105"
                      />
                      <Badge className="absolute left-4 top-4 bg-accent text-accent-foreground font-bold">
                        Match Day {match.match_day}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">
                          {new Date(match.match_date).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        {match.match_time && (
                          <>
                            <span>•</span>
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">{match.match_time}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-xl font-black">{match.home_team?.name}</p>
                        </div>
                        <div className="px-6 text-center">
                          <p className="text-2xl font-black text-muted-foreground">VS</p>
                        </div>
                        <div className="flex-1 text-right">
                          <p className="text-xl font-black">{match.away_team?.name}</p>
                        </div>
                      </div>
                      {match.venue && (
                        <div className="mt-4 rounded-md bg-muted px-3 py-2 text-sm">
                          <span className="font-semibold">Venue:</span> {match.venue}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex h-64 items-center justify-center text-muted-foreground">
                  No upcoming fixtures
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="results">
            {results && results.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {results.map((match) => (
                  <Card
                    key={match.id}
                    className="group overflow-hidden transition-all hover:shadow-lg hover:border-accent/50"
                  >
                    <div className="relative h-40 overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5">
                      <img
                        src="/football-match-celebration-action.jpg"
                        alt="Match"
                        className="h-full w-full object-cover opacity-50 transition-transform group-hover:scale-105"
                      />
                      <Badge className="absolute left-4 top-4 bg-card text-card-foreground font-bold">
                        Match Day {match.match_day}
                      </Badge>
                      <Badge className="absolute right-4 top-4 bg-accent text-accent-foreground font-bold">
                        Full Time
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <p className="mb-4 text-sm font-medium text-muted-foreground">
                        {new Date(match.match_date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-xl font-black">{match.home_team?.name}</p>
                        </div>
                        <div className="px-6 text-center">
                          <p className="text-4xl font-black text-accent">
                            {match.home_score} - {match.away_score}
                          </p>
                        </div>
                        <div className="flex-1 text-right">
                          <p className="text-xl font-black">{match.away_team?.name}</p>
                        </div>
                      </div>
                      {match.venue && (
                        <div className="mt-4 rounded-md bg-muted px-3 py-2 text-sm">
                          <span className="font-semibold">Venue:</span> {match.venue}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex h-64 items-center justify-center text-muted-foreground">
                  No results yet
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
