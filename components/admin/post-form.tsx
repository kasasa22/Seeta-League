'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

interface PostFormProps {
  onSaved?: () => void
  endpoint: string
  initial?: any
}

export function PostForm({ onSaved, endpoint, initial }: PostFormProps) {
  const [title, setTitle] = useState(initial?.title || '')
  const [body, setBody] = useState(initial?.body || '')
  const [image, setImage] = useState<File | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const uploadImage = async (file: File) => {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/uploads', { method: 'POST', body: fd })
    const j = await res.json()
    if (!res.ok) throw new Error(j.message || 'Upload failed')
    return j.url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      let image_url = initial?.image_url || null
      if (image) image_url = await uploadImage(image)

      const payload = { title, body, image_url, is_published: true }
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const j = await res.json()
      if (!res.ok) throw new Error(j.message || 'Save failed')
      toast.success('Saved')
      onSaved && onSaved()
    } catch (err: any) {
      toast.error(err.message || String(err))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <Label>Body</Label>
        <Textarea value={body} onChange={(e) => setBody(e.target.value)} required rows={6} />
      </div>
      <div>
        <Label>Image</Label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      </div>
      <div>
        <Button type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  )
}
