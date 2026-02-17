'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Users, ArrowRight } from 'lucide-react'

interface Team {
  id: string
  name: string
}

interface TeamsCarouselProps {
  teams: Team[]
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
  allies: "/teams/allies.png",
}

const getTeamImage = (name: string) => {
  const key = name.toLowerCase()
  return teamImages[key] || `/placeholder.svg?height=64&width=64`
}

export function TeamsCarousel({ teams }: TeamsCarouselProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  React.useEffect(() => {
    checkScroll()
    const ref = scrollRef.current
    if (ref) {
      ref.addEventListener('scroll', checkScroll)
      return () => ref.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  if (!teams || teams.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Teams</h2>
            <p className="text-sm text-muted-foreground">All participating teams</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Link href="/teams" className="hidden sm:block">
            <Button variant="ghost" size="sm" className="font-semibold ml-2">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {teams.map((team) => (
          <Link
            key={team.id}
            href={`/teams/${team.id}`}
            className="snap-start"
          >
            <Card className="flex-shrink-0 w-32 sm:w-40 p-4 hover:border-emerald-500/50 hover:shadow-lg transition-all group">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted p-2 mb-3 group-hover:scale-105 transition-transform">
                  <img
                    src={getTeamImage(team.name)}
                    alt={team.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-bold truncate w-full">
                  {team.name}
                </h3>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <Link href="/teams" className="block sm:hidden">
        <Button variant="outline" className="w-full">
          View All Teams
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}
