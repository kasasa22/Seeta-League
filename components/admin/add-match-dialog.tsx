"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { Team } from "@/lib/types"

export function AddMatchDialog({ teams }: { teams: Team[] }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [homeTeam, setHomeTeam] = useState("")
  const [awayTeam, setAwayTeam] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    const { error } = await supabase.from("matches").insert({
      match_day: Number.parseInt(formData.get("match_day") as string),
      home_team_id: homeTeam,
      away_team_id: awayTeam,
      match_date: formData.get("date") as string,
      match_time: formData.get("time") as string,
      venue: formData.get("venue") as string,
    })

    if (error) {
      alert("Error scheduling match: " + error.message)
    } else {
      setOpen(false)
      setHomeTeam("")
      setAwayTeam("")
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Match
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule New Match</DialogTitle>
          <DialogDescription>Create a new fixture</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="match_day">Match Day *</Label>
            <Input id="match_day" name="match_day" type="number" min="1" required />
          </div>
          <div className="space-y-2">
            <Label>Home Team *</Label>
            <Select value={homeTeam} onValueChange={setHomeTeam} required>
              <SelectTrigger>
                <SelectValue placeholder="Select home team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id} disabled={team.id === awayTeam}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Away Team *</Label>
            <Select value={awayTeam} onValueChange={setAwayTeam} required>
              <SelectTrigger>
                <SelectValue placeholder="Select away team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id} disabled={team.id === homeTeam}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Match Date *</Label>
            <Input id="date" name="date" type="date" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Match Time</Label>
            <Input id="time" name="time" type="time" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="venue">Venue</Label>
            <Input id="venue" name="venue" placeholder="e.g., Main Field" />
          </div>
          <Button type="submit" className="w-full" disabled={loading || !homeTeam || !awayTeam}>
            {loading ? "Scheduling..." : "Schedule Match"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
