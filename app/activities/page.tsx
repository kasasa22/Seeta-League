import Link from 'next/link'
import { ArrowLeft, Newspaper } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getSelectedSeasonId } from '@/lib/seasons'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function ActivitiesPage() {
  const supabase = await createClient()
  const seasonId = await getSelectedSeasonId()

  let query = supabase
    .from('activities')
    .select('id, title, body, cover_image_url, created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
  if (seasonId) query = query.eq('season_id', seasonId)
  const { data: activities } = await query

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[220px] sm:h-[280px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900" />
        <div className="relative z-10 flex h-full flex-col justify-end px-4 sm:px-6 pb-6 sm:pb-8 text-white">
          <div className="mx-auto w-full max-w-7xl">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-3 text-white hover:bg-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Newspaper className="h-8 w-8 sm:h-10 sm:w-10 text-accent" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">Activities</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {activities && activities.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((a) => (
              <Link key={a.id} href={`/activities/${a.id}`} className="group block">
                <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:border-accent/50">
                  {a.cover_image_url && (
                    <div className="h-44 overflow-hidden">
                      <img src={a.cover_image_url} alt={a.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</p>
                    <h3 className="mt-1 text-lg font-bold">{a.title}</h3>
                    {a.body && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{a.body}</p>}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex h-64 items-center justify-center text-muted-foreground">
              No activities posted yet.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
