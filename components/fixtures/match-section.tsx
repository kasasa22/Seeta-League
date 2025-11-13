"use client"

import { useMemo, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Filter } from "lucide-react"

type MatchSectionProps = {
  matches: Array<{
    id: string
    match_day: number
    match_date: string
    match_time: string | null
    venue: string | null
    home_score: number | null
    away_score: number | null
    home_team?: { name: string }
    away_team?: { name: string }
  }>
  type: "fixtures" | "results"
  getTeamImage?: (teamName: string) => string
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

const defaultGetTeamImage = (name: string) => {
  const key = name.toLowerCase()
  return teamImages[key] || `/football-team-logo-.jpg?height=60&width=60&query=${encodeURIComponent(name)}+football+team`
}

export function MatchSection({ matches, type, getTeamImage = defaultGetTeamImage }: MatchSectionProps) {
  const matchDays = useMemo(
    () => Array.from(new Set(matches.map((match) => match.match_day))).sort((a, b) => a - b),
    [matches]
  )

  const [selectedDay, setSelectedDay] = useState<string>("all")

  const dayGroups = useMemo(() => {
    return matches.reduce<Record<number, typeof matches>>((acc, match) => {
      if (!acc[match.match_day]) acc[match.match_day] = []
      acc[match.match_day].push(match)
      return acc
    }, {})
  }, [matches])

  const daysToRender = selectedDay === "all" ? matchDays : matchDays.filter((day) => day.toString() === selectedDay)

  if (!matches.length) {
    return (
      <Card>
        <CardContent className="flex h-64 items-center justify-center text-muted-foreground">
          No matches available
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>Filter by match day</span>
        </div>
        <Select value={selectedDay} onValueChange={setSelectedDay}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Match day" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Match Days</SelectItem>
            {matchDays.map((day) => (
              <SelectItem key={day} value={day.toString()}>
                Match Day {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-8">
        {daysToRender.map((day) => (
          <div key={day} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold">Match Day {day}</h3>
              <Badge variant="outline">{dayGroups[day]?.length ?? 0} matches</Badge>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {dayGroups[day]?.map((match) => (
                <MatchCard key={match.id} match={match} type={type} getTeamImage={getTeamImage} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MatchCard({
  match,
  type,
  getTeamImage,
}: {
  match: MatchSectionProps["matches"][number]
  type: MatchSectionProps["type"]
  getTeamImage: (teamName: string) => string
}) {
  const matchDate = new Date(match.match_date)
  const dateLabel = matchDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  const homeName = match.home_team?.name ?? "Home Team"
  const awayName = match.away_team?.name ?? "Away Team"

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:border-accent/50">
      <div
        className={`relative h-40 overflow-hidden bg-gradient-to-br ${
          type === "results" ? "from-accent/20 to-accent/5" : "from-muted to-muted/50"
        }`}
      >
        <img
          src={type === "results" ? "/football-match-celebration-action.jpg" : "/football-stadium-empty-pitch.jpg"}
          alt={type === "results" ? "Match" : "Stadium"}
          className="h-full w-full object-cover opacity-60 transition-transform group-hover:scale-105"
        />
        <Badge className="absolute left-4 top-4 bg-accent text-accent-foreground font-bold">Match Day {match.match_day}</Badge>
        {type === "results" && (
          <Badge className="absolute right-4 top-4 bg-accent text-accent-foreground font-bold">Full Time</Badge>
        )}
      </div>
      <CardContent className="p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="font-medium">{dateLabel}</span>
          {match.match_time && (
            <>
              <span className="text-muted-foreground/60">•</span>
              <span className="font-medium">
                {(() => {
                  const [hours, minutes] = match.match_time.split(":")
                  const hour = parseInt(hours, 10)
                  const ampm = hour >= 12 ? "PM" : "AM"
                  const displayHour = hour % 12 || 12
                  return `${displayHour}:${minutes} ${ampm}`
                })()}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <TeamBadge name={homeName} align="start" getTeamImage={getTeamImage} />
          <div className="px-2 sm:px-6 text-center flex-shrink-0">
            <p className="text-xl sm:text-2xl font-black text-muted-foreground">
              {type === "results" ? (
                <span className="text-accent">
                  {match.home_score} - {match.away_score}
                </span>
              ) : (
                "VS"
              )}
            </p>
          </div>
          <TeamBadge name={awayName} align="end" getTeamImage={getTeamImage} />
        </div>

        {match.venue && (
          <div className="mt-4 rounded-md bg-muted px-3 py-2 text-xs sm:text-sm">
            <span className="font-semibold">Venue:</span> {match.venue}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function TeamBadge({
  name,
  align,
  getTeamImage,
}: {
  name: string
  align: "start" | "end"
  getTeamImage: (teamName: string) => string
}) {
  const imageSrc = getTeamImage(name)

  return (
    <div className={`flex flex-1 ${align === "end" ? "flex-row-reverse" : "flex-row"} items-center gap-2 min-w-0`}>
      <img src={imageSrc} alt={name} className="h-10 w-10 rounded-full object-cover" />
      <p className="text-base sm:text-xl font-black truncate">{name}</p>
    </div>
  )
}

