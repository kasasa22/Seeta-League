import Link from 'next/link'
import { ArrowLeft, MessagesSquare } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { requireAnyPermission } from '@/lib/rbac'
import { MessagesManager } from '@/components/messaging/messages-manager'

export default async function AdminMessagesPage() {
  const user = await requireAnyPermission(['send_rfc', 'respond_rfc'])
  const supabase = await createClient()

  const { data: messages } = await supabase
    .from('messages')
    .select('id, subject, body, to_role, status, created_at, from:profiles(full_name, email), replies:message_replies(id, body, created_at, author:profiles(full_name, email))')
    .order('created_at', { ascending: false })

  const { data: roles } = await supabase.from('roles').select('key, name').order('name')

  const isSuper = user.roleKeys.includes('super_admin')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-4 sm:p-6 pt-20">
      <div className="mx-auto max-w-4xl">
        <Link href="/admin" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Admin
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-lg bg-emerald-500 p-2">
            <MessagesSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Messages &amp; RFCs</h1>
            <p className="text-slate-400 text-sm">Raise requests and respond to your inbox</p>
          </div>
        </div>

        <MessagesManager
          messages={(messages as any) ?? []}
          roles={roles ?? []}
          myRoleKeys={user.roleKeys}
          isSuper={isSuper}
        />
      </div>
    </div>
  )
}
