'use client'

import { useEffect, useState } from 'react'
import { AdminAuthWrapper } from '@/components/admin/admin-auth-wrapper'
import { PostForm } from '@/components/admin/post-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AdminBlogsPage() {
  const [items, setItems] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)

  const fetchItems = async () => {
    const res = await fetch('/api/blogs')
    const j = await res.json()
    setItems(j || [])
  }

  useEffect(() => { fetchItems() }, [])

  return (
    <AdminAuthWrapper>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Manage Blogs</h1>
            <Button onClick={() => setShowForm((s) => !s)}>{showForm ? 'Close' : 'New Blog'}</Button>
          </div>

          {showForm && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Create Blog</CardTitle>
              </CardHeader>
              <CardContent>
                <PostForm endpoint="/api/blogs" onSaved={() => { setShowForm(false); fetchItems() }} />
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            {items.map((n) => (
              <Card key={n.id} className="p-3">
                <h3 className="text-lg font-semibold">{n.title}</h3>
                <p className="text-sm text-slate-300">{new Date(n.created_at).toLocaleString()}</p>
                {n.image_url && <img src={n.image_url} alt="" className="mt-2 max-h-48 object-contain" />}
                <p className="mt-2">{n.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AdminAuthWrapper>
  )
}
