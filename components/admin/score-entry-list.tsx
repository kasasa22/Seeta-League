"use client"

import type React from "react"

import type { Match } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Trophy, Calendar } from "lucide-react"

export function ScoreEntryList({ matches }: { matches: Match[] }) {
  const router = useRouter()
  const [updating, setUpdating] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, matchId: string) => {
    e.preventDefault()
    setUpdating(matchId)

    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    const { error } = await supabase
      .from("matches")
      .update({
        home_score: Number.parseInt(formData.get("home_score") as string),
        away_score: Number.parseInt(formData.get("away_score") as string),
        is_completed: true,
      })
      .eq("id", matchId)

    if (error) {
      alert("Error updating score: " + error.message)
    } else {
      router.refresh()
    }
    setUpdating(null)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {matches.map((match) => (
        <Card key={match.id} className="border-slate-700 bg-slate-900/50">
          <CardHeader>
            <div className="mb-2 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-emerald-400" />
              <CardTitle className="text-lg text-white">
                {match.home_team?.name} vs {match.away_team?.name}
              </CardTitle>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Calendar className="h-4 w-4" />
              {new Date(match.match_date).toLocaleDateString()} • Match Day {match.match_day}
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => handleSubmit(e, match.id)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`home-${match.id}`} className="text-slate-300">
                    {match.home_team?.name}
                  </Label>
                  <Input
                    id={`home-${match.id}`}
                    name="home_score"
                    type="number"
                    min="0"
                    required
                    placeholder="0"
                    className="border-slate-700 bg-slate-800 text-center text-2xl font-bold text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`away-${match.id}`} className="text-slate-300">
                    {match.away_team?.name}
                  </Label>
                  <Input
                    id={`away-${match.id}`}
                    name="away_score"
                    type="number"
                    min="0"
                    required
                    placeholder="0"
                    className="border-slate-700 bg-slate-800 text-center text-2xl font-bold text-white"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                disabled={updating === match.id}
              >
                {updating === match.id ? "Updating..." : "Submit Score"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
