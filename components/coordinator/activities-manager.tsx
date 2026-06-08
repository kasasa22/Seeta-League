'use client'

import { useState, useTransition } from 'react'
import { Upload, Trash2, Plus, Eye, EyeOff, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { createActivity, togglePublish, deleteActivity } from '@/app/admin/activities/actions'

interface ActivityRow {
  id: string
  title: string
  is_published: boolean
  created_at: string
  activity_images: { id: string }[]
}
interface ImageItem { url: string; caption: string }

async function uploadFile(file: File): Promise<string | null> {
  const fd = new FormData()
  fd.set('file', file)
  const res = await fetch('/api/uploads', { method: 'POST', body: fd })
  const json = await res.json()
  return json.ok ? json.url : null
}

export function ActivitiesManager({ activities }: { activities: ActivityRow[] }) {
  const [isPending, startTransition] = useTransition()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [isPublished, setIsPublished] = useState(true)
  const [images, setImages] = useState<ImageItem[]>([])
  const [uploading, setUploading] = useState(false)

  const onCover = async (file: File | undefined) => {
    if (!file) return
    setUploading(true)
    const url = await uploadFile(file)
    setUploading(false)
    if (url) setCoverUrl(url)
    else toast.error('Upload failed')
  }

  const onAddImage = async (file: File | undefined) => {
    if (!file) return
    setUploading(true)
    const url = await uploadFile(file)
    setUploading(false)
    if (url) setImages((arr) => [...arr, { url, caption: '' }])
    else toast.error('Upload failed')
  }

  const reset = () => {
    setTitle('')
    setBody('')
    setCoverUrl('')
    setImages([])
    setIsPublished(true)
  }

  const onCreate = () => {
    if (!title.trim()) {
      toast.error('Title is required')
      return
    }
    startTransition(async () => {
      const res = await createActivity({ title, body, coverImageUrl: coverUrl, isPublished, images })
      if (res?.ok) {
        toast.success('Activity posted')
        reset()
      } else {
        toast.error(res?.message ?? 'Failed')
      }
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-700 bg-slate-800/50">
        <CardContent className="p-5 space-y-4">
          <h2 className="font-bold text-white">New activity</h2>
          <div className="space-y-2">
            <Label className="text-white">Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} className="border-slate-600 bg-slate-700/50 text-white" />
          </div>
          <div className="space-y-2">
            <Label className="text-white">Body</Label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-slate-600 bg-slate-700/50 p-2 text-sm text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Cover image</Label>
            <div className="flex items-center gap-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-white hover:bg-slate-700">
                <Upload className="h-4 w-4" /> Choose cover
                <input type="file" accept="image/*" className="hidden" onChange={(e) => onCover(e.target.files?.[0])} />
              </label>
              {coverUrl && <img src={coverUrl} alt="cover" className="h-12 w-20 rounded object-cover" />}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Gallery images with captions</Label>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-white hover:bg-slate-700">
              <Plus className="h-4 w-4" /> Add image
              <input type="file" accept="image/*" className="hidden" onChange={(e) => onAddImage(e.target.files?.[0])} />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              {images.map((img, i) => (
                <div key={i} className="relative rounded-md border border-slate-700 bg-slate-700/30 p-2">
                  <button
                    onClick={() => setImages((arr) => arr.filter((_, j) => j !== i))}
                    className="absolute right-1 top-1 rounded bg-slate-900/70 p-1 text-slate-300 hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <img src={img.url} alt="" className="mb-2 h-24 w-full rounded object-cover" />
                  <Input
                    value={img.caption}
                    onChange={(e) =>
                      setImages((arr) => arr.map((it, j) => (j === i ? { ...it, caption: e.target.value } : it)))
                    }
                    placeholder="Caption / subtitle"
                    className="border-slate-600 bg-slate-700/50 text-white text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-200">
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="h-4 w-4 accent-emerald-500" />
            Publish immediately
          </label>

          <Button onClick={onCreate} disabled={isPending || uploading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            {isPending ? 'Posting...' : 'Post Activity'}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-slate-700 bg-slate-800/50">
        <CardContent className="p-5">
          <h2 className="mb-4 font-bold text-white">Posted activities</h2>
          {activities.length === 0 ? (
            <p className="text-slate-400 text-sm">Nothing posted yet.</p>
          ) : (
            <div className="space-y-2">
              {activities.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-md bg-slate-700/40 px-3 py-2">
                  <div>
                    <p className="text-sm font-semibold text-white">{a.title}</p>
                    <p className="text-xs text-slate-400">
                      {a.activity_images?.length ?? 0} images · {new Date(a.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={a.is_published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-600 text-white'}>
                      {a.is_published ? 'Published' : 'Draft'}
                    </Badge>
                    <button
                      onClick={() => startTransition(async () => { await togglePublish(a.id, !a.is_published) })}
                      disabled={isPending}
                      className="text-slate-400 hover:text-white"
                    >
                      {a.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => startTransition(async () => { await deleteActivity(a.id) })}
                      disabled={isPending}
                      className="text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
