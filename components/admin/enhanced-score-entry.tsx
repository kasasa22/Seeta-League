"use client"

import type React from "react"
import type { Match } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Trophy, Calendar, X, Target } from "lucide-react"

interface GoalEvent {
  scorer: string
  assist?: string
}

export function EnhancedScoreEntry({ matches }: { matches: Match[] }) {
  const router = useRouter()
  const [updating, setUpdating] = useState<string | null>(null)
  const [goals, setGoals] = useState<{ [matchId: string]: { home: GoalEvent[], away: GoalEvent[] } }>({})


  const addGoal = (matchId: string, team: 'home' | 'away') => {
    setGoals(prev => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [team]: [...(prev[matchId]?.[team] || []), { scorer: '' }]
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

  const updateGoal = (matchId: string, team: 'home' | 'away', index: number, field: keyof GoalEvent, value: string) => {
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
    const matchGoalsHome = matchGoals?.home || []
    const matchGoalsAway = matchGoals?.away || []

    // Validate that number of goals matches the score
    if (matchGoalsHome.length !== homeScore || matchGoalsAway.length !== awayScore) {
      alert(`Goal details don't match the score. Home: ${homeScore} goals vs ${matchGoalsHome.length} entries, Away: ${awayScore} goals vs ${matchGoalsAway.length} entries`)
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

      const events: Array<{
        match_id: string
        player_id: string
        team_id: string
        event_type: 'goal' | 'assist'
        minute: number | null
        description: string
      }> = []

      const getOrCreatePlayer = async (playerName: string, teamId: string): Promise<string | null> => {
        if (!playerName?.trim()) return null

        const trimmedName = playerName.trim()

        const { data: existingPlayer, error: searchError } = await supabase
          .from('players')
          .select('id')
          .eq('team_id', teamId)
          .ilike('name', trimmedName)
          .limit(1)
          .maybeSingle()

        if (searchError) {
          console.error('Error searching for player:', searchError)
        }

        if (existingPlayer) {
          return existingPlayer.id
        }

        const { data: newPlayer, error: insertError } = await supabase
          .from('players')
          .insert({
            name: trimmedName,
            team_id: teamId,
            jersey_number: null,
            position: null,
            is_active: true
          })
          .select('id')
          .single()

        if (insertError) {
          console.error('Error creating player:', insertError)
          return null
        }

        return newPlayer?.id || null
      }

      for (const goal of matchGoalsHome) {
        if (goal.scorer?.trim()) {
          const scorerPlayerId = await getOrCreatePlayer(goal.scorer, match.home_team_id)
          if (scorerPlayerId) {
            events.push({
              match_id: String(match.id),
              player_id: String(scorerPlayerId),
              team_id: String(match.home_team_id),
              event_type: 'goal' as const,
              minute: null,
              description: goal.scorer.trim()
            })

            if (goal.assist?.trim()) {
              const assistPlayerId = await getOrCreatePlayer(goal.assist, match.home_team_id)
              if (assistPlayerId) {
                events.push({
                  match_id: String(match.id),
                  player_id: String(assistPlayerId),
                  team_id: String(match.home_team_id),
                  event_type: 'assist' as const,
                  minute: null,
                  description: goal.assist.trim()
                })
              }
            }
          }
        }
      }

      for (const goal of matchGoalsAway) {
        if (goal.scorer?.trim()) {
          const scorerPlayerId = await getOrCreatePlayer(goal.scorer, match.away_team_id)
          if (scorerPlayerId) {
            events.push({
              match_id: String(match.id),
              player_id: String(scorerPlayerId),
              team_id: String(match.away_team_id),
              event_type: 'goal' as const,
              minute: null,
              description: goal.scorer.trim()
            })

            if (goal.assist?.trim()) {
              const assistPlayerId = await getOrCreatePlayer(goal.assist, match.away_team_id)
              if (assistPlayerId) {
                events.push({
                  match_id: String(match.id),
                  player_id: String(assistPlayerId),
                  team_id: String(match.away_team_id),
                  event_type: 'assist' as const,
                  minute: null,
                  description: goal.assist.trim()
                })
              }
            }
          }
        }
      }

      if (events.length > 0) {
        console.log('Inserting events:', JSON.stringify(events, null, 2))
        const { data: insertedData, error: eventsError } = await supabase
          .from("match_events")
          .insert(events)
          .select()

        if (eventsError) {
          console.error('Error inserting events:', eventsError)
          throw eventsError
        }
        console.log('Successfully inserted events:', insertedData)
      } else {
        console.warn('No events to insert - check if teams have active players and goals have scorers')
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
        const matchGoals = goals[match.id] || { home: [], away: [] }
        const homeGoals = matchGoals?.home || []
        const awayGoals = matchGoals?.away || []

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
                      value={homeGoals.length}
                      onChange={(e) => {
                        const newScore = parseInt(e.target.value) || 0
                        const currentGoals = homeGoals.length

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
                      value={awayGoals.length}
                      onChange={(e) => {
                        const newScore = parseInt(e.target.value) || 0
                        const currentGoals = awayGoals.length

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
                {(homeGoals.length > 0 || awayGoals.length > 0) && (
                  <>
                    <Separator className="bg-slate-700" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Home Team Goals */}
                      {homeGoals.length > 0 && (
                        <div className="space-y-3">
                          <Label className="text-emerald-400 flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            {match.home_team?.name} Goals
                          </Label>
                          {homeGoals.map((goal, index) => (
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
                              <div>
                                <Label className="text-xs text-slate-400">Scorer</Label>
                                <Input
                                  type="text"
                                  value={goal.scorer || ''}
                                  onChange={(e) => updateGoal(match.id, 'home', index, 'scorer', e.target.value)}
                                  className="border-slate-600 bg-slate-700"
                                  placeholder="Enter scorer name"
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-slate-400">Assist (optional)</Label>
                                <Input
                                  type="text"
                                  value={goal.assist || ''}
                                  onChange={(e) => updateGoal(match.id, 'home', index, 'assist', e.target.value)}
                                  className="border-slate-600 bg-slate-700"
                                  placeholder="Enter assist player name"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Away Team Goals */}
                      {awayGoals.length > 0 && (
                        <div className="space-y-3">
                          <Label className="text-blue-400 flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            {match.away_team?.name} Goals
                          </Label>
                          {awayGoals.map((goal, index) => (
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
                              <div>
                                <Label className="text-xs text-slate-400">Scorer</Label>
                                <Input
                                  type="text"
                                  value={goal.scorer || ''}
                                  onChange={(e) => updateGoal(match.id, 'away', index, 'scorer', e.target.value)}
                                  className="border-slate-600 bg-slate-700"
                                  placeholder="Enter scorer name"
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-slate-400">Assist (optional)</Label>
                                <Input
                                  type="text"
                                  value={goal.assist || ''}
                                  onChange={(e) => updateGoal(match.id, 'away', index, 'assist', e.target.value)}
                                  className="border-slate-600 bg-slate-700"
                                  placeholder="Enter assist player name"
                                />
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