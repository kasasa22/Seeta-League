'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

interface SeasonOption {
  id: string
  name: string
  slug: string
  is_current: boolean
}

export function SeasonSelector() {
  const router = useRouter()
  const [seasons, setSeasons] = React.useState<SeasonOption[]>([])
  const [selected, setSelected] = React.useState<string>('')

  React.useEffect(() => {
    let active = true

    const load = async () => {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('seasons')
          .select('id,name,slug,is_current')
          .order('year', { ascending: false })

        if (!active || !data) return
        setSeasons(data)

        const cookieSlug = document.cookie
          .split('; ')
          .find((c) => c.startsWith('seeta_season='))
          ?.split('=')[1]

        const current =
          data.find((s) => s.slug === cookieSlug) ??
          data.find((s) => s.is_current) ??
          data[0]

        setSelected(current?.slug ?? '')
      } catch {
        if (active) setSeasons([])
      }
    }

    load()
    return () => {
      active = false
    }
  }, [])

  if (seasons.length === 0) return null

  const onChange = (slug: string) => {
    setSelected(slug)
    document.cookie = `seeta_season=${slug}; path=/; max-age=31536000`
    router.refresh()
  }

  return (
    <div className="relative">
      <select
        aria-label="Select season"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'h-9 appearance-none rounded-lg border bg-background pl-3 pr-8 text-sm font-medium',
          'text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-emerald-500/40'
        )}
      >
        {seasons.map((s) => (
          <option key={s.id} value={s.slug}>
            {s.name}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}
