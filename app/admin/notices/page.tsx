'use client'

import { useEffect, useState } from 'react'
import { AdminAuthWrapper } from '@/components/admin/admin-auth-wrapper'
import { PostForm } from '@/components/admin/post-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { sanitizeHtml } from '@/lib/sanitize'

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [canManage, setCanManage] = useState(false)

  const fetchNotices = async () => {
    const res = await fetch('/api/notices')
    const j = await res.json()
    setNotices(j || [])
  }

  useEffect(() => {
    fetchNotices()
    fetch('/api/me')
      .then((r) => r.json())
      .then((j) => {
        if (j.ok) setCanManage(j.isSuper || j.permissions.includes('post_news') || j.permissions.includes('manage_news'))
      })
      .catch(() => {})
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this notice?')) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/notices/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Notice deleted')
        fetchNotices()
      } else {
        const j = await res.json().catch(() => ({}))
        toast.error(j.message || 'Delete failed')
      }
    } catch (err: any) {
      toast.error(err?.message || 'Delete failed')
    }
    setDeleting(null)
  }

  return (
    <AdminAuthWrapper>
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Manage Notices</h1>
          {canManage && (
            <Button onClick={() => setShowForm((s) => !s)} className="bg-emerald-600 hover:bg-emerald-700">
              {showForm ? 'Close' : 'New Notice'}
            </Button>
          )}
        </div>

        {showForm && (
          <Card className="mb-4 border-slate-700 bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-white">Create Notice</CardTitle>
            </CardHeader>
            <CardContent>
              <PostForm endpoint="/api/notices" onSaved={() => { setShowForm(false); fetchNotices() }} />
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {notices.length === 0 && <p className="text-slate-400 text-sm">No notices yet.</p>}
          {notices.map((n) => (
            <Card key={n.id} className="border-slate-700 bg-slate-800/50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-white">{n.title}</h3>
                    <p className="text-xs text-slate-400">{new Date(n.created_at).toLocaleString()}</p>
                  </div>
                  {canManage && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(n.id)}
                      disabled={deleting === n.id}
                      className="shrink-0 gap-1 border-slate-600 bg-slate-700/50 text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" /> {deleting === n.id ? 'Deleting...' : 'Delete'}
                    </Button>
                  )}
                </div>
                {n.image_url && <img src={n.image_url} alt="" className="mt-2 max-h-48 rounded-md object-contain" />}
                <div
                  className="mt-2 text-sm text-slate-300 [&_h3]:text-base [&_h3]:font-bold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-emerald-400 [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(n.body || '') }}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminAuthWrapper>
  )
}
