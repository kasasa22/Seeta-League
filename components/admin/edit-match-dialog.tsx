"use client"

import { useMemo, useState } from "react"
import type React from "react"

import type { Match } from "@/lib/types"
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
import { Switch } from "@/components/ui/switch"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Settings } from "lucide-react"

export function EditMatchDialog({ match }: { match: Match }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState(match.is_completed)

  const defaultDate = useMemo(() => {
    if (!match.match_date) return ""
    try {
      return new Date(match.match_date).toISOString().split("T")[0]
    } catch {
      return match.match_date
    }
  }, [match.match_date])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (loading) return
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const supabase = createClient()
    const homeScore = Number(formData.get("home_score"))
    const awayScore = Number(formData.get("away_score"))
    const matchDay = Number(formData.get("match_day"))
    const matchDate = formData.get("match_date") as string
    const matchTimeRaw = (formData.get("match_time") as string) || null
    const venue = ((formData.get("venue") as string) || "").trim()

    const { error } = await supabase
      .from("matches")
      .update({
        match_day: Number.isNaN(matchDay) ? match.match_day : matchDay,
        match_date: matchDate || match.match_date,
        match_time: matchTimeRaw && matchTimeRaw.length > 0 ? matchTimeRaw : null,
        venue: venue.length > 0 ? venue : null,
        home_score: Number.isNaN(homeScore) ? match.home_score : homeScore,
        away_score: Number.isNaN(awayScore) ? match.away_score : awayScore,
        is_completed: isCompleted,
      })
      .eq("id", match.id)

    if (error) {
      alert("Error updating match: " + error.message)
    } else {
      setOpen(false)
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={(value) => !loading && setOpen(value)}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Match</DialogTitle>
          <DialogDescription>
            Update fixture details or adjust the final score. Toggle completion to reopen or finalize the match.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="match_day">Match Day</Label>
              <Input
                id="match_day"
                name="match_day"
                type="number"
                min={1}
                defaultValue={match.match_day}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="match_date">Match Date</Label>
              <Input id="match_date" name="match_date" type="date" defaultValue={defaultDate} required />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="match_time">Match Time</Label>
              <Input id="match_time" name="match_time" type="time" defaultValue={match.match_time ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="venue">Venue</Label>
              <Input id="venue" name="venue" placeholder="Stadium" defaultValue={match.venue ?? ""} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="home_score">{match.home_team?.name ?? "Home Team"} Score</Label>
              <Input
                id="home_score"
                name="home_score"
                type="number"
                min={0}
                defaultValue={match.home_score ?? 0}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="away_score">{match.away_team?.name ?? "Away Team"} Score</Label>
              <Input
                id="away_score"
                name="away_score"
                type="number"
                min={0}
                defaultValue={match.away_score ?? 0}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
            <div>
              <Label className="text-sm font-medium">Mark as completed</Label>
              <p className="text-xs text-muted-foreground">
                Turn off to reopen this fixture for future updates.
              </p>
            </div>
            <Switch checked={isCompleted} onCheckedChange={setIsCompleted} />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

