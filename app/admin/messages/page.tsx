import Link from 'next/link'
import { MessagesSquare } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { requireAnyPermission } from '@/lib/rbac'
import { MessagesManager } from '@/components/messaging/messages-manager'

export default async function AdminMessagesPage() {
  const user = await requireAnyPermission(['send_rfc', 'respond_rfc'])
  const supabase = await createClient()

  const { data: messages } = await supabase
    .from('messages')
    .select('id, subject, body, to_role, to_user_id, status, created_at, from:profiles(full_name, email), replies:message_replies(id, body, created_at, author:profiles(full_name, email))')
    .order('created_at', { ascending: false })

  const { data: roles } = await supabase.from('roles').select('key, name').order('name')
  const { data: directory } = await supabase.rpc('role_directory')

  const isSuper = user.roleKeys.includes('super_admin')

  return (
    <div className="p-4 sm:p-6">
      <div className="">
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
          directory={(directory as any) ?? []}
          myRoleKeys={user.roleKeys}
          isSuper={isSuper}
        />
      </div>
    </div>
  )
}
