'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requireAnyPermission } from '@/lib/rbac'

export async function sendMessage(formData: FormData) {
  const user = await requireAnyPermission(['send_rfc', 'respond_rfc'])
  const subject = String(formData.get('subject') ?? '').trim()
  const toRole = String(formData.get('to_role') ?? '').trim()
  if (!subject || !toRole) return { ok: false, message: 'Subject and recipient role are required' }

  const supabase = await createClient()
  const { data: season } = await supabase
    .from('seasons')
    .select('id')
    .eq('is_current', true)
    .maybeSingle()

  const { error } = await supabase.from('messages').insert({
    season_id: season?.id ?? null,
    from_user_id: user.id,
    to_role: toRole,
    subject,
    body: String(formData.get('body') ?? '') || null,
    status: 'open',
  })
  if (error) return { ok: false, message: error.message }

  revalidatePath('/admin/messages')
  return { ok: true }
}

export async function replyMessage(messageId: string, body: string) {
  const user = await requireAnyPermission(['send_rfc', 'respond_rfc'])
  if (!body.trim()) return { ok: false, message: 'Reply cannot be empty' }

  const supabase = await createClient()
  const { error } = await supabase.from('message_replies').insert({
    message_id: messageId,
    author_id: user.id,
    body: body.trim(),
  })
  if (error) return { ok: false, message: error.message }

  revalidatePath('/admin/messages')
  return { ok: true }
}

export async function setMessageStatus(messageId: string, status: string) {
  await requireAnyPermission(['respond_rfc'])
  const supabase = await createClient()
  await supabase.from('messages').update({ status }).eq('id', messageId)
  revalidatePath('/admin/messages')
  return { ok: true }
}
