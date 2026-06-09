'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requirePermission } from '@/lib/rbac'
import { getSelectedSeasonId } from '@/lib/seasons'

interface ActivityImageInput {
  url: string
  caption: string
}
interface CreateActivityInput {
  title: string
  body: string
  coverImageUrl: string
  isPublished: boolean
  images: ActivityImageInput[]
}

export async function createActivity(input: CreateActivityInput) {
  const user = await requirePermission('post_news')
  if (!input.title.trim()) return { ok: false, message: 'Title is required' }

  const supabase = await createClient()
  const seasonId = await getSelectedSeasonId()

  const { data: activity, error } = await supabase
    .from('activities')
    .insert({
      season_id: seasonId,
      title: input.title.trim(),
      body: input.body || null,
      cover_image_url: input.coverImageUrl || null,
      author_id: user.id,
      is_published: input.isPublished,
    })
    .select('id')
    .single()
  if (error) return { ok: false, message: error.message }

  if (input.images.length > 0) {
    const rows = input.images.map((img, i) => ({
      activity_id: activity.id,
      image_url: img.url,
      caption: img.caption || null,
      sort_order: i,
    }))
    await supabase.from('activity_images').insert(rows)
  }

  revalidatePath('/admin/activities')
  revalidatePath('/activities')
  return { ok: true }
}

export async function togglePublish(id: string, isPublished: boolean) {
  await requirePermission('post_news')
  const supabase = await createClient()
  await supabase.from('activities').update({ is_published: isPublished }).eq('id', id)
  revalidatePath('/admin/activities')
  revalidatePath('/activities')
  return { ok: true }
}

export async function deleteActivity(id: string) {
  await requirePermission('manage_news')
  const supabase = await createClient()
  await supabase.from('activities').delete().eq('id', id)
  revalidatePath('/admin/activities')
  revalidatePath('/activities')
  return { ok: true }
}
