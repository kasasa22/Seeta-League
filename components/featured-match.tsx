import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Clock } from 'lucide-react'

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
  venue: string | null
}

interface FeaturedMatchProps {
  match: Match | null
  type: 'upcoming' | 'result'
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
  return teamImages[key] || `/placeholder.svg?height=80&width=80`
}

export function FeaturedMatch({ match, type }: FeaturedMatchProps) {
  if (!match) {
    return (
      <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white">
        <div className="p-8 text-center">
          <p className="text-white/70">No {type === 'upcoming' ? 'upcoming matches' : 'recent results'}</p>
        </div>
      </Card>
    )
  }

  const matchDate = new Date(match.match_date)
  const isUpcoming = type === 'upcoming'

  return (
    <Card className="relative overflow-hidden border-0">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        <img
          src="/aerial-football-stadium.png"
          alt="Stadium"
          className="h-full w-full object-cover opacity-10 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Badge
            variant={isUpcoming ? 'default' : 'secondary'}
            className={isUpcoming ? 'bg-emerald-500 text-white' : 'bg-white/20 text-white'}
          >
            {isUpcoming ? 'Next Match' : 'Latest Result'}
          </Badge>
          <Badge variant="outline" className="border-white/30 text-white">
            Matchday {match.match_day}
          </Badge>
        </div>

        {/* Teams & Score */}
        <div className="flex items-center justify-between gap-4 sm:gap-8">
          {/* Home Team */}
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white/10 p-2 mb-3 shadow-lg">
              <img
                src={match.home_team?.name ? getTeamImage(match.home_team.name) : '/placeholder.svg'}
                alt={match.home_team?.name || 'Home'}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white truncate max-w-[100px] sm:max-w-[150px]">
              {match.home_team?.name || 'TBD'}
            </h3>
            <span className="text-xs text-white/60 uppercase tracking-wider">Home</span>
          </div>

          {/* Score / VS */}
          <div className="flex-shrink-0 text-center px-4">
            {match.is_completed ? (
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tabular-nums">
                  {match.home_score}
                </span>
                <span className="text-2xl text-white/50">-</span>
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tabular-nums">
                  {match.away_score}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white/80">VS</span>
                <span className="text-xs text-emerald-400 font-semibold mt-1">
                  {match.match_time || 'TBD'}
                </span>
              </div>
            )}
            {match.is_completed && (
              <Badge className="mt-3 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                Full Time
              </Badge>
            )}
          </div>

          {/* Away Team */}
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white/10 p-2 mb-3 shadow-lg">
              <img
                src={match.away_team?.name ? getTeamImage(match.away_team.name) : '/placeholder.svg'}
                alt={match.away_team?.name || 'Away'}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white truncate max-w-[100px] sm:max-w-[150px]">
              {match.away_team?.name || 'TBD'}
            </h3>
            <span className="text-xs text-white/60 uppercase tracking-wider">Away</span>
          </div>
        </div>

        {/* Match Info */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-white/70 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {matchDate.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          {match.match_time && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{match.match_time}</span>
            </div>
          )}
          {match.venue && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="truncate max-w-[200px]">{match.venue}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
