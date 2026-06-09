import Link from 'next/link'
import { Newspaper } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { requireAnyPermission, userHasPermission } from '@/lib/rbac'
import { ActivitiesManager } from '@/components/coordinator/activities-manager'

export default async function AdminActivitiesPage() {
  const me = await requireAnyPermission(['post_news', 'manage_news', 'view_news'])
  const canManage = userHasPermission(me, 'post_news') || userHasPermission(me, 'manage_news')
  const supabase = await createClient()

  const { data: activities } = await supabase
    .from('activities')
    .select('id, title, is_published, created_at, activity_images(id)')
    .order('created_at', { ascending: false })

  return (
    <div className="p-4 sm:p-6">
      <div className="">
        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-lg bg-emerald-500 p-2">
            <Newspaper className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">News &amp; Activities</h1>
            <p className="text-slate-400 text-sm">Post updates with images and captions</p>
          </div>
        </div>

        <ActivitiesManager activities={(activities as any) ?? []} canManage={canManage} />
      </div>
    </div>
  )
}
