import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { TeamsList } from "@/components/admin/teams-list"
import { AddTeamDialog } from "@/components/admin/add-team-dialog"
import { ArrowLeft, Users } from "lucide-react"

export default async function TeamsPage() {
  const supabase = await createClient()

  const { data: teams } = await supabase.from("teams").select("*").order("name", { ascending: true })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-3 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 sm:space-y-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="rounded-lg bg-blue-500 p-1.5 sm:p-2">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Manage Teams</h1>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-slate-300">Register and manage league teams</p>
          </div>
          <Link href="/admin">
            <Button variant="outline" size="sm" className="gap-2 border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700 w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Dashboard</span>
            </Button>
          </Link>
        </div>

        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl text-white">Registered Teams</CardTitle>
            <AddTeamDialog />
          </CardHeader>
          <CardContent>
            <TeamsList teams={teams || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
