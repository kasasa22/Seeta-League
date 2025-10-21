'use client'

import { useEffect, useState } from 'react'
import { AdminAuthWrapper } from '@/components/admin/admin-auth-wrapper'
import { PostForm } from '@/components/admin/post-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)

  const fetchNotices = async () => {
    const res = await fetch('/api/notices')
    const j = await res.json()
    setNotices(j || [])
  }

  useEffect(() => { fetchNotices() }, [])

  return (
    <AdminAuthWrapper>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Manage Notices</h1>
            <Button onClick={() => setShowForm((s) => !s)}>{showForm ? 'Close' : 'New Notice'}</Button>
          </div>

          {showForm && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Create Notice</CardTitle>
              </CardHeader>
              <CardContent>
                <PostForm endpoint="/api/notices" onSaved={() => { setShowForm(false); fetchNotices() }} />
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            {notices.map((n) => (
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
