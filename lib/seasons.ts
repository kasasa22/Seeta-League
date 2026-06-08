import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"

export const SEASON_COOKIE = "seeta_season"

export interface Season {
  id: string
  name: string
  slug: string
  year: number | null
  kickoff_date: string | null
  registration_deadline: string | null
  venue: string | null
  registration_fee: number | null
  status: string
  is_current: boolean
  champion_team_id: string | null
  runner_up_team_id: string | null
  created_at: string
}

export async function getSeasons(): Promise<Season[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("seasons")
      .select("*")
      .order("year", { ascending: false })
    if (error) return []
    return (data as Season[]) ?? []
  } catch {
    return []
  }
}

export async function getSelectedSeason(): Promise<Season | null> {
  const seasons = await getSeasons()
  if (seasons.length === 0) return null

  const cookieStore = await cookies()
  const slug = cookieStore.get(SEASON_COOKIE)?.value
  if (slug) {
    const match = seasons.find((s) => s.slug === slug)
    if (match) return match
  }

  return seasons.find((s) => s.is_current) ?? seasons[0]
}

export async function getSelectedSeasonId(): Promise<string | null> {
  const season = await getSelectedSeason()
  return season?.id ?? null
}
