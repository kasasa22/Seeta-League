import Link from 'next/link'
import { ArrowLeft, Newspaper } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { requirePermission } from '@/lib/rbac'
import { ActivitiesManager } from '@/components/coordinator/activities-manager'

export default async function AdminActivitiesPage() {
  await requirePermission('post_news')
  const supabase = await createClient()

  const { data: activities } = await supabase
    .from('activities')
    .select('id, title, is_published, created_at, activity_images(id)')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-4 sm:p-6 pt-20">
      <div className="mx-auto max-w-4xl">
        <Link href="/admin" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Admin
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-lg bg-emerald-500 p-2">
            <Newspaper className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">News &amp; Activities</h1>
            <p className="text-slate-400 text-sm">Post updates with images and captions</p>
          </div>
        </div>

        <ActivitiesManager activities={(activities as any) ?? []} />
      </div>
    </div>
  )
}
