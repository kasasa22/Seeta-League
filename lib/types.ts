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

export interface Team {
  id: string
  name: string
  campus: string | null
  year: number | null
  representative_name: string | null
  contact_phone: string | null
  contact_email: string | null
  is_active: boolean
  season_id: string | null
  logo_url: string | null
  captain_id: string | null
  created_at: string
}

export interface Match {
  id: string
  match_day: number
  home_team_id: string
  away_team_id: string
  match_date: string
  match_time: string | null
  venue: string | null
  home_score: number | null
  away_score: number | null
  is_completed: boolean
  season_id: string | null
  created_at: string
  home_team?: Team
  away_team?: Team
}

export interface LeagueStanding {
  id: string
  team_name: string
  played: number
  won: number
  drawn: number
  lost: number
  goals_for: number
  goals_against: number
  goal_difference: number
  points: number
  season_id: string | null
}

export interface Player {
  id: string
  name: string
  team_id: string
  jersey_number: number | null
  position: string | null
  date_of_birth: string | null
  contact_phone: string | null
  contact_email: string | null
  is_active: boolean
  season_id: string | null
  photo_url: string | null
  created_at: string
  team?: Team
}
