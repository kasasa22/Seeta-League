'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { RichTextEditor } from '@/components/admin/rich-text-editor'
import { sanitizeHtml } from '@/lib/sanitize'

type AiKind = 'notice' | 'report' | 'roundup'

const KIND_LABELS: Record<AiKind, string> = {
  notice: 'Notice from a prompt',
  report: 'Match report (from a result)',
  roundup: 'Matchday roundup (from the table)',
}

interface PostFormProps {
  onSaved?: () => void
  endpoint: string
  initial?: any
  aiKinds?: AiKind[]
}

export function PostForm({ onSaved, endpoint, initial, aiKinds = ['notice'] }: PostFormProps) {
  const [title, setTitle] = useState(initial?.title || '')
  const [body, setBody] = useState(initial?.body || '')
  const [image, setImage] = useState<File | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const [aiKind, setAiKind] = useState<AiKind>(aiKinds[0])
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiMatchId, setAiMatchId] = useState('')
  const [matches, setMatches] = useState<{ id: string; label: string }[]>([])
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    if (aiKind === 'report' && matches.length === 0) {
      fetch('/api/ai/generate')
        .then((r) => r.json())
        .then((j) => {
          if (j.ok) setMatches(j.matches || [])
        })
        .catch(() => {})
    }
  }, [aiKind, matches.length])

  const generate = async () => {
    setGenerating(true)
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: aiKind, prompt: aiPrompt, matchId: aiMatchId }),
      })
      const j = await res.json()
      if (!res.ok || !j.ok) throw new Error(j.message || 'Generation failed')
      if (j.title) setTitle(j.title)
      if (j.body) setBody(j.body)
      toast.success('Draft generated — review and edit before publishing')
    } catch (err: any) {
      toast.error(err.message || String(err))
    } finally {
      setGenerating(false)
    }
  }

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
    if (!body.replace(/<[^>]*>/g, '').trim()) {
      toast.error('Body is required')
      return
    }
    setIsSaving(true)
    try {
      let image_url = initial?.image_url || null
      if (image) image_url = await uploadImage(image)

      const payload = { title, body: sanitizeHtml(body), image_url, is_published: true }
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

  const canGenerate =
    !generating && (aiKind === 'roundup' || (aiKind === 'report' && !!aiMatchId) || (aiKind === 'notice' && !!aiPrompt.trim()))

  return (
    <div className="space-y-4">
      {/* AI Assist */}
      <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-300">AI Assist</span>
          <span className="text-xs text-slate-400">— generate a draft, then review &amp; edit</span>
        </div>
        <div className="space-y-3">
          <select
            value={aiKind}
            onChange={(e) => setAiKind(e.target.value as AiKind)}
            className="h-10 w-full rounded-md border border-slate-600 bg-slate-800 px-3 text-sm text-white"
          >
            {aiKinds.map((k) => (
              <option key={k} value={k}>
                {KIND_LABELS[k]}
              </option>
            ))}
          </select>

          {aiKind === 'notice' && (
            <Textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="What's the notice about? e.g. Matchday 5 venue changed to Main Campus pitch, kickoff 4pm Saturday."
              className="border-slate-600 bg-slate-800 text-white"
              rows={3}
            />
          )}

          {aiKind === 'report' && (
            <select
              value={aiMatchId}
              onChange={(e) => setAiMatchId(e.target.value)}
              className="h-10 w-full rounded-md border border-slate-600 bg-slate-800 px-3 text-sm text-white"
            >
              <option value="">{matches.length === 0 ? 'No completed matches found' : 'Select a completed match'}</option>
              {matches.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          )}

          {aiKind === 'roundup' && (
            <p className="text-xs text-slate-400">Generates a roundup from the current standings and top scorers/assists.</p>
          )}

          <Button
            type="button"
            onClick={generate}
            disabled={!canGenerate}
            className="gap-2 bg-emerald-600 hover:bg-emerald-700"
          >
            <Sparkles className="h-4 w-4" />
            {generating ? 'Generating…' : 'Generate draft'}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <Label>Body</Label>
          <RichTextEditor value={body} onChange={setBody} placeholder="Write the content. Use the toolbar for headings, bold and lists." />
        </div>
        <div>
          <Label>Image</Label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        </div>
        <div>
          <Button type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</Button>
        </div>
      </form>
    </div>
  )
}
