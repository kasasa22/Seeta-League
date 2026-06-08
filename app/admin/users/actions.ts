'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requirePermission } from '@/lib/rbac'

export async function setUserStatus(userId: string, status: string) {
  await requirePermission('manage_users')
  const supabase = await createClient()
  await supabase.from('profiles').update({ status }).eq('id', userId)
  revalidatePath('/admin/users')
}

export async function assignRole(formData: FormData) {
  await requirePermission('manage_users')
  const userId = String(formData.get('userId'))
  const roleId = String(formData.get('roleId'))
  const teamId = formData.get('teamId') ? String(formData.get('teamId')) : null
  const seasonId = formData.get('seasonId') ? String(formData.get('seasonId')) : null

  const supabase = await createClient()
  await supabase.from('user_roles').insert({
    user_id: userId,
    role_id: roleId,
    team_id: teamId,
    season_id: seasonId,
  })
  revalidatePath('/admin/users')
}

export async function removeUserRole(userRoleId: string) {
  await requirePermission('manage_users')
  const supabase = await createClient()
  await supabase.from('user_roles').delete().eq('id', userRoleId)
  revalidatePath('/admin/users')
}
