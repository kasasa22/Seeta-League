"use client"

import type React from "react"
import type { Match } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Trophy, Calendar, Plus, X, Target, Users, AlertCircle } from "lucide-react"

interface Player {
  id: string
  name: string
  jersey_number: number | null
  team_id: string
}

interface GoalEvent {
  player_id: string
  minute: number
  assist_player_id?: string
}

export function EnhancedScoreEntry({ matches }: { matches: Match[] }) {
  const router = useRouter()
  const [updating, setUpdating] = useState<string | null>(null)
  const [players, setPlayers] = useState<{ [teamId: string]: Player[] }>({})
  const [goals, setGoals] = useState<{ [matchId: string]: { home: GoalEvent[], away: GoalEvent[] } }>({})

  useEffect(() => {
    // Load players for all teams in matches
    const loadPlayers = async () => {
      const supabase = createClient()
      const teamIds = new Set<string>()

      matches.forEach(match => {
        if (match.home_team_id) teamIds.add(match.home_team_id)
        if (match.away_team_id) teamIds.add(match.away_team_id)
      })

      const { data: playersData } = await supabase
        .from('players')
        .select('id, name, jersey_number, team_id')
        .in('team_id', Array.from(teamIds))
        .eq('is_active', true)
        .order('jersey_number')

      if (playersData) {
        const playersByTeam: { [teamId: string]: Player[] } = {}
        playersData.forEach(player => {
          if (!playersByTeam[player.team_id]) {
            playersByTeam[player.team_id] = []
          }
          playersByTeam[player.team_id].push(player)
        })
        setPlayers(playersByTeam)
      }
    }

    loadPlayers()
  }, [matches])

  const addGoal = (matchId: string, team: 'home' | 'away') => {
    setGoals(prev => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [team]: [...(prev[matchId]?.[team] || []), { player_id: '', minute: 0 }]
      }
    }))
  }

  const removeGoal = (matchId: string, team: 'home' | 'away', index: number) => {
    setGoals(prev => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [team]: prev[matchId]?.[team]?.filter((_, i) => i !== index) || []
      }
    }))
  }

  const updateGoal = (matchId: string, team: 'home' | 'away', index: number, field: keyof GoalEvent, value: string | number) => {
    setGoals(prev => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [team]: prev[matchId]?.[team]?.map((goal, i) =>
          i === index ? { ...goal, [field]: value } : goal
        ) || []
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, match: Match) => {
    e.preventDefault()
    setUpdating(match.id)

    const formData = new FormData(e.currentTarget)
    const homeScore = Number.parseInt(formData.get("home_score") as string)
    const awayScore = Number.parseInt(formData.get("away_score") as string)

    const matchGoals = goals[match.id] || { home: [], away: [] }

    // Validate that number of goals matches the score
    if (matchGoals.home.length !== homeScore || matchGoals.away.length !== awayScore) {
      alert(`Goal details don't match the score. Home: ${homeScore} goals vs ${matchGoals.home.length} entries, Away: ${awayScore} goals vs ${matchGoals.away.length} entries`)
      setUpdating(null)
      return
    }

    const supabase = createClient()

    try {
      // Update match score
      const { error: matchError } = await supabase
        .from("matches")
        .update({
          home_score: homeScore,
          away_score: awayScore,
          is_completed: true,
        })
        .eq("id", match.id)

      if (matchError) throw matchError

      // Clear existing match events for this match
      await supabase
        .from("match_events")
        .delete()
        .eq("match_id", match.id)

      // Insert goal events
  const events: Array<Record<string, any>> = []

      // Home team goals
      matchGoals.home.forEach(goal => {
        if (goal.player_id) {
          events.push({
            match_id: match.id,
            player_id: goal.player_id,
            team_id: match.home_team_id,
            event_type: 'goal',
            minute: goal.minute || null
          })

          // Add assist if specified
          if (goal.assist_player_id) {
            events.push({
              match_id: match.id,
              player_id: goal.assist_player_id,
              team_id: match.home_team_id,
              event_type: 'assist',
              minute: goal.minute || null
            })
          }
        }
      })

      // Away team goals
      matchGoals.away.forEach(goal => {
        if (goal.player_id) {
          events.push({
            match_id: match.id,
            player_id: goal.player_id,
            team_id: match.away_team_id,
            event_type: 'goal',
            minute: goal.minute || null
          })

          // Add assist if specified
          if (goal.assist_player_id) {
            events.push({
              match_id: match.id,
              player_id: goal.assist_player_id,
              team_id: match.away_team_id,
              event_type: 'assist',
              minute: goal.minute || null
            })
          }
        }
      })

      if (events.length > 0) {
        const { error: eventsError } = await supabase
          .from("match_events")
          .insert(events)

        if (eventsError) throw eventsError
      }

      router.refresh()
    } catch (error: any) {
      alert("Error updating match: " + error.message)
    }

    setUpdating(null)
  }

  return (
    <div className="grid gap-6">
      {matches.map((match) => {
        const homeTeamPlayers = players[match.home_team_id] || []
        const awayTeamPlayers = players[match.away_team_id] || []
        const matchGoals = goals[match.id] || { home: [], away: [] }

        return (
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
              <form onSubmit={(e) => handleSubmit(e, match)} className="space-y-6">
                {/* Score Input */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`home-${match.id}`} className="text-slate-300">
                      {match.home_team?.name} Score
                    </Label>
                    <Input
                      id={`home-${match.id}`}
                      name="home_score"
                      type="number"
                      min="0"
                      required
                      placeholder="0"
                      value={matchGoals.home.length}
                      onChange={(e) => {
                        const newScore = parseInt(e.target.value) || 0
                        const currentGoals = matchGoals.home.length

                        if (newScore > currentGoals) {
                          // Add goals
                          for (let i = currentGoals; i < newScore; i++) {
                            addGoal(match.id, 'home')
                          }
                        } else if (newScore < currentGoals) {
                          // Remove goals
                          setGoals(prev => ({
                            ...prev,
                            [match.id]: {
                              ...prev[match.id],
                              home: prev[match.id]?.home?.slice(0, newScore) || []
                            }
                          }))
                        }
                      }}
                      className="border-slate-700 bg-slate-800 text-center text-2xl font-bold text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`away-${match.id}`} className="text-slate-300">
                      {match.away_team?.name} Score
                    </Label>
                    <Input
                      id={`away-${match.id}`}
                      name="away_score"
                      type="number"
                      min="0"
                      required
                      placeholder="0"
                      value={matchGoals.away.length}
                      onChange={(e) => {
                        const newScore = parseInt(e.target.value) || 0
                        const currentGoals = matchGoals.away.length

                        if (newScore > currentGoals) {
                          // Add goals
                          for (let i = currentGoals; i < newScore; i++) {
                            addGoal(match.id, 'away')
                          }
                        } else if (newScore < currentGoals) {
                          // Remove goals
                          setGoals(prev => ({
                            ...prev,
                            [match.id]: {
                              ...prev[match.id],
                              away: prev[match.id]?.away?.slice(0, newScore) || []
                            }
                          }))
                        }
                      }}
                      className="border-slate-700 bg-slate-800 text-center text-2xl font-bold text-white"
                    />
                  </div>
                </div>

                {/* Goal Details */}
                {(matchGoals.home.length > 0 || matchGoals.away.length > 0) && (
                  <>
                    <Separator className="bg-slate-700" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Home Team Goals */}
                      {matchGoals.home.length > 0 && (
                        <div className="space-y-3">
                          <Label className="text-emerald-400 flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            {match.home_team?.name} Goals
                          </Label>
                          {matchGoals.home.map((goal, index) => (
                            <div key={index} className="space-y-2 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                              <div className="flex items-center justify-between">
                                <Badge variant="outline" className="text-emerald-400">Goal {index + 1}</Badge>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeGoal(match.id, 'home', index)}
                                  className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <Label className="text-xs text-slate-400">Scorer</Label>
                                  <Select
                                    value={goal.player_id}
                                    onValueChange={(value) => updateGoal(match.id, 'home', index, 'player_id', value)}
                                  >
                                    <SelectTrigger className="border-slate-600 bg-slate-700">
                                      <SelectValue placeholder="Select player" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {homeTeamPlayers.map(player => (
                                        <SelectItem key={player.id} value={player.id}>
                                          #{player.jersey_number} {player.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-xs text-slate-400">Minute</Label>
                                  <Input
                                    type="number"
                                    min="0"
                                    max="120"
                                    value={goal.minute}
                                    onChange={(e) => updateGoal(match.id, 'home', index, 'minute', parseInt(e.target.value) || 0)}
                                    className="border-slate-600 bg-slate-700"
                                    placeholder="90"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label className="text-xs text-slate-400">Assist (optional)</Label>
                                <Select
                                  value={goal.assist_player_id || ''}
                                  onValueChange={(value) => updateGoal(match.id, 'home', index, 'assist_player_id', value)}
                                >
                                  <SelectTrigger className="border-slate-600 bg-slate-700">
                                    <SelectValue placeholder="Select assist player" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="">No assist</SelectItem>
                                    {homeTeamPlayers.filter(p => p.id !== goal.player_id).map(player => (
                                      <SelectItem key={player.id} value={player.id}>
                                        #{player.jersey_number} {player.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Away Team Goals */}
                      {matchGoals.away.length > 0 && (
                        <div className="space-y-3">
                          <Label className="text-blue-400 flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            {match.away_team?.name} Goals
                          </Label>
                          {matchGoals.away.map((goal, index) => (
                            <div key={index} className="space-y-2 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                              <div className="flex items-center justify-between">
                                <Badge variant="outline" className="text-blue-400">Goal {index + 1}</Badge>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeGoal(match.id, 'away', index)}
                                  className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <Label className="text-xs text-slate-400">Scorer</Label>
                                  <Select
                                    value={goal.player_id}
                                    onValueChange={(value) => updateGoal(match.id, 'away', index, 'player_id', value)}
                                  >
                                    <SelectTrigger className="border-slate-600 bg-slate-700">
                                      <SelectValue placeholder="Select player" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {awayTeamPlayers.map(player => (
                                        <SelectItem key={player.id} value={player.id}>
                                          #{player.jersey_number} {player.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-xs text-slate-400">Minute</Label>
                                  <Input
                                    type="number"
                                    min="0"
                                    max="120"
                                    value={goal.minute}
                                    onChange={(e) => updateGoal(match.id, 'away', index, 'minute', parseInt(e.target.value) || 0)}
                                    className="border-slate-600 bg-slate-700"
                                    placeholder="90"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label className="text-xs text-slate-400">Assist (optional)</Label>
                                <Select
                                  value={goal.assist_player_id || ''}
                                  onValueChange={(value) => updateGoal(match.id, 'away', index, 'assist_player_id', value)}
                                >
                                  <SelectTrigger className="border-slate-600 bg-slate-700">
                                    <SelectValue placeholder="Select assist player" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="">No assist</SelectItem>
                                    {awayTeamPlayers.filter(p => p.id !== goal.player_id).map(player => (
                                      <SelectItem key={player.id} value={player.id}>
                                        #{player.jersey_number} {player.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                  disabled={updating === match.id}
                >
                  {updating === match.id ? "Updating..." : "Submit Match Result"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}