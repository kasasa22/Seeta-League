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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500 p-2">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Manage Teams</h1>
            </div>
            <p className="text-lg text-slate-300">Register and manage league teams</p>
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
            <CardTitle className="text-2xl text-white">Registered Teams</CardTitle>
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
