'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Match {
  id: string
  home_team: { name: string } | null
  away_team: { name: string } | null
  home_score: number | null
  away_score: number | null
  is_completed: boolean
  match_date: string
  match_time: string | null
}

interface MatchTickerProps {
  matches: Match[]
}

const teamImages: Record<string, string> = {
  "godfather's": "/teams/godfathers.png",
  titans: "/teams/titans.png",
  "finest brothers": "/teams/finest.png",
  raptors: "/teams/raptors.png",
  "covid boys": "/teams/covid_boys.png",
  "top bins": "/teams/topbins.png",
  "super strikers": "/teams/superstrikers.png",
  "losti city": "/teams/losti_city.png",
  "club de chege": "/teams/club_de_shege.png",
  allies: "/teams/allies.png",
  kawaago: "/teams/kawaago.png",
  panthers: "/teams/panthers.png",
  pundits: "/teams/pundits.png",
  "the villagers": "/teams/villagers.png",
}

const getTeamImage = (name: string) => {
  const key = name.toLowerCase()
  return teamImages[key] || `/placeholder.svg?height=24&width=24`
}

export function MatchTicker({ matches }: MatchTickerProps) {
  const [isPaused, setIsPaused] = React.useState(false)

  if (!matches || matches.length === 0) {
    return null
  }

  // Duplicate matches for seamless loop
  const tickerMatches = [...matches, ...matches]

  return (
    <div className="bg-muted/50 border-b overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-12">
          <div className="flex-shrink-0 pr-4 border-r mr-4">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Scores
            </span>
          </div>
          <div
            className="flex-1 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className={cn(
                'flex gap-6 animate-ticker-scroll',
                isPaused && 'animate-ticker-paused'
              )}
              style={{
                width: 'max-content',
              }}
            >
              {tickerMatches.map((match, index) => (
                <Link
                  key={`${match.id}-${index}`}
                  href="/fixtures"
                  className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-accent/10 transition-colors flex-shrink-0"
                >
                  {/* Home Team */}
                  <div className="flex items-center gap-1.5">
                    <img
                      src={match.home_team?.name ? getTeamImage(match.home_team.name) : '/placeholder.svg'}
                      alt={match.home_team?.name || 'Home'}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold truncate max-w-[60px]">
                      {match.home_team?.name?.split(' ')[0] || 'TBD'}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-background">
                    {match.is_completed ? (
                      <>
                        <span className="text-sm font-bold tabular-nums">
                          {match.home_score}
                        </span>
                        <span className="text-xs text-muted-foreground">-</span>
                        <span className="text-sm font-bold tabular-nums">
                          {match.away_score}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs font-medium text-muted-foreground">
                        {match.match_time || 'TBD'}
                      </span>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold truncate max-w-[60px]">
                      {match.away_team?.name?.split(' ')[0] || 'TBD'}
                    </span>
                    <img
                      src={match.away_team?.name ? getTeamImage(match.away_team.name) : '/placeholder.svg'}
                      alt={match.away_team?.name || 'Away'}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                  </div>

                  {/* Status Badge */}
                  {match.is_completed && (
                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      FT
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
