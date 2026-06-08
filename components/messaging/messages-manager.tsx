'use client'

import { useState, useTransition } from 'react'
import { Send, CornerDownRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { sendMessage, replyMessage, setMessageStatus } from '@/app/admin/messages/actions'

interface RoleRef { key: string; name: string }
interface PersonRef { full_name: string | null; email: string | null }
interface Reply { id: string; body: string; created_at: string; author: PersonRef | null }
interface MessageRow {
  id: string
  subject: string
  body: string | null
  to_role: string
  status: string
  created_at: string
  from: PersonRef | null
  replies: Reply[]
}
interface Props {
  messages: MessageRow[]
  roles: RoleRef[]
  myRoleKeys: string[]
  isSuper: boolean
}

const statusColor: Record<string, string> = {
  open: 'bg-amber-500/20 text-amber-400',
  in_progress: 'bg-blue-500/20 text-blue-400',
  resolved: 'bg-emerald-500/20 text-emerald-400',
}

const who = (p: PersonRef | null) => p?.full_name || p?.email || 'Unknown'

export function MessagesManager({ messages, roles, myRoleKeys, isSuper }: Props) {
  const [isPending, startTransition] = useTransition()
  const [replyText, setReplyText] = useState<Record<string, string>>({})
  const roleName = (key: string) => roles.find((r) => r.key === key)?.name ?? key

  const onSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    startTransition(async () => {
      const res = await sendMessage(fd)
      if (res?.ok) {
        toast.success('Message sent')
        form.reset()
      } else {
        toast.error(res?.message ?? 'Failed')
      }
    })
  }

  const onReply = (messageId: string) => {
    const body = replyText[messageId] ?? ''
    if (!body.trim()) return
    startTransition(async () => {
      const res = await replyMessage(messageId, body)
      if (res?.ok) {
        setReplyText((p) => ({ ...p, [messageId]: '' }))
        toast.success('Reply sent')
      } else {
        toast.error(res?.message ?? 'Failed')
      }
    })
  }

  const canManage = (m: MessageRow) => isSuper || myRoleKeys.includes(m.to_role)

  return (
    <div className="space-y-6">
      <Card className="border-slate-700 bg-slate-800/50">
        <CardContent className="p-5">
          <h2 className="mb-4 font-bold text-white">New RFC / message</h2>
          <form onSubmit={onSend} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-white text-xs">Subject</Label>
                <Input name="subject" required className="border-slate-600 bg-slate-700/50 text-white" />
              </div>
              <div className="space-y-1">
                <Label className="text-white text-xs">Send to role</Label>
                <select name="to_role" required className="h-9 w-full rounded-md border border-slate-600 bg-slate-700/50 px-2 text-sm text-white">
                  <option value="">Select a role</option>
                  {roles.map((r) => (
                    <option key={r.key} value={r.key}>{r.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-white text-xs">Message</Label>
              <textarea name="body" rows={3} className="w-full rounded-md border border-slate-600 bg-slate-700/50 p-2 text-sm text-white" />
            </div>
            <Button type="submit" disabled={isPending} className="gap-1 bg-emerald-600 hover:bg-emerald-700 text-white">
              <Send className="h-4 w-4" /> Send
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-slate-700 bg-slate-800/50">
        <CardContent className="p-5">
          <h2 className="mb-4 font-bold text-white">Inbox</h2>
          {messages.length === 0 ? (
            <p className="text-slate-400 text-sm">No messages.</p>
          ) : (
            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className="rounded-lg border border-slate-700 bg-slate-700/30 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-white">{m.subject}</p>
                      <p className="text-xs text-slate-400">
                        From {who(m.from)} → {roleName(m.to_role)} · {new Date(m.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={statusColor[m.status] ?? 'bg-slate-600 text-white'}>{m.status}</Badge>
                  </div>
                  {m.body && <p className="mt-2 text-sm text-slate-200">{m.body}</p>}

                  {m.replies?.length > 0 && (
                    <div className="mt-3 space-y-2 border-l border-slate-600 pl-3">
                      {m.replies
                        .slice()
                        .sort((a, b) => a.created_at.localeCompare(b.created_at))
                        .map((r) => (
                          <div key={r.id} className="text-sm">
                            <p className="flex items-center gap-1 text-xs text-slate-400">
                              <CornerDownRight className="h-3 w-3" /> {who(r.author)}
                            </p>
                            <p className="text-slate-200">{r.body}</p>
                          </div>
                        ))}
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Input
                      value={replyText[m.id] ?? ''}
                      onChange={(e) => setReplyText((p) => ({ ...p, [m.id]: e.target.value }))}
                      placeholder="Write a reply..."
                      className="h-9 flex-1 min-w-[180px] border-slate-600 bg-slate-700/50 text-white"
                    />
                    <Button size="sm" onClick={() => onReply(m.id)} disabled={isPending} className="bg-slate-200 text-slate-900 hover:bg-white">
                      Reply
                    </Button>
                    {canManage(m) && (
                      <select
                        value={m.status}
                        onChange={(e) => startTransition(async () => { await setMessageStatus(m.id, e.target.value) })}
                        className="h-9 rounded-md border border-slate-600 bg-slate-700/50 px-2 text-sm text-white"
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    )}
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
