export interface Team {
  id: string
  name: string
  representative_name: string | null
  contact_phone: string | null
  contact_email: string | null
  is_active: boolean
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
  created_at: string
  team?: Team
}
