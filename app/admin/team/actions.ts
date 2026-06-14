'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requirePermission } from '@/lib/rbac'
import { getSelectedSeason } from '@/lib/seasons'

async function currentSeason() {
  return await getSelectedSeason()
}

export async function registerTeam(formData: FormData) {
  const user = await requirePermission('register_team')
  const season = await currentSeason()
  if (!season) return { ok: false, message: 'No active season' }

  const name = String(formData.get('name') ?? '').trim()
  if (!name) return { ok: false, message: 'Team name is required' }

  const campus = String(formData.get('campus') ?? '').trim()
  if (!campus) return { ok: false, message: 'Campus is required' }

  const yearRaw = formData.get('year')
  const year = yearRaw ? Number.parseInt(String(yearRaw), 10) : null
  if (!year) return { ok: false, message: 'Year is required' }

  const supabase = await createClient()

  const { data: existing } = await supabase
    .from('teams')
    .select('id')
    .eq('captain_id', user.id)
    .eq('season_id', season.id)
    .maybeSingle()
  if (existing) return { ok: false, message: 'You already registered a team this season' }

  const { error } = await supabase.from('teams').insert({
    name,
    campus,
    year,
    representative_name: String(formData.get('representative_name') ?? '') || user.full_name,
    contact_phone: String(formData.get('contact_phone') ?? '') || null,
    contact_email: String(formData.get('contact_email') ?? '') || user.email,
    logo_url: String(formData.get('logo_url') ?? '') || null,
    season_id: season.id,
    captain_id: user.id,
    is_active: true,
  })
  if (error) return { ok: false, message: error.message }

  revalidatePath('/admin/team')
  return { ok: true }
}

export async function registerPlayer(formData: FormData) {
  const user = await requirePermission('register_players')
  const season = await currentSeason()
  if (!season) return { ok: false, message: 'No active season' }

  if (season.registration_deadline) {
    const deadline = new Date(season.registration_deadline)
    const now = new Date()
    if (now > deadline) return { ok: false, message: 'Player registration is closed for this season' }
  }

  const name = String(formData.get('name') ?? '').trim()
  const teamId = String(formData.get('team_id') ?? '')
  const photoUrl = String(formData.get('photo_url') ?? '')
  if (!name) return { ok: false, message: 'Player name is required' }
  if (!photoUrl) return { ok: false, message: 'A passport-size photo is required' }

  const supabase = await createClient()

  const { data: team } = await supabase
    .from('teams')
    .select('id, year')
    .eq('id', teamId)
    .eq('captain_id', user.id)
    .maybeSingle()
  if (!team) return { ok: false, message: 'Team not found for this captain' }

  const jersey = formData.get('jersey_number')
  const { error } = await supabase.from('players').insert({
    name,
    team_id: teamId,
    jersey_number: jersey ? Number.parseInt(String(jersey)) : null,
    position: String(formData.get('position') ?? '') || null,
    year: team.year ?? null,
    contact_phone: String(formData.get('contact_phone') ?? '') || null,
    contact_email: String(formData.get('contact_email') ?? '') || null,
    photo_url: photoUrl,
    season_id: season.id,
    is_active: true,
  })
  if (error) return { ok: false, message: error.message }

  revalidatePath('/admin/team')
  return { ok: true }
}

export async function removePlayer(playerId: string, teamId: string) {
  const user = await requirePermission('register_players')
  const supabase = await createClient()

  const { data: team } = await supabase
    .from('teams')
    .select('id')
    .eq('id', teamId)
    .eq('captain_id', user.id)
    .maybeSingle()
  if (!team) return { ok: false, message: 'Not allowed' }

  await supabase.from('players').delete().eq('id', playerId).eq('team_id', teamId)
  revalidatePath('/admin/team')
  return { ok: true }
}
