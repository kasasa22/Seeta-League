'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, Calendar, Trophy } from 'lucide-react'

interface Match {
  id: string
  home_team: { name: string } | null
  away_team: { name: string } | null
  home_score: number | null
  away_score: number | null
  is_completed: boolean
  match_date: string
  match_time: string | null
  match_day: number
}

interface MatchCenterProps {
  fixtures: Match[]
  results: Match[]
}

const teamImages: Record<string, string> = {
  "godfather's": "/teams/godfathers.png",
  titans: "/teams/titans.png",
  "finest brothers": "/teams/finest.png",
  raptors: "/teams/raptors.png",
  "covid boys": "/teams/covid_boys.png",
  "top bins": "/teams/topbins.png",
  ronavics: "/teams/ronavics.png",
  "super strikers": "/teams/superstrikers.png",
  "losti city": "/teams/losti_city.png",
  "club de chege": "/teams/club_de_shege.png",
}

const getTeamImage = (name: string) => {
  const key = name.toLowerCase()
  return teamImages[key] || `/placeholder.svg?height=32&width=32`
}

function MatchCard({ match, isResult }: { match: Match; isResult: boolean }) {
  const matchDate = new Date(match.match_date)

  return (
    <Card className="overflow-hidden hover:border-emerald-500/50 transition-colors">
      <CardContent className="p-4">
        {/* Match Day & Date */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="text-xs">
            MD {match.match_day}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {matchDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>

        {/* Teams */}
        <div className="space-y-2">
          {/* Home Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <img
                src={match.home_team?.name ? getTeamImage(match.home_team.name) : '/placeholder.svg'}
                alt={match.home_team?.name || 'Home'}
                className="h-6 w-6 rounded-full object-cover flex-shrink-0"
              />
              <span className="text-sm font-semibold truncate">
                {match.home_team?.name || 'TBD'}
              </span>
            </div>
            {isResult && (
              <span className="text-lg font-bold tabular-nums ml-2">
                {match.home_score}
              </span>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <img
                src={match.away_team?.name ? getTeamImage(match.away_team.name) : '/placeholder.svg'}
                alt={match.away_team?.name || 'Away'}
                className="h-6 w-6 rounded-full object-cover flex-shrink-0"
              />
              <span className="text-sm font-semibold truncate">
                {match.away_team?.name || 'TBD'}
              </span>
            </div>
            {isResult && (
              <span className="text-lg font-bold tabular-nums ml-2">
                {match.away_score}
              </span>
            )}
          </div>
        </div>

        {/* Time / Status */}
        <div className="mt-3 pt-3 border-t flex items-center justify-between">
          {isResult ? (
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0">
              Full Time
            </Badge>
          ) : (
            <span className="text-sm font-medium text-muted-foreground">
              {match.match_time || 'Time TBD'}
            </span>
          )}
          <Link href="/fixtures">
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export function MatchCenter({ fixtures, results }: MatchCenterProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Match Center</h2>
            <p className="text-sm text-muted-foreground">Fixtures and results</p>
          </div>
        </div>
        <Link href="/fixtures">
          <Button variant="ghost" size="sm" className="font-semibold">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="results" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="results" className="font-semibold">
            <Trophy className="h-4 w-4 mr-2" />
            Results
          </TabsTrigger>
          <TabsTrigger value="fixtures" className="font-semibold">
            <Calendar className="h-4 w-4 mr-2" />
            Fixtures
          </TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="mt-0">
          {results && results.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.slice(0, 6).map((match) => (
                <MatchCard key={match.id} match={match} isResult={true} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex h-32 items-center justify-center text-muted-foreground">
                No results yet
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="fixtures" className="mt-0">
          {fixtures && fixtures.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {fixtures.slice(0, 6).map((match) => (
                <MatchCard key={match.id} match={match} isResult={false} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex h-32 items-center justify-center text-muted-foreground">
                No upcoming fixtures
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
