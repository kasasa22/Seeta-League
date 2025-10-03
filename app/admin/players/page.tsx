import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, UserCircle } from "lucide-react"
import { PlayersListComponent } from "@/components/admin/players-list"

export default async function PlayersPage() {
  const supabase = await createClient()

  const { data: players } = await supabase
    .from("players")
    .select("*, team:teams(name)")
    .order("created_at", { ascending: false })

  const { data: teams } = await supabase.from("teams").select("*").eq("is_active", true).order("name")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-cyan-500 p-2">
                <UserCircle className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Manage Players</h1>
            </div>
            <p className="text-slate-300 text-lg">Register and manage player information</p>
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
            <CardTitle className="text-white">Players List</CardTitle>
            <CardDescription className="text-slate-400">View all registered players and add new ones</CardDescription>
          </CardHeader>
          <CardContent>
            <PlayersListComponent players={players || []} teams={teams || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
