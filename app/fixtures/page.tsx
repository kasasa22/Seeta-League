import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"
import { MatchSection } from "@/components/fixtures/match-section"
import { getSelectedSeasonId } from "@/lib/seasons"

export const metadata: Metadata = {
  title: "Fixtures & Results",
  description:
    "Seeta League fixtures and results — upcoming match days, kick-off times and full-time scores from the alumni football championship season.",
  alternates: { canonical: "/fixtures" },
}

export default async function FixturesPage() {
  const supabase = await createClient()
  const seasonId = await getSelectedSeasonId()

  let fixturesQuery = supabase
    .from("matches")
    .select(
      "*, home_team:teams!matches_home_team_id_fkey(name), away_team:teams!matches_away_team_id_fkey(name)"
    )
    .eq("is_completed", false)
    .order("match_date", { ascending: true })
    .order("match_time", { ascending: true, nullsFirst: false })
  if (seasonId) fixturesQuery = fixturesQuery.eq("season_id", seasonId)
  const { data: fixtures } = await fixturesQuery

  let resultsQuery = supabase
    .from("matches")
    .select(
      "*, home_team:teams!matches_home_team_id_fkey(name), away_team:teams!matches_away_team_id_fkey(name)"
    )
    .eq("is_completed", true)
    .order("match_date", { ascending: false })
    .order("match_time", { ascending: false, nullsFirst: true })
  if (seasonId) resultsQuery = resultsQuery.eq("season_id", seasonId)
  const { data: results } = await resultsQuery

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[250px] sm:h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
          <img
            src="/football-match-calendar-schedule.jpg"
            alt="Calendar"
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
              <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-accent" />
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">Fixtures & Results</h1>
                <p className="mt-1 text-sm sm:text-base md:text-lg text-white/90">Match schedule and outcomes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        <Tabs defaultValue="fixtures" className="space-y-6 sm:space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="fixtures" className="font-bold text-sm sm:text-base">
              Upcoming Fixtures
            </TabsTrigger>
            <TabsTrigger value="results" className="font-bold text-sm sm:text-base">
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fixtures">
            {fixtures && fixtures.length > 0 ? (
              <MatchSection matches={fixtures} type="fixtures" />
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
              <MatchSection matches={results} type="results" />
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

