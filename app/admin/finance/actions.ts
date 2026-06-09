'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requirePermission } from '@/lib/rbac'
import { getSelectedSeasonId } from '@/lib/seasons'

export async function addFinanceRecord(formData: FormData) {
  const user = await requirePermission('manage_finance')
  const supabase = await createClient()

  const seasonId = await getSelectedSeasonId()

  const amount = Number.parseFloat(String(formData.get('amount') ?? ''))
  const type = String(formData.get('type') ?? 'payment')
  if (!Number.isFinite(amount) || amount <= 0) return { ok: false, message: 'Enter a valid amount' }

  const { error } = await supabase.from('finance_records').insert({
    season_id: seasonId,
    type,
    category: String(formData.get('category') ?? '') || null,
    team_id: formData.get('team_id') ? String(formData.get('team_id')) : null,
    amount,
    description: String(formData.get('description') ?? '') || null,
    occurred_on: String(formData.get('occurred_on') ?? '') || undefined,
    recorded_by: user.id,
  })
  if (error) return { ok: false, message: error.message }

  revalidatePath('/admin/finance')
  return { ok: true }
}

export async function deleteFinanceRecord(id: string) {
  await requirePermission('manage_finance')
  const supabase = await createClient()
  await supabase.from('finance_records').delete().eq('id', id)
  revalidatePath('/admin/finance')
  return { ok: true }
}
