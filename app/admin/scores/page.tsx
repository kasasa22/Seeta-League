import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { EnhancedScoreEntry } from "@/components/admin/enhanced-score-entry"
import { ArrowLeft, Trophy } from "lucide-react"
import { getSelectedSeasonId } from "@/lib/seasons"
import { requirePermission } from "@/lib/rbac"

export default async function ScoresPage() {
  await requirePermission("enter_scores")
  const supabase = await createClient()
  const seasonId = await getSelectedSeasonId()

  let matchesQuery = supabase
    .from("matches")
    .select("*, home_team:teams!matches_home_team_id_fkey(name), away_team:teams!matches_away_team_id_fkey(name)")
    .eq("is_completed", false)
    .order("match_date", { ascending: true })
  if (seasonId) matchesQuery = matchesQuery.eq("season_id", seasonId)
  const { data: matches } = await matchesQuery

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500 p-2">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Enter Scores</h1>
            </div>
            <p className="text-lg text-slate-300">Update match results</p>
          </div>
          <Link href="/admin">
            <Button variant="outline" className="gap-2 border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Pending Matches</CardTitle>
          </CardHeader>
          <CardContent>
            {matches && matches.length > 0 ? (
              <EnhancedScoreEntry matches={matches} />
            ) : (
              <p className="py-8 text-center text-slate-400">No pending matches to update</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
