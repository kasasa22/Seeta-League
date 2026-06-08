import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'

export default async function ActivityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: activity } = await supabase
    .from('activities')
    .select('id, title, body, cover_image_url, created_at, is_published, activity_images(image_url, caption, sort_order)')
    .eq('id', id)
    .maybeSingle()

  if (!activity || !activity.is_published) notFound()

  const images = ((activity as any).activity_images ?? []).sort(
    (a: any, b: any) => a.sort_order - b.sort_order
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
        <Link href="/activities">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> All activities
          </Button>
        </Link>

        <p className="text-sm text-muted-foreground">{new Date(activity.created_at).toLocaleDateString()}</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight">{activity.title}</h1>

        {activity.cover_image_url && (
          <img src={activity.cover_image_url} alt={activity.title} className="mt-6 w-full rounded-xl object-cover" />
        )}

        {activity.body && <p className="mt-6 whitespace-pre-line leading-relaxed">{activity.body}</p>}

        {images.length > 0 && (
          <div className="mt-8 space-y-6">
            {images.map((img: any, i: number) => (
              <figure key={i}>
                <img src={img.image_url} alt={img.caption ?? ''} className="w-full rounded-xl object-cover" />
                {img.caption && (
                  <figcaption className="mt-2 text-center text-sm text-muted-foreground">{img.caption}</figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
