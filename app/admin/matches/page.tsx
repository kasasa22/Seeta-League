import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { MatchesList } from "@/components/admin/matches-list"
import { AddMatchDialog } from "@/components/admin/add-match-dialog"
import { ArrowLeft, Calendar } from "lucide-react"

export default async function MatchesPage() {
  const supabase = await createClient()

  const { data: matches } = await supabase
    .from("matches")
    .select("*, home_team:teams!matches_home_team_id_fkey(name), away_team:teams!matches_away_team_id_fkey(name)")
    .order("match_date", { ascending: true })

  const { data: teams } = await supabase.from("teams").select("*").eq("is_active", true).order("name")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-500 p-2">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Manage Matches</h1>
            </div>
            <p className="text-lg text-slate-300">Schedule and manage fixtures</p>
          </div>
          <Link href="/admin">
            <Button variant="outline" className="gap-2 border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl text-white">All Matches</CardTitle>
            <AddMatchDialog teams={teams || []} />
          </CardHeader>
          <CardContent>
            <MatchesList matches={matches || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
