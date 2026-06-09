'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AdminAuthWrapper } from '@/components/admin/admin-auth-wrapper'
import { PostForm } from '@/components/admin/post-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, Eye } from 'lucide-react'
import { toast } from 'sonner'

const excerpt = (html: string) =>
  (html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 240)

export default function AdminBlogsPage() {
  const [items, setItems] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [canManage, setCanManage] = useState(false)

  const fetchItems = async () => {
    const res = await fetch('/api/blogs')
    const j = await res.json()
    setItems(j || [])
  }

  useEffect(() => {
    fetchItems()
    fetch('/api/me')
      .then((r) => r.json())
      .then((j) => {
        if (j.ok) setCanManage(j.isSuper || j.permissions.includes('post_news') || j.permissions.includes('manage_news'))
      })
      .catch(() => {})
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog? This cannot be undone.')) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Blog deleted')
        fetchItems()
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
          <h1 className="text-2xl font-bold text-white">Manage Blogs</h1>
          {canManage && (
            <Button onClick={() => setShowForm((s) => !s)} className="bg-emerald-600 hover:bg-emerald-700">
              {showForm ? 'Close' : 'New Blog'}
            </Button>
          )}
        </div>

        {showForm && (
          <Card className="mb-4 border-slate-700 bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-white">Create Blog</CardTitle>
            </CardHeader>
            <CardContent>
              <PostForm endpoint="/api/blogs" onSaved={() => { setShowForm(false); fetchItems() }} />
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {items.length === 0 && <p className="text-slate-400 text-sm">No blogs yet.</p>}
          {items.map((n) => (
            <Card key={n.id} className="border-slate-700 bg-slate-800/50">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {n.image_url && (
                    <img src={n.image_url} alt="" className="h-20 w-28 flex-shrink-0 rounded-md object-cover" />
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-white">{n.title}</h3>
                    <p className="text-xs text-slate-400">{new Date(n.created_at).toLocaleString()}</p>
                    <p className="mt-2 text-sm text-slate-300 line-clamp-2">{excerpt(n.body)}</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-end gap-2 border-t border-slate-700 pt-3">
                  <Link href={`/news/${n.id}`} target="_blank">
                    <Button variant="outline" size="sm" className="gap-1 border-slate-600 bg-slate-700/50 text-white hover:bg-slate-700">
                      <Eye className="h-4 w-4" /> View
                    </Button>
                  </Link>
                  {canManage && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(n.id)}
                      disabled={deleting === n.id}
                      className="gap-1 border-slate-600 bg-slate-700/50 text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" /> {deleting === n.id ? 'Deleting...' : 'Delete'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminAuthWrapper>
  )
}
