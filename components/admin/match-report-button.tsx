"use client"

import type { Match } from "@/lib/types"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sparkles, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { sanitizeHtml } from "@/lib/sanitize"

export function MatchReportButton({ match }: { match: Match }) {
  const [open, setOpen] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [hasDraft, setHasDraft] = useState(false)

  const generate = async () => {
    setGenerating(true)
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "report", matchId: match.id }),
      })
      const j = await res.json()
      if (!res.ok || !j.ok) throw new Error(j.message || "Generation failed")
      setTitle(j.title || `${match.home_team?.name} vs ${match.away_team?.name}`)
      setBody(j.body || "")
      setHasDraft(true)
    } catch (err: any) {
      toast.error(err.message || String(err))
    } finally {
      setGenerating(false)
    }
  }

  const onOpenChange = (next: boolean) => {
    setOpen(next)
    if (next && !hasDraft && !generating) generate()
  }

  const save = async (publish: boolean) => {
    if (!body.replace(/<[^>]*>/g, "").trim()) {
      toast.error("Nothing to save yet")
      return
    }
    setSaving(true)
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body: sanitizeHtml(body), image_url: null, is_published: publish }),
      })
      const j = await res.json()
      if (!res.ok) throw new Error(j.message || "Save failed")
      toast.success(publish ? "Report published to News" : "Report saved as draft")
      setOpen(false)
    } catch (err: any) {
      toast.error(err.message || String(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-fuchsia-400 hover:bg-fuchsia-500/20 hover:text-fuchsia-300"
          title="Generate AI match report"
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">AI Report</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-slate-700 bg-slate-900 text-white sm:max-w-[640px]">
        <DialogHeader>
          <div className="mb-1 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-fuchsia-400" />
            <DialogTitle>AI Match Report</DialogTitle>
          </div>
          <DialogDescription className="text-slate-400">
            {match.home_team?.name} {match.home_score}-{match.away_score} {match.away_team?.name} · review and edit before publishing.
          </DialogDescription>
        </DialogHeader>

        {generating ? (
          <div className="flex h-48 items-center justify-center gap-2 text-slate-400">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Generating report…
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Report</Label>
              <RichTextEditor value={body} onChange={setBody} placeholder="The generated report appears here." />
            </div>
            <div className="flex flex-wrap justify-end gap-2 border-t border-slate-700 pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={generate}
                disabled={saving}
                className="gap-1 border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
              >
                <RefreshCw className="h-4 w-4" /> Regenerate
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => save(false)}
                disabled={saving}
                className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
              >
                Save as draft
              </Button>
              <Button type="button" onClick={() => save(true)} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">
                {saving ? "Saving…" : "Publish to News"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
