"use client"

import { useEffect, useState } from "react"
import { Sparkles, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { sanitizeHtml } from "@/lib/sanitize"

interface Roundup {
  title: string
  body: string
  generated_at?: string
}

export function AiRoundup() {
  const [roundup, setRoundup] = useState<Roundup | null>(null)
  const [canManage, setCanManage] = useState(false)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch("/api/ai/roundup").then((r) => r.json()).catch(() => ({})),
      fetch("/api/me").then((r) => r.json()).catch(() => ({})),
    ]).then(([rj, me]) => {
      if (rj?.roundup) setRoundup(rj.roundup)
      if (me?.ok) setCanManage(me.isSuper || me.permissions?.includes("post_news") || me.permissions?.includes("manage_news"))
      setLoading(false)
    })
  }, [])

  const refresh = async () => {
    setGenerating(true)
    try {
      const res = await fetch("/api/ai/roundup", { method: "POST" })
      const j = await res.json()
      if (!res.ok || !j.ok) throw new Error(j.message || "Generation failed")
      setRoundup(j.roundup)
      toast.success("Roundup updated")
    } catch (err: any) {
      toast.error(err.message || String(err))
    } finally {
      setGenerating(false)
    }
  }

  if (loading) return null
  // Nothing to show and the visitor can't generate one — render nothing.
  if (!roundup && !canManage) return null

  return (
    <section>
      <Card className="overflow-hidden border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-card to-card">
        <CardContent className="p-6 sm:p-8">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-500">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                {roundup?.title || "Matchday Roundup"}
              </h2>
            </div>
            {canManage && (
              <Button
                size="sm"
                variant="outline"
                onClick={refresh}
                disabled={generating}
                className="gap-1"
              >
                <RefreshCw className={`h-4 w-4 ${generating ? "animate-spin" : ""}`} />
                {generating ? "Generating…" : roundup ? "Refresh" : "Generate"}
              </Button>
            )}
          </div>

          {roundup ? (
            <div
              className="prose-sm max-w-none text-muted-foreground [&_p]:mb-2 [&_p:last-child]:mb-0"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(roundup.body) }}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              No roundup yet. Click <span className="font-semibold">Generate</span> to create an AI summary of the current
              standings and top performers.
            </p>
          )}

          {roundup?.generated_at && (
            <p className="mt-3 text-xs text-muted-foreground/70">
              AI-generated · {new Date(roundup.generated_at).toLocaleDateString()}
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
